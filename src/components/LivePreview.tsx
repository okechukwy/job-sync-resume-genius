import { ResumeData } from "@/hooks/useResumeSteps";
import { EnhancedLivePreview } from "./live-preview/EnhancedLivePreview";

interface LivePreviewProps {
  data: ResumeData;
  template: string; // This is now always a template ID
  className?: string;
  onDataUpdate?: (section: keyof ResumeData, data: any) => void;
}

const LivePreview = ({ data, template, className = "", onDataUpdate }: LivePreviewProps) => {
  // If onDataUpdate is provided, use the enhanced version with editing capabilities
  if (onDataUpdate) {
    return (
      <EnhancedLivePreview
        data={data}
        template={template}
        className={className}
        onDataUpdate={onDataUpdate}
      />
    );
  }

  // Fallback to simple preview without editing
  return (
    <div className={`${className} flex items-center justify-center p-8`}>
      <div className="text-center text-gray-500">
        <p>Preview not available without data update handler</p>
        <p className="text-sm">Use EnhancedLivePreview for full functionality</p>
      </div>
    </div>
  );
};

export default LivePreview;
