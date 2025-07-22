
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, FileText, Plus, X, TrendingUp, Trash2 } from "lucide-react";
import { linkedInSummaryOptimizerSchema, type LinkedInSummaryOptimizer as LinkedInSummaryOptimizerType, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { generateLinkedInContent } from "@/services/openaiServices";
import { toast } from "sonner";

interface LinkedInSummaryOptimizerProps {
  profileData: LinkedInProfile | null;
  generatedSummaries: string[];
  onSummariesUpdate: (summaries: string[]) => void;
}

export const LinkedInSummaryOptimizer = ({ 
  profileData, 
  generatedSummaries, 
  onSummariesUpdate 
}: LinkedInSummaryOptimizerProps) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState("");

  const form = useForm<LinkedInSummaryOptimizerType>({
    resolver: zodResolver(linkedInSummaryOptimizerSchema),
    defaultValues: {
      currentSummary: profileData?.summary || "",
      targetRole: "",
      industry: profileData?.industry || "",
      achievements: [],
      skills: profileData?.skills || [],
      tone: "professional",
      includeCallToAction: true,
    },
  });

  const addAchievement = () => {
    if (newAchievement.trim() && !achievements.includes(newAchievement.trim())) {
      const updated = [...achievements, newAchievement.trim()];
      setAchievements(updated);
      form.setValue("achievements", updated);
      setNewAchievement("");
    }
  };

  const removeAchievement = (achievement: string) => {
    const updated = achievements.filter(a => a !== achievement);
    setAchievements(updated);
    form.setValue("achievements", updated);
  };

  const optimizeSummary = async (data: LinkedInSummaryOptimizerType) => {
    setIsOptimizing(true);
    
    try {
      const result = await generateLinkedInContent('summary', {
        targetRole: data.targetRole,
        industry: data.industry,
        achievements: data.achievements,
        skills: data.skills,
        tone: data.tone,
        summary: data.currentSummary,
        includeCallToAction: data.includeCallToAction,
      });
      
      if (typeof result.content === 'string') {
        onSummariesUpdate([result.content]);
      } else if (Array.isArray(result.content)) {
        onSummariesUpdate(result.content);
      } else {
        onSummariesUpdate([String(result.content)]);
      }
      
      toast.success("AI-optimized summary generated successfully!");
    } catch (error) {
      console.error('Error optimizing summary:', error);
      toast.error("Failed to optimize summary. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const clearSummaries = () => {
    onSummariesUpdate([]);
    toast.success("Summaries cleared successfully!");
  };

  const copyToClipboard = (summary: string) => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };

  const hasExistingSummaries = generatedSummaries.length > 0;

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              AI-Powered LinkedIn Summary Optimizer
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Live AI Analysis
              </Badge>
            </div>
            {hasExistingSummaries && (
              <Button variant="outline" size="sm" onClick={clearSummaries}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Results
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(optimizeSummary)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Summary (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Paste your current LinkedIn summary here for AI optimization..."
                        className="min-h-32 glass-card"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="targetRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Role *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Product Manager, Data Scientist"
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

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Writing Tone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., professional, conversational, authoritative, creative"
                        {...field} 
                        className="glass-card"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Achievements Section */}
              <div className="space-y-4">
                <FormLabel>Key Achievements</FormLabel>
                <div className="flex gap-2">
                  <Input
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add a key achievement with metrics..."
                    className="glass-card"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                  />
                  <Button type="button" onClick={addAchievement} size="icon" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {achievements.length > 0 && (
                  <div className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded glass-card">
                        <span className="flex-1 text-sm">{achievement}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAchievement(achievement)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="includeCallToAction"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 glass-card">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Include Call-to-Action</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Add a call-to-action to encourage connections
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isOptimizing} className="w-full">
                {isOptimizing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    AI Optimizing Summary...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    {hasExistingSummaries ? "Regenerate AI Summary" : "Generate AI Summary"}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Optimized Summaries */}
      {hasExistingSummaries && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              AI-Optimized Summaries
              <Badge variant="outline">Industry Trends Applied</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {generatedSummaries.map((summary, index) => (
                <div key={index} className="p-4 border rounded-lg glass-card">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Badge variant="outline">AI Optimized Version {index + 1}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(summary)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="whitespace-pre-wrap text-sm">{summary}</div>
                  <div className="flex items-center gap-2 mt-4">
                    <Badge variant="outline">{summary.length} characters</Badge>
                    <Badge variant={summary.length <= 2600 ? "default" : "destructive"}>
                      {summary.length <= 2600 ? "Perfect Length" : "Too Long"}
                    </Badge>
                    {(summary.includes("📧") || summary.includes("connect")) && (
                      <Badge variant="secondary">CTA Included</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
