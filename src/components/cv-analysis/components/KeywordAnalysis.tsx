
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, XCircle, Zap, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import { KeywordData } from "../types/analysisTypes";
import { useState } from "react";

interface KeywordAnalysisProps {
  keywords: KeywordData;
}

const KeywordAnalysis = ({ keywords }: KeywordAnalysisProps) => {
  const [foundOpen, setFoundOpen] = useState(false);
  const [missingOpen, setMissingOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  // Calculate actual counts from arrays to ensure accuracy
  const actualFoundCount = keywords.foundKeywords?.length || 0;
  const actualMissingCount = keywords.missingKeywords?.length || 0;
  const actualSuggestionsCount = keywords.suggestions?.length || 0;

  // Check for data consistency issues
  const hasCountDiscrepancy = 
    (keywords.found !== actualFoundCount) || 
    (keywords.missing !== actualMissingCount);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Keyword Analysis
          {hasCountDiscrepancy && (
            <AlertTriangle className="w-4 h-4 text-warning" aria-label="Data consistency issue detected" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Found Keywords */}
          <div>
            <Collapsible open={foundOpen} onOpenChange={setFoundOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-success/20 bg-success/5 hover:bg-success/10 transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">
                    Keywords Found: {actualFoundCount}
                  </span>
                  {hasCountDiscrepancy && keywords.found !== actualFoundCount && (
                    <Badge variant="outline" className="text-xs text-warning border-warning/20">
                      Expected: {keywords.found}
                    </Badge>
                  )}
                </div>
                {foundOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="flex flex-wrap gap-2 p-3 bg-success/5 rounded-lg border border-success/20">
                  {keywords.foundKeywords && keywords.foundKeywords.length > 0 ? (
                    keywords.foundKeywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-success/10 text-success border-success/20">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No keywords found in analysis</p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Missing Keywords */}
          <div>
            <Collapsible open={missingOpen} onOpenChange={setMissingOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-warning/20 bg-warning/5 hover:bg-warning/10 transition-colors">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-warning" />
                  <span className="font-medium text-warning">
                    Missing Keywords: {actualMissingCount}
                  </span>
                  {hasCountDiscrepancy && keywords.missing !== actualMissingCount && (
                    <Badge variant="outline" className="text-xs text-warning border-warning/20">
                      Expected: {keywords.missing}
                    </Badge>
                  )}
                </div>
                {missingOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="flex flex-wrap gap-2 p-3 bg-warning/5 rounded-lg border border-warning/20">
                  {keywords.missingKeywords && keywords.missingKeywords.length > 0 ? (
                    keywords.missingKeywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No missing keywords identified</p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Keyword Suggestions */}
          {actualSuggestionsCount > 0 && (
            <div>
              <Collapsible open={suggestionsOpen} onOpenChange={setSuggestionsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">
                      Keyword Suggestions: {actualSuggestionsCount}
                    </span>
                  </div>
                  {suggestionsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="flex flex-wrap gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    {keywords.suggestions.map((suggestion, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Data Validation Warning */}
          {hasCountDiscrepancy && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium text-warning">Data Consistency Notice</span>
              </div>
              <p className="text-xs text-muted-foreground">
                The displayed counts are based on actual keyword arrays for accuracy. 
                This may differ from the initial analysis counts.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysis;
