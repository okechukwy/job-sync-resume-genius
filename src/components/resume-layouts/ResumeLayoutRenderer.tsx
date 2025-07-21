
import { ResumeData } from "@/hooks/useResumeSteps";
import { getTemplateById, getStylePresetById } from "@/config/templateConfig";
import { UnifiedLayout } from "./UnifiedLayout";

interface ResumeLayoutRendererProps {
  data: ResumeData;
  templateId?: string;
  formatDate: (dateString: string) => string;
}

export const ResumeLayoutRenderer = ({ data, templateId, formatDate }: ResumeLayoutRendererProps) => {
  console.log('ResumeLayoutRenderer - Template ID received:', templateId);
  
  // CRITICAL FIX: Always use unified system, no legacy fallbacks
  if (!templateId) {
    console.warn('ResumeLayoutRenderer - No template ID provided, using default');
    // Use a default template instead of returning null
    templateId = 'modern-professional';
  }

  const template = getTemplateById(templateId);
  console.log('ResumeLayoutRenderer - Template found:', template?.name);
  
  if (!template) {
    console.error('ResumeLayoutRenderer - Template not found for ID:', templateId);
    // Fallback to a known template instead of returning null
    const fallbackTemplate = getTemplateById('modern-professional');
    const fallbackStylePreset = fallbackTemplate ? getStylePresetById(fallbackTemplate.stylePreset) : null;
    
    if (fallbackTemplate && fallbackStylePreset) {
      console.log('ResumeLayoutRenderer - Using fallback template:', fallbackTemplate.name);
      return (
        <UnifiedLayout 
          data={data}
          stylePreset={fallbackStylePreset}
          formatDate={formatDate}
        />
      );
    }
    
    return (
      <div className="p-8 text-center text-red-500">
        <h3 className="text-lg font-semibold mb-2">Template Error</h3>
        <p>Template "{templateId}" not found. Please select a different template.</p>
      </div>
    );
  }

  const stylePreset = getStylePresetById(template.stylePreset);
  console.log('ResumeLayoutRenderer - Style preset found:', stylePreset?.name);
  
  if (!stylePreset) {
    console.error('ResumeLayoutRenderer - Style preset not found for:', template.stylePreset);
    return (
      <div className="p-8 text-center text-red-500">
        <h3 className="text-lg font-semibold mb-2">Style Error</h3>
        <p>Style preset for template "{template.name}" not found.</p>
      </div>
    );
  }

  console.log('ResumeLayoutRenderer - Rendering unified layout for:', template.name);
  
  return (
    <UnifiedLayout 
      data={data}
      stylePreset={stylePreset}
      formatDate={formatDate}
    />
  );
};
