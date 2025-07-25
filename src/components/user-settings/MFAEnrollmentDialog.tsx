import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QrCode, Shield, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MFAEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnroll: () => Promise<{ success: boolean; qrCode?: string; secret?: string; factorId?: string; error?: string }>;
  onVerify: (factorId: string, code: string) => Promise<boolean>;
}

export const MFAEnrollmentDialog = ({ open, onOpenChange, onEnroll, onVerify }: MFAEnrollmentDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'enroll' | 'verify'>('enroll');
  const [enrollmentData, setEnrollmentData] = useState<{
    qrCode?: string;
    secret?: string;
    factorId?: string;
  }>({});
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [secretCopied, setSecretCopied] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const result = await onEnroll();
      if (result.success && result.qrCode && result.secret && result.factorId) {
        setEnrollmentData({
          qrCode: result.qrCode,
          secret: result.secret,
          factorId: result.factorId
        });
        setStep('verify');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!enrollmentData.factorId || !verificationCode) return;
    
    setLoading(true);
    try {
      const success = await onVerify(enrollmentData.factorId, verificationCode);
      if (success) {
        onOpenChange(false);
        // Reset state
        setStep('enroll');
        setEnrollmentData({});
        setVerificationCode("");
      }
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copySecret = async () => {
    if (enrollmentData.secret) {
      await navigator.clipboard.writeText(enrollmentData.secret);
      setSecretCopied(true);
      toast({
        title: "Copied",
        description: "Secret key copied to clipboard"
      });
      setTimeout(() => setSecretCopied(false), 2000);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep('enroll');
    setEnrollmentData({});
    setVerificationCode("");
    setSecretCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Enable Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            {step === 'enroll' 
              ? 'Add an extra layer of security to your account'
              : 'Scan the QR code with your authenticator app and enter the verification code'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'enroll' && (
          <div className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                You'll need an authenticator app like Google Authenticator, Authy, or 1Password to set up 2FA.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-end">
              <Button onClick={handleEnroll} disabled={loading}>
                {loading ? "Setting up..." : "Begin Setup"}
              </Button>
            </div>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            {enrollmentData.qrCode && (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-white rounded-lg border">
                  <img 
                    src={enrollmentData.qrCode} 
                    alt="QR Code for 2FA setup" 
                    className="w-48 h-48"
                  />
                </div>
                
                <div className="w-full space-y-2">
                  <Label className="text-sm font-medium">Manual Entry Key</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={enrollmentData.secret || ''}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copySecret}
                      className="shrink-0"
                    >
                      {secretCopied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use this key if you can't scan the QR code
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-lg tracking-wider"
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('enroll')}>
                Back
              </Button>
              <Button 
                onClick={handleVerify} 
                disabled={loading || verificationCode.length !== 6}
              >
                {loading ? "Verifying..." : "Verify & Enable"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};