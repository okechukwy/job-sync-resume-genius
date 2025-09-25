// Unified Template Hub - Consolidates all template selection functionality
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, ArrowRight, Upload, FileText } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { templateConfigs, getAllCategories, getStylePresetById } from "@/config/templateConfig";
import { UnifiedLayout } from "@/components/resume-layouts/UnifiedLayout";
import { marketingManagerSample } from "@/data/sampleResumeData";
import FileUpload from "@/components/FileUpload";

interface UnifiedTemplateHubProps {
  mode?: 'standalone' | 'resume-builder';
  onTemplateSelect?: (templateId: string) => void;
  onFileChange?: (file: File | null) => void;
  onStartFromScratch?: () => void;
  uploadedFile?: File | null;
}

export const UnifiedTemplateHub = ({ 
  mode = 'standalone',
  onTemplateSelect,
  onFileChange,
  onStartFromScratch,
  uploadedFile
}: UnifiedTemplateHubProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(templateConfigs[0]);
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categories = getAllCategories();

  // Context-aware navigation
  const isResumeBuilderMode = mode === 'resume-builder';
  const hasFileUpload = isResumeBuilderMode && onFileChange;

  const handleUseTemplate = (templateId: string) => {
    if (isResumeBuilderMode && onTemplateSelect) {
      onTemplateSelect(templateId);
    } else {
      navigate(`/dashboard/resume/builder?template=${templateId}`);
    }
  };

  const stylePreset = getStylePresetById(selectedTemplate.stylePreset);

  const renderTemplatePreview = () => {
    if (!stylePreset) return null;
    
    return (
      <div className="bg-gray-100 p-6 rounded-lg max-h-[800px] overflow-y-auto">
        <div className="scale-[0.85] origin-top">
          <div className="w-full max-w-5xl mx-auto">
            <UnifiedLayout 
              data={marketingManagerSample}
              stylePreset={stylePreset}
              formatDate={(date) => new Date(date).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderTemplateCard = (template: typeof templateConfigs[0]) => {
    const isColoredTemplate = template.stylePreset.includes('blue') || 
                             template.stylePreset.includes('teal') || 
                             template.stylePreset.includes('green');
    
    const templateStylePreset = getStylePresetById(template.stylePreset);
    
    return (
      <Card 
        key={template.id}
        className={`glass-card hover:shadow-glow transition-all duration-300 cursor-pointer group ${
          selectedTemplate.id === template.id ? 'ring-2 ring-primary' : ''
        }`}
        onClick={() => setSelectedTemplate(template)}
      >
        <CardHeader className="text-center pb-5 px-5">
          <div className="text-5xl mb-3">{template.emoji}</div>
          <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
          <p className="text-base text-muted-foreground mb-3">{template.description}</p>
          {isColoredTemplate && (
            <Badge variant="secondary" className="mt-2 text-sm">
              🎨 Colored Design
            </Badge>
          )}
          {!isColoredTemplate && (
            <Badge variant="outline" className="mt-2 text-sm">
              ⚡ ATS Optimized
            </Badge>
          )}
        </CardHeader>
        
                         {/* Template Preview Section */}
        <div className="px-4 pb-4">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Template Preview</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 relative">
              {templateStylePreset ? (
                <div className="relative overflow-hidden flex justify-center">
                  <div className="scale-[0.65] origin-top transform">
                    <div className="w-[400px] h-[700px] overflow-y-auto border border-gray-200 rounded bg-white shadow-sm relative">
                      <div className="p-4">
                        <UnifiedLayout 
                          data={marketingManagerSample}
                          stylePreset={templateStylePreset}
                          formatDate={(date) => new Date(date).toLocaleDateString()}
                          previewMode={true}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-blue-600">
                      Click to select
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center text-gray-500">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                    <span className="text-sm">Loading preview...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex flex-wrap gap-2 mb-5">
            {template.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              size="default" 
              className="w-full h-10"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewMode(true);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Full Preview
            </Button>
            <Button 
              variant={selectedTemplate.id === template.id ? "default" : "ghost"} 
              size="default"
              className={`w-full h-10 ${selectedTemplate.id === template.id ? 'bg-primary hover:bg-primary/90' : 'hover:bg-primary hover:text-primary-foreground'}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTemplate(template);
              }}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              {selectedTemplate.id === template.id ? "Selected" : "Use Template"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Preview Mode
  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setPreviewMode(false)}
              >
                ← Back to Templates
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {selectedTemplate.emoji} {selectedTemplate.name}
                </h1>
                <p className="text-muted-foreground">{selectedTemplate.description}</p>
              </div>
            </div>
            <Button 
              variant="hero"
              onClick={() => handleUseTemplate(selectedTemplate.id)}
            >
              {isResumeBuilderMode ? 'Select This Template' : 'Use This Template'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Template Preview */}
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTemplatePreview()}
                </CardContent>
              </Card>
            </div>

            {/* Template Details */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Template Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedTemplate.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Perfect For</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedTemplate.perfectFor.map((role, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-sm">{role}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Style Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {stylePreset && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: `hsl(${stylePreset.primary})` }}
                        ></div>
                        <span className="text-sm">Primary Color</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {stylePreset.layout.charAt(0).toUpperCase() + stylePreset.layout.slice(1)} Layout
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {stylePreset.spacing.charAt(0).toUpperCase() + stylePreset.spacing.slice(1)} Spacing
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
             <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 glass-card">
            ⚡ ATS-Optimized Templates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Perfect{" "}
            <span className="gradient-text">Resume Template</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select from our comprehensive collection of ATS-optimized templates designed for maximum compatibility with Applicant Tracking Systems. 
            Organized by category to help you find the perfect template for your career stage and industry.
          </p>
        </div>

        {/* File Upload Section (only in resume builder mode) */}
        {hasFileUpload && (
          <div className="mb-12">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Start Your Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload 
                  uploadedFile={uploadedFile}
                  onFileChange={onFileChange}
                  onStartFromScratch={onStartFromScratch}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Template Categories */}
        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8 glass-card">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
                             <div className="text-center mb-8">
                 <h2 className="text-2xl font-bold mb-2">{category.name} Templates</h2>
                 <p className="text-muted-foreground">
                   {category.templates.length} templates designed for {category.name.toLowerCase()} professionals
                 </p>
                  
               </div>
              
              {/* ATS Optimization Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">ATS Optimization Features</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Clean, readable typography optimized for ATS parsing</li>
                      <li>• Standard section headers that ATS systems recognize</li>
                      <li>• Proper formatting for easy text extraction</li>
                      <li>• {category.templates.filter(t => !t.stylePreset.includes('blue') && !t.stylePreset.includes('teal') && !t.stylePreset.includes('green')).length} black & white templates for maximum compatibility</li>
                      <li>• {category.templates.filter(t => t.stylePreset.includes('blue') || t.stylePreset.includes('teal') || t.stylePreset.includes('green')).length} colored templates for industries that accept them</li>
                    </ul>
                  </div>
                </div>
              </div>
              
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.templates.map(renderTemplateCard)}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action (only in standalone mode) */}
        {!isResumeBuilderMode && (
          <div className="text-center mt-16 p-8 glass-card rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Build Your Resume?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Select a template above to start building your professional resume with our AI-powered builder.
            </p>
            <Link to="/dashboard/resume/builder">
              <Button variant="hero" size="lg">
                <FileText className="w-4 h-4 mr-2" />
                Start Resume Builder
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
