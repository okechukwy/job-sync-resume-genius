import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  Trash2, 
  GripVertical,
  User,
  Briefcase,
  GraduationCap,
  Award
} from "lucide-react";
import { StructuredResume, ExperienceBlock, EducationBlock, HeaderData } from "@/utils/resumeStructureParser";

interface SectionEditorProps {
  structuredResume: StructuredResume;
  onChange: (updatedResume: StructuredResume) => void;
}

export const SectionEditor = ({ structuredResume, onChange }: SectionEditorProps) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const updateSection = (sectionId: string, updates: any) => {
    const updatedSections = structuredResume.sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    );
    onChange({ sections: updatedSections });
  };

  const addExperience = () => {
    const experienceSection = structuredResume.sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const newExperience: ExperienceBlock = {
        title: '',
        company: '',
        dates: '',
        responsibilities: ['']
      };
      // Ensure current data is an array
      const currentData = Array.isArray(experienceSection.content.data) 
        ? experienceSection.content.data 
        : [];
      const updatedData = [...currentData, newExperience];
      updateSection(experienceSection.id, {
        content: { ...experienceSection.content, data: updatedData }
      });
    }
  };

  const updateExperience = (index: number, field: keyof ExperienceBlock, value: any) => {
    const experienceSection = structuredResume.sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const currentData = Array.isArray(experienceSection.content.data) 
        ? experienceSection.content.data 
        : [];
      const experiences = [...currentData];
      if (experiences[index]) {
        experiences[index] = { ...experiences[index], [field]: value };
        updateSection(experienceSection.id, {
          content: { ...experienceSection.content, data: experiences }
        });
      }
    }
  };

  const addResponsibility = (expIndex: number) => {
    const experienceSection = structuredResume.sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const currentData = Array.isArray(experienceSection.content.data) 
        ? experienceSection.content.data 
        : [];
      const experiences = [...currentData];
      if (experiences[expIndex] && Array.isArray(experiences[expIndex].responsibilities)) {
        experiences[expIndex].responsibilities.push('');
        updateSection(experienceSection.id, {
          content: { ...experienceSection.content, data: experiences }
        });
      }
    }
  };

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    const experienceSection = structuredResume.sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const currentData = Array.isArray(experienceSection.content.data) 
        ? experienceSection.content.data 
        : [];
      const experiences = [...currentData];
      if (experiences[expIndex] && Array.isArray(experiences[expIndex].responsibilities)) {
        experiences[expIndex].responsibilities[respIndex] = value;
        updateSection(experienceSection.id, {
          content: { ...experienceSection.content, data: experiences }
        });
      }
    }
  };

  const renderHeaderEditor = (headerData: HeaderData) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              value={headerData.name || ''} 
              onChange={(e) => {
                const headerSection = structuredResume.sections.find(s => s.type === 'header');
                if (headerSection) {
                  const updatedData = { ...headerData, name: e.target.value };
                  updateSection(headerSection.id, {
                    content: { ...headerSection.content, data: updatedData }
                  });
                }
              }}
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Job Title</label>
            <Input 
              value={headerData.title || ''} 
              onChange={(e) => {
                const headerSection = structuredResume.sections.find(s => s.type === 'header');
                if (headerSection) {
                  const updatedData = { ...headerData, title: e.target.value };
                  updateSection(headerSection.id, {
                    content: { ...headerSection.content, data: updatedData }
                  });
                }
              }}
              placeholder="Your professional title"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input 
              value={headerData.contact.email || ''} 
              onChange={(e) => {
                const headerSection = structuredResume.sections.find(s => s.type === 'header');
                if (headerSection) {
                  const updatedData = { 
                    ...headerData, 
                    contact: { ...headerData.contact, email: e.target.value }
                  };
                  updateSection(headerSection.id, {
                    content: { ...headerSection.content, data: updatedData }
                  });
                }
              }}
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Phone</label>
            <Input 
              value={headerData.contact.phone || ''} 
              onChange={(e) => {
                const headerSection = structuredResume.sections.find(s => s.type === 'header');
                if (headerSection) {
                  const updatedData = { 
                    ...headerData, 
                    contact: { ...headerData.contact, phone: e.target.value }
                  };
                  updateSection(headerSection.id, {
                    content: { ...headerSection.content, data: updatedData }
                  });
                }
              }}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium">Location</label>
          <Input 
            value={headerData.contact.location || ''} 
            onChange={(e) => {
              const headerSection = structuredResume.sections.find(s => s.type === 'header');
              if (headerSection) {
                const updatedData = { 
                  ...headerData, 
                  contact: { ...headerData.contact, location: e.target.value }
                };
                updateSection(headerSection.id, {
                  content: { ...headerSection.content, data: updatedData }
                });
              }
            }}
            placeholder="City, State, Country"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderExperienceEditor = (experiences: ExperienceBlock[]) => {
    // Ensure experiences is always an array
    const safeExperiences = Array.isArray(experiences) ? experiences : [];
    
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </CardTitle>
            <Button onClick={addExperience} size="sm">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {safeExperiences.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No work experience entries found.</p>
              <Button onClick={addExperience} variant="outline" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Experience
              </Button>
            </div>
          ) : (
            safeExperiences.map((experience, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Job Title</label>
                    <Input 
                      value={experience.title || ''}
                      onChange={(e) => updateExperience(index, 'title', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <Input 
                      value={experience.company || ''}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Dates</label>
                    <Input 
                      value={experience.dates || ''}
                      onChange={(e) => updateExperience(index, 'dates', e.target.value)}
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input 
                      value={experience.location || ''}
                      onChange={(e) => updateExperience(index, 'location', e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Responsibilities</label>
                    <Button 
                      onClick={() => addResponsibility(index)} 
                      size="sm" 
                      variant="outline"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(experience.responsibilities || []).map((resp, respIndex) => (
                      <Textarea
                        key={respIndex}
                        value={resp || ''}
                        onChange={(e) => updateResponsibility(index, respIndex, e.target.value)}
                        placeholder="Describe your achievement or responsibility..."
                        className="min-h-[60px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Edit your resume sections individually with structured forms. 
        Changes are automatically reflected in the preview.
      </div>
      
      {structuredResume.sections.map((section) => {
        if (section.type === 'header') {
          return (
            <div key={section.id}>
              {renderHeaderEditor(section.content.data as HeaderData)}
            </div>
          );
        }
        
        if (section.type === 'experience') {
          // Ensure we pass a safe array to renderExperienceEditor
          const experienceData = section.content.data;
          const safeExperienceData = Array.isArray(experienceData) ? experienceData : [];
          
          return (
            <div key={section.id}>
              {renderExperienceEditor(safeExperienceData)}
            </div>
          );
        }
        
        // For other sections, show a simple editor
        return (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={Array.isArray(section.content.data) 
                  ? section.content.data.join('\n') 
                  : section.content.data
                }
                onChange={(e) => {
                  const newData = section.content.type === 'list' 
                    ? e.target.value.split('\n').filter(line => line.trim())
                    : e.target.value;
                  updateSection(section.id, {
                    content: { ...section.content, data: newData }
                  });
                }}
                className="min-h-[120px]"
                placeholder={`Enter ${section.title.toLowerCase()} content...`}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};