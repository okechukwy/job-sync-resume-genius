// Browser-compatible hash function
const generateSimpleHash = (text: string): string => {
  let hash = 0;
  if (text.length === 0) return hash.toString();
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
};

export interface ContentChanges {
  addedSections: string[];
  modifiedSections: string[];
  removedSections: string[];
  improvementAreas: string[];
}

export interface ContentComparison {
  similarity: number;
  changes: ContentChanges;
  hasSignificantChanges: boolean;
  improvedAreas: string[];
}

/**
 * Generates a hash of the content for comparison
 */
export const generateContentHash = (content: string): string => {
  // Remove extra whitespace and normalize content for consistent hashing
  const normalizedContent = content.replace(/\s+/g, ' ').trim().toLowerCase();
  return generateSimpleHash(normalizedContent);
};

/**
 * Compares two pieces of content and returns detailed analysis
 */
export const compareContent = (originalContent: string, newContent: string): ContentComparison => {
  const originalLines = originalContent.split('\n').filter(line => line.trim());
  const newLines = newContent.split('\n').filter(line => line.trim());
  
  const addedSections: string[] = [];
  const modifiedSections: string[] = [];
  const removedSections: string[] = [];
  const improvedAreas: string[] = [];
  
  // Simple line-by-line comparison
  const maxLines = Math.max(originalLines.length, newLines.length);
  let matchingLines = 0;
  
  for (let i = 0; i < maxLines; i++) {
    const originalLine = originalLines[i] || '';
    const newLine = newLines[i] || '';
    
    if (originalLine === newLine) {
      matchingLines++;
    } else if (!originalLine && newLine) {
      addedSections.push(newLine);
    } else if (originalLine && !newLine) {
      removedSections.push(originalLine);
    } else if (originalLine && newLine) {
      modifiedSections.push(newLine);
      
      // Detect potential improvements
      if (detectImprovement(originalLine, newLine)) {
        improvedAreas.push(getSectionType(newLine));
      }
    }
  }
  
  const similarity = originalLines.length > 0 ? matchingLines / Math.max(originalLines.length, newLines.length) : 0;
  const hasSignificantChanges = similarity < 0.8; // 80% similarity threshold
  
  return {
    similarity,
    changes: {
      addedSections,
      modifiedSections,
      removedSections,
      improvementAreas: [...new Set(improvedAreas)] // Remove duplicates
    },
    hasSignificantChanges,
    improvedAreas: [...new Set(improvedAreas)]
  };
};

/**
 * Detects if a line has been improved (more professional, quantified, etc.)
 */
const detectImprovement = (originalLine: string, newLine: string): boolean => {
  const improvementIndicators = [
    // Quantification
    /\d+%/,
    /\$\d+/,
    /\d+\s*(million|thousand|k|m)/i,
    
    // Action verbs
    /\b(achieved|implemented|developed|led|managed|optimized|increased|decreased|improved|delivered|created|established|streamlined|enhanced)\b/i,
    
    // Professional language
    /\b(strategic|comprehensive|innovative|efficient|effective|successful|significant|substantial)\b/i
  ];
  
  const originalScore = improvementIndicators.reduce((score, pattern) => {
    return score + (pattern.test(originalLine) ? 1 : 0);
  }, 0);
  
  const newScore = improvementIndicators.reduce((score, pattern) => {
    return score + (pattern.test(newLine) ? 1 : 0);
  }, 0);
  
  return newScore > originalScore && newLine.length > originalLine.length * 0.8;
};

/**
 * Determines the section type based on content
 */
const getSectionType = (content: string): string => {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('experience') || lowerContent.includes('work') || lowerContent.includes('employment')) {
    return 'experience';
  } else if (lowerContent.includes('education') || lowerContent.includes('degree') || lowerContent.includes('university')) {
    return 'education';
  } else if (lowerContent.includes('skill') || lowerContent.includes('technical') || lowerContent.includes('proficient')) {
    return 'skills';
  } else if (lowerContent.includes('summary') || lowerContent.includes('objective') || lowerContent.includes('profile')) {
    return 'summary';
  } else if (lowerContent.includes('project') || lowerContent.includes('portfolio')) {
    return 'projects';
  } else if (lowerContent.includes('achievement') || lowerContent.includes('award') || lowerContent.includes('certification')) {
    return 'achievements';
  }
  
  return 'general';
};

/**
 * Extracts key phrases from content for comparison
 */
export const extractKeyPhrases = (content: string): string[] => {
  const words = content.toLowerCase().match(/\b\w{3,}\b/g) || [];
  const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use']);
  
  return words
    .filter(word => !stopWords.has(word) && word.length > 3)
    .slice(0, 50); // Limit to top 50 phrases
};

/**
 * Calculates semantic similarity between two texts
 */
export const calculateSemanticSimilarity = (text1: string, text2: string): number => {
  const phrases1 = new Set(extractKeyPhrases(text1));
  const phrases2 = new Set(extractKeyPhrases(text2));
  
  const intersection = new Set([...phrases1].filter(phrase => phrases2.has(phrase)));
  const union = new Set([...phrases1, ...phrases2]);
  
  return union.size > 0 ? intersection.size / union.size : 0;
};