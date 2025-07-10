import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";

interface Skills {
  technical: string[];
  soft: string[];
}

interface SkillsFormProps {
  data: Skills;
  onUpdate: (data: Skills) => void;
  onValidationChange?: (isValid: boolean) => void;
  industry: string;
}

const SkillsForm = ({ data, onUpdate, onValidationChange, industry }: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skills>(data);
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const validateSkills = useCallback(() => {
    return skills.technical.length > 0 && skills.soft.length > 0;
  }, [skills.technical.length, skills.soft.length]);

  useEffect(() => {
    onUpdate(skills);
  }, [skills, onUpdate]);

  useEffect(() => {
    onValidationChange?.(validateSkills());
  }, [validateSkills, onValidationChange]);

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim() && !skills.technical.includes(newTechnicalSkill.trim())) {
      setSkills(prev => ({
        ...prev,
        technical: [...prev.technical, newTechnicalSkill.trim()]
      }));
      setNewTechnicalSkill('');
      toast.success("Technical skill added!");
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() && !skills.soft.includes(newSoftSkill.trim())) {
      setSkills(prev => ({
        ...prev,
        soft: [...prev.soft, newSoftSkill.trim()]
      }));
      setNewSoftSkill('');
      toast.success("Soft skill added!");
    }
  };

  const removeTechnicalSkill = (skillToRemove: string) => {
    setSkills(prev => ({
      ...prev,
      technical: prev.technical.filter(skill => skill !== skillToRemove)
    }));
  };

  const removeSoftSkill = (skillToRemove: string) => {
    setSkills(prev => ({
      ...prev,
      soft: prev.soft.filter(skill => skill !== skillToRemove)
    }));
  };

  const getIndustrySkills = () => {
    const industrySkills = {
      Technology: {
        technical: ["JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker", "Git", "TypeScript", "MongoDB"],
        soft: ["Problem Solving", "Analytical Thinking", "Team Collaboration", "Agile Methodologies", "Communication"]
      },
      Healthcare: {
        technical: ["EMR Systems", "Medical Terminology", "HIPAA Compliance", "Clinical Documentation", "Medical Software"],
        soft: ["Patient Care", "Empathy", "Attention to Detail", "Communication", "Critical Thinking", "Stress Management"]
      },
      Finance: {
        technical: ["Excel", "Financial Modeling", "Bloomberg Terminal", "SQL", "Python", "R", "Tableau", "QuickBooks"],
        soft: ["Analytical Skills", "Risk Assessment", "Attention to Detail", "Client Relations", "Problem Solving"]
      },
      Creative: {
        technical: ["Adobe Creative Suite", "Figma", "Sketch", "HTML/CSS", "Photography", "Video Editing", "Branding"],
        soft: ["Creativity", "Visual Communication", "Project Management", "Client Collaboration", "Adaptability"]
      },
      Business: {
        technical: ["Project Management", "CRM Software", "Data Analysis", "Excel", "PowerPoint", "Salesforce"],
        soft: ["Leadership", "Strategic Planning", "Communication", "Negotiation", "Team Management", "Problem Solving"]
      },
      Research: {
        technical: ["Statistical Analysis", "R", "Python", "SPSS", "Research Methodologies", "Data Visualization"],
        soft: ["Critical Thinking", "Attention to Detail", "Written Communication", "Research Skills", "Analytical Skills"]
      }
    };
    return industrySkills[industry as keyof typeof industrySkills] || industrySkills.Business;
  };

  const suggestedSkills = getIndustrySkills();

  const addSuggestedSkill = (skill: string, type: 'technical' | 'soft') => {
    if (type === 'technical' && !skills.technical.includes(skill)) {
      setSkills(prev => ({
        ...prev,
        technical: [...prev.technical, skill]
      }));
    } else if (type === 'soft' && !skills.soft.includes(skill)) {
      setSkills(prev => ({
        ...prev,
        soft: [...prev.soft, skill]
      }));
    }
    toast.success("Skill added!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <p className="text-muted-foreground mb-6">
          Add your technical and soft skills. Focus on skills that are relevant to your target role.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technical Skills */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Technical Skills</CardTitle>
            <p className="text-sm text-muted-foreground">
              Programming languages, tools, software, certifications
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTechnicalSkill}
                onChange={(e) => setNewTechnicalSkill(e.target.value)}
                placeholder="Add a technical skill"
                className="glass-card"
                onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
              />
              <Button onClick={addTechnicalSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <Badge key={index} variant="secondary" className="glass-card">
                  {skill}
                  <button
                    onClick={() => removeTechnicalSkill(skill)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div>
              <Label className="text-sm font-medium">Suggested for {industry}:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestedSkills.technical.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => addSuggestedSkill(skill, 'technical')}
                  >
                    + {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Soft Skills</CardTitle>
            <p className="text-sm text-muted-foreground">
              Communication, leadership, problem-solving abilities
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                placeholder="Add a soft skill"
                className="glass-card"
                onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
              />
              <Button onClick={addSoftSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <Badge key={index} variant="secondary" className="glass-card">
                  {skill}
                  <button
                    onClick={() => removeSoftSkill(skill)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div>
              <Label className="text-sm font-medium">Suggested for {industry}:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestedSkills.soft.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => addSuggestedSkill(skill, 'soft')}
                  >
                    + {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">💡 Skills Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Include 8-12 technical skills and 5-8 soft skills maximum</p>
          <p>• Prioritize skills mentioned in job descriptions you're targeting</p>
          <p>• Be honest about your skill level - you may be asked about them in interviews</p>
          <p>• Include both hard skills (measurable) and soft skills (interpersonal)</p>
          <p>• Update skills regularly as you learn new technologies or improve existing ones</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsForm;