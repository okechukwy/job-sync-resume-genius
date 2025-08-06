import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe,
  Briefcase,
  GraduationCap,
  Award
} from "lucide-react";
import { 
  StructuredResume, 
  ResumeSection, 
  ExperienceBlock, 
  EducationBlock, 
  HeaderData 
} from "@/utils/resumeStructureParser";

interface ATSFormattedDisplayProps {
  structuredResume: StructuredResume;
  appliedSuggestions: Array<{
    id: string;
    originalText: string;
    newText: string;
    section: string;
  }>;
  showChanges?: boolean;
}

export const ATSFormattedDisplay = memo(({ 
  structuredResume, 
  appliedSuggestions, 
  showChanges = false 
}: ATSFormattedDisplayProps) => {
  // Handle empty or malformed data with better fallback
  if (!structuredResume || !structuredResume.sections || structuredResume.sections.length === 0) {
    return (
      <Card className="bg-background border border-border">
        <div className="p-8 text-center space-y-4">
          <div className="text-muted-foreground">
            Processing resume content...
          </div>
          <div className="text-sm text-muted-foreground">
            If content doesn't appear, try refreshing or re-uploading your resume.
          </div>
        </div>
      </Card>
    );
  }
  const highlightChanges = (text: string) => {
    if (!showChanges || appliedSuggestions.length === 0) {
      return text;
    }

    let highlightedText = text;
    appliedSuggestions.forEach((suggestion) => {
      const regex = new RegExp(
        suggestion.newText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 
        'gi'
      );
      highlightedText = highlightedText.replace(
        regex, 
        `<mark class="bg-success/20 px-1 py-0.5 rounded-sm">$&</mark>`
      );
    });
    
    return highlightedText;
  };

  const renderHeader = (data: HeaderData) => (
    <div className="text-center space-y-4 pb-6 border-b border-border">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {data.name}
        </h1>
        {data.title && (
          <p className="text-lg text-muted-foreground font-medium">
            {data.title}
          </p>
        )}
      </div>
      
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
        {data.contact.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="h-4 w-4" />
            <span className="text-primary">{data.contact.linkedin}</span>
          </div>
        )}
        {data.contact.website && (
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span className="text-primary">{data.contact.website}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderExperienceBlock = (block: ExperienceBlock, index: number) => (
    <div key={index} className="space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-semibold text-foreground">
            {block.title}
          </h4>
          <span className="text-sm text-muted-foreground font-medium">
            {block.dates}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-foreground">
            {block.company}
          </span>
          {block.location && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {block.location}
              </span>
            </>
          )}
        </div>
      </div>
      
      {block.responsibilities && block.responsibilities.length > 0 && (
        <ul className="space-y-1.5 ml-0">
          {block.responsibilities.map((responsibility, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed">
              <span className="text-muted-foreground mt-1.5 text-xs">•</span>
              <span 
                dangerouslySetInnerHTML={{ 
                  __html: highlightChanges(responsibility) 
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderEducationBlock = (block: EducationBlock, index: number) => (
    <div key={index} className="space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-base font-semibold text-foreground">
            {block.degree}
          </h4>
          <p className="text-sm text-muted-foreground">
            {block.institution}
            {block.location && ` • ${block.location}`}
          </p>
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {block.dates}
        </span>
      </div>
      
      {block.details && block.details.length > 0 && (
        <ul className="space-y-1 ml-0">
          {block.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <span className="text-muted-foreground mt-1.5 text-xs">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderSkillsList = (skills: string[]) => (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge 
          key={index} 
          variant="secondary" 
          className="text-xs font-normal"
        >
          {skill}
        </Badge>
      ))}
    </div>
  );

  const renderSection = (section: ResumeSection) => {
    if (section.type === 'header') {
      return renderHeader(section.content.data as HeaderData);
    }

    const getSectionIcon = () => {
      switch (section.type) {
        case 'experience':
          return <Briefcase className="h-5 w-5" />;
        case 'education':
          return <GraduationCap className="h-5 w-5" />;
        case 'skills':
          return <Award className="h-5 w-5" />;
        default:
          return <Award className="h-5 w-5" />;
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-border">
          {getSectionIcon()}
          <h3 className="text-xl font-bold text-foreground uppercase tracking-wide">
            {section.title.replace(/[^a-zA-Z\s]/g, '')}
          </h3>
        </div>
        
        <div className="space-y-4">
          {section.content.type === 'experience_block' && 
            (section.content.data as ExperienceBlock[]).map(renderExperienceBlock)
          }
          
          {section.content.type === 'education_block' && 
            (section.content.data as EducationBlock[]).map(renderEducationBlock)
          }
          
          {section.content.type === 'list' && section.type === 'skills' &&
            renderSkillsList(section.content.data as string[])
          }
          
          {section.content.type === 'list' && section.type !== 'skills' && (
            <ul className="space-y-1.5">
              {(section.content.data as string[]).map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground mt-1.5 text-xs">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          
          {section.content.type === 'paragraph' && (
            <p 
              className="text-sm leading-relaxed text-foreground"
              dangerouslySetInnerHTML={{ 
                __html: highlightChanges(section.content.data as string) 
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-background border border-border">
      <div className="p-8 space-y-6 max-w-none">
        {structuredResume.sections.map((section, index) => (
          <div key={section.id}>
            {renderSection(section)}
            {index < structuredResume.sections.length - 1 && (
              <Separator className="mt-6" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
});

ATSFormattedDisplay.displayName = "ATSFormattedDisplay";