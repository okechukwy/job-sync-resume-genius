import { useState } from "react";
import { toast } from "sonner";
import { ResumeData, FormValidationState } from "@/types/resumeTypes";
import { RESUME_STEPS, TOTAL_STEPS } from "@/constants/resumeSteps";
import { getInitialValidationState, isStepValid } from "@/utils/resumeValidation";
import { getInitialResumeData } from "@/utils/resumeDefaults";

export type { ResumeData } from "@/types/resumeTypes";

export const useResumeSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValidation, setFormValidation] = useState<FormValidationState>(getInitialValidationState());
  const [resumeData, setResumeData] = useState<ResumeData>(getInitialResumeData());

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

  const handleDataUpdate = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
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
    handleNext,
    handlePrevious,
    handleDataUpdate,
    handleValidationChange,
  };
};