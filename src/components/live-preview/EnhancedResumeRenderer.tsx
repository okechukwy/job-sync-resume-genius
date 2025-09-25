import { ResumeData } from "@/hooks/useResumeSteps";
import { getTemplateById, getStylePresetById } from "@/config/templateConfig";
import { EditableUnifiedLayout } from "./EditableUnifiedLayout";

interface EnhancedResumeRendererProps {
  data: ResumeData;
  templateId: string;
  onFieldUpdate: (section: keyof ResumeData, fieldPath: string, value: any) => void;
  onFieldFocus: (fieldName: string) => void;
  onFieldBlur: () => void;
  currentFont: string;
  currentFontSize: string;
  formatDate: (dateString: string) => string;
}

export const EnhancedResumeRenderer = ({
  data,
  templateId,
  onFieldUpdate,
  onFieldFocus,
  onFieldBlur,
  currentFont,
  currentFontSize,
  formatDate,
}: EnhancedResumeRendererProps) => {
  const template = getTemplateById(templateId);
  const stylePreset = template ? getStylePresetById(template.stylePreset) : null;
  
  if (!template || !stylePreset) {
    return <div>Template not found: {templateId}</div>;
  }

  // Use the editable unified template system for live preview
  return (
    <EditableUnifiedLayout
      data={data}
      stylePreset={stylePreset}
      formatDate={formatDate}
      onFieldUpdate={onFieldUpdate}
      onFieldFocus={onFieldFocus}
      onFieldBlur={onFieldBlur}
    />
  );
};