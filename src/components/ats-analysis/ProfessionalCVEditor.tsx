
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Edit3, 
  Eye,
  Highlighter,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { ATSResumeDisplay } from "./ATSResumeDisplay";
import { SimpleResumeEditor } from "./SimpleResumeEditor";
import { parseResumeToStructured } from "@/utils/resumeStructureParser";
import { processResumeContent } from "@/utils/atsContentProcessor";

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newContent: string) => {
    const processed = processResumeContent(newContent);
    setLocalContent(processed.cleanText);
    onChange(processed.cleanText);
    setIsEditing(false);
    toast.success("Resume updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const structuredResume = useMemo(() => {
    return parseResumeToStructured(localContent);
  }, [localContent]);
  
  const wordCount = localContent.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = localContent.length;

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              ATS-Optimized Resume
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
              <>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview Mode
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Resume
                </Button>
              </>
            ) : (
              <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                <Edit3 className="h-3 w-3 mr-1" />
                Edit Mode
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[700px]">
          {!isEditing ? (
            <div className="p-6">
              <ATSResumeDisplay
                structuredResume={structuredResume}
                appliedSuggestions={appliedSuggestions}
                showChanges={showChanges}
                content={localContent}
              />
            </div>
          ) : (
            <SimpleResumeEditor
              content={localContent}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
