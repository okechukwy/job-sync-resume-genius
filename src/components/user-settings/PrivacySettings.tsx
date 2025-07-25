import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUserSettings } from "@/hooks/useUserSettings";
import { cn } from "@/lib/utils";

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
        profile_visibility: privacySettings.profile_visibility || 'public',
        profile_searchable: privacySettings.profile_searchable ?? true,
        activity_status_visible: privacySettings.activity_status_visible ?? true,
        data_collection: privacySettings.data_collection ?? true,
        analytics_tracking: privacySettings.analytics_tracking ?? true,
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

        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="space-y-1">
            <Label className="text-base font-medium">Profile Searchable</Label>
            <p className="text-sm text-muted-foreground">
              Allow your profile to be found in search results
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={cn(
                "px-3 py-1 font-medium",
                formData.profile_searchable 
                  ? "text-green-700 border-green-300 bg-green-50" 
                  : "text-gray-700 border-gray-300 bg-gray-50"
              )}
            >
              {formData.profile_searchable ? "✓ On" : "○ Off"}
            </Badge>
            <Switch 
              checked={formData.profile_searchable}
              onCheckedChange={(checked) => handleSwitchChange('profile_searchable', checked)}
              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 h-6 w-11"
            />
          </div>
        </div>

        <Separator />
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="space-y-1">
            <Label className="text-base font-medium">Activity Status Visible</Label>
            <p className="text-sm text-muted-foreground">
              Show when you're online or recently active
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={cn(
                "px-3 py-1 font-medium",
                formData.activity_status_visible 
                  ? "text-green-700 border-green-300 bg-green-50" 
                  : "text-gray-700 border-gray-300 bg-gray-50"
              )}
            >
              {formData.activity_status_visible ? "✓ On" : "○ Off"}
            </Badge>
            <Switch 
              checked={formData.activity_status_visible}
              onCheckedChange={(checked) => handleSwitchChange('activity_status_visible', checked)}
              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 h-6 w-11"
            />
          </div>
        </div>

        <Separator />
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="space-y-1">
            <Label className="text-base font-medium">Data Collection</Label>
            <p className="text-sm text-muted-foreground">
              Allow collection of usage data to improve our services
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={cn(
                "px-3 py-1 font-medium",
                formData.data_collection 
                  ? "text-green-700 border-green-300 bg-green-50" 
                  : "text-gray-700 border-gray-300 bg-gray-50"
              )}
            >
              {formData.data_collection ? "✓ On" : "○ Off"}
            </Badge>
            <Switch 
              checked={formData.data_collection}
              onCheckedChange={(checked) => handleSwitchChange('data_collection', checked)}
              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 h-6 w-11"
            />
          </div>
        </div>

        <Separator />
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="space-y-1">
            <Label className="text-base font-medium">Analytics Tracking</Label>
            <p className="text-sm text-muted-foreground">
              Help us understand how you use our platform
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={cn(
                "px-3 py-1 font-medium",
                formData.analytics_tracking 
                  ? "text-green-700 border-green-300 bg-green-50" 
                  : "text-gray-700 border-gray-300 bg-gray-50"
              )}
            >
              {formData.analytics_tracking ? "✓ On" : "○ Off"}
            </Badge>
            <Switch 
              checked={formData.analytics_tracking}
              onCheckedChange={(checked) => handleSwitchChange('analytics_tracking', checked)}
              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 h-6 w-11"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full" onClick={handleSave} disabled={loading || saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};