import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface SocialAuthButtonsProps {
  onSuccess?: () => void;
}

export const SocialAuthButtons = ({ onSuccess }: SocialAuthButtonsProps) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const { signInWithOAuth } = useAuth();
  const { toast } = useToast();

  const handleSocialSignIn = async (provider: 'google' | 'linkedin_oidc' | 'facebook') => {
    setLoadingProvider(provider);
    
    try {
      const { error } = await signInWithOAuth(provider);
      
      if (error) {
        // Handle specific provider configuration errors
        if (error.message.includes('provider is not enabled') || error.message.includes('Unsupported provider')) {
          toast({
            title: "Provider Not Available",
            description: `${provider === 'linkedin_oidc' ? 'LinkedIn' : provider.charAt(0).toUpperCase() + provider.slice(1)} authentication is currently being configured. Please try email authentication or contact support.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Redirecting...",
          description: `Signing in with ${provider === 'linkedin_oidc' ? 'LinkedIn' : provider.charAt(0).toUpperCase() + provider.slice(1)}`,
        });
        onSuccess?.();
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again or use email authentication.",
        variant: "destructive",
      });
    }
    
    setLoadingProvider(null);
  };

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Sign in to your account</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          onClick={() => handleSocialSignIn('google')}
          disabled={loadingProvider !== null}
          className="w-full h-10 bg-card/50 hover:bg-card border-border/50 hover:border-border transition-all duration-200"
        >
          {loadingProvider === 'google' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="h-4 w-4 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
          )}
          <span className="ml-2 text-sm">Google</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleSocialSignIn('linkedin_oidc')}
          disabled={loadingProvider !== null}
          className="w-full h-10 bg-card/50 hover:bg-card border-border/50 hover:border-border transition-all duration-200"
        >
          {loadingProvider === 'linkedin_oidc' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="h-4 w-4 bg-blue-700 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">in</span>
            </div>
          )}
          <span className="ml-2 text-sm">LinkedIn</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleSocialSignIn('facebook')}
          disabled={loadingProvider !== null}
          className="w-full h-10 bg-card/50 hover:bg-card border-border/50 hover:border-border transition-all duration-200"
        >
          {loadingProvider === 'facebook' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="h-4 w-4 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">f</span>
            </div>
          )}
          <span className="ml-2 text-sm">Facebook</span>
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
    </div>
  );
};