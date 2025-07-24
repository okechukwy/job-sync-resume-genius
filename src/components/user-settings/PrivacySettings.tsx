import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useUserSettings } from "@/hooks/useUserSettings";

export const PrivacySettings = () => {
  const { privacySettings, updatePrivacySettings, loading } = useUserSettings();
  const [formData, setFormData] = useState({
    profile_visibility: "public",
    profile_searchable: true,
    activity_status_visible: true,
    data_collection: true,
    analytics_tracking: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (privacySettings) {
      setFormData({
        profile_visibility: privacySettings.profile_visibility,
        profile_searchable: privacySettings.profile_searchable,
        activity_status_visible: privacySettings.activity_status_visible,
        data_collection: privacySettings.data_collection,
        analytics_tracking: privacySettings.analytics_tracking,
      });
    }
  }, [privacySettings]);

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updatePrivacySettings(formData);
    setSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="visibility" className="text-sm font-medium text-foreground">
            Profile Visibility
          </Label>
          <Select value={formData.profile_visibility} onValueChange={(value) => handleSelectChange('profile_visibility', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="connections">Connections Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Profile Searchable</Label>
            <p className="text-sm text-muted-foreground">
              Allow your profile to be found in search results
            </p>
          </div>
          <Switch 
            checked={formData.profile_searchable}
            onCheckedChange={(checked) => handleSwitchChange('profile_searchable', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Activity Status Visible</Label>
            <p className="text-sm text-muted-foreground">
              Show when you're online or recently active
            </p>
          </div>
          <Switch 
            checked={formData.activity_status_visible}
            onCheckedChange={(checked) => handleSwitchChange('activity_status_visible', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Data Collection</Label>
            <p className="text-sm text-muted-foreground">
              Allow collection of usage data to improve our services
            </p>
          </div>
          <Switch 
            checked={formData.data_collection}
            onCheckedChange={(checked) => handleSwitchChange('data_collection', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Analytics Tracking</Label>
            <p className="text-sm text-muted-foreground">
              Help us understand how you use our platform
            </p>
          </div>
          <Switch 
            checked={formData.analytics_tracking}
            onCheckedChange={(checked) => handleSwitchChange('analytics_tracking', checked)}
          />
        </div>

        <Button className="w-full" onClick={handleSave} disabled={loading || saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};