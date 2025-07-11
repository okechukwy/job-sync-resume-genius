// Unified Layout Component - Replaces 6 separate layout components
import { ResumeData } from "@/hooks/useResumeSteps";
import { StylePreset } from "@/config/templateConfig";

interface UnifiedLayoutProps {
  data: ResumeData;
  stylePreset: StylePreset;
  formatDate: (dateString: string) => string;
}

export const UnifiedLayout = ({ data, stylePreset, formatDate }: UnifiedLayoutProps) => {
  // Add safety check for undefined stylePreset
  if (!stylePreset) {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto font-sans p-8">
        <div className="text-center text-gray-500">
          <p>Template configuration not found</p>
        </div>
      </div>
    );
  }

  const { layout, spacing } = stylePreset;
  
  // Apply dynamic CSS custom properties for theming
  const layoutStyle = {
    '--template-primary': `hsl(${stylePreset.primary})`,
    '--template-secondary': `hsl(${stylePreset.secondary})`,
    '--template-accent': `hsl(${stylePreset.accent})`,
    '--template-header-bg': stylePreset.headerBg.startsWith('linear-gradient') 
      ? stylePreset.headerBg 
      : `hsl(${stylePreset.headerBg})`,
    '--template-header-text': stylePreset.headerText.startsWith('hsl') 
      ? stylePreset.headerText 
      : `hsl(${stylePreset.headerText})`,
    '--template-section-border': `hsl(${stylePreset.sectionBorder})`,
  } as React.CSSProperties;

  const spacingClass = {
    compact: 'space-y-4',
    standard: 'space-y-6',
    spacious: 'space-y-8'
  }[spacing];

  const renderHeader = () => {
    // Different header styles based on layout
    const getHeaderContent = () => (
      <div className="relative z-10">
        <h1 className={`font-bold mb-2 ${layout === 'traditional' ? 'text-3xl' : layout === 'academic' ? 'text-2xl' : 'text-4xl'}`}>
          {data.personalInfo.fullName}
        </h1>
        {layout === 'academic' && (
          <p className="text-lg opacity-90 mb-2">
            Academic Professional
          </p>
        )}
        {layout !== 'academic' && (
          <p className="text-xl opacity-90 mb-4">
            {layout === 'traditional' ? 'Executive Professional' : 
             layout === 'sidebar' ? 'Modern Professional' : 'Professional'}
          </p>
        )}
        <div className={`flex flex-wrap gap-4 text-sm opacity-80 ${layout === 'academic' ? 'text-xs' : ''}`}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>
    );

    if (layout === 'traditional') {
      return (
        <header 
          className="p-6 text-white relative border-b-4"
          style={{ 
            background: 'var(--template-header-bg)', 
            color: 'var(--template-header-text)',
            borderColor: 'var(--template-section-border)'
          }}
        >
          {getHeaderContent()}
        </header>
      );
    }

    if (layout === 'academic') {
      return (
        <header 
          className="p-8 text-white relative"
          style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          {getHeaderContent()}
        </header>
      );
    }

    return (
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
        
        {(layout === 'professional' || layout === 'sidebar') && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/10"></div>
        )}
        
        {getHeaderContent()}
      </header>
    );
  };

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
                className="text-sm font-medium px-3 py-1 rounded-full"
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
            className="px-3 py-1 text-sm rounded-full border"
            style={{
              backgroundColor: 'var(--template-accent)',
              borderColor: 'var(--template-primary)',
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

      case 'sidebar':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {renderSkills()}
              {renderEducation()}
            </div>
            <div className="lg:col-span-3 space-y-6">
              {renderSummary()}
              {renderExperience()}
            </div>
          </div>
        );

      case 'traditional':
        return (
          <div className="space-y-8">
            {renderSummary()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {renderExperience()}
              </div>
              <div className="space-y-6">
                {renderEducation()}
                {renderSkills()}
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="space-y-6">
            {renderSummary()}
            {renderEducation()}
            {renderExperience()}
            {renderSkills()}
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