import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap } from "lucide-react";
import { useApplyRecommendations } from "../hooks/useApplyRecommendations";
import CVDisplay from "./CVDisplay";
import EnhancementLog from "./EnhancementLog";
import DownloadOptions from "./DownloadOptions";

interface ApplyRecommendationsProps {
  uploadedFile: File;
  onContinue: () => void;
}

const ApplyRecommendations = ({ uploadedFile, onContinue }: ApplyRecommendationsProps) => {
  const {
    recommendationsApplied,
    enhancedResult,
    originalContent,
    handleApplyRecommendations
  } = useApplyRecommendations(uploadedFile);

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Apply Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Let our AI apply the optimization recommendations directly to your resume for better ATS performance.
          </p>
          {!recommendationsApplied ? (
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={handleApplyRecommendations}
              className="w-full"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Apply All Recommendations
            </Button>
          ) : (
            <Badge variant="secondary" className="w-full justify-center py-2">
              ✅ Recommendations Applied Successfully
            </Badge>
          )}
        </CardContent>
      </Card>

      {recommendationsApplied && enhancedResult && (
        <>
          <CVDisplay enhancedResult={enhancedResult} />
          <EnhancementLog enhancedResult={enhancedResult} />
          <DownloadOptions 
            enhancedResult={enhancedResult}
            originalContent={originalContent}
            uploadedFile={uploadedFile}
          />
        </>
      )}
    </div>
  );
};

export default ApplyRecommendations;