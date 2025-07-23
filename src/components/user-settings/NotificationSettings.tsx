import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const NotificationSettings = () => {
  return (
    <Card className="glass-card border-white/10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <CardTitle className="typography-heading text-xl">Notification Preferences</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="emailNotifications" className="text-base font-medium">Email notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch 
              id="emailNotifications" 
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="jobAlerts" className="text-base font-medium">Job match alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when jobs match your profile</p>
            </div>
            <Switch 
              id="jobAlerts" 
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="alertFrequency" className="text-sm font-medium text-foreground/80">Alert frequency</Label>
          <Select>
            <SelectTrigger className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/20 bg-background/90 backdrop-blur-sm">
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="daily">Daily digest</SelectItem>
              <SelectItem value="weekly">Weekly digest</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="resumeViews" className="text-base font-medium">Resume view notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified when employers view your resume</p>
            </div>
            <Switch 
              id="resumeViews" 
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="applicationUpdates" className="text-base font-medium">Application status updates</Label>
              <p className="text-sm text-muted-foreground">Receive updates on your job applications</p>
            </div>
            <Switch 
              id="applicationUpdates" 
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="marketingEmails" className="text-base font-medium">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">Receive tips and product updates</p>
            </div>
            <Switch 
              id="marketingEmails" 
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="weeklyReports" className="text-base font-medium">Weekly progress reports</Label>
              <p className="text-sm text-muted-foreground">Get weekly summaries of your job search activity</p>
            </div>
            <Switch 
              id="weeklyReports" 
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent"
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};