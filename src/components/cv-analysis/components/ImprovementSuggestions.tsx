import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Improvement } from "../types/analysisTypes";
import { getPriorityIcon } from "../utils/analysisUtils";

interface ImprovementSuggestionsProps {
  improvements: Improvement[];
}

const ImprovementSuggestions = ({ improvements }: ImprovementSuggestionsProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Optimization Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {improvements.map((improvement, index) => (
            <div key={index} className="flex gap-3 p-4 rounded-lg border border-border/50">
              {getPriorityIcon(improvement.priority)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{improvement.issue}</span>
                  <Badge 
                    variant={improvement.priority === 'high' ? 'destructive' : 
                            improvement.priority === 'medium' ? 'secondary' : 'outline'} 
                    className="text-xs"
                  >
                    {improvement.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{improvement.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovementSuggestions;