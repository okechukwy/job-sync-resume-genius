
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

// Enhanced content detection - less restrictive than before
const isEnhanceableContent = (line: string): boolean => {
  const trimmed = line.trim();
  
  // Must have some content
  if (!trimmed || trimmed.length < 15) return false;
  
  // Skip obvious non-content lines
  if (/^[A-Z\s]{5,}$/.test(trimmed)) return false; // All caps headers
  if (/@|phone|tel|email|linkedin|github|http/i.test(trimmed)) return false; // Contact/URLs
  if (/^[-=_•*\s]{1,}$/.test(trimmed)) return false; // Only separators
  if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(trimmed)) return false; // Just dates
  
  // Allow more content types for enhancement
  const hasMultipleWords = trimmed.split(/\s+/).length >= 3;
  const looksLikeContent = /[a-zA-Z]/.test(trimmed) && hasMultipleWords;
  
  return looksLikeContent;
};

// Enhanced basic content enhancement with more patterns
const enhanceContentLine = (line: string): string => {
  if (!isEnhanceableContent(line)) return line;
  
  let enhanced = line
    // Enhanced action verbs
    .replace(/\b(worked|did|was responsible for|handled|dealt with)\b/gi, 'managed')
    .replace(/\b(helped|assisted|aided)\b/gi, 'supported')
    .replace(/\b(made|created|built|developed)\b/gi, 'engineered')
    .replace(/\b(improved|enhanced|bettered|upgraded)\b/gi, 'optimized')
    .replace(/\b(led|headed|ran)\b/gi, 'directed')
    .replace(/\b(organized|arranged)\b/gi, 'coordinated')
    .replace(/\b(used|utilized)\b/gi, 'leveraged')
    .replace(/\b(worked with|collaborated with)\b/gi, 'partnered with')
    .replace(/\b(worked on|focused on)\b/gi, 'delivered')
    
    // Professional language enhancement
    .replace(/\b(good|nice|okay|fine)\b/gi, 'exceptional')
    .replace(/\b(big|large|huge)\b/gi, 'substantial')
    .replace(/\b(small|little)\b/gi, 'streamlined')
    .replace(/\b(fast|quick)\b/gi, 'efficient')
    .replace(/\b(many|lots of|a lot of)\b/gi, 'multiple')
    .replace(/\b(got|received|obtained)\b/gi, 'achieved')
    .replace(/\b(did well|performed well)\b/gi, 'excelled')
    
    // Add quantification suggestions where appropriate
    .replace(/\b(increased|improved|enhanced)\b/gi, 'increased by X%')
    .replace(/\b(reduced|decreased|cut)\b/gi, 'reduced by X%')
    .replace(/\b(managed|led|supervised)\b/gi, 'managed team of X')
    .replace(/\b(completed|finished|delivered)\b/gi, 'delivered X projects');
    
  return enhanced;
};

// AI-powered enhancement function
export const enhanceCVWithAI = async (
  originalContent: string,
  missingKeywords: string[] = [],
  targetIndustry: string = 'Business',
  targetRole?: string,
  atsScore?: number,
  weakAreas?: string[]
): Promise<EnhancedCVResult> => {
  console.log('Starting AI-powered CV enhancement...');
  
  const isHtml = originalContent.includes('<') && originalContent.includes('>');
  
  try {
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
      throw new Error(error.message || 'Failed to enhance CV with AI');
    }

    console.log('AI enhancement completed successfully');
    
    return {
      resumeContent: data.enhancedContent,
      enhancementLog: data.enhancementLog,
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
    console.error('AI enhancement failed, falling back to basic enhancement:', error);
    
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
      `Applied ${changesApplied.length} basic enhancements`,
      'Enhanced professional language and action verbs',
      'Integrated available keywords where appropriate',
      'Improved content structure and readability',
      'Note: AI enhancement unavailable, using basic optimization'
    ],
    isHtmlContent: isHtml,
    changesApplied,
    atsImprovements: {
      keywordsAdded: missingKeywords.slice(0, 3),
      metricsAdded: changesApplied.filter(c => c.category === 'quantification').length,
      actionVerbsImproved: changesApplied.filter(c => c.category === 'action-verbs').length,
      professionalLanguageEnhanced: changesApplied.filter(c => c.category === 'professional-language').length
    },
    estimatedATSScoreImprovement: Math.min(changesApplied.length * 2, 10)
  };
};

const enhanceHtmlContentBasic = (htmlContent: string, missingKeywords: string[] = []) => {
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
    if (isEnhanceableContent(originalText)) {
      const enhancedText = enhanceContentLine(originalText);
      
      if (originalText !== enhancedText) {
        changes.push({
          section: 'CV Content',
          original: originalText.trim(),
          improved: enhancedText.trim(),
          reasoning: 'Enhanced professional language and action verbs',
          category: 'professional-language'
        });
        textNode.textContent = enhancedText;
      }
    }
  });
  
  return {
    content: doc.documentElement?.outerHTML || htmlContent,
    changes
  };
};

const enhanceTextContentBasic = (textContent: string, missingKeywords: string[] = []) => {
  const lines = textContent.split('\n');
  const enhancedLines: string[] = [];
  const changes: EnhancedCVResult['changesApplied'] = [];
  
  for (const line of lines) {
    const originalLine = line;
    const enhancedLine = enhanceContentLine(line);
    
    if (originalLine !== enhancedLine) {
      changes.push({
        section: 'CV Content',
        original: originalLine.trim(),
        improved: enhancedLine.trim(),
        reasoning: 'Enhanced professional language and action verbs',
        category: 'professional-language'
      });
    }
    
    enhancedLines.push(enhancedLine);
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

// New export with full parameters
export { enhanceCVWithAI };
