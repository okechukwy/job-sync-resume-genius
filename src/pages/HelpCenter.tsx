import { ArrowLeft, Search, FileText, Users, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: Zap,
      articles: [
        "How to create your first resume",
        "Understanding ATS optimization",
        "Choosing the right template"
      ]
    },
    {
      title: "Account Management",
      icon: Users,
      articles: [
        "Managing your subscription",
        "Updating billing information",
        "Canceling your account"
      ]
    },
    {
      title: "Features & Tools",
      icon: FileText,
      articles: [
        "Using the resume builder",
        "AI optimization features",
        "Export and download options"
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      articles: [
        "Data protection policies",
        "Account security settings",
        "GDPR compliance"
      ]
    }
  ];

  const faqs = [
    {
      question: "How does the AI resume optimization work?",
      answer: "Our AI analyzes your resume content, compares it against job market trends and ATS requirements, then provides specific recommendations to improve keyword density, formatting, and overall effectiveness."
    },
    {
      question: "Can I use ResumeAI for free?",
      answer: "Yes! We offer a free tier that includes basic resume building features. Premium plans unlock advanced AI optimization, unlimited downloads, and additional templates."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use enterprise-grade encryption and follow strict data protection protocols. Your personal information is never shared with third parties without your consent."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your current billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all premium subscriptions. Contact our support team if you're not satisfied with our service."
    },
    {
      question: "Can I download my resume in different formats?",
      answer: "Yes, premium users can download their resumes in PDF, Word, and other formats. Free users have access to PDF downloads."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-2xl font-bold gradient-text">ResumeAI</div>
          </div>
        </div>
      </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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