import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { SkillType } from "@/types/skillsTypes";

interface SkillInputProps {
  type: SkillType;
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  skills: string[];
  onRemove: (skill: string) => void;
  placeholder: string;
  title: string;
  description: string;
}

const SkillInput = ({
  type,
  value,
  onChange,
  onAdd,
  skills,
  onRemove,
  placeholder,
  title,
  description
}: SkillInputProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="glass-card"
          onKeyPress={(e) => e.key === 'Enter' && onAdd()}
        />
        <Button onClick={onAdd} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="glass-card">
            {skill}
            <button
              onClick={() => onRemove(skill)}
              className="ml-2 hover:text-destructive"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SkillInput;