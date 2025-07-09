import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useResumeSteps } from "@/hooks/useResumeSteps";
import ProgressHeader from "@/components/resume-steps/ProgressHeader";
import StepIndicator from "@/components/resume-steps/StepIndicator";
import NavigationButtons from "@/components/resume-steps/NavigationButtons";
import StepContent from "@/components/resume-steps/StepContent";
import LivePreview from "@/components/LivePreview";

interface ResumeStepsProps {
  selectedIndustry: string;
  selectedTemplate: string;
  onBack: () => void;
}

const ResumeSteps = ({ selectedIndustry, selectedTemplate, onBack }: ResumeStepsProps) => {
  const {
    currentStep,
    resumeData,
    steps,
    progress,
    handleNext,
    handlePrevious,
    handleDataUpdate,
    handleValidationChange,
  } = useResumeSteps();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Industries
              </Button>
              <div className="text-2xl font-bold gradient-text">ResumeAI</div>
            </div>
            <Badge variant="secondary" className="glass-card">
              {selectedIndustry} Resume
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <ProgressHeader 
          currentStep={currentStep}
          steps={steps}
          progress={progress}
        />

        {/* Step Navigation */}
        <StepIndicator 
          steps={steps}
          currentStep={currentStep}
        />

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Form */}
          <Card className="glass-card">
            <CardContent className="p-8">
              <StepContent
                currentStep={currentStep}
                resumeData={resumeData}
                selectedIndustry={selectedIndustry}
                selectedTemplate={selectedTemplate}
                onDataUpdate={handleDataUpdate}
                onValidationChange={handleValidationChange}
              />
            </CardContent>
          </Card>

          {/* Right Column - Live Preview */}
          <Card className="glass-card hidden lg:block">
            <CardContent className="p-0 h-full">
              <LivePreview
                data={resumeData}
                industry={selectedIndustry}
                template={selectedTemplate}
                className="h-full min-h-[600px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Mobile Preview Button */}
        <div className="lg:hidden mb-8">
          <Card className="glass-card">
            <CardContent className="p-4">
              <LivePreview
                data={resumeData}
                industry={selectedIndustry}
                template={selectedTemplate}
                className="h-96"
              />
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentStep={currentStep}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default ResumeSteps;