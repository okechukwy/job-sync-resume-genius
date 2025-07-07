import { Document, Packer, Paragraph, TextRun } from 'docx';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

export const downloadFile = async (
  content: string,
  fileName: string,
  format: 'txt' | 'pdf' | 'docx'
) => {
  try {
    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `optimized-${fileName}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Optimized resume downloaded as TXT!");
      
    } else if (format === 'pdf') {
      toast.info("Generating PDF...");
      
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 20;
      const lineHeight = 6;
      let currentY = margin;
      
      // Split content into lines and process each line
      const lines = content.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if we need a new page
        if (currentY > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }
        
        // Handle different line types
        if (line.includes('OPTIMIZED RESUME') || line.includes('='.repeat(20))) {
          pdf.setFontSize(16);
          pdf.setFont(undefined, 'bold');
        } else if (line.includes('-'.repeat(10)) || /^[A-Z\s]+$/.test(line.trim()) && line.trim().length > 5) {
          pdf.setFontSize(12);
          pdf.setFont(undefined, 'bold');
        } else {
          pdf.setFontSize(10);
          pdf.setFont(undefined, 'normal');
        }
        
        // Split long lines to fit page width
        const splitLines = pdf.splitTextToSize(line, pageWidth - 2 * margin);
        
        for (const splitLine of splitLines) {
          if (currentY > pageHeight - margin) {
            pdf.addPage();
            currentY = margin;
          }
          pdf.text(splitLine, margin, currentY);
          currentY += lineHeight;
        }
      }
      
      pdf.save(`optimized-${fileName}.pdf`);
      toast.success("Optimized resume downloaded as PDF!");
      
    } else if (format === 'docx') {
      toast.info("Generating DOCX...");
      
      // Parse content into structured sections
      const lines = content.split('\n');
      const paragraphs: Paragraph[] = [];
      
      for (const line of lines) {
        if (line.includes('OPTIMIZED RESUME') || line.includes('='.repeat(20))) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  bold: true,
                  size: 32,
                }),
              ],
              spacing: { after: 200 },
            })
          );
        } else if (line.includes('-'.repeat(10)) || /^[A-Z\s]+$/.test(line.trim()) && line.trim().length > 5) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 200, after: 100 },
            })
          );
        } else if (line.trim()) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 20,
                }),
              ],
              spacing: { after: 100 },
            })
          );
        } else {
          paragraphs.push(new Paragraph({}));
        }
      }
      
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });
      
      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `optimized-${fileName}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Optimized resume downloaded as DOCX!");
    }
  } catch (error) {
    console.error(`Error generating ${format.toUpperCase()}:`, error);
    toast.error(`Failed to generate ${format.toUpperCase()}. Please try again.`);
  }
};