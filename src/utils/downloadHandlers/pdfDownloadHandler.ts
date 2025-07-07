import jsPDF from 'jspdf';
import { toast } from 'sonner';

export const downloadAsPdf = async (
  content: string,
  fileName: string,
  isHtmlContent: boolean = false
) => {
  try {
    toast.info("Generating PDF...");
    
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 6;
    let currentY = margin;
    
    let lines: string[];
    if (isHtmlContent) {
      lines = extractTextFromHtml(content);
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
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};

const extractTextFromHtml = (content: string): string[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const lines: string[] = [];
  
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
  
  return lines;
};