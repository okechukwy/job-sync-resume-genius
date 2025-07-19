
import { SKILL_TAXONOMY, INDUSTRY_MATRICES } from './skillTaxonomy';

export interface ExtractedKeyword {
  keyword: string;
  variants: string[];
  context: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  category: 'technical' | 'soft' | 'tool' | 'methodology' | 'certification' | 'domain';
  confidence: number;
}

export const extractEnhancedKeywords = (text: string, industry: string = 'general'): ExtractedKeyword[] => {
  const lowerText = text.toLowerCase();
  const extractedKeywords: ExtractedKeyword[] = [];
  const processedKeywords = new Set<string>();

  // Check against skill taxonomy
  Object.values(SKILL_TAXONOMY).forEach(skillData => {
    const allVariants = [skillData.name, ...skillData.synonyms];
    
    for (const variant of allVariants) {
      const lowerVariant = variant.toLowerCase();
      if (lowerText.includes(lowerVariant) && !processedKeywords.has(skillData.name)) {
        
        // Determine importance based on context
        let importance: ExtractedKeyword['importance'] = 'medium';
        const contextWindow = extractContextWindow(text, variant);
        
        if (contextWindow.includes('required') || contextWindow.includes('must have') || contextWindow.includes('essential')) {
          importance = 'critical';
        } else if (contextWindow.includes('preferred') || contextWindow.includes('plus') || contextWindow.includes('bonus')) {
          importance = 'medium';
        } else if (contextWindow.includes('nice to have') || contextWindow.includes('optional')) {
          importance = 'low';
        } else {
          // Check industry matrix for importance
          const industryMatrix = INDUSTRY_MATRICES[industry];
          if (industryMatrix?.criticalSkills.includes(skillData.name)) {
            importance = 'critical';
          } else if (industryMatrix?.preferredSkills.includes(skillData.name)) {
            importance = 'high';
          }
        }

        extractedKeywords.push({
          keyword: skillData.name,
          variants: allVariants,
          context: contextWindow,
          importance,
          category: skillData.type,
          confidence: calculateConfidence(contextWindow, variant)
        });

        processedKeywords.add(skillData.name);
      }
    }
  });

  // Extract additional patterns for industry-specific terms
  const industryPatterns = getIndustryPatterns(industry);
  industryPatterns.forEach(pattern => {
    const matches = text.match(pattern.regex);
    if (matches) {
      matches.forEach(match => {
        const cleanMatch = match.replace(/[^a-zA-Z0-9\s+#.-]/g, '').trim();
        if (cleanMatch.length > 2 && !processedKeywords.has(cleanMatch)) {
          extractedKeywords.push({
            keyword: cleanMatch,
            variants: [cleanMatch],
            context: extractContextWindow(text, cleanMatch),
            importance: pattern.importance,
            category: pattern.category,
            confidence: 0.7
          });
          processedKeywords.add(cleanMatch);
        }
      });
    }
  });

  return extractedKeywords.sort((a, b) => {
    const importanceOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    return importanceOrder[b.importance] - importanceOrder[a.importance];
  });
};

const extractContextWindow = (text: string, keyword: string, windowSize: number = 50): string => {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  const index = lowerText.indexOf(lowerKeyword);
  
  if (index === -1) return '';
  
  const start = Math.max(0, index - windowSize);
  const end = Math.min(text.length, index + keyword.length + windowSize);
  
  return text.substring(start, end);
};

const calculateConfidence = (context: string, keyword: string): number => {
  let confidence = 0.5;
  
  // Higher confidence if keyword appears in structured context
  if (context.includes('•') || context.includes('-') || context.includes('Requirements:')) {
    confidence += 0.2;
  }
  
  // Higher confidence if it appears with qualifiers
  if (context.includes('experience') || context.includes('proficient') || context.includes('skilled')) {
    confidence += 0.15;
  }
  
  // Lower confidence if it appears in casual context
  if (context.includes('would be nice') || context.includes('familiarity')) {
    confidence -= 0.1;
  }
  
  return Math.min(0.95, Math.max(0.1, confidence));
};

interface IndustryPattern {
  regex: RegExp;
  importance: ExtractedKeyword['importance'];
  category: ExtractedKeyword['category'];
}

const getIndustryPatterns = (industry: string): IndustryPattern[] => {
  const patterns: IndustryPattern[] = [];
  
  switch (industry) {
    case 'technology':
      patterns.push(
        { regex: /\b([A-Z][a-zA-Z]*\.?js)\b/g, importance: 'high', category: 'technical' },
        { regex: /\b(API|REST|GraphQL|gRPC)\b/gi, importance: 'high', category: 'technical' },
        { regex: /\b(CI\/CD|DevOps|SRE)\b/gi, importance: 'medium', category: 'methodology' }
      );
      break;
    case 'healthcare':
      patterns.push(
        { regex: /\b(HIPAA|HL7|FHIR|ICD-10)\b/gi, importance: 'critical', category: 'certification' },
        { regex: /\b(Epic|Cerner|Allscripts)\b/gi, importance: 'high', category: 'tool' }
      );
      break;
    case 'finance':
      patterns.push(
        { regex: /\b(CFA|FRM|CPA|Series \d+)\b/gi, importance: 'high', category: 'certification' },
        { regex: /\b(Bloomberg|Reuters|FactSet)\b/gi, importance: 'high', category: 'tool' }
      );
      break;
  }
  
  return patterns;
};
