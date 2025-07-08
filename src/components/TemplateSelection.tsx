import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getTemplatesByIndustry, allTemplates } from "@/data/templateData";

interface TemplateSelectionProps {
  selectedTemplate: string;
  onTemplateSelect: (templateName: string) => void;
  selectedIndustry?: string;
}

const TemplateSelection = ({ selectedTemplate, onTemplateSelect, selectedIndustry }: TemplateSelectionProps) => {
  const templates = selectedIndustry 
    ? getTemplatesByIndustry(selectedIndustry)
    : allTemplates;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {templates.map((template, index) => {
        const templateSlug = template.name.toLowerCase().replace(/\s+/g, '-');
        const isSelected = selectedTemplate === templateSlug;
        
        return (
          <Card 
            key={index} 
            className={`glass-card hover:shadow-glow transition-all duration-300 cursor-pointer group ${
              isSelected ? 'ring-2 ring-primary shadow-glow' : ''
            }`}
            onClick={() => onTemplateSelect(template.name)}
          >
            <CardHeader className="text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {template.image}
              </div>
              <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {template.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to={template.route}>
                  <Button variant="outline" className="w-full">
                    Preview Template
                  </Button>
                </Link>
                <Button 
                  variant={isSelected ? "hero" : "ghost"} 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTemplateSelect(template.name);
                  }}
                >
                  {isSelected ? "✓ Selected" : "Use This Template"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TemplateSelection;