import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Zap,
  Filter,
  ChevronRight,
  Undo,
  Redo
} from "lucide-react";
import { ATSOptimizationResult } from "@/services/openaiServices";
import { EnhancedCVResult } from "@/services/cvEnhancement";
import { SuggestionsPanel } from "./SuggestionsPanel";
import { ProfessionalCVEditor } from "./ProfessionalCVEditor";
import { toast } from "sonner";

interface UnifiedATSOptimizerProps {
  analysis: ATSOptimizationResult;
  originalContent: string;
  onExport?: () => void;
}

interface AppliedSuggestion {
  id: string;
  originalText: string;
  newText: string;
  section: string;
  timestamp: number;
}

export const UnifiedATSOptimizer = ({ 
  analysis, 
  originalContent, 
  onExport 
}: UnifiedATSOptimizerProps) => {
  const [currentContent, setCurrentContent] = useState(originalContent);
  const [appliedSuggestions, setAppliedSuggestions] = useState<AppliedSuggestion[]>([]);
  const [undoStack, setUndoStack] = useState<string[]>([originalContent]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [currentScore, setCurrentScore] = useState(analysis.atsScore);
  
  const handleApplySuggestion = (suggestionId: string, originalText: string, newText: string, section: string) => {
    console.log('Applying suggestion:', { suggestionId, originalText, newText, section });
    
    // Save current state to undo stack
    setUndoStack(prev => [...prev, currentContent]);
    setRedoStack([]); // Clear redo stack
    
    // Apply the suggestion with improved content updating
    const updatedContent = applySuggestionToContent(currentContent, originalText, newText, section);
    console.log('Content after applying suggestion:', updatedContent.substring(0, 200) + '...');
    
    setCurrentContent(updatedContent);
    
    // Track applied suggestion
    const appliedSuggestion: AppliedSuggestion = {
      id: suggestionId,
      originalText,
      newText,
      section,
      timestamp: Date.now()
    };
    setAppliedSuggestions(prev => {
      const newSuggestions = [...prev, appliedSuggestion];
      console.log('Total applied suggestions:', newSuggestions.length);
      return newSuggestions;
    });
    
    // Update score optimistically
    setCurrentScore(prev => Math.min(100, prev + 2));
    
    toast.success("Suggestion applied successfully!");
  };

  const applySuggestionToContent = (content: string, originalText: string, newText: string, section: string): string => {
    console.log('applySuggestionToContent called with:', { originalText, newText, section });
    
    // Try multiple replacement strategies
    let updatedContent = content;
    
    // Strategy 1: Exact match replacement
    if (updatedContent.includes(originalText)) {
      updatedContent = updatedContent.replace(originalText, newText);
      console.log('Applied using exact match');
      return updatedContent;
    }
    
    // Strategy 2: Case-insensitive replacement
    const regex = new RegExp(originalText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    if (regex.test(updatedContent)) {
      updatedContent = updatedContent.replace(regex, newText);
      console.log('Applied using case-insensitive match');
      return updatedContent;
    }
    
    // Strategy 3: Word-by-word fuzzy matching
    const words = originalText.split(/\s+/);
    const contentLines = updatedContent.split('\n');
    
    for (let i = 0; i < contentLines.length; i++) {
      const line = contentLines[i];
      const matchedWords = words.filter(word => 
        line.toLowerCase().includes(word.toLowerCase()) && word.length > 2
      );
      
      // If we find a line with significant word overlap, replace it
      if (matchedWords.length >= Math.ceil(words.length * 0.6)) {
        contentLines[i] = line.includes(originalText) ? 
          line.replace(originalText, newText) : 
          newText;
        console.log('Applied using fuzzy match on line:', i);
        return contentLines.join('\n');
      }
    }
    
    // Strategy 4: If no match found, append to relevant section or end
    console.log('No match found, appending to content');
    const sectionHeaders = [
      'PROFESSIONAL SUMMARY', 'SUMMARY', 'OBJECTIVE',
      'EXPERIENCE', 'WORK EXPERIENCE', 'PROFESSIONAL EXPERIENCE',
      'EDUCATION', 'QUALIFICATIONS',
      'SKILLS', 'CORE COMPETENCIES', 'TECHNICAL SKILLS'
    ];
    
    const lines = updatedContent.split('\n');
    let insertIndex = -1;
    
    // Find section to insert into
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toUpperCase().trim();
      if (sectionHeaders.some(header => 
        line.includes(header) || 
        line.includes(section.toUpperCase())
      )) {
        // Find next section or end of content
        insertIndex = i + 1;
        while (insertIndex < lines.length && 
               !sectionHeaders.some(header => lines[insertIndex].toUpperCase().includes(header))) {
          insertIndex++;
        }
        break;
      }
    }
    
    if (insertIndex > -1) {
      lines.splice(insertIndex, 0, newText);
    } else {
      // Append at end
      lines.push('', newText);
    }
    
    return lines.join('\n');
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase());
    return (longer.length - distance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const handleUndo = () => {
    if (undoStack.length > 1) {
      const previousState = undoStack[undoStack.length - 2];
      setRedoStack(prev => [currentContent, ...prev]);
      setCurrentContent(previousState);
      setUndoStack(prev => prev.slice(0, -1));
      
      // Remove last applied suggestion
      setAppliedSuggestions(prev => prev.slice(0, -1));
      setCurrentScore(prev => Math.max(0, prev - 2));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setUndoStack(prev => [...prev, currentContent]);
      setCurrentContent(nextState);
      setRedoStack(prev => prev.slice(1));
      setCurrentScore(prev => Math.min(100, prev + 2));
    }
  };

  const handleContentChange = (content: string) => {
    console.log('Content changed manually:', content.substring(0, 100) + '...');
    setCurrentContent(content);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const scoreImprovement = currentScore - analysis.atsScore;

  return (
    <div className="space-y-6">
      {/* Header with Score and Controls */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <CardTitle className="text-2xl">ATS Optimization</CardTitle>
                <p className="text-muted-foreground">Apply suggestions to improve your resume</p>
              </div>
              
              <Separator orientation="vertical" className="h-12" />
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(currentScore)}`}>
                    {currentScore}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Score</div>
                </div>
                
                {scoreImprovement > 0 && (
                  <>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <div className="text-center">
                      <div className="text-lg font-semibold text-success">
                        +{scoreImprovement}
                      </div>
                      <div className="text-sm text-muted-foreground">Improvement</div>
                    </div>
                  </>
                )}
              </div>
              
              <Progress 
                value={currentScore} 
                className="w-32" 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUndo}
                disabled={undoStack.length <= 1}
              >
                <Undo className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRedo}
                disabled={redoStack.length === 0}
              >
                <Redo className="h-4 w-4" />
              </Button>
              
              {onExport && (
                <Button onClick={onExport} variant="hero">
                  Export Resume
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-6 min-h-[800px]">
        {/* Left Panel - Suggestions */}
        <SuggestionsPanel
          analysis={analysis}
          appliedSuggestions={appliedSuggestions}
          onApplySuggestion={handleApplySuggestion}
        />
        
        {/* Right Panel - Professional CV Editor */}
        <ProfessionalCVEditor
          content={currentContent}
          originalContent={originalContent}
          onChange={handleContentChange}
          appliedSuggestions={appliedSuggestions}
        />
      </div>
    </div>
  );
};
