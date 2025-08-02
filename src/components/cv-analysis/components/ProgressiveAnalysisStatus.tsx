import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, CheckCircle, Clock, Target } from "lucide-react";

interface ProgressiveAnalysisStatusProps {
  improvementRound: number;
  isProgressive: boolean;
  previouslyAddressed: string[];
  focusAreas: string[];
  totalImprovements: number;
}

const ProgressiveAnalysisStatus = ({
  improvementRound,
  isProgressive,
  previouslyAddressed,
  focusAreas,
  totalImprovements
}: ProgressiveAnalysisStatusProps) => {
  if (!isProgressive || improvementRound <= 1) {
    return (
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Initial Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is your first comprehensive CV analysis. We've identified key areas for improvement 
            to enhance your resume's effectiveness.
          </p>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = previouslyAddressed.length > 0 
    ? Math.round((previouslyAddressed.length / (previouslyAddressed.length + totalImprovements)) * 100)
    : 0;

  return (
    <Card className="glass-card border-green-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Progressive Analysis - Round {improvementRound}
          <Badge variant="outline" className="ml-auto">
            Smart Enhancement
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Optimization Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-medium">Previously Addressed</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {previouslyAddressed.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {previouslyAddressed.slice(0, 3).map((item, index) => (
                    <li key={index} className="truncate">{item}</li>
                  ))}
                  {previouslyAddressed.length > 3 && (
                    <li className="text-xs">+{previouslyAddressed.length - 3} more areas</li>
                  )}
                </ul>
              ) : (
                <span>No previous improvements tracked</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Current Focus Areas</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {focusAreas.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {focusAreas.slice(0, 4).map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {area.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                  {focusAreas.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{focusAreas.length - 4}
                    </Badge>
                  )}
                </div>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Advanced optimization
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Smart Analysis:</strong> We've detected previous improvements and are now focusing on 
            new optimization areas to avoid redundant suggestions. This ensures each analysis round 
            brings fresh insights and progressive enhancement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressiveAnalysisStatus;