
import { Improvement } from "../types/analysisTypes";
import { EnhancedCVResult } from "@/services/cvEnhancement";

export interface ImprovementValidationResult {
  addressed: number[];
  partiallyAddressed: number[];
  notAddressed: number[];
  aiAppliedCategories: string[];
}

export interface AIImprovementMapping {
  improvementIndex: number;
  category: string;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

export const validateAIImprovements = (
  improvements: Improvement[],
  aiResult: EnhancedCVResult
): ImprovementValidationResult => {
  const addressed: number[] = [];
  const partiallyAddressed: number[] = [];
  const notAddressed: number[] = [];
  const aiAppliedCategories = new Set<string>();

  // Extract AI applied categories from changes
  aiResult.changesApplied.forEach(change => {
    aiAppliedCategories.add(change.category);
  });

  improvements.forEach((improvement, index) => {
    const matchingCategory = findMatchingCategory(improvement, Array.from(aiAppliedCategories));
    const relevantChanges = aiResult.changesApplied.filter(change => 
      isRelevantChange(improvement, change)
    );

    if (relevantChanges.length > 0) {
      if (matchingCategory && relevantChanges.length >= 2) {
        addressed.push(index);
      } else {
        partiallyAddressed.push(index);
      }
    } else {
      notAddressed.push(index);
    }
  });

  return {
    addressed,
    partiallyAddressed,
    notAddressed,
    aiAppliedCategories: Array.from(aiAppliedCategories)
  };
};

const findMatchingCategory = (improvement: Improvement, aiCategories: string[]): string | null => {
  const improvementKeywords = improvement.issue.toLowerCase();
  
  const categoryMappings = {
    'keyword-integration': ['keyword', 'ats', 'search', 'optimization'],
    'action-verbs': ['action', 'verb', 'strong', 'dynamic', 'impact'],
    'quantification': ['number', 'metric', 'quantify', 'measure', 'result'],
    'professional-language': ['professional', 'language', 'tone', 'clarity']
  };

  for (const [category, keywords] of Object.entries(categoryMappings)) {
    if (aiCategories.includes(category) && 
        keywords.some(keyword => improvementKeywords.includes(keyword))) {
      return category;
    }
  }

  return null;
};

const isRelevantChange = (improvement: Improvement, change: any): boolean => {
  const improvementText = improvement.issue.toLowerCase();
  const changeCategory = change.category.toLowerCase();
  const changeReasoning = change.reasoning.toLowerCase();

  // Check if the change addresses the specific improvement
  return improvementText.includes(changeCategory.replace('-', ' ')) ||
         changeReasoning.includes(improvementText.substring(0, 20)) ||
         hasSemanticMatch(improvementText, changeReasoning);
};

const hasSemanticMatch = (improvementText: string, changeReasoning: string): boolean => {
  const commonPhrases = [
    'resume format', 'ats friendly', 'keyword optimization', 
    'action verbs', 'quantify achievements', 'professional language'
  ];

  return commonPhrases.some(phrase => 
    improvementText.includes(phrase) && changeReasoning.includes(phrase)
  );
};

export const getImprovementStatus = (
  index: number, 
  validationResult: ImprovementValidationResult,
  manuallyCompleted: number[]
): 'ai-applied' | 'manually-completed' | 'partially-applied' | 'not-addressed' => {
  if (manuallyCompleted.includes(index)) {
    return 'manually-completed';
  }
  if (validationResult.addressed.includes(index)) {
    return 'ai-applied';
  }
  if (validationResult.partiallyAddressed.includes(index)) {
    return 'partially-applied';
  }
  return 'not-addressed';
};
