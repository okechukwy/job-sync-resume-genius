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
    category?: string;
  }>;
  overallRecommendations: string[];
}

export interface InterviewAnalysisResult {
  overallScore: number;
  scores: {
    communication: number;
    content: number;
    structure: number;
    impact: number;
  };
  strengths: string[];
  improvements: Array<{
    area: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  industryFeedback: string;
  summary: string;
}

export interface InterviewQuestion {
  id: string;
  text: string;
  category: string;
  difficulty: string;
  tips: string;
  expectedElements: string[];
}

export interface QuestionGenerationResult {
  questions: InterviewQuestion[];
  sessionInfo: {
    totalQuestions: number;
    estimatedDuration: string;
    focus: string;
  };
}

export interface CoverLetterRequest {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  jobTitle: string;
  companyName: string;
  companyAddress?: string;
  hiringManager?: string;
  jobDescription: string;
  tone: string;
  keyPoints?: string;
  userBackground?: string;
  letterLength?: 'brief' | 'standard' | 'detailed';
  closingType?: string;
  templateId?: string;
  industry?: string;
}

export interface CoverLetterResult {
  coverLetter: string;
  success: boolean;
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

export const analyzeInterviewResponse = async (
  transcript: string,
  question: string,
  sessionType: string = 'behavioral',
  roleFocus: string = 'General Business'
): Promise<InterviewAnalysisResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('interview-analysis', {
      body: { transcript, question, sessionType, roleFocus }
    });

    if (error) {
      console.error('Interview analysis error:', error);
      throw new Error(error.message || 'Failed to analyze interview response');
    }

    return data as InterviewAnalysisResult;
  } catch (error) {
    console.error('Error calling interview analysis service:', error);
    throw error;
  }
};

export const generateInterviewQuestions = async (
  sessionType: string = 'behavioral',
  roleFocus: string = 'General Business',
  difficulty: string = 'medium',
  previousQuestions: string[] = []
): Promise<QuestionGenerationResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('question-generator', {
      body: { sessionType, roleFocus, difficulty, previousQuestions }
    });

    if (error) {
      console.error('Question generation error:', error);
      throw new Error(error.message || 'Failed to generate interview questions');
    }

    return data as QuestionGenerationResult;
  } catch (error) {
    console.error('Error calling question generator service:', error);
    throw error;
  }
};

export const generateCoverLetter = async (
  request: CoverLetterRequest
): Promise<CoverLetterResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('cover-letter-generator', {
      body: request
    });

    if (error) {
      console.error('Cover letter generation error:', error);
      throw new Error(error.message || 'Failed to generate cover letter');
    }

    return data as CoverLetterResult;
  } catch (error) {
    console.error('Error calling cover letter generator service:', error);
    throw error;
  }
};
