import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, CheckCircle2, Clock, Target, Users, Star } from "lucide-react";

interface StrategyDashboardProps {
  strategies: any[];
  completedActions: number;
  totalActions: number;
  overallProgress: number;
}

export const StrategyDashboard = ({ 
  strategies, 
  completedActions, 
  totalActions, 
  overallProgress 
}: StrategyDashboardProps) => {
  const priorityCount = {
    high: strategies.filter(s => s.priority === 'high').length,
    medium: strategies.filter(s => s.priority === 'medium').length,
    low: strategies.filter(s => s.priority === 'low').length,
  };

  const avgConfidence = strategies.length > 0 
    ? Math.round(strategies.reduce((acc, s) => acc + s.confidence_score, 0) / strategies.length * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Strategies
          </CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{strategies.length}</div>
          <div className="flex gap-1 mt-2">
            <Badge variant="destructive" className="text-xs">{priorityCount.high} High</Badge>
            <Badge variant="default" className="text-xs">{priorityCount.medium} Med</Badge>
            <Badge variant="secondary" className="text-xs">{priorityCount.low} Low</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Action Progress
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedActions}/{totalActions}</div>
          <Progress value={(completedActions / Math.max(totalActions, 1)) * 100} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {totalActions - completedActions} remaining
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Overall Progress
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overallProgress}%</div>
          <Progress value={overallProgress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Brand building progress
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            AI Confidence
          </CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgConfidence}%</div>
          <Progress value={avgConfidence} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Strategy accuracy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};