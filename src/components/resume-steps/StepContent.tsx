import PersonalInfoForm from "@/components/PersonalInfoForm";
import SummaryForm from "@/components/SummaryForm";
import ExperienceForm from "@/components/ExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsForm from "@/components/SkillsForm";
import CertificatesForm from "@/components/CertificatesForm";
import ProjectsForm from "@/components/ProjectsForm";
import LanguagesForm from "@/components/LanguagesForm";
import VolunteeringForm from "@/components/VolunteeringForm";
import AwardsForm from "@/components/AwardsForm";
import PublicationsForm from "@/components/PublicationsForm";
import InterestsForm from "@/components/InterestsForm";
import AdditionalInfoForm from "@/components/AdditionalInfoForm";
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
      return (
        <CertificatesForm
          data={resumeData.certificates}
          onUpdate={(data) => onDataUpdate('certificates', data)}
          onValidationChange={(isValid) => onValidationChange('certificates', isValid)}
        />
      );
    case 7:
      return (
        <ProjectsForm
          data={resumeData.projects}
          onUpdate={(data) => onDataUpdate('projects', data)}
          onValidationChange={(isValid) => onValidationChange('projects', isValid)}
          industry={selectedIndustry}
        />
      );
    case 8:
      return (
        <LanguagesForm
          data={resumeData.languages}
          onUpdate={(data) => onDataUpdate('languages', data)}
          onValidationChange={(isValid) => onValidationChange('languages', isValid)}
        />
      );
    case 9:
      return (
        <VolunteeringForm
          data={resumeData.volunteering}
          onUpdate={(data) => onDataUpdate('volunteering', data)}
          onValidationChange={(isValid) => onValidationChange('volunteering', isValid)}
        />
      );
    case 10:
      return (
        <AwardsForm
          data={resumeData.awards}
          onUpdate={(data) => onDataUpdate('awards', data)}
          onValidationChange={(isValid) => onValidationChange('awards', isValid)}
        />
      );
    case 11:
      return (
        <PublicationsForm
          data={resumeData.publications}
          onUpdate={(data) => onDataUpdate('publications', data)}
          onValidationChange={(isValid) => onValidationChange('publications', isValid)}
        />
      );
    case 12:
      return (
        <InterestsForm
          data={resumeData.interests}
          onUpdate={(data) => onDataUpdate('interests', data)}
          onValidationChange={(isValid) => onValidationChange('interests', isValid)}
        />
      );
    case 13:
      return (
        <AdditionalInfoForm
          data={resumeData.additionalInfo}
          onUpdate={(data) => onDataUpdate('additionalInfo', data)}
          onValidationChange={(isValid) => onValidationChange('additionalInfo', isValid)}
        />
      );
    case 14:
      return <ResumePreview data={resumeData} industry={selectedIndustry} template={selectedTemplate} />;
    default:
      return null;
  }
};

export default StepContent;