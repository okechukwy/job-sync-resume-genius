// Unified Template Selector - Replaces individual template pages
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { templateConfigs, getAllCategories, getStylePresetById } from "@/config/templateConfig";
import { UnifiedLayout } from "@/components/resume-layouts/UnifiedLayout";
import { marketingManagerSample } from "@/data/sampleResumeData";

export const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templateConfigs[0]);
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate();
  const categories = getAllCategories();

  const handleUseTemplate = (templateId: string) => {
    navigate(`/get-started?template=${templateId}`);
  };

  const stylePreset = getStylePresetById(selectedTemplate.stylePreset);

  const renderTemplatePreview = () => {
    if (!stylePreset) return null;
    
    return (
      <div className="bg-gray-100 p-6 rounded-lg max-h-[600px] overflow-y-auto">
        <div className="scale-75 origin-top">
          <UnifiedLayout 
            data={marketingManagerSample}
            stylePreset={stylePreset}
            formatDate={(date) => new Date(date).toLocaleDateString()}
          />
        </div>
      </div>
    );
  };

  const renderTemplateCard = (template: typeof templateConfigs[0]) => (
    <Card 
      key={template.id}
      className={`glass-card hover:shadow-glow transition-all duration-300 cursor-pointer ${
        selectedTemplate.id === template.id ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => setSelectedTemplate(template)}
    >
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-2">{template.emoji}</div>
        <CardTitle className="text-lg">{template.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTemplate(template);
              setPreviewMode(true);
            }}
          >
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </Button>
          <Button 
            variant="hero" 
            size="sm" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleUseTemplate(template.id);
            }}
          >
            Use Template
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
              Use This Template
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
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 glass-card">
            📋 Choose Your Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional{" "}
            <span className="gradient-text">Resume Templates</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose from our curated collection of templates organized by category. 
            Each template is professionally designed and ATS-optimized.
          </p>
        </div>

        {/* Template Categories */}
        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 glass-card">
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{category.name} Templates</h2>
                <p className="text-muted-foreground">
                  {category.id === 'professional' && 'Clean, formal designs perfect for traditional industries'}
                  {category.id === 'creative' && 'Bold, visual designs that showcase your creativity'}
                  {category.id === 'technical' && 'Modern layouts optimized for tech and engineering roles'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map(renderTemplateCard)}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 glass-card rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">
            Need Something Custom?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our AI can create a personalized template based on your specific industry and preferences.
          </p>
          <Link to="/get-started">
            <Button variant="hero" size="lg">
              Create Custom Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};