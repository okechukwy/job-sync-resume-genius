import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Zap, Download } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { readFileContent } from "@/utils/fileReader";
import { enhanceCV } from "@/services/cvEnhancement";
import { downloadFile } from "@/utils/downloadUtils";

interface ApplyRecommendationsProps {
  uploadedFile: File;
  onContinue: () => void;
}

const ApplyRecommendations = ({ uploadedFile, onContinue }: ApplyRecommendationsProps) => {
  const [recommendationsApplied, setRecommendationsApplied] = useState(false);
  const [enhancedCV, setEnhancedCV] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");

  const handleApplyRecommendations = async () => {
    console.log("Apply recommendations clicked - should NOT redirect");
    toast.success("Applying recommendations to your resume...");
    
    try {
      // Read original file content if not already read
      let content = originalContent;
      if (!content) {
        content = await readFileContent(uploadedFile);
        setOriginalContent(content);
      }

      // Simulate applying each recommendation
      const recommendations = [
        "Adding professional summary section...",
        "Enhancing experience descriptions with metrics...", 
        "Expanding skills section with missing keywords...",
        "Optimizing formatting for ATS compatibility...",
        "Finalizing optimized version..."
      ];
      
      let currentStep = 0;
      const applyNext = async () => {
        if (currentStep < recommendations.length) {
          toast.info(recommendations[currentStep]);
          currentStep++;
          setTimeout(applyNext, 800);
        } else {
          // Apply enhancements
          const enhanced = await enhanceCV(content);
          setEnhancedCV(enhanced);
          setRecommendationsApplied(true);
          console.log("All recommendations applied - staying on analysis page");
          toast.success("All recommendations applied to your CV! Review the optimized version below.");
        }
      };
      
      setTimeout(applyNext, 500);
    } catch (error) {
      toast.error("Failed to read CV content. Please try again.");
      console.error("Error reading file:", error);
    }
  };

  const handleDownload = async (format: 'txt' | 'pdf' | 'docx') => {
    const content = enhancedCV || originalContent;
    const fileName = uploadedFile.name.replace(/\.[^/.]+$/, '');
    await downloadFile(content, fileName, format);
  };

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

      {recommendationsApplied && enhancedCV && (
        <>
          {/* Enhanced CV Display */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Your Optimized Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white text-black p-6 rounded-lg border max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {enhancedCV}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Your Optimized Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Choose your preferred format to download the optimized resume.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => handleDownload('txt')}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download as TXT
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => handleDownload('pdf')}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download as PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => handleDownload('docx')}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download as DOCX
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ApplyRecommendations;