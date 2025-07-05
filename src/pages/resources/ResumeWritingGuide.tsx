import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeWritingGuide = () => {
  const sections = [
    {
      title: "Resume Structure & Format",
      content: [
        "Choose the right resume format (chronological, functional, or hybrid)",
        "Optimize your resume length (1-2 pages maximum)",
        "Use professional fonts and proper spacing",
        "Include essential sections: contact info, summary, experience, education, skills"
      ]
    },
    {
      title: "Writing Compelling Professional Summaries",
      content: [
        "Craft a powerful opening statement in 2-3 sentences",
        "Highlight your key achievements and unique value proposition",
        "Tailor your summary to match the job requirements",
        "Use action words and quantifiable results"
      ]
    },
    {
      title: "Quantifying Achievements with Metrics",
      content: [
        "Use numbers, percentages, and dollar amounts when possible",
        "Show impact: 'Increased sales by 25%' vs 'Responsible for sales'",
        "Include timeframes to demonstrate efficiency",
        "Highlight awards, recognition, and performance rankings"
      ]
    },
    {
      title: "Tailoring Resumes for Different Industries",
      content: [
        "Research industry-specific keywords and terminology",
        "Emphasize relevant skills and experiences",
        "Adjust your professional summary for each application",
        "Consider industry formatting preferences"
      ]
    },
    {
      title: "Common Resume Mistakes to Avoid",
      content: [
        "Typos and grammatical errors",
        "Using generic, one-size-fits-all resumes",
        "Including irrelevant personal information",
        "Poor formatting and inconsistent styling",
        "Listing duties instead of achievements"
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
              <span className="text-2xl">📚</span>
              <div>
                <div className="text-xl font-bold gradient-text">Resume Writing Guide</div>
                <div className="text-sm text-muted-foreground">15 min read</div>
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
              <Badge variant="secondary">Guide</Badge>
              <Badge variant="outline">Beginner Friendly</Badge>
            </div>
            <CardTitle className="text-2xl">Complete Guide to Writing Resumes That Get Noticed</CardTitle>
            <CardDescription className="text-base">
              Learn how to create a resume that stands out from the competition and gets you more interviews. 
              This comprehensive guide covers everything from formatting to content optimization.
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
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your Resume?</h3>
            <p className="text-muted-foreground mb-6">
              Apply what you've learned and create a professional resume using our AI-powered builder.
            </p>
            <Link to="/get-started">
              <Button variant="hero" size="lg">
                Start Building Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeWritingGuide;