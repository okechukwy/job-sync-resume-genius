import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TemplateActionsProps {
  templateName: string;
}

export const TemplateActions = ({ templateName }: TemplateActionsProps) => {
  const navigate = useNavigate();

  const handleTemplateClick = () => {
    try {
      console.log('🚀 Template button clicked!', templateName);
      
      // Create template parameter for URL
      const templateParam = templateName.toLowerCase().replace(/\s+/g, '-');
      const url = `/get-started?template=${encodeURIComponent(templateParam)}`;
      
      console.log('🔗 Navigating to:', url);
      console.log('📝 Template parameter:', templateParam);
      
      toast.success(`Navigating to ${templateName} template...`);
      
      // Navigate using useNavigate hook
      navigate(url);
      
      console.log('✅ Navigation completed');
    } catch (error) {
      console.error('❌ Navigation failed:', error);
      toast.error('Failed to navigate. Please try again.');
    }
  };
  const handleDownloadSample = () => {
    toast.success("Sample resume download started!");
    // Create a simple text file with template information as a sample
    const sampleContent = `${templateName} Resume Template Sample

This is a sample of the ${templateName} template.

To create your personalized resume:
1. Click "Use This Template"
2. Upload your existing resume or start from scratch
3. Follow our guided process
4. Download your professional resume

Features of this template:
- ATS-Optimized format
- Professional design
- Easy to customize
- Multiple export formats

Visit our resume builder to get started!
`;

    const blob = new Blob([sampleContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-sample.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="hero" 
          size="lg" 
          className="min-w-48" 
          onClick={handleTemplateClick}
        >
          <FileText className="w-4 h-4 mr-2" />
          Use This Template
        </Button>
        <Button variant="glass" size="lg" className="min-w-48" onClick={handleDownloadSample}>
          <Download className="w-4 h-4 mr-2" />
          Download Sample
        </Button>
      </div>
      <p className="text-sm text-contrast-medium">
        Free to use • No credit card required
      </p>
    </div>
  );
};