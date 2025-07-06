import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { CVAnalysisProps } from "./types/analysisTypes";
import { mockAnalysisData } from "./data/mockAnalysisData";
import OverallScores from "./components/OverallScores";
import SectionBreakdown from "./components/SectionBreakdown";
import KeywordAnalysis from "./components/KeywordAnalysis";
import ImprovementSuggestions from "./components/ImprovementSuggestions";
import ApplyRecommendations from "./components/ApplyRecommendations";

const CVAnalysis = ({ uploadedFile, onContinue, onReupload }: CVAnalysisProps) => {
  const handleContinueOptimization = () => {
    toast.success("Let's optimize your resume for better ATS performance!");
    onContinue();
  };

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

      {/* Overall Scores */}
      <OverallScores 
        overallScore={mockAnalysisData.overallScore}
        atsScore={mockAnalysisData.atsScore}
      />

      {/* Section Breakdown */}
      <SectionBreakdown sections={mockAnalysisData.sections} />

      {/* Keywords Analysis */}
      <KeywordAnalysis keywords={mockAnalysisData.keywords} />

      {/* Improvement Suggestions */}
      <ImprovementSuggestions improvements={mockAnalysisData.improvements} />

      {/* Apply Recommendations */}
      <ApplyRecommendations 
        uploadedFile={uploadedFile}
        onContinue={onContinue}
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