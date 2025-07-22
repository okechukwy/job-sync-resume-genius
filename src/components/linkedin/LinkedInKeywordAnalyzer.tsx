
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Copy, RefreshCw, Lightbulb, TrendingUp, Search, Trash2, AlertCircle } from "lucide-react";
import { linkedInKeywordAnalysisSchema, type LinkedInKeywordAnalysis, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { getKeywordTrends } from "@/services/openaiServices";
import { toast } from "sonner";

interface LinkedInKeywordAnalyzerProps {
  profileData: LinkedInProfile | null;
  keywordAnalysisResults: any;
  onKeywordResultsUpdate: (results: any) => void;
}

export const LinkedInKeywordAnalyzer = ({ 
  profileData, 
  keywordAnalysisResults, 
  onKeywordResultsUpdate 
}: LinkedInKeywordAnalyzerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const form = useForm<LinkedInKeywordAnalysis>({
    resolver: zodResolver(linkedInKeywordAnalysisSchema),
    defaultValues: {
      targetRole: "",
      industry: profileData?.industry || "",
      jobDescription: "",
      currentProfile: profileData?.summary || "",
    },
  });

  const analyzeKeywords = async (data: LinkedInKeywordAnalysis, isRetry = false) => {
    if (!isRetry) {
      setRetryCount(0);
      setErrorDetails(null);
    }
    
    setIsAnalyzing(true);
    
    try {
      console.log('Starting keyword analysis...', data);
      const result = await getKeywordTrends(data);
      
      if (result && typeof result === 'object') {
        onKeywordResultsUpdate(result);
        toast.success("Keyword analysis completed successfully!");
        setRetryCount(0);
        setErrorDetails(null);
      } else {
        throw new Error('Invalid response format received');
      }
    } catch (error) {
      console.error('Error analyzing keywords:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorDetails(errorMessage);
      
      if (retryCount < 2) {
        const newRetryCount = retryCount + 1;
        setRetryCount(newRetryCount);
        toast.error(`Analysis failed (attempt ${newRetryCount}/3). Retrying...`);
        
        // Exponential backoff retry
        setTimeout(() => {
          analyzeKeywords(data, true);
        }, 1000 * newRetryCount);
      } else {
        toast.error("Failed to analyze keywords after 3 attempts. Please try again later.");
        setIsAnalyzing(false);
      }
    }
    
    if (retryCount >= 2) {
      setIsAnalyzing(false);
    }
  };

  const clearResults = () => {
    onKeywordResultsUpdate(null);
    setErrorDetails(null);
    setRetryCount(0);
    toast.success("Analysis results cleared successfully!");
  };

  const copyKeywords = (keywords: string[]) => {
    navigator.clipboard.writeText(keywords.join(", "));
    toast.success("Keywords copied to clipboard!");
  };

  const hasExistingResults = keywordAnalysisResults !== null;

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              AI LinkedIn Keyword Analyzer
              <Badge variant="secondary" className="flex items-center gap-1">
                <Search className="h-3 w-3" />
                Industry Intelligence
              </Badge>
            </div>
            {hasExistingResults && (
              <Button variant="outline" size="sm" onClick={clearResults}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Results
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {errorDetails && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-destructive">Analysis Error</p>
                <p className="text-muted-foreground">{errorDetails}</p>
                {retryCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Retry attempt {retryCount}/3 in progress...
                  </p>
                )}
              </div>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => analyzeKeywords(data))} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="targetRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Role *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Software Engineer, Marketing Manager"
                          {...field} 
                          className="glass-card"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Technology, Healthcare, Finance"
                          {...field} 
                          className="glass-card"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isAnalyzing} className="w-full">
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    {retryCount > 0 ? `Retrying Analysis (${retryCount}/3)...` : "AI Analyzing Keywords..."}
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    {hasExistingResults ? "Regenerate Analysis" : "Analyze Keywords with AI"}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {hasExistingResults && (
        <>
          {/* Current Keywords Performance */}
          {keywordAnalysisResults.currentKeywords && Object.keys(keywordAnalysisResults.currentKeywords).length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Current Keywords Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(keywordAnalysisResults.currentKeywords).map(([keyword, data]: [string, any]) => (
                  <div key={keyword} className="p-4 border rounded-lg glass-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{keyword}</span>
                      <Badge variant={data.strength >= 80 ? "default" : data.strength >= 60 ? "secondary" : "outline"}>
                        {data.strength}% strength
                      </Badge>
                    </div>
                    <Progress value={data.strength} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{data.context}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Missing Keywords */}
          {keywordAnalysisResults.missingKeywords && keywordAnalysisResults.missingKeywords.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Missing High-Impact Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywordAnalysisResults.missingKeywords.map((keyword: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg glass-card">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{keyword.keyword}</span>
                            <Badge variant={keyword.priority === "high" ? "destructive" : keyword.priority === "medium" ? "secondary" : "outline"}>
                              {keyword.priority} priority
                            </Badge>
                            <Badge variant="outline">{keyword.impact}% impact</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{keyword.reason}</p>
                          <p className="text-sm"><strong>Suggestion:</strong> {keyword.suggestion}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyKeywords([keyword.keyword])}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trending Keywords */}
          {keywordAnalysisResults.trendingKeywords && keywordAnalysisResults.trendingKeywords.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Industry Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywordAnalysisResults.trendingKeywords.map((trend: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg glass-card">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{trend.keyword}</span>
                            <Badge variant="default">+{trend.growth} growth</Badge>
                            <Badge variant="outline">{trend.searchVolume} searches</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{trend.context}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyKeywords([trend.keyword])}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Optimization Strategy */}
          {keywordAnalysisResults.optimizationStrategy && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  AI Optimization Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Headline Optimization</h5>
                    <p className="text-sm text-muted-foreground">{keywordAnalysisResults.optimizationStrategy.headline}</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Summary Optimization</h5>
                    <p className="text-sm text-muted-foreground">{keywordAnalysisResults.optimizationStrategy.summary}</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Skills Section</h5>
                    <p className="text-sm text-muted-foreground">{keywordAnalysisResults.optimizationStrategy.skills}</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Content Strategy</h5>
                    <p className="text-sm text-muted-foreground">{keywordAnalysisResults.optimizationStrategy.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
