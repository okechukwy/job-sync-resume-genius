
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, XCircle, Zap, ChevronDown, ChevronRight, Target } from "lucide-react";
import { KeywordData } from "../types/analysisTypes";
import { useState } from "react";

interface StreamlinedKeywordAnalysisProps {
  keywords: KeywordData;
}

const StreamlinedKeywordAnalysis = ({ keywords }: StreamlinedKeywordAnalysisProps) => {
  const [foundOpen, setFoundOpen] = useState(false);
  const [missingOpen, setMissingOpen] = useState(true); // Default to showing missing keywords
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  // Use actual array lengths for accurate counts
  const foundCount = keywords.foundKeywords?.length || 0;
  const missingCount = keywords.missingKeywords?.length || 0;
  const suggestionsCount = keywords.suggestions?.length || 0;

  const matchRate = foundCount + missingCount > 0 ? Math.round((foundCount / (foundCount + missingCount)) * 100) : 0;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Keyword Optimization Analysis
        </CardTitle>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="text-2xl font-bold text-success">{matchRate}%</div>
            <div className="text-sm text-muted-foreground">Match Rate</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {foundCount} found • {missingCount} missing
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Found Keywords */}
          {foundCount > 0 && (
            <Collapsible open={foundOpen} onOpenChange={setFoundOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-success/20 bg-success/5 hover:bg-success/10 transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">
                    Keywords Found ({foundCount})
                  </span>
                </div>
                {foundOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="flex flex-wrap gap-2 p-3 bg-success/5 rounded-lg border border-success/20">
                  {keywords.foundKeywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="bg-success/10 text-success border-success/20">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Missing Keywords - Priority Section */}
          {missingCount > 0 && (
            <Collapsible open={missingOpen} onOpenChange={setMissingOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-warning/20 bg-warning/5 hover:bg-warning/10 transition-colors">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-warning" />
                  <span className="font-medium text-warning">
                    Missing High-Impact Keywords ({missingCount})
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    Priority
                  </Badge>
                </div>
                {missingOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 p-3 bg-warning/5 rounded-lg border border-warning/20">
                    {keywords.missingKeywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground p-3 bg-blue-50/50 rounded border border-blue-200/50">
                    <strong>💡 Pro Tip:</strong> These keywords appear frequently in your industry. Adding them naturally to your resume can significantly improve your ATS score and recruiter visibility.
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Strategic Keyword Suggestions */}
          {suggestionsCount > 0 && (
            <Collapsible open={suggestionsOpen} onOpenChange={setSuggestionsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">
                    Strategic Keyword Opportunities ({suggestionsCount})
                  </span>
                </div>
                {suggestionsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    {keywords.suggestions.map((suggestion, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Consider incorporating these industry-relevant terms to enhance your resume's discoverability and relevance.
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        {/* Action Items */}
        {(missingCount > 0 || suggestionsCount > 0) && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">🎯 Quick Action Items</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              {missingCount > 0 && (
                <li>• Add {Math.min(3, missingCount)} high-impact missing keywords to relevant sections</li>
              )}
              {suggestionsCount > 0 && (
                <li>• Consider incorporating {Math.min(2, suggestionsCount)} strategic suggestions</li>
              )}
              <li>• Use keywords naturally in context, avoiding keyword stuffing</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StreamlinedKeywordAnalysis;
