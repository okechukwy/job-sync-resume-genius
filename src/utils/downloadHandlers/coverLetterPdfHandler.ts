
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
    
    // Fixed line spacing for consistent single-line formatting
    const SINGLE_LINE_SPACING = 12; // 12pt consistent line spacing
    
    // Process the letter lines with enhanced formatting
    const processedLines = processLetterLines(content, templateId);
    
    console.log(`Processing ${processedLines.length} lines for PDF generation`);
    
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
      
      // Skip empty lines entirely - no spacing added
      if (processedLine.isEmpty) {
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      
      if (!formatting) {
        currentY += SINGLE_LINE_SPACING;
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
      
      // Minimal context-based spacing (0-3pt maximum)
      let additionalSpacing = 0;
      
      if (context?.section === 'header') {
        if (formatting.isHeader) {
          additionalSpacing = 2; // Name spacing
        }
        // Contact info gets 0 additional spacing
      } else if (context?.section === 'body') {
        if (isParagraphBreak(i, processedLines)) {
          additionalSpacing = 3; // Small gap between paragraphs
        }
        // Within paragraphs gets 0 additional spacing
      } else if (context?.section === 'date') {
        additionalSpacing = 3; // Space after date
      } else if (context?.section === 'closing') {
        additionalSpacing = 2; // Minimal closing spacing
      }
      
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      
      // Handle different alignment types
      if (formatting.textAlign === 'center') {
        // Center alignment for headers
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pageWidth - textWidth) / 2;
        pdf.text(line, centerX, currentY);
        currentY += SINGLE_LINE_SPACING + additionalSpacing;
      } else if (formatting.textAlign === 'right') {
        // Right alignment for date
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, pageWidth - margin - textWidth, currentY);
        currentY += SINGLE_LINE_SPACING + additionalSpacing;
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
          
          // Use consistent single-line spacing for all split lines
          currentY += SINGLE_LINE_SPACING;
        }
        
        // Add minimal additional spacing only after the complete logical line
        currentY += additionalSpacing;
      }
    }
    
    console.log(`PDF generated with final Y position: ${currentY}, Page height: ${pageHeight}`);
    
    pdf.save(`${fileName}_cover_letter.pdf`);
    toast.success("Cover letter downloaded as PDF!");
  } catch (error) {
    console.error('Error generating cover letter PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};
