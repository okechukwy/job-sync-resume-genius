import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Edit3, 
  Eye, 
  Save, 
  RotateCcw,
  Highlighter,
  Layout,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { ATSFormattedDisplay } from "./ATSFormattedDisplay";
import { RichTextEditor } from "./RichTextEditor";
import { SectionEditor } from "./SectionEditor";
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
  const [editMode, setEditMode] = useState<'structured' | 'rich' | 'preview'>('preview');

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = () => {
    onChange(localContent);
    toast.success("Changes saved successfully!");
  };

  const handleReset = () => {
    setLocalContent(originalContent);
    onChange(originalContent);
    toast.success("Content reset to original version");
  };

  const structuredResume = useMemo(() => {
    return parseResumeToStructured(localContent);
  }, [localContent]);
  
  const wordCount = localContent.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = localContent.length;

  const handleContentChange = (newContent: string) => {
    setLocalContent(newContent);
  };

  const handleStructuredChange = (updatedResume: any) => {
    // Convert structured data back to text format
    const textContent = convertStructuredToText(updatedResume);
    setLocalContent(textContent);
  };

  const convertStructuredToText = (resume: any): string => {
    // Simple conversion for now - can be enhanced
    let text = '';
    resume.sections.forEach((section: any) => {
      if (section.type === 'header') {
        const header = section.content.data;
        text += `${header.name}\n`;
        if (header.title) text += `${header.title}\n`;
        if (header.contact.email) text += `${header.contact.email}\n`;
        if (header.contact.phone) text += `${header.contact.phone}\n`;
        if (header.contact.location) text += `${header.contact.location}\n`;
        text += '\n';
      } else {
        text += `${section.title.toUpperCase()}\n`;
        if (section.content.type === 'experience_block') {
          section.content.data.forEach((exp: any) => {
            text += `${exp.title} at ${exp.company} ${exp.dates}\n`;
            exp.responsibilities.forEach((resp: string) => {
              text += `• ${resp}\n`;
            });
            text += '\n';
          });
        } else if (section.content.type === 'list') {
          section.content.data.forEach((item: string) => {
            text += `• ${item}\n`;
          });
        } else if (section.content.type === 'paragraph') {
          text += `${section.content.data}\n`;
        }
        text += '\n';
      }
    });
    return text;
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Professional CV Editor
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
              {appliedSuggestions.length > 0 && (
                <Badge variant="secondary">
                  {appliedSuggestions.length} changes applied
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
            
            {editMode !== 'preview' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
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
        <Tabs value={editMode} onValueChange={(value) => setEditMode(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mx-6 mb-4">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="structured" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Sections
            </TabsTrigger>
            <TabsTrigger value="rich" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rich Text
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[600px]">
            <TabsContent value="preview" className="p-0 m-0">
              <ATSFormattedDisplay 
                structuredResume={structuredResume}
                appliedSuggestions={appliedSuggestions}
                showChanges={showChanges}
              />
            </TabsContent>
            
            <TabsContent value="structured" className="p-6 m-0">
              <SectionEditor 
                structuredResume={structuredResume}
                onChange={handleStructuredChange}
              />
            </TabsContent>
            
            <TabsContent value="rich" className="p-6 m-0">
              <RichTextEditor 
                content={localContent}
                onChange={handleContentChange}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};