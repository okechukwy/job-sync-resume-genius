import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeBuilder = () => {
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
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 glass-card">
            🚀 Get Started
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="gradient-text">Industry</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select your industry to get started with tailored resume templates and 
            industry-specific optimization suggestions.
          </p>
        </div>

        {/* Industry Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {industries.map((industry, index) => (
            <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300 cursor-pointer group">
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

        {/* Alternative Options */}
        <div className="text-center">
          <div className="glass-card p-8 rounded-lg border border-border/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Already have a resume?</h3>
            <p className="text-muted-foreground mb-6">
              Upload your existing resume and we'll help you optimize it for ATS systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Upload Resume
              </Button>
              <Button variant="glass" size="lg">
                Start from Scratch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;