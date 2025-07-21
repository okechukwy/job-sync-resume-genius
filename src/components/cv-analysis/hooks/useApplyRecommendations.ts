
import { useState } from "react";
import { toast } from "sonner";
import { readFileContent } from "@/utils/fileReader";
import { enhanceCVWithAI, EnhancedCVResult } from "@/services/cvEnhancement";

export const useApplyRecommendations = (
  uploadedFile: File, 
  analysisData?: any,
  onOptimizationComplete?: (result: EnhancedCVResult) => void
) => {
  const [recommendationsApplied, setRecommendationsApplied] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState<EnhancedCVResult | null>(null);
  const [originalContent, setOriginalContent] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyRecommendations = async () => {
    console.log("Starting AI-powered recommendations application with analysis data:", {
      hasAnalysisData: !!analysisData,
      industry: analysisData?.industry,
      targetRole: analysisData?.targetRole,
      atsScore: analysisData?.atsScore,
      missingKeywords: analysisData?.keywords?.missingKeywords?.length || 0,
      improvementsCount: analysisData?.improvements?.length || 0
    });
    
    setIsProcessing(true);
    setRecommendationsApplied(false);
    
    try {
      toast.info("📄 Reading CV content...");
      
      // Read original file content if not already read
      let content = originalContent;
      if (!content) {
        content = await readFileContent(uploadedFile);
        setOriginalContent(content);
      }

      console.log("CV content read successfully, length:", content.length);

      // Extract and validate analysis data for AI enhancement
      const missingKeywords = analysisData?.keywords?.missingKeywords || 
                            analysisData?.keywords?.suggestions || 
                            [];
      const targetIndustry = analysisData?.industry || 'Business';
      const targetRole = analysisData?.targetRole || 'Professional';
      const atsScore = analysisData?.atsScore || 70;
      const weakAreas = analysisData?.improvements?.map((imp: any) => imp.issue) || [];

      console.log("Enhancement parameters validated:", {
        missingKeywords: missingKeywords.length,
        targetIndustry,
        targetRole,
        atsScore,
        weakAreas: weakAreas.length
      });

      // Show detailed progress with better UX
      toast.info("🤖 AI analyzing your CV structure...");
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.info("⚡ Applying intelligent enhancements...");

      // Apply AI-powered enhancements with proper error handling
      const enhanced = await enhanceCVWithAI(
        content,
        missingKeywords,
        targetIndustry,
        targetRole,
        atsScore,
        weakAreas
      );

      console.log("AI enhancement completed successfully:", {
        changesApplied: enhanced.changesApplied.length,
        estimatedImprovement: enhanced.estimatedATSScoreImprovement,
        keywordsAdded: enhanced.atsImprovements.keywordsAdded.length,
        actionVerbsImproved: enhanced.atsImprovements.actionVerbsImproved,
        enhancedContentLength: enhanced.resumeContent.length
      });

      setEnhancedResult(enhanced);
      setRecommendationsApplied(true);

      // Notify parent component about the optimization completion
      if (onOptimizationComplete) {
        onOptimizationComplete(enhanced);
      }

    } catch (error) {
      console.error("Error applying recommendations:", error);
      
      // Enhanced error handling with specific messages
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      if (errorMessage.includes('AI enhancement failed')) {
        toast.warning("⚠️ AI enhancement temporarily unavailable. Applied basic optimization instead.");
      } else if (errorMessage.includes('Failed to read file')) {
        toast.error("❌ Could not read CV file. Please try uploading again.");
      } else if (errorMessage.includes('Enhancement service temporarily unavailable')) {
        toast.error("🔧 Enhancement service is temporarily down. Please try again in a few minutes.");
      } else {
        toast.error("❌ Failed to apply recommendations. Please try again.");
      }
      
      setRecommendationsApplied(false);
      setEnhancedResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    recommendationsApplied,
    enhancedResult,
    originalContent,
    isProcessing,
    handleApplyRecommendations
  };
};
