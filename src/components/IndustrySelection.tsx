import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getIndustryTemplateCount } from "@/data/templateData";

interface IndustrySelectionProps {
  onIndustrySelect: (industry: string) => void;
}

const IndustrySelection = ({ onIndustrySelect }: IndustrySelectionProps) => {
  const industries = [
    {
      icon: "💻",
      title: "Technology",
      description: "Software engineers, data scientists, product managers"
    },
    {
      icon: "🏥",
      title: "Healthcare",
      description: "Doctors, nurses, medical professionals"
    },
    {
      icon: "💰",
      title: "Finance",
      description: "Analysts, consultants, investment professionals"
    },
    {
      icon: "🎨",
      title: "Creative",
      description: "Designers, writers, marketing professionals"
    },
    {
      icon: "📊",
      title: "Business",
      description: "Management, sales, operations professionals"
    },
    {
      icon: "🔬",
      title: "Research",
      description: "Scientists, academics, research professionals"
    }
  ];

  return (
    <div className="spacing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {industries.map((industry, index) => (
        <Card 
          key={index} 
          className="glass-card hover-lift hover-glow transition-all duration-300 cursor-pointer group animate-fade-in border-border/50"
          onClick={() => onIndustrySelect(industry.title)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="text-center spacing-content">
            <div className="text-5xl mb-6 group-hover:scale-110 group-hover:rotate-3 smooth-transition text-shadow">
              {industry.icon}
            </div>
            <CardTitle className="typography-heading text-xl font-semibold mb-3 text-contrast-high group-hover:gradient-text smooth-transition">
              {industry.title}
            </CardTitle>
            <p className="typography-body text-sm text-contrast-medium mb-4 leading-relaxed">
              {industry.description}
            </p>
            <Badge variant="outline" className="typography-caption text-xs glass-card border-primary/30 hover-scale">
              {getIndustryTemplateCount(industry.title)} Templates Available
            </Badge>
          </CardHeader>
          <CardContent className="pt-2">
            <Button 
              variant="outline" 
              className="w-full hover-lift smooth-transition border-primary/30 hover:border-primary hover:bg-primary/5 focus-ring"
            >
              <span className="typography-body font-medium">Select {industry.title}</span>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IndustrySelection;