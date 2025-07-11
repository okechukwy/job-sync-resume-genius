import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { allTemplates } from "@/data/templateData";

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
      // Find the template by matching the route parameter with actual template routes
      const decodedParam = decodeURIComponent(templateParam);
      console.log('🔍 Decoded parameter:', decodedParam);
      console.log('🔍 Available templates:', allTemplates.map(t => ({ name: t.name, route: t.route })));
      
      const template = allTemplates.find(t => {
        const routeMatch = t.route.includes(decodedParam);
        const nameMatch = t.name.toLowerCase().replace(/\s+/g, '-') === decodedParam;
        const exactNameMatch = t.name.toLowerCase() === decodedParam.replace(/-/g, ' ');
        console.log(`🔍 Checking template "${t.name}":`, { 
          routeMatch, 
          nameMatch, 
          exactNameMatch, 
          route: t.route,
          templateNameSlug: t.name.toLowerCase().replace(/\s+/g, '-'),
          paramSlug: decodedParam
        });
        return routeMatch || nameMatch || exactNameMatch;
      });
      
      console.log('🔍 Found template:', template);
      
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