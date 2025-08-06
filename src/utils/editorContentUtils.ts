/**
 * Utilities for handling content in the CV editor
 * Provides clean text extraction, HTML sanitization, and content conversion
 */

/**
 * Strip HTML tags and decode entities from content
 */
export const stripHtmlTags = (content: string): string => {
  if (!content || typeof content !== 'string') return '';
  
  return content
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode common HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/gm, '')
    .trim();
};

/**
 * Clean content for display in the editor textarea
 */
export const prepareContentForEditing = (content: string): string => {
  if (!content) return '';
  
  // First strip HTML tags
  let cleaned = stripHtmlTags(content);
  
  // Remove Word artifacts and binary data
  cleaned = cleaned
    .replace(/\bw[NWTF]\d*\b/gi, '') // Word field codes
    .replace(/bjbj[^\s]*/gi, '') // Binary artifacts
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Non-printable characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\n{3,}/g, '\n\n') // Limit consecutive newlines
    .trim();
  
  return cleaned;
};

/**
 * Format content for professional display
 */
export const formatContentForDisplay = (content: string): string => {
  if (!content) return '';
  
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
};

/**
 * Validate if content is clean and ready for editing
 */
export const isContentClean = (content: string): boolean => {
  if (!content) return false;
  
  // Check for HTML tags
  if (/<[^>]*>/.test(content)) return false;
  
  // Check for Word artifacts
  if (/\bw[NWTF]\d*\b/i.test(content)) return false;
  
  // Check for binary artifacts
  if (/bjbj/i.test(content)) return false;
  
  return true;
};

/**
 * Extract clean text content from potentially corrupted resume data
 */
export const extractCleanContent = (content: string): string => {
  if (!content) return '';
  
  // Apply comprehensive cleaning
  const cleaned = prepareContentForEditing(content);
  
  // If the content is too short after cleaning, try to preserve more
  if (cleaned.length < 100 && content.length > 200) {
    // More conservative cleaning
    return content
      .replace(/<[^>]*>/g, '') // Just remove HTML tags
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  return cleaned;
};