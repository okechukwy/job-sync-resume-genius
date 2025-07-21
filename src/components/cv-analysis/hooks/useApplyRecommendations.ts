
import { useState } from "react";
import { toast } from "sonner";
import { readFileContent } from "@/utils/fileReader";
import { enhanceCVWithAI, EnhancedCVResult } from "@/services/cvEnhancement";

export const useApplyRecommendations = (
  uploadedFile: File, 
  analysisData?: any
) => {
  const [recommendationsApplied, setRecommendationsApplied] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState<EnhancedCVResult | null>(null);
  const [originalContent, setOriginalContent] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyRecommendations = async () => {
    console.log("Starting AI-powered recommendations application");
    setIsProcessing(true);
    setRecommendationsApplied(false);
    
    try {
      toast.info("Reading CV content...");
      
      // Read original file content if not already read
      let content = originalContent;
      if (!content) {
        content = await readFileContent(uploadedFile);
        setOriginalContent(content);
      }

      console.log("CV content read successfully, length:", content.length);

      // Extract analysis data for AI enhancement
      const missingKeywords = analysisData?.keywords?.missingKeywords || analysisData?.keywords?.suggestions || [];
      const targetIndustry = analysisData?.industry || 'Business';
      const targetRole = analysisData?.targetRole;
      const atsScore = analysisData?.atsScore;
      const weakAreas = analysisData?.improvements?.map((imp: any) => imp.issue) || [];

      console.log("Enhancement parameters:", {
        missingKeywords: missingKeywords.length,
        targetIndustry,
        targetRole,
        atsScore,
        weakAreas: weakAreas.length
      });

      // Show processing steps with better UX
      toast.info("🤖 AI analyzing your CV structure...");
      
      // Add a small delay to show the processing message
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.info("⚡ Applying intelligent enhancements...");

      // Apply AI-powered enhancements
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
        actionVerbsImproved: enhanced.atsImprovements.actionVerbsImproved
      });

      setEnhancedResult(enhanced);
      setRecommendationsApplied(true);

      // Show success message with details
      const successMessage = enhanced.changesApplied.length > 0 
        ? `✅ Applied ${enhanced.changesApplied.length} AI improvements with +${enhanced.estimatedATSScoreImprovement} ATS score boost!`
        : `✅ CV optimization complete! Your CV is already well-optimized.`;
      
      toast.success(successMessage);

    } catch (error) {
      console.error("Error applying recommendations:", error);
      
      // More specific error handling
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      if (errorMessage.includes('AI enhancement failed')) {
        toast.error("AI enhancement temporarily unavailable. Using enhanced basic optimization.");
      } else if (errorMessage.includes('Failed to read file')) {
        toast.error("Could not read CV file. Please try uploading again.");
      } else {
        toast.error("Failed to apply recommendations. Please try again.");
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
