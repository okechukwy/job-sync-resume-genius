import { ResumeData } from "@/hooks/useResumeSteps";
import { TemplateStyles } from "./types";

export const createSectionRenderers = (data: ResumeData, styles: TemplateStyles, formatDate: (dateString: string) => string) => {
  const renderExperienceSection = () => (
    data.experience.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift`}>
          EXPERIENCE
        </h2>
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="space-y-4 hover-lift bg-contrast-medium rounded-lg p-6" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="typography-heading text-lg font-semibold text-contrast-high">{exp.position}</h3>
                <p className="typography-body text-contrast-medium font-medium">{exp.company}</p>
              </div>
              <div className={`text-right ${styles.accentColor} resume-meta-text`}>
                <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
            </div>
            <div className="resume-content-text whitespace-pre-line">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderEducationSection = () => (
    data.education.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift`}>
          EDUCATION
        </h2>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="bg-contrast-medium rounded-lg p-6 hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="typography-heading font-semibold text-contrast-high">{edu.degree} in {edu.field}</h3>
                <p className="typography-body text-contrast-medium">{edu.school}</p>
                {edu.gpa && <p className="resume-meta-text">GPA: {edu.gpa}</p>}
              </div>
              <div className={`text-right ${styles.accentColor} resume-meta-text`}>
                <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderSkillsSection = () => (
    (data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift`}>
          SKILLS
        </h2>
        {data.skills.technical.length > 0 && (
          <div className="bg-contrast-medium rounded-lg p-6 hover-scale">
            <h3 className="typography-heading font-semibold text-contrast-high mb-3">Technical Skills:</h3>
            {styles.skillsGrid ? (
              <div className="grid grid-cols-2 gap-3">
                {data.skills.technical.map((skill, index) => (
                  <div key={index} className={`${styles.accentColor} typography-body font-medium flex items-center gap-2 hover-lift`}>
                    <span className="w-2 h-2 bg-current rounded-full"></span>
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <p className="resume-content-text">{data.skills.technical.join(' • ')}</p>
            )}
          </div>
        )}
        {data.skills.soft.length > 0 && (
          <div className="bg-contrast-medium rounded-lg p-6 hover-scale">
            <h3 className="typography-heading font-semibold text-contrast-high mb-3">Core Competencies:</h3>
            {styles.skillsGrid ? (
              <div className="grid grid-cols-2 gap-3">
                {data.skills.soft.map((skill, index) => (
                  <div key={index} className={`${styles.accentColor} typography-body font-medium flex items-center gap-2 hover-lift`}>
                    <span className="w-2 h-2 bg-current rounded-full"></span>
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <p className="resume-content-text">{data.skills.soft.join(' • ')}</p>
            )}
          </div>
        )}
      </div>
    )
  );

  return { renderExperienceSection, renderEducationSection, renderSkillsSection };
};