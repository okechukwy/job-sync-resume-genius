import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UnifiedLayout } from "@/components/resume-layouts/UnifiedLayout";
import { marketingManagerSample } from "@/data/sampleResumeData";
import { getStylePresetById, templateConfigs } from "@/config/templateConfig";
import ResumeBuilderHeader from "../resume-builder/ResumeBuilderHeader";

interface TemplatePreviewModalProps {
  templateId: string;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

const TemplatePreviewModal = ({ templateId, onClose, onSelectTemplate }: TemplatePreviewModalProps) => {
  const template = templateConfigs.find(t => t.id === templateId);

  if (!template) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <ResumeBuilderHeader 
        onBack={onClose}
        backLabel="Back to Templates"
        showHomeLink={false}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 glass-card">
            👁️ Template Preview
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {template.name} <span className="gradient-text">Preview</span>
          </h1>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Back to Templates
            </Button>
            <Button 
              variant="hero" 
              onClick={() => onSelectTemplate(templateId)}
            >
              Use This Template
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <UnifiedLayout 
              data={marketingManagerSample} 
              stylePreset={getStylePresetById(template.stylePreset || 'modern-professional')!}
              formatDate={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;