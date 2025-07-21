
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { templateConfigs } from "@/config/templateConfig";

export type ResumeBuilderStep = 'templates' | 'analysis' | 'build';

export const useResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState<ResumeBuilderStep>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  // Check if a template was pre-selected from the templates page
  useEffect(() => {
    const templateParam = searchParams.get('template');
    console.log('🔍 Template parameter from URL:', templateParam);
    
    if (templateParam) {
      const decodedParam = decodeURIComponent(templateParam);
      console.log('🔍 Decoded parameter:', decodedParam);
      console.log('🔍 Available unified templates:', templateConfigs.map(t => ({ id: t.id, name: t.name })));
      
      // First try to find by ID in the unified system
      let template = templateConfigs.find(t => t.id === decodedParam);
      
      // If not found by ID, try by name
      if (!template) {
        template = templateConfigs.find(t => t.name === decodedParam);
      }
      
      // If still not found, try name variations
      if (!template) {
        template = templateConfigs.find(t => {
          const nameSlug = t.name.toLowerCase().replace(/\s+/g, '-');
          const paramSlug = decodedParam.toLowerCase().replace(/\s+/g, '-');
          return nameSlug === paramSlug;
        });
      }
      
      console.log('🔍 Found unified template:', template);
      
      if (template) {
        console.log('✅ Setting template:', template.name);
        setSelectedTemplate(template.name);
        setCurrentStep('build');
        toast.success(`${template.name} template selected! Let's build your resume.`);
      } else {
        console.log('❌ No template found for parameter:', decodedParam);
        toast.error('Template not found. Please select a template.');
      }
    }
  }, [searchParams]);

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
    setCurrentStep('templates');
    toast.success('Choose your template to continue with optimization');
  };

  const handleReupload = () => {
    setUploadedFile(null);
    setCurrentStep('templates');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Ready to upload a new resume');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentStep('build');
    toast.success('Template selected! Let\'s build your resume.');
  };

  const handleBackToTemplates = () => {
    setCurrentStep('templates');
    setSelectedTemplate('');
  };

  const handleBackToStep = (step: ResumeBuilderStep) => {
    setCurrentStep(step);
  };

  return {
    // State
    currentStep,
    selectedTemplate,
    uploadedFile,
    fileInputRef,
    
    // Actions
    handleFileChange,
    handleStartFromScratch,
    handleContinueFromAnalysis,
    handleReupload,
    handleTemplateSelect,
    handleBackToTemplates,
    handleBackToStep,
    setCurrentStep
  };
};
