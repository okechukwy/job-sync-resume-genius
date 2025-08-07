
import React from 'react';
import { ResumeData } from "@/hooks/useResumeSteps";
import { StandardizedResumeRenderer } from "./StandardizedResumeRenderer";

interface ResumeLayoutRendererProps {
  data: ResumeData;
  templateId?: string;
  formatDate: (dateString: string) => string;
  mode?: 'screen' | 'export';
}

export const ResumeLayoutRenderer = ({ 
  data, 
  templateId = "modern-minimalist", 
  formatDate,
  mode = 'screen'
}: ResumeLayoutRendererProps) => {
  return (
    <StandardizedResumeRenderer
      data={data}
      templateId={templateId}
      formatDate={formatDate}
      mode={mode}
    />
  );
};
