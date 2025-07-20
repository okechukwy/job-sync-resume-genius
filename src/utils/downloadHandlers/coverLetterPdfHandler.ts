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
    
    // Enhanced spacing hierarchy for professional business letter format
    const MINIMAL_SPACING = 6; // Empty lines and within wrapped text
    const HEADER_SPACING = 7; // Between header elements (name, contact, etc.)
    const DATE_SPACING = 8; // For date line
    const PARAGRAPH_SPACING = 11; // Between distinct content sections
    const SECTION_SPACING = 12; // Between major sections (header → date → recipient)
    const WRAPPED_LINE_SPACING = 8; // Between wrapped text within same paragraph
    
    // Process the letter lines with enhanced formatting
    const processedLines = processLetterLines(content, templateId);
    
    console.log(`Processing ${processedLines.length} lines for PDF generation with context-aware spacing`);
    
    // First pass: calculate total content height with context-aware spacing
    let totalHeight = margin;
    const lineHeights = [];
    
    for (let i = 0; i < processedLines.length; i++) {
      const processedLine = processedLines[i];
      
      if (processedLine.isEmpty) {
        lineHeights.push(MINIMAL_SPACING);
        totalHeight += MINIMAL_SPACING;
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      if (!formatting) continue;
      
      const fontSize = parseInt(formatting.fontSize);
      pdf.setFontSize(fontSize);
      
      // Context-aware spacing logic
      let spacingToApply = PARAGRAPH_SPACING; // default
      
      if (context?.section === 'header') {
        // Header elements get tight spacing
        spacingToApply = HEADER_SPACING;
      } else if (formatting.textAlign === 'right' && context?.section === 'date') {
        // Date line gets moderate spacing
        spacingToApply = DATE_SPACING;
      } else if (formatting.textAlign === 'center' || formatting.textAlign === 'right') {
        // Other centered/right-aligned elements (likely headers)
        spacingToApply = context?.section === 'header' ? HEADER_SPACING : PARAGRAPH_SPACING;
      } else if (context?.section === 'closing' || context?.section === 'signature') {
        // Closing and signature elements
        spacingToApply = HEADER_SPACING;
      }
      
      // Handle text wrapping for left-aligned content
      if (formatting.textAlign === 'left') {
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        const segmentHeight = splitLines.length > 1 ? 
          spacingToApply + (splitLines.length - 1) * WRAPPED_LINE_SPACING :
          spacingToApply;
        lineHeights.push(segmentHeight);
        totalHeight += segmentHeight;
      } else {
        lineHeights.push(spacingToApply);
        totalHeight += spacingToApply;
      }
    }
    
    // Apply compression if needed for single-page guarantee
    let compressionFactor = 1;
    if (totalHeight > pageHeight - margin) {
      compressionFactor = Math.min(0.85, (pageHeight - 2 * margin) / totalHeight);
      console.log(`Applying compression factor: ${compressionFactor} to fit single page`);
    }
    
    // Second pass: render with context-aware spacing
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
      
      console.log(`Line ${i}: "${line.substring(0, 30)}..." - fontSize: ${fontSize}pt, Y: ${currentY}, Context: ${context?.section}`);
      
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      
      // Context-aware spacing logic for rendering
      let spacingToApply = PARAGRAPH_SPACING; // default
      
      if (context?.section === 'header') {
        spacingToApply = HEADER_SPACING;
      } else if (formatting.textAlign === 'right' && context?.section === 'date') {
        spacingToApply = DATE_SPACING;
      } else if (formatting.textAlign === 'center' || formatting.textAlign === 'right') {
        spacingToApply = context?.section === 'header' ? HEADER_SPACING : PARAGRAPH_SPACING;
      } else if (context?.section === 'closing' || context?.section === 'signature') {
        spacingToApply = HEADER_SPACING;
      }
      
      // Handle different alignment types with CONTEXT-AWARE spacing
      if (formatting.textAlign === 'center') {
        // Center alignment for headers with tight spacing
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pageWidth - textWidth) / 2;
        pdf.text(line, centerX, currentY);
        currentY += spacingToApply * compressionFactor;
        
      } else if (formatting.textAlign === 'right') {
        // Right alignment for date with appropriate spacing
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, pageWidth - margin - textWidth, currentY);
        currentY += spacingToApply * compressionFactor;
        
      } else {
        // Left alignment with SMART WRAPPING logic
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        
        console.log(`Split "${line.substring(0, 30)}..." into ${splitLines.length} segments with ${spacingToApply}pt spacing`);
        
        // Apply CONTEXT-AWARE spacing: different spacing for wrapped vs separate lines
        for (let j = 0; j < splitLines.length; j++) {
          const splitLine = splitLines[j];
          
          if (currentY > pageHeight - margin - 30) {
            pdf.addPage();
            currentY = margin;
          }
          
          pdf.text(splitLine, margin, currentY);
          
          // Smart spacing logic with context awareness
          if (j === 0 && splitLines.length === 1) {
            // Single line - use context-aware spacing
            currentY += spacingToApply * compressionFactor;
          } else if (j === splitLines.length - 1) {
            // Last segment of wrapped text - use context-aware spacing
            currentY += spacingToApply * compressionFactor;
          } else {
            // Wrapped line within paragraph - minimal spacing
            currentY += WRAPPED_LINE_SPACING * compressionFactor;
          }
          
          console.log(`Applied ${j === splitLines.length - 1 ? 'context-aware' : 'wrapped'} spacing (${j === splitLines.length - 1 ? spacingToApply : WRAPPED_LINE_SPACING}pt) to segment ${j + 1}`);
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
      console.log('✅ Single-page cover letter successfully generated with context-aware spacing');
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
