import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Templates = () => {
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
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-2xl font-bold gradient-text">ResumeAI</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 glass-card">
            📋 All Templates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Browse All{" "}
            <span className="gradient-text">Templates</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our complete collection of industry-specific resume templates. 
            Each template is professionally designed and optimized for ATS systems.
          </p>
        </div>

        {/* Templates Grid */}
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
                <div className="space-y-2">
                  <Link to={template.route}>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Template
                    </Button>
                  </Link>
                  <Link to={`/get-started?template=${encodeURIComponent(template.name.toLowerCase().replace(/\s+/g, '-'))}`}>
                    <Button variant="hero" className="w-full">
                      Use This Template
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 glass-card rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">
            Can't Find the Perfect Template?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our AI-powered resume builder can create a custom template tailored specifically 
            to your industry and experience level.
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

export default Templates;