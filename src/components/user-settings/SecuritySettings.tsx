import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useSecuritySettings } from "@/hooks/useSecuritySettings";
import { Shield, Key, Download, Trash2, ExternalLink, Eye, EyeOff, Github, Chrome, Linkedin, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { MFAEnrollmentDialog } from "./MFAEnrollmentDialog";
import { AccountDeletionDialog } from "./AccountDeletionDialog";
import { cn } from "@/lib/utils";

export const SecuritySettings = () => {
  const { toast } = useToast();
  const {
    loading,
    settings,
    connectedAccounts,
    updateSecuritySetting,
    enrollMFA,
    verifyMFAEnrollment,
    disableMFA,
    changePassword,
    connectOAuthProvider,
    disconnectAccount,
    deleteAccount,
    requestDataExport
  } = useSecuritySettings();
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [mfaDialogOpen, setMfaDialogOpen] = useState(false);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  // Real-time password validation
  const passwordValidation = useMemo(() => {
    const requirements = {
      minLength: passwordForm.newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(passwordForm.newPassword),
      hasNumber: /\d/.test(passwordForm.newPassword),
      hasSpecialChar: /[@$!%*?&]/.test(passwordForm.newPassword)
    };
    
    const allRequirementsMet = Object.values(requirements).every(Boolean);
    const passwordsMatch = passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.newPassword.length > 0;
    
    return {
      requirements,
      allRequirementsMet,
      passwordsMatch,
      isValid: allRequirementsMet && passwordsMatch && passwordForm.currentPassword.length > 0
    };
  }, [passwordForm]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation is now handled by real-time validation
    if (!passwordValidation.isValid) {
      toast({
        title: "Error",
        description: "Please fix all password requirements before submitting",
        variant: "destructive"
      });
      return;
    }

    const success = await changePassword(passwordForm.newPassword);
    if (success) {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  };

  const handleMFAToggle = async (enabled: boolean) => {
    if (enabled) {
      setMfaDialogOpen(true);
    } else {
      await disableMFA();
    }
  };

  const handleDataExport = async () => {
    await requestDataExport();
  };

  const handleConnectProvider = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
    await connectOAuthProvider(provider);
  };

  const handleDisconnectAccount = async (accountId: string, provider: string) => {
    if (confirm(`Are you sure you want to disconnect your ${provider} account?`)) {
      await disconnectAccount(accountId);
    }
  };

  const handleDeleteAccount = async () => {
    return await deleteAccount();
  };

  return (
    <div className="space-y-6">
      {/* Password Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Password Security
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showPasswords.current ? "text" : "password"} 
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input 
                  id="newPassword" 
                  type={showPasswords.new ? "text" : "password"} 
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  minLength={8}
                  className={cn(
                    "pr-10",
                    passwordForm.newPassword.length > 0 && !passwordValidation.allRequirementsMet && "border-destructive focus-visible:ring-destructive",
                    passwordForm.newPassword.length > 0 && passwordValidation.allRequirementsMet && "border-green-500 focus-visible:ring-green-500"
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {passwordForm.newPassword.length > 0 && (
                <PasswordStrengthIndicator password={passwordForm.newPassword} />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  type={showPasswords.confirm ? "text" : "password"} 
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  minLength={8}
                  className={cn(
                    "pr-10",
                    passwordForm.confirmPassword.length > 0 && !passwordValidation.passwordsMatch && "border-destructive focus-visible:ring-destructive",
                    passwordForm.confirmPassword.length > 0 && passwordValidation.passwordsMatch && "border-green-500 focus-visible:ring-green-500"
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {passwordForm.confirmPassword.length > 0 && (
                <PasswordStrengthIndicator 
                  password={passwordForm.newPassword} 
                  confirmPassword={passwordForm.confirmPassword}
                />
              )}
            </div>
            <div className="flex justify-end pt-2">
              <Button 
                type="submit" 
                disabled={loading || !passwordValidation.isValid}
                className={cn(
                  passwordValidation.isValid && "bg-green-600 hover:bg-green-700"
                )}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <div className="space-y-1">
              <Label className="text-base font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Two-factor authentication
              </Label>
              <p className="text-sm text-muted-foreground">Secure your account with 2FA using an authenticator app</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge 
                variant="outline" 
                className={cn(
                  "px-3 py-1 font-medium",
                  settings.two_factor_enabled 
                    ? "text-green-700 border-green-300 bg-green-50" 
                    : "text-orange-700 border-orange-300 bg-orange-50"
                )}
              >
                {settings.two_factor_enabled ? "✓ Enabled" : "⚠ Disabled"}
              </Badge>
              <div className="flex items-center gap-2">
                <Label 
                  htmlFor="mfa-toggle" 
                  className={cn(
                    "text-sm font-medium cursor-pointer",
                    settings.two_factor_enabled ? "text-green-700" : "text-orange-700"
                  )}
                >
                  {settings.two_factor_enabled ? "On" : "Off"}
                </Label>
                <Switch 
                  id="mfa-toggle"
                  checked={settings.two_factor_enabled}
                  onCheckedChange={handleMFAToggle}
                  disabled={loading}
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 h-6 w-11"
                />
              </div>
            </div>
          </div>
          
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              {settings.two_factor_enabled 
                ? "Two-factor authentication is protecting your account. Disable it only if you have an alternative authenticator app set up."
                : "Enable two-factor authentication to add an extra layer of security to your account using an authenticator app."
              }
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Security Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Security Notifications</CardTitle>
          <CardDescription>
            Configure how you receive security-related notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <div className="space-y-1">
              <Label className="text-base font-medium">Login Notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className={cn(
                  "px-3 py-1 font-medium",
                  settings.login_notifications 
                    ? "text-green-700 border-green-300 bg-green-50" 
                    : "text-gray-700 border-gray-300 bg-gray-50"
                )}
              >
                {settings.login_notifications ? "✓ On" : "○ Off"}
              </Badge>
              <Switch 
                checked={settings.login_notifications}
                onCheckedChange={(checked) => updateSecuritySetting('login_notifications', checked)}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 h-6 w-11"
              />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <div className="space-y-1">
              <Label className="text-base font-medium">Suspicious Activity Alerts</Label>
              <p className="text-sm text-muted-foreground">Get alerted about unusual account activity</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className={cn(
                  "px-3 py-1 font-medium",
                  settings.suspicious_activity_alerts 
                    ? "text-green-700 border-green-300 bg-green-50" 
                    : "text-gray-700 border-gray-300 bg-gray-50"
                )}
              >
                {settings.suspicious_activity_alerts ? "✓ On" : "○ Off"}
              </Badge>
              <Switch 
                checked={settings.suspicious_activity_alerts}
                onCheckedChange={(checked) => updateSecuritySetting('suspicious_activity_alerts', checked)}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 h-6 w-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage your connected third-party accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {connectedAccounts.length > 0 ? (
            <div className="space-y-4">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center">
                      {account.provider === 'google' && <Chrome className="w-5 h-5 text-blue-600" />}
                      {account.provider === 'github' && <Github className="w-5 h-5 text-gray-800" />}
                      {account.provider === 'linkedin_oidc' && <Linkedin className="w-5 h-5 text-blue-700" />}
                      {!['google', 'github', 'linkedin_oidc'].includes(account.provider) && (
                        <ExternalLink className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label className="text-base font-medium capitalize flex items-center gap-2">
                        {account.provider === 'linkedin_oidc' ? 'LinkedIn' : account.provider}
                        <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                          ✓ Connected
                        </Badge>
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {account.provider_account_email || "Connected account"} • 
                        Connected {new Date(account.connected_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisconnectAccount(account.id, account.provider)}
                    className="text-destructive hover:text-destructive"
                  >
                    Disconnect
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">No connected accounts</p>
              <p className="text-sm text-muted-foreground mb-6">
                Connect external accounts for easier sign-in and enhanced security
              </p>
            </div>
          )}
          
          {/* Connect New Accounts */}
          <div className="space-y-4">
            <Separator />
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Connect New Account
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleConnectProvider('google')}
                  disabled={loading || connectedAccounts.some(acc => acc.provider === 'google')}
                  className="flex items-center gap-2 h-12"
                >
                  <Chrome className="w-5 h-5 text-blue-600" />
                  <span>Google</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleConnectProvider('github')}
                  disabled={loading || connectedAccounts.some(acc => acc.provider === 'github')}
                  className="flex items-center gap-2 h-12"
                >
                  <Github className="w-5 h-5 text-gray-800" />
                  <span>GitHub</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleConnectProvider('linkedin_oidc')}
                  disabled={loading || connectedAccounts.some(acc => acc.provider === 'linkedin_oidc')}
                  className="flex items-center gap-2 h-12"
                >
                  <Linkedin className="w-5 h-5 text-blue-700" />
                  <span>LinkedIn</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Download your data or delete your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Export Data</Label>
              <p className="text-sm text-muted-foreground">Download a copy of your data</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleDataExport} disabled={loading}>
              <Download className="w-4 h-4 mr-2" />
              {loading ? "Requesting..." : "Export"}
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
            <div className="space-y-1">
              <Label className="text-base font-medium text-destructive">Delete Account</Label>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setDeletionDialogOpen(true)}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* MFA Enrollment Dialog */}
      <MFAEnrollmentDialog
        open={mfaDialogOpen}
        onOpenChange={setMfaDialogOpen}
        onEnroll={enrollMFA}
        onVerify={verifyMFAEnrollment}
      />

      {/* Account Deletion Dialog */}
      <AccountDeletionDialog
        open={deletionDialogOpen}
        onOpenChange={setDeletionDialogOpen}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};