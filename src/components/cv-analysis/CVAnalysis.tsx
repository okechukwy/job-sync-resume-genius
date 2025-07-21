
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { CVAnalysisProps, AnalysisData } from "./types/analysisTypes";
import { analyzeCVWithAI } from "@/services/openaiServices";
import { readFileContent } from "@/utils/fileReader";
import { useState, useEffect } from "react";
import { cvAnalysisService } from "@/services/cvAnalysisService";
import { validateAnalysisData, logValidationResult } from "./utils/dataValidation";
import OverallScores from "./components/OverallScores";
import SectionBreakdown from "./components/SectionBreakdown";
import KeywordAnalysis from "./components/KeywordAnalysis";
import ImprovementSuggestions from "./components/ImprovementSuggestions";
import ApplyRecommendations from "./components/ApplyRecommendations";

const CVAnalysis = ({ uploadedFile, onContinue, onReupload }: CVAnalysisProps) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        setIsAnalyzing(true);
        toast.info("Analyzing your CV with AI...");
        
        const fileContent = await readFileContent(uploadedFile);
        const rawAnalysis = await analyzeCVWithAI(fileContent);
        
        // Validate and correct the analysis data
        const validationResult = validateAnalysisData(rawAnalysis);
        logValidationResult(validationResult, 'CV Analysis');
        
        if (!validationResult.isValid) {
          console.error('Analysis validation failed:', validationResult.errors);
          toast.error("Analysis data validation failed. Using fallback data.");
          // Fallback to mock data if validation fails
          const { mockAnalysisData } = await import("./data/mockAnalysisData");
          setAnalysisData(mockAnalysisData);
        } else {
          const finalAnalysis = validationResult.correctedData || rawAnalysis;
          setAnalysisData(finalAnalysis);
          
          // Set validation warnings if any
          if (validationResult.warnings.length > 0) {
            setValidationWarnings(validationResult.warnings);
            toast.warning(`Analysis completed with ${validationResult.warnings.length} data corrections`);
          }
          
          // Save analysis to database
          await cvAnalysisService.saveCVAnalysis(
            uploadedFile.name,
            uploadedFile.size,
            finalAnalysis
          );
          
          toast.success("CV analysis completed and saved!");
        }
      } catch (error) {
        console.error("Analysis failed:", error);
        toast.error("Failed to analyze CV. Using fallback data.");
        // Fallback to mock data if analysis fails
        const { mockAnalysisData } = await import("./data/mockAnalysisData");
        setAnalysisData(mockAnalysisData);
      } finally {
        setIsAnalyzing(false);
      }
    };

    performAnalysis();
  }, [uploadedFile]);

  const handleContinueOptimization = () => {
    toast.success("Continuing to manual editing...");
    onContinue();
  };

  if (isAnalyzing || !analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg font-medium">Analyzing your CV with AI...</p>
          <p className="text-muted-foreground">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 glass-card">
          📊 Analysis Complete
        </Badge>
        <h2 className="text-3xl font-bold mb-4">
          Your Resume <span className="gradient-text">Analysis</span>
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg font-medium">{uploadedFile.name}</span>
          <Badge variant="outline">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</Badge>
        </div>
      </div>

      {/* Validation Warnings */}
      {validationWarnings.length > 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <span className="font-medium text-warning">Data Validation Notices</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            {validationWarnings.slice(0, 3).map((warning, index) => (
              <li key={index}>• {warning}</li>
            ))}
            {validationWarnings.length > 3 && (
              <li className="text-xs italic">... and {validationWarnings.length - 3} more corrections</li>
            )}
          </ul>
        </div>
      )}

      {/* Overall Scores */}
      <OverallScores 
        overallScore={analysisData.overallScore}
        atsScore={analysisData.atsScore}
      />

      {/* Section Breakdown */}
      <SectionBreakdown sections={analysisData.sections} />

      {/* Keywords Analysis */}
      <KeywordAnalysis keywords={analysisData.keywords} />

      {/* Improvement Suggestions */}
      <ImprovementSuggestions improvements={analysisData.improvements} />

      {/* Apply Recommendations with analysis data */}
      <ApplyRecommendations 
        uploadedFile={uploadedFile}
        onContinue={onContinue}
        analysisData={analysisData}
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleContinueOptimization}
          className="flex-1 max-w-xs"
        >
          Continue to Manual Editing
        </Button>
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={onReupload}
          className="flex-1 max-w-xs"
        >
          Upload Different Resume
        </Button>
      </div>
    </div>
  );
};

export default CVAnalysis;
