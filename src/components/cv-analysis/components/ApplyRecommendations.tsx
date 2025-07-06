import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Zap } from "lucide-react";
import { toast } from "sonner";

interface ApplyRecommendationsProps {
  uploadedFile: File;
  onContinue: () => void;
}

const ApplyRecommendations = ({ uploadedFile, onContinue }: ApplyRecommendationsProps) => {
  const handleApplyRecommendations = () => {
    toast.success("Applying recommendations to your resume...");
    
    // Simulate applying each recommendation to relevant sections
    const recommendations = [
      "Adding professional summary section...",
      "Enhancing experience descriptions with metrics...", 
      "Expanding skills section with missing keywords...",
      "Optimizing formatting for ATS compatibility...",
      "Adding volunteer experience section..."
    ];
    
    let currentStep = 0;
    const applyNext = () => {
      if (currentStep < recommendations.length) {
        toast.info(recommendations[currentStep]);
        currentStep++;
        setTimeout(applyNext, 800);
      } else {
        toast.success("All recommendations applied to your CV! Continue with manual editing.");
        onContinue();
      }
    };
    
    setTimeout(applyNext, 500);
  };

  const handleDownloadOptimized = () => {
    toast.success("Downloading your optimized resume...");
    
    // Create a mock optimized resume content
    const optimizedContent = `
OPTIMIZED RESUME - ${uploadedFile.name}

PROFESSIONAL SUMMARY
Results-driven professional with proven track record of success. Strong analytical skills and ability to work in fast-paced environments.

EXPERIENCE
• Improved team productivity by 25% through process optimization
• Led cross-functional projects resulting in $100K cost savings
• Managed stakeholder relationships and delivered projects on time

SKILLS
JavaScript, React, Node.js, AWS, Agile, SQL, Git, Docker, Project Management, Leadership

EDUCATION
[Your Education Details]

---
This is an ATS-optimized version of your resume with applied recommendations.
Keywords have been strategically placed and formatting optimized for ATS systems.
    `;

    // Create and download the file
    const blob = new Blob([optimizedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `optimized-${uploadedFile.name.replace(/\.[^/.]+$/, '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Optimized resume downloaded successfully!");
  };

  return (
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
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="gradient" 
            size="lg" 
            onClick={handleApplyRecommendations}
            className="flex-1"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Apply All Recommendations
          </Button>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleDownloadOptimized}
            className="flex-1"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download Optimized CV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplyRecommendations;