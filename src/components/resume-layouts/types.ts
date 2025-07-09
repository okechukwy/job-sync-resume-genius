import { ResumeData } from "@/hooks/useResumeSteps";

export interface TemplateStyles {
  headerBg: string;
  headerText: string;
  accentColor: string;
  borderColor: string;
  sectionBorder: string;
  layout: string;
  spacing: string;
  skillsGrid: boolean;
}

export interface LayoutProps {
  data: ResumeData;
  styles: TemplateStyles;
  formatDate: (dateString: string) => string;
  renderSummarySection: () => JSX.Element | false;
  renderExperienceSection: () => JSX.Element | false;
  renderEducationSection: () => JSX.Element | false;
  renderSkillsSection: () => JSX.Element | false;
}