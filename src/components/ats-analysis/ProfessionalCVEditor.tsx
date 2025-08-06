import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit3, 
  Save, 
  RotateCcw,
  Highlighter,
  Eye,
  FileText,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { ProfessionalATSTemplate } from "./ProfessionalATSTemplate";
import { StructuredEditor } from "./StructuredEditor";
import { parseResumeToStructured } from "@/utils/resumeStructureParser";
import { prepareContentForEditing, extractCleanContent } from "@/utils/editorContentUtils";

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
  const [editMode, setEditMode] = useState<'text' | 'structured'>('text');

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

  const handleStructuredSave = (newContent: string) => {
    setLocalContent(newContent);
    onChange(newContent);
    setIsEditing(false);
    toast.success("Changes saved successfully!");
  };

  // Clean content for editing
  const cleanContentForEdit = useMemo(() => {
    return prepareContentForEditing(localContent);
  }, [localContent]);

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
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Eye className="h-4 w-4" />
                  Preview Mode
                </Button>
              </>
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
            <div className="relative">
              {/* Mode Indicator */}
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview Mode
                </Badge>
              </div>
              
              <ProfessionalATSTemplate 
                structuredResume={structuredResume}
                appliedSuggestions={appliedSuggestions}
                showChanges={showChanges}
              />
            </div>
          ) : (
            <div className="relative">
              {/* Mode Indicator */}
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit Mode
                </Badge>
              </div>
              
              <Tabs value={editMode} onValueChange={(value) => setEditMode(value as 'text' | 'structured')} className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">Edit Resume Content</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose how you want to edit your resume. Use structured editing for better organization.
                      </p>
                    </div>
                    
                    <TabsList className="grid w-[400px] grid-cols-2">
                      <TabsTrigger value="text" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Text Editor
                      </TabsTrigger>
                      <TabsTrigger value="structured" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Structured Editor
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <TabsContent value="text" className="mt-0">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Edit your resume as plain text. Perfect for quick changes and bulk editing.
                    </div>
                    <textarea
                      value={cleanContentForEdit}
                      onChange={(e) => handleContentChange(e.target.value)}
                      className="w-full h-[500px] p-4 border border-border rounded-lg bg-background text-foreground text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Paste your resume content here..."
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="structured" className="mt-0">
                  <StructuredEditor
                    structuredResume={structuredResume}
                    onSave={handleStructuredSave}
                    onCancel={() => setIsEditing(false)}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};