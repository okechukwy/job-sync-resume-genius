import { LinkedInProfile, ScannedProfile } from "@/schemas/linkedInSchemas";
import { supabase } from "@/integrations/supabase/client";

export interface ProfileExtractionResult {
  success: boolean;
  data?: ScannedProfile;
  error?: string;
}

interface EnhancedScannedProfile extends ScannedProfile {
  industryBenchmarks?: {
    averageProfileStrength: number;
    topPerformerGap: string[];
    competitiveAdvantage: string[];
  };
  improvementRecommendations?: Array<{
    area: string;
    priority: 'high' | 'medium' | 'low';
    impact: string;
    suggestion: string;
  }>;
  marketInsights?: {
    trendingKeywords: string[];
    emergingSkills: string[];
    industryGrowthAreas: string[];
  };
}

interface CompetitiveBenchmarkingConfig {
  targetIndustry?: string;
  experienceLevel?: "entry" | "mid" | "senior" | "executive";
  geographicMarket?: "global" | "regional" | "local";
  competitorCompanies?: string[];
}

export class LinkedInProfileExtractor {
  private static validateLinkedInUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('linkedin.com') && url.includes('/in/');
    } catch {
      return false;
    }
  }

  static async extractProfile(
    url: string, 
    scanDepth: "basic" | "detailed" | "comprehensive" = "detailed",
    analysisType: "personal" | "competitive" | "industry" = "personal",
    compareWithCurrent: boolean = true,
    competitiveBenchmarking?: CompetitiveBenchmarkingConfig
  ): Promise<ProfileExtractionResult> {
    if (!this.validateLinkedInUrl(url)) {
      return {
        success: false,
        error: "Invalid LinkedIn profile URL. Please provide a valid URL like https://linkedin.com/in/username"
      };
    }

    try {
      console.log('Calling AI-powered LinkedIn profile analysis...');
      
      const { data, error } = await supabase.functions.invoke('linkedin-profile-analyzer', {
        body: { 
          profileUrl: url,
          scanDepth,
          analysisType,
          compareWithCurrent,
          competitiveBenchmarking
        }
      });

      if (error) {
        console.error('LinkedIn profile analysis error:', error);
        throw new Error(error.message || 'Failed to analyze LinkedIn profile');
      }

      if (!data.success) {
        throw new Error(data.error || 'Profile analysis failed');
      }

      const analysisResult = data.data;
      
      // Transform the AI analysis into our ScannedProfile format
      const scannedProfile: EnhancedScannedProfile = {
        url: analysisResult.url,
        extractedData: analysisResult.extractedData,
        profileStrength: analysisResult.profileStrength,
        industryAlignment: analysisResult.industryAlignment,
        keywordDensity: analysisResult.keywordDensity,
        competitiveMetrics: {
          headlineOptimization: analysisResult.competitiveMetrics.headlineOptimization,
          summaryLength: analysisResult.competitiveMetrics.summaryLength,
          skillsCount: analysisResult.competitiveMetrics.skillsCount,
          experienceDetail: analysisResult.competitiveMetrics.experienceDetail,
        },
        industryBenchmarks: analysisResult.industryBenchmarks,
        improvementRecommendations: analysisResult.improvementRecommendations,
        marketInsights: analysisResult.marketInsights,
        scannedAt: new Date(analysisResult.scannedAt),
      };

      console.log('AI profile analysis completed successfully');
      
      return {
        success: true,
        data: scannedProfile,
      };
    } catch (error) {
      console.error('Error in profile extraction:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to extract profile data"
      };
    }
  }

  static async bulkExtractProfiles(urls: string[]): Promise<ProfileExtractionResult[]> {
    const results = await Promise.allSettled(
      urls.map(url => this.extractProfile(url))
    );

    return results.map(result => 
      result.status === 'fulfilled' 
        ? result.value 
        : { success: false, error: "Failed to process profile" }
    );
  }
}
