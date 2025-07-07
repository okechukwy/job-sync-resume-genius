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
      
      let lines: string[];
      if (isHtmlContent) {
        // Process HTML content to extract structured text with proper formatting
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        lines = [];
        
        const processElement = (element: Element) => {
          const classList = Array.from(element.classList);
          const style = element.getAttribute('style') || '';
          const text = element.textContent?.trim() || '';
          
          if (!text) return;
          
          // Extract indentation from margin-left style
          const marginMatch = style.match(/margin-left:\s*(\d+)px/);
          const indentLevel = marginMatch ? Math.floor(parseInt(marginMatch[1]) / 20) : 0;
          const indent = '    '.repeat(indentLevel); // 4 spaces per indent level
          
          if (classList.includes('cv-header')) {
            lines.push(`${text.toUpperCase()}`);
            lines.push(''); // Add spacing after headers
          } else if (classList.includes('cv-subheader')) {
            lines.push(''); // Add spacing before subheaders
            lines.push(`${text}`);
          } else if (classList.includes('cv-bullet')) {
            // Add bullet point with proper indentation
            lines.push(`${indent}• ${text}`);
          } else if (classList.includes('cv-numbered')) {
            lines.push(`${indent}${text}`);
          } else {
            lines.push(`${indent}${text}`);
          }
        };
        
        // Process all div elements in order to maintain structure
        const allElements = doc.querySelectorAll('div');
        allElements.forEach(element => processElement(element));
      } else {
        lines = content.split('\n');
      }
      
      // Convert lines to RTF format with proper formatting
      for (const line of lines) {
        if (line.includes('OPTIMIZED RESUME') || line.includes('='.repeat(20))) {
          // Main title
          rtfContent += `\\b\\fs32 ${line.replace(/[{}\\]/g, '')}\\b0\\fs24\\par\\par `;
        } else if (/^[A-Z\s&0-9.,'-]+$/.test(line.trim()) && line.trim().length > 2 && line.trim().length < 50) {
          // Section headers (all caps)
          rtfContent += `\\b\\fs28 ${line.replace(/[{}\\]/g, '')}\\b0\\fs24\\par `;
        } else if (line.trim().startsWith('•')) {
          // Bullet points
          const bulletText = line.replace(/^[\s]*•[\s]*/, '');
          const indentLevel = (line.length - line.trimLeft().length) / 4;
          const rtfIndent = '\\li' + (indentLevel * 360); // 360 twips per indent level
          rtfContent += `{${rtfIndent} \\bullet ${bulletText.replace(/[{}\\]/g, '')}\\par}`;
        } else if (line.trim()) {
          // Regular text
          const indentLevel = (line.length - line.trimLeft().length) / 4;
          const rtfIndent = indentLevel > 0 ? '\\li' + (indentLevel * 360) : '';
          rtfContent += `{${rtfIndent} ${line.trim().replace(/[{}\\]/g, '')}\\par}`;
        } else {
          // Empty line for spacing
          rtfContent += '\\par ';
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