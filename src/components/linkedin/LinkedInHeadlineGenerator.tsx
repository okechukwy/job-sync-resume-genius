
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
import { Copy, RefreshCw, Sparkles, TrendingUp, Trash2 } from "lucide-react";
import { linkedInHeadlineGeneratorSchema, type LinkedInHeadlineGenerator as LinkedInHeadlineGeneratorType, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { generateLinkedInContent } from "@/services/openaiServices";
import { toast } from "sonner";

interface LinkedInHeadlineGeneratorProps {
  profileData: LinkedInProfile | null;
  generatedHeadlines: string[];
  onHeadlinesUpdate: (headlines: string[]) => void;
}

export const LinkedInHeadlineGenerator = ({ 
  profileData, 
  generatedHeadlines, 
  onHeadlinesUpdate 
}: LinkedInHeadlineGeneratorProps) => {
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
    
    try {
      const result = await generateLinkedInContent('headline', {
        targetRole: data.targetRole,
        industry: data.industry,
        skills: data.keySkills,
        experienceLevel: data.experienceLevel,
        tone: data.tone,
      });
      
      if (Array.isArray(result.content)) {
        onHeadlinesUpdate(result.content);
        toast.success("AI-powered headlines generated successfully!");
      } else {
        onHeadlinesUpdate([result.content as string]);
        toast.success("Headlines generated successfully!");
      }
    } catch (error) {
      console.error('Error generating headlines:', error);
      toast.error("Failed to generate headlines. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearHeadlines = () => {
    onHeadlinesUpdate([]);
    toast.success("Headlines cleared successfully!");
  };

  const copyToClipboard = (headline: string) => {
    navigator.clipboard.writeText(headline);
    toast.success("Headline copied to clipboard!");
  };

  const hasExistingHeadlines = generatedHeadlines.length > 0;

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI-Powered LinkedIn Headline Generator
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Live AI Analysis
              </Badge>
            </div>
            {hasExistingHeadlines && (
              <Button variant="outline" size="sm" onClick={clearHeadlines}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Results
              </Button>
            )}
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
                        value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={(e) => {
                          const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          field.onChange(skills);
                        }}
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
                    AI Generating Headlines...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {hasExistingHeadlines ? "Regenerate AI Headlines" : "Generate AI Headlines"}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Generated Headlines */}
      {hasExistingHeadlines && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              AI-Generated Headlines
              <Badge variant="outline">Optimized for {new Date().getFullYear()}</Badge>
            </CardTitle>
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
                        <Badge variant={headline.length <= 220 ? "default" : "destructive"}>
                          {headline.length <= 220 ? "Perfect Length" : "Too Long"}
                        </Badge>
                        {headline.length <= 180 && (
                          <Badge variant="secondary">Mobile Optimized</Badge>
                        )}
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
