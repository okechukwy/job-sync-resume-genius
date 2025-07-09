import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Lightbulb, Calendar, TrendingUp, Users } from "lucide-react";
import { linkedInContentSuggestionSchema, type LinkedInContentSuggestion as LinkedInContentSuggestionType, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { toast } from "sonner";

interface LinkedInContentSuggestionsProps {
  profileData: LinkedInProfile | null;
}

interface ContentIdea {
  title: string;
  description: string;
  type: string;
  engagement: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
}

export const LinkedInContentSuggestions = ({ profileData }: LinkedInContentSuggestionsProps) => {
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [contentCalendar, setContentCalendar] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

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
    setIsGenerating(true);
    
    // Simulate content generation - In a real app, this would call an AI API
    setTimeout(() => {
      const ideas = generateContentIdeas(data);
      const calendar = generateContentCalendar(data);
      setContentIdeas(ideas);
      setContentCalendar(calendar);
      setIsGenerating(false);
      toast.success("Content suggestions generated!");
    }, 1500);
  };

  const generateContentIdeas = (data: LinkedInContentSuggestionType) => {
    const templates = getContentTemplates(data);
    return templates.map(template => ({
      ...template,
      description: template.description.replace('{industry}', data.industry),
    }));
  };

  const generateContentCalendar = (data: LinkedInContentSuggestionType) => {
    const frequencies = {
      daily: 7,
      weekly: 4,
      biweekly: 2,
      monthly: 1,
    };

    const postsPerMonth = frequencies[data.frequency];
    const calendar = [];

    for (let week = 1; week <= 4; week++) {
      if (postsPerMonth >= week || data.frequency === 'daily') {
        calendar.push({
          week,
          contentType: data.contentType,
          topic: `Week ${week} ${data.contentType} post`,
          status: 'planned',
        });
      }
    }

    return calendar;
  };

  const getContentTemplates = (data: LinkedInContentSuggestionType) => {
    const templates = {
      'thought-leadership': [
        {
          title: "Industry Trends Analysis",
          description: "Share your insights on emerging trends in {industry} and how they'll impact the future",
          type: "Analysis",
          engagement: "high" as const,
          difficulty: "medium" as const,
        },
        {
          title: "Lessons Learned Post",
          description: "Share a valuable lesson you learned recently and how it applies to {industry}",
          type: "Educational",
          engagement: "high" as const,
          difficulty: "easy" as const,
        },
        {
          title: "Controversial Opinion",
          description: "Share a well-reasoned contrarian view about common practices in {industry}",
          type: "Opinion",
          engagement: "high" as const,
          difficulty: "hard" as const,
        },
      ],
      'industry-news': [
        {
          title: "News Commentary",
          description: "Comment on recent {industry} news and provide your expert perspective",
          type: "Commentary",
          engagement: "medium" as const,
          difficulty: "easy" as const,
        },
        {
          title: "Market Update",
          description: "Share insights about recent market changes affecting {industry}",
          type: "Update",
          engagement: "medium" as const,
          difficulty: "medium" as const,
        },
      ],
      'career-tips': [
        {
          title: "Career Advice",
          description: "Share actionable advice for professionals looking to advance in {industry}",
          type: "Advice",
          engagement: "high" as const,
          difficulty: "easy" as const,
        },
        {
          title: "Skill Development",
          description: "Discuss essential skills for success in {industry} and how to develop them",
          type: "Educational",
          engagement: "medium" as const,
          difficulty: "medium" as const,
        },
      ],
      'company-updates': [
        {
          title: "Behind the Scenes",
          description: "Share what you're working on and the challenges you're solving",
          type: "Personal",
          engagement: "medium" as const,
          difficulty: "easy" as const,
        },
        {
          title: "Team Spotlight",
          description: "Highlight team achievements and collaborative efforts in {industry} projects",
          type: "Team",
          engagement: "medium" as const,
          difficulty: "easy" as const,
        },
      ],
      'achievements': [
        {
          title: "Project Success Story",
          description: "Share a recent win and the process that led to success in your {industry} work",
          type: "Success",
          engagement: "high" as const,
          difficulty: "medium" as const,
        },
        {
          title: "Milestone Celebration",
          description: "Celebrate professional milestones and thank those who helped along the way",
          type: "Personal",
          engagement: "medium" as const,
          difficulty: "easy" as const,
        },
      ],
    };

    return templates[data.contentType] || templates['thought-leadership'];
  };

  const copyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Content idea copied to clipboard!");
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

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            LinkedIn Content Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
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

              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating Content Ideas...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate Content Ideas
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results */}
      {contentIdeas.length > 0 && (
        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="ideas" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Content Ideas
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Content Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ideas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentIdeas.map((idea, index) => (
                <Card key={index} className="glass-card">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-lg">{idea.title}</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyContent(`${idea.title}\n\n${idea.description}`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{idea.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{idea.type}</Badge>
                      <Badge className={getEngagementColor(idea.engagement)}>
                        {idea.engagement} engagement
                      </Badge>
                      <Badge className={getDifficultyColor(idea.difficulty)}>
                        {idea.difficulty} difficulty
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                <div className="space-y-4">
                  {contentCalendar.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium">{item.topic}</h4>
                        <p className="text-sm text-muted-foreground">Week {item.week}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.contentType}</Badge>
                        <Badge variant="secondary">{item.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};