
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Target,
  ArrowRight,
  Clock,
  CheckCircle,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const quickStats = [
    { label: "Resume Versions", value: "3", icon: FileText, trend: "+1 this week" },
    { label: "Applications Sent", value: "12", icon: Target, trend: "+3 this week" },
    { label: "Interview Prep Sessions", value: "5", icon: Users, trend: "+2 this week" },
    { label: "Profile Views", value: "48", icon: TrendingUp, trend: "+12 this week" },
  ];

  const recentActivity = [
    { action: "Updated resume template", time: "2 hours ago", type: "resume" },
    { action: "Completed interview prep session", time: "1 day ago", type: "interview" },
    { action: "Applied to Software Engineer at TechCorp", time: "2 days ago", type: "application" },
    { action: "Generated cover letter", time: "3 days ago", type: "cover-letter" },
  ];

  const quickActions = [
    { title: "Build Resume", description: "Create or update your resume", href: "/dashboard/resume/builder", icon: FileText },
    { title: "Practice Interview", description: "AI-powered interview preparation", href: "/dashboard/career/interview-prep", icon: Users },
    { title: "Track Applications", description: "Monitor your job search progress", href: "/dashboard/job-search/performance", icon: TrendingUp },
    { title: "Optimize LinkedIn", description: "Enhance your LinkedIn profile", href: "/dashboard/career/linkedin", icon: Target },
  ];

  const profileCompletion = 75; // This would come from actual user data

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Profile Completion
          </CardTitle>
          <CardDescription>
            Complete your profile to unlock more personalized features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump into your most-used tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
                  <action.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
