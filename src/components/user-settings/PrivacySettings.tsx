import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const PrivacySettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="profileVisibility">Profile Visibility</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select visibility level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="connections">Connections Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="searchable">Make profile searchable</Label>
            <p className="text-sm text-muted-foreground">Allow others to find your profile in search results</p>
          </div>
          <Switch id="searchable" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="showActivity">Show activity status</Label>
            <p className="text-sm text-muted-foreground">Let others see when you're online</p>
          </div>
          <Switch id="showActivity" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dataCollection">Allow data collection for improvements</Label>
            <p className="text-sm text-muted-foreground">Help us improve our services with anonymous usage data</p>
          </div>
          <Switch id="dataCollection" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="analytics">Analytics tracking</Label>
            <p className="text-sm text-muted-foreground">Track your usage for personalized recommendations</p>
          </div>
          <Switch id="analytics" />
        </div>
        
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
};