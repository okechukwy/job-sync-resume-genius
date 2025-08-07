import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { ResumeData, FormValidationState } from "@/types/resumeTypes";
import { RESUME_STEPS, TOTAL_STEPS } from "@/constants/resumeSteps";
import { getInitialValidationState, isStepValid } from "@/utils/resumeValidation";
import { getInitialResumeData } from "@/utils/resumeDefaults";
import { resumeService } from "@/services/resumeService";

export type { ResumeData } from "@/types/resumeTypes";

export const useResumeSteps = (resumeId?: string | null) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValidation, setFormValidation] = useState<FormValidationState>(getInitialValidationState());
  const [resumeData, setResumeData] = useState<ResumeData>(getInitialResumeData());
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const saveTimerRef = useRef<number | null>(null);

  // Load existing resume data on mount
  useEffect(() => {
    const loadResume = async () => {
      try {
        let targetResume;
        
        if (resumeId) {
          // Load specific resume by ID - we need to modify this to match the return format
          try {
            const resumeData = await resumeService.loadResume(resumeId);
            targetResume = { id: resumeId, data: resumeData };
          } catch (error) {
            toast.error("Resume not found, loading default resume");
            targetResume = await resumeService.getActiveResume();
          }
        } else {
          // Load active resume
          targetResume = await resumeService.getActiveResume();
        }
        
        if (targetResume) {
          setResumeData(targetResume.data);
          setCurrentResumeId(targetResume.id);
          toast.success("Resume loaded successfully!");
        }
      } catch (error) {
        console.error("Failed to load resume:", error);
        // Continue with empty resume
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

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

    // Debounced auto-save to database to reduce errors and jitter
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(async () => {
      try {
        const newResumeId = await resumeService.saveResume(updatedData, "My Resume", "modern-minimalist");
        if (!currentResumeId) {
          setCurrentResumeId(newResumeId);
        }
      } catch (error: any) {
        console.error("Failed to save resume:", error);
        toast.error(error?.message ? `Failed to save changes: ${error.message}` : "Failed to save changes");
      }
    }, 600);
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