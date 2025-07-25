import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Trash2 } from "lucide-react";

interface AccountDeletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<boolean>;
  userEmail?: string;
}

export const AccountDeletionDialog = ({ open, onOpenChange, onConfirm, userEmail }: AccountDeletionDialogProps) => {
  const [confirmationText, setConfirmationText] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const expectedText = "DELETE MY ACCOUNT";
  const isConfirmationValid = confirmationText.toUpperCase() === expectedText && agreedToTerms;

  const handleConfirm = async () => {
    if (!isConfirmationValid) return;
    
    setLoading(true);
    try {
      const success = await onConfirm();
      if (success) {
        onOpenChange(false);
        // Reset form
        setConfirmationText("");
        setAgreedToTerms(false);
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setConfirmationText("");
    setAgreedToTerms(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> Account deletion is permanent and irreversible. All of the following will be permanently deleted:
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Your profile and personal information</li>
                <li>All resumes and CV data</li>
                <li>Job application history</li>
                <li>Interview preparation data</li>
                <li>LinkedIn optimization data</li>
                <li>Performance metrics and analytics</li>
                <li>Security events and settings</li>
                <li>All uploaded files and documents</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confirmation">
                Type <strong>{expectedText}</strong> to confirm deletion (case insensitive):
              </Label>
              <Input
                id="confirmation"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder={expectedText}
                className={`font-mono ${
                  confirmationText.length > 0 
                    ? confirmationText.toUpperCase() === expectedText 
                      ? "border-green-500 focus-visible:ring-green-500" 
                      : "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {confirmationText.length > 0 && confirmationText.toUpperCase() !== expectedText && (
                <p className="text-sm text-red-600">
                  Text must match exactly: "{expectedText}"
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agree-terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="agree-terms" className="text-sm">
                I understand that this action is permanent and cannot be undone
              </Label>
            </div>

            {userEmail && (
              <div className="text-sm text-muted-foreground">
                This will delete the account associated with: <strong>{userEmail}</strong>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={!isConfirmationValid || loading}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {loading ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};