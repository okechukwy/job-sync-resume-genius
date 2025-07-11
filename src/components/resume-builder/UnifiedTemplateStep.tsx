import ResumeBuilderHeader from "./ResumeBuilderHeader";
import TemplatePreviewModal from "@/components/template-preview/TemplatePreviewModal";
import TemplateSelection from "@/components/template-preview/TemplateSelection";
import { useState } from "react";

interface UnifiedTemplateStepProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
  onStartFromScratch: () => void;
}

const UnifiedTemplateStep = ({ 
  selectedTemplate, 
  onTemplateSelect,
  uploadedFile,
  onFileChange,
  onStartFromScratch
}: UnifiedTemplateStepProps) => {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    onTemplateSelect(templateId);
  };

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId);
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  if (previewTemplate) {
    return (
      <TemplatePreviewModal
        templateId={previewTemplate}
        onClose={handleClosePreview}
        onSelectTemplate={handleTemplateSelect}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <ResumeBuilderHeader showHomeLink />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <TemplateSelection
          selectedTemplate={selectedTemplate}
          uploadedFile={uploadedFile}
          onTemplateSelect={handleTemplateSelect}
          onPreview={handlePreview}
          onFileChange={onFileChange}
          onStartFromScratch={onStartFromScratch}
        />
      </div>
    </div>
  );
};

export default UnifiedTemplateStep;