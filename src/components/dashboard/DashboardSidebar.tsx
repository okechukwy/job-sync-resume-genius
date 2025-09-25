
import { 
  FileText, 
  Search, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Linkedin,
  Award,
  Briefcase,
  BookOpen,
  HelpCircle,
  Download,
  Home,
  GitBranch,
  Target,
  UserCheck,
  HeartHandshake,
  Sparkles
} from "lucide-react";
import { isFeatureEnabled } from "@/utils/featureFlags";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const getNavigationItems = () => {
  const baseItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/dashboard",
    },
    {
      groupLabel: "Resume Tools",
      items: [
        { title: "Resume Builder", url: "/dashboard/resume/builder", icon: FileText },
        { title: "Templates", url: "/dashboard/resume/templates", icon: FileText },
        { title: "ATS Analysis", url: "/dashboard/resume/ats-analysis", icon: Search },
        { title: "Version Management", url: "/dashboard/resume/versions", icon: GitBranch },
      ]
    },
    {
      groupLabel: "Job Search",
      items: [
        { title: "Job Matching", url: "/dashboard/job-search/matching", icon: Target },
        { title: "Performance Tracking", url: "/dashboard/job-search/performance", icon: TrendingUp },
        { title: "Cover Letter Generator", url: "/dashboard/job-search/cover-letter", icon: MessageSquare },
      ]
    },
    {
      groupLabel: "Career Development",
      items: [
        { title: "AI Interview Prep", url: "/dashboard/career/interview-prep", icon: Users },
        { title: "LinkedIn Optimization", url: "/dashboard/career/linkedin", icon: Linkedin },
        { title: "Personal Branding", url: "/dashboard/career/branding", icon: Award },
        { title: "Career Coaching", url: "/dashboard/career/coaching", icon: HeartHandshake },
      ]
    },
    {
      groupLabel: "Resources & Support",
      items: [
        { title: "Resources", url: "/dashboard/resources", icon: BookOpen },
        { title: "Priority Support", url: "/dashboard/support", icon: HelpCircle },
        { title: "Help Center", url: "/dashboard/help", icon: HelpCircle },
      ]
    }
  ];

  // Only add Advanced section if white-label exports are enabled
  if (isFeatureEnabled('enableWhiteLabel')) {
    baseItems.push({
      groupLabel: "Advanced",
      items: [
        { title: "White Label Exports", url: "/dashboard/exports", icon: Download },
      ]
    });
  }

  return baseItems;
};

export const DashboardSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const navigationItems = getNavigationItems();

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar className="sidebar-glass">
      <SidebarHeader className="sidebar-header-glass p-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg glass-card">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="text-lg font-bold gradient-text">ResumeAI</h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Dashboard Link */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive("/dashboard")}
                className={`
                  smooth-transition
                  ${isActive("/dashboard") ? "sidebar-menu-item-active" : "sidebar-menu-item-hover"}
                `}
              >
                <NavLink to="/dashboard" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Navigation Groups */}
        {navigationItems.slice(1).map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium">
              {group.groupLabel}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      className={`
                        smooth-transition
                        ${isActive(item.url) ? "sidebar-menu-item-active" : "sidebar-menu-item-hover"}
                      `}
                    >
                      <NavLink to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
