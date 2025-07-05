import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const InterviewPreparation = () => {
  const sections = [
    {
      title: "50+ Most Common Interview Questions",
      content: [
        "Tell me about yourself - craft your elevator pitch",
        "Why do you want to work here? - research and personalize",
        "What are your strengths and weaknesses? - be authentic and strategic",
        "Where do you see yourself in 5 years? - align with company goals",
        "Why are you leaving your current job? - stay positive and professional"
      ]
    },
    {
      title: "STAR Method for Behavioral Questions",
      content: [
        "Situation: Set the context for your story",
        "Task: Describe what you needed to accomplish",
        "Action: Explain what you did to address the situation",
        "Result: Share what outcomes your actions achieved",
        "Practice with real examples from your experience"
      ]
    },
    {
      title: "Technical Interview Preparation",
      content: [
        "Review fundamental concepts in your field",
        "Practice coding problems on platforms like LeetCode",
        "Prepare for system design questions (senior roles)",
        "Be ready to walk through your portfolio/projects",
        "Practice explaining complex concepts simply"
      ]
    },
    {
      title: "Questions to Ask Your Interviewer",
      content: [
        "What does success look like in this role?",
        "What are the biggest challenges facing the team?",
        "How do you measure performance and provide feedback?",
        "What opportunities are there for growth and development?",
        "What do you enjoy most about working here?"
      ]
    },
    {
      title: "Post-Interview Follow-Up Strategies",
      content: [
        "Send a thank-you email within 24 hours",
        "Reference specific points discussed in the interview",
        "Reiterate your interest and qualifications",
        "Provide any additional information requested",
        "Follow up appropriately if you don't hear back"
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
              <span className="text-2xl">💼</span>
              <div>
                <div className="text-xl font-bold gradient-text">Interview Preparation</div>
                <div className="text-sm text-muted-foreground">25 min read</div>
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
              <Badge variant="secondary">Toolkit</Badge>
              <Badge variant="outline">Comprehensive</Badge>
            </div>
            <CardTitle className="text-2xl">Complete Interview Preparation Toolkit</CardTitle>
            <CardDescription className="text-base">
              Everything you need to ace your next interview, from common questions to follow-up strategies. 
              Build confidence and make a lasting impression.
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
            <h3 className="text-2xl font-bold mb-4">Ready for Your Interview?</h3>
            <p className="text-muted-foreground mb-6">
              Start by creating a standout resume that gets you more interview opportunities.
            </p>
            <Link to="/get-started">
              <Button variant="hero" size="lg">
                Build My Resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewPreparation;