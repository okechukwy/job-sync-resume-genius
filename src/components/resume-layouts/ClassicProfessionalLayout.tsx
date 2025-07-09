import { ResumeData } from "@/hooks/useResumeSteps";
import { LayoutProps } from "./types";

export const ClassicProfessionalLayout = ({ data, styles, formatDate, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="space-y-8">
    {/* Header */}
    <div className={`text-center ${styles.headerBg} ${styles.borderColor} rounded-lg p-8 -mx-8 -mt-8 mb-8`}>
      <h1 className={`text-3xl font-bold mb-3 ${styles.headerText}`}>{data.personalInfo.fullName || 'Your Name'}</h1>
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