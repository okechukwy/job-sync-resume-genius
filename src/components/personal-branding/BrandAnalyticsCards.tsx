import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, Users, MessageCircle, TrendingUp, TrendingDown } from "lucide-react";
import { BrandAnalyticsData } from "@/services/personalBrandingAnalytics";

interface BrandAnalyticsCardsProps {
  analytics: BrandAnalyticsData;
  isLoading?: boolean;
}

export const BrandAnalyticsCards = ({ analytics, isLoading }: BrandAnalyticsCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="glass-card animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-2 bg-muted rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatTrend = (value: number) => {
    if (value > 0) return `+${value}%`;
    if (value < 0) return `${value}%`;
    return "0%";
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-muted-foreground";
  };

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-3 w-3" />;
    if (value < 0) return <TrendingDown className="h-3 w-3" />;
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visibility Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{analytics.visibilityScore}%</div>
            <div className={`text-sm flex items-center justify-center gap-1 ${getTrendColor(analytics.trends.visibility)}`}>
              {getTrendIcon(analytics.trends.visibility)}
              {formatTrend(analytics.trends.visibility)} this month
            </div>
            <Progress value={analytics.visibilityScore} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Network Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">+{analytics.networkGrowth}</div>
            <div className="text-sm text-muted-foreground">New connections</div>
            <Progress value={Math.min(analytics.networkGrowth / 3, 100)} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Engagement Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{analytics.engagementRate}%</div>
            <div className={`text-sm flex items-center justify-center gap-1 ${getTrendColor(analytics.trends.engagement)}`}>
              {getTrendIcon(analytics.trends.engagement)}
              {analytics.engagementRate >= 5 ? "Above average" : "Building momentum"}
            </div>
            <Progress value={analytics.engagementRate * 10} className="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};