import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const JobSearchStrategy = () => {
  const sections = [
    {
      title: "Hidden Job Market Strategies",
      content: [
        "80% of jobs are never publicly advertised - tap into the hidden market",
        "Network with industry professionals and company insiders",
        "Follow target companies on social media and company websites",
        "Attend industry events and professional association meetings",
        "Reach out directly to hiring managers and department heads"
      ]
    },
    {
      title: "LinkedIn Optimization Guide",
      content: [
        "Craft a compelling headline that goes beyond your job title",
        "Write a summary that tells your professional story",
        "Use industry keywords throughout your profile for searchability",
        "Share relevant content and engage with your network regularly",
        "Get recommendations and endorse connections strategically"
      ]
    },
    {
      title: "Company Research Techniques",
      content: [
        "Study company culture, values, and recent news",
        "Research the hiring manager and interview team on LinkedIn",
        "Understand the company's challenges and how you can help",
        "Learn about competitors and industry trends",
        "Prepare specific examples of how you can add value"
      ]
    },
    {
      title: "Application Tracking Systems",
      content: [
        "Keep detailed records of applications, contacts, and follow-ups",
        "Use spreadsheets or job search apps to stay organized",
        "Set reminders for follow-up emails and networking activities",
        "Track response rates and adjust your strategy accordingly",
        "Note feedback from interviews to improve future performance"
      ]
    },
    {
      title: "Building a Job Search Pipeline",
      content: [
        "Maintain a consistent flow of applications and networking activities",
        "Set daily and weekly goals for job search activities",
        "Balance applying to posted jobs with proactive networking",
        "Prepare for multiple interviews happening simultaneously",
        "Keep your resume and LinkedIn profile continuously updated"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/resources">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <div className="text-xl font-bold gradient-text">Job Search Strategy</div>
                <div className="text-sm text-muted-foreground">22 min read</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Masterclass</Badge>
              <Badge variant="outline">Strategic</Badge>
            </div>
            <CardTitle className="text-2xl">Master Your Job Search Strategy</CardTitle>
            <CardDescription className="text-base">
              Proven strategies for finding and landing your dream job. Learn how to access the hidden job market 
              and build a systematic approach to job searching.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="glass-card mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Launch Your Job Search</h3>
            <p className="text-muted-foreground mb-6">
              Start your strategic job search with a resume that gets you noticed by employers.
            </p>
            <Link to="/get-started">
              <Button variant="hero" size="lg">
                Get Started Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobSearchStrategy;