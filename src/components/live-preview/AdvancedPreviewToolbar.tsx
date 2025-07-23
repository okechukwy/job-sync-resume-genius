import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo,
  Redo,
  Download,
  FileText,
  Palette,
  Type,
  Save,
  Eye,
  Smartphone,
  Monitor
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AdvancedPreviewToolbarProps {
  onFormatText: (format: 'bold' | 'italic' | 'underline') => void;
  onAlignText: (alignment: 'left' | 'center' | 'right') => void;
  onFontChange: (font: string) => void;
  onFontSizeChange: (size: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: (format: 'pdf' | 'word' | 'txt') => void;
  onPreviewMode: (mode: 'desktop' | 'mobile') => void;
  currentFont: string;
  currentFontSize: string;
  previewMode: 'desktop' | 'mobile';
  hasUnsavedChanges: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export const AdvancedPreviewToolbar = ({
  onFormatText,
  onAlignText,
  onFontChange,
  onFontSizeChange,
  onUndo,
  onRedo,
  onSave,
  onExport,
  onPreviewMode,
  currentFont,
  currentFontSize,
  previewMode,
  hasUnsavedChanges,
  canUndo,
  canRedo,
}: AdvancedPreviewToolbarProps) => {
  
  const handleExport = (format: 'pdf' | 'word' | 'txt') => {
    onExport(format);
    toast.success(`Exporting as ${format.toUpperCase()}...`);
  };

  return (
    <div className="flex items-center justify-between p-3 border-b bg-white/95 backdrop-blur-sm border-gray-200">
      {/* Left Section - Text Formatting */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="h-8 w-8 p-0"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className="h-8 w-8 p-0"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFormatText('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFormatText('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFormatText('underline')}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAlignText('left')}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAlignText('center')}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAlignText('right')}
            className="h-8 w-8 p-0"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Font Controls */}
        <div className="flex items-center gap-2">
          <Select value={currentFont} onValueChange={onFontChange}>
            <SelectTrigger className="w-32 h-8">
              <Type className="h-3 w-3 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times">Times</SelectItem>
              <SelectItem value="Georgia">Georgia</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currentFontSize} onValueChange={onFontSizeChange}>
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="14">14</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="18">18</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* Preview Mode */}
        <div className="flex items-center gap-1">
          <Button
            variant={previewMode === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onPreviewMode('desktop')}
            className="h-8 w-8 p-0"
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={previewMode === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onPreviewMode('mobile')}
            className="h-8 w-8 p-0"
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Save Status */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className="h-8 flex items-center gap-1"
          >
            <Save className="h-3 w-3" />
            {hasUnsavedChanges ? (
              <Badge variant="destructive" className="h-4 px-1 text-xs">
                •
              </Badge>
            ) : (
              <span className="text-xs text-muted-foreground">Saved</span>
            )}
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Export Options */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleExport('pdf')}
            className="h-8 flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            <span className="text-xs">PDF</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleExport('word')}
            className="h-8 flex items-center gap-1"
          >
            <FileText className="h-3 w-3" />
            <span className="text-xs">Word</span>
          </Button>
        </div>
      </div>
    </div>
  );
};