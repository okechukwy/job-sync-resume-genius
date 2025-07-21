
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { allTemplates } from "@/data/templateData";
import { Eye, FileText } from "lucide-react";
import { toast } from "sonner";

const TemplatesSection = () => {
  const navigate = useNavigate();

  // Show a curated selection of featured templates from different industries
  const featuredTemplateNames = [
    "Tech Professional",
    "Healthcare Specialist", 
    "Finance Expert",
    "Creative Professional",
    "Research Scientist",
    "Gradient Modern",
    "Minimalist Pro",
    "Recent Graduate"
  ];
  
  const featuredTemplates = featuredTemplateNames.map(name => 
    allTemplates.find(template => template.name === name)
  ).filter(Boolean);

  const handleUseTemplate = (templateName: string) => {
    try {
      console.log('🚀 Template button clicked from landing page!', templateName);
      
      // Create template parameter for URL - convert name to slug format
      const templateParam = templateName.toLowerCase().replace(/\s+/g, '-');
      const url = `/get-started?template=${encodeURIComponent(templateParam)}`;
      
      console.log('🔗 Navigating to:', url);
      console.log('📝 Template parameter:', templateParam);
      
      toast.success(`Starting ${templateName} template...`);
      
      // Navigate using useNavigate hook
      navigate(url);
      
      console.log('✅ Navigation completed');
    } catch (error) {
      console.error('❌ Navigation failed:', error);
      toast.error('Failed to start template. Please try again.');
    }
  };

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
          {featuredTemplates.map((template, index) => (
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
                <div className="flex flex-wrap gap-2 mb-6">
                  {template.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3">
                  <Link to={template.route} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </Link>
                  <Button 
                    variant="default" 
                    className="flex-1" 
                    size="sm"
                    onClick={() => handleUseTemplate(template.name)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </div>
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
