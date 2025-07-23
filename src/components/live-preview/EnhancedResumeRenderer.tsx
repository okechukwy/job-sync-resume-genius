import { ResumeData } from "@/hooks/useResumeSteps";
import { InlineEditor } from "./InlineEditor";
import { getTemplateById } from "@/config/templateConfig";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface EnhancedResumeRendererProps {
  data: ResumeData;
  templateId: string;
  onFieldUpdate: (section: keyof ResumeData, fieldPath: string, value: any) => void;
  onFieldFocus: (fieldName: string) => void;
  onFieldBlur: () => void;
  currentFont: string;
  currentFontSize: string;
  formatDate: (dateString: string) => string;
}

export const EnhancedResumeRenderer = ({
  data,
  templateId,
  onFieldUpdate,
  onFieldFocus,
  onFieldBlur,
  currentFont,
  currentFontSize,
  formatDate,
}: EnhancedResumeRendererProps) => {
  const template = getTemplateById(templateId);
  
  if (!template) {
    return <div>Template not found</div>;
  }

  const handleFieldChange = (section: keyof ResumeData, fieldPath: string, value: string) => {
    onFieldUpdate(section, fieldPath, value);
  };

  return (
    <div 
      className="resume-content"
      style={{ 
        fontFamily: currentFont,
        fontSize: `${currentFontSize}px`,
        lineHeight: '1.5',
        color: '#333'
      }}
    >
      {/* Header Section */}
      <header className="mb-6 text-center border-b-2 border-blue-600 pb-4">
        <InlineEditor
          value={data.personalInfo.fullName}
          onChange={(value) => handleFieldChange('personalInfo', 'fullName', value)}
          onFocus={() => onFieldFocus('personalInfo.fullName')}
          onBlur={onFieldBlur}
          className="text-3xl font-bold text-blue-800 mb-2"
          fontSize="32px"
          fontWeight="bold"
          textAlign="center"
          placeholder="Your Full Name"
        />
        
        <div className="text-lg text-gray-600 mb-3 text-center">
          Professional Title
        </div>

        {/* Contact Information */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <InlineEditor
            value={data.summary.content}
            onChange={(value) => handleFieldChange('summary', 'content', value)}
            onFocus={() => onFieldFocus('summary.content')}
            onBlur={onFieldBlur}
            multiline={true}
            className="text-gray-700 leading-relaxed"
            placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
          />
        </section>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-200 pl-4">
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
                      className="font-semibold text-lg text-gray-800"
                      fontSize="18px"
                      fontWeight="600"
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
                      className="text-blue-600 font-medium"
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    <InlineEditor
                      value={`${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate || '')}`}
                      onChange={(value) => {
                        // Handle date parsing logic here
                        console.log('Date change:', value);
                      }}
                      onFocus={() => onFieldFocus(`experience.${index}.dates`)}
                      onBlur={onFieldBlur}
                      placeholder="Start Date - End Date"
                    />
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
                  className="text-gray-700 mt-2"
                  placeholder="Describe your key responsibilities and achievements in this role..."
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-300 pb-1">
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
                    className="font-semibold text-gray-800"
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
                    className="text-blue-600"
                    placeholder="Institution"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <InlineEditor
                    value={formatDate(edu.endDate)}
                    onChange={(value) => {
                      // Handle date parsing
                      console.log('Education date change:', value);
                    }}
                    onFocus={() => onFieldFocus(`education.${index}.endDate`)}
                    onBlur={onFieldBlur}
                    placeholder="Graduation Date"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && (data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-300 pb-1">
            Technical Skills
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
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
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
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                placeholder="Soft Skill"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};