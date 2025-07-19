
import { supabase } from "@/integrations/supabase/client";

export interface JobMatchingResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  skillsGap: Array<{
    skill: string;
    importance: 'High' | 'Medium' | 'Low';
    hasSkill: boolean;
  }>;
  recommendations: string[];
  proTips: string[];
  enhancedAnalysis?: EnhancedMatchAnalysis;
  processingResult?: FileReadResult;
  analysisConfidence: 'high' | 'medium' | 'low';
  analysisWarnings: string[];
  personalizedInsights?: PersonalizedInsights;
}

export interface PersonalizedInsights {
  resumeProfile: ParsedResumeContent;
  learningPaths: PersonalizedLearningPath[];
  marketIntelligence: MarketIntelligence;
  competitivePosition: CompetitivePositioning;
  contextualRecommendations: ContextualRecommendation[];
}

export interface ContextualRecommendation {
  category: 'immediate' | 'short-term' | 'long-term';
  priority: 'critical' | 'high' | 'medium' | 'low';
  action: string;
  rationale: string;
  timeframe: string;
  resources: string[];
}

export interface EnhancedMatchAnalysis {
  overallScore: number;
  categoryScores: {
    technical: number;
    soft: number;
    tools: number;
    methodologies: number;
    domain: number;
  };
  contextualInsights: {
    industryFit: number;
    roleLevelMatch: number;
    experienceAlignment: number;
    cultureMatch: number;
  };
  competitivePosition: {
    strengthsVsMarket: string[];
    gapsVsMarket: string[];
    uniqueDifferentiators: string[];
  };
}

export interface ParsedResumeContent {
  totalYearsExperience: number;
  experienceLevel: 'entry' | 'junior' | 'mid' | 'senior' | 'executive';
  skills: Array<{
    skill: string;
    proficiencyLevel: string;
    yearsOfExperience: number;
  }>;
  industryExperience: string[];
  managementExperience: boolean;
  quantifiableResults: string[];
  careerProgression: 'strong_progression' | 'steady' | 'lateral';
}

export interface PersonalizedLearningPath {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  estimatedTimeWeeks: number;
  priorityScore: number;
  learningSteps: Array<{
    title: string;
    resources: Array<{
      name: string;
    }>;
  }>;
  costEstimate: {
    totalCostRange: {
      min: number;
      max: number;
    };
    free: string[];
  };
}

export interface MarketIntelligence {
  averageSalary: {
    min: number;
    median: number;
    max: number;
  };
  demandLevel: 'very-high' | 'high' | 'medium' | 'low';
  competitionLevel: 'low' | 'medium' | 'high' | 'very-high';
  emergingTrends: string[];
  decliningSkills: string[];
}

export interface CompetitivePositioning {
  marketPosition: 'top-quartile' | 'above-average' | 'average' | 'below-average' | 'bottom-quartile';
  recommendedStrategy: {
    primaryFocus: string;
    salaryNegotiation: {
      negotiationPosition: 'strong' | 'moderate' | 'weak';
      expectedRange: {
        min: number;
        max: number;
      };
      keyLeveragePoints: string[];
      improvementActions: string[];
    };
  };
}

export interface FileReadResult {
  content: string;
  confidence: 'high' | 'medium' | 'low';
  extractedWords: number;
  warnings: string[];
  processingMethod: string;
}

// Main analysis function that now uses AI
export const analyzeJobMatch = async (
  jobDescription: string,
  resumeFile: File,
  manualResumeContent?: string
): Promise<JobMatchingResult> => {
  try {
    let resumeContent: string;
    
    if (manualResumeContent) {
      resumeContent = manualResumeContent;
    } else {
      // Import the file reader utility
      const { readFileContentWithMetadata } = await import('./fileReader');
      const processingResult = await readFileContentWithMetadata(resumeFile);
      resumeContent = processingResult.content;
    }
    
    if (resumeContent.trim().length < 50) {
      throw new Error('Insufficient resume content for analysis. Please provide a more detailed resume or use manual input.');
    }

    // Call the AI-powered analysis edge function
    const { data, error } = await supabase.functions.invoke('job-matching', {
      body: {
        jobDescription,
        resumeContent
      }
    });

    if (error) {
      console.error('AI analysis error:', error);
      throw new Error(error.message || 'Failed to analyze job match with AI');
    }

    // Return the AI-generated analysis
    return data as JobMatchingResult;

  } catch (error) {
    console.error('Error analyzing job match:', error);
    throw new Error(`Failed to analyze job match: ${error.message}`);
  }
};
