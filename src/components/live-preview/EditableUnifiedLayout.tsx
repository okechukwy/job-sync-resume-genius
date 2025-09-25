// Editable Unified Layout Component - Extends UnifiedLayout with inline editing
import { ResumeData } from "@/hooks/useResumeSteps";
import { StylePreset } from "@/config/templateConfig";
import { InlineEditor } from "./InlineEditor";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface EditableUnifiedLayoutProps {
  data: ResumeData;
  stylePreset: StylePreset;
  formatDate: (dateString: string) => string;
  onFieldUpdate: (section: keyof ResumeData, fieldPath: string, value: any) => void;
  onFieldFocus: (fieldName: string) => void;
  onFieldBlur: () => void;
}

export const EditableUnifiedLayout = ({ 
  data, 
  stylePreset, 
  formatDate,
  onFieldUpdate,
  onFieldFocus,
  onFieldBlur
}: EditableUnifiedLayoutProps) => {
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

  const handleFieldChange = (section: keyof ResumeData, fieldPath: string, value: string) => {
    onFieldUpdate(section, fieldPath, value);
  };

  const renderHeader = () => {
    const getHeaderContent = () => (
      <div className="relative z-10">
        <InlineEditor
          value={data.personalInfo.fullName}
          onChange={(value) => handleFieldChange('personalInfo', 'fullName', value)}
          onFocus={() => onFieldFocus('personalInfo.fullName')}
          onBlur={onFieldBlur}
          className={`font-bold mb-2 ${
            visualElements.headerStyle === 'banner' ? 'text-4xl' : 
            visualElements.headerStyle === 'minimal' ? 'text-2xl' :
            visualElements.headerStyle === 'traditional' ? 'text-3xl' : 'text-4xl'
          }`}
          placeholder="Your Full Name"
        />
        
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

        {/* Contact Information */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <InlineEditor
                value={data.personalInfo.email}
                onChange={(value) => handleFieldChange('personalInfo', 'email', value)}
                onFocus={() => onFieldFocus('personalInfo.email')}
                onBlur={onFieldBlur}
                placeholder="email@example.com"
              />
            </div>
          )}
          
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <InlineEditor
                value={data.personalInfo.phone}
                onChange={(value) => handleFieldChange('personalInfo', 'phone', value)}
                onFocus={() => onFieldFocus('personalInfo.phone')}
                onBlur={onFieldBlur}
                placeholder="(555) 123-4567"
              />
            </div>
          )}
          
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <InlineEditor
                value={data.personalInfo.location}
                onChange={(value) => handleFieldChange('personalInfo', 'location', value)}
                onFocus={() => onFieldFocus('personalInfo.location')}
                onBlur={onFieldBlur}
                placeholder="City, State"
              />
            </div>
          )}
          
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <InlineEditor
                value={data.personalInfo.website}
                onChange={(value) => handleFieldChange('personalInfo', 'website', value)}
                onFocus={() => onFieldFocus('personalInfo.website')}
                onBlur={onFieldBlur}
                placeholder="www.portfolio.com"
              />
            </div>
          )}
          
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <InlineEditor
                value={data.personalInfo.linkedin}
                onChange={(value) => handleFieldChange('personalInfo', 'linkedin', value)}
                onFocus={() => onFieldFocus('personalInfo.linkedin')}
                onBlur={onFieldBlur}
                placeholder="linkedin.com/in/profile"
              />
            </div>
          )}
        </div>
      </div>
    );

    // Apply header styling based on template
    switch (visualElements.headerStyle) {
      case 'banner':
        return (
          <header 
            className="relative py-8 px-6 mb-6 rounded-lg"
            style={{ background: stylePreset.headerBg }}
          >
            {getHeaderContent()}
          </header>
        );
      
      case 'centered':
        return (
          <header className="text-center py-6 mb-6">
            {getHeaderContent()}
          </header>
        );
      
      case 'centered':
        return (
          <header className="flex justify-between items-start py-6 mb-6">
            <div className="flex-1 text-center">
              {getHeaderContent()}
            </div>
          </header>
        );
      
      case 'minimal':
        return (
          <header className="py-4 mb-6 border-b-2" style={{ borderColor: `hsl(${stylePreset.sectionBorder})` }}>
            {getHeaderContent()}
          </header>
        );
      
      default: // traditional
        return (
          <header className="py-6 mb-6">
            {getHeaderContent()}
          </header>
        );
    }
  };

  const renderSummary = () => {
    if (!data.summary?.content) return null;
    
    return (
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" style={{ color: `hsl(${stylePreset.primary})` }}>
          Professional Summary
        </h2>
        <InlineEditor
          value={data.summary.content}
          onChange={(value) => handleFieldChange('summary', 'content', value)}
          onFocus={() => onFieldFocus('summary.content')}
          onBlur={onFieldBlur}
          multiline={true}
          className="leading-relaxed"
          placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
        />
      </section>
    );
  };

  const renderExperience = () => {
    if (!data.experience || data.experience.length === 0) return null;
    
    return (
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" style={{ color: `hsl(${stylePreset.primary})` }}>
          Professional Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="border-l-4 pl-4" style={{ borderColor: `hsl(${stylePreset.accent})` }}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <InlineEditor
                    value={exp.position}
                    onChange={(value) => {
                      const updated = [...data.experience];
                      updated[index] = { ...exp, position: value };
                      onFieldUpdate('experience', '', updated);
                    }}
                    onFocus={() => onFieldFocus(`experience.${index}.position`)}
                    onBlur={onFieldBlur}
                    className="font-semibold text-lg"
                    placeholder="Job Title"
                  />
                  <InlineEditor
                    value={exp.company}
                    onChange={(value) => {
                      const updated = [...data.experience];
                      updated[index] = { ...exp, company: value };
                      onFieldUpdate('experience', '', updated);
                    }}
                    onFocus={() => onFieldFocus(`experience.${index}.company`)}
                    onBlur={onFieldBlur}
                    className="font-medium"
                    style={{ color: `hsl(${stylePreset.secondary})` }}
                    placeholder="Company Name"
                  />
                </div>
                <div className="text-sm text-gray-500 ml-4">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                </div>
              </div>
              
              <InlineEditor
                value={exp.description}
                onChange={(value) => {
                  const updated = [...data.experience];
                  updated[index] = { ...exp, description: value };
                  onFieldUpdate('experience', '', updated);
                }}
                onFocus={() => onFieldFocus(`experience.${index}.description`)}
                onBlur={onFieldBlur}
                multiline={true}
                className="mt-2"
                placeholder="Describe your key responsibilities and achievements in this role..."
              />
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    if (!data.education || data.education.length === 0) return null;
    
    return (
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" style={{ color: `hsl(${stylePreset.primary})` }}>
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1">
                <InlineEditor
                  value={edu.degree}
                  onChange={(value) => {
                    const updated = [...data.education];
                    updated[index] = { ...edu, degree: value };
                    onFieldUpdate('education', '', updated);
                  }}
                  onFocus={() => onFieldFocus(`education.${index}.degree`)}
                  onBlur={onFieldBlur}
                  className="font-semibold"
                  placeholder="Degree"
                />
                <InlineEditor
                  value={edu.school}
                  onChange={(value) => {
                    const updated = [...data.education];
                    updated[index] = { ...edu, school: value };
                    onFieldUpdate('education', '', updated);
                  }}
                  onFocus={() => onFieldFocus(`education.${index}.school`)}
                  onBlur={onFieldBlur}
                  style={{ color: `hsl(${stylePreset.secondary})` }}
                  placeholder="Institution"
                />
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(edu.endDate)}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    if (!data.skills || (data.skills.technical.length === 0 && data.skills.soft.length === 0)) return null;
    
    return (
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3" style={{ color: `hsl(${stylePreset.primary})` }}>
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.technical.map((skill, index) => (
            <InlineEditor
              key={`tech-${index}`}
              value={skill}
              onChange={(value) => {
                const updated = [...data.skills.technical];
                updated[index] = value;
                onFieldUpdate('skills', 'technical', updated);
              }}
              onFocus={() => onFieldFocus(`skills.technical.${index}`)}
              onBlur={onFieldBlur}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `hsl(${stylePreset.accent})`,
                color: `hsl(${stylePreset.primary})`
              }}
              placeholder="Technical Skill"
            />
          ))}
          {data.skills.soft.map((skill, index) => (
            <InlineEditor
              key={`soft-${index}`}
              value={skill}
              onChange={(value) => {
                const updated = [...data.skills.soft];
                updated[index] = value;
                onFieldUpdate('skills', 'soft', updated);
              }}
              onFocus={() => onFieldFocus(`skills.soft.${index}`)}
              onBlur={onFieldBlur}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `hsl(${stylePreset.accent})`,
                color: `hsl(${stylePreset.primary})`
              }}
              placeholder="Soft Skill"
            />
          ))}
        </div>
      </section>
    );
  };

  const renderContent = () => {
    switch (layout) {
      case 'sidebar':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {renderSummary()}
              {renderExperience()}
            </div>
            <div className="lg:col-span-1">
              {renderEducation()}
              {renderSkills()}
            </div>
          </div>
        );
      
      case 'academic':
        return (
          <div className="space-y-6">
            {renderSummary()}
            {renderExperience()}
            {renderEducation()}
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
