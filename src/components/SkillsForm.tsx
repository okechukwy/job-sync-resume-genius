
import SkillsSection from "./skills/SkillsSection";
import SkillsTips from "./skills/SkillsTips";
import { SkillsFormProps } from "@/types/skillsTypes";

const SkillsForm = ({ data, onUpdate, onValidationChange }: SkillsFormProps) => {
  // Always mark skills as valid since it's optional
  React.useEffect(() => {
    onValidationChange?.(true);
  }, [onValidationChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <p className="text-muted-foreground mb-6">
          Add your technical and soft skills. This section is optional - you can skip it if you prefer.
        </p>
      </div>

      <SkillsSection
        data={data}
        onUpdate={onUpdate}
        onValidationChange={() => onValidationChange?.(true)} // Always valid
      />

      <SkillsTips />
    </div>
  );
};

export default SkillsForm;
