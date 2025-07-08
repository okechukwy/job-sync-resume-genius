import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ResumeSteps from "@/components/ResumeSteps";
import CVAnalysis from "@/components/cv-analysis/CVAnalysis";
import IndustrySelection from "@/components/IndustrySelection";
import TemplateSelection from "@/components/TemplateSelection";
import FileUpload from "@/components/FileUpload";
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
      // If no uploaded file, use the standard flow - go to template selection first
      setSelectedIndustry(industry);
      setCurrentStep('templates');
      toast.success(`${industry} industry selected! Choose your template.`);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setUploadedFile(file);
      setCurrentStep('analysis');
      toast.success('Resume uploaded successfully! Analyzing your resume...');
    } else {
      setUploadedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
    return <ResumeSteps selectedIndustry={selectedIndustry} selectedTemplate={selectedTemplate} onBack={() => setCurrentStep('industry')} />;
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
          <TemplateSelection 
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            selectedIndustry={selectedIndustry}
          />

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
        <IndustrySelection onIndustrySelect={handleIndustrySelect} />

        {/* File Upload Section - Always visible in industry step */}
        <div className="mt-12">
          <FileUpload 
            uploadedFile={uploadedFile}
            onFileChange={handleFileChange}
            onStartFromScratch={handleStartFromScratch}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;