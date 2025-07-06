import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface IndustrySelectionProps {
  onIndustrySelect: (industry: string) => void;
}

const IndustrySelection = ({ onIndustrySelect }: IndustrySelectionProps) => {
  const industries = [
    {
      icon: "💻",
      title: "Technology",
      description: "Software engineers, data scientists, product managers",
      templates: 12
    },
    {
      icon: "🏥",
      title: "Healthcare",
      description: "Doctors, nurses, medical professionals",
      templates: 8
    },
    {
      icon: "💰",
      title: "Finance",
      description: "Analysts, consultants, investment professionals",
      templates: 10
    },
    {
      icon: "🎨",
      title: "Creative",
      description: "Designers, writers, marketing professionals",
      templates: 15
    },
    {
      icon: "📊",
      title: "Business",
      description: "Management, sales, operations professionals",
      templates: 11
    },
    {
      icon: "🔬",
      title: "Research",
      description: "Scientists, academics, research professionals",
      templates: 7
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {industries.map((industry, index) => (
        <Card 
          key={index} 
          className="glass-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
          onClick={() => onIndustrySelect(industry.title)}
        >
          <CardHeader className="text-center">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {industry.icon}
            </div>
            <CardTitle className="text-xl mb-2">{industry.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">
              {industry.description}
            </p>
            <Badge variant="outline" className="text-xs">
              {industry.templates} Templates Available
            </Badge>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Select {industry.title}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IndustrySelection;