// Enhanced Unified Layout Component - Supports 20 Distinct Template Designs
import { ResumeData } from "@/hooks/useResumeSteps";
import { StylePreset } from "@/config/templateConfig";

interface UnifiedLayoutProps {
  data: ResumeData;
  stylePreset: StylePreset;
  formatDate: (dateString: string) => string;
}

export const UnifiedLayout = ({ data, stylePreset, formatDate }: UnifiedLayoutProps) => {
  // Safety check for undefined stylePreset
  if (!stylePreset) {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto font-sans p-8">
        <div className="text-center text-gray-500">
          <p>Template configuration not found</p>
        </div>
      </div>
    );
  }

  const { layout, spacing, typography, visualElements } = stylePreset;
  
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

  const typographyClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    modern: 'font-sans',
    technical: 'font-mono'
  }[typography];

  const renderDecorativeElements = () => {
    if (!visualElements.decorativeElements) return null;
    
    // Category-specific decorative elements
    if (stylePreset.id.includes('creative') || stylePreset.id.includes('graphic') || stylePreset.id.includes('art')) {
      return (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/15"></div>
          <div className="absolute top-1/2 right-8 w-8 h-8 rounded-full bg-white/10"></div>
        </div>
      );
    }
    
    if (stylePreset.id.includes('tech') || stylePreset.id.includes('developer') || stylePreset.id.includes('engineer')) {
      return (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-2 right-2 w-20 h-1 bg-white/30"></div>
          <div className="absolute top-4 right-2 w-16 h-1 bg-white/25"></div>
          <div className="absolute top-6 right-2 w-12 h-1 bg-white/20"></div>
        </div>
      );
    }
    
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/5"></div>
    );
  };

  const renderHeader = () => {
    const getHeaderContent = () => (
      <div className="relative z-10">
        <h1 className={`font-bold mb-2 ${
          visualElements.headerStyle === 'banner' ? 'text-4xl' : 
          visualElements.headerStyle === 'minimal' ? 'text-2xl' :
          visualElements.headerStyle === 'traditional' ? 'text-3xl' : 'text-4xl'
        }`}>
          {data.personalInfo.fullName}
        </h1>
        
        {/* Professional title based on template category */}
        <p className={`opacity-90 mb-4 ${
          visualElements.headerStyle === 'minimal' ? 'text-sm' : 'text-xl'
        }`}>
          {stylePreset.id.includes('executive') ? 'Executive Professional' :
           stylePreset.id.includes('academic') ? 'Academic Professional' :
           stylePreset.id.includes('creative') || stylePreset.id.includes('designer') ? 'Creative Professional' :
           stylePreset.id.includes('tech') || stylePreset.id.includes('engineer') ? 'Technical Professional' :
           'Professional'}
        </p>
        
        <div className={`flex flex-wrap gap-4 text-sm opacity-80 ${
          visualElements.headerStyle === 'minimal' ? 'text-xs' : ''
        }`}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>
    );

    // Header style variations
    switch (visualElements.headerStyle) {
      case 'banner':
        return (
          <header 
            className="p-8 text-white relative overflow-hidden border-b-4"
            style={{ 
              background: 'var(--template-header-bg)', 
              color: 'var(--template-header-text)',
              borderColor: 'var(--template-section-border)'
            }}
          >
            {renderDecorativeElements()}
            {getHeaderContent()}
          </header>
        );
      
      case 'centered':
        return (
          <header 
            className="p-8 text-white relative overflow-hidden text-center"
            style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
          >
            {renderDecorativeElements()}
            {getHeaderContent()}
          </header>
        );
      
      case 'split':
        return (
          <header 
            className="p-8 text-white relative overflow-hidden"
            style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
          >
            {renderDecorativeElements()}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {getHeaderContent()}
              </div>
              {visualElements.iconAccents && (
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                </div>
              )}
            </div>
          </header>
        );
      
      case 'minimal':
        return (
          <header 
            className="p-6 text-white relative"
            style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
          >
            {getHeaderContent()}
          </header>
        );
      
      case 'traditional':
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
      
      default:
        return (
          <header 
            className="p-8 text-white relative overflow-hidden"
            style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
          >
            {renderDecorativeElements()}
            {getHeaderContent()}
          </header>
        );
    }
  };

  const renderSection = (title: string, children: React.ReactNode, customBorder?: boolean) => {
    const borderStyle = customBorder && (layout === 'creative' || layout === 'portfolio') 
      ? 'border-l-4 pl-4 border-b-0' 
      : 'border-b-2';
      
    return (
      <section className="mb-6">
        <h2 
          className={`text-lg font-bold mb-4 pb-2 ${borderStyle} ${visualElements.iconAccents ? 'flex items-center gap-2' : ''}`}
          style={{ 
            borderColor: 'var(--template-section-border)',
            color: 'var(--template-primary)'
          }}
        >
          {visualElements.iconAccents && (
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--template-primary)' }}
            ></div>
          )}
          {title}
        </h2>
        {children}
      </section>
    );
  };

  const renderSummary = () => {
    if (!data.summary?.content) return null;
    
    return renderSection(
      "PROFESSIONAL SUMMARY", 
      <p className="text-gray-700 leading-relaxed avoid-break">{data.summary.content}</p>,
      true
    );
  };

  const renderExperience = () => {
    if (!data.experience?.length) return null;
    
    return renderSection(
      layout === 'professional' || layout === 'executive' ? "PROFESSIONAL EXPERIENCE" : "EXPERIENCE",
      <div className={spacingClass}>
        {data.experience.map((exp, index) => (
          <div key={index} className="space-y-2 avoid-break">
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
      true
    );
  };

  const renderEducation = () => {
    if (!data.education?.length) return null;
    
    return renderSection(
      "EDUCATION",
      <div className={spacingClass}>
        {data.education.map((edu, index) => (
          <div key={index} className="space-y-1 avoid-break">
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
      true
    );
  };

  const renderSkills = () => {
    if (!data.skills?.technical?.length && !data.skills?.soft?.length) return null;
    
    const allSkills = [...(data.skills.technical || []), ...(data.skills.soft || [])];
    const skillsDisplay = layout === 'technical' || layout === 'developer' ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-2';
    
    return renderSection(
      layout === 'technical' || layout === 'developer' ? "TECHNICAL SKILLS" : "SKILLS",
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
      true
    );
  };

  const renderCertificates = () => {
    if (!data.certificates?.length) return null;
    
    return renderSection(
      "CERTIFICATIONS",
      <div className={spacingClass}>
        {data.certificates.map((cert, index) => (
          <div key={index} className="space-y-2 avoid-break">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuer}</p>
                {cert.credentialId && (
                  <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(cert.issueDate)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </span>
            </div>
          </div>
        ))}
      </div>,
      true
    );
  };

  const renderProjects = () => {
    if (!data.projects?.length) return null;
    
    return renderSection(
      "PROJECTS",
      <div className={spacingClass}>
        {data.projects.map((project, index) => (
          <div key={index} className="space-y-2 avoid-break">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-700 text-sm leading-relaxed mt-1">{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
              </span>
            </div>
          </div>
        ))}
      </div>,
      true
    );
  };

  const renderLanguages = () => {
    if (!data.languages?.length) return null;
    
    return renderSection(
      "LANGUAGES",
      <div className="grid grid-cols-2 gap-3">
        {data.languages.map((lang, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-medium text-gray-900">{lang.language}</span>
            <span className="text-sm text-gray-600">{lang.proficiency}</span>
          </div>
        ))}
      </div>,
      true
    );
  };

  const renderVolunteering = () => {
    if (!data.volunteering?.length) return null;
    
    return renderSection(
      "VOLUNTEERING",
      <div className={spacingClass}>
        {data.volunteering.map((vol, index) => (
          <div key={index} className="space-y-2 avoid-break">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                <p className="text-gray-600">{vol.organization}</p>
                {vol.description && (
                  <p className="text-gray-700 text-sm leading-relaxed mt-1">{vol.description}</p>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}
              </span>
            </div>
          </div>
        ))}
      </div>,
      true
    );
  };

  const renderAwards = () => {
    if (!data.awards?.length) return null;
    
    return renderSection(
      "AWARDS & ACHIEVEMENTS",
      <div className={spacingClass}>
        {data.awards.map((award, index) => (
          <div key={index} className="space-y-2 avoid-break">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{award.title}</h3>
                <p className="text-gray-600">{award.issuer}</p>
                {award.description && (
                  <p className="text-gray-700 text-sm leading-relaxed mt-1">{award.description}</p>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(award.date)}
              </span>
            </div>
          </div>
        ))}
      </div>,
      true
    );
  };

  const renderPublications = () => {
    if (!data.publications?.length) return null;
    
    return renderSection(
      "PUBLICATIONS",
      <div className={spacingClass}>
        {data.publications.map((pub, index) => (
          <div key={index} className="space-y-2 avoid-break">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{pub.title}</h3>
                <p className="text-gray-600">{pub.publisher}</p>
                {pub.description && (
                  <p className="text-gray-700 text-sm leading-relaxed mt-1">{pub.description}</p>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(pub.date)}
              </span>
            </div>
          </div>
        ))}
      </div>,
      true
    );
  };

  const renderInterests = () => {
    if (!data.interests?.interests?.length) return null;
    
    return renderSection(
      "INTERESTS & HOBBIES",
      <div className="flex flex-wrap gap-2">
        {data.interests.interests.map((interest, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm rounded-full border"
            style={{
              backgroundColor: 'var(--template-accent)',
              borderColor: 'var(--template-primary)',
              color: 'var(--template-secondary)'
            }}
          >
            {interest}
          </span>
        ))}
      </div>,
      true
    );
  };

  const renderAdditionalInfo = () => {
    if (!data.additionalInfo?.content) return null;
    
    return renderSection(
      "ADDITIONAL INFORMATION", 
      <p className="text-gray-700 leading-relaxed avoid-break">{data.additionalInfo.content}</p>,
      true
    );
  };

  const renderContent = () => {
    switch (layout) {
      case 'portfolio':
      case 'creative':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {renderSummary()}
              {renderExperience()}
              {renderProjects()}
              {renderAwards()}
              {renderPublications()}
            </div>
            <div className="space-y-6">
              {renderEducation()}
              {renderSkills()}
              {renderCertificates()}
              {renderLanguages()}
              {renderVolunteering()}
              {renderInterests()}
              {renderAdditionalInfo()}
            </div>
          </div>
        );
      
      case 'technical':
      case 'developer':
        return (
          <div className="space-y-6">
            {renderSkills()}
            {renderProjects()}
            {renderCertificates()}
            {renderSummary()}
            {renderExperience()}
            {renderEducation()}
            {renderLanguages()}
            {renderVolunteering()}
            {renderAwards()}
            {renderPublications()}
            {renderInterests()}
            {renderAdditionalInfo()}
          </div>
        );

      case 'sidebar':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {renderSkills()}
              {renderEducation()}
              {renderCertificates()}
              {renderLanguages()}
              {renderInterests()}
            </div>
            <div className="lg:col-span-3 space-y-6">
              {renderSummary()}
              {renderExperience()}
              {renderProjects()}
              {renderVolunteering()}
              {renderAwards()}
              {renderPublications()}
              {renderAdditionalInfo()}
            </div>
          </div>
        );

      case 'traditional':
      case 'executive':
        return (
          <div className="space-y-8">
            {renderSummary()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {renderExperience()}
                {renderProjects()}
                {renderVolunteering()}
              </div>
              <div className="space-y-6">
                {renderEducation()}
                {renderSkills()}
                {renderCertificates()}
                {renderAwards()}
                {renderLanguages()}
                {renderPublications()}
                {renderInterests()}
                {renderAdditionalInfo()}
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="space-y-6">
            {renderSummary()}
            {renderEducation()}
            {renderPublications()}
            {renderCertificates()}
            {renderExperience()}
            {renderProjects()}
            {renderSkills()}
            {renderAwards()}
            {renderLanguages()}
            {renderVolunteering()}
            {renderInterests()}
            {renderAdditionalInfo()}
          </div>
        );
      
      default: // professional
        return (
          <div className="space-y-6">
            {renderSummary()}
            {renderExperience()}
            {renderEducation()}
            {renderSkills()}
            {renderCertificates()}
            {renderProjects()}
            {renderLanguages()}
            {renderVolunteering()}
            {renderAwards()}
            {renderPublications()}
            {renderInterests()}
            {renderAdditionalInfo()}
          </div>
        );
    }
  };

  return (
    <div 
      className={`bg-white mx-auto ${typographyClass}`}
      style={{
        ...layoutStyle,
        maxWidth: '210mm', // A4 width constraint
        width: '100%',
      }}
    >
      {renderHeader()}
      <main className={`${spacing === 'compact' ? 'p-6' : spacing === 'spacious' ? 'p-12' : 'p-8'}`}>
        {renderContent()}
      </main>
    </div>
  );
};
