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

interface ProfessionalATSTemplateProps {
  structuredResume: StructuredResume;
  appliedSuggestions: AppliedSuggestion[];
  showChanges: boolean;
}

export const ProfessionalATSTemplate = memo(({ 
  structuredResume, 
  appliedSuggestions, 
  showChanges 
}: ProfessionalATSTemplateProps) => {
  
  const highlightChanges = (text: string): string => {
    if (!showChanges || !appliedSuggestions.length || !text) return text;
    
    let highlightedText = text;
    console.log('Highlighting changes in text:', text.substring(0, 50) + '...');
    console.log('Applied suggestions:', appliedSuggestions.length);
    
    appliedSuggestions.forEach(suggestion => {
      if (suggestion.newText && suggestion.newText.trim()) {
        // Create a regex that matches the new text
        const escapedNewText = suggestion.newText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedNewText})`, 'gi');
        
        highlightedText = highlightedText.replace(regex, 
          `<mark class="bg-yellow-200 px-1 rounded font-medium border border-yellow-300">$1</mark>`
        );
      }
    });
    
    return highlightedText;
  };

  const renderHeader = (data: HeaderData) => (
    <div className="mb-8">
      {/* Name and Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2" 
            dangerouslySetInnerHTML={{ __html: highlightChanges(data.name || 'Your Name') }}>
        </h1>
        {data.title && (
          <h2 className="text-xl text-muted-foreground font-medium"
              dangerouslySetInnerHTML={{ __html: highlightChanges(data.title) }}>
          </h2>
        )}
      </div>

      {/* Contact Information */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        {data.contact.email && (
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span dangerouslySetInnerHTML={{ __html: highlightChanges(data.contact.email) }}></span>
          </div>
        )}
        {data.contact.phone && (
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span dangerouslySetInnerHTML={{ __html: highlightChanges(data.contact.phone) }}></span>
          </div>
        )}
        {data.contact.location && (
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span dangerouslySetInnerHTML={{ __html: highlightChanges(data.contact.location) }}></span>
          </div>
        )}
        {data.contact.website && (
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span dangerouslySetInnerHTML={{ __html: highlightChanges(data.contact.website) }}></span>
          </div>
        )}
        {data.contact.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="h-4 w-4" />
            <span dangerouslySetInnerHTML={{ __html: highlightChanges(data.contact.linkedin) }}></span>
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
          <h3 className="font-semibold text-foreground text-lg"
              dangerouslySetInnerHTML={{ __html: highlightChanges(block.title || 'Job Title') }}>
          </h3>
          <p className="text-muted-foreground font-medium"
             dangerouslySetInnerHTML={{ __html: highlightChanges(block.company || 'Company Name') }}>
          </p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          {block.dates && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span dangerouslySetInnerHTML={{ __html: highlightChanges(block.dates) }}></span>
            </div>
          )}
          {block.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              <span dangerouslySetInnerHTML={{ __html: highlightChanges(block.location) }}></span>
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
          <h3 className="font-semibold text-foreground"
              dangerouslySetInnerHTML={{ __html: highlightChanges(block.degree || 'Degree') }}>
          </h3>
          <p className="text-muted-foreground"
             dangerouslySetInnerHTML={{ __html: highlightChanges(block.institution || 'Institution') }}>
          </p>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          {block.dates && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span dangerouslySetInnerHTML={{ __html: highlightChanges(block.dates) }}></span>
            </div>
          )}
          {block.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              <span dangerouslySetInnerHTML={{ __html: highlightChanges(block.location) }}></span>
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
        >
          <span dangerouslySetInnerHTML={{ __html: highlightChanges(skill) }}></span>
        </Badge>
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

  // Render fallback if no structured data
  if (!structuredResume?.sections?.length) {
    return (
      <div className="cv-document bg-background text-foreground p-8 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            No Resume Content Available
          </h2>
          <p className="text-muted-foreground mb-4">
            Please upload or paste your resume content to begin ATS optimization.
          </p>
          <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg max-w-md mx-auto">
            <p><strong>Tip:</strong> The system works best with well-formatted resume text that includes clear sections like:</p>
            <ul className="mt-2 text-left space-y-1">
              <li>• Contact information</li>
              <li>• Professional summary</li>
              <li>• Work experience</li>
              <li>• Education</li>
              <li>• Skills</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Find header section
  const headerSection = structuredResume.sections?.find(s => s.type === 'header');
  const otherSections = structuredResume.sections?.filter(s => s.type !== 'header') || [];

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
      {appliedSuggestions.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            <Badge variant="secondary" className="mb-2 bg-green-100 text-green-700 border-green-200">
              {appliedSuggestions.length} optimization{appliedSuggestions.length !== 1 ? 's' : ''} applied
            </Badge>
            {showChanges && (
              <p className="text-xs">
                <span className="inline-block w-3 h-3 bg-yellow-200 border border-yellow-300 rounded mr-1"></span>
                Highlighted sections show applied ATS optimizations
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

ProfessionalATSTemplate.displayName = "ProfessionalATSTemplate";
