import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin,
  Calendar
} from "lucide-react";
import { StructuredResume, ExperienceBlock, EducationBlock, HeaderData } from "@/utils/resumeStructureParser";

interface AppliedSuggestion {
  id: string;
  originalText: string;
  newText: string;
  section: string;
  timestamp: number;
}

interface ATSResumeDisplayProps {
  structuredResume: StructuredResume;
  appliedSuggestions: AppliedSuggestion[];
  showChanges: boolean;
  content: string;
}

export const ATSResumeDisplay = memo(({ 
  structuredResume, 
  appliedSuggestions, 
  showChanges,
  content 
}: ATSResumeDisplayProps) => {
  
  const highlightChanges = (text: string): string => {
    if (!showChanges || !appliedSuggestions.length) return text;
    
    let highlightedText = text;
    appliedSuggestions.forEach(suggestion => {
      const regex = new RegExp(suggestion.newText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      highlightedText = highlightedText.replace(regex, 
        `<mark class="bg-primary/20 px-1 rounded font-medium">${suggestion.newText}</mark>`
      );
    });
    
    return highlightedText;
  };

  // If we don't have structured data, display the raw content in a clean format
  if (!structuredResume?.sections?.length) {
    const lines = content.split('\n').filter(line => line.trim());
    let currentSection = '';
    
    return (
      <div className="ats-resume bg-white text-black p-8 max-w-4xl mx-auto font-sans leading-relaxed">
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return null;
          
          // Check if this is a section header
          const isHeader = /^[A-Z\s]{2,}$/.test(trimmedLine) && 
                          (trimmedLine.includes('EXPERIENCE') || 
                           trimmedLine.includes('EDUCATION') || 
                           trimmedLine.includes('SKILLS') || 
                           trimmedLine.includes('SUMMARY'));
          
          // Check if this looks like a name (first few lines, mixed case, not too long)
          const isName = index < 3 && /^[A-Za-z\s]{2,50}$/.test(trimmedLine) && 
                        !trimmedLine.includes('@') && !trimmedLine.includes('(');
          
          // Check if this is contact info
          const isContact = trimmedLine.includes('@') || 
                           trimmedLine.includes('(') || 
                           trimmedLine.includes('linkedin') ||
                           /\d{3}[-.]?\d{3}[-.]?\d{4}/.test(trimmedLine);
          
          if (isName && index < 3) {
            return (
              <h1 key={index} className="text-2xl font-bold text-center mb-2">
                <span dangerouslySetInnerHTML={{ __html: highlightChanges(trimmedLine) }} />
              </h1>
            );
          }
          
          if (isContact) {
            return (
              <div key={index} className="text-center text-gray-700 mb-4">
                <span dangerouslySetInnerHTML={{ __html: highlightChanges(trimmedLine) }} />
              </div>
            );
          }
          
          if (isHeader) {
            currentSection = trimmedLine;
            return (
              <div key={index} className="mt-6 mb-3">
                <h2 className="text-lg font-semibold uppercase tracking-wide border-b-2 border-gray-300 pb-1">
                  {trimmedLine}
                </h2>
              </div>
            );
          }
          
          // Regular content
          const isBulletPoint = trimmedLine.startsWith('•') || 
                               trimmedLine.startsWith('-') || 
                               trimmedLine.startsWith('*');
          
          if (isBulletPoint) {
            return (
              <div key={index} className="mb-1 ml-4">
                <span dangerouslySetInnerHTML={{ 
                  __html: highlightChanges(trimmedLine.replace(/^[•\-*]\s*/, '• ')) 
                }} />
              </div>
            );
          }
          
          // Job titles, company names, dates
          const hasDate = /\d{4}/.test(trimmedLine);
          const isJobTitle = currentSection.includes('EXPERIENCE') && 
                            (hasDate || index > 0 && lines[index-1].includes('EXPERIENCE'));
          
          if (isJobTitle) {
            return (
              <div key={index} className="mt-4 mb-2">
                <h3 className="font-semibold text-base">
                  <span dangerouslySetInnerHTML={{ __html: highlightChanges(trimmedLine) }} />
                </h3>
              </div>
            );
          }
          
          return (
            <div key={index} className="mb-2">
              <span dangerouslySetInnerHTML={{ __html: highlightChanges(trimmedLine) }} />
            </div>
          );
        })}
        
        {/* Applied Changes Summary */}
        {showChanges && appliedSuggestions.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-300">
            <div className="text-sm text-gray-600">
              <Badge variant="secondary" className="mb-2">
                {appliedSuggestions.length} optimization{appliedSuggestions.length !== 1 ? 's' : ''} applied
              </Badge>
              <p className="text-xs">
                Highlighted sections show recent ATS optimizations
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render structured resume (keep existing structured rendering logic)
  const renderHeader = (data: HeaderData) => (
    <div className="mb-8">
      {/* Name and Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {data.name || 'Your Name'}
        </h1>
        {data.title && (
          <h2 className="text-xl text-muted-foreground font-medium">
            {data.title}
          </h2>
        )}
      </div>

      {/* Contact Information */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        {data.contact.email && (
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>{data.contact.email}</span>
          </div>
        )}
        {data.contact.phone && (
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>{data.contact.phone}</span>
          </div>
        )}
        {data.contact.location && (
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{data.contact.location}</span>
          </div>
        )}
        {data.contact.website && (
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span>{data.contact.website}</span>
          </div>
        )}
        {data.contact.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="h-4 w-4" />
            <span>{data.contact.linkedin}</span>
          </div>
        )}
      </div>
      
      <Separator className="mt-6" />
    </div>
  );

  const renderExperienceBlock = (block: ExperienceBlock, index: number) => (
    <div key={index} className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-foreground text-lg">
            {block.title || 'Job Title'}
          </h3>
          <p className="text-muted-foreground font-medium">
            {block.company || 'Company Name'}
          </p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          {block.dates && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{block.dates}</span>
            </div>
          )}
          {block.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              <span>{block.location}</span>
            </div>
          )}
        </div>
      </div>
      
      {block.responsibilities && block.responsibilities.length > 0 && (
        <ul className="list-disc list-inside space-y-1 text-foreground text-sm leading-relaxed ml-2">
          {block.responsibilities.map((resp, respIndex) => (
            <li 
              key={respIndex}
              dangerouslySetInnerHTML={{ __html: highlightChanges(resp) }}
            />
          ))}
        </ul>
      )}
    </div>
  );

  const renderEducationBlock = (block: EducationBlock, index: number) => (
    <div key={index} className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-foreground">
            {block.degree || 'Degree'}
          </h3>
          <p className="text-muted-foreground">
            {block.institution || 'Institution'}
          </p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          {block.dates && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{block.dates}</span>
            </div>
          )}
          {block.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              <span>{block.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSkillsList = (skills: string[]) => (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge 
          key={index} 
          variant="secondary" 
          className="text-xs"
          dangerouslySetInnerHTML={{ __html: highlightChanges(skill) }}
        />
      ))}
    </div>
  );

  const renderSection = (section: any) => {
    const sectionTitle = section.title || 'Untitled Section';
    
    // Skip header section as it's rendered separately
    if (section.type === 'header') return null;

    return (
      <div key={section.id} className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
          {sectionTitle.toUpperCase()}
        </h2>
        
        {section.content?.type === 'experience_block' && Array.isArray(section.content.data) && (
          <div className="space-y-4">
            {section.content.data.map((block: ExperienceBlock, index: number) => 
              renderExperienceBlock(block, index)
            )}
          </div>
        )}
        
        {section.content?.type === 'education_block' && Array.isArray(section.content.data) && (
          <div className="space-y-4">
            {section.content.data.map((block: EducationBlock, index: number) => 
              renderEducationBlock(block, index)
            )}
          </div>
        )}
        
        {section.content?.type === 'skills_list' && Array.isArray(section.content.data) && (
          renderSkillsList(section.content.data)
        )}
        
        {section.content?.type === 'list' && Array.isArray(section.content.data) && (
          <ul className="list-disc list-inside space-y-1 text-foreground text-sm leading-relaxed ml-2">
            {section.content.data.map((item: string, index: number) => (
              <li 
                key={index}
                dangerouslySetInnerHTML={{ __html: highlightChanges(item) }}
              />
            ))}
          </ul>
        )}
        
        {section.content?.type === 'paragraph' && (
          <div 
            className="text-foreground text-sm leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ 
              __html: highlightChanges(section.content.data || '') 
            }}
          />
        )}
      </div>
    );
  };

  // Find header section
  const headerSection = structuredResume.sections.find(s => s.type === 'header');
  const otherSections = structuredResume.sections.filter(s => s.type !== 'header');

  return (
    <div className="cv-document bg-background text-foreground p-8 max-w-4xl mx-auto font-sans">
      {/* Professional Header */}
      {headerSection ? (
        renderHeader(headerSection.content.data as HeaderData)
      ) : (
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Professional Resume
            </h1>
            <h2 className="text-xl text-muted-foreground font-medium">
              ATS-Optimized Format
            </h2>
          </div>
          <Separator className="mt-6" />
        </div>
      )}
      
      {/* Resume Sections */}
      <div className="space-y-8">
        {otherSections.length > 0 ? (
          otherSections.map(renderSection)
        ) : (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-foreground text-sm leading-relaxed">
                Results-driven professional with expertise in delivering high-quality solutions and contributing to organizational success.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-6">
                {renderExperienceBlock({
                  title: 'Professional Position',
                  company: 'Company Name',
                  dates: '2020 - Present',
                  location: 'Location',
                  responsibilities: [
                    'Led cross-functional teams to deliver strategic initiatives',
                    'Improved operational efficiency through process optimization',
                    'Collaborated with stakeholders to achieve business objectives'
                  ]
                }, 0)}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {renderEducationBlock({
                  degree: 'Bachelor\'s Degree',
                  institution: 'University Name',
                  dates: '2016 - 2020',
                  location: 'Location'
                }, 0)}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                CORE SKILLS
              </h2>
              {renderSkillsList(['Professional Skills', 'Technical Proficiency', 'Project Management', 'Team Leadership', 'Strategic Planning'])}
            </div>
          </div>
        )}
      </div>
      
      {/* Applied Changes Summary */}
      {showChanges && appliedSuggestions.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            <Badge variant="secondary" className="mb-2">
              {appliedSuggestions.length} optimization{appliedSuggestions.length !== 1 ? 's' : ''} applied
            </Badge>
            <p className="text-xs">
              Highlighted sections show recent ATS optimizations
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

ATSResumeDisplay.displayName = "ATSResumeDisplay";
