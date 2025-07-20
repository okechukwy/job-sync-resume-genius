
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
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    let currentY = margin;
    
    // Enhanced spacing hierarchy with reduced salutation spacing
    const MINIMAL_SPACING = 6;
    const SALUTATION_EMPTY_SPACING = 2; // Reduced from 3.5pt
    const HEADER_SPACING = 7;
    const SALUTATION_SPACING = 5; // Reduced from 7pt
    const DATE_SPACING = 8;
    const PARAGRAPH_SPACING = 11;
    const SECTION_SPACING = 12;
    const WRAPPED_LINE_SPACING = 8;
    
    const processedLines = processLetterLines(content, templateId);
    
    console.log(`Processing ${processedLines.length} lines for PDF generation with salutation block consolidation`);
    
    // Enhanced salutation block detection
    const detectSalutationBlock = (lines: any[], startIndex: number) => {
      const block = { start: startIndex, end: startIndex, lines: [] };
      
      // Look backward for empty lines before salutation
      let backwardIndex = startIndex - 1;
      while (backwardIndex >= 0 && lines[backwardIndex]?.isEmpty && 
             lines[backwardIndex]?.context?.isEmptyInSalutationContext) {
        block.start = backwardIndex;
        backwardIndex--;
      }
      
      // Look forward for the salutation and following empty lines
      let forwardIndex = startIndex;
      while (forwardIndex < lines.length) {
        const line = lines[forwardIndex];
        if (line?.context?.section === 'salutation' || 
            (line?.isEmpty && line?.context?.isEmptyInSalutationContext)) {
          block.end = forwardIndex;
          forwardIndex++;
        } else {
          break;
        }
      }
      
      block.lines = lines.slice(block.start, block.end + 1);
      console.log(`Detected salutation block from ${block.start} to ${block.end} with ${block.lines.length} lines`);
      return block;
    };
    
    // First pass: calculate total content height with salutation block consolidation
    let totalHeight = margin;
    const lineHeights = [];
    let processedIndices = new Set();
    
    for (let i = 0; i < processedLines.length; i++) {
      if (processedIndices.has(i)) continue;
      
      const processedLine = processedLines[i];
      
      // Handle salutation blocks specially
      if (processedLine.context?.section === 'salutation' && !processedLine.isEmpty) {
        const salutationBlock = detectSalutationBlock(processedLines, i);
        
        // Mark all indices in this block as processed
        for (let j = salutationBlock.start; j <= salutationBlock.end; j++) {
          processedIndices.add(j);
        }
        
        // Calculate consolidated spacing for the entire salutation block
        const salutationLines = salutationBlock.lines.filter(line => !line.isEmpty);
        const emptyLines = salutationBlock.lines.filter(line => line.isEmpty);
        
        // Apply minimal spacing within the block and single exit spacing
        const blockHeight = salutationLines.length * SALUTATION_SPACING + 
                           emptyLines.length * SALUTATION_EMPTY_SPACING + 
                           SALUTATION_SPACING; // Single exit spacing
        
        lineHeights.push(blockHeight);
        totalHeight += blockHeight;
        
        console.log(`Salutation block height: ${blockHeight}pt (${salutationLines.length} content lines, ${emptyLines.length} empty lines)`);
        continue;
      }
      
      // Handle regular lines
      if (processedLine.isEmpty) {
        const spacingForEmpty = processedLine.context?.isEmptyInSalutationContext ? 
          SALUTATION_EMPTY_SPACING : MINIMAL_SPACING;
        lineHeights.push(spacingForEmpty);
        totalHeight += spacingForEmpty;
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      if (!formatting) continue;
      
      const fontSize = parseInt(formatting.fontSize);
      pdf.setFontSize(fontSize);
      
      // Context-aware spacing logic for non-salutation lines
      let spacingToApply = PARAGRAPH_SPACING;
      
      if (context?.section === 'header') {
        spacingToApply = HEADER_SPACING;
      } else if (formatting.textAlign === 'right' && context?.section === 'date') {
        spacingToApply = DATE_SPACING;
      } else if (formatting.textAlign === 'center' || formatting.textAlign === 'right') {
        spacingToApply = context?.section === 'header' ? HEADER_SPACING : PARAGRAPH_SPACING;
      } else if (context?.section === 'closing' || context?.section === 'signature') {
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
    
    // Second pass: render with salutation block consolidation
    currentY = margin;
    processedIndices.clear();
    
    for (let i = 0; i < processedLines.length; i++) {
      if (processedIndices.has(i)) continue;
      
      const processedLine = processedLines[i];
      
      // Handle salutation blocks with consolidated rendering
      if (processedLine.context?.section === 'salutation' && !processedLine.isEmpty) {
        const salutationBlock = detectSalutationBlock(processedLines, i);
        
        // Mark all indices in this block as processed
        for (let j = salutationBlock.start; j <= salutationBlock.end; j++) {
          processedIndices.add(j);
        }
        
        console.log(`Rendering salutation block at Y: ${currentY}`);
        
        // Render each line in the salutation block with minimal internal spacing
        for (const blockLine of salutationBlock.lines) {
          if (blockLine.isEmpty) {
            // Apply minimal spacing for empty lines within the block
            currentY += SALUTATION_EMPTY_SPACING * compressionFactor;
            console.log(`Applied minimal empty line spacing: ${SALUTATION_EMPTY_SPACING}pt`);
            continue;
          }
          
          const { line, formatting } = blockLine;
          if (!formatting) continue;
          
          // Check if we need a new page
          if (currentY > pageHeight - margin - 30) {
            pdf.addPage();
            currentY = margin;
          }
          
          // Apply optimized font sizes
          let fontSize = parseInt(formatting.fontSize);
          fontSize = Math.max(9, Math.round(fontSize * 0.91));
          
          const fontStyle = formatting.fontWeight === 'bold' ? 'bold' : 'normal';
          
          pdf.setFontSize(fontSize);
          pdf.setFont(undefined, fontStyle);
          
          // Render the salutation line
          pdf.text(line, margin, currentY);
          currentY += SALUTATION_SPACING * compressionFactor;
          
          console.log(`Rendered salutation line: "${line.substring(0, 30)}..." with ${SALUTATION_SPACING}pt spacing`);
        }
        
        // Apply single exit spacing for the entire block
        currentY += SALUTATION_SPACING * compressionFactor;
        console.log(`Applied salutation block exit spacing: ${SALUTATION_SPACING}pt`);
        continue;
      }
      
      // Handle regular empty lines
      if (processedLine.isEmpty) {
        const spacingForEmpty = processedLine.context?.isEmptyInSalutationContext ? 
          SALUTATION_EMPTY_SPACING : MINIMAL_SPACING;
        currentY += spacingForEmpty * compressionFactor;
        continue;
      }
      
      const { line, formatting, context } = processedLine;
      
      // Skip lines without formatting
      if (!formatting) continue;
      
      // Check if we need a new page
      if (currentY > pageHeight - margin - 30) {
        pdf.addPage();
        currentY = margin;
      }
      
      // Apply optimized font sizes
      let fontSize = parseInt(formatting.fontSize);
      if (formatting.isHeader) {
        fontSize = Math.max(10, Math.round(fontSize * 0.92));
      } else if (formatting.isContact) {
        fontSize = Math.max(8, Math.round(fontSize * 0.90));
      } else {
        fontSize = Math.max(9, Math.round(fontSize * 0.91));
      }
      
      const fontStyle = formatting.fontWeight === 'bold' ? 'bold' : 'normal';
      
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      
      // Context-aware spacing logic for rendering
      let spacingToApply = PARAGRAPH_SPACING;
      
      if (context?.section === 'header') {
        spacingToApply = HEADER_SPACING;
      } else if (formatting.textAlign === 'right' && context?.section === 'date') {
        spacingToApply = DATE_SPACING;
      } else if (formatting.textAlign === 'center' || formatting.textAlign === 'right') {
        spacingToApply = context?.section === 'header' ? HEADER_SPACING : PARAGRAPH_SPACING;
      } else if (context?.section === 'closing' || context?.section === 'signature') {
        spacingToApply = HEADER_SPACING;
      }
      
      // Handle different alignment types
      if (formatting.textAlign === 'center') {
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pageWidth - textWidth) / 2;
        pdf.text(line, centerX, currentY);
        currentY += spacingToApply * compressionFactor;
        
      } else if (formatting.textAlign === 'right') {
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, pageWidth - margin - textWidth, currentY);
        currentY += spacingToApply * compressionFactor;
        
      } else {
        // Left alignment with smart wrapping
        const splitLines = pdf.splitTextToSize(line, maxWidth);
        
        for (let j = 0; j < splitLines.length; j++) {
          const splitLine = splitLines[j];
          
          if (currentY > pageHeight - margin - 30) {
            pdf.addPage();
            currentY = margin;
          }
          
          pdf.text(splitLine, margin, currentY);
          
          if (j === 0 && splitLines.length === 1) {
            currentY += spacingToApply * compressionFactor;
          } else if (j === splitLines.length - 1) {
            currentY += spacingToApply * compressionFactor;
          } else {
            currentY += WRAPPED_LINE_SPACING * compressionFactor;
          }
        }
      }
    }
    
    const finalY = currentY;
    const fitsOnOnePage = finalY < pageHeight - margin;
    
    console.log(`PDF generated with salutation block consolidation`);
    console.log(`Final Y position: ${finalY}pt, Content fits on single page: ${fitsOnOnePage}`);
    console.log(`Salutation spacing reduced to ${SALUTATION_SPACING}pt, empty lines to ${SALUTATION_EMPTY_SPACING}pt`);
    
    if (fitsOnOnePage) {
      console.log('✅ Single-page cover letter successfully generated with consolidated salutation spacing');
    }
    
    pdf.save(`${fileName}_cover_letter.pdf`);
    toast.success("Cover letter downloaded as PDF!");
  } catch (error) {
    console.error('Error generating cover letter PDF:', error);
    toast.error('Failed to generate PDF. Please try again.');
    throw error;
  }
};
