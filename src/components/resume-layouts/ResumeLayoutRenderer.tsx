import { ResumeData } from "@/hooks/useResumeSteps";
import { getTemplateById, getStylePresetById } from "@/config/templateConfig";
import { UnifiedLayout } from "./UnifiedLayout";
import { TemplateStyles } from "./types";
import { ClassicProfessionalLayout } from "./ClassicProfessionalLayout";
import { ModernMinimalistLayout } from "./ModernMinimalistLayout";
import { CreativeShowcaseLayout } from "./CreativeShowcaseLayout";
import { ExecutivePremiumLayout } from "./ExecutivePremiumLayout";
import { TechForwardLayout } from "./TechForwardLayout";
import { HealthcareLayout } from "./HealthcareLayout";
import { createSectionRenderers } from "./sectionRenderers";

interface ResumeLayoutRendererProps {
  data: ResumeData;
  styles?: TemplateStyles;
  layoutVariant?: string;
  templateId?: string;
  formatDate: (dateString: string) => string;
}

export const ResumeLayoutRenderer = ({ data, styles, layoutVariant, templateId, formatDate }: ResumeLayoutRendererProps) => {
  // If templateId is provided, use the new unified system
  if (templateId) {
    const template = getTemplateById(templateId);
    const stylePreset = template ? getStylePresetById(template.stylePreset) : getStylePresetById('classic-blue');
    
    if (stylePreset) {
      return (
        <UnifiedLayout 
          data={data}
          stylePreset={stylePreset}
          formatDate={formatDate}
        />
      );
    }
  }

  // Fallback to legacy system for backward compatibility
  if (!styles || !layoutVariant) return null;
  
  const { renderSummarySection, renderExperienceSection, renderEducationSection, renderSkillsSection } = createSectionRenderers(data, styles, formatDate);

  const layoutProps = {
    data,
    styles,
    formatDate,
    renderSummarySection,
    renderExperienceSection,
    renderEducationSection,
    renderSkillsSection
  };

  switch (layoutVariant) {
    case 'modern-minimalist':
      return <ModernMinimalistLayout {...layoutProps} />;
    case 'creative-showcase':
      return <CreativeShowcaseLayout {...layoutProps} />;
    case 'executive-premium':
      return <ExecutivePremiumLayout {...layoutProps} />;
    case 'tech-forward':
      return <TechForwardLayout {...layoutProps} />;
    case 'healthcare':
      return <HealthcareLayout {...layoutProps} />;
    default:
      return <ClassicProfessionalLayout {...layoutProps} />;
  }
};