import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SkillType } from "@/types/skillsTypes";

interface SuggestedSkillsProps {
  industry: string;
  skills: string[];
  type: SkillType;
  onAddSkill: (skill: string) => void;
}

const SuggestedSkills = ({ industry, skills, type, onAddSkill }: SuggestedSkillsProps) => {
  return (
    <div>
      <Label className="text-sm font-medium">Suggested for {industry}:</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => onAddSkill(skill)}
          >
            + {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SuggestedSkills;