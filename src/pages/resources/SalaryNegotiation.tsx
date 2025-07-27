import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SalaryNegotiation = () => {
  const sections = [
    {
      title: "Research and Benchmarking Your Worth",
      content: [
        "Use salary comparison websites like Glassdoor, PayScale, and Salary.com",
        "Research industry standards for your role and experience level",
        "Consider geographic location and cost of living adjustments",
        "Factor in your unique skills, certifications, and achievements",
        "Gather data from multiple sources for accurate benchmarking"
      ]
    },
    {
      title: "Negotiation Scripts and Templates",
      content: [
        "'Thank you for the offer. I'm excited about the opportunity. Can we discuss the compensation?'",
        "'Based on my research and experience, I was hoping for a salary in the range of $X to $Y'",
        "'I'd love to accept this offer. Is there flexibility in the base salary?'",
        "'Given my track record of [specific achievement], I believe $X would be appropriate'",
        "Always express enthusiasm before discussing compensation"
      ]
    },
    {
      title: "Beyond Salary: Benefits Negotiation",
      content: [
        "Health insurance premiums and coverage options",
        "Retirement contributions and matching programs",
        "Vacation time, sick leave, and flexible work arrangements",
        "Professional development budget and training opportunities",
        "Stock options, bonuses, and performance incentives"
      ]
    },
    {
      title: "Handling Counteroffers",
      content: [
        "Evaluate the total compensation package, not just salary",
        "Consider long-term career growth and opportunities",
        "Be prepared to justify your counteroffer with data",
        "Maintain professionalism even if negotiations stall",
        "Have a clear minimum acceptable offer in mind"
      ]
    },
    {
      title: "When and How to Walk Away",
      content: [
        "Know your worth and stick to your minimum requirements",
        "Red flags: company won't budge on reasonable requests",
        "Trust your instincts about company culture and values",
        "Walking away professionally keeps doors open",
        "Sometimes the best negotiation is finding a better opportunity"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass-card sticky top-0 z-50 rounded-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/resources">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <div className="text-xl font-bold gradient-text">Salary Negotiation</div>
                <div className="text-sm text-muted-foreground">18 min read</div>
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
              <Badge variant="outline">Advanced</Badge>
            </div>
            <CardTitle className="text-2xl">Master the Art of Salary Negotiation</CardTitle>
            <CardDescription className="text-base">
              Learn proven strategies and scripts for negotiating your job offer. Maximize your compensation 
              and secure the best possible terms for your new position.
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
            <h3 className="text-2xl font-bold mb-4">Start Your Career Journey</h3>
            <p className="text-muted-foreground mb-6">
              Get more job offers and negotiation opportunities with a professional resume.
            </p>
            <Link to="/get-started">
              <Button variant="hero" size="lg">
                Create My Resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalaryNegotiation;