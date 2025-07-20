
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
    const margin = 15; // Reduced from 20pt for better space utilization
    const maxWidth = pageWidth - 2 * margin;
    let currentY = margin;
    
    // Optimized line spacing for single-page business letters
    const PARAGRAPH_SPACING = 11; // Between actual paragraphs/sections
    const WRAPPED_LINE_SPACING = 8; // Between wrapped text within same paragraph
    const MINIMAL_SPACING = 6; // For empty lines and tight spacing
    
    // Process the letter lines with enhanced formatting
    const processedLines = processLetterLines(content, templateId);
    
    console.log(`Processing ${processedLines.length} lines for PDF generation with optimized spacing`);
    
    // First pass: calculate total content height to check if compression needed
    let totalHeight = margin;
    const lineHeights = [];
    
    for (let i = 0; i < processedLines.length; i++) {
      const processedLine = processedLines[i];
      
      if (processedLine.isEmpty) {
        lineHeights.push(MINIMAL_SPACING);
        totalHeight += MINIMAL_SPACING;
        continue;
      }
      
      const { line, formatting } = processedLine;
      if (!formatting) continue;
      
      const fontSize = parseInt(formatting.fontSize);
      pdf.setFontSize(fontSize);
      
      if (formatting.textAlign === 'center' || formatting.textAlign === 'right') {
        lineHeights.push(PARAGRAPH_SPACING);
        totalHeight += PARAGRAPH_SPACING;
      } else {
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        const segmentHeight = splitLines.length > 1 ? 
          PARAGRAPH_SPACING + (splitLines.length - 1) * WRAPPED_LINE_SPACING :
          PARAGRAPH_SPACING;
        lineHeights.push(segmentHeight);
        totalHeight += segmentHeight;
      }
    }
    
    // Apply compression if needed for single-page guarantee
    let compressionFactor = 1;
    if (totalHeight > pageHeight - margin) {
      compressionFactor = Math.min(0.85, (pageHeight - 2 * margin) / totalHeight);
      console.log(`Applying compression factor: ${compressionFactor} to fit single page`);
    }
    
    // Second pass: render with optimized spacing
    let lineIndex = 0;
    currentY = margin;
    
    for (let i = 0; i < processedLines.length; i++) {
      const processedLine = processedLines[i];
      
      // Handle empty lines with minimal spacing
      if (processedLine.isEmpty) {
        currentY += MINIMAL_SPACING * compressionFactor;
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      
      // Skip lines without formatting
      if (!formatting) continue;
      
      // Check if we need a new page (should not happen with compression)
      if (currentY > pageHeight - margin - 30) {
        pdf.addPage();
        currentY = margin;
        console.warn('Page break occurred despite compression - content may be too long');
      }
      
      // Apply optimized font sizes for better density
      let fontSize = parseInt(formatting.fontSize);
      if (formatting.isHeader) {
        fontSize = Math.max(10, Math.round(fontSize * 0.92)); // Reduced header size
      } else if (formatting.isContact) {
        fontSize = Math.max(8, Math.round(fontSize * 0.90)); // Smaller contact info
      } else {
        fontSize = Math.max(9, Math.round(fontSize * 0.91)); // Slightly smaller body text
      }
      
      const fontStyle = formatting.fontWeight === 'bold' ? 'bold' : 'normal';
      
      console.log(`Line ${i}: "${line.substring(0, 30)}..." - fontSize: ${fontSize}pt, Y: ${currentY}`);
      
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      
      // Handle different alignment types with OPTIMIZED spacing
      if (formatting.textAlign === 'center') {
        // Center alignment for headers
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pageWidth - textWidth) / 2;
        pdf.text(line, centerX, currentY);
        currentY += PARAGRAPH_SPACING * compressionFactor;
        
      } else if (formatting.textAlign === 'right') {
        // Right alignment for date
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, pageWidth - margin - textWidth, currentY);
        currentY += PARAGRAPH_SPACING * compressionFactor;
        
      } else {
        // Left alignment with SMART WRAPPING logic
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        
        console.log(`Split "${line.substring(0, 30)}..." into ${splitLines.length} segments`);
        
        // Apply SMART spacing: different spacing for wrapped vs separate lines
        for (let j = 0; j < splitLines.length; j++) {
          const splitLine = splitLines[j];
          
          if (currentY > pageHeight - margin - 30) {
            pdf.addPage();
            currentY = margin;
          }
          
          pdf.text(splitLine, margin, currentY);
          
          // Smart spacing logic
          if (j === 0 && splitLines.length === 1) {
            // Single line - normal paragraph spacing
            currentY += PARAGRAPH_SPACING * compressionFactor;
          } else if (j === splitLines.length - 1) {
            // Last segment of wrapped text - paragraph spacing
            currentY += PARAGRAPH_SPACING * compressionFactor;
          } else {
            // Wrapped line within paragraph - minimal spacing
            currentY += WRAPPED_LINE_SPACING * compressionFactor;
          }
          
          console.log(`Applied ${j === splitLines.length - 1 ? 'paragraph' : 'wrapped'} spacing to segment ${j + 1}`);
        }
      }
      
      lineIndex++;
    }
    
    const finalY = currentY;
    const fitsOnOnePage = finalY < pageHeight - margin;
    
    console.log(`PDF generated with final Y position: ${finalY}pt, Page height: ${pageHeight}pt`);
    console.log(`Content fits on single page: ${fitsOnOnePage}`);
    console.log(`Compression factor applied: ${compressionFactor}`);
    console.log(`Total content height: ${finalY - margin}pt`);
    
    // Success validation
    if (fitsOnOnePage) {
      console.log('✅ Single-page cover letter successfully generated');
    } else {
      console.warn(`⚠️ Content still exceeds single page despite optimization`);
    }
    
    pdf.save(`${fileName}_cover_letter.pdf`);
    toast.success("Cover letter downloaded as PDF!");
  } catch (error) {
    console.error('Error generating cover letter PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};
