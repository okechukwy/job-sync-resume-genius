
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, XCircle, Zap, ChevronDown, ChevronRight } from "lucide-react";
import { KeywordData } from "../types/analysisTypes";
import { useState } from "react";

interface KeywordAnalysisProps {
  keywords: KeywordData;
}

const KeywordAnalysis = ({ keywords }: KeywordAnalysisProps) => {
  const [foundOpen, setFoundOpen] = useState(false);
  const [missingOpen, setMissingOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Keyword Analysis
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
                  <span className="font-medium text-success">Keywords Found: {keywords.found}</span>
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
                    <p className="text-sm text-muted-foreground">No specific keywords data available</p>
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
                  <span className="font-medium text-warning">Missing Keywords: {keywords.missing}</span>
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
                    <p className="text-sm text-muted-foreground">No missing keywords data available</p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Keyword Suggestions */}
          {keywords.suggestions.length > 0 && (
            <div>
              <Collapsible open={suggestionsOpen} onOpenChange={setSuggestionsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">Keyword Suggestions: {keywords.suggestions.length}</span>
                  </div>
                  {suggestionsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="flex flex-wrap gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    {keywords.suggestions.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysis;
