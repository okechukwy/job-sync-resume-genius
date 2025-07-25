import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
  confirmPassword?: string;
}

export const PasswordStrengthIndicator = ({ password, confirmPassword }: PasswordStrengthIndicatorProps) => {
  const requirements = [
    {
      label: "At least 8 characters",
      met: password.length >= 8
    },
    {
      label: "At least 1 uppercase letter",
      met: /[A-Z]/.test(password)
    },
    {
      label: "At least 1 number",
      met: /\d/.test(password)
    },
    {
      label: "At least 1 special character",
      met: /[@$!%*?&]/.test(password)
    }
  ];

  const metRequirements = requirements.filter(req => req.met).length;
  const strengthPercentage = (metRequirements / requirements.length) * 100;

  const getStrengthColor = () => {
    if (strengthPercentage <= 25) return "bg-destructive";
    if (strengthPercentage <= 50) return "bg-orange-500";
    if (strengthPercentage <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = () => {
    if (strengthPercentage <= 25) return "Weak";
    if (strengthPercentage <= 50) return "Fair";
    if (strengthPercentage <= 75) return "Good";
    return "Strong";
  };

  const passwordsMatch = confirmPassword !== undefined && password === confirmPassword && password.length > 0;
  const allRequirementsMet = requirements.every(req => req.met);

  return (
    <div className="space-y-3">
      {password.length > 0 && (
        <>
          {/* Strength Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Password Strength</span>
              <span className={cn(
                "text-sm font-medium",
                strengthPercentage <= 25 && "text-destructive",
                strengthPercentage > 25 && strengthPercentage <= 50 && "text-orange-500",
                strengthPercentage > 50 && strengthPercentage <= 75 && "text-yellow-600",
                strengthPercentage > 75 && "text-green-600"
              )}>
                {getStrengthLabel()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn("h-2 rounded-full transition-all duration-300", getStrengthColor())}
                style={{ width: `${strengthPercentage}%` }}
              />
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-2">
            <span className="text-sm font-medium">Requirements</span>
            <div className="space-y-1">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  {requirement.met ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm",
                    requirement.met ? "text-green-600" : "text-muted-foreground"
                  )}>
                    {requirement.label}
                  </span>
                </div>
              ))}
              
              {/* Password Match Indicator */}
              {confirmPassword !== undefined && (
                <div className="flex items-center gap-2">
                  {passwordsMatch ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm",
                    passwordsMatch ? "text-green-600" : "text-muted-foreground"
                  )}>
                    Passwords match
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};