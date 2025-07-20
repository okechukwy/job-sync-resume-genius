export interface LineFormatting {
  fontSize: string;
  fontWeight: string;
  textAlign: 'left' | 'center' | 'right';
  marginBottom: string;
  isHeader?: boolean;
  isContact?: boolean;
}

interface LetterContext {
  lineIndex: number;
  totalLines: number;
  section: 'header' | 'date' | 'recipient' | 'body' | 'closing' | 'signature';
}

export const getLineFormatting = (line: string, templateId: string, context?: LetterContext): LineFormatting => {
  // Default formatting with minimal margins for single-page fit
  let formatting: LineFormatting = {
    fontSize: '11pt',
    fontWeight: 'normal',
    textAlign: 'left',
    marginBottom: '0px' // No default margin - handled by PDF spacing logic
  };

  // Determine context if not provided
  const lineContext = context || determineLineContext(line, 0, 1);

  // Detect line types with context awareness
  const isName = isNameLine(line, lineContext);
  const isContact = isContactLine(line, lineContext);
  const isDate = isDateLine(line);
  const isRecipient = isRecipientLine(line, lineContext);
  const isSalutation = isSalutationLine(line);
  const isClosing = isClosingLine(line);
  const isSignature = isSignatureLine(line, lineContext);
  const isSectionHeader = isSectionHeaderLine(line);

  // Apply template-specific formatting with minimal spacing
  if (isName && lineContext.section === 'header') {
    formatting = {
      fontSize: '14pt',
      fontWeight: 'bold',
      textAlign: templateId.includes('classic') || templateId.includes('healthcare') ? 'center' : 'left',
      marginBottom: '0px', // Spacing handled by PDF logic
      isHeader: true
    };
  }
  else if (isContact && lineContext.section === 'header') {
    formatting = {
      fontSize: '10pt',
      fontWeight: 'normal',
      textAlign: templateId.includes('classic') || templateId.includes('healthcare') ? 'center' : 'left',
      marginBottom: '0px', // Spacing handled by PDF logic
      isContact: true
    };
  }
  else if (isDate) {
    formatting = {
      fontSize: '11pt',
      fontWeight: 'normal',
      textAlign: 'right',
      marginBottom: '0px' // Spacing handled by PDF logic
    };
  }
  else if (isRecipient) {
    formatting = {
      fontSize: '11pt',
      fontWeight: 'normal',
      textAlign: 'left',
      marginBottom: '0px' // Spacing handled by PDF logic
    };
  }
  else if (isSalutation) {
    formatting = {
      fontSize: '11pt',
      fontWeight: 'normal',
      textAlign: 'left',
      marginBottom: '0px' // Spacing handled by PDF logic
    };
  }
  else if (isClosing || isSignature) {
    formatting = {
      fontSize: '11pt',
      fontWeight: 'normal',
      textAlign: 'left',
      marginBottom: '0px' // Spacing handled by PDF logic
    };
  }
  else if (isSectionHeader) {
    formatting = {
      fontSize: '12pt',
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: '0px' // Spacing handled by PDF logic
    };
  }

  return formatting;
};

export const determineLineContext = (line: string, lineIndex: number, totalLines: number): LetterContext => {
  const trimmedLine = line.trim();
  
  // Header section (first 5 lines typically)
  if (lineIndex < 5) {
    return { lineIndex, totalLines, section: 'header' };
  }
  
  // Date section
  if (isDateLine(trimmedLine)) {
    return { lineIndex, totalLines, section: 'date' };
  }
  
  // Closing/signature section (last 10 lines typically)
  if (lineIndex >= totalLines - 10) {
    if (isClosingLine(trimmedLine) || isSignatureLine(trimmedLine, { lineIndex, totalLines, section: 'closing' })) {
      return { lineIndex, totalLines, section: 'closing' };
    }
    if (lineIndex >= totalLines - 3) {
      return { lineIndex, totalLines, section: 'signature' };
    }
  }
  
  // Recipient section (after header, before body)
  if (lineIndex < 15 && (isRecipientLine(trimmedLine, { lineIndex, totalLines, section: 'recipient' }))) {
    return { lineIndex, totalLines, section: 'recipient' };
  }
  
  // Default to body
  return { lineIndex, totalLines, section: 'body' };
};

export const isNameLine = (line: string, context?: LetterContext): boolean => {
  const trimmedLine = line.trim();
  
  // Only consider names in the header section (first few lines)
  if (context && context.section !== 'header') {
    return false;
  }
  
  // Skip if it's clearly not a name
  if (!trimmedLine || trimmedLine.length < 2) return false;
  
  const words = trimmedLine.split(' ');
  const hasCapitalizedWords = words.some(word => word.length > 1 && word[0] === word[0].toUpperCase());
  const isShort = words.length <= 5;
  
  // Exclude common business phrases and contact info
  const hasCommonBusinessPhrases = /dear|sincerely|regards|company|position|experience|skills|hiring|manager|director|team|department/i.test(trimmedLine);
  const hasContactInfo = trimmedLine.includes('@') || trimmedLine.includes('(') || /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(trimmedLine);
  const hasAddress = /^\d+\s+\w+/.test(trimmedLine);
  const hasDate = /\d{1,2}\/\d{1,2}\/\d{4}|\w+\s+\d{1,2},?\s+\d{4}/.test(trimmedLine);
  
  // Exclude lines that are clearly not names
  if (hasCommonBusinessPhrases || hasContactInfo || hasAddress || hasDate) {
    return false;
  }
  
  // Must have capitalized words and be reasonably short
  return hasCapitalizedWords && isShort && trimmedLine.length > 2;
};

export const isContactLine = (line: string, context?: LetterContext): boolean => {
  const trimmedLine = line.trim();
  
  // Check for email
  if (trimmedLine.includes('@')) return true;
  
  // Check for phone number patterns
  if (/\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(trimmedLine)) return true;
  
  // Check for address (starts with number)
  if (/^\d+\s+\w+/.test(trimmedLine)) return true;
  
  // Check for separator characters (|, •, etc.)
  if (trimmedLine.includes('|') || trimmedLine.includes('•')) return true;
  
  // Check for LinkedIn
  if (trimmedLine.toLowerCase().includes('linkedin')) return true;
  
  // Check for common contact line patterns
  const contactKeywords = ['phone', 'email', 'tel', 'mobile', 'cell'];
  if (contactKeywords.some(keyword => trimmedLine.toLowerCase().includes(keyword))) return true;
  
  return false;
};

export const isDateLine = (line: string): boolean => {
  const trimmedLine = line.trim();
  const datePatterns = [
    /^\w+\s+\d{1,2},?\s+\d{4}$/, // January 1, 2024 or January 1 2024
    /^\d{1,2}\/\d{1,2}\/\d{4}$/, // 1/1/2024
    /^\d{1,2}-\d{1,2}-\d{4}$/, // 1-1-2024
    /^\w+\s+\d{1,2}(st|nd|rd|th)?,?\s+\d{4}$/ // January 1st, 2024
  ];
  
  return datePatterns.some(pattern => pattern.test(trimmedLine));
};

export const isRecipientLine = (line: string, context?: LetterContext): boolean => {
  const trimmedLine = line.trim();
  
  // Skip if in header or signature sections
  if (context && (context.section === 'header' || context.section === 'signature')) {
    return false;
  }
  
  // Check for hiring manager titles
  const hiringManagerPatterns = [
    /hiring\s+manager/i,
    /hr\s+manager/i,
    /recruiter/i,
    /director/i,
    /manager/i,
    /team/i,
    /department/i
  ];
  
  // Check for company indicators
  const companyIndicators = [
    /\binc\b/i,
    /\bllc\b/i,
    /\bcorp\b/i,
    /\bcompany\b/i,
    /\bltd\b/i,
    /technologies/i,
    /systems/i,
    /solutions/i
  ];
  
  // Check for address format
  const isAddress = /^\d+\s+\w+/.test(trimmedLine);
  
  // Check for proper names that might be hiring managers (not in header context)
  const isProperName = context && context.section === 'recipient' && 
    /^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(trimmedLine) && 
    !isContactLine(trimmedLine, context);
  
  return hiringManagerPatterns.some(pattern => pattern.test(trimmedLine)) ||
         companyIndicators.some(indicator => indicator.test(trimmedLine)) ||
         isAddress ||
         isProperName;
};

export const isSalutationLine = (line: string): boolean => {
  return /^dear\s+/i.test(line.trim());
};

export const isClosingLine = (line: string): boolean => {
  const trimmedLine = line.trim().toLowerCase();
  const closings = ['sincerely', 'best regards', 'kind regards', 'yours truly', 'respectfully', 'thank you'];
  return closings.some(closing => trimmedLine === closing || trimmedLine === closing + ',' || trimmedLine.startsWith(closing + ','));
};

export const isSignatureLine = (line: string, context?: LetterContext): boolean => {
  const trimmedLine = line.trim();
  
  // Must be in closing or signature section
  if (context && context.section !== 'closing' && context.section !== 'signature') {
    return false;
  }
  
  // Skip empty lines
  if (!trimmedLine) return false;
  
  // Look for name-like patterns in the signature area
  const words = trimmedLine.split(' ');
  const isNameLike = words.length <= 3 && words.every(word => 
    word.length > 1 && word[0] === word[0].toUpperCase()
  );
  
  // Exclude common closing phrases
  const isClosing = isClosingLine(trimmedLine);
  
  return isNameLike && !isClosing && context && context.lineIndex >= context.totalLines - 5;
};

export const isSectionHeaderLine = (line: string): boolean => {
  const trimmedLine = line.trim();
  return trimmedLine.length < 50 && 
         (trimmedLine === trimmedLine.toUpperCase() || trimmedLine.includes(':')) && 
         !trimmedLine.includes('.') && 
         !trimmedLine.toLowerCase().includes('dear');
};

// Enhanced processing function for cover letters
export const processLetterLines = (content: string, templateId: string) => {
  const lines = content.split('\n');
  const processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      processedLines.push({ line: '', formatting: null, isEmpty: true });
      continue;
    }
    
    const context = determineLineContext(line, i, lines.length);
    const formatting = getLineFormatting(line, templateId, context);
    
    processedLines.push({
      line,
      formatting,
      context,
      isEmpty: false
    });
  }
  
  return processedLines;
};
