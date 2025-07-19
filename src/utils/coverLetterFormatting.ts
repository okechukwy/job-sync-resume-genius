
export interface LineFormatting {
  fontSize: string;
  fontWeight: string;
  textAlign: 'left' | 'center' | 'right';
  marginBottom: string;
  isHeader?: boolean;
  isContact?: boolean;
}

export const getLineFormatting = (line: string, templateId: string): LineFormatting => {
  // Default formatting
  let formatting: LineFormatting = {
    fontSize: '11pt',
    fontWeight: 'normal',
    textAlign: 'left',
    marginBottom: '14px'
  };

  // Detect line types
  const isName = isNameLine(line);
  const isContact = isContactLine(line);
  const isDate = isDateLine(line);
  const isRecipient = isRecipientLine(line);
  const isSalutation = isSalutationLine(line);
  const isClosing = isClosingLine(line);
  const isSectionHeader = isSectionHeaderLine(line);

  // Apply template-specific formatting
  if (isName) {
    formatting = {
      fontSize: '14pt',
      fontWeight: 'bold',
      textAlign: templateId.includes('classic') || templateId.includes('healthcare') ? 'center' : 'left',
      marginBottom: '8px',
      isHeader: true
    };
  }
  else if (isContact) {
    formatting = {
      fontSize: '10pt',
      fontWeight: 'normal',
      textAlign: templateId.includes('classic') || templateId.includes('healthcare') ? 'center' : 'left',
      marginBottom: '6px',
      isContact: true
    };
  }
  else if (isDate) {
    formatting = {
      fontSize: '11pt',
      fontWeight: 'normal',
      textAlign: 'right',
      marginBottom: '20px'
    };
  }
  else if (isRecipient) {
    formatting = {
      fontSize: '11pt',
      fontWeight: 'normal',
      textAlign: 'left',
      marginBottom: '14px'
    };
  }
  else if (isSalutation) {
    formatting = {
      fontSize: '11pt',
      fontWeight: 'normal',
      textAlign: 'left',
      marginBottom: '16px'
    };
  }
  else if (isClosing) {
    formatting = {
      fontSize: '11pt',
      fontWeight: 'normal',
      textAlign: 'left',
      marginBottom: '40px'
    };
  }
  else if (isSectionHeader) {
    formatting = {
      fontSize: '12pt',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: '16px'
    };
  }

  return formatting;
};

export const isNameLine = (line: string): boolean => {
  const words = line.split(' ');
  const hasCapitalizedWords = words.some(word => word.length > 1 && word[0] === word[0].toUpperCase());
  const isShort = words.length <= 5;
  const hasCommonBusinessPhrases = /dear|sincerely|regards|company|position|experience|skills|hiring|manager|director|team/i.test(line);
  const hasContactInfo = line.includes('@') || line.includes('(') || /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(line);
  const hasAddress = /^\d+\s+\w+/.test(line);
  
  return hasCapitalizedWords && isShort && !hasCommonBusinessPhrases && !hasContactInfo && !hasAddress && line.trim().length > 2;
};

export const isContactLine = (line: string): boolean => {
  // Check for email
  if (line.includes('@')) return true;
  
  // Check for phone number patterns
  if (/\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(line)) return true;
  
  // Check for address (starts with number)
  if (/^\d+\s+\w+/.test(line)) return true;
  
  // Check for separator characters (|, •, etc.)
  if (line.includes('|') || line.includes('•')) return true;
  
  // Check for LinkedIn
  if (line.toLowerCase().includes('linkedin')) return true;
  
  // Check for common contact line patterns (multiple contact items in one line)
  const contactKeywords = ['phone', 'email', 'tel', 'mobile', 'cell'];
  if (contactKeywords.some(keyword => line.toLowerCase().includes(keyword))) return true;
  
  return false;
};

export const isDateLine = (line: string): boolean => {
  const datePatterns = [
    /^\w+\s+\d{1,2},?\s+\d{4}$/, // January 1, 2024
    /^\d{1,2}\/\d{1,2}\/\d{4}$/, // 1/1/2024
    /^\d{1,2}-\d{1,2}-\d{4}$/, // 1-1-2024
    /^\w+\s+\d{1,2}(st|nd|rd|th)?,?\s+\d{4}$/ // January 1st, 2024
  ];
  
  return datePatterns.some(pattern => pattern.test(line.trim()));
};

export const isRecipientLine = (line: string): boolean => {
  const recipientKeywords = ['hiring manager', 'hr manager', 'recruiter', 'director', 'manager', 'team', 'department'];
  const companyIndicators = ['inc', 'llc', 'corp', 'company', 'ltd', 'technologies', 'systems', 'solutions'];
  
  return recipientKeywords.some(keyword => line.toLowerCase().includes(keyword)) ||
         companyIndicators.some(indicator => line.toLowerCase().includes(indicator)) ||
         /^\d+\s+\w+/.test(line); // Address format
};

export const isSalutationLine = (line: string): boolean => {
  return /^dear\s+/i.test(line.trim());
};

export const isClosingLine = (line: string): boolean => {
  const closings = ['sincerely', 'best regards', 'kind regards', 'yours truly', 'respectfully', 'thank you'];
  return closings.some(closing => line.toLowerCase().trim() === closing || line.toLowerCase().includes(closing + ','));
};

export const isSectionHeaderLine = (line: string): boolean => {
  return line.length < 50 && (line === line.toUpperCase() || line.includes(':')) && 
         !line.includes('.') && !line.toLowerCase().includes('dear');
};
