import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UnifiedLayout } from "@/components/resume-layouts/UnifiedLayout";
import { marketingManagerSample } from "@/data/sampleResumeData";
import { getStylePresetById } from "@/config/templateConfig";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    stylePreset: string;
  };
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onPreview: (templateId: string) => void;
}

const TemplateCard = ({ template, isSelected, onSelect, onPreview }: TemplateCardProps) => {
  const stylePreset = getStylePresetById(template.stylePreset);
  
  // Adjust scaling based on layout type
  const getScaleConfig = () => {
    if (stylePreset?.layout === 'creative') {
      return {
        scale: 'scale-[0.45]',
        dimensions: 'w-[222%] h-[222%]',
        padding: 'p-1'
      };
    } else if (stylePreset?.layout === 'technical') {
      return {
        scale: 'scale-[0.40]',
        dimensions: 'w-[250%] h-[250%]',
        padding: 'p-1'
      };
    }
    // Default for professional
    return {
      scale: 'scale-[0.42]',
      dimensions: 'w-[238%] h-[238%]',
      padding: 'p-1'
    };
  };

  const scaleConfig = getScaleConfig();

  return (
    <Card 
      className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'border-primary shadow-2xl shadow-primary/20 bg-primary/5' 
          : 'border-border/20 hover:border-primary/40 hover:shadow-lg glass-card'
      }`}
      onClick={() => onSelect(template.id)}
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
        <div className={`absolute inset-0 ${scaleConfig.padding}`}>
          <div className={`${scaleConfig.scale} origin-top-left transform ${scaleConfig.dimensions}`}>
            <UnifiedLayout 
              data={marketingManagerSample} 
              stylePreset={getStylePresetById(template.stylePreset)!}
              formatDate={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            />
          </div>
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
              onPreview(template.id);
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
              onSelect(template.id);
            }}
          >
            {isSelected ? "Selected" : "Use Template"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TemplateCard;