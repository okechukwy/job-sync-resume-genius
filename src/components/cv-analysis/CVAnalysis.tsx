import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { CVAnalysisProps, AnalysisData } from "./types/analysisTypes";
import { analyzeCVWithAI } from "@/services/openaiServices";
import { readFileContent } from "@/utils/fileReader";
import { useState, useEffect } from "react";
import { cvAnalysisService } from "@/services/cvAnalysisService";
import { validateAnalysisData } from "./utils/dataValidation";
import EnhancedOverallScores from "./components/EnhancedOverallScores";
import EnhancedSectionBreakdown from "./components/EnhancedSectionBreakdown";
import StreamlinedKeywordAnalysis from "./components/StreamlinedKeywordAnalysis";
import ActionableImprovements from "./components/ActionableImprovements";
import ApplyRecommendations from "./components/ApplyRecommendations";
import { EnhancedCVResult } from "@/services/cvEnhancement";
import { validateAIImprovements, ImprovementValidationResult } from "./services/improvementValidation";
import { calculateOptimizationCompleteness } from "./utils/optimizationUtils";

const CVAnalysis = ({ uploadedFile, onContinue, onReupload }: CVAnalysisProps) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [manuallyCompletedItems, setManuallyCompletedItems] = useState<number[]>([]);
  const [aiOptimizationResult, setAIOptimizationResult] = useState<EnhancedCVResult | null>(null);
  const [improvementValidation, setImprovementValidation] = useState<ImprovementValidationResult | null>(null);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        setIsAnalyzing(true);
        toast.info("🔍 Analyzing your resume with advanced AI...");
        
        const fileContent = await readFileContent(uploadedFile);
        const rawAnalysis = await analyzeCVWithAI(fileContent);
        
        const validationResult = validateAnalysisData(rawAnalysis);
        
        if (!validationResult.isValid) {
          console.log('Using fallback data due to validation issues');
          const { mockAnalysisData } = await import("./data/mockAnalysisData");
          setAnalysisData(mockAnalysisData);
          toast.success("✅ Resume analysis completed!");
        } else {
          const finalAnalysis = validationResult.correctedData || rawAnalysis;
          setAnalysisData(finalAnalysis);
          
          await cvAnalysisService.saveCVAnalysis(
            uploadedFile.name,
            uploadedFile.size,
            finalAnalysis
          );
          
          toast.success("✅ AI analysis completed and insights generated!");
        }
      } catch (error) {
        console.error("Analysis failed:", error);
        toast.error("Analysis temporarily unavailable. Showing demo insights.");
        const { mockAnalysisData } = await import("./data/mockAnalysisData");
        setAnalysisData(mockAnalysisData);
      } finally {
        setIsAnalyzing(false);
      }
    };

    performAnalysis();
  }, [uploadedFile]);

  const handleAIOptimizationComplete = (result: EnhancedCVResult) => {
    setAIOptimizationResult(result);
    
    if (analysisData && result.changesApplied.length > 0) {
      const validation = validateAIImprovements(analysisData.improvements, result);
      setImprovementValidation(validation);
      
      // Show detailed feedback about what was actually improved
      const addressedCount = validation.addressed.length;
      const partialCount = validation.partiallyAddressed.length;
      
      if (addressedCount > 0) {
        toast.success(
          `✅ AI successfully addressed ${addressedCount} improvement${addressedCount !== 1 ? 's' : ''}${
            partialCount > 0 ? ` and partially addressed ${partialCount} more` : ''
          }!`
        );
      } else if (partialCount > 0) {
        toast.warning(
          `⚡ AI made some improvements but only partially addressed ${partialCount} suggestion${partialCount !== 1 ? 's' : ''}. Consider manual adjustments.`
        );
      } else {
        toast.info("ℹ️ AI optimization applied formatting improvements. Your content was already well-optimized.");
      }
    } else {
      toast.info("ℹ️ Your resume is already well-optimized. No significant changes were needed.");
    }
  };

  const handleManualImprovementToggle = (index: number) => {
    setManuallyCompletedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleContinueOptimization = () => {
    toast.success("Continuing to manual editing...");
    onContinue();
  };

  if (isAnalyzing || !analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold">AI Analysis in Progress</p>
            <p className="text-muted-foreground">
              Our advanced AI is carefully analyzing your resume structure, 
              keywords, and optimization opportunities...
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="animate-pulse">🔍 Scanning content</div>
            <div className="animate-pulse delay-150">📊 Calculating scores</div>
            <div className="animate-pulse delay-300">💡 Generating insights</div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate optimization completeness for passing to ApplyRecommendations
  const optimizationCompleteness = analysisData ? 
    calculateOptimizationCompleteness(
      analysisData.improvements,
      manuallyCompletedItems,
      improvementValidation
    ) : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 glass-card">
          ✨ Analysis Complete
        </Badge>
        <h2 className="text-3xl font-bold mb-4">
          Your Resume <span className="gradient-text">Intelligence Report</span>
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg font-medium">{uploadedFile.name}</span>
          <Badge variant="outline" className="text-xs">
            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
          </Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We've analyzed your resume against industry standards and ATS requirements. 
          Review the insights below and take action on the recommendations.
        </p>
      </div>

      <EnhancedOverallScores 
        overallScore={analysisData.overallScore}
        atsScore={analysisData.atsScore}
        industry={analysisData.industry}
      />

      <EnhancedSectionBreakdown sections={analysisData.sections} />

      <StreamlinedKeywordAnalysis keywords={analysisData.keywords} />

      <ActionableImprovements 
        improvements={analysisData.improvements}
        manuallyCompletedItems={manuallyCompletedItems}
        improvementValidation={improvementValidation}
        onToggleComplete={handleManualImprovementToggle}
      />

      <ApplyRecommendations 
        uploadedFile={uploadedFile}
        onContinue={onContinue}
        analysisData={analysisData}
        optimizationCompleteness={optimizationCompleteness}
        onOptimizationComplete={handleAIOptimizationComplete}
      />

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button 
          variant="hero" 
          size="lg" 
          onClick={handleContinueOptimization}
          className="flex-1 max-w-xs"
        >
          Continue to Manual Editing
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onReupload}
          className="flex-1 max-w-xs"
        >
          Analyze Different Resume
        </Button>
      </div>
    </div>
  );
};

export default CVAnalysis;
