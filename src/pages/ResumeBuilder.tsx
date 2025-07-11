import ResumeSteps from "@/components/ResumeSteps";
import { useResumeBuilder } from "@/hooks/useResumeBuilder";
import { AnalysisStep } from "@/components/resume-builder";
import UnifiedTemplateStep from "@/components/resume-builder/UnifiedTemplateStep";

const ResumeBuilder = () => {
  const {
    currentStep,
    selectedTemplate,
    uploadedFile,
    handleFileChange,
    handleStartFromScratch,
    handleContinueFromAnalysis,
    handleReupload,
    handleTemplateSelect,
    handleBackToTemplates,
    handleBackToStep
  } = useResumeBuilder();

  // Build step - render the full resume creation flow
  if (currentStep === 'build') {
    return (
      <ResumeSteps 
        selectedTemplate={selectedTemplate} 
        onBack={() => handleBackToStep('templates')} 
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

  // Template selection step (default)
  return (
    <UnifiedTemplateStep
      selectedTemplate={selectedTemplate}
      onTemplateSelect={handleTemplateSelect}
      uploadedFile={uploadedFile}
      onFileChange={handleFileChange}
      onStartFromScratch={handleStartFromScratch}
    />
  );
};

export default ResumeBuilder;