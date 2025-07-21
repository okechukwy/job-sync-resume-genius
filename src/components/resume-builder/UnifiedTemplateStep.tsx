
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCategories, getTemplateById } from "@/config/templateConfig";
import FileUpload from "@/components/FileUpload";
import TemplateCard from "@/components/template-preview/TemplateCard";

interface UnifiedTemplateStepProps {
  selectedTemplate: string; // This is now always a template ID
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
  const categories = getAllCategories();

  // Get template name for display
  const selectedTemplateName = selectedTemplate ? 
    getTemplateById(selectedTemplate)?.name || selectedTemplate : 
    '';

  const handlePreview = (templateId: string) => {
    // For now, just select the template (preview functionality can be added later)
    onTemplateSelect(templateId);
  };

  return (
    <>
      {/* Page Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 glass-card">
          🎨 Template Selection
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Choose Your Perfect{" "}
          <span className="gradient-text">Template</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Select from our collection of professional resume templates designed by experts and optimized for ATS systems.
        </p>
      </div>

      {/* File Upload Section */}
      <div className="mb-12">
        <FileUpload 
          uploadedFile={uploadedFile}
          onFileChange={onFileChange}
          onStartFromScratch={onStartFromScratch}
        />
      </div>

      {/* Template Categories */}
      <Tabs defaultValue="professional" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="capitalize">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={onTemplateSelect}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Continue Section */}
      {selectedTemplate && (
        <div className="text-center mt-12">
          <div className="glass-card p-8 rounded-lg border border-border/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Ready to Build Your Resume?</h3>
            <p className="text-muted-foreground mb-6">
              You've selected the <strong>{selectedTemplateName}</strong> template. Let's start building your resume!
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => onTemplateSelect(selectedTemplate)}
            >
              Continue Building Resume
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default UnifiedTemplateStep;
