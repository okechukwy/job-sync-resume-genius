import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ResumeData, FormValidationState } from "@/types/resumeTypes";
import { RESUME_STEPS, TOTAL_STEPS } from "@/constants/resumeSteps";
import { getInitialValidationState, isStepValid } from "@/utils/resumeValidation";
import { getInitialResumeData } from "@/utils/resumeDefaults";
import { resumeService } from "@/services/resumeService";

export type { ResumeData } from "@/types/resumeTypes";

export const useResumeSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValidation, setFormValidation] = useState<FormValidationState>(getInitialValidationState());
  const [resumeData, setResumeData] = useState<ResumeData>(getInitialResumeData());
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing resume data on mount
  useEffect(() => {
    const loadActiveResume = async () => {
      try {
        const activeResume = await resumeService.getActiveResume();
        if (activeResume) {
          setResumeData(activeResume.data);
          setCurrentResumeId(activeResume.id);
          toast.success("Resume loaded successfully!");
        }
      } catch (error) {
        console.error("Failed to load resume:", error);
        // Continue with empty resume
      } finally {
        setIsLoading(false);
      }
    };

    loadActiveResume();
  }, []);

  const handleNext = () => {
    if (!isStepValid(currentStep, formValidation)) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      const currentStepData = RESUME_STEPS.find(step => step.number === currentStep);
      if (currentStepData?.required) {
        toast.success(`${currentStepData.title} completed!`);
      } else {
        toast.success(`Moving to ${RESUME_STEPS.find(step => step.number === currentStep + 1)?.title}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = async (section: keyof ResumeData, data: any) => {
    const updatedData = {
      ...resumeData,
      [section]: data,
    };
    
    setResumeData(updatedData);
    
    // Auto-save to database
    try {
      const resumeId = await resumeService.saveResume(updatedData, "My Resume", "modern-minimalist");
      if (!currentResumeId) {
        setCurrentResumeId(resumeId);
      }
    } catch (error) {
      console.error("Failed to save resume:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleValidationChange = (step: keyof FormValidationState, isValid: boolean) => {
    setFormValidation(prev => ({
      ...prev,
      [step]: isValid,
    }));
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return {
    currentStep,
    setCurrentStep,
    formValidation,
    resumeData,
    steps: RESUME_STEPS,
    progress,
    currentResumeId,
    isLoading,
    handleNext,
    handlePrevious,
    handleDataUpdate,
    handleValidationChange,
  };
};