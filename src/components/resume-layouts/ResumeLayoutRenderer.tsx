import { ResumeData } from "@/hooks/useResumeSteps";
import { TemplateStyles } from "./types";
import { ClassicProfessionalLayout } from "./ClassicProfessionalLayout";
import { ModernMinimalistLayout } from "./ModernMinimalistLayout";
import { createSectionRenderers } from "./sectionRenderers";

interface ResumeLayoutRendererProps {
  data: ResumeData;
  styles: TemplateStyles;
  layoutVariant: string;
  formatDate: (dateString: string) => string;
}

export const ResumeLayoutRenderer = ({ data, styles, layoutVariant, formatDate }: ResumeLayoutRendererProps) => {
  const { renderExperienceSection, renderEducationSection, renderSkillsSection } = createSectionRenderers(data, styles, formatDate);

  const layoutProps = {
    data,
    styles,
    formatDate,
    renderExperienceSection,
    renderEducationSection,
    renderSkillsSection
  };

  switch (layoutVariant) {
    case 'modern-minimalist':
      return <ModernMinimalistLayout {...layoutProps} />;
    case 'creative-showcase':
    case 'executive-premium':
    case 'tech-forward':
    default:
      return <ClassicProfessionalLayout {...layoutProps} />;
  }
};