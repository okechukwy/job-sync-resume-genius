import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import ExperienceForm from "@/components/ExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsForm from "@/components/SkillsForm";
import ResumePreview from "@/components/ResumePreview";
import { toast } from "sonner";

interface ResumeStepsProps {
  selectedIndustry: string;
  onBack: () => void;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
}

const ResumeSteps = ({ selectedIndustry, onBack }: ResumeStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
    },
  });

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic contact information" },
    { number: 2, title: "Experience", description: "Work history and achievements" },
    { number: 3, title: "Education", description: "Academic background" },
    { number: 4, title: "Skills", description: "Technical and soft skills" },
    { number: 5, title: "Preview", description: "Review and download" },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      toast.success(`Step ${currentStep + 1} completed!`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={(data) => handleDataUpdate('personalInfo', data)}
          />
        );
      case 2:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onUpdate={(data) => handleDataUpdate('experience', data)}
            industry={selectedIndustry}
          />
        );
      case 3:
        return (
          <EducationForm
            data={resumeData.education}
            onUpdate={(data) => handleDataUpdate('education', data)}
          />
        );
      case 4:
        return (
          <SkillsForm
            data={resumeData.skills}
            onUpdate={(data) => handleDataUpdate('skills', data)}
            industry={selectedIndustry}
          />
        );
      case 5:
        return <ResumePreview data={resumeData} industry={selectedIndustry} />;
      default:
        return null;
    }
  };

  const progress = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Industries
              </Button>
              <div className="text-2xl font-bold gradient-text">ResumeAI</div>
            </div>
            <Badge variant="secondary" className="glass-card">
              {selectedIndustry} Resume
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              Step {currentStep}: {steps[currentStep - 1].title}
            </h1>
            <span className="text-sm text-muted-foreground">
              {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step.number === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : step.number < currentStep
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-2 ${
                      step.number < currentStep ? 'bg-success' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="glass-card mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="hero"
            onClick={handleNext}
            disabled={currentStep === 5}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeSteps;