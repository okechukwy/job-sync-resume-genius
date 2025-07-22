
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UnifiedLayout } from "@/components/resume-layouts/UnifiedLayout";
import { marketingManagerSample } from "@/data/sampleResumeData";
import { getStylePresetById, templateConfigs } from "@/config/templateConfig";
import { X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

interface TemplatePreviewModalProps {
  templateId: string;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

const TemplatePreviewModal = ({ templateId, onClose, onSelectTemplate }: TemplatePreviewModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(0.75);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const template = templateConfigs.find(t => t.id === templateId);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!template) {
    return null;
  }

  const handleSelectTemplate = () => {
    onSelectTemplate(templateId);
    onClose();
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.3));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className={`fixed bg-gradient-hero rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen 
          ? 'inset-2' 
          : 'inset-4 md:inset-8 lg:inset-16'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border/20 bg-background/95 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <Badge variant="secondary" className="glass-card flex-shrink-0">
              👁️ Preview
            </Badge>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl lg:text-2xl font-bold truncate">
                {template.name} <span className="gradient-text">Preview</span>
              </h2>
              <p className="text-muted-foreground text-sm lg:text-base truncate">{template.description}</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-1 bg-background/50 rounded-lg p-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.3}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs px-2 py-1 bg-background/70 rounded text-center min-w-[3rem]">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 1.5}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            {/* Action Buttons */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleFullscreen}
              className="hidden lg:flex"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="hero" 
              size="sm"
              onClick={handleSelectTemplate}
              className="hidden md:flex"
            >
              Use Template
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Zoom Controls */}
        <div className="md:hidden flex items-center justify-center gap-2 p-3 bg-background/50 border-b border-border/20">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.3}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs px-3 py-1 bg-background/70 rounded text-center min-w-[3rem]">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 1.5}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        {/* Preview Content - Scrollable Area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-4 lg:p-8 flex justify-center">
            <div 
              className="bg-white shadow-xl transition-transform duration-200 mx-auto"
              style={{ 
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top center',
                width: '210mm',
                minHeight: '297mm',
              }}
            >
              <UnifiedLayout 
                data={marketingManagerSample} 
                stylePreset={getStylePresetById(template.stylePreset || 'modern-professional')!}
                formatDate={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              />
            </div>
          </div>
        </div>

        {/* Mobile Action Button */}
        <div className="md:hidden p-4 bg-background/95 border-t border-border/20">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={handleSelectTemplate}
          >
            Use This Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
