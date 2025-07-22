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
import { Separator } from "@/components/ui/separator";
import { Loader2, ExternalLink, Search, AlertCircle, CheckCircle2, TrendingUp, Target, Lightbulb, Award } from "lucide-react";
import { linkedInUrlScanSchema, type LinkedInUrlScan, type ScannedProfile } from "@/schemas/linkedInSchemas";
import { LinkedInProfileExtractor } from "@/services/linkedInProfileExtractor";
import { CompetitiveBenchmarkingConfig } from "./CompetitiveBenchmarkingConfig";
import { toast } from "sonner";

interface LinkedInUrlScannerProps {
  onScanComplete?: (result: ScannedProfile) => void;
}

interface EnhancedScannedProfile extends ScannedProfile {
  industryBenchmarks?: {
    averageProfileStrength: number;
    topPerformerGap: string[];
    competitiveAdvantage: string[];
  };
  improvementRecommendations?: Array<{
    area: string;
    priority: 'high' | 'medium' | 'low';
    impact: string;
    suggestion: string;
  }>;
  marketInsights?: {
    trendingKeywords: string[];
    emergingSkills: string[];
    industryGrowthAreas: string[];
  };
}

export const LinkedInUrlScanner = ({ onScanComplete }: LinkedInUrlScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<EnhancedScannedProfile | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const form = useForm<LinkedInUrlScan>({
    resolver: zodResolver(linkedInUrlScanSchema),
    defaultValues: {
      profileUrl: "",
      scanDepth: "detailed",
      analysisType: "personal",
      compareWithCurrent: false,
      competitiveBenchmarking: {
        targetIndustry: undefined,
        experienceLevel: undefined,
        geographicMarket: undefined,
        competitorCompanies: [],
      },
    },
  });

  const watchCompareWithCurrent = form.watch("compareWithCurrent");

  const simulateProgress = () => {
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
    return interval;
  };

  const onSubmit = async (data: LinkedInUrlScan) => {
    setIsScanning(true);
    setScanError(null);
    setScanResult(null);

    const progressInterval = simulateProgress();

    try {
      const result = await LinkedInProfileExtractor.extractProfile(
        data.profileUrl, 
        data.scanDepth,
        data.analysisType,
        data.compareWithCurrent,
        data.competitiveBenchmarking
      );
      
      clearInterval(progressInterval);
      setScanProgress(100);

      if (result.success && result.data) {
        setScanResult(result.data as EnhancedScannedProfile);
        onScanComplete?.(result.data);
        toast.success("Profile analyzed successfully with AI insights!");
      } else {
        setScanError(result.error || "Failed to analyze profile");
        toast.error(result.error || "Failed to analyze profile");
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            AI-Powered LinkedIn Profile Scanner
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
                      <FormLabel>Analysis Depth</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic">Basic - Quick AI overview</SelectItem>
                          <SelectItem value="detailed">Detailed - Comprehensive AI analysis</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive - Full competitive AI intelligence</SelectItem>
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
                      <FormLabel>Analysis Focus</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">Personal - Self-improvement insights</SelectItem>
                          <SelectItem value="competitive">Competitive - Against top performers</SelectItem>
                          <SelectItem value="industry">Industry - Market benchmarking</SelectItem>
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
                        Include competitive benchmarking
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Compare against industry leaders and market trends with detailed configuration
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              {watchCompareWithCurrent && (
                <CompetitiveBenchmarkingConfig control={form.control} />
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isScanning || !validateUrl(form.watch("profileUrl"))}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    AI Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze with AI
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
                <span className="text-sm font-medium">AI Analysis Progress</span>
                <Badge variant="outline">{Math.round(scanProgress)}%</Badge>
              </div>
              <Progress value={scanProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                AI analyzing profile content, competitive positioning, and market trends...
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

      {/* Enhanced AI Scan Results */}
      {scanResult && (
        <div className="space-y-6">
          {/* Overview Metrics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {scanResult.competitiveMetrics.headlineOptimization}%
                  </div>
                  <div className="text-sm text-muted-foreground">Headline Score</div>
                </div>
              </div>

              {/* Industry Benchmarks */}
              {scanResult.industryBenchmarks && (
                <div className="space-y-4">
                  <Separator />
                  <h4 className="font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Industry Benchmarks
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">vs. Industry Average</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={(scanResult.profileStrength / scanResult.industryBenchmarks.averageProfileStrength) * 100} className="flex-1" />
                        <span className="text-sm text-muted-foreground">
                          {scanResult.profileStrength > scanResult.industryBenchmarks.averageProfileStrength ? '+' : ''}
                          {scanResult.profileStrength - scanResult.industryBenchmarks.averageProfileStrength}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Competitive Advantages</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {scanResult.industryBenchmarks.competitiveAdvantage.slice(0, 2).map((advantage, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {advantage}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI-Powered Improvement Recommendations */}
          {scanResult.improvementRecommendations && scanResult.improvementRecommendations.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI Improvement Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scanResult.improvementRecommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/20">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium">{recommendation.area}</h5>
                      <Badge variant={getPriorityColor(recommendation.priority)} className="text-xs">
                        {recommendation.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{recommendation.suggestion}</p>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{recommendation.impact}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Market Insights */}
          {scanResult.marketInsights && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Market Insights & Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Trending Keywords</h5>
                    <div className="flex flex-wrap gap-1">
                      {scanResult.marketInsights.trendingKeywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Emerging Skills</h5>
                    <div className="flex flex-wrap gap-1">
                      {scanResult.marketInsights.emergingSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Growth Areas</h5>
                    <div className="flex flex-wrap gap-1">
                      {scanResult.marketInsights.industryGrowthAreas.map((area, index) => (
                        <Badge key={index} variant="default" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Extracted Profile Data */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Profile Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Profile Metrics</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Headline Optimization:</span>
                      <span className="font-medium">{scanResult.competitiveMetrics.headlineOptimization}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Summary Quality:</span>
                      <span className="font-medium">{scanResult.competitiveMetrics.summaryLength}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skills Coverage:</span>
                      <span className="font-medium">{scanResult.competitiveMetrics.skillsCount}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience Detail:</span>
                      <span className="font-medium">{scanResult.competitiveMetrics.experienceDetail}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Profile Content</h5>
                  <div className="space-y-2 text-sm">
                    <div><strong>Headline:</strong> {scanResult.extractedData.headline || "Not optimized"}</div>
                    <div><strong>Location:</strong> {scanResult.extractedData.location || "Not specified"}</div>
                    <div><strong>Industry:</strong> {scanResult.extractedData.industry || "Not specified"}</div>
                    <div><strong>Skills:</strong> {scanResult.extractedData.skills?.join(", ") || "Limited skills listed"}</div>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  This AI-powered analysis provides real competitive insights and actionable recommendations for LinkedIn optimization.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
