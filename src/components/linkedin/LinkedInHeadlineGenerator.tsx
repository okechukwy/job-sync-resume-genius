import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Sparkles } from "lucide-react";
import { linkedInHeadlineGeneratorSchema, type LinkedInHeadlineGenerator as LinkedInHeadlineGeneratorType, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { toast } from "sonner";

interface LinkedInHeadlineGeneratorProps {
  profileData: LinkedInProfile | null;
}

export const LinkedInHeadlineGenerator = ({ profileData }: LinkedInHeadlineGeneratorProps) => {
  const [generatedHeadlines, setGeneratedHeadlines] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<LinkedInHeadlineGeneratorType>({
    resolver: zodResolver(linkedInHeadlineGeneratorSchema),
    defaultValues: {
      targetRole: profileData?.headline?.split('|')[0]?.trim() || "",
      industry: profileData?.industry || "",
      keySkills: profileData?.skills?.slice(0, 3) || [],
      experienceLevel: "mid",
      tone: "professional",
    },
  });

  const generateHeadlines = async (data: LinkedInHeadlineGeneratorType) => {
    setIsGenerating(true);
    
    // Simulate headline generation - In a real app, this would call an AI API
    const templates = getHeadlineTemplates(data);
    const headlines = templates.map(template => 
      template
        .replace('{role}', data.targetRole)
        .replace('{skills}', data.keySkills.slice(0, 2).join(' & '))
        .replace('{industry}', data.industry)
    );
    
    setTimeout(() => {
      setGeneratedHeadlines(headlines);
      setIsGenerating(false);
      toast.success("Headlines generated successfully!");
    }, 1500);
  };

  const copyToClipboard = (headline: string) => {
    navigator.clipboard.writeText(headline);
    toast.success("Headline copied to clipboard!");
  };

  const getHeadlineTemplates = (data: LinkedInHeadlineGeneratorType) => {
    const { tone, experienceLevel } = data;
    
    const templates = {
      professional: [
        "{role} | {skills} Expert | Driving Results in {industry}",
        "Experienced {role} | {skills} Specialist | {industry} Professional",
        "{role} | {skills} Leader | Transforming {industry} Operations",
        "Senior {role} | {skills} Expert | Building Scalable {industry} Solutions",
        "{role} Professional | {skills} & Strategy | {industry} Innovation",
      ],
      creative: [
        "🚀 {role} | {skills} Innovator | Revolutionizing {industry}",
        "✨ Creative {role} | {skills} Enthusiast | {industry} Storyteller",
        "🎯 {role} | {skills} Strategist | Crafting {industry} Experiences",
        "💡 Visionary {role} | {skills} Expert | {industry} Game-Changer",
        "🌟 {role} | {skills} Pioneer | Shaping the Future of {industry}",
      ],
      technical: [
        "{role} | {skills} & System Architecture | {industry} Tech Lead",
        "Technical {role} | {skills} Development | {industry} Engineering",
        "{role} | {skills} & Cloud Solutions | {industry} Infrastructure",
        "Senior {role} | {skills} & DevOps | {industry} Technology",
        "{role} | {skills} & Machine Learning | {industry} Innovation",
      ],
      leadership: [
        "{role} Leader | {skills} Strategy | Transforming {industry} Teams",
        "Executive {role} | {skills} & Leadership | {industry} Growth",
        "{role} Director | {skills} Operations | {industry} Excellence",
        "VP of {role} | {skills} & Strategy | {industry} Innovation Leader",
        "Chief {role} | {skills} Visionary | {industry} Transformation",
      ],
    };

    return templates[tone] || templates.professional;
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            LinkedIn Headline Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(generateHeadlines)} className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="mid">Mid Level (3-7 years)</SelectItem>
                          <SelectItem value="senior">Senior Level (8-15 years)</SelectItem>
                          <SelectItem value="executive">Executive (15+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tone & Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-card">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="leadership">Leadership</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="keySkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Skills (3-5 most important)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your top skills separated by commas (e.g., React, Node.js, Leadership, Project Management)"
                        {...field}
                        value={field.value?.join(', ') || ''}
                        onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        className="glass-card"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating Headlines...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Headlines
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Generated Headlines */}
      {generatedHeadlines.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Generated Headlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedHeadlines.map((headline, index) => (
                <div key={index} className="p-4 border rounded-lg glass-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{headline}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{headline.length} characters</Badge>
                        <Badge variant={headline.length <= 120 ? "default" : "destructive"}>
                          {headline.length <= 120 ? "Perfect Length" : "Too Long"}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(headline)}
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
    </div>
  );
};