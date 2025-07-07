import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { downloadFile } from "@/utils/downloadUtils";
import { EnhancedCVResult } from "@/services/cvEnhancement";

interface DownloadOptionsProps {
  enhancedResult: EnhancedCVResult;
  originalContent: string;
  uploadedFile: File;
}

const DownloadOptions = ({ enhancedResult, originalContent, uploadedFile }: DownloadOptionsProps) => {
  const handleDownload = async (format: 'txt' | 'pdf' | 'docx') => {
    const content = enhancedResult?.resumeContent || originalContent;
    const fileName = uploadedFile.name.replace(/\.[^/.]+$/, '');
    const isHtml = enhancedResult?.isHtmlContent || false;
    await downloadFile(content, fileName, format, isHtml);
  };

  return (
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
            Download as RTF (Word)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadOptions;