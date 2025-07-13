import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Sparkles, 
  Target, 
  Users, 
  TrendingUp, 
  Lightbulb,
  Star,
  Globe,
  MessageCircle,
  Share2,
  Eye,
  Award,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Plus,
  X
} from "lucide-react";
import { toast } from "sonner";

const personalBrandSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  currentRole: z.string().min(2, "Current role is required"),
  targetRole: z.string().min(2, "Target role is required"),
  industry: z.string().min(1, "Industry is required"),
  uniqueValue: z.string().min(10, "Unique value proposition should be at least 10 characters"),
  keySkills: z.array(z.string()).min(3, "At least 3 key skills are required"),
  achievements: z.array(z.string()).min(1, "At least 1 achievement is required"),
  personalStory: z.string().min(50, "Personal story should be at least 50 characters"),
  targetAudience: z.string().min(1, "Target audience is required"),
  communicationStyle: z.enum(["professional", "conversational", "thought-leader", "technical", "creative"]),
});

type PersonalBrandData = z.infer<typeof personalBrandSchema>;

const PersonalBranding = () => {
  const [activeTab, setActiveTab] = useState("brand-builder");
  const [brandScore, setBrandScore] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [newSkill, setNewSkill] = useState("");
  const [newAchievement, setNewAchievement] = useState("");

  const form = useForm<PersonalBrandData>({
    resolver: zodResolver(personalBrandSchema),
    defaultValues: {
      fullName: "",
      currentRole: "",
      targetRole: "",
      industry: "",
      uniqueValue: "",
      keySkills: [],
      achievements: [],
      personalStory: "",
      targetAudience: "",
      communicationStyle: "professional",
    },
  });

  const calculateBrandElements = () => {
    const formData = form.getValues();
    
    // Brand Foundation Score (based on core fields completion)
    const foundationFields = [formData.fullName, formData.currentRole, formData.uniqueValue, formData.personalStory];
    const foundationScore = Math.round((foundationFields.filter(field => field && field.length > 0).length / foundationFields.length) * 100);
    
    // Visual Identity Score (based on role and industry selection)
    const visualScore = (formData.currentRole && formData.industry) ? 75 : 30;
    
    // Content Strategy Score (based on skills, achievements, and communication style)
    const contentScore = Math.round(((formData.keySkills.length >= 3 ? 50 : 0) + 
                                    (formData.achievements.length >= 1 ? 30 : 0) + 
                                    (formData.communicationStyle ? 20 : 0)) * 1);
    
    // Online Presence Score (based on target role and audience)
    const onlineScore = (formData.targetRole && formData.targetAudience) ? 85 : 40;
    
    return [
      {
        title: "Brand Foundation",
        description: "Core values, mission, and unique value proposition",
        score: foundationScore,
        status: foundationScore >= 80 ? "complete" : foundationScore >= 50 ? "in-progress" : "needs-work"
      },
      {
        title: "Visual Identity", 
        description: "Professional headshots, color palette, and design elements",
        score: visualScore,
        status: visualScore >= 80 ? "complete" : visualScore >= 50 ? "in-progress" : "needs-work"
      },
      {
        title: "Content Strategy",
        description: "Thought leadership topics and content calendar", 
        score: contentScore,
        status: contentScore >= 80 ? "complete" : contentScore >= 50 ? "in-progress" : "needs-work"
      },
      {
        title: "Online Presence",
        description: "LinkedIn optimization and professional website",
        score: onlineScore,
        status: onlineScore >= 80 ? "complete" : onlineScore >= 50 ? "in-progress" : "needs-work"
      }
    ];
  };

  const brandElements = calculateBrandElements();

  const generateContentTemplates = () => {
    const formData = form.getValues();
    
    return [
      {
        type: "LinkedIn Post",
        template: "Thought Leadership",
        preview: formData.achievements.length > 0 
          ? `🚀 Just completed a challenging project that taught me ${formData.achievements[0].toLowerCase()}...`
          : "🚀 Just completed a challenging project that taught me...",
        engagement: formData.keySkills.length >= 3 ? "High" : "Medium"
      },
      {
        type: "Bio Template", 
        template: "Professional Bio",
        preview: formData.currentRole && formData.keySkills.length > 0
          ? `Award-winning ${formData.currentRole} with expertise in ${formData.keySkills.slice(0, 2).join(' and ')}...`
          : "Award-winning [role] with [X] years of experience in...",
        engagement: formData.personalStory.length > 50 ? "High" : "Medium"
      },
      {
        type: "Email Signature",
        template: "Executive Style", 
        preview: formData.fullName && formData.currentRole && formData.industry
          ? `${formData.fullName} | ${formData.currentRole} | Driving innovation in ${formData.industry}`
          : "[Name] | [Title] | Driving innovation in [industry]",
        engagement: formData.communicationStyle === "professional" ? "Medium" : "Low"
      },
      {
        type: "Portfolio Header",
        template: "Creative Brief",
        preview: formData.uniqueValue 
          ? formData.uniqueValue
          : "Transforming ideas into impactful solutions",
        engagement: formData.uniqueValue.length > 30 ? "High" : "Medium"
      }
    ];
  };

  const contentTemplates = generateContentTemplates();

  const generateBrandingStrategies = () => {
    const formData = form.getValues();
    
    return [
      {
        strategy: "Thought Leadership",
        description: formData.industry 
          ? `Position yourself as a ${formData.industry} expert through content creation`
          : "Position yourself as an industry expert through content creation",
        tactics: formData.keySkills.length > 0 
          ? [`Write ${formData.keySkills[0]} insights`, "Share case studies", "Comment on trends"]
          : ["Write industry insights", "Share case studies", "Comment on trends"],
        timeline: formData.communicationStyle === "thought-leader" ? "2-4 months" : "3-6 months",
        difficulty: formData.keySkills.length >= 3 ? "Medium" : "Hard"
      },
      {
        strategy: "Network Building",
        description: formData.targetAudience 
          ? `Expand your network within ${formData.targetAudience} circles`
          : "Expand your professional network strategically",
        tactics: formData.industry 
          ? [`Engage with ${formData.industry} leaders`, "Join professional groups", "Attend events"]
          : ["Engage with industry leaders", "Join professional groups", "Attend events"],
        timeline: "Ongoing",
        difficulty: formData.communicationStyle === "conversational" ? "Easy" : "Medium"
      },
      {
        strategy: "Content Creator",
        description: formData.targetRole 
          ? `Build audience as an aspiring ${formData.targetRole} through valuable content`
          : "Build audience through valuable content sharing",
        tactics: formData.achievements.length > 0 
          ? ["Regular posting schedule", `Share ${formData.achievements[0]} stories`, "Industry newsletters"]
          : ["Regular posting schedule", "Video content", "Industry newsletters"],
        timeline: formData.personalStory.length > 100 ? "4-8 months" : "6-12 months",
        difficulty: formData.keySkills.length >= 5 ? "Medium" : "Hard"
      }
    ];
  };

  const brandingStrategies = generateBrandingStrategies();

  const onSubmit = (data: PersonalBrandData) => {
    // Simulate brand analysis
    const score = Math.floor(Math.random() * 20) + 80;
    setBrandScore(score);
    
    // Generate content based on form data
    setGeneratedContent({
      tagline: `${data.currentRole} → ${data.targetRole} | ${data.uniqueValue}`,
      elevator_pitch: `Hi, I'm ${data.fullName}, a ${data.currentRole} passionate about ${data.industry}. ${data.personalStory.substring(0, 100)}...`,
      linkedin_headline: `${data.currentRole} | ${data.keySkills.slice(0, 3).join(' • ')} | ${data.targetRole}`,
      bio: `Award-winning ${data.currentRole} with proven expertise in ${data.keySkills.join(', ')}. ${data.uniqueValue}`
    });
    
    toast.success("Personal brand analysis complete!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = form.getValues("keySkills");
      form.setValue("keySkills", [...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues("keySkills");
    form.setValue("keySkills", currentSkills.filter(skill => skill !== skillToRemove));
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      const currentAchievements = form.getValues("achievements");
      form.setValue("achievements", [...currentAchievements, newAchievement.trim()]);
      setNewAchievement("");
    }
  };

  const removeAchievement = (achievementToRemove: string) => {
    const currentAchievements = form.getValues("achievements");
    form.setValue("achievements", currentAchievements.filter(achievement => achievement !== achievementToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Personal Branding Studio</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build a powerful personal brand that attracts opportunities and establishes you as a thought leader in your industry
          </p>
        </div>

        {/* Brand Score Overview */}
        {brandScore > 0 && (
          <Card className="mb-8 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Your Brand Strength Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Progress value={brandScore} className="flex-1" />
                <Badge variant={brandScore >= 80 ? "default" : brandScore >= 60 ? "secondary" : "destructive"}>
                  {brandScore}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {brandScore >= 80 
                  ? "Excellent! Your personal brand is strong and consistent." 
                  : brandScore >= 60 
                  ? "Good foundation! A few improvements will boost your brand presence." 
                  : "Your brand needs development to stand out in your industry."
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 glass-card">
            <TabsTrigger value="brand-builder" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Strategy
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brand-builder">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Brand Builder Form */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Build Your Personal Brand</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currentRole"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Role *</FormLabel>
                              <FormControl>
                                <Input placeholder="Senior Developer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="targetRole"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Role *</FormLabel>
                              <FormControl>
                                <Input placeholder="Tech Lead" {...field} />
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
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select industry" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="technology">Technology</SelectItem>
                                  <SelectItem value="finance">Finance</SelectItem>
                                  <SelectItem value="healthcare">Healthcare</SelectItem>
                                  <SelectItem value="marketing">Marketing</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="consulting">Consulting</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="uniqueValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unique Value Proposition *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What makes you unique? What value do you bring that others don't?"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Key Skills Field */}
                      <FormField
                        control={form.control}
                        name="keySkills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Skills * (minimum 3)</FormLabel>
                            <div className="space-y-3">
                              <div className="flex gap-2">
                                <Input
                                  value={newSkill}
                                  onChange={(e) => setNewSkill(e.target.value)}
                                  placeholder="Add a key skill..."
                                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                />
                                <Button type="button" onClick={addSkill} size="sm">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {field.value.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                    {skill}
                                    <X 
                                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                                      onClick={() => removeSkill(skill)}
                                    />
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Achievements Field */}
                      <FormField
                        control={form.control}
                        name="achievements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Achievements * (minimum 1)</FormLabel>
                            <div className="space-y-3">
                              <div className="flex gap-2">
                                <Input
                                  value={newAchievement}
                                  onChange={(e) => setNewAchievement(e.target.value)}
                                  placeholder="Add a key achievement..."
                                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                                />
                                <Button type="button" onClick={addAchievement} size="sm">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {field.value.map((achievement, index) => (
                                  <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded-lg">
                                    <span className="text-sm flex-1">{achievement}</span>
                                    <X 
                                      className="h-4 w-4 cursor-pointer hover:text-destructive mt-0.5" 
                                      onClick={() => removeAchievement(achievement)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Target Audience Field */}
                      <FormField
                        control={form.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Audience *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your target audience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hiring-managers">Hiring Managers</SelectItem>
                                <SelectItem value="industry-peers">Industry Peers</SelectItem>
                                <SelectItem value="potential-clients">Potential Clients</SelectItem>
                                <SelectItem value="investors">Investors</SelectItem>
                                <SelectItem value="team-members">Team Members</SelectItem>
                                <SelectItem value="general-public">General Public</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="personalStory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Professional Story *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell your professional journey, challenges overcome, and what drives you..."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="communicationStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Communication Style</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="professional">Professional & Formal</SelectItem>
                                <SelectItem value="conversational">Conversational & Friendly</SelectItem>
                                <SelectItem value="thought-leader">Thought Leader & Visionary</SelectItem>
                                <SelectItem value="technical">Technical & Detailed</SelectItem>
                                <SelectItem value="creative">Creative & Innovative</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Generate Personal Brand
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Brand Elements Overview */}
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Brand Elements Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {brandElements.map((element, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{element.title}</span>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={element.status === "complete" ? "default" : 
                                       element.status === "in-progress" ? "secondary" : "destructive"}
                              >
                                {element.status}
                              </Badge>
                              <span className="text-sm font-bold">{element.score}%</span>
                            </div>
                          </div>
                          <Progress value={element.score} className="h-2" />
                          <p className="text-xs text-muted-foreground">{element.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Content Preview */}
                {generatedContent && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        Generated Brand Assets
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Professional Tagline</span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(generatedContent.tagline)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm bg-muted/50 p-2 rounded">{generatedContent.tagline}</p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">LinkedIn Headline</span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(generatedContent.linkedin_headline)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm bg-muted/50 p-2 rounded">{generatedContent.linkedin_headline}</p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Elevator Pitch</span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(generatedContent.elevator_pitch)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm bg-muted/50 p-2 rounded">{generatedContent.elevator_pitch}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Content Templates & Ideas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentTemplates.map((template, index) => (
                  <Card key={index} className="glass-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{template.type}</CardTitle>
                          <Badge variant="outline" className="mt-1">{template.template}</Badge>
                        </div>
                        <Badge 
                          variant={template.engagement === "High" ? "default" : 
                                 template.engagement === "Medium" ? "secondary" : "outline"}
                        >
                          {template.engagement} Engagement
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-3 rounded-lg mb-4">
                        <p className="text-sm italic">"{template.preview}"</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Template
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="strategy">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Personal Branding Strategies</h3>
              <div className="space-y-6">
                {brandingStrategies.map((strategy, index) => (
                  <Card key={index} className="glass-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{strategy.strategy}</CardTitle>
                          <p className="text-muted-foreground mt-1">{strategy.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{strategy.timeline}</Badge>
                          <div className="text-xs text-muted-foreground mt-1">{strategy.difficulty}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Key Tactics:</span>
                        <ul className="list-disc list-inside space-y-1">
                          {strategy.tactics.map((tactic, tacticIndex) => (
                            <li key={tacticIndex} className="text-sm text-muted-foreground">{tactic}</li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full mt-4">Start This Strategy</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Brand Performance Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Visibility Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">78%</div>
                      <div className="text-sm text-muted-foreground">+12% this month</div>
                      <Progress value={78} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Network Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">+245</div>
                      <div className="text-sm text-muted-foreground">New connections</div>
                      <Progress value={85} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Engagement Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">6.8%</div>
                      <div className="text-sm text-muted-foreground">Above average</div>
                      <Progress value={68} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <Award className="h-4 w-4" />
                      <AlertDescription>
                        Your LinkedIn post about industry trends received 150+ likes and 25 comments!
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        You appeared in 3 new search results for your target keywords this week.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Ready-to-Use Templates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Professional Bio Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Executive Bio Template
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Creative Professional Bio
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Technical Expert Bio
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Social Media Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        LinkedIn Post Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Twitter Thread Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Professional Headlines
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PersonalBranding;