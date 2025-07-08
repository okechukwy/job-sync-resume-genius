import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export type ResumeBuilderStep = 'industry' | 'templates' | 'analysis' | 'build';

export const useResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState<ResumeBuilderStep>('industry');
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

  const handleContinueWithUpload = (industry: string) => {
    if (uploadedFile) {
      setSelectedIndustry(industry);
      setCurrentStep('build');
      toast.success(`${industry} industry selected! We'll help you optimize your uploaded resume.`);
    }
  };

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

  const handleBackToStep = (step: ResumeBuilderStep) => {
    setCurrentStep(step);
  };

  return {
    // State
    currentStep,
    selectedIndustry,
    selectedTemplate,
    uploadedFile,
    fileInputRef,
    
    // Actions
    handleIndustrySelect,
    handleFileChange,
    handleStartFromScratch,
    handleContinueFromAnalysis,
    handleReupload,
    handleTemplateSelect,
    handleBackToIndustries,
    handleBackToStep,
    setCurrentStep
  };
};