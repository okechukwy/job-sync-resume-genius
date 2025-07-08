import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TemplateSelection from "@/components/TemplateSelection";
import ResumeBuilderHeader from "./ResumeBuilderHeader";
import { formatTemplateName } from "@/utils/templateUtils";

interface TemplateStepProps {
  selectedTemplate: string;
  selectedIndustry: string;
  onTemplateSelect: (templateName: string) => void;
  onBack: () => void;
}

const TemplateStep = ({ 
  selectedTemplate, 
  selectedIndustry, 
  onTemplateSelect, 
  onBack 
}: TemplateStepProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <ResumeBuilderHeader 
        onBack={onBack}
        backLabel="Back to Industries"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 glass-card">
            📋 Template Selection
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your Perfect{" "}
            <span className="gradient-text">Template</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {selectedTemplate && selectedTemplate !== '' 
              ? `Confirm your selection of "${formatTemplateName(selectedTemplate)}" or choose a different template.`
              : "Select from our collection of professional resume templates designed by experts and optimized for ATS systems."
            }
          </p>
        </div>

        {/* Templates Grid */}
        <TemplateSelection 
          selectedTemplate={selectedTemplate}
          onTemplateSelect={onTemplateSelect}
          selectedIndustry={selectedIndustry}
        />

        {/* Continue Section */}
        {selectedTemplate && (
          <div className="text-center">
            <div className="glass-card p-8 rounded-lg border border-border/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Ready to Build Your Resume?</h3>
              <p className="text-muted-foreground mb-6">
                You've selected the "{formatTemplateName(selectedTemplate)}" template.
                Let's start building your professional resume!
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => onTemplateSelect(formatTemplateName(selectedTemplate))}
              >
                Continue Building Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateStep;