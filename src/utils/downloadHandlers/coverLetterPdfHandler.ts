
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
    
    // Helper function to calculate proper line height based on font size (tighter for business letters)
    const getLineHeight = (fontSize: number): number => {
      return fontSize * 1.1; // Reduced from 1.2 to 1.1 for business letter formatting
    };
    
    // Helper function to detect paragraph breaks (not line wrapping)
    const isParagraphBreak = (currentIndex: number, lines: typeof processedLines): boolean => {
      if (currentIndex === 0) return false;
      const prevLine = lines[currentIndex - 1];
      const currentLine = lines[currentIndex];
      
      // Only true paragraph breaks between body sections
      return !prevLine.isEmpty && 
             currentLine.context?.section === 'body' &&
             prevLine.context?.section === 'body' &&
             currentLine.line.length > 50; // Likely start of new paragraph, not continuation
    };
    
    // Process each line with proper single-line spacing
    for (let i = 0; i < processedLines.length; i++) {
      const processedLine = processedLines[i];
      
      // Handle empty lines with minimal spacing for intentional breaks
      if (processedLine.isEmpty) {
        currentY += 3; // Minimal 3pt spacing for intentional breaks
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      
      if (!formatting) {
        currentY += 10; // Default minimal spacing for unformatted lines
        continue;
      }
      
      // Add paragraph spacing only for actual paragraph breaks
      if (isParagraphBreak(i, processedLines)) {
        currentY += 6; // 6pt extra spacing between paragraphs
        console.log(`Added paragraph spacing at line ${i}: "${line.substring(0, 30)}..."`);
      }
      
      // Check if we need a new page
      if (currentY > pageHeight - margin - 30) {
        pdf.addPage();
        currentY = margin;
      }
      
      // Convert CSS-style values to jsPDF values
      const fontSize = parseInt(formatting.fontSize);
      const fontStyle = formatting.fontWeight === 'bold' ? 'bold' : 'normal';
      const lineHeight = getLineHeight(fontSize);
      
      console.log(`Line ${i}: "${line.substring(0, 30)}..." - fontSize: ${fontSize}pt, lineHeight: ${lineHeight}pt, Y: ${currentY}`);
      
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
        
        console.log(`Split "${line.substring(0, 30)}..." into ${splitLines.length} segments`);
        
        // Apply spacing logic: minimal spacing between wrapped segments, full spacing after complete line
        for (let j = 0; j < splitLines.length; j++) {
          const splitLine = splitLines[j];
          const isLastSegment = j === splitLines.length - 1;
          
          if (currentY > pageHeight - margin - 30) {
            pdf.addPage();
            currentY = margin;
          }
          
          pdf.text(splitLine, margin, currentY);
          
          // Critical fix: Apply minimal spacing between wrapped segments, full line height only after complete logical line
          if (isLastSegment) {
            // Apply full line height after the complete logical line
            currentY += lineHeight;
            console.log(`Applied full line height (${lineHeight}pt) after complete line`);
          } else {
            // Apply minimal spacing between wrapped segments of the same logical line
            currentY += 3; // 3pt between wrapped segments
            console.log(`Applied minimal spacing (3pt) between wrapped segments`);
          }
        }
      }
    }
    
    const finalY = currentY;
    const fitsOnOnePage = finalY < pageHeight - margin;
    
    console.log(`PDF generated with final Y position: ${finalY}pt, Page height: ${pageHeight}pt`);
    console.log(`Content fits on single page: ${fitsOnOnePage}`);
    console.log(`Total content height: ${finalY - margin}pt`);
    
    pdf.save(`${fileName}_cover_letter.pdf`);
    toast.success("Cover letter downloaded as PDF!");
  } catch (error) {
    console.error('Error generating cover letter PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};
