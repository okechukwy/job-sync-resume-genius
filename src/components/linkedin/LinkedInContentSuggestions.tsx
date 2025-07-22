
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Lightbulb, Calendar, TrendingUp, Users, Trash2, Clock, AlertTriangle } from "lucide-react";
import { linkedInContentSuggestionSchema, type LinkedInContentSuggestion as LinkedInContentSuggestionType, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { generateContentSuggestions, type ContentSuggestionsResult, type ContentIdea } from "@/services/openaiServices";
import { toast } from "sonner";

interface LinkedInContentSuggestionsProps {
  profileData: LinkedInProfile | null;
  contentSuggestions: ContentSuggestionsResult | null;
  onContentSuggestionsUpdate: (suggestions: ContentSuggestionsResult | null) => void;
}

export const LinkedInContentSuggestions = ({ 
  profileData, 
  contentSuggestions, 
  onContentSuggestionsUpdate 
}: LinkedInContentSuggestionsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LinkedInContentSuggestionType>({
    resolver: zodResolver(linkedInContentSuggestionSchema),
    defaultValues: {
      industry: profileData?.industry || "",
      experienceLevel: "mid",
      contentType: "thought-leadership",
      frequency: "weekly",
      topics: [],
    },
  });

  const generateContent = async (data: LinkedInContentSuggestionType) => {
    if (!profileData) {
      toast.error("Please complete your profile information first");
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      // Extract current role from experience data
      const currentRole = profileData.experience?.[0]?.title || "";
      const targetRole = currentRole; // Use current role as target role
      
      // Extract achievements from experience descriptions
      const achievements = profileData.experience?.map(exp => exp.description).filter(Boolean) || [];
      
      // Convert experience objects to strings for AI processing
      const experienceStrings = profileData.experience?.map(exp => 
        `${exp.title} at ${exp.company}: ${exp.description || ''}`
      ) || [];

      // Prepare enriched data for AI generation
      const enrichedData = {
        name: profileData.headline?.split('|')[0]?.trim() || "Professional",
        headline: profileData.headline,
        summary: profileData.summary,
        industry: profileData.industry,
        experience: experienceStrings,
        skills: profileData.skills || [],
        achievements: achievements,
        currentRole: currentRole,
        targetRole: targetRole,
        contentType: data.contentType,
        frequency: data.frequency,
        experienceLevel: data.experienceLevel,
        topics: data.topics,
      };

      console.log('Generating content suggestions with data:', enrichedData);
      
      const result = await generateContentSuggestions(enrichedData);
      console.log('Generated content suggestions:', result);
      
      // Validate the result structure
      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response structure from content generation');
      }

      // Ensure all required fields exist
      const validatedResult = {
        ideas: Array.isArray(result.ideas) ? result.ideas : [],
        calendar: Array.isArray(result.calendar) ? result.calendar : [],
        strategy: result.strategy || {
          postingFrequency: 'Weekly posting recommended',
          bestTimes: ['Tuesday 10:00 AM', 'Wednesday 11:00 AM'],
          contentMix: { 'thought-leadership': 40, 'industry-insights': 30, 'career-tips': 30 },
          trendingTopics: ['Digital Transformation', 'Remote Work', 'AI Innovation']
        }
      };
      
      onContentSuggestionsUpdate(validatedResult);
      toast.success("Content suggestions generated successfully!");
    } catch (error) {
      console.error('Error generating content suggestions:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate content suggestions';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearSuggestions = () => {
    onContentSuggestionsUpdate(null);
    setError(null);
    toast.success("Content suggestions cleared successfully!");
  };

  const copyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard!");
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "high": return "text-green-600 border-green-200 bg-green-50";
      case "medium": return "text-yellow-600 border-yellow-200 bg-yellow-50";
      case "low": return "text-gray-600 border-gray-200 bg-gray-50";
      default: return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-600 border-green-200 bg-green-50";
      case "medium": return "text-yellow-600 border-yellow-200 bg-yellow-50";
      case "hard": return "text-red-600 border-red-200 bg-red-50";
      default: return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  const hasExistingSuggestions = contentSuggestions !== null;

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              LinkedIn Content Suggestions
            </div>
            {hasExistingSuggestions && (
              <Button variant="outline" size="sm" onClick={clearSuggestions}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Results
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Generation Error</h4>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <p className="text-xs text-red-600 mt-2">Please try again or contact support if the issue persists.</p>
              </div>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(generateContent)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="thought-leadership">Thought Leadership</SelectItem>
                          <SelectItem value="industry-news">Industry News</SelectItem>
                          <SelectItem value="career-tips">Career Tips</SelectItem>
                          <SelectItem value="company-updates">Company Updates</SelectItem>
                          <SelectItem value="achievements">Achievements</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Posting Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isGenerating || !profileData} className="w-full">
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating AI-Powered Content Ideas...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {hasExistingSuggestions ? "Regenerate Content Ideas" : "Generate AI Content Ideas"}
                  </>
                )}
              </Button>
              
              {!profileData && (
                <p className="text-sm text-muted-foreground text-center">
                  Please complete your profile information in the Profile tab first.
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results */}
      {hasExistingSuggestions && (
        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="ideas" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Content Ideas ({contentSuggestions.ideas?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Content Calendar ({contentSuggestions.calendar?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Strategy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ideas">
            {contentSuggestions.ideas && contentSuggestions.ideas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentSuggestions.ideas.map((idea: ContentIdea, index: number) => (
                  <Card key={index} className="glass-card">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyContent(`${idea.title}\n\n${idea.content}\n\n${idea.hashtags?.join(' ') || ''}`)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{idea.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">{idea.contentType}</Badge>
                        <Badge className={getEngagementColor(idea.engagement)}>
                          {idea.engagement} engagement
                        </Badge>
                        <Badge className={getDifficultyColor(idea.difficulty)}>
                          {idea.difficulty} difficulty
                        </Badge>
                      </div>
                      {idea.hashtags && idea.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {idea.hashtags.map((hashtag, hashIndex) => (
                            <Badge key={hashIndex} variant="secondary" className="text-xs">
                              {hashtag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {idea.engagementStrategy && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">
                            <strong>Engagement Strategy:</strong> {idea.engagementStrategy}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-8">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No content ideas available. Please generate content suggestions first.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Monthly Content Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contentSuggestions.calendar && contentSuggestions.calendar.length > 0 ? (
                  <div className="space-y-4">
                    {contentSuggestions.calendar.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg glass-card">
                        <div>
                          <h4 className="font-medium">{item.topic}</h4>
                          <p className="text-sm text-muted-foreground">Week {item.week}</p>
                          {item.optimalTiming && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {item.optimalTiming}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.contentType}</Badge>
                          <Badge variant="secondary">{item.status}</Badge>
                          {item.expectedEngagement && (
                            <Badge className={getEngagementColor(item.expectedEngagement)}>
                              {item.expectedEngagement}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No calendar data available. Please generate content suggestions first.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Content Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Posting Frequency</h4>
                      <p className="text-sm text-muted-foreground">{contentSuggestions.strategy?.postingFrequency || 'Weekly posting recommended'}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Best Posting Times</h4>
                      <div className="flex flex-wrap gap-2">
                        {(contentSuggestions.strategy?.bestTimes || ['Tuesday 10:00 AM', 'Wednesday 11:00 AM']).map((time, index) => (
                          <Badge key={index} variant="outline">{time}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Content Mix</h4>
                      <div className="space-y-2">
                        {contentSuggestions.strategy?.contentMix && Object.entries(contentSuggestions.strategy.contentMix).map(([type, percentage]) => (
                          <div key={type} className="flex justify-between text-sm">
                            <span className="capitalize">{type.replace('-', ' ')}</span>
                            <span>{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(contentSuggestions.strategy?.trendingTopics || ['Digital Transformation', 'Remote Work', 'AI Innovation']).map((topic, index) => (
                      <Badge key={index} variant="secondary">{topic}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
