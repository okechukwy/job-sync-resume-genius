import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      {/* Password Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Password Security</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <div className="flex justify-end pt-2">
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label className="text-base font-medium">Two-factor authentication</Label>
              <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Disabled
              </Badge>
              <Switch />
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Set up 2FA
          </Button>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connected Accounts</CardTitle>
          <CardDescription>
            Manage your connected third-party accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label className="text-base font-medium">Google</Label>
              <p className="text-sm text-muted-foreground">Connected on March 15, 2024</p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Connected
            </Badge>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label className="text-base font-medium">LinkedIn</Label>
              <p className="text-sm text-muted-foreground">Not connected</p>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Data Management</CardTitle>
          <CardDescription>
            Download your data or delete your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Download My Data
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};