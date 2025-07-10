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
    profilePicture?: string;
  };
  summary: {
    content: string;
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
  certificates: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
    current: boolean;
    projectUrl?: string;
    githubUrl?: string;
  }>;
  languages: Array<{
    id: string;
    language: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Native";
  }>;
  volunteering: Array<{
    id: string;
    organization: string;
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
  awards: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
  }>;
  publications: Array<{
    id: string;
    title: string;
    publisher: string;
    date: string;
    url?: string;
    description?: string;
  }>;
  interests: {
    interests: string[];
  };
  additionalInfo: {
    content: string;
  };
}

export const useResumeSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValidation, setFormValidation] = useState({
    personalInfo: false,
    summary: false,
    experience: false,
    education: false,
    skills: false,
    certificates: true, // Optional sections - always valid
    projects: true,
    languages: true,
    volunteering: true,
    awards: true,
    publications: true,
    interests: true,
    additionalInfo: true,
  });
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      profilePicture: '',
    },
    summary: {
      content: '',
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
    },
    certificates: [],
    projects: [],
    languages: [],
    volunteering: [],
    awards: [],
    publications: [],
    interests: {
      interests: [],
    },
    additionalInfo: {
      content: '',
    },
  });

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic contact information", category: "core", required: true },
    { number: 2, title: "Summary", description: "Professional summary", category: "core", required: true },
    { number: 3, title: "Experience", description: "Work history and achievements", category: "core", required: true },
    { number: 4, title: "Education", description: "Academic background", category: "core", required: true },
    { number: 5, title: "Skills", description: "Technical and soft skills", category: "core", required: true },
    { number: 6, title: "Certificates", description: "Professional certifications", category: "additional", required: false },
    { number: 7, title: "Projects", description: "Notable projects and work", category: "additional", required: false },
    { number: 8, title: "Languages", description: "Language proficiencies", category: "additional", required: false },
    { number: 9, title: "Volunteering", description: "Volunteer work and community service", category: "additional", required: false },
    { number: 10, title: "Awards", description: "Awards and honors received", category: "additional", required: false },
    { number: 11, title: "Publications", description: "Published works and research", category: "additional", required: false },
    { number: 12, title: "Interests", description: "Personal interests and hobbies", category: "additional", required: false },
    { number: 13, title: "Additional Info", description: "Other relevant information", category: "additional", required: false },
    { number: 14, title: "Preview", description: "Review and download", category: "final", required: false },
  ];

  const handleNext = () => {
    const stepValidationMap = {
      1: formValidation.personalInfo,
      2: formValidation.summary,
      3: formValidation.experience,
      4: formValidation.education,
      5: formValidation.skills,
      6: formValidation.certificates,
      7: formValidation.projects,
      8: formValidation.languages,
      9: formValidation.volunteering,
      10: formValidation.awards,
      11: formValidation.publications,
      12: formValidation.interests,
      13: formValidation.additionalInfo,
      14: true,
    };

    const isCurrentStepValid = stepValidationMap[currentStep as keyof typeof stepValidationMap];
    
    if (!isCurrentStepValid) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }

    if (currentStep < 14) {
      setCurrentStep(currentStep + 1);
      const currentStepData = steps.find(step => step.number === currentStep);
      if (currentStepData?.required) {
        toast.success(`${currentStepData.title} completed!`);
      } else {
        toast.success(`Moving to ${steps.find(step => step.number === currentStep + 1)?.title}`);
      }
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

  const progress = (currentStep / 14) * 100;

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