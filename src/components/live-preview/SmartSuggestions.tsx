import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, X, Check, Wand2 } from "lucide-react";
import { toast } from "sonner";

interface Suggestion {
  id: string;
  type: 'grammar' | 'style' | 'content' | 'ats';
  field: string;
  originalText: string;
  suggestedText: string;
  reason: string;
  confidence: number;
}

interface SmartSuggestionsProps {
  currentField?: string;
  text: string;
  onApplySuggestion: (field: string, newText: string) => void;
  onDismissSuggestion: (suggestionId: string) => void;
}

export const SmartSuggestions = ({
  currentField,
  text,
  onApplySuggestion,
  onDismissSuggestion,
}: SmartSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock AI suggestions generator
  const generateSuggestions = async (fieldName: string, content: string): Promise<Suggestion[]> => {
    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockSuggestions: Suggestion[] = [];
    
    // Grammar suggestions
    if (content.includes("responsible for")) {
      mockSuggestions.push({
        id: `grammar-${Date.now()}`,
        type: 'grammar',
        field: fieldName,
        originalText: "responsible for",
        suggestedText: "managed",
        reason: "Use stronger action verbs",
        confidence: 0.9
      });
    }
    
    // Style suggestions
    if (content.length > 0 && !content.endsWith('.')) {
      mockSuggestions.push({
        id: `style-${Date.now()}-1`,
        type: 'style',
        field: fieldName,
        originalText: content,
        suggestedText: content + '.',
        reason: "End sentences with proper punctuation",
        confidence: 0.8
      });
    }
    
    // Content suggestions
    if (fieldName === 'summary' && content.length < 50) {
      mockSuggestions.push({
        id: `content-${Date.now()}`,
        type: 'content',
        field: fieldName,
        originalText: content,
        suggestedText: content + " Experienced professional with a proven track record of delivering results.",
        reason: "Expand your professional summary for better impact",
        confidence: 0.7
      });
    }
    
    // ATS optimization
    if (fieldName.includes('experience') && !content.toLowerCase().includes('achieved')) {
      mockSuggestions.push({
        id: `ats-${Date.now()}`,
        type: 'ats',
        field: fieldName,
        originalText: content,
        suggestedText: content.replace(/\.$/, '') + " and achieved measurable results.",
        reason: "Add quantifiable achievements for ATS optimization",
        confidence: 0.85
      });
    }
    
    setIsAnalyzing(false);
    return mockSuggestions;
  };

  // Analyze text when it changes
  useEffect(() => {
    if (currentField && text && text.length > 10) {
      const analyzeText = async () => {
        const newSuggestions = await generateSuggestions(currentField, text);
        setSuggestions(prev => [
          ...prev.filter(s => s.field !== currentField),
          ...newSuggestions
        ]);
      };
      
      const timeoutId = setTimeout(analyzeText, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [currentField, text]);

  const handleApply = (suggestion: Suggestion) => {
    onApplySuggestion(suggestion.field, suggestion.suggestedText);
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    toast.success("Suggestion applied!");
  };

  const handleDismiss = (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    onDismissSuggestion(suggestionId);
  };

  const getTypeColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'grammar': return 'bg-red-100 text-red-800';
      case 'style': return 'bg-blue-100 text-blue-800';
      case 'content': return 'bg-green-100 text-green-800';
      case 'ats': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'ats': return <Wand2 className="h-3 w-3" />;
      default: return <Lightbulb className="h-3 w-3" />;
    }
  };

  if (suggestions.length === 0 && !isAnalyzing) {
    return null;
  }

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 shadow-lg border z-50 max-h-96 overflow-y-auto">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Smart Suggestions</span>
          {isAnalyzing && (
            <Badge variant="secondary" className="text-xs">
              Analyzing...
            </Badge>
          )}
        </div>
        
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getTypeColor(suggestion.type)}`}>
                    {getTypeIcon(suggestion.type)}
                    {suggestion.type.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {Math.round(suggestion.confidence * 100)}% confidence
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDismiss(suggestion.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{suggestion.reason}</p>
              
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-medium text-gray-500">Original:</span>
                  <div className="text-sm bg-red-50 p-2 rounded border-l-2 border-red-200">
                    {suggestion.originalText}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Suggested:</span>
                  <div className="text-sm bg-green-50 p-2 rounded border-l-2 border-green-200">
                    {suggestion.suggestedText}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => handleApply(suggestion)}
                  className="h-7 text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Apply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDismiss(suggestion.id)}
                  className="h-7 text-xs"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};