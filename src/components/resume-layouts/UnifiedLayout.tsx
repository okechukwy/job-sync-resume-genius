// Unified Layout Component - Replaces 6 separate layout components
import { ResumeData } from "@/hooks/useResumeSteps";
import { StylePreset } from "@/config/templateConfig";

interface UnifiedLayoutProps {
  data: ResumeData;
  stylePreset: StylePreset;
  formatDate: (dateString: string) => string;
}

export const UnifiedLayout = ({ data, stylePreset, formatDate }: UnifiedLayoutProps) => {
  const { layout, spacing } = stylePreset;
  
  // Apply dynamic CSS custom properties for theming
  const layoutStyle = {
    '--template-primary': `hsl(${stylePreset.primary})`,
    '--template-secondary': `hsl(${stylePreset.secondary})`,
    '--template-accent': `hsl(${stylePreset.accent})`,
    '--template-header-bg': stylePreset.headerBg.startsWith('linear-gradient') 
      ? stylePreset.headerBg 
      : `hsl(${stylePreset.headerBg})`,
    '--template-header-text': `hsl(${stylePreset.headerText})`,
    '--template-section-border': `hsl(${stylePreset.sectionBorder})`,
  } as React.CSSProperties;

  const spacingClass = {
    compact: 'space-y-4',
    standard: 'space-y-6',
    spacious: 'space-y-8'
  }[spacing];

  const renderHeader = () => (
    <header 
      className="p-8 text-white relative overflow-hidden"
      style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
    >
      {layout === 'creative' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/15"></div>
        </div>
      )}
      
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-2">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-xl opacity-90 mb-4">Professional Resume</p>
        <div className="flex flex-wrap gap-4 text-sm opacity-80">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>
    </header>
  );

  const renderSection = (title: string, children: React.ReactNode, borderStyle?: string) => (
    <section className="mb-6">
      <h2 
        className={`text-lg font-bold mb-4 pb-2 ${borderStyle || 'border-b-2'}`}
        style={{ 
          borderColor: 'var(--template-section-border)',
          color: 'var(--template-primary)'
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );

  const renderSummary = () => {
    if (!data.summary?.content) return null;
    
    return renderSection(
      "PROFESSIONAL SUMMARY", 
      <p className="text-gray-700 leading-relaxed">{data.summary.content}</p>,
      layout === 'creative' ? 'border-l-4 pl-4 border-b-0' : undefined
    );
  };

  const renderExperience = () => {
    if (!data.experience?.length) return null;
    
    return renderSection(
      layout === 'professional' ? "PROFESSIONAL EXPERIENCE" : "EXPERIENCE",
      <div className={spacingClass}>
        {data.experience.map((exp, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-600">{exp.company}</p>
              </div>
              <span 
                className="text-sm font-medium px-2 py-1 rounded"
                style={{ 
                  backgroundColor: 'var(--template-accent)',
                  color: 'var(--template-secondary)'
                }}
              >
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
              </span>
            </div>
            {exp.description && (
              <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
            )}
          </div>
        ))}
      </div>,
      layout === 'creative' ? 'border-l-4 pl-4 border-b-0' : undefined
    );
  };

  const renderEducation = () => {
    if (!data.education?.length) return null;
    
    return renderSection(
      "EDUCATION",
      <div className={spacingClass}>
        {data.education.map((edu, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.school}</p>
                {edu.field && <p className="text-sm text-gray-500">{edu.field}</p>}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(edu.endDate)}
              </span>
            </div>
            {edu.gpa && (
              <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
            )}
          </div>
        ))}
      </div>,
      layout === 'creative' ? 'border-l-4 pl-4 border-b-0' : undefined
    );
  };

  const renderSkills = () => {
    if (!data.skills?.technical?.length && !data.skills?.soft?.length) return null;
    
    const allSkills = [...(data.skills.technical || []), ...(data.skills.soft || [])];
    const skillsDisplay = layout === 'technical' ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-2';
    
    return renderSection(
      layout === 'technical' ? "TECHNICAL SKILLS" : "SKILLS",
      <div className={skillsDisplay}>
        {allSkills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm rounded-full"
            style={{
              backgroundColor: 'var(--template-accent)',
              color: 'var(--template-secondary)'
            }}
          >
            {skill}
          </span>
        ))}
      </div>,
      layout === 'creative' ? 'border-l-4 pl-4 border-b-0' : undefined
    );
  };

  // Layout-specific content organization
  const renderContent = () => {
    switch (layout) {
      case 'creative':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {renderSummary()}
              {renderExperience()}
            </div>
            <div className="space-y-6">
              {renderEducation()}
              {renderSkills()}
            </div>
          </div>
        );
      
      case 'technical':
        return (
          <div className="space-y-6">
            {renderSkills()}
            {renderSummary()}
            {renderExperience()}
            {renderEducation()}
          </div>
        );
      
      default: // professional
        return (
          <div className="space-y-6">
            {renderSummary()}
            {renderExperience()}
            {renderEducation()}
            {renderSkills()}
          </div>
        );
    }
  };

  return (
    <div 
      className="bg-white shadow-lg max-w-4xl mx-auto font-sans"
      style={layoutStyle}
    >
      {renderHeader()}
      <main className="p-8">
        {renderContent()}
      </main>
    </div>
  );
};