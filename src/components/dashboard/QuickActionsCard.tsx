
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, TrendingUp, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: any;
  priority?: boolean;
}

interface QuickActionsCardProps {
  hasResume: boolean;
  hasApplications: boolean;
  hasInterviews: boolean;
  hasLinkedIn: boolean;
}

export const QuickActionsCard = ({ 
  hasResume, 
  hasApplications, 
  hasInterviews, 
  hasLinkedIn 
}: QuickActionsCardProps) => {
  const getQuickActions = (): QuickAction[] => {
    const actions: QuickAction[] = [];

    if (!hasResume) {
      actions.push({
        title: "Build Your First Resume",
        description: "Get started with our AI-powered resume builder",
        href: "/dashboard/resume/builder",
        icon: FileText,
        priority: true
      });
    } else {
      actions.push({
        title: "Update Resume",
        description: "Enhance your existing resume",
        href: "/dashboard/resume/builder",
        icon: FileText
      });
    }

    if (!hasInterviews) {
      actions.push({
        title: "Practice Interview",
        description: "AI-powered interview preparation",
        href: "/dashboard/career/interview-prep",
        icon: Users,
        priority: !hasResume
      });
    } else {
      actions.push({
        title: "Practice Interview",
        description: "Continue improving your interview skills",
        href: "/dashboard/career/interview-prep",
        icon: Users
      });
    }

    if (!hasApplications) {
      actions.push({
        title: "Track Applications",
        description: "Start monitoring your job search progress",
        href: "/dashboard/job-search/performance",
        icon: TrendingUp,
        priority: hasResume && !hasApplications
      });
    } else {
      actions.push({
        title: "View Performance",
        description: "Monitor your job search progress",
        href: "/dashboard/job-search/performance",
        icon: TrendingUp
      });
    }

    if (!hasLinkedIn) {
      actions.push({
        title: "Optimize LinkedIn",
        description: "Enhance your LinkedIn profile",
        href: "/dashboard/career/linkedin",
        icon: Target,
        priority: hasResume && hasApplications
      });
    } else {
      actions.push({
        title: "Update LinkedIn",
        description: "Keep your LinkedIn profile fresh",
        href: "/dashboard/career/linkedin",
        icon: Target
      });
    }

    return actions.sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0));
  };

  const quickActions = getQuickActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Jump into your most important tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors group ${
              action.priority 
                ? 'bg-primary/5 border-primary/20 hover:bg-primary/10' 
                : 'hover:bg-muted/50'
            }`}
          >
            <div className={`p-2 rounded-md transition-colors ${
              action.priority 
                ? 'bg-primary/10 group-hover:bg-primary/20' 
                : 'bg-primary/10 group-hover:bg-primary/20'
            }`}>
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
  );
};
