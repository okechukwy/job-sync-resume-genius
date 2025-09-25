
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { ProfileCompletionCard } from "@/components/dashboard/ProfileCompletionCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TrialStatusBanner } from "@/components/subscription/TrialStatusBanner";

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    dashboardStats, 
    recentActivity, 
    profileCompletion, 
    versions,
    applications,
    sessions,
    linkedinProfile,
    loading 
  } = useDashboardData();

  if (loading) {
    return (
      <div className="w-full h-full p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Profile Completion Skeleton */}
          <Skeleton className="h-32 w-full" />

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your career journey today.
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/resume/builder">
              <Plus className="mr-2 h-4 w-4" />
              Create Resume
            </Link>
          </Button>
        </div>

        {/* Profile Completion */}
        <ProfileCompletionCard profileCompletion={profileCompletion} />

        {/* Quick Stats */}
        <DashboardStats stats={dashboardStats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <QuickActionsCard 
            hasResume={versions.length > 0}
            hasApplications={applications.length > 0}
            hasInterviews={sessions.length > 0}
            hasLinkedIn={!!linkedinProfile}
          />

          {/* Recent Activity */}
          <RecentActivityCard activities={recentActivity} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
