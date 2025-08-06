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
    // Save current state to undo stack
    setUndoStack(prev => [...prev, currentContent]);
    setRedoStack([]); // Clear redo stack
    
    // Apply the suggestion
    const updatedContent = currentContent.replace(originalText, newText);
    setCurrentContent(updatedContent);
    
    // Track applied suggestion
    const appliedSuggestion: AppliedSuggestion = {
      id: suggestionId,
      originalText,
      newText,
      section,
      timestamp: Date.now()
    };
    setAppliedSuggestions(prev => [...prev, appliedSuggestion]);
    
    // Update score optimistically
    setCurrentScore(prev => Math.min(100, prev + 2));
    
    toast.success("Suggestion applied successfully!");
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