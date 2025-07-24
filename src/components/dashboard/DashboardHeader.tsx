
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Settings, User, Menu, Shield, HelpCircle } from "lucide-react";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { UserSettingsDialog } from "../user-settings/UserSettingsDialog";

export const DashboardHeader = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("profile");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('profile_picture')
        .eq('id', user.id)
        .maybeSingle();
      
      if (data?.profile_picture) {
        setProfilePicture(data.profile_picture);
      }
    };

    fetchProfilePicture();
  }, [user]);

  const handleSettingsClick = (tab: string) => {
    setSettingsTab(tab);
    setSettingsOpen(true);
  };

  // Define routes that actually exist in the application
  const existingRoutes = new Set([
    '/dashboard',
    '/dashboard/resume/builder',
    '/dashboard/resume/templates',
    '/dashboard/resume/ats-analysis',
    '/dashboard/resume/versions',
    '/dashboard/job-search/matching',
    '/dashboard/job-search/performance',
    '/dashboard/job-search/cover-letter',
    '/dashboard/career/interview-prep',
    '/dashboard/career/linkedin',
    '/dashboard/career/branding',
    '/dashboard/career/coaching',
    '/dashboard/resources',
    '/dashboard/support',
    '/dashboard/help',
    '/dashboard/exports'
  ]);

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    if (pathSegments.length === 1 && pathSegments[0] === 'dashboard') {
      return [{ label: 'Dashboard', href: '/dashboard', isActive: true, isClickable: true }];
    }

    // Build breadcrumb trail
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Handle specific segments
      if (segment === 'dashboard') label = 'Dashboard';
      else if (segment === 'resume') label = 'Resume Tools';
      else if (segment === 'job-search') label = 'Job Search';
      else if (segment === 'career') label = 'Career Development';
      else if (segment === 'builder') label = 'Resume Builder';
      else if (segment === 'templates') label = 'Templates';
      else if (segment === 'ats-analysis') label = 'ATS Analysis';
      else if (segment === 'versions') label = 'Version Management';
      else if (segment === 'matching') label = 'Job Matching';
      else if (segment === 'performance') label = 'Performance Tracking';
      else if (segment === 'cover-letter') label = 'Cover Letter Generator';
      else if (segment === 'interview-prep') label = 'AI Interview Prep';
      else if (segment === 'linkedin') label = 'LinkedIn Optimization';
      else if (segment === 'branding') label = 'Personal Branding';
      else if (segment === 'coaching') label = 'Career Coaching';

      const isActive = index === pathSegments.length - 1;
      const isClickable = existingRoutes.has(currentPath);

      breadcrumbs.push({
        label,
        href: currentPath,
        isActive,
        isClickable: isClickable || isActive // Active page is always "clickable" (but rendered as BreadcrumbPage)
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <>
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger className="p-2">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>
          
          <div className="flex-1">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <BreadcrumbItem key={crumb.href}>
                    {index > 0 && <BreadcrumbSeparator />}
                    {crumb.isActive ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : crumb.isClickable ? (
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    ) : (
                      <span className="text-muted-foreground">{crumb.label}</span>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={profilePicture || ""} alt="Profile" />
                    <AvatarFallback className="text-xs">
                      {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 
                       user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">
                    {user?.user_metadata?.full_name || user?.email || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => handleSettingsClick('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleSettingsClick('preferences')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handleSettingsClick('security')}>
                  <Shield className="mr-2 h-4 w-4" />
                  Account & Security
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => handleSettingsClick('help')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <UserSettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen}
        defaultTab={settingsTab}
      />
    </>
  );
};
