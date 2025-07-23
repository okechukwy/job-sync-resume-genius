
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfo } from "./PersonalInfo";
import { ProfessionalInfo } from "./ProfessionalInfo";
import { PrivacySettings } from "./PrivacySettings";
import { ApplicationSettings } from "./ApplicationSettings";
import { NotificationSettings } from "./NotificationSettings";
import { JobSearchSettings } from "./JobSearchSettings";
import { SecuritySettings } from "./SecuritySettings";
import { HelpSettings } from "./HelpSettings";
import { User, Briefcase, Shield, Settings, Bell, Search, Lock, HelpCircle } from "lucide-react";

interface UserSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: string;
}

export const UserSettingsDialog = ({ open, onOpenChange, defaultTab = "personal" }: UserSettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] glass-card border-white/10 backdrop-blur-xl bg-gradient-to-br from-background/95 to-background/90 shadow-2xl animate-scale-in">
        <DialogHeader className="pb-6 border-b border-white/10">
          <DialogTitle className="typography-heading text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 bg-white/5 backdrop-blur-sm border border-white/10 p-2 rounded-xl mb-8">
            <TabsTrigger 
              value="personal" 
              className="flex items-center gap-2 text-xs lg:text-sm px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger 
              value="professional" 
              className="flex items-center gap-2 text-xs lg:text-sm px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Professional</span>
            </TabsTrigger>
            <TabsTrigger 
              value="privacy" 
              className="flex items-center gap-2 text-xs lg:text-sm px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger 
              value="application" 
              className="flex items-center gap-2 text-xs lg:text-sm px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">App</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center gap-2 text-xs lg:text-sm px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="job-search" 
              className="flex items-center gap-2 text-xs lg:text-sm px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Job Search</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex items-center gap-2 text-xs lg:text-sm px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="help" 
              className="flex items-center gap-2 text-xs lg:text-sm px-3 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/10 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary data-[state=active]:shadow-lg"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </TabsTrigger>
          </TabsList>

          <div className="overflow-hidden">
            <TabsContent value="personal" className="mt-0 animate-fade-in">
              <PersonalInfo />
            </TabsContent>

            <TabsContent value="professional" className="mt-0 animate-fade-in">
              <ProfessionalInfo />
            </TabsContent>

            <TabsContent value="privacy" className="mt-0 animate-fade-in">
              <PrivacySettings />
            </TabsContent>

            <TabsContent value="application" className="mt-0 animate-fade-in">
              <ApplicationSettings />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0 animate-fade-in">
              <NotificationSettings />
            </TabsContent>

            <TabsContent value="job-search" className="mt-0 animate-fade-in">
              <JobSearchSettings />
            </TabsContent>

            <TabsContent value="security" className="mt-0 animate-fade-in">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="help" className="mt-0 animate-fade-in">
              <HelpSettings />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
