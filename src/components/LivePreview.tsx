import { ResumeData } from "@/hooks/useResumeSteps";
import { ResumeLayoutRenderer } from "./resume-layouts/ResumeLayoutRenderer";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Eye, EyeOff } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface LivePreviewProps {
  data: ResumeData;
  industry: string;
  template: string;
  className?: string;
}

const LivePreview = ({ data, industry, template, className = "" }: LivePreviewProps) => {
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isVisible, setIsVisible] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Enhanced layout system with 5 modern variants
  const getLayoutVariant = () => {
    const templateName = template.toLowerCase().replace(/\s+/g, '-');
    
    if (templateName.includes('minimalist') || templateName.includes('elegant')) {
      return 'modern-minimalist';
    } else if (templateName.includes('creative') || templateName.includes('colorful')) {
      return 'creative-showcase';
    } else if (templateName.includes('executive') || templateName.includes('finance')) {
      return 'executive-premium';
    } else if (templateName.includes('tech') || templateName.includes('software') || templateName.includes('developer')) {
      return 'tech-forward';
    } else {
      return 'classic-professional';
    }
  };

  const getTemplateStyles = useMemo(() => {
    const templateName = template.toLowerCase().replace(/\s+/g, '-');
    const layoutVariant = getLayoutVariant();
    
    const baseStyles = {
      'classic-professional': {
        headerBg: 'bg-gradient-to-r from-slate-50 to-gray-100',
        headerText: 'text-slate-900',
        accentColor: 'text-slate-700',
        borderColor: 'border-slate-200',
        sectionBorder: 'border-l-4 border-slate-600 pl-4',
        layout: 'single-column',
        spacing: 'standard'
      },
      'modern-minimalist': {
        headerBg: 'bg-white',
        headerText: 'text-gray-900',
        accentColor: 'text-gray-600',
        borderColor: 'border-gray-100',
        sectionBorder: 'border-l-2 border-gray-300 pl-6',
        layout: 'clean-geometry',
        spacing: 'spacious'
      },
      'creative-showcase': {
        headerBg: 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50',
        headerText: 'text-gray-900',
        accentColor: 'text-purple-600',
        borderColor: 'border-purple-200',
        sectionBorder: 'border-l-6 border-gradient-to-b from-purple-400 to-pink-400 pl-4',
        layout: 'visual-hierarchy',
        spacing: 'dynamic'
      },
      'executive-premium': {
        headerBg: 'bg-gradient-to-r from-slate-900 to-gray-800',
        headerText: 'text-white',
        accentColor: 'text-amber-600',
        borderColor: 'border-amber-200',
        sectionBorder: 'border-l-4 border-amber-500 pl-4',
        layout: 'sophisticated',
        spacing: 'premium'
      },
      'tech-forward': {
        headerBg: 'bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900',
        headerText: 'text-white',
        accentColor: 'text-blue-400',
        borderColor: 'border-blue-300',
        sectionBorder: 'border-l-4 border-blue-400 pl-4',
        layout: 'grid-based',
        spacing: 'compact'
      }
    };

    const templateOverrides = {
      'tech-professional': { accentColor: 'text-blue-600', sectionBorder: 'border-l-4 border-blue-600 pl-4' },
      'creative-professional': { accentColor: 'text-purple-600', sectionBorder: 'border-l-4 border-purple-400 pl-4' },
      'healthcare-specialist': { accentColor: 'text-green-600', sectionBorder: 'border-l-4 border-green-500 pl-4' },
      'finance-expert': { accentColor: 'text-slate-700', sectionBorder: 'border-l-4 border-slate-600 pl-4' },
      'executive-leader': { accentColor: 'text-amber-700', sectionBorder: 'border-l-4 border-amber-600 pl-4' },
      'recent-graduate': { accentColor: 'text-teal-600', sectionBorder: 'border-l-4 border-teal-500 pl-4' }
    };

    const variant = baseStyles[layoutVariant];
    const overrides = templateOverrides[templateName] || {};
    
    return {
      ...variant,
      ...overrides,
      skillsGrid: layoutVariant !== 'modern-minimalist' && layoutVariant !== 'executive-premium'
    };
  }, [template]);

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
        <Button
          variant="outline"
          onClick={toggleVisibility}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Show Preview
        </Button>
      </div>
    );
  }

  return (
    <div className={`${className} flex flex-col h-full`}>
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.4}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-16 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 1.2}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleVisibility}
        >
          <EyeOff className="w-4 h-4" />
        </Button>
      </div>

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
            styles={getTemplateStyles}
            layoutVariant={getLayoutVariant()}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
