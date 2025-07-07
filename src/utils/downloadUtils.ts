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
          
          // Extract margin-left for indentation
          const marginMatch = style.match(/margin-left:\s*(\d+)px/);
          const marginLeft = marginMatch ? parseInt(marginMatch[1]) : 0;
          const indentSpaces = Math.floor(marginLeft / 8); // Convert px to approximate spaces
          const indent = ' '.repeat(indentSpaces);
          
          // Extract extra spacing from top margin
          const topMarginMatch = style.match(/margin:\s*(\d+)px/);
          const topMargin = topMarginMatch ? parseInt(topMarginMatch[1]) : 0;
          const extraLines = topMargin > 15 ? Math.floor(topMargin / 15) : 0;
          
          // Add extra line breaks for spacing
          for (let i = 0; i < extraLines; i++) {
            lines.push('');
          }
          
          if (classList.includes('cv-header')) {
            lines.push(`${indent}${text.toUpperCase()}`);
            lines.push(''); // Add space after headers
          } else if (classList.includes('cv-subheader')) {
            lines.push(`${indent}${text}`);
          } else if (classList.includes('cv-bullet')) {
            // Extract bullet character from inline HTML if present
            const bulletMatch = element.innerHTML.match(/<span[^>]*>([^<]+)<\/span>/);
            const bulletChar = bulletMatch ? bulletMatch[1] : '•';
            const bulletText = text.replace(/^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+-]\s*/, '');
            lines.push(`${indent}${bulletChar} ${bulletText}`);
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
      
      const lines = content.split('\n');
      
      for (const line of lines) {
        if (line.includes('OPTIMIZED RESUME') || line.includes('='.repeat(20))) {
          rtfContent += `\\b\\fs32 ${line.replace(/[{}\\]/g, '')}\\b0\\fs24\\par\\par `;
        } else if (line.includes('-'.repeat(10)) || /^[A-Z\s]+$/.test(line.trim()) && line.trim().length > 5) {
          rtfContent += `\\b\\fs28 ${line.replace(/[{}\\]/g, '')}\\b0\\fs24\\par `;
        } else if (line.trim()) {
          rtfContent += `${line.replace(/[{}\\]/g, '')}\\par `;
        } else {
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