import { useEffect, useRef } from "react";
import { ResumeStep } from "@/types/resumeTypes";

interface StepIndicatorProps {
  steps: ResumeStep[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentRef.current && containerRef.current) {
      try {
        currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } catch {}
    }
  }, [currentStep]);

  return (
    <div className="mb-6">
      <div
        ref={containerRef}
        className="flex items-center gap-2 md:gap-4 overflow-x-auto px-2 snap-x snap-mandatory"
      >
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center shrink-0 snap-center">
            <div
              ref={step.number === currentStep ? currentRef : undefined}
              className={`w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all ${
                step.number === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step.number < currentStep
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-6 md:w-8 h-0.5 mx-1 md:mx-2 ${
                  step.number < currentStep ? 'bg-success' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
