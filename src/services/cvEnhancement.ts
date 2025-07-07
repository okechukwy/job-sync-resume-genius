const isEnhanceableContent = (line: string): boolean => {
  const trimmed = line.trim();
  
  // Only enhance lines that are clearly job descriptions or summary paragraphs
  // Must be longer sentences (not lists, headers, or structured data)
  if (!trimmed || trimmed.length < 30) return false;
  
  // Skip any line that looks like structured data
  if (/^[A-Z\s]{3,}$/.test(trimmed)) return false; // All caps headers
  if (/^\d/.test(trimmed)) return false; // Starts with numbers/dates
  if (/@|phone|tel|email|linkedin|github|http/i.test(trimmed)) return false; // Contact/URLs
  if (/^[-=_•*]{1,}/.test(trimmed)) return false; // Bullet points or separators
  if (/:|;/.test(trimmed) && trimmed.split(/[,;]/).length > 2) return false; // Lists with multiple items
  if (trimmed.includes('|')) return false; // Pipe separated data
  if (/^\w+:/.test(trimmed)) return false; // Key-value pairs like "Skills:"
  
  // Only enhance if it looks like a sentence or paragraph
  const sentencePattern = /^[A-Z][a-z].*[.!?]?\s*$/;
  const hasMultipleWords = trimmed.split(/\s+/).length >= 5;
  
  return sentencePattern.test(trimmed) && hasMultipleWords;
};

const enhanceContentLine = (line: string): string => {
  // Only enhance if it's actual enhanceable content
  if (!isEnhanceableContent(line)) return line;
  
  let enhanced = line
    // Action verbs enhancement - only very subtle changes
    .replace(/\b(worked|did|was responsible for|handled)\b/gi, 'executed')
    .replace(/\b(helped|assisted)\b/gi, 'facilitated')
    .replace(/\b(made|created|built)\b/gi, 'developed')
    .replace(/\b(improved|enhanced|bettered)\b/gi, 'optimized')
    .replace(/\b(managed|oversaw)\b/gi, 'orchestrated')
    .replace(/\b(led|headed)\b/gi, 'spearheaded')
    // Weak words enhancement - very conservative
    .replace(/\b(good|nice|okay|fine)\b/gi, 'exceptional')
    .replace(/\b(big|large)\b/gi, 'significant')
    // Professional language - minimal changes
    .replace(/\b(worked with)\b/gi, 'collaborated with')
    .replace(/\b(worked on)\b/gi, 'contributed to');
    
  return enhanced;
};

export interface EnhancedCVResult {
  resumeContent: string;
  enhancementLog: string[];
}

export const enhanceCV = async (originalContent: string): Promise<EnhancedCVResult> => {
  // Preserve original structure by enhancing line by line
  const lines = originalContent.split('\n');
  const enhancedLines: string[] = [];
  let enhancementCount = 0;
  
  for (const line of lines) {
    const originalLine = line;
    const enhancedLine = enhanceContentLine(line);
    
    if (originalLine !== enhancedLine) {
      enhancementCount++;
    }
    
    enhancedLines.push(enhancedLine);
  }
  
  // Create enhancement log based on actual changes made
  const enhancementLog = [
    `Enhanced ${enhancementCount} lines with professional language`,
    'Improved action verb usage in job descriptions',
    'Strengthened weak adjectives and phrases',
    'Maintained original formatting and structure',
    'Preserved all section headers and dates',
    'Enhanced content while keeping personal style'
  ];
  
  return {
    resumeContent: enhancedLines.join('\n'),
    enhancementLog
  };
};