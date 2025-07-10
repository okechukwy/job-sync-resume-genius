import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ExternalLink, Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { linkedInUrlScanSchema, type LinkedInUrlScan, type ScannedProfile } from "@/schemas/linkedInSchemas";
import { LinkedInProfileExtractor } from "@/services/linkedInProfileExtractor";
import { toast } from "sonner";

interface LinkedInUrlScannerProps {
  onScanComplete?: (result: ScannedProfile) => void;
}

export const LinkedInUrlScanner = ({ onScanComplete }: LinkedInUrlScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<ScannedProfile | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const form = useForm<LinkedInUrlScan>({
    resolver: zodResolver(linkedInUrlScanSchema),
    defaultValues: {
      profileUrl: "",
      scanDepth: "detailed",
      analysisType: "personal",
      compareWithCurrent: true,
    },
  });

  const simulateProgress = () => {
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 20;
      });
    }, 200);
    return interval;
  };

  const onSubmit = async (data: LinkedInUrlScan) => {
    setIsScanning(true);
    setScanError(null);
    setScanResult(null);

    const progressInterval = simulateProgress();

    try {
      const result = await LinkedInProfileExtractor.extractProfile(data.profileUrl, data.scanDepth);
      
      clearInterval(progressInterval);
      setScanProgress(100);

      if (result.success && result.data) {
        setScanResult(result.data);
        onScanComplete?.(result.data);
        toast.success("Profile scanned successfully!");
      } else {
        setScanError(result.error || "Failed to scan profile");
        toast.error(result.error || "Failed to scan profile");
      }
    } catch (error) {
      clearInterval(progressInterval);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setScanError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsScanning(false);
    }
  };

  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('linkedin.com') && url.includes('/in/');
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            LinkedIn Profile URL Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="profileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile URL *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                          className="glass-card pr-10"
                        />
                        <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    {field.value && !validateUrl(field.value) && (
                      <p className="text-sm text-destructive">Please enter a valid LinkedIn profile URL</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="scanDepth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scan Depth</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic">Basic - Quick overview</SelectItem>
                          <SelectItem value="detailed">Detailed - Comprehensive analysis</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive - Full competitive analysis</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="analysisType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Analysis Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">Personal - For self-improvement</SelectItem>
                          <SelectItem value="competitive">Competitive - Against competitors</SelectItem>
                          <SelectItem value="industry">Industry - Benchmark against industry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="compareWithCurrent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Compare with my current profile
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Generate improvement suggestions based on comparison
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isScanning || !validateUrl(form.watch("profileUrl"))}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning Profile...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Scan LinkedIn Profile
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Scanning Progress</span>
                <Badge variant="outline">{Math.round(scanProgress)}%</Badge>
              </div>
              <Progress value={scanProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Extracting profile data and analyzing content...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan Error */}
      {scanError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{scanError}</AlertDescription>
        </Alert>
      )}

      {/* Scan Results */}
      {scanResult && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Scan Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{scanResult.profileStrength}%</div>
                <div className="text-sm text-muted-foreground">Profile Strength</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{scanResult.industryAlignment}%</div>
                <div className="text-sm text-muted-foreground">Industry Alignment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Object.keys(scanResult.keywordDensity).length}
                </div>
                <div className="text-sm text-muted-foreground">Keywords Found</div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Extracted Profile Data</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Headline:</strong> {scanResult.extractedData.headline || "Not available"}</div>
                <div><strong>Location:</strong> {scanResult.extractedData.location || "Not specified"}</div>
                <div><strong>Industry:</strong> {scanResult.extractedData.industry || "Not specified"}</div>
                <div><strong>Skills:</strong> {scanResult.extractedData.skills?.join(", ") || "None listed"}</div>
              </div>
            </div>

            <Alert>
              <AlertDescription>
                This scanned profile data can now be used for competitive analysis and improvement suggestions.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};