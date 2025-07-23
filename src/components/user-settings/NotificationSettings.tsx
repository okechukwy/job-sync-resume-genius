import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotifications">Email notifications</Label>
            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
          </div>
          <Switch id="emailNotifications" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="jobAlerts">Job match alerts</Label>
            <p className="text-sm text-muted-foreground">Get notified when jobs match your profile</p>
          </div>
          <Switch id="jobAlerts" />
        </div>
        
        <div>
          <Label htmlFor="alertFrequency">Alert frequency</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="daily">Daily digest</SelectItem>
              <SelectItem value="weekly">Weekly digest</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="resumeViews">Resume view notifications</Label>
            <p className="text-sm text-muted-foreground">Get notified when employers view your resume</p>
          </div>
          <Switch id="resumeViews" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="applicationUpdates">Application status updates</Label>
            <p className="text-sm text-muted-foreground">Receive updates on your job applications</p>
          </div>
          <Switch id="applicationUpdates" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="marketingEmails">Marketing emails</Label>
            <p className="text-sm text-muted-foreground">Receive tips and product updates</p>
          </div>
          <Switch id="marketingEmails" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="weeklyReports">Weekly progress reports</Label>
            <p className="text-sm text-muted-foreground">Get weekly summaries of your job search activity</p>
          </div>
          <Switch id="weeklyReports" />
        </div>
        
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
};