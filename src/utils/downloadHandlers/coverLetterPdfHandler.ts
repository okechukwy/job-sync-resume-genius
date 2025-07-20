
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
    
    // Helper function to convert CSS margin to minimal PDF spacing
    const convertMarginToPdfSpacing = (marginBottom: string): number => {
      const value = parseInt(marginBottom);
      // Drastically reduce all spacing for single-page fit
      return Math.min(value * 0.2, 3); // Maximum 3pt spacing
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
    
    // Process each line with minimal business letter formatting
    for (let i = 0; i < processedLines.length; i++) {
      const processedLine = processedLines[i];
      
      // Handle empty lines with minimal spacing
      if (processedLine.isEmpty) {
        // Only add 1pt for empty lines to maintain readability
        currentY += 1;
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      
      if (!formatting) {
        currentY += 2; // Minimal spacing for unformatted lines
        continue;
      }
      
      // Check if we need a new page
      if (currentY > pageHeight - margin - 20) {
        pdf.addPage();
        currentY = margin;
      }
      
      // Convert CSS-style values to jsPDF values
      const fontSize = parseInt(formatting.fontSize);
      const fontStyle = formatting.fontWeight === 'bold' ? 'bold' : 'normal';
      
      // Use minimal spacing based on section context
      let spacing = 2; // Default minimal spacing
      
      // Context-aware minimal spacing adjustments
      if (context?.section === 'header') {
        if (formatting.isHeader) {
          spacing = 3; // Name spacing
        } else if (formatting.isContact) {
          spacing = 1; // Contact info minimal spacing
        }
      } else if (context?.section === 'body') {
        // Minimal paragraph spacing
        if (isParagraphBreak(i, processedLines)) {
          spacing = 3; // Small gap between paragraphs
        } else {
          spacing = 1; // Tight spacing within paragraphs
        }
      } else if (context?.section === 'date') {
        spacing = 4; // Slightly more space after date
      } else if (context?.section === 'recipient') {
        spacing = 1; // Tight spacing for recipient address
      } else if (context?.section === 'closing') {
        spacing = 2; // Minimal closing spacing
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
          
          if (currentY > pageHeight - margin - 20) {
            pdf.addPage();
            currentY = margin;
          }
          
          pdf.text(splitLine, margin, currentY);
          
          // Only add full spacing after the last split line
          if (j === splitLines.length - 1) {
            currentY += spacing;
          } else {
            // Minimal line spacing within split text (single line spacing)
            currentY += fontSize * 1.0; // Exactly 1x line height
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
