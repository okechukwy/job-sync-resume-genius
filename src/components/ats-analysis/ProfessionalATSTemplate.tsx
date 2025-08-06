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
    if (!showChanges || !appliedSuggestions.length) return text;
    
    let highlightedText = text;
    appliedSuggestions.forEach(suggestion => {
      const regex = new RegExp(suggestion.newText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      highlightedText = highlightedText.replace(regex, `<mark class="bg-primary/20 px-1 rounded">${suggestion.newText}</mark>`);
    });
    
    return highlightedText;
  };

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

  // Render fallback if no structured data
  if (!structuredResume?.sections?.length) {
    return (
      <div className="cv-document bg-background text-foreground p-8">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            No Resume Content
          </h2>
          <p className="text-muted-foreground">
            Please upload or paste your resume content to begin ATS optimization.
          </p>
        </div>
      </div>
    );
  }

  // Find header section
  const headerSection = structuredResume.sections.find(s => s.type === 'header');
  const otherSections = structuredResume.sections.filter(s => s.type !== 'header');

  return (
    <div className="cv-document bg-background text-foreground p-8 max-w-4xl mx-auto">
      {/* Header */}
      {headerSection && renderHeader(headerSection.content.data as HeaderData)}
      
      {/* Other Sections */}
      <div className="space-y-6">
        {otherSections.map(renderSection)}
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

ProfessionalATSTemplate.displayName = "ProfessionalATSTemplate";
