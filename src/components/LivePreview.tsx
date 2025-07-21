
import { ResumeData } from "@/hooks/useResumeSteps";
import { ResumeLayoutRenderer } from "./resume-layouts/ResumeLayoutRenderer";
import { useState, useRef, useEffect } from "react";
import { PreviewControls } from "./live-preview/PreviewControls";
import { useTemplateStyles } from "./live-preview/hooks/useTemplateStyles";
import { getLayoutVariant, formatDate } from "./live-preview/utils/previewUtils";
import { getTemplateById } from "@/config/templateConfig";

interface LivePreviewProps {
  data: ResumeData;
  template: string;
  className?: string;
}

const LivePreview = ({ data, template, className = "" }: LivePreviewProps) => {
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isVisible, setIsVisible] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Enhanced template mapping for unified system - now comprehensive
  const getTemplateId = (templateName: string): string | undefined => {
    const nameMapping: Record<string, string> = {
      // Professional templates - exact matches from templateConfig.ts
      'Corporate Executive': 'corporate-executive',
      'Modern Professional': 'modern-professional',
      'Academic Researcher': 'academic-researcher',
      'Business Manager': 'business-manager',
      'Finance Executive': 'finance-executive',
      'Healthcare Professional': 'healthcare-professional',
      'Legal Professional': 'legal-professional',
      'Consulting Expert': 'consulting-expert',
      
      // Creative templates
      'Graphic Designer': 'graphic-designer',
      'UX/UI Designer': 'ux-ui-designer',
      'Marketing Creative': 'marketing-creative',
      'Content Creator': 'content-creator',
      'Art Director': 'art-director',
      'Photographer': 'photographer',
      
      // Technical templates
      'Software Engineer Pro': 'software-engineer-pro',
      'Data Scientist Elite': 'data-scientist-elite',
      'DevOps Engineer': 'devops-engineer',
      'Cybersecurity Expert': 'cybersecurity-expert',
      'AI/ML Engineer': 'ai-ml-engineer',
      'Cloud Architect': 'cloud-architect',
      
      // Legacy template mappings from allTemplates
      'Tech Professional': 'software-engineer-pro',
      'Healthcare Specialist': 'healthcare-professional',
      'Finance Expert': 'finance-executive',
      'Creative Professional': 'graphic-designer',
      'Medical Doctor': 'healthcare-professional',
      'Registered Nurse': 'healthcare-professional',
      'Mental Health Professional': 'healthcare-professional',
      'Software Engineer': 'software-engineer-pro',
      'Data Scientist': 'data-scientist-elite',
      'Investment Banker': 'finance-executive',
      'Financial Analyst': 'finance-executive',
      'Accountant Pro': 'finance-executive',
      'Marketing Manager': 'marketing-creative',
      'Sales Manager': 'business-manager',
      'Operations Manager': 'business-manager',
      'Project Manager': 'business-manager',
      'Business Analyst': 'business-manager',
      'Consultant': 'consulting-expert',
      'HR Manager': 'business-manager',
      'Research Scientist': 'academic-researcher',
      'Lab Technician': 'academic-researcher',
      'Recent Graduate': 'modern-professional',
      'Elegant Professional': 'corporate-executive',
      'Gradient Modern': 'modern-professional',
      'Minimalist Pro': 'modern-professional',
      'Colorful Fresh': 'marketing-creative'
    };
    return nameMapping[templateName];
  };

  const templateId = getTemplateId(template);
  const unifiedTemplate = templateId ? getTemplateById(templateId) : null;
  
  // Use unified system if template exists, fallback to legacy system
  const templateStyles = useTemplateStyles(template);
  const layoutVariant = getLayoutVariant(template);
  
  console.log('LivePreview - Template:', template);
  console.log('LivePreview - Template ID:', templateId);
  console.log('LivePreview - Unified template found:', !!unifiedTemplate);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.4));
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Auto-scroll to keep relevant content in view
  useEffect(() => {
    if (previewRef.current) {
      const preview = previewRef.current;
      const scrollToTop = () => {
        preview.scrollTo({ top: 0, behavior: 'smooth' });
      };
      
      const timeoutId = setTimeout(scrollToTop, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [data]);

  if (!isVisible) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <PreviewControls
          zoomLevel={zoomLevel}
          isVisible={isVisible}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onToggleVisibility={toggleVisibility}
        />
      </div>
    );
  }

  return (
    <div className={`${className} flex flex-col h-full`}>
      {/* Preview Controls */}
      <PreviewControls
        zoomLevel={zoomLevel}
        isVisible={isVisible}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onToggleVisibility={toggleVisibility}
      />

      {/* Preview Content */}
      <div 
        ref={previewRef}
        className="flex-1 overflow-auto p-4 bg-gray-50"
      >
        <div 
          className="mx-auto bg-white shadow-lg origin-top transition-transform duration-200"
          style={{ 
            transform: `scale(${zoomLevel})`,
            width: `${100 / zoomLevel}%`,
            maxWidth: '210mm',
            minHeight: '297mm',
            padding: '20mm'
          }}
        >
          <ResumeLayoutRenderer 
            data={data}
            styles={templateStyles}
            layoutVariant={layoutVariant}
            templateId={templateId}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
