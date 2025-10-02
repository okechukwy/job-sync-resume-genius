import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, User, Settings, Shield, HelpCircle, Rocket } from "lucide-react";
import { UserSettingsDialog } from "./user-settings/UserSettingsDialog";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("profile");
  const [profilePicture, setProfilePicture] = useState("");
  const location = useLocation();
  const {
    user,
    signOut
  } = useAuth();
  const handleSettingsClick = (tab: string) => {
    setSettingsTab(tab);
    setSettingsOpen(true);
  };
  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!user) return;
      const {
        data
      } = await supabase.from('profiles').select('profile_picture').eq('id', user.id).maybeSingle();
      if (data?.profile_picture) {
        setProfilePicture(data.profile_picture);
      }
    };
    fetchProfilePicture();
  }, [user]);

  // Redirect authenticated users from homepage to dashboard
  useEffect(() => {
    if (user && location.pathname === '/') {
      window.location.href = '/dashboard';
    }
  }, [user, location.pathname]);
  const handleAnchorClick = (href: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/${href}`;
    }
  };
  const navItems = [{
    label: "Features",
    href: "#features",
    type: "anchor"
  }, {
    label: "Templates",
    href: "#templates",
    type: "anchor"
  }, {
    label: "Pricing",
    href: "#pricing",
    type: "anchor"
  }, {
    label: "Resources",
    href: "#resources",
    type: "anchor"
  }];
  return <>
      <nav className="fixed top-0 w-full z-50 glass-card border-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg glass-card">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold gradient-text">Jobzuma</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map(item => item.type === "link" ? <Link key={item.label} to={item.href} className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200">
                      {item.label}
                    </Link> : <a key={item.label} href={item.href} className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200" onClick={e => {
                handleAnchorClick(item.href);
              }}>
                      {item.label}
                    </a>)}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={profilePicture || ""} alt="Profile" />
                        <AvatarFallback className="text-xs">
                          {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.user_metadata?.full_name || user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-popover rounded-xl border-0">
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
                </DropdownMenu> : <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/get-started">Get Started</Link>
                  </Button>
                </>}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground hover:text-primary focus:outline-none focus:text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-popover/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 mt-2 rounded-xl border-0 shadow-lg">
                {navItems.map(item => item.type === "link" ? <Link key={item.label} to={item.href} className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </Link> : <a key={item.label} href={item.href} className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors duration-200" onClick={e => {
              handleAnchorClick(item.href);
              setIsMenuOpen(false);
            }}>
                      {item.label}
                    </a>)}
                <div className="pt-4 border-0 space-y-2">
                  {user ? <div className="space-y-2">
                      <div className="flex items-center space-x-2 px-3 py-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={profilePicture || ""} alt="Profile" />
                          <AvatarFallback className="text-xs">
                            {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.user_metadata?.full_name || user.email}</span>
                      </div>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => handleSettingsClick('profile')}>
                        <User className="mr-2 h-4 w-4" />
                        Profile Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </div> : <>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link to="/auth">Sign In</Link>
                      </Button>
                      <Button variant="hero" className="w-full" asChild>
                        <Link to="/get-started">Get Started</Link>
                      </Button>
                    </>}
                </div>
              </div>
            </div>}
        </div>
      </nav>

      <UserSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} defaultTab={settingsTab} />
    </>;
};
export default Navigation;