
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
            <TabsTrigger value="personal" className="flex items-center gap-1 text-xs">
              <User className="w-3 h-3" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-1 text-xs">
              <Briefcase className="w-3 h-3" />
              <span className="hidden sm:inline">Professional</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1 text-xs">
              <Shield className="w-3 h-3" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="application" className="flex items-center gap-1 text-xs">
              <Settings className="w-3 h-3" />
              <span className="hidden sm:inline">App</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1 text-xs">
              <Bell className="w-3 h-3" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="job-search" className="flex items-center gap-1 text-xs">
              <Search className="w-3 h-3" />
              <span className="hidden sm:inline">Job Search</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1 text-xs">
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-1 text-xs">
              <HelpCircle className="w-3 h-3" />
              <span className="hidden sm:inline">Help</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <PersonalInfo />
          </TabsContent>

          <TabsContent value="professional" className="mt-6">
            <ProfessionalInfo />
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <PrivacySettings />
          </TabsContent>

          <TabsContent value="application" className="mt-6">
            <ApplicationSettings />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="job-search" className="mt-6">
            <JobSearchSettings />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="help" className="mt-6">
            <HelpSettings />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
