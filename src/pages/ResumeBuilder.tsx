import ResumeSteps from "@/components/ResumeSteps";
import { useResumeBuilder } from "@/hooks/useResumeBuilder";
import { IndustryStep, TemplateStep, AnalysisStep } from "@/components/resume-builder";

const ResumeBuilder = () => {
  const {
    currentStep,
    selectedIndustry,
    selectedTemplate,
    uploadedFile,
    handleIndustrySelect,
    handleFileChange,
    handleStartFromScratch,
    handleContinueFromAnalysis,
    handleReupload,
    handleTemplateSelect,
    handleBackToIndustries,
    handleBackToStep
  } = useResumeBuilder();

  // Build step - render the full resume creation flow
  if (currentStep === 'build') {
    return (
      <ResumeSteps 
        selectedIndustry={selectedIndustry} 
        selectedTemplate={selectedTemplate} 
        onBack={() => handleBackToStep('industry')} 
      />
    );
  }

  // Analysis step - show CV analysis for uploaded files
  if (currentStep === 'analysis' && uploadedFile) {
    return (
      <AnalysisStep
        uploadedFile={uploadedFile}
        onContinue={handleContinueFromAnalysis}
        onReupload={handleReupload}
      />
    );
  }

  // Template selection step
  if (currentStep === 'templates') {
    return (
      <TemplateStep
        selectedTemplate={selectedTemplate}
        selectedIndustry={selectedIndustry}
        onTemplateSelect={handleTemplateSelect}
        onBack={handleBackToIndustries}
      />
    );
  }

  // Industry selection step (default)
  return (
    <IndustryStep
      onIndustrySelect={handleIndustrySelect}
      uploadedFile={uploadedFile}
      onFileChange={handleFileChange}
      onStartFromScratch={handleStartFromScratch}
    />
  );
};

export default ResumeBuilder;