import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TemplatesSection = () => {
  const templates = [
    {
      name: "Tech Professional",
      description: "Optimized for software engineers, developers, and IT professionals",
      image: "💻",
      tags: ["ATS-Optimized", "Modern", "Clean"]
    },
    {
      name: "Gradient Modern",
      description: "Stunning gradient backgrounds with modern typography",
      image: "🌈",
      tags: ["Gradient Design", "Modern", "Eye-Catching"]
    },
    {
      name: "Minimalist Pro",
      description: "Clean, sophisticated design that lets your content shine",
      image: "✨",
      tags: ["Clean", "Minimalist", "Professional"]
    },
    {
      name: "Colorful Fresh",
      description: "Vibrant and energetic design for dynamic professionals",
      image: "🎯",
      tags: ["Vibrant", "Energetic", "Bold"]
    },
    {
      name: "Elegant Professional",
      description: "Sophisticated design with refined typography for executives",
      image: "👑",
      tags: ["Sophisticated", "Elegant", "Executive"]
    },
    {
      name: "Healthcare Specialist",
      description: "Perfect for doctors, nurses, and healthcare professionals",
      image: "🏥",
      tags: ["Professional", "Detailed", "Credible"]
    },
    {
      name: "Finance Expert",
      description: "Designed for banking, accounting, and finance professionals",
      image: "💼",
      tags: ["Corporate", "Analytical", "Precise"]
    },
    {
      name: "Creative Professional",
      description: "Ideal for designers, marketers, and creative roles",
      image: "🎨",
      tags: ["Creative", "Visual", "Unique"]
    },
    {
      name: "Executive Leader",
      description: "For senior management and C-level executives",
      image: "📊",
      tags: ["Executive", "Leadership", "Premium"]
    },
    {
      name: "Recent Graduate",
      description: "Perfect for new graduates and entry-level positions",
      image: "🎓",
      tags: ["Fresh", "Modern", "Entry-Level"]
    }
  ];

  return (
    <section id="templates" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 glass-card">
            📋 Professional Templates
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your Perfect{" "}
            <span className="gradient-text">Template</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Industry-specific resume templates designed by experts and optimized for ATS systems. 
            Each template is crafted to highlight your unique skills and experience.
          </p>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {template.image}
                </div>
                <CardTitle className="text-xl mb-2">{template.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link to={`/templates/${template.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button variant="outline" className="w-full">
                    Preview Template
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/templates">
            <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Browse All Templates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;