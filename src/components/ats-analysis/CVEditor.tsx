import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Edit3, 
  Eye, 
  Save, 
  RotateCcw,
  Highlighter
} from "lucide-react";
import { toast } from "sonner";

interface AppliedSuggestion {
  id: string;
  originalText: string;
  newText: string;
  section: string;
  timestamp: number;
}

interface CVEditorProps {
  content: string;
  originalContent: string;
  onChange: (content: string) => void;
  appliedSuggestions: AppliedSuggestion[];
}

export const CVEditor = ({ 
  content, 
  originalContent, 
  onChange, 
  appliedSuggestions 
}: CVEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const [showChanges, setShowChanges] = useState(false);

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
    toast.success("Content reset to original version");
  };

  const highlightChanges = (text: string) => {
    if (!showChanges || appliedSuggestions.length === 0) {
      return text;
    }

    let highlightedText = text;
    appliedSuggestions.forEach((suggestion) => {
      const regex = new RegExp(suggestion.newText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      highlightedText = highlightedText.replace(
        regex, 
        `<mark style="background-color: hsl(var(--success) / 0.2); padding: 2px 4px; border-radius: 3px;">$&</mark>`
      );
    });
    
    return highlightedText;
  };

  const parseContentSections = (text: string) => {
    const sections = [];
    const lines = text.split('\n');
    let currentSection = { title: 'Document Start', content: '', startIndex: 0 };
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Check if line is likely a section header
      if (trimmedLine.length > 0 && 
          (trimmedLine.toUpperCase() === trimmedLine || 
           trimmedLine.includes('EXPERIENCE') ||
           trimmedLine.includes('EDUCATION') ||
           trimmedLine.includes('SKILLS') ||
           trimmedLine.includes('SUMMARY') ||
           trimmedLine.includes('OBJECTIVE'))) {
        
        if (currentSection.content.trim()) {
          sections.push(currentSection);
        }
        
        currentSection = {
          title: trimmedLine || `Section ${sections.length + 1}`,
          content: '',
          startIndex: index
        };
      } else {
        currentSection.content += line + '\n';
      }
    });
    
    if (currentSection.content.trim()) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const sections = parseContentSections(content);
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              CV Editor
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
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              {isEditing ? 'Preview' : 'Edit'}
            </Button>
            
            {isEditing && (
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
        <ScrollArea className="h-[600px]">
          {isEditing ? (
            <div className="p-6">
              <Textarea
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                className="min-h-[550px] font-mono text-sm"
                placeholder="Edit your CV content here..."
              />
            </div>
          ) : (
            <div className="p-6">
              {sections.length > 1 ? (
                <div className="space-y-6">
                  {sections.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-semibold text-lg border-b pb-2">
                        {section.title}
                      </h3>
                      <div 
                        className="text-sm leading-relaxed whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightChanges(section.content) 
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightChanges(content) 
                  }}
                />
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};