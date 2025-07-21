
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { SectionScore } from "../types/analysisTypes";
import { getScoreBg } from "../utils/analysisUtils";
import { getSectionStatusMessage } from "../utils/scoreUtils";

interface EnhancedSectionBreakdownProps {
  sections: Record<string, SectionScore>;
}

const EnhancedSectionBreakdown = ({ sections }: EnhancedSectionBreakdownProps) => {
  const getSectionIcon = (score: number) => {
    if (score >= 85) return <CheckCircle className="w-4 h-4 text-success" />;
    if (score >= 70) return <TrendingUp className="w-4 h-4 text-warning" />;
    if (score >= 55) return <AlertTriangle className="w-4 h-4 text-warning" />;
    return <XCircle className="w-4 h-4 text-destructive" />;
  };

  const getSectionPriority = (score: number): 'high' | 'medium' | 'low' => {
    if (score < 55) return 'high';
    if (score < 70) return 'medium';
    return 'low';
  };

  const sortedSections = Object.entries(sections).sort(([,a], [,b]) => {
    const priorityA = getSectionPriority(a.score);
    const priorityB = getSectionPriority(b.score);
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });

  const formatSectionName = (section: string): string => {
    return section.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Section Analysis & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedSections.map(([section, data]) => {
            const priority = getSectionPriority(data.score);
            const statusMessage = getSectionStatusMessage(section, data.score);
            
            return (
              <div key={section} className={`p-4 rounded-lg border transition-all hover:shadow-sm ${getScoreBg(data.score)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getSectionIcon(data.score)}
                    <span className="font-semibold">{formatSectionName(section)}</span>
                    {priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        Priority Fix
                      </Badge>
                    )}
                    {priority === 'medium' && (
                      <Badge variant="secondary" className="text-xs">
                        Needs Attention
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {data.score}/100
                    </Badge>
                  </div>
                </div>
                <Progress value={data.score} className="h-2 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {statusMessage}
                </p>
                {data.score < 85 && (
                  <div className="mt-2 text-xs text-primary font-medium">
                    Improvement potential: +{Math.min(15, 95 - data.score)} points
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Summary Statistics */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Excellent</div>
              <div className="text-lg font-bold text-success">
                {Object.values(sections).filter(s => s.score >= 85).length}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Good</div>
              <div className="text-lg font-bold text-warning">
                {Object.values(sections).filter(s => s.score >= 70 && s.score < 85).length}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Needs Work</div>
              <div className="text-lg font-bold text-destructive">
                {Object.values(sections).filter(s => s.score < 70).length}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSectionBreakdown;
