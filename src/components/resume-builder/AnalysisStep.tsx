import CVAnalysis from "@/components/cv-analysis/CVAnalysis";
import ResumeBuilderHeader from "./ResumeBuilderHeader";

interface AnalysisStepProps {
  uploadedFile: File;
  onContinue: () => void;
  onReupload: () => void;
}

const AnalysisStep = ({ uploadedFile, onContinue, onReupload }: AnalysisStepProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <ResumeBuilderHeader 
        onBack={onReupload}
        backLabel="Back to Upload"
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <CVAnalysis 
          uploadedFile={uploadedFile}
          onContinue={onContinue}
          onReupload={onReupload}
        />
      </div>
    </div>
  );
};

export default AnalysisStep;