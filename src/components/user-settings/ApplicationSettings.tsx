import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useUserSettings } from "@/hooks/useUserSettings";

export const ApplicationSettings = () => {
  const { settings, updateSettings, loading } = useUserSettings();
  const [formData, setFormData] = useState({
    theme: "system",
    language: "en",
    timezone: "UTC",
    date_format: "MM/DD/YYYY",
    auto_save: true,
    keyboard_shortcuts: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        theme: settings.theme,
        language: settings.language,
        timezone: settings.timezone,
        date_format: settings.date_format,
        auto_save: settings.auto_save,
        keyboard_shortcuts: settings.keyboard_shortcuts,
      });
    }
  }, [settings]);

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings(formData);
    setSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="theme" className="text-sm font-medium text-foreground">
            Theme
          </Label>
          <Select value={formData.theme} onValueChange={(value) => handleSelectChange('theme', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="language" className="text-sm font-medium text-foreground">
            Language
          </Label>
          <Select value={formData.language} onValueChange={(value) => handleSelectChange('language', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="timezone" className="text-sm font-medium text-foreground">
            Timezone
          </Label>
          <Select value={formData.timezone} onValueChange={(value) => handleSelectChange('timezone', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="America/New_York">Eastern Time</SelectItem>
              <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
              <SelectItem value="Europe/London">GMT</SelectItem>
              <SelectItem value="Asia/Tokyo">JST</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dateFormat" className="text-sm font-medium text-foreground">
            Date Format
          </Label>
          <Select value={formData.date_format} onValueChange={(value) => handleSelectChange('date_format', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Auto-save</Label>
            <p className="text-sm text-muted-foreground">
              Automatically save your work
            </p>
          </div>
          <Switch 
            checked={formData.auto_save}
            onCheckedChange={(checked) => handleSwitchChange('auto_save', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Keyboard Shortcuts</Label>
            <p className="text-sm text-muted-foreground">
              Enable keyboard shortcuts
            </p>
          </div>
          <Switch 
            checked={formData.keyboard_shortcuts}
            onCheckedChange={(checked) => handleSwitchChange('keyboard_shortcuts', checked)}
          />
        </div>

        <Button className="w-full" onClick={handleSave} disabled={loading || saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};