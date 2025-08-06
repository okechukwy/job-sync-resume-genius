import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Save } from "lucide-react";
import { StructuredResume, HeaderData, ExperienceBlock, EducationBlock } from "@/utils/resumeStructureParser";

interface StructuredEditorProps {
  structuredResume: StructuredResume;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export const StructuredEditor = ({ structuredResume, onSave, onCancel }: StructuredEditorProps) => {
  const [editData, setEditData] = useState(structuredResume);

  const updateHeader = (field: string, value: string) => {
    const headerSection = editData.sections.find(s => s.type === 'header');
    if (headerSection && headerSection.content.type === 'header_data') {
      const headerData = headerSection.content.data as HeaderData;
      if (field.startsWith('contact.')) {
        const contactField = field.replace('contact.', '');
        headerData.contact = { ...headerData.contact, [contactField]: value };
      } else {
        (headerData as any)[field] = value;
      }
      setEditData({ ...editData });
    }
  };

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    const expSection = editData.sections.find(s => s.type === 'experience');
    if (expSection && expSection.content.type === 'experience_block') {
      const experiences = expSection.content.data as ExperienceBlock[];
      if (experiences[index]) {
        (experiences[index] as any)[field] = value;
        setEditData({ ...editData });
      }
    }
  };

  const addExperience = () => {
    const expSection = editData.sections.find(s => s.type === 'experience');
    if (expSection && expSection.content.type === 'experience_block') {
      const experiences = expSection.content.data as ExperienceBlock[];
      experiences.push({
        title: '',
        company: '',
        location: '',
        dates: '',
        responsibilities: ['']
      });
      setEditData({ ...editData });
    }
  };

  const addResponsibility = (expIndex: number) => {
    const expSection = editData.sections.find(s => s.type === 'experience');
    if (expSection && expSection.content.type === 'experience_block') {
      const experiences = expSection.content.data as ExperienceBlock[];
      if (experiences[expIndex]) {
        experiences[expIndex].responsibilities.push('');
        setEditData({ ...editData });
      }
    }
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const expSection = editData.sections.find(s => s.type === 'experience');
    if (expSection && expSection.content.type === 'experience_block') {
      const experiences = expSection.content.data as ExperienceBlock[];
      if (experiences[expIndex] && experiences[expIndex].responsibilities.length > 1) {
        experiences[expIndex].responsibilities.splice(respIndex, 1);
        setEditData({ ...editData });
      }
    }
  };

  const handleSave = () => {
    // Convert structured data back to text format
    const headerSection = editData.sections.find(s => s.type === 'header');
    const expSection = editData.sections.find(s => s.type === 'experience');
    const eduSection = editData.sections.find(s => s.type === 'education');
    const skillsSection = editData.sections.find(s => s.type === 'skills');

    let content = '';

    // Header
    if (headerSection && headerSection.content.type === 'header_data') {
      const header = headerSection.content.data as HeaderData;
      content += `${header.name}\n`;
      if (header.title) content += `${header.title}\n`;
      content += `Email: ${header.contact.email || ''}\n`;
      content += `Phone: ${header.contact.phone || ''}\n`;
      content += `Location: ${header.contact.location || ''}\n`;
      if (header.contact.linkedin) content += `LinkedIn: ${header.contact.linkedin}\n`;
      content += '\n';
    }

    // Experience
    if (expSection && expSection.content.type === 'experience_block') {
      content += 'WORK EXPERIENCE\n\n';
      const experiences = expSection.content.data as ExperienceBlock[];
      experiences.forEach(exp => {
        content += `${exp.title}\n`;
        content += `${exp.company}${exp.location ? ` | ${exp.location}` : ''}\n`;
        content += `${exp.dates}\n`;
        exp.responsibilities.forEach(resp => {
          if (resp.trim()) content += `• ${resp}\n`;
        });
        content += '\n';
      });
    }

    // Education
    if (eduSection && eduSection.content.type === 'education_block') {
      content += 'EDUCATION\n\n';
      const education = eduSection.content.data as EducationBlock[];
      education.forEach(edu => {
        content += `${edu.degree}\n`;
        content += `${edu.institution}${edu.location ? ` | ${edu.location}` : ''}\n`;
        content += `${edu.dates}\n\n`;
      });
    }

    // Skills
    if (skillsSection && skillsSection.content.type === 'list') {
      content += 'SKILLS\n\n';
      const skills = skillsSection.content.data as string[];
      content += skills.filter(skill => skill.trim()).join(', ') + '\n';
    }

    onSave(content.trim());
  };

  const headerSection = editData.sections.find(s => s.type === 'header');
  const headerData = headerSection?.content.type === 'header_data' ? headerSection.content.data as HeaderData : null;

  const expSection = editData.sections.find(s => s.type === 'experience');
  const experiences = expSection?.content.type === 'experience_block' ? expSection.content.data as ExperienceBlock[] : [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Structured Editor</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Header Section */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={headerData?.name || ''}
              onChange={(e) => updateHeader('name', e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={headerData?.title || ''}
              onChange={(e) => updateHeader('title', e.target.value)}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={headerData?.contact.email || ''}
                onChange={(e) => updateHeader('contact.email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={headerData?.contact.phone || ''}
                onChange={(e) => updateHeader('contact.phone', e.target.value)}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={headerData?.contact.location || ''}
                onChange={(e) => updateHeader('contact.location', e.target.value)}
                placeholder="City, State"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={headerData?.contact.linkedin || ''}
                onChange={(e) => updateHeader('contact.linkedin', e.target.value)}
                placeholder="linkedin.com/in/yourprofile"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Work Experience</CardTitle>
            <Button onClick={addExperience} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((exp, expIndex) => (
            <div key={expIndex} className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(expIndex, 'title', e.target.value)}
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                    placeholder="e.g., Tech Corp"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                    placeholder="e.g., New York, NY"
                  />
                </div>
                <div>
                  <Label>Dates</Label>
                  <Input
                    value={exp.dates}
                    onChange={(e) => updateExperience(expIndex, 'dates', e.target.value)}
                    placeholder="e.g., Jan 2020 - Present"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Responsibilities</Label>
                  <Button 
                    onClick={() => addResponsibility(expIndex)} 
                    size="sm" 
                    variant="outline"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                {exp.responsibilities.map((resp, respIndex) => (
                  <div key={respIndex} className="flex gap-2 mb-2">
                    <Textarea
                      value={resp}
                      onChange={(e) => {
                        const newResponsibilities = [...exp.responsibilities];
                        newResponsibilities[respIndex] = e.target.value;
                        updateExperience(expIndex, 'responsibilities', newResponsibilities);
                      }}
                      placeholder="Describe your achievement or responsibility..."
                      className="flex-1"
                      rows={2}
                    />
                    {exp.responsibilities.length > 1 && (
                      <Button
                        onClick={() => removeResponsibility(expIndex, respIndex)}
                        size="sm"
                        variant="outline"
                        className="mt-auto"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};