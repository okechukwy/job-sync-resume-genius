
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fileStorageService, FileStoragePurpose } from "@/services/fileStorageService";

interface ProfileAssetUploadProps {
  type: "photo" | "background";
  currentUrl?: string;
  isUploaded: boolean;
  onUploadSuccess: (url: string) => void;
  onRemove: () => void;
}

export const ProfileAssetUpload = ({ 
  type, 
  currentUrl, 
  isUploaded, 
  onUploadSuccess, 
  onRemove 
}: ProfileAssetUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const purpose: FileStoragePurpose = type === "photo" ? "profile_picture" : "background_image";
  
  const maxSize = type === "photo" ? 2 * 1024 * 1024 : 5 * 1024 * 1024; // 2MB for photo, 5MB for background
  const recommendedDimensions = type === "photo" ? "400x400" : "1584x396";
  const label = type === "photo" ? "Professional Profile Photo" : "Background Banner";

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return false;
    }
    
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      toast.error(`Image size must be less than ${maxSizeMB}MB`);
      return false;
    }
    
    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    try {
      const { url } = await fileStorageService.uploadFile(file, purpose, 'linkedin');
      onUploadSuccess(url);
      toast.success(`${label} uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${label.toLowerCase()}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleRemove = () => {
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer
          ${dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
          ${isUploading ? 'pointer-events-none opacity-50' : 'hover:border-primary/50'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {currentUrl ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border overflow-hidden bg-muted">
                <img 
                  src={currentUrl} 
                  alt={label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-muted-foreground">
                  Recommended: {recommendedDimensions}px
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Uploaded</Badge>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-muted rounded-full">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Recommended: {recommendedDimensions}px
                  </p>
                </div>
                <Badge variant={isUploaded ? "default" : "secondary"}>
                  {isUploaded ? "Uploaded" : "Missing"}
                </Badge>
              </div>
            )}
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};
