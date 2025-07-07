import { toast } from 'sonner';

export const downloadAsRtf = async (
  content: string,
  fileName: string,
  isHtmlContent: boolean = false
) => {
  try {
    toast.info("Generating RTF...");
    
    // Generate RTF content with proper formatting and character encoding
    let rtfContent = '{\\rtf1\\ansi\\ansicpg1252\\deff0 {\\fonttbl {\\f0\\froman\\fprq2\\fcharset0 Times New Roman;}{\\f1\\fswiss\\fprq2\\fcharset0 Arial;}}';
    rtfContent += '{\\colortbl ;\\red0\\green0\\blue0;\\red128\\green128\\blue128;\\red0\\green0\\blue255;}'; // Color table
    rtfContent += '\\viewkind4\\uc1\\pard\\f0\\fs24 '; // Set default formatting
    
    let structuredContent: ContentElement[];
    
    if (isHtmlContent) {
      structuredContent = extractStructuredContentFromHtml(content);
    } else {
      structuredContent = parseTextContent(content);
    }
    
    // Convert structured content to RTF format
    for (const element of structuredContent) {
      const escapedText = escapeRtfText(element.text);
      
      if (element.type === 'title') {
        // Main title - bold, larger, centered
        rtfContent += `\\pard\\qc\\b\\fs36 ${escapedText}\\b0\\par\\par `;
      } else if (element.type === 'header') {
        // Section headers - bold, larger
        rtfContent += `\\pard\\ql\\b\\fs30 ${escapedText}\\b0\\fs24\\par\\par `;
      } else if (element.type === 'subheader') {
        // Subheaders - bold
        rtfContent += `\\pard\\ql\\b\\fs26 ${escapedText}\\b0\\fs24\\par `;
      } else if (element.type === 'bullet') {
        // Bullet points with proper indentation
        rtfContent += `\\pard\\li720\\fi-360\\bullet\\tab ${escapedText}\\par `;
      } else if (element.type === 'indented') {
        // Indented content
        rtfContent += `\\pard\\li720 ${escapedText}\\par `;
      } else if (element.type === 'empty') {
        // Empty line for spacing
        rtfContent += '\\par ';
      } else {
        // Regular text
        rtfContent += `\\pard\\ql ${escapedText}\\par `;
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

interface ContentElement {
  type: 'title' | 'header' | 'subheader' | 'bullet' | 'indented' | 'text' | 'empty';
  text: string;
  indent?: number;
}

const escapeRtfText = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')  // Escape backslashes
    .replace(/\{/g, '\\{')   // Escape opening braces
    .replace(/\}/g, '\\}')   // Escape closing braces
    .replace(/\u00A0/g, ' ') // Non-breaking space to regular space
    .replace(/[^\x00-\x7F]/g, (char) => {
      // Convert non-ASCII characters to RTF unicode
      const code = char.charCodeAt(0);
      return `\\u${code}?`;
    });
};

const extractStructuredContentFromHtml = (content: string): ContentElement[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const elements: ContentElement[] = [];
  
  // Process CV elements in document order to preserve structure
  const processElement = (element: Element) => {
    const classList = Array.from(element.classList);
    const text = element.textContent?.trim() || '';
    
    if (!text) {
      elements.push({ type: 'empty', text: '' });
      return;
    }
    
    if (classList.includes('cv-header')) {
      // Add spacing before header
      if (elements.length > 0) elements.push({ type: 'empty', text: '' });
      elements.push({ type: 'header', text: text });
      elements.push({ type: 'empty', text: '' });
    } else if (classList.includes('cv-subheader')) {
      elements.push({ type: 'subheader', text: text });
    } else if (classList.includes('cv-bullet')) {
      // Remove bullet character as RTF will add it
      const bulletText = text.replace(/^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+\-]\s*/, '');
      elements.push({ type: 'bullet', text: bulletText });
    } else if (classList.includes('cv-numbered')) {
      elements.push({ type: 'text', text: text });
    } else if (classList.includes('cv-text')) {
      // Check if it's indented text
      const style = element.getAttribute('style') || '';
      const marginLeft = style.match(/margin-left:\s*(\d+)px/);
      if (marginLeft && parseInt(marginLeft[1]) > 20) {
        elements.push({ type: 'indented', text: text });
      } else {
        elements.push({ type: 'text', text: text });
      }
    }
  };
  
  // Check for title first
  const titleElement = doc.querySelector('.cv-header, h1, [class*="title"]');
  if (titleElement && titleElement.textContent?.includes('OPTIMIZED RESUME')) {
    elements.push({ type: 'title', text: titleElement.textContent.trim() });
    elements.push({ type: 'empty', text: '' });
  }
  
  // Process all CV elements in document order
  const cvElements = doc.querySelectorAll('.cv-header, .cv-subheader, .cv-bullet, .cv-numbered, .cv-text');
  cvElements.forEach(element => {
    const text = element.textContent?.trim();
    if (text && text.length > 0 && !text.includes('OPTIMIZED RESUME')) {
      processElement(element);
    }
  });
  
  // If no structured elements found, fall back to simple parsing
  if (elements.length === 0) {
    const allText = doc.body?.textContent || doc.textContent || content;
    return parseTextContent(allText);
  }
  
  return elements;
};

const parseTextContent = (content: string): ContentElement[] => {
  const lines = content.split('\n');
  const elements: ContentElement[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      elements.push({ type: 'empty', text: '' });
      continue;
    }
    
    if (trimmedLine.includes('OPTIMIZED RESUME') || trimmedLine.includes('='.repeat(10))) {
      elements.push({ type: 'title', text: trimmedLine });
    } else if (/^[A-Z\s&0-9.,'-]+$/.test(trimmedLine) && trimmedLine.length > 2 && trimmedLine.length < 80) {
      elements.push({ type: 'header', text: trimmedLine });
    } else if (trimmedLine.startsWith('•') || /^[\s]*[•·▪▫]\s/.test(trimmedLine)) {
      const bulletText = trimmedLine.replace(/^[\s]*[•·▪▫]\s*/, '');
      elements.push({ type: 'bullet', text: bulletText });
    } else if (line.startsWith('  ') || line.startsWith('\t')) {
      elements.push({ type: 'indented', text: trimmedLine });
    } else {
      elements.push({ type: 'text', text: trimmedLine });
    }
  }
  
  return elements;
};