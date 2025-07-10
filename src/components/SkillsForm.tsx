import SkillsSection from "./skills/SkillsSection";
import SkillsTips from "./skills/SkillsTips";
import { SkillsFormProps } from "@/types/skillsTypes";

const SkillsForm = ({ data, onUpdate, onValidationChange, industry }: SkillsFormProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <p className="text-muted-foreground mb-6">
          Add your technical and soft skills. Focus on skills that are relevant to your target role.
        </p>
      </div>

      <SkillsSection
        data={data}
        onUpdate={onUpdate}
        onValidationChange={onValidationChange}
        industry={industry}
      />

      <SkillsTips />
    </div>
  );
};

export default SkillsForm;