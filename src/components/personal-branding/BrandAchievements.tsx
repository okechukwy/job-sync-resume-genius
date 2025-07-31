import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, Users, Target, Star } from "lucide-react";
import { BrandAchievement } from "@/services/personalBrandingAnalytics";

interface BrandAchievementsProps {
  achievements: BrandAchievement[];
  isLoading?: boolean;
}

export const BrandAchievements = ({ achievements, isLoading }: BrandAchievementsProps) => {
  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getAchievementIcon = (type: BrandAchievement['type']) => {
    switch (type) {
      case 'profile_update':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'content_creation':
        return <Star className="h-4 w-4" />;
      case 'network_growth':
        return <Users className="h-4 w-4" />;
      case 'strategy_completion':
        return <Target className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const getImpactVariant = (impact: BrandAchievement['impact']) => {
    switch (impact) {
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  if (achievements.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Award className="h-4 w-4" />
            <AlertDescription>
              Complete your profile and implement branding strategies to start earning achievements!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Recent Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <Alert key={achievement.id} className="border-l-4 border-l-primary">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getAchievementIcon(achievement.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Badge variant={getImpactVariant(achievement.impact)} className="text-xs">
                        {achievement.impact} impact
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm">
                      {achievement.description}
                    </AlertDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground ml-3">
                  {formatDate(achievement.date)}
                </span>
              </div>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};