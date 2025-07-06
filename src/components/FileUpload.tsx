import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface FileUploadProps {
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
  onStartFromScratch: () => void;
}

const FileUpload = ({ uploadedFile, onFileChange, onStartFromScratch }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOC, or DOCX file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    onFileChange(file);
    toast.success('Resume uploaded successfully! Analyzing your resume...');
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Resume removed');
  };

  return (
    <div className="text-center">
      <div className="glass-card p-8 rounded-lg border border-border/20 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Already have a resume?</h3>
        <p className="text-muted-foreground mb-6">
          Upload your existing resume and we'll help you optimize it for ATS systems
        </p>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {/* Show uploaded file info if file is selected */}
        {uploadedFile ? (
          <div className="mb-6">
            <div className="glass-card p-4 rounded-lg border border-success/20 bg-success/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-success" />
                  <div className="text-left">
                    <p className="font-medium text-success">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Great! Now select your industry to continue with resume optimization.
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button variant="hero" size="lg" onClick={handleUploadClick}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Resume
            </Button>
            <Button variant="glass" size="lg" onClick={onStartFromScratch}>
              Start from Scratch
            </Button>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          Supported formats: PDF, DOC, DOCX (max 5MB)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;