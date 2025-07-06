import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Target } from "lucide-react";
import { getScoreColor } from "../utils/analysisUtils";

interface OverallScoresProps {
  overallScore: number;
  atsScore: number;
}

const OverallScores = ({ overallScore, atsScore }: OverallScoresProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2">
            <Award className="w-5 h-5" />
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
            {overallScore}/100
          </div>
          <Progress value={overallScore} className="mb-3" />
          <p className="text-sm text-muted-foreground">
            Good foundation with room for improvement
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2">
            <Target className="w-5 h-5" />
            ATS Compatibility
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(atsScore)}`}>
            {atsScore}/100
          </div>
          <Progress value={atsScore} className="mb-3" />
          <p className="text-sm text-muted-foreground">
            Needs optimization for ATS systems
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverallScores;