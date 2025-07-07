import jsPDF from 'jspdf';
import { toast } from 'sonner';

export const downloadFile = async (
  content: string,
  fileName: string,
  format: 'txt' | 'pdf' | 'docx',
  isHtmlContent: boolean = false
) => {
  try {
    if (format === 'txt') {
      // For HTML content, extract plain text
      let textContent = content;
      if (isHtmlContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        textContent = doc.body?.textContent || doc.textContent || content;
      }
      
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `optimized-${fileName}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Optimized resume downloaded as TXT!");
      
    } else if (format === 'pdf') {
      toast.info("Generating PDF...");
      
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 20;
      const lineHeight = 6;
      let currentY = margin;
      
      let lines: string[];
      if (isHtmlContent) {
        // Extract text from HTML while preserving exact structure, spacing, and formatting
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        lines = [];
        
        const processElement = (element: Element) => {
          const classList = Array.from(element.classList);
          const style = element.getAttribute('style') || '';
          const text = element.textContent?.trim() || '';
          
          if (!text) return;
          
          // Extract precise positioning from absolute positioning
          const leftMatch = style.match(/left:\s*(\d+)px/);
          const topMatch = style.match(/top:\s*(\d+)px/);
          const leftPos = leftMatch ? parseInt(leftMatch[1]) : 0;
          const topPos = topMatch ? parseInt(topMatch[1]) : 0;
          
          // Convert left position to precise indentation
          const indentSpaces = Math.floor(leftPos / 8); // 8px per space character
          const indent = ' '.repeat(Math.max(0, indentSpaces));
          
          // Calculate line spacing from top position relative to previous element
          const currentLineIndex = lines.length;
          const expectedTopPos = currentLineIndex * 15; // Approximate line height
          const extraSpacing = Math.max(0, Math.floor((topPos - expectedTopPos) / 15));
          
          // Add precise line spacing
          for (let i = 0; i < extraSpacing; i++) {
            lines.push('');
          }
          
          if (classList.includes('cv-header')) {
            lines.push(`${indent}${text.toUpperCase()}`);
            lines.push(''); // Header spacing
          } else if (classList.includes('cv-subheader')) {
            lines.push(`${indent}${text}`);
          } else if (classList.includes('cv-bullet')) {
            // Preserve exact bullet formatting
            const bulletMatch = text.match(/^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+\-]\s*/);
            const bulletChar = bulletMatch ? bulletMatch[0] : '• ';
            const bulletText = text.replace(/^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+\-]\s*/, '');
            lines.push(`${indent}${bulletChar}${bulletText}`);
          } else if (classList.includes('cv-numbered')) {
            lines.push(`${indent}${text}`);
          } else if (classList.includes('cv-contact')) {
            lines.push(`${indent}${text}`);
          } else {
            lines.push(`${indent}${text}`);
          }
        };
        
        const allElements = doc.querySelectorAll('h1, h2, h3, p');
        allElements.forEach(element => processElement(element));
      } else {
        lines = content.split('\n');
      }
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if we need a new page
        if (currentY > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }
        
        // Handle different line types
        if (line.includes('OPTIMIZED RESUME') || line.includes('='.repeat(20))) {
          pdf.setFontSize(16);
          pdf.setFont(undefined, 'bold');
        } else if (line.includes('-'.repeat(10)) || /^[A-Z\s]+$/.test(line.trim()) && line.trim().length > 5) {
          pdf.setFontSize(12);
          pdf.setFont(undefined, 'bold');
        } else {
          pdf.setFontSize(10);
          pdf.setFont(undefined, 'normal');
        }
        
        // Split long lines to fit page width
        const splitLines = pdf.splitTextToSize(line, pageWidth - 2 * margin);
        
        for (const splitLine of splitLines) {
          if (currentY > pageHeight - margin) {
            pdf.addPage();
            currentY = margin;
          }
          pdf.text(splitLine, margin, currentY);
          currentY += lineHeight;
        }
      }
      
      pdf.save(`optimized-${fileName}.pdf`);
      toast.success("Optimized resume downloaded as PDF!");
      
    } else if (format === 'docx') {
      toast.info("Generating RTF...");
      
      // Generate RTF content with proper formatting
      let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}';
      rtfContent += '\\f0\\fs24 '; // Set font and size
      
      let textLines: string[];
      
      if (isHtmlContent) {
        // Extract text from HTML while preserving CV structure
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        textLines = [];
        
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
          textLines = allText.split('\n').filter(line => line.trim().length > 0);
        }
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
    }
  } catch (error) {
    console.error(`Error generating ${format.toUpperCase()}:`, error);
    toast.error(`Failed to generate ${format.toUpperCase()}. Please try again.`);
  }
};