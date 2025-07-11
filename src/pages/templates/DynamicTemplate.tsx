// Dynamic Template Page - Replaces individual template pages
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { getTemplateById, getStylePresetById } from "@/config/templateConfig";
import { UnifiedLayout } from "@/components/resume-layouts/UnifiedLayout";
import { marketingManagerSample } from "@/data/sampleResumeData";

const DynamicTemplate = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  
  const template = templateId ? getTemplateById(templateId) : null;
  const stylePreset = template ? getStylePresetById(template.stylePreset) : null;

  if (!template || !stylePreset) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Template Not Found</h1>
          <p className="text-muted-foreground mb-6">The template you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/templates')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  const handleUseTemplate = () => {
    navigate(`/get-started?template=${template.id}`);
  };

  const renderTemplatePreview = () => (
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

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-16 left-12 w-32 h-32 border border-primary/20 rounded-full">
          <div className="absolute inset-4 border border-primary/15 rounded-full">
            <div className="absolute inset-4 bg-primary/10 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-28 right-16 w-28 h-28 border border-primary/15 rounded-full">
          <div className="absolute inset-3 border border-primary/12 rounded-full"></div>
        </div>
      </div>
      
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/templates')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Templates
            </Button>
            <div>
              <div className="text-6xl mb-2 animate-bounce-subtle">{template.emoji}</div>
              <Badge variant="secondary" className="mb-2 glass-card hover-lift animate-fade-in">
                {template.category.charAt(0).toUpperCase() + template.category.slice(1)} Template
              </Badge>
              <h1 className="visual-hierarchy-1 mb-2 animate-fade-in">
                {template.name}{" "}
                <span className="gradient-text">Resume</span>
              </h1>
              <p className="visual-hierarchy-body max-w-2xl animate-fade-in">
                {template.description}
              </p>
              
              <div className="flex flex-wrap spacing-grid mt-4 animate-fade-in">
                {template.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="hover-scale">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
          <Button 
            variant="hero"
            size="lg"
            onClick={handleUseTemplate}
          >
            Use This Template
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Template Preview and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Preview */}
          <div className="lg:col-span-2">
            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3 flex items-center gap-2">
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
            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {template.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">{feature}</h4>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {template.perfectFor.map((role, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      {role}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Style Details</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTemplate;