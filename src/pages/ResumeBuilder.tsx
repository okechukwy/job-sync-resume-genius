
import ResumeSteps from "@/components/ResumeSteps";
import { useResumeBuilder } from "@/hooks/useResumeBuilder";
import { AnalysisStep } from "@/components/resume-builder";
import { UnifiedTemplateHub } from "@/components/template-selection/UnifiedTemplateHub";
import { FullWidthLayout } from "@/components/common/FullWidthLayout";
import { useSearchParams } from "react-router-dom";

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('resumeId');
  const isPreview = searchParams.get('preview') === 'true';
  
  const {
    currentStep,
    selectedTemplate,
    uploadedFile,
    showPreviewModal,
    previewTemplateId,
    handleFileChange,
    handleStartFromScratch,
    handleContinueFromAnalysis,
    handleReupload,
    handleTemplateSelect,
    handlePreviewOpen,
    handlePreviewClose,
    handleBackToTemplates,
    handleBackToStep
  } = useResumeBuilder();

  // Build step - render the full resume creation flow
  if (currentStep === 'build') {
    return (
      <FullWidthLayout innerPadding={false}>
        <ResumeSteps 
          selectedTemplate={selectedTemplate} 
          onBack={() => handleBackToStep('templates')}
          resumeId={resumeId}
          isPreview={isPreview}
        />
      </FullWidthLayout>
    );
  }

  // Analysis step - show CV analysis for uploaded files
  if (currentStep === 'analysis' && uploadedFile) {
    return (
      <FullWidthLayout>
        <AnalysisStep
          uploadedFile={uploadedFile}
          onContinue={handleContinueFromAnalysis}
          onReupload={handleReupload}
        />
      </FullWidthLayout>
    );
  }

  // Template selection step (default) - use unified hub
  return (
    <div className="min-h-screen bg-gradient-hero">
      <UnifiedTemplateHub
        mode="resume-builder"
        onTemplateSelect={handleTemplateSelect}
        uploadedFile={uploadedFile}
        onFileChange={handleFileChange}
        onStartFromScratch={handleStartFromScratch}
      />
    </div>
  );
};

export default ResumeBuilder;
