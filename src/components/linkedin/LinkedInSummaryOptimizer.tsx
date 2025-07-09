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
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, FileText, Plus, X } from "lucide-react";
import { linkedInSummaryOptimizerSchema, type LinkedInSummaryOptimizer as LinkedInSummaryOptimizerType, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { toast } from "sonner";

interface LinkedInSummaryOptimizerProps {
  profileData: LinkedInProfile | null;
}

export const LinkedInSummaryOptimizer = ({ profileData }: LinkedInSummaryOptimizerProps) => {
  const [optimizedSummaries, setOptimizedSummaries] = useState<string[]>([]);
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
    
    // Simulate summary optimization - In a real app, this would call an AI API
    const templates = getSummaryTemplates(data);
    
    setTimeout(() => {
      setOptimizedSummaries(templates);
      setIsOptimizing(false);
      toast.success("Summaries optimized successfully!");
    }, 2000);
  };

  const copyToClipboard = (summary: string) => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };

  const getSummaryTemplates = (data: LinkedInSummaryOptimizerType) => {
    const { tone, targetRole, industry, achievements, skills, includeCallToAction } = data;
    
    const skillsText = skills.slice(0, 5).join(", ");
    const achievementsText = achievements.slice(0, 3).map(a => `• ${a}`).join("\n");
    const cta = includeCallToAction ? "\n\nLet's connect and explore how I can contribute to your team's success!" : "";

    const templates = {
      professional: [
        `Results-driven ${targetRole} with expertise in ${skillsText}. Passionate about delivering excellence in ${industry} and driving meaningful impact through innovative solutions.\n\n${achievementsText}\n\nCommitted to continuous learning and professional growth in the evolving ${industry} landscape.${cta}`,
        `Experienced ${targetRole} specializing in ${skillsText}. Proven track record of success in ${industry} with a focus on strategic thinking and execution.\n\n${achievementsText}\n\nDedicated to building strong relationships and delivering value that exceeds expectations.${cta}`,
      ],
      conversational: [
        `Hi! I'm a passionate ${targetRole} who loves working with ${skillsText}. I've been making waves in ${industry} by focusing on what really matters - delivering results that make a difference.\n\n${achievementsText}\n\nI believe in the power of collaboration and am always excited to connect with like-minded professionals.${cta}`,
        `Welcome to my profile! As a ${targetRole}, I bring together ${skillsText} to create meaningful impact in ${industry}. My journey has been all about turning challenges into opportunities.\n\n${achievementsText}\n\nI'm always open to new connections and conversations about the future of ${industry}.${cta}`,
      ],
      authoritative: [
        `Senior ${targetRole} with deep expertise in ${skillsText}. Leading innovation and transformation in ${industry} through strategic vision and execution excellence.\n\n${achievementsText}\n\nRecognized thought leader driving industry best practices and setting new standards for performance.${cta}`,
        `Accomplished ${targetRole} with proven leadership in ${skillsText}. Transforming ${industry} operations through data-driven decision making and strategic implementation.\n\n${achievementsText}\n\nCommitted to mentoring the next generation of professionals and advancing industry standards.${cta}`,
      ],
      creative: [
        `🚀 Creative ${targetRole} who brings fresh perspectives to ${skillsText}. Passionate about pushing boundaries in ${industry} and creating experiences that inspire.\n\n${achievementsText}\n\n✨ Always exploring new ways to blend creativity with strategy to deliver extraordinary results.${cta}`,
        `💡 Innovative ${targetRole} with a flair for ${skillsText}. Transforming the ${industry} landscape one creative solution at a time.\n\n${achievementsText}\n\n🌟 Believer in the magic that happens when creativity meets purpose.${cta}`,
      ],
    };

    return templates[tone] || templates.professional;
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            LinkedIn Summary Optimizer
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
                        placeholder="Paste your current LinkedIn summary here for optimization..."
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
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Writing Tone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass-card">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="authoritative">Authoritative</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                      </SelectContent>
                    </Select>
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
                    placeholder="Add a key achievement..."
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isOptimizing} className="w-full">
                {isOptimizing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing Summary...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Optimize Summary
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Optimized Summaries */}
      {optimizedSummaries.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Optimized Summaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {optimizedSummaries.map((summary, index) => (
                <div key={index} className="p-4 border rounded-lg glass-card">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Badge variant="outline">Version {index + 1}</Badge>
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