import { ResumeData } from "@/hooks/useResumeSteps";
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
  styles: TemplateStyles;
  layoutVariant: string;
  formatDate: (dateString: string) => string;
}

export const ResumeLayoutRenderer = ({ data, styles, layoutVariant, formatDate }: ResumeLayoutRendererProps) => {
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