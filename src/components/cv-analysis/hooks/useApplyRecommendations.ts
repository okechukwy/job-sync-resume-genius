import { useState } from "react";
import { toast } from "sonner";
import { readFileContent } from "@/utils/fileReader";
import { enhanceCV, EnhancedCVResult } from "@/services/cvEnhancement";

export const useApplyRecommendations = (uploadedFile: File) => {
  const [recommendationsApplied, setRecommendationsApplied] = useState(false);
  const [enhancedResult, setEnhancedResult] = useState<EnhancedCVResult | null>(null);
  const [originalContent, setOriginalContent] = useState<string>("");

  const handleApplyRecommendations = async () => {
    console.log("Apply recommendations clicked - should NOT redirect");
    toast.success("Applying recommendations to your resume...");
    
    try {
      // Read original file content if not already read
      let content = originalContent;
      if (!content) {
        content = await readFileContent(uploadedFile);
        setOriginalContent(content);
      }

      // Simulate applying each recommendation
      const recommendations = [
        "Adding professional summary section...",
        "Enhancing experience descriptions with metrics...", 
        "Expanding skills section with missing keywords...",
        "Optimizing formatting for ATS compatibility...",
        "Finalizing optimized version..."
      ];
      
      let currentStep = 0;
      const applyNext = async () => {
        if (currentStep < recommendations.length) {
          toast.info(recommendations[currentStep]);
          currentStep++;
          setTimeout(applyNext, 800);
        } else {
          // Apply enhancements
          const enhanced = await enhanceCV(content);
          setEnhancedResult(enhanced);
          setRecommendationsApplied(true);
          console.log("All recommendations applied - staying on analysis page");
          toast.success("All recommendations applied to your CV! Review the optimized version below.");
        }
      };
      
      setTimeout(applyNext, 500);
    } catch (error) {
      toast.error("Failed to read CV content. Please try again.");
      console.error("Error reading file:", error);
    }
  };

  return {
    recommendationsApplied,
    enhancedResult,
    originalContent,
    handleApplyRecommendations
  };
};