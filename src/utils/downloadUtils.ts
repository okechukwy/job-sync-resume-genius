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
        // Extract text from HTML while preserving structure
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const elements = doc.body?.children || doc.children;
        lines = [];
        
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
            lines.push(`\n${element.textContent || ''}\n`);
          } else if (element.tagName === 'P' || element.tagName === 'DIV') {
            const text = element.textContent || '';
            if (text.trim()) {
              lines.push(text);
            }
          }
        }
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