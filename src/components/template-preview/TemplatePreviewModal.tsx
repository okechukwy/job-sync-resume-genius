
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UnifiedLayout } from "@/components/resume-layouts/UnifiedLayout";
import { marketingManagerSample } from "@/data/sampleResumeData";
import { getStylePresetById, templateConfigs } from "@/config/templateConfig";
import { X } from "lucide-react";

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

  const handleSelectTemplate = () => {
    onSelectTemplate(templateId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-4 bg-gradient-hero rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="glass-card">
              👁️ Template Preview
            </Badge>
            <div>
              <h2 className="text-2xl font-bold">
                {template.name} <span className="gradient-text">Preview</span>
              </h2>
              <p className="text-muted-foreground">{template.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="hero" 
              onClick={handleSelectTemplate}
            >
              Use This Template
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <div className="scale-75 origin-top">
                <UnifiedLayout 
                  data={marketingManagerSample} 
                  stylePreset={getStylePresetById(template.stylePreset || 'modern-professional')!}
                  formatDate={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
