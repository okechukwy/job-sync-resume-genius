import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Edit } from "lucide-react";
import { toast } from "sonner";
import { ResumeData } from "@/hooks/useResumeSteps";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useMemo } from "react";
import { calculateATSScore } from "@/utils/atsScoreCalculator";
import { ResumeLayoutRenderer } from "./resume-layouts/ResumeLayoutRenderer";
import { useTemplateStyles } from "./live-preview/hooks/useTemplateStyles";
import { getLayoutVariant, formatDate } from "./live-preview/utils/previewUtils";
import { getTemplateById } from "@/config/templateConfig";

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  // Enhanced template mapping for new system
  const getTemplateId = (templateName: string): string | undefined => {
    const nameMapping: Record<string, string> = {
      // Professional templates
      'Corporate Executive': 'corporate-executive',
      'Modern Professional': 'modern-professional',
      'Academic Researcher': 'academic-researcher',
      'Business Manager': 'business-manager',
      'Finance Executive': 'finance-executive',
      'Healthcare Professional': 'healthcare-professional',
      'Legal Professional': 'legal-professional',
      'Consulting Expert': 'consulting-expert',
      
      // Creative templates
      'Graphic Designer': 'graphic-designer',
      'UX/UI Designer': 'ux-ui-designer',
      'Marketing Creative': 'marketing-creative',
      'Content Creator': 'content-creator',
      'Art Director': 'art-director',
      'Photographer': 'photographer',
      
      // Technical templates
      'Software Engineer Pro': 'software-engineer-pro',
      'Data Scientist Elite': 'data-scientist-elite',
      'DevOps Engineer': 'devops-engineer',
      'Cybersecurity Expert': 'cybersecurity-expert',
      'AI/ML Engineer': 'ai-ml-engineer',
      'Cloud Architect': 'cloud-architect',
      
      // Legacy mapping
      'Medical Doctor': 'healthcare-professional',
      'Software Engineer': 'software-engineer-pro',
      'Data Scientist': 'data-scientist-elite'
    };
    return nameMapping[templateName];
  };

  const templateId = getTemplateId(template);
  const unifiedTemplate = templateId ? getTemplateById(templateId) : null;
  const templateStyles = useTemplateStyles(template);
  const layoutVariant = getLayoutVariant(template);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    
    try {
      toast.info("Generating PDF...");
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = data.personalInfo.fullName 
        ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      
      pdf.save(fileName);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${data.personalInfo.fullName || 'My'} Resume`,
      text: `Check out my professional resume created with ResumeAI`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Resume link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Resume link copied to clipboard!");
      } catch (clipboardError) {
        toast.error("Unable to share or copy link");
      }
    }
  };

  const handleEdit = () => {
    toast.info("You can use the Previous button to edit any section");
  };

  // Get enhanced spacing based on template category
  const getLayoutSpacing = () => {
    if (unifiedTemplate) {
      const stylePreset = unifiedTemplate.stylePreset;
      if (stylePreset.includes('spacious') || stylePreset.includes('creative') || stylePreset.includes('portfolio')) {
        return 'p-12';
      }
      if (stylePreset.includes('compact') || stylePreset.includes('technical') || stylePreset.includes('developer')) {
        return 'p-6';
      }
    }
    return 'p-8';
  };

  // Calculate dynamic ATS score
  const atsResult = useMemo(() => calculateATSScore(data, template), [data, template]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
      case 'excellent':
        return 'bg-success';
      case 'good':
      case 'partial':
        return 'bg-warning';
      default:
        return 'bg-destructive';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">Resume Preview</h2>
          <p className="text-muted-foreground">
            Review your resume and download when ready. You can go back to edit any section.
          </p>
        </div>
        <Badge variant="secondary" className="glass-card">
          {unifiedTemplate ? 
            `${unifiedTemplate.category.charAt(0).toUpperCase() + unifiedTemplate.category.slice(1)} Resume` : 
            'Professional Resume'
          }
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleDownload} className="flex-1 min-w-40">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={handleShare} className="flex-1 min-w-40">
          <Share2 className="w-4 h-4 mr-2" />
          Share Link
        </Button>
        <Button variant="ghost" onClick={handleEdit} className="flex-1 min-w-40">
          <Edit className="w-4 h-4 mr-2" />
          Edit Resume
        </Button>
      </div>

      {/* Resume Preview */}
      <Card ref={resumeRef} className="glass-card max-w-4xl mx-auto">
        <CardContent className={`${getLayoutSpacing()} bg-white text-black`}>
          <ResumeLayoutRenderer 
            data={data}
            styles={templateStyles}
            layoutVariant={layoutVariant}
            templateId={templateId}
            formatDate={formatDate}
          />
        </CardContent>
      </Card>

      {/* Enhanced ATS Score Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📊 ATS Optimization Score
            <Badge variant="secondary">{atsResult.overallScore}/100</Badge>
            {unifiedTemplate && (
              <Badge variant="outline" className="ml-2">
                {unifiedTemplate.category} Template
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(atsResult.checks.contactInfo.status)}`}></div>
              <span>{atsResult.checks.contactInfo.message}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(atsResult.checks.keywords.status)}`}></div>
              <span>{atsResult.checks.keywords.message}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(atsResult.checks.metrics.status)}`}></div>
              <span>{atsResult.checks.metrics.message}</span>
            </div>
          </div>
          {atsResult.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Suggestions for improvement:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {atsResult.suggestions.slice(0, 3).map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumePreview;
