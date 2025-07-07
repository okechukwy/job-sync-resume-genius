import { useState } from "react";
import { toast } from "sonner";

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

export const useResumeSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValidation, setFormValidation] = useState({
    personalInfo: false,
    experience: false,
    education: false,
    skills: false,
  });
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
    const stepValidationMap = {
      1: formValidation.personalInfo,
      2: formValidation.experience,
      3: formValidation.education,
      4: formValidation.skills,
      5: true,
    };

    const isCurrentStepValid = stepValidationMap[currentStep as keyof typeof stepValidationMap];
    
    if (!isCurrentStepValid) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }

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

  const handleValidationChange = (step: keyof typeof formValidation, isValid: boolean) => {
    setFormValidation(prev => ({
      ...prev,
      [step]: isValid,
    }));
  };

  const progress = (currentStep / 5) * 100;

  return {
    currentStep,
    setCurrentStep,
    formValidation,
    resumeData,
    steps,
    progress,
    handleNext,
    handlePrevious,
    handleDataUpdate,
    handleValidationChange,
  };
};