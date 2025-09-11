import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  Target, 
  Lightbulb, 
  TrendingUp,
  Filter,
  ArrowRight,
  Check
} from "lucide-react";
import { ATSOptimizationResult } from "@/services/openaiServices";

interface AppliedSuggestion {
  id: string;
  originalText: string;
  newText: string;
  section: string;
  timestamp: number;
}

interface SuggestionsPanelProps {
  analysis: ATSOptimizationResult;
  appliedSuggestions: AppliedSuggestion[];
  onApplySuggestion: (id: string, originalText: string, newText: string, section: string) => void;
}

export const SuggestionsPanel = ({ 
  analysis, 
  appliedSuggestions, 
  onApplySuggestion 
}: SuggestionsPanelProps) => {
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'quantification':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'keywords':
        return <Target className="h-4 w-4 text-green-500" />;
      case 'action-verbs':
        return <Lightbulb className="h-4 w-4 text-purple-500" />;
      case 'achievement':
        return <CheckCircle className="h-4 w-4 text-orange-500" />;
      case 'industry-alignment':
        return <Info className="h-4 w-4 text-indigo-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-destructive/10 text-destructive border-destructive/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-primary/10 text-primary border-primary/20'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const isApplied = (suggestionText: string) => {
    return appliedSuggestions.some(applied => 
      applied.originalText === suggestionText || applied.newText === suggestionText
    );
  };

  const filteredSuggestions = useMemo(() => {
    let suggestions = analysis.contentOptimizations || [];
    
    if (selectedSection !== "all") {
      suggestions = suggestions.filter(s => s.section === selectedSection);
    }
    
    if (selectedPriority !== "all") {
      suggestions = suggestions.filter(s => (s as any).priority === selectedPriority);
    }
    
    if (selectedCategory !== "all") {
      suggestions = suggestions.filter(s => s.category === selectedCategory);
    }
    
    return suggestions;
  }, [analysis.contentOptimizations, selectedSection, selectedPriority, selectedCategory]);

  const groupedSuggestions = useMemo(() => {
    return filteredSuggestions.reduce((groups, suggestion) => {
      const section = suggestion.section || 'General';
      if (!groups[section]) {
        groups[section] = [];
      }
      groups[section].push(suggestion);
      return groups;
    }, {} as Record<string, typeof filteredSuggestions>);
  }, [filteredSuggestions]);

  const totalSuggestions = analysis.contentOptimizations?.length || 0;
  const appliedCount = appliedSuggestions.length;
  const progressPercentage = totalSuggestions > 0 ? (appliedCount / totalSuggestions) * 100 : 0;

  const sections = Array.from(new Set(analysis.contentOptimizations?.map(s => s.section) || []));
  const priorities = ['high', 'medium', 'low'];
  const categories = Array.from(new Set(analysis.contentOptimizations?.map(s => s.category) || []));

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Optimization Suggestions
            </CardTitle>
            <Badge variant="outline">
              {appliedCount}/{totalSuggestions} Applied
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 gap-2">
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="All Sections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {sections.map(section => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="grid grid-cols-2 gap-2">
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[600px] px-6">
          <div className="space-y-6">
            {Object.entries(groupedSuggestions).map(([section, suggestions]) => (
              <div key={section} className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">
                  {section}
                </h3>
                
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => {
                    const suggestionId = `${section}-${index}`;
                    const applied = isApplied(suggestion.current);
                    
                    return (
                      <div 
                        key={suggestionId} 
                        className={`p-4 rounded-lg border transition-all ${
                          applied 
                            ? 'border-success/30 bg-success/5' 
                            : 'border-border/50 bg-background/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {applied ? (
                              <Check className="h-4 w-4 text-success" />
                            ) : (
                              <Info className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(suggestion.category)}
                              {suggestion.category && (
                                <Badge variant="secondary" className="text-xs">
                                  {suggestion.category.replace('-', ' ')}
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm font-medium">{suggestion.reasoning}</p>
                            
                            {suggestion.current && suggestion.improved && (
                              <div className="space-y-2">
                                <div className="text-xs text-muted-foreground">Current:</div>
                                <div className="text-sm p-2 bg-muted/50 rounded border-l-2 border-destructive/50">
                                  "{suggestion.current}"
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <ArrowRight className="h-3 w-3" />
                                  Suggested:
                                </div>
                                <div className="text-sm p-2 bg-muted/50 rounded border-l-2 border-success/50">
                                  "{suggestion.improved}"
                                </div>
                              </div>
                            )}
                            
                            <Button
                              size="sm"
                              variant={applied ? "outline" : "default"}
                              disabled={applied}
                              onClick={() => 
                                onApplySuggestion(
                                  suggestionId,
                                  suggestion.current,
                                  suggestion.improved,
                                  section
                                )
                              }
                              className="w-full"
                            >
                              {applied ? "Applied" : "Apply Suggestion"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {Object.keys(groupedSuggestions).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Filter className="h-8 w-8 mx-auto mb-2" />
                <p>No suggestions match your current filters</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};