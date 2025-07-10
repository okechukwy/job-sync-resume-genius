import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Skills, SkillType } from "@/types/skillsTypes";

export const useSkillsManagement = (
  initialData: Skills,
  onUpdate: (data: Skills) => void,
  onValidationChange?: (isValid: boolean) => void
) => {
  const [skills, setSkills] = useState<Skills>(initialData);
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

  const removeSkill = (skillToRemove: string, type: SkillType) => {
    setSkills(prev => ({
      ...prev,
      [type]: prev[type].filter(skill => skill !== skillToRemove)
    }));
  };

  const addSuggestedSkill = (skill: string, type: SkillType) => {
    if (!skills[type].includes(skill)) {
      setSkills(prev => ({
        ...prev,
        [type]: [...prev[type], skill]
      }));
      toast.success("Skill added!");
    }
  };

  return {
    skills,
    newTechnicalSkill,
    setNewTechnicalSkill,
    newSoftSkill,
    setNewSoftSkill,
    addTechnicalSkill,
    addSoftSkill,
    removeSkill,
    addSuggestedSkill,
  };
};