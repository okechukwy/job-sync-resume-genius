import { ResumeData } from "@/hooks/useResumeSteps";
import { getTemplateById, getStylePresetById } from "@/config/templateConfig";
import { ExportOptimizedLayout } from "./ExportOptimizedLayout";
import { UnifiedLayout } from "./UnifiedLayout";

interface StandardizedResumeRendererProps {
  data: ResumeData;
  templateId: string;
  formatDate: (dateString: string) => string;
  mode?: 'screen' | 'export';
}

export const StandardizedResumeRenderer = ({ 
  data, 
  templateId, 
  formatDate,
  mode = 'screen'
}: StandardizedResumeRendererProps) => {
  const template = getTemplateById(templateId);
  const stylePreset = template ? getStylePresetById(template.stylePreset) : null;
  
  if (!template || !stylePreset) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Template not found: {templateId}</p>
        <p className="text-sm mt-2">Using default layout</p>
      </div>
    );
  }

  // Use export-optimized layout for PDF generation
  if (mode === 'export') {
    return (
      <ExportOptimizedLayout
        data={data}
        stylePreset={stylePreset}
        formatDate={formatDate}
      />
    );
  }

  // Use unified layout for screen display
  return (
    <UnifiedLayout
      data={data}
      stylePreset={stylePreset}
      formatDate={formatDate}
    />
  );
};