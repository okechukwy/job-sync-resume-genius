
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, TrendingUp, Target, Lightbulb, RefreshCw } from "lucide-react";
import { z } from "zod";
import { getKeywordTrends, type KeywordTrendsResult, type LinkedInData } from "@/services/openaiServices";
import { toast } from "sonner";

const keywordAnalyzerSchema = z.object({
  targetRole: z.string().min(1, "Target role is required"),
  industry: z.string().min(1, "Industry is required"),
  location: z.string().optional(),
  currentSkills: z.string().optional(),
});

type KeywordAnalyzerForm = z.infer<typeof keywordAnalyzerSchema>;

interface LinkedInKeywordAnalyzerProps {
  profileData: any;
}

export const LinkedInKeywordAnalyzer = ({ profileData }: LinkedInKeywordAnalyzerProps) => {
  const [keywordData, setKeywordData] = useState<KeywordTrendsResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<KeywordAnalyzerForm>({
    resolver: zodResolver(keywordAnalyzerSchema),
    defaultValues: {
      targetRole: profileData?.headline?.split('|')[0]?.trim() || "",
      industry: profileData?.industry || "",
      location: profileData?.location || "",
      currentSkills: profileData?.skills?.join(', ') || "",
    },
  });

  const analyzeKeywords = async (data: KeywordAnalyzerForm) => {
    setIsAnalyzing(true);
    
    try {
      const linkedInData: LinkedInData = {
        targetRole: data.targetRole,
        industry: data.industry,
        location: data.location,
        skills: data.currentSkills ? data.currentSkills.split(',').map(s => s.trim()) : [],
      };

      const result = await getKeywordTrends(linkedInData);
      setKeywordData(result);
      toast.success("Keyword analysis completed successfully!");
    } catch (error) {
      console.error('Error analyzing keywords:', error);
      toast.error("Failed to analyze keywords. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getKeywordScore = (keyword: string) => {
    // Simple scoring based on keyword characteristics
    if (keywordData?.primaryKeywords.includes(keyword)) return 90;
    if (keywordData?.trendingTerms.includes(keyword)) return 85;
    if (keywordData?.longTailKeywords.includes(keyword)) return 75;
    return 60;
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            AI Keyword Trend Analysis
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Live Market Data
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(analyzeKeywords)} className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., San Francisco, Remote, Global"
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
                  name="currentSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Skills</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Comma-separated list of your skills"
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
                    Analyzing Market Trends...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Keywords & Trends
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Keyword Analysis Results */}
      {keywordData && (
        <div className="space-y-6">
          {/* Primary Keywords */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                High-Impact Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {keywordData.primaryKeywords.map((keyword, index) => (
                    <div key={index} className="p-3 border rounded-lg glass-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{keyword}</span>
                        <Badge variant="default">High Priority</Badge>
                      </div>
                      <Progress value={getKeywordScore(keyword)} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        Market Demand: {getKeywordScore(keyword)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Terms */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Terms ({new Date().getFullYear()})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {keywordData.trendingTerms.map((term, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {term}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Long-tail Keywords */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Long-tail Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {keywordData.longTailKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded glass-card">
                    <span className="text-sm">{keyword}</span>
                    <Badge variant="outline">Low Competition</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Optimization Strategy */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>AI Optimization Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Immediate Actions</h4>
                  <div className="space-y-1">
                    {keywordData.optimizationStrategy.immediate.map((action, index) => (
                      <Alert key={index}>
                        <AlertDescription className="text-sm">{action}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Quarterly Strategy</h4>
                  <div className="space-y-1">
                    {keywordData.optimizationStrategy.quarterly.map((strategy, index) => (
                      <Alert key={index}>
                        <AlertDescription className="text-sm">{strategy}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Annual Planning</h4>
                  <div className="space-y-1">
                    {keywordData.optimizationStrategy.annual.map((plan, index) => (
                      <Alert key={index}>
                        <AlertDescription className="text-sm">{plan}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
