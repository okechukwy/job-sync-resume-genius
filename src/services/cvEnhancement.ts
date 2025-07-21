
import { supabase } from "@/integrations/supabase/client";

export interface EnhancedCVResult {
  resumeContent: string;
  enhancementLog: string[];
  isHtmlContent: boolean;
  changesApplied: Array<{
    section: string;
    original: string;
    improved: string;
    reasoning: string;
    category: string;
  }>;
  atsImprovements: {
    keywordsAdded: string[];
    metricsAdded: number;
    actionVerbsImproved: number;
    professionalLanguageEnhanced: number;
  };
  estimatedATSScoreImprovement: number;
}

interface AIEnhancementRequest {
  originalContent: string;
  missingKeywords: string[];
  targetIndustry: string;
  targetRole?: string;
  isHtmlContent: boolean;
  atsScore?: number;
  weakAreas?: string[];
}

// Improved content detection - more inclusive
const isEnhanceableContent = (line: string): boolean => {
  const trimmed = line.trim();
  
  // Must have some content
  if (!trimmed || trimmed.length < 10) return false;
  
  // Skip obvious non-content lines
  if (/^[A-Z\s]{3,}$/.test(trimmed)) return false; // All caps headers
  if (/@|phone|tel|email|linkedin|github|http/i.test(trimmed)) return false; // Contact/URLs
  if (/^[-=_•*\s]+$/.test(trimmed)) return false; // Only separators
  if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(trimmed)) return false; // Just dates
  if (/^\d+$/.test(trimmed)) return false; // Just numbers
  
  // More inclusive - allow content with at least 2 words
  const words = trimmed.split(/\s+/);
  const hasMultipleWords = words.length >= 2;
  const hasLetters = /[a-zA-Z]/.test(trimmed);
  
  return hasLetters && hasMultipleWords;
};

// Enhanced action verb and professional language patterns
const enhanceContentLine = (line: string, missingKeywords: string[] = []): { enhanced: string; changes: EnhancedCVResult['changesApplied'] } => {
  if (!isEnhanceableContent(line)) return { enhanced: line, changes: [] };
  
  const original = line;
  const changes: EnhancedCVResult['changesApplied'] = [];
  
  let enhanced = line
    // Enhanced action verbs with more patterns
    .replace(/\b(worked on|worked with|did|was responsible for|handled|dealt with|took care of)\b/gi, (match) => {
      const replacement = 'managed';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'Replaced weak action verb with stronger alternative',
        category: 'action-verbs'
      });
      return replacement;
    })
    .replace(/\b(helped|assisted|aided|supported)\b/gi, (match) => {
      const replacement = 'facilitated';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'Enhanced action verb for better impact',
        category: 'action-verbs'
      });
      return replacement;
    })
    .replace(/\b(made|created|built|developed)\b/gi, (match) => {
      const replacement = 'engineered';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'Used more technical and impactful action verb',
        category: 'action-verbs'
      });
      return replacement;
    })
    .replace(/\b(improved|enhanced|bettered|upgraded)\b/gi, (match) => {
      const replacement = 'optimized';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'More professional and specific action verb',
        category: 'action-verbs'
      });
      return replacement;
    })
    .replace(/\b(led|headed|ran|managed)\b/gi, (match) => {
      const replacement = 'directed';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'More executive-level action verb',
        category: 'action-verbs'
      });
      return replacement;
    })
    
    // Professional language enhancement
    .replace(/\b(good|nice|okay|fine)\b/gi, (match) => {
      const replacement = 'exceptional';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'Enhanced professional language',
        category: 'professional-language'
      });
      return replacement;
    })
    .replace(/\b(big|large|huge)\b/gi, (match) => {
      const replacement = 'substantial';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'More professional and specific descriptor',
        category: 'professional-language'
      });
      return replacement;
    })
    .replace(/\b(fast|quick)\b/gi, (match) => {
      const replacement = 'efficient';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'More professional and business-oriented term',
        category: 'professional-language'
      });
      return replacement;
    })
    .replace(/\b(many|lots of|a lot of)\b/gi, (match) => {
      const replacement = 'multiple';
      changes.push({
        section: 'Content Enhancement',
        original: match,
        improved: replacement,
        reasoning: 'More professional and concise language',
        category: 'professional-language'
      });
      return replacement;
    });

  // Try to integrate missing keywords naturally
  if (missingKeywords.length > 0) {
    const keywordToAdd = missingKeywords[Math.floor(Math.random() * missingKeywords.length)];
    if (Math.random() < 0.3 && !enhanced.toLowerCase().includes(keywordToAdd.toLowerCase())) {
      enhanced = enhanced.replace(/\b(with|using|leveraging)\b/gi, (match) => {
        changes.push({
          section: 'Content Enhancement',
          original: match,
          improved: `${match} ${keywordToAdd}`,
          reasoning: 'Integrated missing ATS keyword naturally',
          category: 'keyword-integration'
        });
        return `${match} ${keywordToAdd}`;
      });
    }
  }

  return { enhanced, changes };
};

// AI-powered enhancement function with improved error handling
export const enhanceCVWithAI = async (
  originalContent: string,
  missingKeywords: string[] = [],
  targetIndustry: string = 'Business',
  targetRole?: string,
  atsScore?: number,
  weakAreas?: string[]
): Promise<EnhancedCVResult> => {
  console.log('Starting AI-powered CV enhancement...', {
    contentLength: originalContent.length,
    missingKeywords: missingKeywords.length,
    targetIndustry,
    targetRole,
    atsScore
  });
  
  const isHtml = originalContent.includes('<') && originalContent.includes('>');
  
  try {
    console.log('Calling ai-cv-enhancement edge function...');
    
    // Call the AI enhancement edge function
    const { data, error } = await supabase.functions.invoke('ai-cv-enhancement', {
      body: {
        originalContent,
        missingKeywords,
        targetIndustry,
        targetRole,
        isHtmlContent: isHtml,
        atsScore,
        weakAreas
      } as AIEnhancementRequest
    });

    if (error) {
      console.error('AI enhancement error:', error);
      throw new Error(`AI enhancement failed: ${error.message || 'Unknown error'}`);
    }

    if (!data) {
      console.error('No data returned from AI enhancement');
      throw new Error('No data returned from AI enhancement');
    }

    console.log('AI enhancement completed successfully', {
      changesApplied: data.changesApplied?.length || 0,
      estimatedImprovement: data.estimatedATSScoreImprovement || 0
    });
    
    return {
      resumeContent: data.enhancedContent || originalContent,
      enhancementLog: data.enhancementLog || ['AI enhancement completed'],
      isHtmlContent: isHtml,
      changesApplied: data.changesApplied || [],
      atsImprovements: data.atsImprovements || {
        keywordsAdded: [],
        metricsAdded: 0,
        actionVerbsImproved: 0,
        professionalLanguageEnhanced: 0
      },
      estimatedATSScoreImprovement: data.estimatedATSScoreImprovement || 0
    };

  } catch (error) {
    console.error('AI enhancement failed, falling back to enhanced basic enhancement:', error);
    
    // Fallback to enhanced basic optimization
    return await enhanceCVBasic(originalContent, missingKeywords, targetIndustry);
  }
};

// Enhanced basic fallback enhancement
const enhanceCVBasic = async (
  originalContent: string,
  missingKeywords: string[] = [],
  targetIndustry: string = 'Business'
): Promise<EnhancedCVResult> => {
  console.log('Using enhanced basic CV optimization as fallback');
  
  const isHtml = originalContent.includes('<') && originalContent.includes('>');
  let enhancedContent: string;
  let changesApplied: EnhancedCVResult['changesApplied'] = [];
  
  if (isHtml) {
    const result = enhanceHtmlContentBasic(originalContent, missingKeywords);
    enhancedContent = result.content;
    changesApplied = result.changes;
  } else {
    const result = enhanceTextContentBasic(originalContent, missingKeywords);
    enhancedContent = result.content;
    changesApplied = result.changes;
  }
  
  return {
    resumeContent: enhancedContent,
    enhancementLog: [
      `Applied ${changesApplied.length} enhanced basic optimizations`,
      'Enhanced professional language and action verbs',
      'Integrated available keywords where appropriate',
      'Improved content structure and readability',
      'Note: AI enhancement unavailable, using enhanced basic optimization'
    ],
    isHtmlContent: isHtml,
    changesApplied,
    atsImprovements: {
      keywordsAdded: missingKeywords.slice(0, Math.min(3, changesApplied.filter(c => c.category === 'keyword-integration').length)),
      metricsAdded: changesApplied.filter(c => c.category === 'quantification').length,
      actionVerbsImproved: changesApplied.filter(c => c.category === 'action-verbs').length,
      professionalLanguageEnhanced: changesApplied.filter(c => c.category === 'professional-language').length
    },
    estimatedATSScoreImprovement: Math.min(changesApplied.length * 2, 15)
  };
};

const enhanceHtmlContentBasic = (htmlContent: string, missingKeywords: string[] = []) => {
  console.log('Enhancing HTML content with basic optimization');
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const changes: EnhancedCVResult['changesApplied'] = [];
  
  // Find all text nodes and enhance them
  const walker = document.createTreeWalker(
    doc.body || doc,
    NodeFilter.SHOW_TEXT,
    null
  );
  
  const textNodes: Text[] = [];
  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node as Text);
  }
  
  textNodes.forEach(textNode => {
    const originalText = textNode.textContent || '';
    if (originalText.trim()) {
      const result = enhanceContentLine(originalText, missingKeywords);
      
      if (result.enhanced !== originalText) {
        changes.push(...result.changes);
        textNode.textContent = result.enhanced;
      }
    }
  });
  
  return {
    content: doc.documentElement?.outerHTML || htmlContent,
    changes
  };
};

const enhanceTextContentBasic = (textContent: string, missingKeywords: string[] = []) => {
  console.log('Enhancing text content with basic optimization');
  
  const lines = textContent.split('\n');
  const enhancedLines: string[] = [];
  const changes: EnhancedCVResult['changesApplied'] = [];
  
  for (const line of lines) {
    if (line.trim()) {
      const result = enhanceContentLine(line, missingKeywords);
      changes.push(...result.changes);
      enhancedLines.push(result.enhanced);
    } else {
      enhancedLines.push(line);
    }
  }
  
  return {
    content: enhancedLines.join('\n'),
    changes
  };
};

// Main export function - backwards compatible
export const enhanceCV = async (originalContent: string): Promise<EnhancedCVResult> => {
  return await enhanceCVWithAI(originalContent);
};
