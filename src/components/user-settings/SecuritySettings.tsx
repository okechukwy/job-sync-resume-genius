import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const SecuritySettings = () => {
  return (
    <div className="space-y-8">
      <Card className="glass-card border-white/10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <CardTitle className="typography-heading text-xl">Password Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-sm font-medium text-foreground/80">Current Password</Label>
            <Input 
              id="currentPassword" 
              type="password" 
              className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-sm font-medium text-foreground/80">New Password</Label>
            <Input 
              id="newPassword" 
              type="password" 
              className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <CardTitle className="typography-heading text-xl">Two-Factor Authentication</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Two-factor authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  Disabled
                </Badge>
                <Switch className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent" />
              </div>
            </div>
          </div>
          <Button variant="outline" className="glass-card border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
            Set up 2FA
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <CardTitle className="typography-heading text-xl">Connected Accounts</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Google</Label>
                <p className="text-sm text-muted-foreground">Connected on March 15, 2024</p>
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                Connected
              </Badge>
            </div>
          </div>
          <Separator className="bg-white/10" />
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">LinkedIn</Label>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
              <Button variant="outline" size="sm" className="glass-card border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300">
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <CardTitle className="typography-heading text-xl">Data Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button variant="outline" className="glass-card border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 justify-start">
              Download My Data
            </Button>
            <Button variant="destructive" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-lg transition-all duration-300 justify-start">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};