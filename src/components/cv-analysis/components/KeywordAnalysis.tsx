import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Zap } from "lucide-react";
import { KeywordData } from "../types/analysisTypes";

interface KeywordAnalysisProps {
  keywords: KeywordData;
}

const KeywordAnalysis = ({ keywords }: KeywordAnalysisProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Keyword Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="font-medium">Keywords Found: {keywords.found}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="font-medium">Missing Keywords: {keywords.missing}</span>
            </div>
          </div>
          <div>
            <p className="font-medium mb-2">Suggested Keywords to Add:</p>
            <div className="flex flex-wrap gap-2">
              {keywords.suggestions.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysis;