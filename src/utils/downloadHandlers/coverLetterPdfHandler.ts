
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import { getLineFormatting } from '../coverLetterFormatting';

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
    
    // Split content into lines
    const lines = content.split('\n');
    
    // Process each line with proper business letter formatting
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines but add appropriate spacing
      if (!line) {
        currentY += 6;
        continue;
      }
      
      // Check if we need a new page
      if (currentY > pageHeight - margin - 20) {
        pdf.addPage();
        currentY = margin;
      }
      
      // Get formatting for this line
      const formatting = getLineFormatting(line, templateId);
      
      // Convert CSS-style values to jsPDF values
      const fontSize = parseInt(formatting.fontSize);
      const fontStyle = formatting.fontWeight === 'bold' ? 'bold' : 'normal';
      const spacing = Math.max(fontSize * 1.2, 12);
      
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
        
        for (const splitLine of splitLines) {
          if (currentY > pageHeight - margin - 20) {
            pdf.addPage();
            currentY = margin;
          }
          pdf.text(splitLine, margin, currentY);
          currentY += spacing;
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
