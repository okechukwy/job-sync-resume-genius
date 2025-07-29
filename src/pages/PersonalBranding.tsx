import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAIRecommendations } from "@/hooks/useAIRecommendations";
import { supabase } from "@/integrations/supabase/client";
import { PersonalBrandingStrategies } from "@/components/personal-branding/PersonalBrandingStrategies";
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
import { downloadFile } from "@/utils/downloadUtils";
import { PageLayout } from "@/components/common/PageLayout";

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
  communicationStyle: z.enum(["professional", "conversational", "thought-leader", "technical", "creative"]).optional(),
});

type PersonalBrandData = z.infer<typeof personalBrandSchema>;

const PersonalBranding = () => {
  const [activeTab, setActiveTab] = useState("brand-builder");
  const [brandScore, setBrandScore] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [newSkill, setNewSkill] = useState("");
  const [newAchievement, setNewAchievement] = useState("");
  
  const [user, setUser] = useState<any>(null); // Current authenticated user
  
  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const { 
    personalBrandingRecommendations, 
    personalBrandingLoading,
    generatePersonalBrandingStrategies,
    dismissRecommendation,
    implementRecommendation,
    isGenerating
  } = useAIRecommendations(user?.id);

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
      communicationStyle: undefined,
    },
  });

  const calculateBrandElements = () => {
    const formData = form.getValues();
    
    // Brand Foundation Score (based on core fields completion)
    const foundationFields = [formData.fullName, formData.currentRole, formData.uniqueValue, formData.personalStory];
    const foundationScore = Math.round((foundationFields.filter(field => field && field.length > 0).length / foundationFields.length) * 100);
    
    // Visual Identity Score (progressive based on multiple factors)
    let visualScore = 0;
    if (formData.industry) visualScore += 25;
    if (formData.currentRole && formData.currentRole.length > 0) visualScore += 25;
    if (formData.targetRole && formData.targetRole.length > 0) visualScore += 25;
    if (formData.uniqueValue && formData.uniqueValue.length > 0) visualScore += 25;
    
    // Content Strategy Score (progressive based on skills, achievements, and communication style)
    let contentScore = 0;
    // Skills scoring: 0-2 skills = 0%, 3-4 skills = 30%, 5+ skills = 40%
    if (formData.keySkills.length >= 5) contentScore += 40;
    else if (formData.keySkills.length >= 3) contentScore += 30;
    
    // Achievements scoring: 0 = 0%, 1-2 = 25%, 3+ = 35%
    if (formData.achievements.length >= 3) contentScore += 35;
    else if (formData.achievements.length >= 1) contentScore += 25;
    
    // Communication style: 0 = 0%, selected = 25%
    if (formData.communicationStyle) contentScore += 25;
    
    // Online Presence Score (progressive based on multiple factors)
    let onlineScore = 0;
    if (formData.targetRole && formData.targetRole.length > 0) onlineScore += 30;
    if (formData.targetAudience && formData.targetAudience.length > 0) onlineScore += 30;
    if (formData.personalStory && formData.personalStory.length >= 50) onlineScore += 30;
    if (formData.fullName && formData.fullName.length > 0) onlineScore += 10;
    
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
        fullContent: formData.achievements.length > 0 && formData.keySkills.length > 0
          ? `🚀 Just completed a challenging project that taught me the importance of ${formData.achievements[0].toLowerCase()}.

Key takeaways:
• ${formData.keySkills[0]} is crucial for success
• Collaboration drives innovation
• Continuous learning pays off

What's one lesson you've learned recently that changed your perspective?

#${formData.industry?.replace(/\s+/g, '') || 'ProfessionalGrowth'} #ThoughtLeadership #Learning`
          : `🚀 Just completed a challenging project that taught me [key lesson].

Key takeaways:
• [Skill/insight 1] is crucial for success
• Collaboration drives innovation
• Continuous learning pays off

What's one lesson you've learned recently that changed your perspective?

#ProfessionalGrowth #ThoughtLeadership #Learning`,
        engagement: formData.keySkills.length >= 3 ? "High" : "Medium"
      },
      {
        type: "Bio Template", 
        template: "Professional Bio",
        preview: formData.currentRole && formData.keySkills.length > 0
          ? `Award-winning ${formData.currentRole} with expertise in ${formData.keySkills.slice(0, 2).join(' and ')}...`
          : "Award-winning [role] with [X] years of experience in...",
        fullContent: formData.fullName && formData.currentRole && formData.keySkills.length > 0
          ? `${formData.fullName} is an award-winning ${formData.currentRole} with expertise in ${formData.keySkills.slice(0, 3).join(', ')}.

${formData.personalStory || `With a passion for driving innovation and delivering exceptional results, ${formData.fullName.split(' ')[0]} has helped organizations achieve their strategic objectives through creative problem-solving and strategic thinking.`}

${formData.achievements.length > 0 ? `Notable achievements include ${formData.achievements.slice(0, 2).join(' and ')}.` : 'Notable achievements include leading cross-functional teams and delivering high-impact projects.'}

${formData.fullName.split(' ')[0]} is currently focused on ${formData.targetRole || 'advancing their career'} and is passionate about ${formData.uniqueValue || 'creating meaningful impact through their work'}.`
          : `[Your Name] is an award-winning [Current Role] with expertise in [skill 1], [skill 2], and [skill 3].

[Personal story - 2-3 sentences about your journey, passion, and what drives you professionally.]

Notable achievements include [achievement 1] and [achievement 2].

[Your Name] is currently focused on [target role/goal] and is passionate about [unique value proposition].`,
        engagement: formData.personalStory.length > 50 ? "High" : "Medium"
      },
      {
        type: "Email Signature",
        template: "Executive Style", 
        preview: formData.fullName && formData.currentRole && formData.industry
          ? `${formData.fullName} | ${formData.currentRole} | Driving innovation in ${formData.industry}`
          : "[Name] | [Title] | Driving innovation in [industry]",
        fullContent: formData.fullName && formData.currentRole && formData.industry
          ? `${formData.fullName}
${formData.currentRole}
${formData.uniqueValue || `Driving innovation in ${formData.industry}`}

📧 ${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@company.com
🔗 linkedin.com/in/${formData.fullName.toLowerCase().replace(/\s+/g, '-')}
📱 +1 (555) 123-4567

"${formData.personalStory?.slice(0, 100) || 'Transforming challenges into opportunities'}"`
          : `[Your Name]
[Your Title]
[Your unique value proposition]

📧 your.email@company.com
🔗 linkedin.com/in/your-profile
📱 +1 (555) 123-4567

"[Brief personal motto or value statement]"`,
        engagement: formData.communicationStyle === "professional" ? "Medium" : "Low"
      },
      {
        type: "Portfolio Header",
        template: "Creative Brief",
        preview: formData.uniqueValue 
          ? formData.uniqueValue
          : "Transforming ideas into impactful solutions",
        fullContent: formData.fullName && formData.uniqueValue
          ? `${formData.fullName}
${formData.currentRole || '[Your Role]'}

${formData.uniqueValue}

${formData.personalStory || 'Passionate about creating innovative solutions that drive meaningful impact and deliver exceptional results for clients and organizations.'}

Core Expertise:
${formData.keySkills.length > 0 ? formData.keySkills.map(skill => `• ${skill}`).join('\n') : '• [Skill 1]\n• [Skill 2]\n• [Skill 3]'}

Let's connect: ${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@email.com`
          : `[Your Name]
[Your Role]

Transforming ideas into impactful solutions

[Brief description of your passion and approach to your work - 2-3 sentences about what drives you and the value you create.]

Core Expertise:
• [Skill 1]
• [Skill 2] 
• [Skill 3]

Let's connect: your.email@email.com`,
        engagement: formData.uniqueValue.length > 30 ? "High" : "Medium"
      }
    ];
  };

  const contentTemplates = generateContentTemplates();

  // Transform AI recommendations into strategy format
  const brandingStrategies = personalBrandingRecommendations?.map(rec => ({
    id: rec.id,
    title: rec.title,
    description: rec.description,
    reasoning: rec.reasoning,
    recommended_actions: rec.recommended_actions as Array<{
      action: string;
      timeline: string;
      difficulty: string;
      success_metrics?: string[];
    }>,
    priority: rec.priority as 'high' | 'medium' | 'low',
    confidence_score: rec.confidence_score,
    metadata: rec.metadata as {
      timeline?: string;
      difficulty?: string;
      industry_specific?: boolean;
      networking_opportunities?: string[];
      content_ideas?: string[];
      platforms?: string[];
    }
  })) || [];

  const onSubmit = async (data: PersonalBrandData) => {
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
    
    // Generate AI-powered branding strategies
    if (user?.id) {
      await generatePersonalBrandingStrategies({
        fullName: data.fullName,
        currentRole: data.currentRole,
        targetRole: data.targetRole,
        industry: data.industry,
        keySkills: data.keySkills,
        achievements: data.achievements,
        uniqueValue: data.uniqueValue,
        personalStory: data.personalStory,
        targetAudience: data.targetAudience,
        communicationStyle: data.communicationStyle,
        experienceLevel: 'mid_level' // Could be determined from form data
      });
    }
    
    toast.success("Personal brand analysis complete!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const generateExecutiveBio = () => {
    const formData = form.getValues();
    
    if (!formData.fullName || !formData.currentRole || !formData.keySkills.length) {
      toast.error("Please fill out your basic information first in the Brand Builder tab.");
      return "";
    }

    return `${formData.fullName}
${formData.currentRole}

${formData.uniqueValue || "Executive leader with proven track record of driving organizational growth and innovation."}

Professional Background:
${formData.personalStory || "Seasoned professional with extensive experience leading high-performing teams and delivering strategic initiatives that drive business transformation."}

Core Competencies:
${formData.keySkills.slice(0, 6).map(skill => `• ${skill}`).join('\n')}

Notable Achievements:
${formData.achievements.length > 0 ? formData.achievements.map(achievement => `• ${achievement}`).join('\n') : '• Led strategic initiatives resulting in measurable organizational growth\n• Built and mentored high-performing teams across multiple departments'}

${formData.fullName.split(' ')[0]} is currently focused on ${formData.targetRole || 'advancing strategic leadership opportunities'} and is passionate about ${formData.uniqueValue?.toLowerCase() || 'driving innovation and organizational excellence'}.

Contact: ${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@company.com
LinkedIn: linkedin.com/in/${formData.fullName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const generateCreativeBio = () => {
    const formData = form.getValues();
    
    if (!formData.fullName || !formData.currentRole || !formData.keySkills.length) {
      toast.error("Please fill out your basic information first in the Brand Builder tab.");
      return "";
    }

    return `Hi, I'm ${formData.fullName} ✨

${formData.currentRole} | ${formData.industry || 'Creative Professional'}

${formData.personalStory || "I'm passionate about turning creative ideas into impactful solutions that make a difference. My journey has been driven by curiosity, innovation, and a desire to push boundaries."}

What I bring to the table:
${formData.keySkills.slice(0, 5).map(skill => `🎯 ${skill}`).join('\n')}

Some things I'm proud of:
${formData.achievements.length > 0 ? formData.achievements.map(achievement => `🏆 ${achievement}`).join('\n') : '🏆 Delivered creative solutions that exceeded client expectations\n🏆 Led innovative projects from concept to completion'}

Currently exploring opportunities in ${formData.targetRole || 'creative leadership'} where I can ${formData.uniqueValue?.toLowerCase() || 'combine creativity with strategic thinking to drive meaningful impact'}.

Let's create something amazing together!
📧 ${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@email.com
🔗 linkedin.com/in/${formData.fullName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const generateTechnicalBio = () => {
    const formData = form.getValues();
    
    if (!formData.fullName || !formData.currentRole || !formData.keySkills.length) {
      toast.error("Please fill out your basic information first in the Brand Builder tab.");
      return "";
    }

    return `${formData.fullName}
${formData.currentRole} | ${formData.industry || 'Technology Professional'}

Technical Expertise & Specializations:
${formData.keySkills.slice(0, 8).map(skill => `• ${skill}`).join('\n')}

Professional Summary:
${formData.personalStory || "Experienced technical professional with a strong foundation in system architecture, development, and innovation. Proven ability to solve complex technical challenges and deliver scalable solutions."}

${formData.uniqueValue || "Specialized in architecting robust, scalable solutions that drive business value through technical excellence."}

Key Accomplishments:
${formData.achievements.length > 0 ? formData.achievements.map(achievement => `• ${achievement}`).join('\n') : '• Architected and implemented scalable systems serving thousands of users\n• Led technical teams in delivering complex projects on time and within budget\n• Contributed to open-source projects and technical communities'}

Career Focus:
Currently pursuing ${formData.targetRole || 'senior technical leadership roles'} where I can leverage my expertise to drive technical innovation and mentor engineering teams.

Technical Stack & Methodologies:
[Specific technologies and frameworks based on role]

Contact & Professional Profiles:
Email: ${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@email.com
LinkedIn: linkedin.com/in/${formData.fullName.toLowerCase().replace(/\s+/g, '-')}
GitHub: github.com/${formData.fullName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const generateLinkedInPosts = () => {
    const formData = form.getValues();
    
    if (!formData.keySkills.length || !formData.industry) {
      toast.error("Please fill out your skills and industry information first in the Brand Builder tab.");
      return "";
    }

    return `LinkedIn Post Templates - ${formData.fullName || 'Your Name'}

Template 1: Thought Leadership
🚀 ${formData.industry} is evolving rapidly, and ${formData.keySkills[0]?.toLowerCase() || '[key skill]'} is becoming increasingly crucial.

Here's what I've learned:
• ${formData.achievements[0] || 'Innovation happens when we combine technical expertise with creative problem-solving'}
• The future belongs to professionals who can adapt and learn continuously
• ${formData.uniqueValue || 'Success comes from delivering value, not just completing tasks'}

What trends are you seeing in ${formData.industry?.toLowerCase() || '[your industry]'}?

#${formData.industry?.replace(/\s+/g, '') || 'ProfessionalGrowth'} #ThoughtLeadership #${formData.keySkills[0]?.replace(/\s+/g, '') || 'Innovation'}

---

Template 2: Behind the Scenes
📊 Just wrapped up an incredible project where we ${formData.achievements[0]?.toLowerCase() || 'delivered exceptional results for our team'}.

The secret sauce? ${formData.keySkills.slice(0, 2).join(' + ') || 'Collaboration + Innovation'}.

Key takeaways:
• Planning is everything, but adaptability is just as important
• The best solutions often come from diverse perspectives
• ${formData.personalStory?.slice(0, 100) || 'Every challenge is an opportunity to grow and learn'} ⚡

What's one lesson you've learned from a recent project?

#ProjectManagement #${formData.industry?.replace(/\s+/g, '') || 'Professional'} #TeamWork

---

Template 3: Industry Insights
💡 ${formData.industry} professionals - are you prepared for what's next?

Based on my experience with ${formData.keySkills.slice(0, 3).join(', ')}, here are 3 trends to watch:

1️⃣ [Trend 1 based on your expertise]
2️⃣ [Trend 2 relevant to your industry] 
3️⃣ [Trend 3 from your experience]

The professionals who thrive will be those who ${formData.uniqueValue?.toLowerCase() || 'embrace change and continue learning'}.

What trends are you most excited about?

#FutureOfWork #${formData.industry?.replace(/\s+/g, '') || 'Industry'} #Innovation`;
  };

  const generateTwitterThreads = () => {
    const formData = form.getValues();
    
    if (!formData.keySkills.length || !formData.targetRole) {
      toast.error("Please fill out your skills and target role information first in the Brand Builder tab.");
      return "";
    }

    return `Twitter Thread Templates - ${formData.fullName || 'Your Name'}

Thread 1: Expertise Sharing
🧵 THREAD: ${formData.keySkills[0]} tips that changed my career (1/7)

After ${formData.achievements.length > 0 ? 'achieving' : 'working on'} ${formData.achievements[0] || 'significant professional milestones'}, here's what I wish I knew earlier:

1/ ${formData.uniqueValue || 'The most important skill is learning how to learn continuously'}

2/ Master the fundamentals before chasing the latest trends

3/ ${formData.personalStory?.slice(0, 120) || 'Build relationships - your network is your net worth'}

4/ Focus on delivering value, not just completing tasks

5/ Ask questions. Good questions lead to great solutions.

6/ Share your knowledge - teaching others solidifies your own understanding

7/ ${formData.targetRole ? `As I work toward becoming a ${formData.targetRole}, these principles guide everything I do.` : 'These principles have shaped my professional journey.'}

What would you add to this list? 👇

---

Thread 2: Industry Insights
🧵 THREAD: The future of ${formData.industry || 'our industry'} - what I'm seeing (1/6)

Working as a ${formData.currentRole || 'professional'} has given me unique insights into where we're heading:

1/ ${formData.keySkills[0] || 'Innovation'} is no longer optional - it's essential

2/ The skills gap is real. ${formData.keySkills.slice(0, 3).join(', ')} are in high demand

3/ ${formData.uniqueValue || 'Professionals who combine technical skills with strategic thinking will lead the future'}

4/ Remote work has changed everything - adaptation is key

5/ The most successful people are those who ${formData.personalStory?.includes('learn') ? 'never stop learning' : 'embrace change and continuous growth'}

6/ What got you here won't get you there. Evolution is essential.

Agree? What trends are you seeing? 💭

---

Thread 3: Career Advice
🧵 THREAD: Career lessons from my journey to ${formData.targetRole || 'leadership'} (1/8)

${formData.personalStory?.slice(0, 100) || 'My career journey has been full of lessons, pivots, and growth opportunities.'}

Here's what I've learned:

1/ Your unique value proposition matters: ${formData.uniqueValue || 'Find what makes you different and lean into it'}

2/ Skills that transformed my career: ${formData.keySkills.slice(0, 4).join(', ')}

3/ ${formData.achievements[0] || 'Every achievement started with taking one small step forward'}

4/ Network authentically - relationships matter more than transactions

5/ Share your journey - vulnerability builds trust

6/ Stay curious - the learning never stops

7/ ${formData.industry ? `The ${formData.industry} space is evolving rapidly` : 'Industries are changing fast'} - adaptation is survival

8/ Your next role: ${formData.targetRole || 'Think about where you want to be, not just where you are'}

What's one career lesson you'd share? 👇`;
  };

  const generateProfessionalHeadlines = () => {
    const formData = form.getValues();
    
    if (!formData.currentRole || !formData.keySkills.length) {
      toast.error("Please fill out your current role and skills first in the Brand Builder tab.");
      return "";
    }

    return `Professional Headlines Collection - ${formData.fullName || 'Your Name'}

LinkedIn Headlines:
1. ${formData.currentRole} → ${formData.targetRole || 'Next Level'} | ${formData.keySkills.slice(0, 3).join(' • ')} | ${formData.uniqueValue?.slice(0, 50) || 'Driving Innovation'}

2. ${formData.uniqueValue || 'Transforming Ideas into Impact'} | ${formData.currentRole} | ${formData.industry || 'Industry'} Expert

3. ${formData.keySkills[0] || 'Expert'} | ${formData.achievements[0]?.slice(0, 60) || 'Proven Track Record of Success'} | ${formData.targetRole || 'Future Leader'}

4. 🚀 ${formData.currentRole} passionate about ${formData.uniqueValue?.toLowerCase() || 'innovation'} | ${formData.keySkills.slice(0, 2).join(' & ')} | Let's connect!

5. ${formData.industry || 'Professional'} Leader | ${formData.personalStory?.slice(0, 80) || 'Helping organizations achieve their goals through strategic thinking and execution'}

Twitter Bio Options:
1. ${formData.currentRole} | ${formData.keySkills.slice(0, 2).join(' & ')} | ${formData.uniqueValue?.slice(0, 60) || 'Building the future one project at a time'} 📧 ${formData.fullName?.toLowerCase().replace(/\s+/g, '.')}@email.com

2. 👋 ${formData.fullName?.split(' ')[0] || 'Hi'} here! ${formData.currentRole} → ${formData.targetRole || 'Growth'} | Sharing insights about ${formData.industry?.toLowerCase() || 'professional development'} | DMs open

3. ${formData.personalStory?.slice(0, 100) || 'Passionate about innovation and continuous learning'} | ${formData.currentRole} | ${formData.keySkills[0] || 'Expert'}

Website/Portfolio Headers:
1. ${formData.fullName || 'Your Name'} - ${formData.currentRole}
   ${formData.uniqueValue || 'Transforming challenges into opportunities through innovative solutions'}

2. ${formData.uniqueValue || 'Driving Innovation'} | ${formData.currentRole}
   Specializing in ${formData.keySkills.slice(0, 3).join(', ')}

3. ${formData.fullName || 'Professional Name'}
   ${formData.targetRole || 'Future-Focused'} ${formData.currentRole} | ${formData.industry || 'Industry'} Expert

Email Signature Headlines:
1. ${formData.fullName || 'Your Name'} | ${formData.currentRole}
   ${formData.uniqueValue || 'Delivering exceptional results through innovation and collaboration'}

2. ${formData.fullName || 'Your Name'} - ${formData.currentRole} 
   "${formData.personalStory?.slice(0, 80) || 'Passionate about creating meaningful impact through strategic thinking'}"

Resume/CV Headlines:
1. ${formData.currentRole} | ${formData.keySkills.slice(0, 4).join(', ')} | ${formData.achievements.length > 0 ? formData.achievements[0].slice(0, 60) : 'Proven Track Record'}

2. ${formData.uniqueValue || 'Results-Driven Professional'} | ${formData.currentRole} with ${formData.keySkills.slice(0, 3).join(', ')} Expertise

3. ${formData.targetRole || 'Leadership-Focused'} ${formData.currentRole} | ${formData.industry || 'Industry'} Innovation | ${formData.keySkills[0] || 'Strategic Thinking'}`;
  };

  const handleTemplateDownload = async (templateType: string, format: 'txt' | 'pdf' | 'docx' = 'txt') => {
    let content = "";
    let fileName = "";

    switch (templateType) {
      case 'executive-bio':
        content = generateExecutiveBio();
        fileName = "executive-bio";
        break;
      case 'creative-bio':
        content = generateCreativeBio();
        fileName = "creative-professional-bio";
        break;
      case 'technical-bio':
        content = generateTechnicalBio();
        fileName = "technical-expert-bio";
        break;
      case 'linkedin-posts':
        content = generateLinkedInPosts();
        fileName = "linkedin-post-templates";
        break;
      case 'twitter-threads':
        content = generateTwitterThreads();
        fileName = "twitter-thread-templates";
        break;
      case 'professional-headlines':
        content = generateProfessionalHeadlines();
        fileName = "professional-headlines";
        break;
      default:
        toast.error("Unknown template type");
        return;
    }

    if (!content) {
      return; // Error already shown in generation function
    }

    await downloadFile(content, fileName, format);
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

  const handleStartStrategy = async (strategyId: string) => {
    try {
      await implementRecommendation(strategyId);
      // Future: Create action items from strategy
    } catch (error) {
      console.error('Failed to start strategy:', error);
    }
  };

  const handleDismissStrategy = async (strategyId: string) => {
    try {
      await dismissRecommendation(strategyId);
    } catch (error) {
      console.error('Failed to dismiss strategy:', error);
    }
  };

  return (
    <PageLayout maxWidth="6xl">
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
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => copyToClipboard(template.fullContent)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Template
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toast.info("External resources coming soon!")}
                        >
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
            <PersonalBrandingStrategies
              strategies={brandingStrategies}
              isLoading={personalBrandingLoading || isGenerating}
              onStartStrategy={handleStartStrategy}
              onDismissStrategy={handleDismissStrategy}
            />
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
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleTemplateDownload('executive-bio')}>
                        <Download className="h-4 w-4 mr-2" />
                        Executive Bio Template
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleTemplateDownload('creative-bio')}>
                        <Download className="h-4 w-4 mr-2" />
                        Creative Professional Bio
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleTemplateDownload('technical-bio')}>
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
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleTemplateDownload('linkedin-posts')}>
                        <Download className="h-4 w-4 mr-2" />
                        LinkedIn Post Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleTemplateDownload('twitter-threads')}>
                        <Download className="h-4 w-4 mr-2" />
                        Twitter Thread Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleTemplateDownload('professional-headlines')}>
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
    </PageLayout>
  );
};

export default PersonalBranding;