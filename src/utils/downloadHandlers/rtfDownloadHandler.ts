import { toast } from 'sonner';

export const downloadAsRtf = async (
  content: string,
  fileName: string,
  isHtmlContent: boolean = false
) => {
  try {
    toast.info("Generating RTF...");
    
    // Generate RTF content with proper formatting
    let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}';
    rtfContent += '\\f0\\fs24 '; // Set font and size
    
    let textLines: string[];
    
    if (isHtmlContent) {
      textLines = extractTextFromHtml(content);
    } else {
      textLines = content.split('\n');
    }
    
    // Convert lines to RTF format
    for (const line of textLines) {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        // Empty line for spacing
        rtfContent += '\\par ';
        continue;
      }
      
      if (trimmedLine.includes('OPTIMIZED RESUME') || trimmedLine.includes('='.repeat(20))) {
        // Main title - bold and larger
        rtfContent += `\\b\\fs32 ${trimmedLine}\\b0\\fs24\\par\\par `;
      } else if (/^[A-Z\s&0-9.,'-]+$/.test(trimmedLine) && trimmedLine.length > 2 && trimmedLine.length < 50) {
        // Section headers (all caps) - bold
        rtfContent += `\\b\\fs28 ${trimmedLine}\\b0\\fs24\\par `;
      } else if (trimmedLine.startsWith('•') || /^[\s]*[•·▪▫]\s/.test(trimmedLine)) {
        // Bullet points
        const bulletText = trimmedLine.replace(/^[\s]*[•·▪▫]\s*/, '');
        rtfContent += `\\li360 \\bullet ${bulletText}\\par `;
      } else {
        // Regular text
        rtfContent += `${trimmedLine}\\par `;
      }
    }
    
    rtfContent += '}';
    
    const blob = new Blob([rtfContent], { 
      type: 'application/rtf' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `optimized-${fileName}.rtf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Optimized resume downloaded as RTF (opens in Word)!");
  } catch (error) {
    console.error('Error generating RTF:', error);
    toast.error('Failed to generate RTF. Please try again.');
    throw error;
  }
};

const extractTextFromHtml = (content: string): string[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const textLines: string[] = [];
  
  // Process CV elements in order to preserve structure
  const processElement = (element: Element) => {
    const classList = Array.from(element.classList);
    const text = element.textContent?.trim() || '';
    
    if (!text) return;
    
    if (classList.includes('cv-header')) {
      // Add section header with proper spacing
      if (textLines.length > 0) textLines.push(''); // Add space before header
      textLines.push(text.toUpperCase());
      textLines.push(''); // Add space after header
    } else if (classList.includes('cv-subheader')) {
      textLines.push(text);
    } else if (classList.includes('cv-bullet')) {
      // Preserve bullet points with proper formatting
      const bulletText = text.startsWith('•') ? text : '• ' + text;
      textLines.push(bulletText);
    } else if (classList.includes('cv-numbered')) {
      textLines.push(text);
    } else if (classList.includes('cv-text')) {
      textLines.push(text);
    } else if (element.tagName === 'DIV' && text) {
      // Generic div with text content
      textLines.push(text);
    }
  };
  
  // Process all CV elements in document order
  const cvElements = doc.querySelectorAll('.cv-header, .cv-subheader, .cv-bullet, .cv-numbered, .cv-text, div');
  cvElements.forEach(element => {
    const text = element.textContent?.trim();
    if (text && text.length > 0) {
      processElement(element);
    }
  });
  
  // If no structured elements found, fall back to simple text extraction
  if (textLines.length === 0) {
    const allText = doc.body?.textContent || doc.textContent || content;
    return allText.split('\n').filter(line => line.trim().length > 0);
  }
  
  return textLines;
};