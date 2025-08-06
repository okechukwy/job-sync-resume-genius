// Content sanitization utilities for resume processing
// Comprehensive cleaning for Word artifacts, binary data, and corrupted content

export interface ContentQuality {
  isValid: boolean;
  issues: string[];
  cleanedContent: string;
  confidence: number;
}

/**
 * Enhanced content sanitization function
 * Removes Word field codes, binary artifacts, and formatting corruption
 */
export const sanitizeResumeContent = (content: string): string => {
  if (!content || typeof content !== 'string') return '';
  
  return content
    // Remove Word field codes and artifacts (primary fix for "wN" prefixes)
    .replace(/\bw[NWTF]\b/gi, '') // Remove Word field codes like wN, wW, wT, wF
    .replace(/\bw\d+\b/gi, '') // Remove numbered Word field codes like w1, w2, etc.
    .replace(/\\f"/gi, '') // Remove font formatting codes
    .replace(/\\s\d+/gi, '') // Remove style markers
    .replace(/\*MERGEFORMAT/gi, '') // Remove mail merge artifacts
    .replace(/\b(HYPERLINK|REF|TOC|PAGEREF)\b/gi, '') // Remove Word field functions
    .replace(/\{\s*\\[^}]*\}/gi, '') // Remove Word field code blocks
    
    // Remove binary artifacts
    .replace(/bjbj[^\s]*/gi, '') // Remove bjbj artifacts
    .replace(/\x00+/g, ' ') // Replace null bytes with spaces
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Remove non-printable characters except newlines and tabs
    
    // Clean up formatting artifacts
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/^\s+|\s+$/gm, '') // Trim each line
    .replace(/\n{3,}/g, '\n\n') // Limit consecutive newlines
    .trim();
};

/**
 * Validate content quality and detect corruption issues
 */
export const validateContentQuality = (content: string): ContentQuality => {
  const issues: string[] = [];
  const cleanedContent = sanitizeResumeContent(content);
  
  // Check for various corruption indicators
  if (content.includes('bjbj')) {
    issues.push('Contains Word binary artifacts (bjbj)');
  }
  
  if (/\bw[nwtf]\d*\b/i.test(content)) {
    issues.push('Contains Word field codes (wN, wW, etc.)');
  }
  
  if (content.includes('\x00')) {
    issues.push('Contains null bytes');
  }
  
  if (/\\f"|\\s\d+|\*MERGEFORMAT/i.test(content)) {
    issues.push('Contains Word formatting codes');
  }
  
  if (cleanedContent.length < 100) {
    issues.push('Content too short after cleaning');
  }
  
  if (cleanedContent.length < content.length * 0.3) {
    issues.push('Significant content lost during cleaning (possible heavy corruption)');
  }
  
  // Calculate confidence score
  const corruptionRatio = (content.length - cleanedContent.length) / content.length;
  const confidence = Math.max(0, 100 - (corruptionRatio * 100) - (issues.length * 10));
  
  return {
    isValid: issues.length === 0 && cleanedContent.length >= 100,
    issues,
    cleanedContent,
    confidence: Math.round(confidence)
  };
};

/**
 * Check if content contains binary artifacts that should trigger warnings
 */
export const containsBinaryArtifacts = (text: string): boolean => {
  if (!text) return false;
  
  return text.toLowerCase().includes('bjbj') ||
         /\bw[nwtf]\b/i.test(text) || // Word field codes
         /\bw\d+\b/i.test(text) || // Numbered Word field codes
         text.includes('\x00') ||
         text.toLowerCase().includes('ole2') ||
         text.toLowerCase().includes('compound') ||
         /\\f"/i.test(text) || // Font formatting codes
         /\*MERGEFORMAT/i.test(text) || // Mail merge artifacts
         /^[A-Z]{8,}/.test(text); // Long uppercase sequences often indicate metadata
};

/**
 * Enhanced line-by-line content validation for editing components
 */
export const isValidContentLine = (line: string): boolean => {
  const trimmed = line.trim();
  
  // Empty lines are valid
  if (!trimmed) return true;
  
  // Check for corruption indicators
  if (containsBinaryArtifacts(trimmed)) return false;
  
  // Check for Word field codes specifically
  if (/\bw[nwtf]\d*\b/i.test(trimmed)) return false;
  
  // Must contain some readable characters
  const readableChars = trimmed.replace(/[^\x20-\x7E]/g, '').length;
  const readableRatio = readableChars / trimmed.length;
  
  return readableRatio > 0.7; // At least 70% readable characters
};

/**
 * Sanitize content specifically for editing components
 * More aggressive cleaning for display purposes
 */
export const sanitizeForEditor = (content: string): string => {
  const sanitized = sanitizeResumeContent(content);
  
  // Additional cleaning for editor display
  return sanitized
    .split('\n')
    .filter(line => isValidContentLine(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n') // Limit consecutive blank lines
    .trim();
};