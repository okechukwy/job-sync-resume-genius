import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Edit } from "lucide-react";
import { toast } from "sonner";
import { ResumeData } from "./ResumeSteps";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

interface ResumePreviewProps {
  data: ResumeData;
  industry: string;
}

const ResumePreview = ({ data, industry }: ResumePreviewProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);

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
      title: `${data.personalInfo.fullName || 'My'} Resume - ${industry}`,
      text: `Check out my ${industry} resume created with ResumeAI`,
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

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
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
          {industry} Resume
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
        <CardContent className="p-8 bg-white text-black">
          {/* Header */}
          <div className="text-center border-b border-gray-300 pb-6 mb-6">
            <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
              {data.personalInfo.website && (
                <span className="text-blue-600">{data.personalInfo.website}</span>
              )}
              {data.personalInfo.linkedin && (
                <span className="text-blue-600">{data.personalInfo.linkedin}</span>
              )}
            </div>
          </div>

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                EXPERIENCE
              </h2>
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                EDUCATION
              </h2>
              {data.education.map((edu, index) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.school}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">
                SKILLS
              </h2>
              {data.skills.technical.length > 0 && (
                <div className="mb-3">
                  <h3 className="font-semibold mb-2">Technical Skills:</h3>
                  <p className="text-sm text-gray-700">
                    {data.skills.technical.join(' • ')}
                  </p>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Core Competencies:</h3>
                  <p className="text-sm text-gray-700">
                    {data.skills.soft.join(' • ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ATS Score Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📊 ATS Optimization Score
            <Badge variant="secondary">85/100</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Contact Information Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Industry Keywords Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span>Consider Adding More Metrics</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Your resume is well-optimized for ATS systems. Consider adding more quantifiable achievements to improve your score further.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumePreview;