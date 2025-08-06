import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Edit3, Save, Undo, Redo, Type, AlignLeft, AlignCenter, 
  Bold, Italic, Underline, Eye, EyeOff, Zap, History
} from "lucide-react";
import { EnhancedCVResult } from "@/services/cvEnhancement";

interface RealTimeEditorProps {
  initialContent: string;
  enhancedResult?: EnhancedCVResult;
  isHtml?: boolean;
  onContentChange: (content: string) => void;
  onSave: (content: string) => void;
}

interface EditHistory {
  content: string;
  timestamp: number;
  description: string;
}

const RealTimeEditor = ({
  initialContent,
  enhancedResult,
  isHtml = false,
  onContentChange,
  onSave
}: RealTimeEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [fontSize, setFontSize] = useState('14');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [editHistory, setEditHistory] = useState<EditHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadContent = async () => {
      const rawContent = enhancedResult?.resumeContent || initialContent;
      
      // Sanitize content for editor display
      const { sanitizeForEditor } = await import('@/utils/contentSanitizer');
      const cleanContent = sanitizeForEditor(rawContent);
      
      setContent(cleanContent);
    };
    
    loadContent();
  }, [enhancedResult, initialContent]);

  useEffect(() => {
    onContentChange(content);
    setHasUnsavedChanges(content !== initialContent);
  }, [content, initialContent, onContentChange]);

  const addToHistory = (newContent: string, description: string) => {
    const newHistory = [...editHistory.slice(0, historyIndex + 1), {
      content: newContent,
      timestamp: Date.now(),
      description
    }];
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    addToHistory(newContent, 'Manual edit');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(editHistory[historyIndex - 1].content);
    }
  };

  const handleRedo = () => {
    if (historyIndex < editHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(editHistory[historyIndex + 1].content);
    }
  };

  const handleSave = () => {
    onSave(content);
    setHasUnsavedChanges(false);
  };

  const handleFormatText = (format: 'bold' | 'italic' | 'underline') => {
    if (!editorRef.current) return;
    
    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      let formattedText = selectedText;
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
      }
      
      const newContent = content.substring(0, start) + formattedText + content.substring(end);
      handleContentChange(newContent);
    }
  };

  const handleInsertSuggestion = (suggestion: any) => {
    if (!editorRef.current) return;
    
    const start = editorRef.current.selectionStart;
    const before = content.substring(0, start);
    const after = content.substring(start);
    
    const newContent = before + suggestion.improved + after;
    handleContentChange(newContent);
    addToHistory(newContent, `Applied suggestion: ${suggestion.category}`);
  };

  const getSections = () => {
    const sections = ['all'];
    if (enhancedResult?.changesApplied) {
      const uniqueSections = Array.from(new Set(
        enhancedResult.changesApplied.map(change => change.section)
      ));
      sections.push(...uniqueSections);
    }
    return sections;
  };

  const getFilteredSuggestions = () => {
    if (!enhancedResult?.changesApplied) return [];
    
    return selectedSection === 'all' 
      ? enhancedResult.changesApplied
      : enhancedResult.changesApplied.filter(change => change.section === selectedSection);
  };

  return (
    <div className="space-y-4">
      {/* Editor Toolbar */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5" />
              Real-Time CV Editor
              {hasUnsavedChanges && (
                <Badge variant="destructive" className="text-xs">
                  Unsaved Changes
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formatting Controls */}
          <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                title="Undo"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRedo}
                disabled={historyIndex >= editHistory.length - 1}
                title="Redo"
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="w-px h-6 bg-border" />
            
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFormatText('bold')}
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFormatText('italic')}
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFormatText('underline')}
                title="Underline"
              >
                <Underline className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="w-px h-6 bg-border" />
            
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Calibri">Calibri</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12px</SelectItem>
                <SelectItem value="14">14px</SelectItem>
                <SelectItem value="16">16px</SelectItem>
                <SelectItem value="18">18px</SelectItem>
              </SelectContent>
            </Select>
            
            {editHistory.length > 0 && (
              <Badge variant="outline" className="ml-auto text-xs">
                <History className="w-3 h-3 mr-1" />
                {editHistory.length} edits
              </Badge>
            )}
          </div>

          {/* Editor Layout */}
          <div className={`grid gap-4 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Content Editor</label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {getSections().map(section => (
                      <SelectItem key={section} value={section}>
                        {section === 'all' ? 'All Sections' : section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Textarea
                ref={editorRef}
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
                style={{ 
                  fontFamily: fontFamily,
                  fontSize: `${fontSize}px`
                }}
                placeholder="Edit your resume content here..."
              />
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Live Preview</label>
                <div
                  ref={previewRef}
                  className="border rounded-lg p-4 min-h-[500px] bg-white"
                  style={{ 
                    fontFamily: fontFamily,
                    fontSize: `${fontSize}px`
                  }}
                >
                  {isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <div className="whitespace-pre-wrap">{content}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions Panel */}
      {enhancedResult?.changesApplied && getFilteredSuggestions().length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Smart Suggestions
              <Badge variant="outline">
                {getFilteredSuggestions().length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {getFilteredSuggestions().map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {suggestion.section}
                      </Badge>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {suggestion.category.replace('-', ' ')}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInsertSuggestion(suggestion)}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                  
                  <div className="text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Original:</span>
                        <div className="bg-red-50 p-2 rounded text-red-800 text-xs">
                          {suggestion.original}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Improved:</span>
                        <div className="bg-green-50 p-2 rounded text-green-800 text-xs">
                          {suggestion.improved}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {suggestion.reasoning}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealTimeEditor;