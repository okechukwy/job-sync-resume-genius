import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Mail, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cooldownTime, setCooldownTime] = useState(0);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/get-started";
  const intent = location.state?.intent;

  // Handle cooldown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTime]);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Handle email input change for real-time validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setResetEmail(email);
    if (email) {
      validateEmail(email);
    } else {
      setEmailError("");
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const welcomeMessage = intent === 'trial' 
        ? "Welcome! Your 14-day trial is ready." 
        : "Welcome back!";
      const description = intent === 'trial'
        ? "Start building your resume and explore all features."
        : "You have been successfully signed in.";
        
      toast({
        title: welcomeMessage,
        description: description,
      });
      navigate(from, { replace: true });
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message);
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const welcomeMessage = intent === 'trial' 
        ? "Welcome! Your 14-day trial starts now." 
        : "Account created!";
      const description = intent === 'trial'
        ? "Start building your resume and explore all features."
        : "Please check your email to verify your account.";
        
      toast({
        title: welcomeMessage,
        description: description,
      });
      navigate(from, { replace: true });
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    // Validate email before sending
    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    });

    if (error) {
      setError(error.message);
      toast({
        title: "Error sending reset email",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setResetSuccess(true);
      setResetEmail(email);
      setCooldownTime(60); // 60 second cooldown
      toast({
        title: "Reset email sent!",
        description: "Please check your email for password reset instructions.",
      });
    }

    setIsLoading(false);
  };

  const handleResendEmail = async () => {
    if (cooldownTime > 0 || !resetEmail) return;
    
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/auth`,
    });

    if (error) {
      setError(error.message);
      toast({
        title: "Error resending email",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setCooldownTime(60); // Reset cooldown
      toast({
        title: "Email resent!",
        description: "Please check your email again.",
      });
    }

    setIsLoading(false);
  };

  const resetForgotPasswordState = () => {
    setShowForgotPassword(false);
    setResetSuccess(false);
    setResetEmail("");
    setEmailError("");
    setError(null);
    setCooldownTime(0);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      <Card className="w-full max-w-md relative z-10 bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to ResumeAI</CardTitle>
          <CardDescription>
            Create professional resumes with AI assistance
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent border border-border">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <SocialAuthButtons onSuccess={() => navigate(from, { replace: true })} />
              {!showForgotPassword ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-muted-foreground"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </form>
              ) : !resetSuccess ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email Address</Label>
                    <Input
                      id="reset-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={resetEmail}
                      onChange={handleEmailChange}
                      required
                      disabled={isLoading}
                      className={emailError ? "border-destructive" : ""}
                    />
                    {emailError && (
                      <p className="text-sm text-destructive">{emailError}</p>
                    )}
                  </div>
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !!emailError || !resetEmail}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending reset email...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Reset Email
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-muted-foreground"
                      onClick={resetForgotPasswordState}
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                    <h3 className="text-lg font-semibold">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground">
                      We've sent password reset instructions to:
                    </p>
                    <p className="text-sm font-medium text-primary">{resetEmail}</p>
                  </div>

                  <Alert>
                    <Mail className="h-4 w-4" />
                    <AlertDescription>
                      If you don't see the email, check your spam folder. The link will expire in 1 hour.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleResendEmail}
                      disabled={cooldownTime > 0 || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : cooldownTime > 0 ? (
                        <>
                          <Clock className="mr-2 h-4 w-4" />
                          Resend in {cooldownTime}s
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Resend Email
                        </>
                      )}
                    </Button>

                    <Button
                      variant="link"
                      className="w-full text-sm text-muted-foreground"
                      onClick={resetForgotPasswordState}
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <SocialAuthButtons onSuccess={() => navigate(from, { replace: true })} />
              
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-fullname">Full Name</Label>
                  <Input
                    id="signup-fullname"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password (min. 6 characters)"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;