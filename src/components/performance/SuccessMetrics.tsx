import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import type { PerformanceMetrics, JobApplication } from "@/hooks/useJobApplications";

interface SuccessMetricsProps {
  metrics: PerformanceMetrics | null;
  applications: JobApplication[];
  onRefreshMetrics: () => Promise<void>;
}

export const SuccessMetrics = ({ metrics, applications, onRefreshMetrics }: SuccessMetricsProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefreshMetrics();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Calculate status breakdown from applications
  const statusBreakdown = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      applied: "Applied",
      under_review: "Under Review",
      interview_scheduled: "Interview Scheduled",
      interview_in_progress: "Interview In Progress",
      interview_completed: "Interview Completed",
      offer_received: "Offer Received",
      rejected: "Rejected",
      withdrawn: "Withdrawn"
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      applied: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
      under_review: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
      interview_scheduled: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
      interview_in_progress: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300",
      interview_completed: "bg-green-500/20 text-green-700 dark:text-green-300",
      offer_received: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
      rejected: "bg-red-500/20 text-red-700 dark:text-red-300",
      withdrawn: "bg-gray-500/20 text-gray-700 dark:text-gray-300"
    };
    return colors[status] || "bg-gray-500/20 text-gray-700 dark:text-gray-300";
  };

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Success Metrics</CardTitle>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Metrics */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Applications Sent</span>
            <span className="font-semibold">{metrics?.total_applications || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Responses Received</span>
            <span className="font-semibold text-success">{metrics?.responses_received || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Interview Activity</span>
            <span className="font-semibold text-primary">{metrics?.interviews_scheduled || 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Offers Received</span>
            <span className="font-semibold text-warning">{metrics?.offers_received || 0}</span>
          </div>
          <div className="pt-4 border-t border-border/20">
            <div className="flex justify-between items-center">
              <span className="font-medium">Success Rate</span>
              <span className="font-bold text-lg text-primary">
                {metrics?.offer_rate?.toFixed(1) || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Granular Interview Breakdown */}
        {metrics && ((metrics as any).interviews_scheduled_count > 0 || (metrics as any).interviews_in_progress_count > 0 || (metrics as any).interviews_completed_count > 0) && (
          <div className="pt-4 border-t border-border/20">
            <h4 className="font-medium mb-3">Interview Pipeline</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-orange-600">
                  {(metrics as any).interviews_scheduled_count || 0}
                </div>
                <div className="text-xs text-muted-foreground">Scheduled</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">
                  {(metrics as any).interviews_in_progress_count || 0}
                </div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">
                  {(metrics as any).interviews_completed_count || 0}
                </div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        )}

        {/* Status Breakdown */}
        {Object.keys(statusBreakdown).length > 0 && (
          <div className="pt-4 border-t border-border/20">
            <h4 className="font-medium mb-3">Application Status Breakdown</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusBreakdown)
                .sort(([,a], [,b]) => b - a)
                .map(([status, count]) => (
                  <Badge 
                    key={status} 
                    variant="secondary" 
                    className={getStatusColor(status)}
                  >
                    {getStatusLabel(status)}: {count}
                  </Badge>
                ))}
            </div>
          </div>
        )}

        {/* Performance Rates */}
        <div className="pt-4 border-t border-border/20">
          <h4 className="font-medium mb-3">Performance Rates</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-success">
                {metrics?.response_rate?.toFixed(1) || 0}%
              </div>
              <div className="text-xs text-muted-foreground">Response</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {metrics?.interview_rate?.toFixed(1) || 0}%
              </div>
              <div className="text-xs text-muted-foreground">Interview</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">
                {metrics?.offer_rate?.toFixed(1) || 0}%
              </div>
              <div className="text-xs text-muted-foreground">Offer</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};