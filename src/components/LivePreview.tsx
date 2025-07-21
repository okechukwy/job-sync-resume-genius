import { ResumeData } from "@/hooks/useResumeSteps";
import { ResumeLayoutRenderer } from "./resume-layouts/ResumeLayoutRenderer";
import { useState, useRef, useEffect } from "react";
import { PreviewControls } from "./live-preview/PreviewControls";
import { getTemplateById } from "@/config/templateConfig";

interface LivePreviewProps {
  data: ResumeData;
  template: string; // This is now always a template ID
  className?: string;
}

const LivePreview = ({ data, template, className = "" }: LivePreviewProps) => {
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isVisible, setIsVisible] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // SIMPLIFIED: template is already an ID, use it directly
  const templateId = template;
  const unifiedTemplate = getTemplateById(templateId);
  
  console.log('LivePreview - Template ID:', templateId);
  console.log('LivePreview - Unified template found:', !!unifiedTemplate);
  console.log('LivePreview - Template data:', unifiedTemplate);

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
            templateId={templateId}
            formatDate={(dateString: string) => {
              try {
                return new Date(dateString).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                });
              } catch {
                return dateString;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
