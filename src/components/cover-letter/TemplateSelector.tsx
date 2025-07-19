
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Eye, Star } from "lucide-react";
import { coverLetterTemplates, getTemplatesByCategory, CoverLetterTemplate } from "@/config/coverLetterTemplates";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onPreview?: (templateId: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, onPreview }: TemplateSelectorProps) => {
  const categories = ['professional', 'modern', 'creative', 'executive'];

  const renderTemplateCard = (template: CoverLetterTemplate) => {
    const isSelected = selectedTemplate === template.id;
    
    return (
      <Card 
        key={template.id}
        className={`glass-card hover:shadow-glow transition-all duration-300 cursor-pointer ${
          isSelected ? 'ring-2 ring-primary shadow-glow' : ''
        }`}
        onClick={() => onTemplateSelect(template.id)}
      >
        <CardHeader className="text-center pb-4">
          <div className="text-4xl mb-2">{template.preview}</div>
          <CardTitle className="text-lg flex items-center justify-center gap-2">
            {template.name}
            {isSelected && <CheckCircle className="w-4 h-4 text-primary" />}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{template.description}</p>
          
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              <Star className="w-3 h-3 mr-1" />
              ATS {template.atsScore}%
            </Badge>
            <Badge variant="secondary" className="text-xs capitalize">
              {template.bodyFormat.replace('-', ' ')}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Features:</h4>
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 3).map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Perfect for:</h4>
              <p className="text-xs text-muted-foreground">
                {template.perfectFor.slice(0, 3).join(', ')}
              </p>
            </div>
            
            <div className="flex gap-2 pt-2">
              {onPreview && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(template.id);
                  }}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
              )}
              <Button 
                variant={isSelected ? "default" : "ghost"} 
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateSelect(template.id);
                }}
              >
                {isSelected ? "Selected" : "Use Template"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Choose Your Template</h3>
        <p className="text-muted-foreground">
          Select a template that matches your industry and personal style
        </p>
      </div>

      <Tabs defaultValue="professional" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => {
          const templates = getTemplatesByCategory(category);
          return (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map(renderTemplateCard)}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      {selectedTemplate && (
        <div className="text-center p-4 glass-card rounded-lg border border-border/20">
          <p className="text-sm text-muted-foreground">
            ✓ Template selected: <span className="font-medium text-foreground">
              {coverLetterTemplates.find(t => t.id === selectedTemplate)?.name}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
