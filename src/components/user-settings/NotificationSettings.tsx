import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUserSettings } from "@/hooks/useUserSettings";

export const NotificationSettings = () => {
  const { settings, updateSettings, loading } = useUserSettings();
  const [formData, setFormData] = useState({
    email_notifications: true,
    marketing_emails: false,
    job_match_alerts: true,
    application_status_updates: true,
    resume_view_notifications: true,
    notification_frequency: "immediate",
    weekly_progress_reports: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        email_notifications: settings.email_notifications !== null ? settings.email_notifications : true,
        marketing_emails: settings.marketing_emails !== null ? settings.marketing_emails : false,
        job_match_alerts: settings.job_match_alerts !== null ? settings.job_match_alerts : true,
        application_status_updates: settings.application_status_updates !== null ? settings.application_status_updates : true,
        resume_view_notifications: settings.resume_view_notifications !== null ? settings.resume_view_notifications : true,
        notification_frequency: settings.notification_frequency || "immediate",
        weekly_progress_reports: settings.weekly_progress_reports !== null ? settings.weekly_progress_reports : true,
      });
    }
  }, [settings]);

  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings(formData);
    setSaving(false);
  };

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
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive general email notifications
              </p>
            </div>
            <Switch 
              checked={formData.email_notifications}
              onCheckedChange={(checked) => handleSwitchChange('email_notifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive marketing and promotional emails
              </p>
            </div>
            <Switch 
              checked={formData.marketing_emails}
              onCheckedChange={(checked) => handleSwitchChange('marketing_emails', checked)}
            />
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
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">Job Match Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about relevant job opportunities
              </p>
            </div>
            <Switch 
              checked={formData.job_match_alerts}
              onCheckedChange={(checked) => handleSwitchChange('job_match_alerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">Application Status Updates</Label>
              <p className="text-sm text-muted-foreground">
                Updates on your job application status
              </p>
            </div>
            <Switch 
              checked={formData.application_status_updates}
              onCheckedChange={(checked) => handleSwitchChange('application_status_updates', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">Resume View Notifications</Label>
              <p className="text-sm text-muted-foreground">
                When employers view your resume
              </p>
            </div>
            <Switch 
              checked={formData.resume_view_notifications}
              onCheckedChange={(checked) => handleSwitchChange('resume_view_notifications', checked)}
            />
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
          <div>
            <Label htmlFor="frequency" className="text-sm font-medium text-foreground">
              Notification Frequency
            </Label>
            <Select value={formData.notification_frequency} onValueChange={(value) => handleSelectChange('notification_frequency', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-foreground">Weekly Progress Reports</Label>
              <p className="text-sm text-muted-foreground">
                Receive weekly summaries of your job search progress
              </p>
            </div>
            <Switch 
              checked={formData.weekly_progress_reports}
              onCheckedChange={(checked) => handleSwitchChange('weekly_progress_reports', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading || saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};