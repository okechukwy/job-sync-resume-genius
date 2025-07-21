
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
    
    try {
      // Read original file content if not already read
      let content = originalContent;
      if (!content) {
        content = await readFileContent(uploadedFile);
        setOriginalContent(content);
      }

      // Extract analysis data for AI enhancement
      const missingKeywords = analysisData?.keywords?.missing || [];
      const targetIndustry = analysisData?.industry || 'Business';
      const targetRole = analysisData?.targetRole;
      const atsScore = analysisData?.atsScore;
      const weakAreas = analysisData?.improvements?.map((imp: any) => imp.area) || [];

      // Show processing steps
      const processingSteps = [
        "Analyzing CV structure and content...",
        "Identifying enhancement opportunities...",
        "Applying AI-powered language improvements...",
        "Integrating missing ATS keywords...",
        "Optimizing professional language...",
        "Finalizing enhanced version..."
      ];
      
      let currentStep = 0;
      const showNextStep = () => {
        if (currentStep < processingSteps.length) {
          toast.info(processingSteps[currentStep]);
          currentStep++;
          setTimeout(showNextStep, 800);
        }
      };
      
      toast.success("Starting AI-powered CV optimization...");
      setTimeout(showNextStep, 500);

      // Apply AI-powered enhancements
      const enhanced = await enhanceCVWithAI(
        content,
        missingKeywords,
        targetIndustry,
        targetRole,
        atsScore,
        weakAreas
      );

      setEnhancedResult(enhanced);
      setRecommendationsApplied(true);
      
      console.log("AI enhancement completed:", {
        changesApplied: enhanced.changesApplied.length,
        estimatedImprovement: enhanced.estimatedATSScoreImprovement
      });

      toast.success(
        `AI optimization complete! Applied ${enhanced.changesApplied.length} improvements with estimated +${enhanced.estimatedATSScoreImprovement} ATS score boost.`
      );

    } catch (error) {
      console.error("Error applying recommendations:", error);
      toast.error("Failed to apply recommendations. Please try again.");
      setRecommendationsApplied(false);
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
