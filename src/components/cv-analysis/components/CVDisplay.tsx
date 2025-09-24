import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { EnhancedCVResult } from "@/services/cvEnhancement";
import { sanitizeResumeHTML } from "@/utils/contentSanitizer";

interface CVDisplayProps {
  enhancedResult: EnhancedCVResult;
}

const CVDisplay = ({ enhancedResult }: CVDisplayProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Your Optimized Resume
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="cv-display-container">
          {enhancedResult.isHtmlContent ? (
            <div 
              className="cv-preview-html"
              dangerouslySetInnerHTML={{ __html: sanitizeResumeHTML(enhancedResult.resumeContent) }}
            />
          ) : (
            <div className="cv-preview-text">
              {enhancedResult.resumeContent}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CVDisplay;