import PersonalInfoForm from "@/components/PersonalInfoForm";
import SummaryForm from "@/components/SummaryForm";
import ExperienceForm from "@/components/ExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsForm from "@/components/SkillsForm";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData } from "@/hooks/useResumeSteps";

interface StepContentProps {
  currentStep: number;
  resumeData: ResumeData;
  selectedIndustry: string;
  selectedTemplate: string;
  onDataUpdate: (section: keyof ResumeData, data: any) => void;
  onValidationChange: (step: string, isValid: boolean) => void;
}

const StepContent = ({ 
  currentStep, 
  resumeData, 
  selectedIndustry, 
  selectedTemplate,
  onDataUpdate, 
  onValidationChange 
}: StepContentProps) => {
  switch (currentStep) {
    case 1:
      return (
        <PersonalInfoForm
          data={resumeData.personalInfo}
          onUpdate={(data) => onDataUpdate('personalInfo', data)}
          onValidationChange={(isValid) => onValidationChange('personalInfo', isValid)}
        />
      );
    case 2:
      return (
        <SummaryForm
          data={resumeData.summary}
          onUpdate={(data) => onDataUpdate('summary', data)}
          onValidationChange={(isValid) => onValidationChange('summary', isValid)}
          industry={selectedIndustry}
        />
      );
    case 3:
      return (
        <ExperienceForm
          data={resumeData.experience}
          onUpdate={(data) => onDataUpdate('experience', data)}
          onValidationChange={(isValid) => onValidationChange('experience', isValid)}
          industry={selectedIndustry}
        />
      );
    case 4:
      return (
        <EducationForm
          data={resumeData.education}
          onUpdate={(data) => onDataUpdate('education', data)}
          onValidationChange={(isValid) => onValidationChange('education', isValid)}
        />
      );
    case 5:
      return (
        <SkillsForm
          data={resumeData.skills}
          onUpdate={(data) => onDataUpdate('skills', data)}
          onValidationChange={(isValid) => onValidationChange('skills', isValid)}
          industry={selectedIndustry}
        />
      );
    case 6:
      return <ResumePreview data={resumeData} industry={selectedIndustry} template={selectedTemplate} />;
    default:
      return null;
  }
};

export default StepContent;