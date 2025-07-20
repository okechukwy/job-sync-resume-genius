
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import { processLetterLines } from '../coverLetterFormatting';

export const downloadCoverLetterAsPdf = async (
  content: string,
  fileName: string,
  templateId: string = 'classic-professional'
) => {
  try {
    toast.info("Generating cover letter PDF...");
    
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 25; // 1 inch margins
    const maxWidth = pageWidth - 2 * margin;
    let currentY = margin;
    
    // Process the letter lines with enhanced formatting
    const processedLines = processLetterLines(content, templateId);
    
    // Helper function to convert CSS margin to PDF spacing
    const convertMarginToPdfSpacing = (marginBottom: string): number => {
      const value = parseInt(marginBottom);
      // Convert CSS pixels to PDF points (more conservative conversion)
      return Math.max(value * 0.5, 4);
    };
    
    // Helper function to detect paragraph context
    const isParagraphBreak = (currentIndex: number, lines: typeof processedLines): boolean => {
      if (currentIndex === 0) return false;
      const prevLine = lines[currentIndex - 1];
      const currentLine = lines[currentIndex];
      
      // Paragraph break if previous line wasn't empty and current is body text
      return !prevLine.isEmpty && 
             currentLine.context?.section === 'body' &&
             prevLine.context?.section === 'body';
    };
    
    // Process each line with optimized business letter formatting
    for (let i = 0; i < processedLines.length; i++) {
      const processedLine = processedLines[i];
      
      // Handle empty lines with minimal spacing
      if (processedLine.isEmpty) {
        // Reduce empty line spacing significantly
        currentY += 3;
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      
      if (!formatting) {
        currentY += 4; // Minimal spacing for unformatted lines
        continue;
      }
      
      // Check if we need a new page
      if (currentY > pageHeight - margin - 30) {
        pdf.addPage();
        currentY = margin;
      }
      
      // Convert CSS-style values to jsPDF values
      const fontSize = parseInt(formatting.fontSize);
      const fontStyle = formatting.fontWeight === 'bold' ? 'bold' : 'normal';
      
      // Use formatting-based spacing instead of font-size calculations
      let spacing = convertMarginToPdfSpacing(formatting.marginBottom);
      
      // Context-aware spacing adjustments
      if (context?.section === 'header') {
        if (formatting.isHeader) {
          spacing = 6; // Tighter spacing for name
        } else if (formatting.isContact) {
          spacing = 4; // Minimal spacing for contact info
        }
      } else if (context?.section === 'body') {
        // Paragraph detection for body text
        if (isParagraphBreak(i, processedLines)) {
          spacing = 8; // Moderate spacing between paragraphs
        } else {
          spacing = 5; // Tight spacing within paragraphs
        }
      } else if (context?.section === 'date') {
        spacing = 12; // Standard spacing after date
      } else if (context?.section === 'recipient') {
        spacing = 5; // Tight spacing for recipient address
      } else if (context?.section === 'closing') {
        spacing = 8; // Moderate spacing for closing
      }
      
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      
      // Handle different alignment types
      if (formatting.textAlign === 'center') {
        // Center alignment for headers
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pageWidth - textWidth) / 2;
        pdf.text(line, centerX, currentY);
        currentY += spacing;
      } else if (formatting.textAlign === 'right') {
        // Right alignment for date
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, pageWidth - margin - textWidth, currentY);
        currentY += spacing;
      } else {
        // Left alignment (default)
        // Split long lines to fit page width
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        
        for (let j = 0; j < splitLines.length; j++) {
          const splitLine = splitLines[j];
          
          if (currentY > pageHeight - margin - 30) {
            pdf.addPage();
            currentY = margin;
          }
          
          pdf.text(splitLine, margin, currentY);
          
          // Only add full spacing after the last split line
          if (j === splitLines.length - 1) {
            currentY += spacing;
          } else {
            // Minimal line spacing within split text
            currentY += fontSize * 1.15; // Standard 1.15 line height
          }
        }
      }
    }
    
    pdf.save(`${fileName}_cover_letter.pdf`);
    toast.success("Cover letter downloaded as PDF!");
  } catch (error) {
    console.error('Error generating cover letter PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};
