
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfo } from "./PersonalInfo";
import { ProfessionalInfo } from "./ProfessionalInfo";
import { PrivacySettings } from "./PrivacySettings";
import { ApplicationSettings } from "./ApplicationSettings";
import { NotificationSettings } from "./NotificationSettings";
import { JobSearchSettings } from "./JobSearchSettings";
import { SecuritySettings } from "./SecuritySettings";
import { HelpSettings } from "./HelpSettings";
import { User, Briefcase, Shield, Settings, Bell, Search, Lock, HelpCircle, ChevronRight } from "lucide-react";
import { useState } from "react";

interface UserSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: string;
}

const settingsCategories = [
  {
    id: "personal",
    title: "Personal Info",
    description: "Manage your basic profile information and preferences",
    icon: User,
    component: PersonalInfo
  },
  {
    id: "professional",
    title: "Professional",
    description: "Update your career details and work experience",
    icon: Briefcase,
    component: ProfessionalInfo
  },
  {
    id: "privacy",
    title: "Privacy",
    description: "Control your privacy settings and data visibility",
    icon: Shield,
    component: PrivacySettings
  },
  {
    id: "application",
    title: "Application",
    description: "Customize app behavior and display preferences",
    icon: Settings,
    component: ApplicationSettings
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage email alerts and notification preferences",
    icon: Bell,
    component: NotificationSettings
  },
  {
    id: "job-search",
    title: "Job Search",
    description: "Configure job matching and search preferences",
    icon: Search,
    component: JobSearchSettings
  },
  {
    id: "security",
    title: "Security",
    description: "Manage passwords, 2FA, and account security",
    icon: Lock,
    component: SecuritySettings
  },
  {
    id: "help",
    title: "Help & Support",
    description: "Get assistance and access support resources",
    icon: HelpCircle,
    component: HelpSettings
  }
];

export const UserSettingsDialog = ({ open, onOpenChange, defaultTab = "personal" }: UserSettingsDialogProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(defaultTab);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveSection(categoryId);
  };

  const handleBackToGrid = () => {
    setActiveSection(null);
  };

  const ActiveComponent = activeSection 
    ? settingsCategories.find(cat => cat.id === activeSection)?.component 
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] bg-background/95 backdrop-blur-sm border shadow-xl animate-scale-in">
        <DialogHeader className="pb-6 border-b">
          <div className="flex items-center gap-4">
            {activeSection && (
              <button
                onClick={handleBackToGrid}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to Settings
              </button>
            )}
            <DialogTitle className="text-2xl font-semibold">
              {activeSection 
                ? settingsCategories.find(cat => cat.id === activeSection)?.title 
                : "Settings"
              }
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="overflow-auto max-h-[calc(90vh-120px)]">
          {!activeSection ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {settingsCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] bg-card border"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-medium">
                              {category.title}
                            </CardTitle>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm text-muted-foreground">
                        {category.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="animate-fade-in">
              {ActiveComponent && <ActiveComponent />}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
