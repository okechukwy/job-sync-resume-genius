import { supabase } from "@/integrations/supabase/client";
import { AnalysisData } from "@/components/cv-analysis/types/analysisTypes";

export interface LinkedInData {
  name?: string;
  currentRole?: string;
  industry?: string;
  experience?: string[];
  skills?: string[];
  achievements?: string[];
}

export interface ATSOptimizationResult {
  atsScore: number;
  keywordMatches: {
    found: string[];
    missing: string[];
    suggestions: string[];
  };
  formatOptimizations: Array<{
    issue: string;
    recommendation: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  contentOptimizations: Array<{
    section: string;
    current: string;
    improved: string;
    reasoning: string;
  }>;
  overallRecommendations: string[];
}

export const analyzeCVWithAI = async (
  resumeText: string, 
  industry: string = 'Business'
): Promise<AnalysisData> => {
  try {
    const { data, error } = await supabase.functions.invoke('cv-analysis', {
      body: { resumeText, industry }
    });

    if (error) {
      console.error('CV analysis error:', error);
      throw new Error(error.message || 'Failed to analyze CV');
    }

    return data as AnalysisData;
  } catch (error) {
    console.error('Error calling CV analysis service:', error);
    throw error;
  }
};

export const generateLinkedInContent = async (
  type: 'headline' | 'summary' | 'content-suggestions',
  data: LinkedInData
): Promise<{ content: string[] | string | Array<{title: string; content: string}> }> => {
  try {
    const { data: result, error } = await supabase.functions.invoke('linkedin-generator', {
      body: { type, data }
    });

    if (error) {
      console.error('LinkedIn generation error:', error);
      throw new Error(error.message || 'Failed to generate LinkedIn content');
    }

    return result;
  } catch (error) {
    console.error('Error calling LinkedIn generator service:', error);
    throw error;
  }
};

export const optimizeForATS = async (
  resumeText: string,
  jobDescription?: string,
  industry: string = 'Business'
): Promise<ATSOptimizationResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('ats-optimization', {
      body: { resumeText, jobDescription, industry }
    });

    if (error) {
      console.error('ATS optimization error:', error);
      throw new Error(error.message || 'Failed to optimize for ATS');
    }

    return data as ATSOptimizationResult;
  } catch (error) {
    console.error('Error calling ATS optimization service:', error);
    throw error;
  }
};