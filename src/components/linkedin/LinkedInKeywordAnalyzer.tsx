import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, TrendingUp, Target, AlertCircle } from "lucide-react";
import { linkedInKeywordAnalysisSchema, type LinkedInKeywordAnalysis as LinkedInKeywordAnalysisType, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { toast } from "sonner";

interface LinkedInKeywordAnalyzerProps {
  profileData: LinkedInProfile | null;
}

interface KeywordData {
  keyword: string;
  frequency: number;
  importance: "high" | "medium" | "low";
  category: "technical" | "soft" | "industry" | "role";
}

export const LinkedInKeywordAnalyzer = ({ profileData }: LinkedInKeywordAnalyzerProps) => {
  const [keywordAnalysis, setKeywordAnalysis] = useState<{
    extractedKeywords: KeywordData[];
    suggestions: string[];
    optimizationScore: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<LinkedInKeywordAnalysisType>({
    resolver: zodResolver(linkedInKeywordAnalysisSchema),
    defaultValues: {
      jobDescription: "",
      targetRole: "",
      industry: profileData?.industry || "",
      currentProfile: profileData?.summary || "",
    },
  });

  const analyzeKeywords = async (data: LinkedInKeywordAnalysisType) => {
    setIsAnalyzing(true);
    
    // Simulate keyword analysis - In a real app, this would call an AI API
    setTimeout(() => {
      const analysis = performKeywordAnalysis(data);
      setKeywordAnalysis(analysis);
      setIsAnalyzing(false);
      toast.success("Keyword analysis completed!");
    }, 1500);
  };

  const performKeywordAnalysis = (data: LinkedInKeywordAnalysisType) => {
    // Mock keyword extraction and analysis
    const industryKeywords = getIndustryKeywords(data.industry);
    const roleKeywords = getRoleKeywords(data.targetRole);
    const extractedKeywords = extractKeywordsFromText(data.jobDescription);
    
    const allKeywords = [...industryKeywords, ...roleKeywords, ...extractedKeywords];
    const currentProfileKeywords = extractKeywordsFromText(data.currentProfile || "");
    
    // Calculate optimization score
    const matchingKeywords = allKeywords.filter(keyword =>
      currentProfileKeywords.some(current => current.keyword.toLowerCase() === keyword.keyword.toLowerCase())
    );
    
    const optimizationScore = Math.round((matchingKeywords.length / allKeywords.length) * 100);
    
    // Generate suggestions
    const missingKeywords = allKeywords.filter(keyword =>
      !currentProfileKeywords.some(current => current.keyword.toLowerCase() === keyword.keyword.toLowerCase())
    );
    
    const suggestions = generateOptimizationSuggestions(missingKeywords, optimizationScore);

    return {
      extractedKeywords: allKeywords,
      suggestions,
      optimizationScore,
    };
  };

  const extractKeywordsFromText = (text: string): KeywordData[] => {
    if (!text) return [];
    
    // Simple keyword extraction - in reality this would be more sophisticated
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount: { [key: string]: number } = {};
    
    words.forEach(word => {
      if (word.length > 3) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    return Object.entries(wordCount)
      .filter(([_, count]) => count > 1)
      .map(([word, count]) => ({
        keyword: word,
        frequency: count,
        importance: (count > 3 ? "high" : count > 2 ? "medium" : "low") as "high" | "medium" | "low",
        category: "technical" as const,
      }))
      .slice(0, 10);
  };

  const getIndustryKeywords = (industry: string): KeywordData[] => {
    const keywordMap: { [key: string]: string[] } = {
      "Technology": ["software development", "programming", "coding", "algorithms", "databases", "cloud computing", "API", "debugging", "testing"],
      "Finance": ["financial analysis", "risk management", "investment", "portfolio", "budgeting", "forecasting", "compliance", "auditing"],
      "Healthcare": ["patient care", "medical procedures", "healthcare", "clinical", "diagnosis", "treatment", "medical records", "safety protocols"],
      "Marketing": ["digital marketing", "campaign management", "analytics", "SEO", "content marketing", "social media", "brand management", "lead generation"],
      "Sales": ["sales strategy", "customer acquisition", "relationship building", "negotiation", "CRM", "revenue growth", "pipeline management", "closing deals"],
    };

    const keywords = keywordMap[industry] || [];
    return keywords.map(keyword => ({
      keyword,
      frequency: 1,
      importance: "high" as const,
      category: "industry" as const,
    }));
  };

  const getRoleKeywords = (role: string): KeywordData[] => {
    const commonRoleKeywords = [
      "leadership", "teamwork", "communication", "problem solving", "project management",
      "strategic thinking", "analytical skills", "collaboration", "innovation", "efficiency"
    ];

    return commonRoleKeywords.map(keyword => ({
      keyword,
      frequency: 1,
      importance: "medium" as const,
      category: "soft" as const,
    }));
  };

  const generateOptimizationSuggestions = (missingKeywords: KeywordData[], score: number): string[] => {
    const suggestions = [];

    if (score < 30) {
      suggestions.push("Your profile lacks key industry keywords. Consider adding more relevant technical terms.");
    }
    if (score < 50) {
      suggestions.push("Include more role-specific keywords in your headline and summary.");
    }
    if (score < 70) {
      suggestions.push("Add soft skills keywords that are commonly searched by recruiters.");
    }

    const highImportanceKeywords = missingKeywords.filter(k => k.importance === "high").slice(0, 3);
    if (highImportanceKeywords.length > 0) {
      suggestions.push(`Consider adding these high-value keywords: ${highImportanceKeywords.map(k => k.keyword).join(", ")}`);
    }

    return suggestions;
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technical": return "💻";
      case "soft": return "🤝";
      case "industry": return "🏢";
      case "role": return "👤";
      default: return "📝";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            LinkedIn Keyword Analyzer
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Paste a job description to extract relevant keywords..."
                        className="min-h-32 glass-card"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Profile Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Paste your current LinkedIn headline and summary for analysis..."
                        className="min-h-24 glass-card"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isAnalyzing} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Search className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Keywords...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Keywords
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {keywordAnalysis && (
        <div className="space-y-6">
          {/* Optimization Score */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Keyword Optimization Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Progress value={keywordAnalysis.optimizationScore} className="flex-1" />
                <div className="text-2xl font-bold">{keywordAnalysis.optimizationScore}%</div>
              </div>
              <Badge variant={keywordAnalysis.optimizationScore >= 70 ? "default" : keywordAnalysis.optimizationScore >= 40 ? "secondary" : "destructive"}>
                {keywordAnalysis.optimizationScore >= 70 ? "Well Optimized" : keywordAnalysis.optimizationScore >= 40 ? "Needs Improvement" : "Poor Optimization"}
              </Badge>
            </CardContent>
          </Card>

          {/* Keywords Analysis */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Relevant Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {keywordAnalysis.extractedKeywords.map((keyword, index) => (
                  <div key={index} className="p-3 border rounded-lg glass-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{getCategoryIcon(keyword.category)} {keyword.keyword}</span>
                      <div className={`w-2 h-2 rounded-full ${getImportanceColor(keyword.importance)}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {keyword.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {keyword.importance}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          {keywordAnalysis.suggestions.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Optimization Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {keywordAnalysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg glass-card">
                      <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};