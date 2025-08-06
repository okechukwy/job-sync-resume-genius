
/**
 * Enhanced content processing utilities for ATS resume optimization
 */

export interface ProcessedContent {
  cleanText: string;
  structuredData: any;
  isValid: boolean;
}

/**
 * Process and clean resume content for ATS display
 */
export const processResumeContent = (content: string): ProcessedContent => {
  if (!content || typeof content !== 'string') {
    return {
      cleanText: '',
      structuredData: null,
      isValid: false
    };
  }

  // Remove HTML tags and decode entities
  const cleanText = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  // Basic validation
  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  const isValid = wordCount > 10 && cleanText.length > 50;

  return {
    cleanText,
    structuredData: null,
    isValid
  };
};

/**
 * Apply suggestion to content with intelligent text replacement
 */
export const applySuggestionToContent = (
  content: string,
  originalText: string,
  newText: string,
  section?: string
): string => {
  // Direct replacement if exact match exists
  if (content.includes(originalText)) {
    return content.replace(originalText, newText);
  }

  // Fuzzy matching for partial matches
  const lines = content.split('\n');
  const updatedLines = lines.map(line => {
    const similarity = calculateSimilarity(line.toLowerCase(), originalText.toLowerCase());
    if (similarity > 0.6) {
      return newText;
    }
    
    // Word-based partial matching
    const originalWords = originalText.toLowerCase().split(/\s+/);
    const lineWords = line.toLowerCase().split(/\s+/);
    const matchedWords = originalWords.filter(word => 
      lineWords.some(lineWord => lineWord.includes(word) || word.includes(lineWord))
    );
    
    if (matchedWords.length >= originalWords.length * 0.5) {
      return line.replace(new RegExp(originalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), newText);
    }
    
    return line;
  });

  return updatedLines.join('\n');
};

/**
 * Calculate similarity between two strings using Levenshtein distance
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};
