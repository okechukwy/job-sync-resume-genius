import { Search, FileText, Users, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHeader } from "@/components/common/PageHeader";

const HelpCenter = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: Zap,
      articles: [
        "Complete Platform Tour: From Resume to Career Success",
        "Choosing Your First Template from 58+ Options",
        "Setting Up Your Profile for Maximum ATS Optimization",
        "Understanding Your Dashboard: Resume, Job Search & Career Tools",
        "First Steps: Building Your Resume in 5 Minutes",
        "Industry-Specific Getting Started Guides"
      ]
    },
    {
      title: "Account Management",
      icon: Users,
      articles: [
        "Managing Your Subscription and Billing",
        "Understanding Free vs Premium Features",
        "Profile Settings and Data Management",
        "Notification Preferences and Alerts",
        "Account Security and Privacy Settings",
        "Upgrading to Premium: What You Get"
      ]
    },
    {
      title: "Features & Tools",
      icon: FileText,
      articles: [
        "Resume Builder: Complete Guide to 58+ Templates",
        "AI Interview Prep: Mock Interviews & Feedback",
        "LinkedIn Optimization: Profile Scoring & Enhancement",
        "ATS Analysis: Understanding Your Score",
        "Job Matching: Optimize for Specific Roles",
        "Cover Letter Generator: AI-Powered Personalization",
        "Performance Tracking: Monitor Your Success",
        "Version Management: Multiple Resume Strategies",
        "Personal Branding: Build Your Professional Identity",
        "Career Coaching: AI-Powered Career Guidance",
        "White Label Exports: Enterprise Solutions",
        "Priority Support: 24/7 Assistance"
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      articles: [
        "Data Protection: How We Secure Your Information",
        "GDPR Compliance and Your Rights",
        "Account Security: Two-Factor Authentication",
        "Data Export and Deletion Options",
        "Privacy Settings: Control Your Information",
        "Third-Party Integrations and Data Sharing"
      ]
    },
    {
      title: "Template & Industry Guides",
      icon: FileText,
      articles: [
        "Technology Templates: 12 Specialized Options",
        "Healthcare Templates: 8 Medical Professional Designs",
        "Finance Templates: 10 Banking & Accounting Layouts",
        "Creative Templates: 19 Design & Marketing Options",
        "Business Templates: 9 Management & Operations Designs",
        "Research Templates: 7 Academic & Scientific Layouts"
      ]
    }
  ];

  const faqs = [
    {
      question: "Which of the 58+ templates should I choose for my industry?",
      answer: "Our templates are organized by industry and role type. Use our template selector to filter by your field - we have specialized templates for Technology (12), Healthcare (8), Finance (10), Creative (19), Business (9), and Research (7) fields."
    },
    {
      question: "How does the AI interview preparation work?",
      answer: "Our AI conducts mock interviews tailored to your role and industry, provides real-time feedback on your answers, analyzes your speech patterns, and suggests improvements for better performance in actual interviews."
    },
    {
      question: "What's included in LinkedIn optimization?",
      answer: "LinkedIn optimization includes profile scoring, headline generation, summary optimization, keyword analysis, content suggestions, and competitive benchmarking to maximize your professional visibility."
    },
    {
      question: "How do I track my job application performance?",
      answer: "Our performance tracking monitors your application success rates, provides insights on which resume versions perform best, tracks interview conversion rates, and offers data-driven recommendations for improvement."
    },
    {
      question: "What's the difference between free and premium features?",
      answer: "Free users get basic resume building with limited templates. Premium unlocks all 58+ templates, AI optimization, interview prep, LinkedIn tools, performance tracking, unlimited downloads, and priority support."
    },
    {
      question: "How do I create multiple resume versions?",
      answer: "Use our version management system to create tailored resumes for different roles. Each version can have customized content, keywords, and formatting while maintaining your core professional information."
    },
    {
      question: "Can I export my resume in different formats?",
      answer: "Yes! Export options include PDF, Word (.docx), RTF, and plain text formats. Premium users also get access to white-label exports and custom formatting options."
    },
    {
      question: "How does the ATS score calculation work?",
      answer: "Our ATS analysis examines keyword density, formatting compatibility, section organization, and content structure against modern ATS systems, providing a comprehensive score with specific improvement recommendations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Help <span className="gradient-text">Center</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions and get the support you need to succeed.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-10 glass-card"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.articles.map((article, idx) => (
                    <li key={idx} className="hover:text-primary cursor-pointer transition-colors">
                      • {article}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="glass-card mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Contact Support
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Schedule a Call
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;