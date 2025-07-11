import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { templateConfigs, getAllCategories, getStylePresetById } from "@/config/templateConfig";
import { UnifiedLayout } from "@/components/resume-layouts/UnifiedLayout";
import { marketingManagerSample } from "@/data/sampleResumeData";
import FileUpload from "@/components/FileUpload";
import ResumeBuilderHeader from "./ResumeBuilderHeader";
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
  const categories = getAllCategories();

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
    const template = templateConfigs.find(t => t.id === previewTemplate);
    return (
      <div className="min-h-screen bg-gradient-hero">
        <ResumeBuilderHeader 
          onBack={handleClosePreview}
          backLabel="Back to Templates"
          showHomeLink={false}
        />
        
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 glass-card">
              👁️ Template Preview
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {template?.name} <span className="gradient-text">Preview</span>
            </h1>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleClosePreview}
              >
                Back to Templates
              </Button>
              <Button 
                variant="hero" 
                onClick={() => handleTemplateSelect(previewTemplate)}
              >
                Use This Template
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <UnifiedLayout 
                data={marketingManagerSample} 
                stylePreset={getStylePresetById(template?.stylePreset || 'modern-professional')!}
                formatDate={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <ResumeBuilderHeader showHomeLink />

      <div className="max-w-7xl mx-auto px-4 py-12">
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
                {category.templates.map((template) => {
                  const isSelected = selectedTemplate === template.id;
                  
                  return (
                    <Card 
                      key={template.id} 
                      className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? 'border-primary shadow-2xl shadow-primary/20 bg-primary/5' 
                          : 'border-border/20 hover:border-primary/40 hover:shadow-lg glass-card'
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground rounded-full p-1.5">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      
                      <div className="aspect-[3/4] relative overflow-hidden bg-white">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="p-6 scale-[0.35] origin-top-left transform">
                          <UnifiedLayout 
                            data={marketingManagerSample} 
                            stylePreset={getStylePresetById(template.stylePreset)!}
                            formatDate={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          />
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {template.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {template.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {template.tags.slice(0, 3).map((tag, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="text-xs px-2 py-1 rounded-full font-medium"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 hover:bg-muted/50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreview(template.id);
                            }}
                          >
                            Preview
                          </Button>
                          <Button 
                            variant={isSelected ? "default" : "ghost"} 
                            size="sm"
                            className={`flex-1 ${isSelected ? 'bg-primary hover:bg-primary/90' : 'hover:bg-primary hover:text-primary-foreground'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTemplateSelect(template.id);
                            }}
                          >
                            {isSelected ? "Selected" : "Use Template"}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
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
                You've selected a professional template. Let's start building your resume!
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => handleTemplateSelect(selectedTemplate)}
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

export default UnifiedTemplateStep;