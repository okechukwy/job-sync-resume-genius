
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
    const margin = 20; // Reduced from 25pt for better space utilization
    const maxWidth = pageWidth - 2 * margin;
    let currentY = margin;
    
    // Fixed line spacing for professional business letters
    const FIXED_LINE_SPACING = 14; // 14pt spacing for all text regardless of font size
    
    // Process the letter lines with enhanced formatting
    const processedLines = processLetterLines(content, templateId);
    
    console.log(`Processing ${processedLines.length} lines for PDF generation with fixed 14pt spacing`);
    
    // Process each line with consistent single-line spacing
    for (let i = 0; i < processedLines.length; i++) {
      const processedLine = processedLines[i];
      
      // Skip empty lines completely - no spacing added
      if (processedLine.isEmpty) {
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      
      // Skip lines without formatting
      if (!formatting) {
        continue;
      }
      
      // Check if we need a new page before adding content
      if (currentY > pageHeight - margin - 30) {
        pdf.addPage();
        currentY = margin;
      }
      
      // Convert CSS-style values to jsPDF values
      const fontSize = parseInt(formatting.fontSize);
      const fontStyle = formatting.fontWeight === 'bold' ? 'bold' : 'normal';
      
      console.log(`Line ${i}: "${line.substring(0, 30)}..." - fontSize: ${fontSize}pt, fixed spacing: ${FIXED_LINE_SPACING}pt, Y: ${currentY}`);
      
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      
      // Handle different alignment types with CONSISTENT spacing
      if (formatting.textAlign === 'center') {
        // Center alignment for headers - FIXED SPACING
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pageWidth - textWidth) / 2;
        pdf.text(line, centerX, currentY);
        currentY += FIXED_LINE_SPACING; // Apply fixed spacing once
        
      } else if (formatting.textAlign === 'right') {
        // Right alignment for date - FIXED SPACING
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, pageWidth - margin - textWidth, currentY);
        currentY += FIXED_LINE_SPACING; // Apply fixed spacing once
        
      } else {
        // Left alignment (default) - CONSISTENT SPLIT TEXT LOGIC
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        
        console.log(`Split "${line.substring(0, 30)}..." into ${splitLines.length} segments`);
        
        // Apply FIXED spacing logic: consistent spacing for all segments
        for (let j = 0; j < splitLines.length; j++) {
          const splitLine = splitLines[j];
          
          if (currentY > pageHeight - margin - 30) {
            pdf.addPage();
            currentY = margin;
          }
          
          pdf.text(splitLine, margin, currentY);
          
          // Apply FIXED spacing to every segment - no special logic
          currentY += FIXED_LINE_SPACING;
          console.log(`Applied fixed spacing (${FIXED_LINE_SPACING}pt) to segment ${j + 1}`);
        }
      }
    }
    
    const finalY = currentY;
    const fitsOnOnePage = finalY < pageHeight - margin;
    
    console.log(`PDF generated with final Y position: ${finalY}pt, Page height: ${pageHeight}pt`);
    console.log(`Content fits on single page: ${fitsOnOnePage}`);
    console.log(`Total content height: ${finalY - margin}pt`);
    console.log(`Fixed line spacing used throughout: ${FIXED_LINE_SPACING}pt`);
    
    // Validate single-page output
    if (!fitsOnOnePage) {
      console.warn(`Content exceeded single page: ${finalY}pt total height`);
    }
    
    pdf.save(`${fileName}_cover_letter.pdf`);
    toast.success("Cover letter downloaded as PDF!");
  } catch (error) {
    console.error('Error generating cover letter PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};
