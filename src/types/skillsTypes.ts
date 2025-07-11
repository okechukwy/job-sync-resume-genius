export interface Skills {
  technical: string[];
  soft: string[];
}

export interface SkillsFormProps {
  data: Skills;
  onUpdate: (data: Skills) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export interface IndustrySkills {
  technical: string[];
  soft: string[];
}

export type SkillType = 'technical' | 'soft';