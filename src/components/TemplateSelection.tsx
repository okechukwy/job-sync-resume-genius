import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TemplateSelectionProps {
  selectedTemplate: string;
  onTemplateSelect: (templateName: string) => void;
}

const TemplateSelection = ({ selectedTemplate, onTemplateSelect }: TemplateSelectionProps) => {
  const templates = [
    {
      name: "Tech Professional",
      description: "Optimized for software engineers, developers, and IT professionals",
      image: "💻",
      tags: ["ATS-Optimized", "Modern", "Clean"],
      route: "/templates/tech-professional"
    },
    {
      name: "Gradient Modern",
      description: "Stunning gradient backgrounds with modern typography",
      image: "🌈",
      tags: ["Gradient Design", "Modern", "Eye-Catching"],
      route: "/templates/gradient-modern"
    },
    {
      name: "Minimalist Pro",
      description: "Clean, sophisticated design that lets your content shine",
      image: "✨",
      tags: ["Clean", "Minimalist", "Professional"],
      route: "/templates/minimalist-pro"
    },
    {
      name: "Colorful Fresh",
      description: "Vibrant and energetic design for dynamic professionals",
      image: "🎯",
      tags: ["Vibrant", "Energetic", "Bold"],
      route: "/templates/colorful-fresh"
    },
    {
      name: "Elegant Professional",
      description: "Sophisticated design with refined typography for executives",
      image: "👑",
      tags: ["Sophisticated", "Elegant", "Executive"],
      route: "/templates/elegant-professional"
    },
    {
      name: "Healthcare Specialist",
      description: "Perfect for doctors, nurses, and healthcare professionals",
      image: "🏥",
      tags: ["Professional", "Detailed", "Credible"],
      route: "/templates/healthcare-specialist"
    },
    {
      name: "Finance Expert",
      description: "Designed for banking, accounting, and finance professionals",
      image: "💼",
      tags: ["Corporate", "Analytical", "Precise"],
      route: "/templates/finance-expert"
    },
    {
      name: "Creative Professional",
      description: "Ideal for designers, marketers, and creative roles",
      image: "🎨",
      tags: ["Creative", "Visual", "Unique"],
      route: "/templates/creative-professional"
    },
    {
      name: "Executive Leader",
      description: "For senior management and C-level executives",
      image: "📊",
      tags: ["Executive", "Leadership", "Premium"],
      route: "/templates/executive-leader"
    },
    {
      name: "Recent Graduate",
      description: "Perfect for new graduates and entry-level positions",
      image: "🎓",
      tags: ["Fresh", "Modern", "Entry-Level"],
      route: "/templates/recent-graduate"
    }
  ];

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