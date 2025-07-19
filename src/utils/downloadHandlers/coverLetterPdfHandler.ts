
import jsPDF from 'jspdf';
import { toast } from 'sonner';

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
        currentY += 6; // Small spacing for empty lines
        continue;
      }
      
      // Check if we need a new page
      if (currentY > pageHeight - margin - 20) {
        pdf.addPage();
        currentY = margin;
      }
      
      // Determine line type and apply appropriate formatting
      const { fontSize, fontStyle, alignment, spacing } = getLineFormatting(line, templateId);
      
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, fontStyle);
      
      // Handle different alignment types
      if (alignment === 'center') {
        // Center alignment for headers
        const textWidth = pdf.getTextWidth(line);
        const centerX = (pageWidth - textWidth) / 2;
        pdf.text(line, centerX, currentY);
        currentY += spacing;
      } else if (alignment === 'right') {
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

const getLineFormatting = (line: string, templateId: string) => {
  // Default formatting
  let fontSize = 11;
  let fontStyle: 'normal' | 'bold' = 'normal';
  let alignment: 'left' | 'center' | 'right' = 'left';
  let spacing = 14; // 1.2x line spacing for 11pt font
  
  // Detect line types and apply appropriate formatting
  
  // Name/Header (usually the first substantial line or lines with person's name)
  if (isNameLine(line)) {
    fontSize = 14;
    fontStyle = 'bold';
    alignment = templateId.includes('classic') || templateId.includes('healthcare') ? 'center' : 'left';
    spacing = 16;
  }
  // Contact information
  else if (isContactLine(line)) {
    fontSize = 10;
    fontStyle = 'normal';
    alignment = templateId.includes('classic') || templateId.includes('healthcare') ? 'center' : 'left';
    spacing = 12;
  }
  // Date
  else if (isDateLine(line)) {
    fontSize = 11;
    fontStyle = 'normal';
    alignment = 'right';
    spacing = 16;
  }
  // Company/Recipient information
  else if (isRecipientLine(line)) {
    fontSize = 11;
    fontStyle = 'normal';
    alignment = 'left';
    spacing = 14;
  }
  // Salutation (Dear...)
  else if (isSalutationLine(line)) {
    fontSize = 11;
    fontStyle = 'normal';
    alignment = 'left';
    spacing = 16;
  }
  // Closing (Sincerely, Best regards, etc.)
  else if (isClosingLine(line)) {
    fontSize = 11;
    fontStyle = 'normal';
    alignment = 'left';
    spacing = 20; // Extra spacing before signature
  }
  // Section headers or emphasized lines
  else if (isSectionHeader(line)) {
    fontSize = 12;
    fontStyle = 'bold';
    alignment = 'left';
    spacing = 16;
  }
  // Bullet points
  else if (isBulletPoint(line)) {
    fontSize = 11;
    fontStyle = 'normal';
    alignment = 'left';
    spacing = 14;
  }
  // Regular paragraph text
  else {
    fontSize = 11;
    fontStyle = 'normal';
    alignment = 'left';
    spacing = 14;
  }
  
  return { fontSize, fontStyle, alignment, spacing };
};

const isNameLine = (line: string): boolean => {
  // Simple heuristic: likely a name if it's relatively short, contains capitalized words, and doesn't have common business phrases
  const words = line.split(' ');
  const hasCapitalizedWords = words.some(word => word.length > 1 && word[0] === word[0].toUpperCase());
  const isShort = words.length <= 4;
  const hasCommonBusinessPhrases = /dear|sincerely|regards|company|position|experience|skills|hiring|manager/i.test(line);
  
  return hasCapitalizedWords && isShort && !hasCommonBusinessPhrases && !line.includes('@') && !line.includes('(');
};

const isContactLine = (line: string): boolean => {
  return line.includes('@') || line.includes('(') || /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(line) || 
         line.includes('|') || /^\d+/.test(line) || line.toLowerCase().includes('linkedin');
};

const isDateLine = (line: string): boolean => {
  const datePatterns = [
    /^\w+\s+\d{1,2},?\s+\d{4}$/, // January 1, 2024 or January 1 2024
    /^\d{1,2}\/\d{1,2}\/\d{4}$/, // 1/1/2024
    /^\d{1,2}-\d{1,2}-\d{4}$/, // 1-1-2024
  ];
  
  return datePatterns.some(pattern => pattern.test(line.trim()));
};

const isRecipientLine = (line: string): boolean => {
  const recipientKeywords = ['hiring manager', 'hr manager', 'recruiter', 'director', 'manager', 'team', 'department'];
  const companyIndicators = ['inc', 'llc', 'corp', 'company', 'ltd', 'technologies', 'systems', 'solutions'];
  
  return recipientKeywords.some(keyword => line.toLowerCase().includes(keyword)) ||
         companyIndicators.some(indicator => line.toLowerCase().includes(indicator)) ||
         /^\d+\s+\w+/.test(line); // Address format
};

const isSalutationLine = (line: string): boolean => {
  return /^dear\s+/i.test(line.trim());
};

const isClosingLine = (line: string): boolean => {
  const closings = ['sincerely', 'best regards', 'kind regards', 'yours truly', 'respectfully', 'thank you'];
  return closings.some(closing => line.toLowerCase().trim() === closing || line.toLowerCase().includes(closing + ','));
};

const isSectionHeader = (line: string): boolean => {
  // Headers are usually short, all caps, or contain colons
  return line.length < 50 && (line === line.toUpperCase() || line.includes(':')) && 
         !line.includes('.') && !line.toLowerCase().includes('dear');
};

const isBulletPoint = (line: string): boolean => {
  return /^[\s]*[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+\-]\s+/.test(line);
};
