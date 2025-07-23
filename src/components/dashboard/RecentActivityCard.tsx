
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Target, Users, BarChart3, Clock } from "lucide-react";
import { ActivityItem } from "@/hooks/useDashboardData";

interface RecentActivityCardProps {
  activities: ActivityItem[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'resume':
      return <FileText className="h-4 w-4" />;
    case 'application':
      return <Target className="h-4 w-4" />;
    case 'interview':
      return <Users className="h-4 w-4" />;
    case 'cv-analysis':
      return <BarChart3 className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'resume':
      return 'bg-blue-100 text-blue-800';
    case 'application':
      return 'bg-green-100 text-green-800';
    case 'interview':
      return 'bg-purple-100 text-purple-800';
    case 'cv-analysis':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const RecentActivityCard = ({ activities }: RecentActivityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm">Start by creating a resume or applying to jobs</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
              <div className={`p-2 rounded-md ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  {activity.details && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.details}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
