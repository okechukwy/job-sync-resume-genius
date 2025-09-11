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
  Redo,
  FileText
} from "lucide-react";
import { ATSOptimizationResult } from "@/services/openaiServices";
import { EnhancedCVResult } from "@/services/cvEnhancement";
import { SuggestionsPanel } from "./SuggestionsPanel";
import { JobscanStyleResumeViewer } from "./JobscanStyleResumeViewer";
import { OriginalCVDisplay } from "./OriginalCVDisplay";
import { toast } from "sonner";
import { parseResumeContent, convertStructuredToText } from "@/utils/enhancedResumeParser";

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
    console.log('🔧 Applying suggestion:', { 
      suggestionId, 
      originalText: originalText?.substring(0, 100), 
      newText: newText?.substring(0, 100), 
      section,
      currentContentLength: currentContent.length
    });
    
    // Save current state to undo stack
    setUndoStack(prev => [...prev, currentContent]);
    setRedoStack([]); // Clear redo stack
    
    // Apply the suggestion with improved content updating
    const updatedContent = applySuggestionToContent(currentContent, originalText, newText, section);
    
    console.log('📝 Content update result:', {
      originalLength: currentContent.length,
      updatedLength: updatedContent.length,
      contentChanged: currentContent !== updatedContent,
      preview: updatedContent.substring(0, 200) + '...'
    });
    
    if (currentContent !== updatedContent) {
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
        console.log('✅ Total applied suggestions:', newSuggestions.length);
        return newSuggestions;
      });
      
      // Update score optimistically
      setCurrentScore(prev => Math.min(100, prev + 2));
      
      toast.success(`Suggestion applied successfully! (${section})`);
    } else {
      console.warn('⚠️ Suggestion did not change content');
      toast.warning("Suggestion could not be applied - text not found in resume");
    }
  };

  const applySuggestionToContent = (content: string, originalText: string, newText: string, section: string): string => {
    console.log('Applying suggestion:', { originalText, newText, section, contentLength: content.length });
    
    // Input validation
    if (!originalText || !newText) {
      console.warn('Missing originalText or newText, skipping suggestion');
      return content;
    }
    
    // Clean and normalize text for better matching
    const cleanOriginal = originalText.trim();
    const cleanNew = newText.trim();
    
    // Strategy 1: Direct exact text replacement
    if (content.includes(cleanOriginal)) {
      const updatedContent = content.replace(cleanOriginal, cleanNew);
      console.log('✓ Applied using exact match');
      return updatedContent;
    }
    
    // Strategy 2: Case-insensitive global replacement
    const regex = new RegExp(cleanOriginal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    if (regex.test(content)) {
      const updatedContent = content.replace(regex, cleanNew);
      console.log('✓ Applied using case-insensitive match');
      return updatedContent;
    }
    
    // Strategy 3: Word-by-word fuzzy matching
    const originalWords = cleanOriginal.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const contentLines = content.split('\n');
    
    for (let i = 0; i < contentLines.length; i++) {
      const line = contentLines[i];
      const lineLower = line.toLowerCase();
      
      // Check if this line contains most of the original text words
      const matchedWords = originalWords.filter(word => lineLower.includes(word));
      const matchPercentage = matchedWords.length / originalWords.length;
      
      if (matchPercentage >= 0.6) {
        // Try exact replacement first
        if (line.includes(cleanOriginal)) {
          contentLines[i] = line.replace(cleanOriginal, cleanNew);
        } else {
          // Replace the entire line with the new text
          contentLines[i] = cleanNew;
        }
        console.log(`✓ Applied using fuzzy match on line ${i} (${Math.round(matchPercentage * 100)}% match)`);
        return contentLines.join('\n');
      }
    }
    
    // Strategy 4: Partial word matching and replacement
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Find partial matches in bullets or sentences
      const partialMatch = originalWords.find(word => 
        word.length > 3 && line.toLowerCase().includes(word)
      );
      
      if (partialMatch && originalWords.length <= 3) {
        // For short suggestions, replace the line if it contains key words
        lines[i] = line.includes(cleanOriginal) ? 
          line.replace(cleanOriginal, cleanNew) : 
          cleanNew;
        console.log(`✓ Applied using partial match on line ${i}`);
        return lines.join('\n');
      }
    }
    
    // Strategy 5: Section-based intelligent insertion
    const sectionLower = section.toLowerCase();
    const contentLines2 = content.split('\n');
    let insertIndex = -1;
    
    // Define section patterns
    const sectionPatterns = {
      experience: /(?:experience|work|employment|professional)/i,
      summary: /(?:summary|objective|profile|about)/i,
      skills: /(?:skills|competencies|expertise|technical)/i,
      education: /(?:education|qualifications|academic)/i,
      projects: /(?:projects|portfolio|accomplishments)/i
    };
    
    // Find the relevant section
    for (let i = 0; i < contentLines2.length; i++) {
      const line = contentLines2[i].trim();
      
      // Check if this line is a section header
      const isHeader = line.length < 50 && 
        (line.toUpperCase() === line || line.includes(':')) &&
        Object.values(sectionPatterns).some(pattern => pattern.test(line));
      
      if (isHeader) {
        // Check if this header matches our target section
        const matchesSection = sectionLower.includes('experience') && sectionPatterns.experience.test(line) ||
                              sectionLower.includes('summary') && sectionPatterns.summary.test(line) ||
                              sectionLower.includes('skill') && sectionPatterns.skills.test(line) ||
                              sectionLower.includes('education') && sectionPatterns.education.test(line) ||
                              sectionLower.includes('project') && sectionPatterns.projects.test(line);
        
        if (matchesSection) {
          // Find a good insertion point in this section
          insertIndex = i + 1;
          
          // Skip to the first content line or bullet point
          while (insertIndex < contentLines2.length && 
                 contentLines2[insertIndex].trim() === '') {
            insertIndex++;
          }
          
          // Insert after the first existing bullet/content line
          if (insertIndex < contentLines2.length && 
              contentLines2[insertIndex].trim().startsWith('•')) {
            insertIndex++;
          }
          
          break;
        }
      }
    }
    
    // Insert the new content
    if (insertIndex > -1 && insertIndex < contentLines2.length) {
      contentLines2.splice(insertIndex, 0, `• ${cleanNew}`);
      console.log(`✓ Applied by inserting into ${section} section at line ${insertIndex}`);
      return contentLines2.join('\n');
    }
    
    // Strategy 6: Fallback - append to end with section label
    console.log('⚠ No good insertion point found, appending to end');
    const fallbackContent = `${content}\n\n${section.toUpperCase()}:\n• ${cleanNew}`;
    return fallbackContent;
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

      {/* Three Panel Layout: Original CV | Suggestions | Optimized CV */}
      <div className="grid grid-cols-12 gap-6 min-h-[800px]">
        {/* Left Panel - Original CV Display (3 columns) */}
        <div className="col-span-3">
          <OriginalCVDisplay content={originalContent} />
        </div>
        
        {/* Middle Panel - Suggestions (4 columns) */}
        <div className="col-span-4">
          <SuggestionsPanel
            analysis={analysis}
            appliedSuggestions={appliedSuggestions}
            onApplySuggestion={handleApplySuggestion}
          />
        </div>
        
        {/* Right Panel - Optimized Resume (5 columns) */}
        <div className="col-span-5">
          <JobscanStyleResumeViewer
            content={currentContent}
            originalContent={originalContent}
            onChange={handleContentChange}
            appliedSuggestions={appliedSuggestions}
          />
        </div>
      </div>
    </div>
  );
};
