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

interface ResumePreviewProps {
  data: ResumeData;
  industry: string;
  template: string;
}

const ResumePreview = ({ data, industry, template }: ResumePreviewProps) => {
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

  // Enhanced layout system with 5 modern variants
  const getLayoutVariant = () => {
    const templateName = template.toLowerCase().replace(/\s+/g, '-');
    
    // Determine layout variant based on template
    if (templateName.includes('minimalist') || templateName.includes('elegant')) {
      return 'modern-minimalist';
    } else if (templateName.includes('creative') || templateName.includes('colorful')) {
      return 'creative-showcase';
    } else if (templateName.includes('executive') || templateName.includes('finance')) {
      return 'executive-premium';
    } else if (templateName.includes('tech') || templateName.includes('software') || templateName.includes('developer')) {
      return 'tech-forward';
    } else {
      return 'classic-professional';
    }
  };

  const getTemplateStyles = () => {
    const templateName = template.toLowerCase().replace(/\s+/g, '-');
    const layoutVariant = getLayoutVariant();
    
    const baseStyles = {
      'classic-professional': {
        headerBg: 'bg-gradient-to-r from-slate-50 to-gray-100',
        headerText: 'text-slate-900',
        accentColor: 'text-slate-700',
        borderColor: 'border-slate-200',
        sectionBorder: 'border-l-4 border-slate-600 pl-4',
        layout: 'single-column',
        spacing: 'standard'
      },
      'modern-minimalist': {
        headerBg: 'bg-white',
        headerText: 'text-gray-900',
        accentColor: 'text-gray-600',
        borderColor: 'border-gray-100',
        sectionBorder: 'border-l-2 border-gray-300 pl-6',
        layout: 'clean-geometry',
        spacing: 'spacious'
      },
      'creative-showcase': {
        headerBg: 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50',
        headerText: 'text-gray-900',
        accentColor: 'text-purple-600',
        borderColor: 'border-purple-200',
        sectionBorder: 'border-l-6 border-gradient-to-b from-purple-400 to-pink-400 pl-4',
        layout: 'visual-hierarchy',
        spacing: 'dynamic'
      },
      'executive-premium': {
        headerBg: 'bg-gradient-to-r from-slate-900 to-gray-800',
        headerText: 'text-white',
        accentColor: 'text-amber-600',
        borderColor: 'border-amber-200',
        sectionBorder: 'border-l-4 border-amber-500 pl-4',
        layout: 'sophisticated',
        spacing: 'premium'
      },
      'tech-forward': {
        headerBg: 'bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900',
        headerText: 'text-white',
        accentColor: 'text-blue-400',
        borderColor: 'border-blue-300',
        sectionBorder: 'border-l-4 border-blue-400 pl-4',
        layout: 'grid-based',
        spacing: 'compact'
      }
    };

    // Template-specific color overrides
    const templateOverrides = {
      'tech-professional': { accentColor: 'text-blue-600', sectionBorder: 'border-l-4 border-blue-600 pl-4' },
      'creative-professional': { accentColor: 'text-purple-600', sectionBorder: 'border-l-4 border-purple-400 pl-4' },
      'healthcare-specialist': { accentColor: 'text-green-600', sectionBorder: 'border-l-4 border-green-500 pl-4' },
      'finance-expert': { accentColor: 'text-slate-700', sectionBorder: 'border-l-4 border-slate-600 pl-4' },
      'executive-leader': { accentColor: 'text-amber-700', sectionBorder: 'border-l-4 border-amber-600 pl-4' },
      'recent-graduate': { accentColor: 'text-teal-600', sectionBorder: 'border-l-4 border-teal-500 pl-4' }
    };

    const variant = baseStyles[layoutVariant];
    const overrides = templateOverrides[templateName] || {};
    
    return {
      ...variant,
      ...overrides,
      skillsGrid: layoutVariant !== 'modern-minimalist' && layoutVariant !== 'executive-premium'
    };
  };

  const styles = getTemplateStyles();
  const layoutVariant = getLayoutVariant();

  // Get layout-specific spacing
  const getLayoutSpacing = () => {
    const spacing = {
      'standard': 'p-8',
      'spacious': 'p-12',
      'dynamic': 'p-8',
      'premium': 'p-10',
      'compact': 'p-6'
    };
    return spacing[styles.spacing] || 'p-8';
  };

  // Render layout based on variant
  const renderLayout = () => {
    switch (layoutVariant) {
      case 'modern-minimalist':
        return renderModernMinimalistLayout();
      case 'creative-showcase':
        return renderCreativeShowcaseLayout();
      case 'executive-premium':
        return renderExecutivePremiumLayout();
      case 'tech-forward':
        return renderTechForwardLayout();
      default:
        return renderClassicProfessionalLayout();
    }
  };

  // Classic Professional Layout
  const renderClassicProfessionalLayout = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className={`text-center ${styles.headerBg} ${styles.borderColor} rounded-lg p-8 -mx-8 -mt-8 mb-8`}>
        <h1 className={`text-3xl font-bold mb-3 ${styles.headerText}`}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className={`flex flex-wrap justify-center gap-4 text-sm ${styles.headerText} opacity-90`}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
          {data.personalInfo.website && (
            <span className={`${styles.headerBg.includes('gradient') || styles.headerBg.includes('900') ? 'text-white' : styles.accentColor} font-medium`}>{data.personalInfo.website}</span>
          )}
          {data.personalInfo.linkedin && (
            <span className={`${styles.headerBg.includes('gradient') || styles.headerBg.includes('900') ? 'text-white' : styles.accentColor} font-medium`}>{data.personalInfo.linkedin}</span>
          )}
        </div>
      </div>
      {renderExperienceSection()}
      {renderEducationSection()}
      {renderSkillsSection()}
    </div>
  );

  // Modern Minimalist Layout
  const renderModernMinimalistLayout = () => (
    <div className="space-y-12">
      {/* Clean Header */}
      <div className="text-left border-b-2 border-gray-100 pb-8">
        <h1 className="text-4xl font-light mb-2 text-gray-900">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
          <div className="space-y-1">
            {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          </div>
          <div className="space-y-1">
            {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
            {data.personalInfo.website && <div className="text-gray-500">{data.personalInfo.website}</div>}
          </div>
        </div>
      </div>
      {renderExperienceSection()}
      {renderEducationSection()}
      {renderSkillsSection()}
    </div>
  );

  // Creative Showcase Layout
  const renderCreativeShowcaseLayout = () => (
    <div className="space-y-8">
      {/* Creative Header */}
      <div className={`${styles.headerBg} rounded-2xl p-8 -mx-8 -mt-8 mb-8 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="relative">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-700">
            {data.personalInfo.email && <span className="bg-white/60 px-3 py-1 rounded-full">{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span className="bg-white/60 px-3 py-1 rounded-full">{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span className="bg-white/60 px-3 py-1 rounded-full">{data.personalInfo.location}</span>}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {renderExperienceSection()}
          {renderEducationSection()}
        </div>
        <div className="space-y-8">
          {renderSkillsSection()}
        </div>
      </div>
    </div>
  );

  // Executive Premium Layout
  const renderExecutivePremiumLayout = () => (
    <div className="space-y-10">
      {/* Premium Header */}
      <div className={`${styles.headerBg} rounded-lg p-10 -mx-10 -mt-10 mb-10`}>
        <h1 className={`text-4xl font-serif font-bold mb-4 ${styles.headerText} tracking-wide`}>{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className={`grid grid-cols-2 gap-8 text-sm ${styles.headerText} opacity-90`}>
          <div className="space-y-2">
            {data.personalInfo.email && <div className="flex items-center gap-2">📧 {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div className="flex items-center gap-2">📞 {data.personalInfo.phone}</div>}
          </div>
          <div className="space-y-2">
            {data.personalInfo.location && <div className="flex items-center gap-2">📍 {data.personalInfo.location}</div>}
            {data.personalInfo.linkedin && <div className="flex items-center gap-2">💼 {data.personalInfo.linkedin}</div>}
          </div>
        </div>
      </div>
      {renderExperienceSection()}
      {renderEducationSection()}
      {renderSkillsSection()}
    </div>
  );

  // Tech Forward Layout
  const renderTechForwardLayout = () => (
    <div className="space-y-6">
      {/* Tech Header */}
      <div className={`${styles.headerBg} rounded-xl p-8 -mx-8 -mt-8 mb-8 relative`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="relative">
          <h1 className={`text-3xl font-mono font-bold mb-3 ${styles.headerText}`}>{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ${styles.headerText} font-mono`}>
            <div className="space-y-1">
              {data.personalInfo.email && <div>// {data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>// {data.personalInfo.phone}</div>}
            </div>
            <div className="space-y-1">
              {data.personalInfo.location && <div>// {data.personalInfo.location}</div>}
              {data.personalInfo.website && <div className="text-blue-300">// {data.personalInfo.website}</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {renderExperienceSection()}
          {renderEducationSection()}
        </div>
        <div className="space-y-6">
          {renderSkillsSection()}
        </div>
      </div>
    </div>
  );

  // Reusable section renderers
  const renderExperienceSection = () => (
    data.experience.length > 0 && (
      <div className="space-y-6">
        <h2 className={`text-xl font-bold text-gray-800 ${styles.sectionBorder} mb-4`}>
          EXPERIENCE
        </h2>
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{exp.position}</h3>
                <p className="text-gray-700 font-medium">{exp.company}</p>
              </div>
              <div className={`text-right text-sm ${styles.accentColor} font-medium`}>
                <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderEducationSection = () => (
    data.education.length > 0 && (
      <div className="space-y-4">
        <h2 className={`text-xl font-bold text-gray-800 ${styles.sectionBorder} mb-4`}>
          EDUCATION
        </h2>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
              <p className="text-gray-700">{edu.school}</p>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
            <div className={`text-right text-sm ${styles.accentColor} font-medium`}>
              <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderSkillsSection = () => (
    (data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
      <div className="space-y-4">
        <h2 className={`text-xl font-bold text-gray-800 ${styles.sectionBorder} mb-4`}>
          SKILLS
        </h2>
        {data.skills.technical.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Technical Skills:</h3>
            {styles.skillsGrid ? (
              <div className="grid grid-cols-2 gap-2 text-sm">
                {data.skills.technical.map((skill, index) => (
                  <div key={index} className={`${styles.accentColor} font-medium`}>• {skill}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700">{data.skills.technical.join(' • ')}</p>
            )}
          </div>
        )}
        {data.skills.soft.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Core Competencies:</h3>
            {styles.skillsGrid ? (
              <div className="grid grid-cols-2 gap-2 text-sm">
                {data.skills.soft.map((skill, index) => (
                  <div key={index} className={`${styles.accentColor} font-medium`}>• {skill}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-700">{data.skills.soft.join(' • ')}</p>
            )}
          </div>
        )}
      </div>
    )
  );

  // Calculate dynamic ATS score
  const atsResult = useMemo(() => calculateATSScore(data, industry), [data, industry]);

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
        <CardContent className={`${getLayoutSpacing()} bg-white text-black`}>
          <ResumeLayoutRenderer 
            data={data}
            styles={styles}
            layoutVariant={layoutVariant}
            formatDate={formatDate}
          />
        </CardContent>
      </Card>

      {/* Dynamic ATS Score Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📊 ATS Optimization Score
            <Badge variant="secondary">{atsResult.overallScore}/100</Badge>
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