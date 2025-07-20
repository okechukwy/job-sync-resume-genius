
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
    
    console.log(`Processing ${processedLines.length} lines for PDF generation`);
    
    // Helper function to calculate proper line height based on font size
    const getLineHeight = (fontSize: number): number => {
      return fontSize * 1.2; // Standard single-line spacing (120% of font size)
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
    
    // Process each line with proper single-line spacing
    for (let i = 0; i < processedLines.length; i++) {
      const processedLine = processedLines[i];
      
      // Handle empty lines with minimal spacing for intentional breaks
      if (processedLine.isEmpty) {
        currentY += 4; // Minimal 4pt spacing for intentional breaks
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      
      if (!formatting) {
        currentY += 12; // Default line height for unformatted lines
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
      const lineHeight = getLineHeight(fontSize);
      
      console.log(`Line ${i}: "${line.substring(0, 50)}..." - fontSize: ${fontSize}pt, lineHeight: ${lineHeight}pt, Y: ${currentY}`);
      
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      
      // Handle different alignment types
      if (formatting.textAlign === 'center') {
        // Center alignment for headers
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pageWidth - textWidth) / 2;
        pdf.text(line, centerX, currentY);
        currentY += lineHeight;
      } else if (formatting.textAlign === 'right') {
        // Right alignment for date
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, pageWidth - margin - textWidth, currentY);
        currentY += lineHeight;
      } else {
        // Left alignment (default) - FIXED SPLIT TEXT LOGIC
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        
        // Apply spacing only once per logical line, not per split segment
        for (let j = 0; j < splitLines.length; j++) {
          const splitLine = splitLines[j];
          
          if (currentY > pageHeight - margin - 20) {
            pdf.addPage();
            currentY = margin;
          }
          
          pdf.text(splitLine, margin, currentY);
          
          // Only advance Y position by line height for each split line
          // This ensures consistent spacing between all lines
          currentY += lineHeight;
        }
        
        // No additional spacing needed - line height already applied to each split line
      }
    }
    
    console.log(`PDF generated with final Y position: ${currentY}, Page height: ${pageHeight}`);
    console.log(`Content fits on single page: ${currentY < pageHeight - margin}`);
    
    pdf.save(`${fileName}_cover_letter.pdf`);
    toast.success("Cover letter downloaded as PDF!");
  } catch (error) {
    console.error('Error generating cover letter PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};
