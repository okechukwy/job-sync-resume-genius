import { ResumeData } from "@/hooks/useResumeSteps";
import { LayoutProps } from "./types";

export const ClassicProfessionalLayout = ({ data, styles, formatDate, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="spacing-content animate-fade-in">
    {/* Header */}
    <div className={`text-center ${styles.headerBg} ${styles.borderColor} rounded-xl p-10 -mx-8 -mt-8 mb-8 hover-lift`}>
      <h1 className={`typography-heading text-4xl font-bold mb-4 ${styles.headerText} tracking-tight`}>{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className={`flex flex-wrap justify-center gap-4 text-sm ${styles.headerText} opacity-90`}>
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
        {data.personalInfo.website && (
          <span className={`${styles.headerBg.includes('gradient') || styles.headerBg.includes('900') ? 'text-white' : styles.accentColor} font-medium`}>{data.personalInfo.website}</span>
        )}
        {data.personalInfo.linkedin && (
          <span className={`${styles.headerBg.includes('gradient') || styles.headerBg.includes('900') ? 'text-white' : styles.accentColor} font-medium`}>{data.personalInfo.linkedin}</span>
        )}
      </div>
    </div>
    {renderExperienceSection()}
    {renderEducationSection()}
    {renderSkillsSection()}
  </div>
);