import { useState, useRef, useEffect, useCallback } from "react";
import { ResumeData } from "@/hooks/useResumeSteps";
import { EnhancedResumeRenderer } from "./EnhancedResumeRenderer";
import { AdvancedPreviewToolbar } from "./AdvancedPreviewToolbar";
import { RealTimeSync } from "./RealTimeSync";
import { SmartSuggestions } from "./SmartSuggestions";
import { PreviewControls } from "./PreviewControls";
import { getTemplateById } from "@/config/templateConfig";
import { toast } from "sonner";

interface EnhancedLivePreviewProps {
  data: ResumeData;
  template: string;
  className?: string;
  onDataUpdate: (section: keyof ResumeData, data: any) => void;
}

export const EnhancedLivePreview = ({ 
  data, 
  template, 
  className = "",
  onDataUpdate 
}: EnhancedLivePreviewProps) => {
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isVisible, setIsVisible] = useState(true);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [currentFont, setCurrentFont] = useState('Inter');
  const [currentFontSize, setCurrentFontSize] = useState('12');
  const [activeField, setActiveField] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const syncRef = useRef<any>(null);
  
  const templateId = template;
  const unifiedTemplate = getTemplateById(templateId);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 1.2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.4));
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Formatting functions
  const handleFormatText = useCallback((format: 'bold' | 'italic' | 'underline') => {
    if (!activeField) {
      toast.error("Please select a text field first");
      return;
    }
    
    // Apply formatting to currently selected text
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      document.execCommand(format, false);
      toast.success(`Applied ${format} formatting`);
    }
  }, [activeField]);

  const handleAlignText = useCallback((alignment: 'left' | 'center' | 'right') => {
    if (!activeField) {
      toast.error("Please select a text field first");
      return;
    }
    
    const alignmentMap = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight'
    };
    
    document.execCommand(alignmentMap[alignment], false);
    toast.success(`Applied ${alignment} alignment`);
  }, [activeField]);

  const handleFontChange = (font: string) => {
    setCurrentFont(font);
    if (activeField) {
      document.execCommand('fontName', false, font);
    }
  };

  const handleFontSizeChange = (size: string) => {
    setCurrentFontSize(size);
    if (activeField) {
      document.execCommand('fontSize', false, size);
    }
  };

  // Export functions
  const handleExport = async (format: 'pdf' | 'word' | 'txt') => {
    try {
      if (format === 'pdf') {
        const { downloadAsPdf } = await import('@/utils/downloadHandlers/pdfDownloadHandler');
        await downloadAsPdf(JSON.stringify(data), 'resume');
      } else if (format === 'word') {
        // Word export functionality would go here
        toast.info('Word export coming soon!');
      } else if (format === 'txt') {
        // TXT export functionality would go here
        toast.info('TXT export coming soon!');
      }
      toast.success(`Downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Failed to download as ${format.toUpperCase()}`);
    }
  };

  // Field interaction handlers
  const handleFieldFocus = (fieldName: string) => {
    setActiveField(fieldName);
    setShowSuggestions(true);
  };

  const handleFieldBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleApplySuggestion = (field: string, newText: string) => {
    // Extract section and field from field path
    const [section, ...fieldPath] = field.split('.');
    
    if (syncRef.current) {
      syncRef.current.updateField(section as keyof ResumeData, fieldPath.join('.'), newText);
    }
  };

  const handleDismissSuggestion = (suggestionId: string) => {
    // Handle suggestion dismissal
    console.log('Dismissed suggestion:', suggestionId);
  };

  // Get sync functions from RealTimeSync
  useEffect(() => {
    const syncElement = document.querySelector('[data-sync-functions]');
    if (syncElement) {
      const syncData = syncElement.getAttribute('data-sync-functions');
      if (syncData) {
        syncRef.current = JSON.parse(syncData);
      }
    }
  });

  const getPreviewWidth = () => {
    if (previewMode === 'mobile') return '375px';
    return '210mm';
  };

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
    <RealTimeSync data={data} onDataUpdate={onDataUpdate}>
      <div className={`${className} flex flex-col h-full relative`}>
        {/* Advanced Toolbar */}
        <AdvancedPreviewToolbar
          onFormatText={handleFormatText}
          onAlignText={handleAlignText}
          onFontChange={handleFontChange}
          onFontSizeChange={handleFontSizeChange}
          onUndo={syncRef.current?.undo || (() => {})}
          onRedo={syncRef.current?.redo || (() => {})}
          onSave={syncRef.current?.save || (() => {})}
          onExport={handleExport}
          onPreviewMode={setPreviewMode}
          currentFont={currentFont}
          currentFontSize={currentFontSize}
          previewMode={previewMode}
          hasUnsavedChanges={syncRef.current?.hasUnsavedChanges || false}
          canUndo={syncRef.current?.canUndo || false}
          canRedo={syncRef.current?.canRedo || false}
        />

        {/* Basic Controls */}
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
          className="flex-1 overflow-auto p-4 bg-gray-50 relative"
        >
          {/* Scale wrapper keeps sheet width fixed while allowing zoom */}
          <div
            className="w-full flex justify-center"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
            }}
          >
            <div
              className="mx-auto bg-white shadow-lg"
              style={{
                width: getPreviewWidth(),
                minHeight: previewMode === 'mobile' ? '667px' : '297mm',
                padding: previewMode === 'mobile' ? '10px' : '20mm'
              }}
            >
              <EnhancedResumeRenderer
                data={data}
                templateId={templateId}
                onFieldUpdate={syncRef.current?.updateField || (() => {})}
                onFieldFocus={handleFieldFocus}
                onFieldBlur={handleFieldBlur}
                currentFont={currentFont}
                currentFontSize={currentFontSize}
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

          {/* Smart Suggestions Overlay */}
          {showSuggestions && activeField && (
            <div className="absolute top-20 right-4 w-80">
              <SmartSuggestions
                currentField={activeField}
                text={getFieldText(data, activeField)}
                onApplySuggestion={handleApplySuggestion}
                onDismissSuggestion={handleDismissSuggestion}
              />
            </div>
          )}
        </div>
      </div>
    </RealTimeSync>
  );
};

// Helper function to get text from nested field path
function getFieldText(data: ResumeData, fieldPath: string): string {
  const keys = fieldPath.split('.');
  let current: any = data;
  
  for (const key of keys) {
    if (current && typeof current === 'object') {
      current = current[key];
    } else {
      return '';
    }
  }
  
  return typeof current === 'string' ? current : '';
}