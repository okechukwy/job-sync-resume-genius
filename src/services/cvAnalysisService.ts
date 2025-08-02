
import { supabase } from "@/integrations/supabase/client";
import { AnalysisData } from "@/components/cv-analysis/types/analysisTypes";
import { TablesInsert } from "@/integrations/supabase/types";
import { validateAnalysisData, logValidationResult } from "@/components/cv-analysis/utils/dataValidation";
import { generateContentHash } from "./contentComparisonService";
import { performProgressiveAnalysis, getLatestEnhancementRound } from "./progressiveAnalysisService";

export interface SavedCVAnalysis {
  id: string;
  file_name: string;
  file_size: number;
  overall_score: number;
  ats_score: number;
  created_at: string;
}

export const cvAnalysisService = {
  // Save CV analysis results with validation and progressive tracking
  async saveCVAnalysis(
    fileName: string,
    fileSize: number,
    analysisData: AnalysisData,
    cvContent?: string,
    previousAnalysisId?: string
  ): Promise<string> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    // Validate data before saving
    const validationResult = validateAnalysisData(analysisData);
    logValidationResult(validationResult, 'CV Analysis Save');
    
    const dataToSave = validationResult.correctedData || analysisData;
    
    // Get enhancement round and content hash
    const enhancementRound = await getLatestEnhancementRound();
    const contentHash = cvContent ? generateContentHash(cvContent) : undefined;

    const { data, error } = await supabase
      .from("cv_analyses")
      .insert({
        user_id: user.user.id,
        file_name: fileName,
        file_size: fileSize,
        overall_score: dataToSave.overallScore,
        ats_score: dataToSave.atsScore,
        sections: dataToSave.sections as any,
        keywords: dataToSave.keywords as any,
        improvements: dataToSave.improvements as any,
        industry: dataToSave.industry,
        target_role: dataToSave.targetRole,
        analysis_type: "ai_generated",
        enhancement_round: enhancementRound,
        previous_analysis_id: previousAnalysisId,
        content_hash: contentHash
      } as any)
      .select()
      .single();

    if (error) throw error;
    return data.id;
  },

  // Get user's CV analyses
  async getUserCVAnalyses(): Promise<SavedCVAnalysis[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("cv_analyses")
      .select("id, file_name, file_size, overall_score, ats_score, created_at")
      .eq("user_id", user.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Load specific CV analysis with validation
  async loadCVAnalysis(analysisId: string): Promise<AnalysisData> {
    const { data, error } = await supabase
      .from("cv_analyses")
      .select("*")
      .eq("id", analysisId)
      .single();

    if (error) throw error;

    const rawAnalysis = {
      overallScore: data.overall_score,
      atsScore: data.ats_score,
      sections: data.sections as unknown as AnalysisData['sections'],
      keywords: data.keywords as unknown as AnalysisData['keywords'], 
      improvements: data.improvements as unknown as AnalysisData['improvements'],
      industry: (data as any).industry || 'Business',
      targetRole: (data as any).target_role || 'Professional'
    };

    // Validate loaded data
    const validationResult = validateAnalysisData(rawAnalysis);
    logValidationResult(validationResult, 'CV Analysis Load');
    
    return validationResult.correctedData || rawAnalysis;
  },

  // Perform progressive CV analysis
  async performProgressiveCVAnalysis(
    originalAnalysis: AnalysisData,
    cvContent: string
  ): Promise<AnalysisData> {
    const progressiveResult = await performProgressiveAnalysis(originalAnalysis, cvContent);
    return progressiveResult.analysisData;
  },

  // Delete CV analysis
  async deleteCVAnalysis(analysisId: string): Promise<void> {
    const { error } = await supabase
      .from("cv_analyses")
      .delete()
      .eq("id", analysisId);

    if (error) throw error;
  }
};
