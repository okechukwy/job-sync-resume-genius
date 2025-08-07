import { ResumeData } from "@/hooks/useResumeSteps";
import { StylePreset } from "@/config/templateConfig";

interface ExportOptimizedLayoutProps {
  data: ResumeData;
  stylePreset: StylePreset;
  formatDate: (dateString: string) => string;
}

export const ExportOptimizedLayout = ({ data, stylePreset, formatDate }: ExportOptimizedLayoutProps) => {
  if (!stylePreset) {
    return (
      <div className="export-layout">
        <p>Template configuration not found</p>
      </div>
    );
  }

  const renderHeader = () => (
    <header className="export-header avoid-break">
      <h1 className="export-name">{data.personalInfo.fullName}</h1>
      <div className="export-title">
        {stylePreset.id.includes('executive') ? 'Executive Professional' :
         stylePreset.id.includes('academic') ? 'Academic Professional' :
         stylePreset.id.includes('creative') || stylePreset.id.includes('designer') ? 'Creative Professional' :
         stylePreset.id.includes('tech') || stylePreset.id.includes('engineer') ? 'Technical Professional' :
         'Professional'}
      </div>
      <div className="export-contact">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
      </div>
    </header>
  );

  const renderSummary = () => {
    if (!data.summary?.content) return null;
    return (
      <section className="export-section avoid-break">
        <h2 className="export-section-title">PROFESSIONAL SUMMARY</h2>
        <p className="export-content">{data.summary.content}</p>
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience?.length) return null;
    return (
      <section className="export-section">
        <h2 className="export-section-title">PROFESSIONAL EXPERIENCE</h2>
        <div className="export-items">
          {data.experience.map((exp, index) => (
            <div key={index} className="export-item avoid-break">
              <div className="export-item-header">
                <div>
                  <h3 className="export-item-title">{exp.position}</h3>
                  <p className="export-item-company">{exp.company}</p>
                </div>
                <span className="export-item-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              {exp.description && (
                <p className="export-item-description">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    if (!data.education?.length) return null;
    return (
      <section className="export-section">
        <h2 className="export-section-title">EDUCATION</h2>
        <div className="export-items">
          {data.education.map((edu, index) => (
            <div key={index} className="export-item avoid-break">
              <div className="export-item-header">
                <div>
                  <h3 className="export-item-title">{edu.degree}</h3>
                  <p className="export-item-company">{edu.school}</p>
                  {edu.field && <p className="export-item-field">{edu.field}</p>}
                </div>
                <span className="export-item-date">
                  {formatDate(edu.endDate)}
                </span>
              </div>
              {edu.gpa && (
                <p className="export-item-gpa">GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (!data.skills?.technical?.length && !data.skills?.soft?.length) return null;
    
    const allSkills = [...(data.skills.technical || []), ...(data.skills.soft || [])];
    
    return (
      <section className="export-section avoid-break">
        <h2 className="export-section-title">SKILLS</h2>
        <div className="export-skills">
          {allSkills.map((skill, index) => (
            <span key={index} className="export-skill">
              {skill}
            </span>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="export-layout">
      {renderHeader()}
      <main className="export-content">
        {renderSummary()}
        {renderExperience()}
        {renderEducation()}
        {renderSkills()}
      </main>
    </div>
  );
};