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
  
  // Debug logging
  console.log('LivePreview - Received template:', template);
  
  // Create template name to ID mapping for the unified system
  const getTemplateId = (templateName: string): string | undefined => {
    const nameMapping: Record<string, string> = {
      'Medical Doctor': 'medical-doctor',
      'Registered Nurse': 'registered-nurse',
      'Mental Health Professional': 'mental-health-professional',
      'Software Engineer Pro': 'software-engineer',
      'Data Scientist Elite': 'data-scientist',
      'Graphic Designer': 'graphic-designer',
      'UX/UI Designer': 'ux-ui-designer',
      'Copywriter': 'copywriter'
    };
    return nameMapping[templateName];
  };

  const templateId = getTemplateId(template);
  const unifiedTemplate = templateId ? getTemplateById(templateId) : null;
  
  // Use unified system if template exists, fallback to legacy system
  const templateStyles = useTemplateStyles(template);
  const layoutVariant = getLayoutVariant(template);
  
  console.log('LivePreview - Template ID:', templateId);
  console.log('LivePreview - Unified template found:', !!unifiedTemplate);
  console.log('LivePreview - Layout variant:', layoutVariant);
  console.log('LivePreview - Template styles:', templateStyles);

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
      
      // Small delay to allow for content updates
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
