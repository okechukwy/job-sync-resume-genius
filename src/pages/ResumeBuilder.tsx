
import ResumeSteps from "@/components/ResumeSteps";
import { useResumeBuilder } from "@/hooks/useResumeBuilder";
import { AnalysisStep } from "@/components/resume-builder";
import UnifiedTemplateStep from "@/components/resume-builder/UnifiedTemplateStep";
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

  // Template selection step (default)
  return (
    <FullWidthLayout>
      <UnifiedTemplateStep
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        uploadedFile={uploadedFile}
        onFileChange={handleFileChange}
        onStartFromScratch={handleStartFromScratch}
        showPreviewModal={showPreviewModal}
        previewTemplateId={previewTemplateId}
        onPreviewOpen={handlePreviewOpen}
        onPreviewClose={handlePreviewClose}
      />
    </FullWidthLayout>
  );
};

export default ResumeBuilder;
