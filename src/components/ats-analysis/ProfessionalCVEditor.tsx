import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Edit3, 
  Save, 
  RotateCcw,
  Highlighter,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import { ProfessionalATSTemplate } from "./ProfessionalATSTemplate";
import { parseResumeToStructured } from "@/utils/resumeStructureParser";

interface AppliedSuggestion {
  id: string;
  originalText: string;
  newText: string;
  section: string;
  timestamp: number;
}

interface ProfessionalCVEditorProps {
  content: string;
  originalContent: string;
  onChange: (content: string) => void;
  appliedSuggestions: AppliedSuggestion[];
}

export const ProfessionalCVEditor = ({ 
  content, 
  originalContent, 
  onChange, 
  appliedSuggestions 
}: ProfessionalCVEditorProps) => {
  const [localContent, setLocalContent] = useState(content);
  const [showChanges, setShowChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = () => {
    onChange(localContent);
    setIsEditing(false);
    toast.success("Changes saved successfully!");
  };

  const handleReset = () => {
    setLocalContent(originalContent);
    onChange(originalContent);
    setIsEditing(false);
    toast.success("Content reset to original version");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const structuredResume = useMemo(() => {
    return parseResumeToStructured(localContent);
  }, [localContent]);
  
  const wordCount = localContent.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = localContent.length;

  const handleContentChange = (newContent: string) => {
    setLocalContent(newContent);
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Professional ATS Resume
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
              {appliedSuggestions.length > 0 && (
                <Badge variant="secondary">
                  {appliedSuggestions.length} optimization{appliedSuggestions.length !== 1 ? 's' : ''} applied
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChanges(!showChanges)}
              disabled={appliedSuggestions.length === 0}
            >
              <Highlighter className="h-4 w-4" />
              {showChanges ? 'Hide' : 'Show'} Changes
            </Button>
            
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                  Cancel
                </Button>
                
                <Button
                  size="sm"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[700px]">
          {!isEditing ? (
            <ProfessionalATSTemplate 
              structuredResume={structuredResume}
              appliedSuggestions={appliedSuggestions}
              showChanges={showChanges}
            />
          ) : (
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Edit Resume Content
                </label>
                <p className="text-xs text-muted-foreground mb-4">
                  Make changes to your resume content. Use the preview mode to see how it looks with ATS formatting.
                </p>
              </div>
              <textarea
                value={localContent}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full h-[500px] p-4 border border-border rounded-lg bg-background text-foreground text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Paste your resume content here..."
              />
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};