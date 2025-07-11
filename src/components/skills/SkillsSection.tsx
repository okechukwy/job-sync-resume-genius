import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SkillInput from "./SkillInput";
import SuggestedSkills from "./SuggestedSkills";
import { Skills, SkillType } from "@/types/skillsTypes";
import { getIndustrySkills } from "@/constants/industrySkills";
import { useSkillsManagement } from "@/hooks/useSkillsManagement";

interface SkillsSectionProps {
  data: Skills;
  onUpdate: (data: Skills) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const SkillsSection = ({ data, onUpdate, onValidationChange }: SkillsSectionProps) => {
  const {
    skills,
    newTechnicalSkill,
    setNewTechnicalSkill,
    newSoftSkill,
    setNewSoftSkill,
    addTechnicalSkill,
    addSoftSkill,
    removeSkill,
    addSuggestedSkill,
  } = useSkillsManagement(data, onUpdate, onValidationChange);

  const suggestedSkills = getIndustrySkills("Professional");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Technical Skills */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Technical Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SkillInput
            type="technical"
            value={newTechnicalSkill}
            onChange={setNewTechnicalSkill}
            onAdd={addTechnicalSkill}
            skills={skills.technical}
            onRemove={(skill) => removeSkill(skill, 'technical')}
            placeholder="Add a technical skill"
            title=""
            description="Programming languages, tools, software, certifications"
          />

          <SuggestedSkills
            industry="Professional"
            skills={suggestedSkills.technical}
            type="technical"
            onAddSkill={(skill) => addSuggestedSkill(skill, 'technical')}
          />
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Soft Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SkillInput
            type="soft"
            value={newSoftSkill}
            onChange={setNewSoftSkill}
            onAdd={addSoftSkill}
            skills={skills.soft}
            onRemove={(skill) => removeSkill(skill, 'soft')}
            placeholder="Add a soft skill"
            title=""
            description="Communication, leadership, problem-solving abilities"
          />

          <SuggestedSkills
            industry="Professional"
            skills={suggestedSkills.soft}
            type="soft"
            onAddSkill={(skill) => addSuggestedSkill(skill, 'soft')}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsSection;