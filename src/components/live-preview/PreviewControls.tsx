import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Eye, EyeOff } from "lucide-react";

interface PreviewControlsProps {
  zoomLevel: number;
  isVisible: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleVisibility: () => void;
}

export const PreviewControls = ({
  zoomLevel,
  isVisible,
  onZoomIn,
  onZoomOut,
  onToggleVisibility,
}: PreviewControlsProps) => {
  if (!isVisible) {
    return (
      <Button
        variant="outline"
        onClick={onToggleVisibility}
        className="flex items-center gap-2"
      >
        <Eye className="w-4 h-4" />
        Show Preview
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onZoomOut}
          disabled={zoomLevel <= 0.4}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground min-w-16 text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onZoomIn}
          disabled={zoomLevel >= 1.2}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleVisibility}
      >
        <EyeOff className="w-4 h-4" />
      </Button>
    </div>
  );
};