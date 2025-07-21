
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Target, TrendingUp } from "lucide-react";
import { getScoreColor } from "../utils/analysisUtils";
import { getScoreDescription } from "../utils/scoreUtils";

interface EnhancedOverallScoresProps {
  overallScore: number;
  atsScore: number;
  industry?: string;
}

const EnhancedOverallScores = ({ overallScore, atsScore, industry }: EnhancedOverallScoresProps) => {
  const getScoreGrade = (score: number): string => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C+';
    if (score >= 55) return 'C';
    if (score >= 50) return 'C-';
    return 'D';
  };

  const getImprovementPotential = (score: number): number => {
    return Math.min(95, score + 15) - score;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="glass-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2">
            <Award className="w-5 h-5" />
            Overall Quality Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Grade</div>
              <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                {getScoreGrade(overallScore)}
              </div>
            </div>
          </div>
          <Progress value={overallScore} className="h-3" />
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {getScoreDescription(overallScore, 'overall')}
            </p>
            {industry && (
              <p className="text-xs text-muted-foreground">
                Optimized for {industry} industry standards
              </p>
            )}
            {getImprovementPotential(overallScore) > 0 && (
              <div className="flex items-center justify-center gap-1 text-xs text-primary">
                <TrendingUp className="w-3 h-3" />
                <span>+{getImprovementPotential(overallScore)} point improvement potential</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full" />
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2">
            <Target className="w-5 h-5" />
            ATS Compatibility Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className={`text-5xl font-bold ${getScoreColor(atsScore)}`}>
              {atsScore}
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Grade</div>
              <div className={`text-2xl font-bold ${getScoreColor(atsScore)}`}>
                {getScoreGrade(atsScore)}
              </div>
            </div>
          </div>
          <Progress value={atsScore} className="h-3" />
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {getScoreDescription(atsScore, 'ats')}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted/30 rounded p-2">
                <div className="font-medium">Pass Rate</div>
                <div className={getScoreColor(atsScore)}>{Math.round(atsScore * 0.85)}%</div>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <div className="font-medium">Systems</div>
                <div className={getScoreColor(atsScore)}>{Math.round(atsScore / 12)}/8</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedOverallScores;
