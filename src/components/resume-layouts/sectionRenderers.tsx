import { ResumeData } from "@/hooks/useResumeSteps";
import { TemplateStyles } from "./types";

export const createSectionRenderers = (data: ResumeData, styles: TemplateStyles, formatDate: (dateString: string) => string) => {
  const renderExperienceSection = () => (
    data.experience.length > 0 && (
      <div className="space-y-6">
        <h2 className={`text-xl font-bold text-gray-800 ${styles.sectionBorder} mb-4`}>
          EXPERIENCE
        </h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{exp.position}</h3>
                <p className="text-gray-700 font-medium">{exp.company}</p>
              </div>
              <div className={`text-right text-sm ${styles.accentColor} font-medium`}>
                <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderEducationSection = () => (
    data.education.length > 0 && (
      <div className="space-y-4">
        <h2 className={`text-xl font-bold text-gray-800 ${styles.sectionBorder} mb-4`}>
          EDUCATION
        </h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
              <p className="text-gray-700">{edu.school}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
            <div className={`text-right text-sm ${styles.accentColor} font-medium`}>
              <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderSkillsSection = () => (
    (data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
      <div className="space-y-4">
        <h2 className={`text-xl font-bold text-gray-800 ${styles.sectionBorder} mb-4`}>
          SKILLS
        </h2>
        {data.skills.technical.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Technical Skills:</h3>
            {styles.skillsGrid ? (
              <div className="grid grid-cols-2 gap-2 text-sm">
                {data.skills.technical.map((skill, index) => (
                  <div key={index} className={`${styles.accentColor} font-medium`}>• {skill}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700">{data.skills.technical.join(' • ')}</p>
            )}
          </div>
        )}
        {data.skills.soft.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Core Competencies:</h3>
            {styles.skillsGrid ? (
              <div className="grid grid-cols-2 gap-2 text-sm">
                {data.skills.soft.map((skill, index) => (
                  <div key={index} className={`${styles.accentColor} font-medium`}>• {skill}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700">{data.skills.soft.join(' • ')}</p>
            )}
          </div>
        )}
      </div>
    )
  );

  return { renderExperienceSection, renderEducationSection, renderSkillsSection };
};