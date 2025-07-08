import { Badge } from "@/components/ui/badge";
import IndustrySelection from "@/components/IndustrySelection";
import FileUpload from "@/components/FileUpload";
import ResumeBuilderHeader from "./ResumeBuilderHeader";

interface IndustryStepProps {
  onIndustrySelect: (industry: string) => void;
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
  onStartFromScratch: () => void;
}

const IndustryStep = ({ 
  onIndustrySelect, 
  uploadedFile, 
  onFileChange, 
  onStartFromScratch 
}: IndustryStepProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <ResumeBuilderHeader showHomeLink />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 glass-card">
            🚀 Get Started
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="gradient-text">Industry</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select your industry to get started with tailored resume templates and 
            industry-specific optimization suggestions.
          </p>
        </div>

        {/* Industry Selection Grid */}
        <IndustrySelection onIndustrySelect={onIndustrySelect} />

        {/* File Upload Section - Always visible in industry step */}
        <div className="mt-12">
          <FileUpload 
            uploadedFile={uploadedFile}
            onFileChange={onFileChange}
            onStartFromScratch={onStartFromScratch}
          />
        </div>
      </div>
    </div>
  );
};

export default IndustryStep;