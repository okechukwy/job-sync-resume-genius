import { Card, CardContent } from "@/components/ui/card";
import { ResumeLayoutRenderer } from "@/components/resume-layouts/ResumeLayoutRenderer";
import { ResumeData } from "@/hooks/useResumeSteps";
import { TemplateStyles } from "@/components/resume-layouts/types";

interface ResumePreviewCardProps {
  data: ResumeData;
  styles: TemplateStyles;
  layoutVariant: string;
  formatDate: (dateString: string) => string;
  backgroundClass: string;
  shadowClass: string;
}

export const ResumePreviewCard = ({ 
  data, 
  styles, 
  layoutVariant, 
  formatDate, 
  backgroundClass, 
  shadowClass 
}: ResumePreviewCardProps) => {
  return (
    <Card className="glass-card hover-lift animate-fade-in">
      <CardContent className="p-6">
        <div className={`${backgroundClass} rounded-lg p-6 min-h-[600px] ${shadowClass}`}>
          <ResumeLayoutRenderer 
            data={data}
            styles={styles}
            layoutVariant={layoutVariant}
            formatDate={formatDate}
          />
        </div>
      </CardContent>
    </Card>
  );
};