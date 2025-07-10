import { FormValidationState } from "@/types/resumeTypes";

export const getInitialValidationState = (): FormValidationState => ({
  personalInfo: false,
  summary: false,
  experience: false,
  education: false,
  skills: false,
  certificates: true, // Optional sections - always valid
  projects: true,
  languages: true,
  volunteering: true,
  awards: true,
  publications: true,
  interests: true,
  additionalInfo: true,
});

export const getStepValidationMap = (formValidation: FormValidationState) => ({
  1: formValidation.personalInfo,
  2: formValidation.summary,
  3: formValidation.experience,
  4: formValidation.education,
  5: formValidation.skills,
  6: formValidation.certificates,
  7: formValidation.projects,
  8: formValidation.languages,
  9: formValidation.volunteering,
  10: formValidation.awards,
  11: formValidation.publications,
  12: formValidation.interests,
  13: formValidation.additionalInfo,
  14: true,
});

export const isStepValid = (currentStep: number, formValidation: FormValidationState): boolean => {
  const validationMap = getStepValidationMap(formValidation);
  return validationMap[currentStep as keyof typeof validationMap] || false;
};