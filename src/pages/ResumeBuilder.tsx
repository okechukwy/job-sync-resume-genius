import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, FileText, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ResumeSteps from "@/components/ResumeSteps";
import CVAnalysis from "@/components/CVAnalysis";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState<'industry' | 'templates' | 'analysis' | 'build'>('industry');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  // Check if a template was pre-selected from the templates page
  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam) {
      setSelectedTemplate(templateParam);
      setCurrentStep('templates');
    }
  }, [searchParams]);

  const handleIndustrySelect = (industry: string) => {
    if (uploadedFile) {
      // If there's an uploaded file, use the optimization flow
      handleContinueWithUpload(industry);
    } else {
      // If no uploaded file, use the standard flow
      setSelectedIndustry(industry);
      setCurrentStep('build');
      toast.success(`${industry} industry selected! Let's build your resume.`);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOC, or DOCX file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);
    setCurrentStep('analysis');
    toast.success('Resume uploaded successfully! Analyzing your resume...');
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Resume removed');
  };

  const handleStartFromScratch = () => {
    setCurrentStep('build');
    toast.success("Let's create your amazing resume from scratch!");
  };

  const handleContinueWithUpload = (industry: string) => {
    if (uploadedFile) {
      setSelectedIndustry(industry);
      setCurrentStep('build');
      toast.success(`${industry} industry selected! We'll help you optimize your uploaded resume.`);
    }
  };

  const handleContinueFromAnalysis = () => {
    setCurrentStep('industry');
    toast.success('Choose your industry to continue with optimization');
  };

  const handleReupload = () => {
    setUploadedFile(null);
    setCurrentStep('industry');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Ready to upload a new resume');
  };

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

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName);
    setCurrentStep('build');
    toast.success(`${templateName} template selected! Let's build your resume.`);
  };

  const handleBackToIndustries = () => {
    setCurrentStep('industry');
    setSelectedTemplate('');
  };

  if (currentStep === 'build') {
    return <ResumeSteps selectedIndustry={selectedIndustry} onBack={() => setCurrentStep('industry')} />;
  }

  if (currentStep === 'analysis' && uploadedFile) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <div className="glass-card border-b border-border/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleReupload}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Upload
              </Button>
              <div className="text-2xl font-bold gradient-text">ResumeAI</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <CVAnalysis 
            uploadedFile={uploadedFile}
            onContinue={handleContinueFromAnalysis}
            onReupload={handleReupload}
          />
        </div>
      </div>
    );
  }

  if (currentStep === 'templates') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <div className="glass-card border-b border-border/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBackToIndustries}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Industries
              </Button>
              <div className="text-2xl font-bold gradient-text">ResumeAI</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 glass-card">
              📋 Template Selection
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your Perfect{" "}
              <span className="gradient-text">Template</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {selectedTemplate && selectedTemplate !== '' 
                ? `Confirm your selection of "${selectedTemplate.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}" or choose a different template.`
                : "Select from our collection of professional resume templates designed by experts and optimized for ATS systems."
              }
            </p>
          </div>

          {/* Templates Grid */}
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
                  onClick={() => handleTemplateSelect(template.name)}
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
                          handleTemplateSelect(template.name);
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

          {/* Continue Section */}
          {selectedTemplate && (
            <div className="text-center">
              <div className="glass-card p-8 rounded-lg border border-border/20 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Ready to Build Your Resume?</h3>
                <p className="text-muted-foreground mb-6">
                  You've selected the "{selectedTemplate.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}" template.
                  Let's start building your professional resume!
                </p>
                <Button variant="hero" size="lg" onClick={() => handleTemplateSelect(selectedTemplate.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))}>
                  Continue Building Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

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
            <Card 
              key={index} 
              className="glass-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
              onClick={() => handleIndustrySelect(industry.title)}
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

        {/* Alternative Options */}
        <div className="text-center">
          <div className="glass-card p-8 rounded-lg border border-border/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Already have a resume?</h3>
            <p className="text-muted-foreground mb-6">
              Upload your existing resume and we'll help you optimize it for ATS systems
            </p>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {/* Show uploaded file info if file is selected */}
            {uploadedFile ? (
              <div className="mb-6">
                <div className="glass-card p-4 rounded-lg border border-success/20 bg-success/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-success" />
                      <div className="text-left">
                        <p className="font-medium text-success">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Great! Now select your industry to continue with resume optimization.
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button variant="hero" size="lg" onClick={handleUploadClick}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </Button>
                <Button variant="glass" size="lg" onClick={handleStartFromScratch}>
                  Start from Scratch
                </Button>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, DOC, DOCX (max 5MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;