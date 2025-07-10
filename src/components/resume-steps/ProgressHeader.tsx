import { Progress } from "@/components/ui/progress";
import { ResumeStep } from "@/types/resumeTypes";

interface ProgressHeaderProps {
  currentStep: number;
  steps: ResumeStep[];
  progress: number;
}

const ProgressHeader = ({ currentStep, steps, progress }: ProgressHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Step {currentStep}: {steps[currentStep - 1].title}
        </h1>
        <span className="text-sm text-muted-foreground">
          {currentStep} of {steps.length}
        </span>
      </div>
      <Progress value={progress} className="mb-4" />
      <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
    </div>
  );
};

export default ProgressHeader;