import { supabase } from "@/integrations/supabase/client";
import { AnalysisData, Improvement } from "@/components/cv-analysis/types/analysisTypes";
import { generateContentHash, compareContent, ContentComparison } from "./contentComparisonService";

export interface EnhancementHistory {
  id: string;
  user_id: string;
  cv_analysis_id?: string;
  original_content_hash: string;
  enhanced_content_hash?: string;
  improvement_round: number;
  applied_improvements: any;
  content_changes: any;
  optimization_areas: any;
  created_at: string;
}

export interface ProgressiveAnalysisResult {
  analysisData: AnalysisData;
  improvementRound: number;
  previouslyAddressed: string[];
  focusAreas: string[];
  isProgressive: boolean;
}

/**
 * Saves enhancement history for tracking progressive improvements
 */
export const saveEnhancementHistory = async (
  originalContent: string,
  enhancedContent: string | null,
  analysisId: string,
  appliedImprovements: string[] = [],
  improvementRound: number = 1
): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const originalHash = generateContentHash(originalContent);
  const enhancedHash = enhancedContent ? generateContentHash(enhancedContent) : null;
  
  const contentChanges = enhancedContent 
    ? compareContent(originalContent, enhancedContent)
    : null;

  const optimizationAreas: Record<string, boolean> = {};
  appliedImprovements.forEach(improvement => {
    const area = categorizeImprovement(improvement);
    optimizationAreas[area] = true;
  });

  const { data, error } = await supabase
    .from('cv_enhancement_history')
    .insert({
      user_id: user.id,
      cv_analysis_id: analysisId,
      original_content_hash: originalHash,
      enhanced_content_hash: enhancedHash,
      improvement_round: improvementRound,
      applied_improvements: appliedImprovements as any,
      content_changes: contentChanges as any,
      optimization_areas: optimizationAreas as any
    })
    .select()
    .single();

  if (error) throw error;
  return data.id;
};

/**
 * Gets the enhancement history for a user's CV content
 */
export const getEnhancementHistory = async (contentHash: string): Promise<EnhancementHistory[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('cv_enhancement_history')
    .select('*')
    .eq('user_id', user.id)
    .eq('original_content_hash', contentHash)
    .order('improvement_round', { ascending: true });

  if (error) {
    console.error('Error fetching enhancement history:', error);
    return [];
  }

  return data || [];
};

/**
 * Gets the latest enhancement round for a user
 */
export const getLatestEnhancementRound = async (): Promise<number> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 1;

  const { data, error } = await supabase
    .from('cv_enhancement_history')
    .select('improvement_round')
    .eq('user_id', user.id)
    .order('improvement_round', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) return 1;
  return (data[0].improvement_round || 0) + 1;
};

/**
 * Performs progressive analysis that considers previous improvements
 */
export const performProgressiveAnalysis = async (
  originalAnalysisData: AnalysisData,
  cvContent: string
): Promise<ProgressiveAnalysisResult> => {
  const contentHash = generateContentHash(cvContent);
  const history = await getEnhancementHistory(contentHash);
  
  // If no history, return original analysis
  if (history.length === 0) {
    return {
      analysisData: originalAnalysisData,
      improvementRound: 1,
      previouslyAddressed: [],
      focusAreas: getAllOptimizationAreas(),
      isProgressive: false
    };
  }

  // Determine what areas have been previously addressed
  const previouslyAddressed = new Set<string>();
  const optimizedAreas = new Set<string>();
  
  history.forEach(record => {
    const improvements = Array.isArray(record.applied_improvements) 
      ? record.applied_improvements 
      : [];
    improvements.forEach((improvement: string) => {
      previouslyAddressed.add(improvement);
      optimizedAreas.add(categorizeImprovement(improvement));
    });
  });

  // Filter out already addressed improvements
  const filteredImprovements = originalAnalysisData.improvements.filter(improvement => {
    const category = categorizeImprovement(improvement.issue);
    const isAlreadyAddressed = Array.from(previouslyAddressed).some(addressed => 
      improvement.issue.toLowerCase().includes(addressed.toLowerCase()) ||
      addressed.toLowerCase().includes(improvement.issue.toLowerCase())
    );
    
    return !isAlreadyAddressed;
  });

  // Generate new, more advanced suggestions for already optimized areas
  const advancedSuggestions = generateAdvancedSuggestions(Array.from(optimizedAreas), history.length + 1);
  
  // Combine filtered improvements with advanced suggestions
  const progressiveImprovements = [
    ...filteredImprovements,
    ...advancedSuggestions
  ].slice(0, 10); // Limit to 10 suggestions

  // Focus on unaddressed areas
  const allAreas = getAllOptimizationAreas();
  const focusAreas = allAreas.filter(area => !optimizedAreas.has(area));
  
  const progressiveAnalysisData: AnalysisData = {
    ...originalAnalysisData,
    improvements: progressiveImprovements
  };

  return {
    analysisData: progressiveAnalysisData,
    improvementRound: history.length + 1,
    previouslyAddressed: Array.from(previouslyAddressed),
    focusAreas: focusAreas.length > 0 ? focusAreas : ['advanced_optimization'],
    isProgressive: true
  };
};

/**
 * Categorizes an improvement into a general area
 */
const categorizeImprovement = (improvement: string): string => {
  const lowerImprovement = improvement.toLowerCase();
  
  if (lowerImprovement.includes('quantif') || lowerImprovement.includes('number') || lowerImprovement.includes('metric')) {
    return 'quantification';
  } else if (lowerImprovement.includes('keyword') || lowerImprovement.includes('skill')) {
    return 'keywords';
  } else if (lowerImprovement.includes('action') || lowerImprovement.includes('verb')) {
    return 'action_verbs';
  } else if (lowerImprovement.includes('format') || lowerImprovement.includes('structure')) {
    return 'formatting';
  } else if (lowerImprovement.includes('summary') || lowerImprovement.includes('objective')) {
    return 'summary';
  } else if (lowerImprovement.includes('experience') || lowerImprovement.includes('work')) {
    return 'experience';
  } else if (lowerImprovement.includes('education')) {
    return 'education';
  } else if (lowerImprovement.includes('contact') || lowerImprovement.includes('information')) {
    return 'contact_info';
  }
  
  return 'general';
};

/**
 * Gets all possible optimization areas
 */
const getAllOptimizationAreas = (): string[] => {
  return [
    'quantification',
    'keywords',
    'action_verbs',
    'formatting',
    'summary',
    'experience',
    'education',
    'contact_info',
    'skills',
    'achievements',
    'certifications',
    'projects'
  ];
};

/**
 * Generates advanced suggestions for areas that have been previously optimized
 */
const generateAdvancedSuggestions = (optimizedAreas: string[], round: number): Improvement[] => {
  const advancedSuggestions: Improvement[] = [];
  
  optimizedAreas.forEach(area => {
    switch (area) {
      case 'quantification':
        if (round >= 2) {
          advancedSuggestions.push({
            priority: 'medium',
            issue: 'Advanced metrics integration',
            suggestion: 'Include industry-specific KPIs and benchmark comparisons to demonstrate superior performance relative to industry standards.'
          });
        }
        break;
        
      case 'keywords':
        if (round >= 2) {
          advancedSuggestions.push({
            priority: 'medium',
            issue: 'Strategic keyword placement',
            suggestion: 'Optimize keyword density and placement for better ATS parsing while maintaining natural readability.'
          });
        }
        break;
        
      case 'experience':
        if (round >= 2) {
          advancedSuggestions.push({
            priority: 'low',
            issue: 'Leadership impact demonstration',
            suggestion: 'Emphasize cross-functional collaboration, stakeholder management, and strategic thinking in your role descriptions.'
          });
        }
        break;
        
      case 'summary':
        if (round >= 3) {
          advancedSuggestions.push({
            priority: 'low',
            issue: 'Executive presence enhancement',
            suggestion: 'Refine your professional summary to reflect thought leadership and strategic vision in your field.'
          });
        }
        break;
    }
  });
  
  // Add general advanced suggestions for higher rounds
  if (round >= 3) {
    advancedSuggestions.push({
      priority: 'low',
      issue: 'Industry thought leadership',
      suggestion: 'Consider adding speaking engagements, publications, or industry contributions to demonstrate thought leadership.'
    });
  }
  
  if (round >= 4) {
    advancedSuggestions.push({
      priority: 'low',
      issue: 'Personal brand alignment',
      suggestion: 'Ensure your CV aligns with your LinkedIn profile and personal brand for consistency across platforms.'
    });
  }
  
  return advancedSuggestions;
};