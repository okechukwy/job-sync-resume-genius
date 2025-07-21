import { supabase } from "@/integrations/supabase/client";
import { AnalysisData } from "@/components/cv-analysis/types/analysisTypes";
import { TablesInsert } from "@/integrations/supabase/types";

export interface SavedCVAnalysis {
  id: string;
  file_name: string;
  file_size: number;
  overall_score: number;
  ats_score: number;
  created_at: string;
}

export const cvAnalysisService = {
  // Save CV analysis results
  async saveCVAnalysis(
    fileName: string,
    fileSize: number,
    analysisData: AnalysisData
  ): Promise<string> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("cv_analyses")
      .insert({
        user_id: user.user.id,
        file_name: fileName,
        file_size: fileSize,
        overall_score: analysisData.overallScore,
        ats_score: analysisData.atsScore,
        sections: analysisData.sections as any,
        keywords: analysisData.keywords as any,
        improvements: analysisData.improvements as any,
        analysis_type: "ai_generated"
      } as TablesInsert<'cv_analyses'>)
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

  // Load specific CV analysis
  async loadCVAnalysis(analysisId: string): Promise<AnalysisData> {
    const { data, error } = await supabase
      .from("cv_analyses")
      .select("*")
      .eq("id", analysisId)
      .single();

    if (error) throw error;

    return {
      overallScore: data.overall_score,
      atsScore: data.ats_score,
      sections: data.sections as unknown as AnalysisData['sections'],
      keywords: data.keywords as unknown as AnalysisData['keywords'], 
      improvements: data.improvements as unknown as AnalysisData['improvements'],
      industry: data.industry || 'Business',
      targetRole: data.target_role || 'Professional'
    };
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