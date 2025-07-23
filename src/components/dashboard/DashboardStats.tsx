
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats as DashboardStatsType } from "@/hooks/useDashboardData";
import { FileText, Target, Users, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statItems = [
    { 
      label: "Resume Versions", 
      value: stats.resumeVersions.toString(), 
      icon: FileText, 
      trend: stats.trends.resumeVersions 
    },
    { 
      label: "Applications Sent", 
      value: stats.applicationsSent.toString(), 
      icon: Target, 
      trend: stats.trends.applicationsSent 
    },
    { 
      label: "Interview Sessions", 
      value: stats.interviewSessions.toString(), 
      icon: Users, 
      trend: stats.trends.interviewSessions 
    },
    { 
      label: "Profile Views", 
      value: stats.profileViews.toString(), 
      icon: TrendingUp, 
      trend: stats.trends.profileViews 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
