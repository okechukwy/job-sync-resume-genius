import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Email Notifications</CardTitle>
          <CardDescription>
            Control which email notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="emailNotifications" className="text-base font-medium">Email notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch id="emailNotifications" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="marketingEmails" className="text-base font-medium">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">Receive tips and product updates</p>
            </div>
            <Switch id="marketingEmails" />
          </div>
        </CardContent>
      </Card>

      {/* Job-Related Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job-Related Notifications</CardTitle>
          <CardDescription>
            Stay updated on job opportunities and applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="jobAlerts" className="text-base font-medium">Job match alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when jobs match your profile</p>
            </div>
            <Switch id="jobAlerts" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="applicationUpdates" className="text-base font-medium">Application status updates</Label>
              <p className="text-sm text-muted-foreground">Receive updates on your job applications</p>
            </div>
            <Switch id="applicationUpdates" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="resumeViews" className="text-base font-medium">Resume view notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified when employers view your resume</p>
            </div>
            <Switch id="resumeViews" />
          </div>
        </CardContent>
      </Card>

      {/* Notification Frequency */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Frequency</CardTitle>
          <CardDescription>
            Choose how often you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
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
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="weeklyReports" className="text-base font-medium">Weekly progress reports</Label>
              <p className="text-sm text-muted-foreground">Get weekly summaries of your job search activity</p>
            </div>
            <Switch id="weeklyReports" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>
          Save Changes
        </Button>
      </div>
    </div>
  );
};