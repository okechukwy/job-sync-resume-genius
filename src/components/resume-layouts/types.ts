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
  renderCertificatesSection: () => JSX.Element | false;
  renderProjectsSection: () => JSX.Element | false;
  renderLanguagesSection: () => JSX.Element | false;
  renderVolunteeringSection: () => JSX.Element | false;
  renderAwardsSection: () => JSX.Element | false;
  renderPublicationsSection: () => JSX.Element | false;
  renderInterestsSection: () => JSX.Element | false;
  renderAdditionalInfoSection: () => JSX.Element | false;
}