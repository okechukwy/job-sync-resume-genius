import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const Resources = () => {
  const navigate = useNavigate();
  
  const handleBackToHome = () => {
    navigate("/");
  };

  const resources = [
    {
      icon: "📚",
      title: "Resume Writing Guide",
      description: "Complete guide to writing resumes that get noticed by recruiters",
      type: "Guide",
      content: [
        "How to structure your resume for maximum impact",
        "Writing compelling professional summaries",
        "Quantifying achievements with metrics",
        "Tailoring resumes for different industries",
        "Common resume mistakes to avoid"
      ],
      estimatedTime: "15 min read",
      link: "/resources/resume-writing-guide"
    },
    {
      icon: "🎯",
      title: "ATS Optimization Tips",
      description: "Learn how to optimize your resume for Applicant Tracking Systems",
      type: "Tutorial",
      content: [
        "Understanding how ATS systems work",
        "Keyword optimization strategies",
        "Formatting for ATS compatibility",
        "Testing your resume through ATS",
        "Industry-specific ATS requirements"
      ],
      estimatedTime: "12 min read",
      link: "/resources/ats-optimization"
    },
    {
      icon: "💼",
      title: "Interview Preparation",
      description: "Comprehensive interview preparation resources and common questions",
      type: "Toolkit",
      content: [
        "50+ most common interview questions",
        "STAR method for behavioral questions",
        "Technical interview preparation",
        "Questions to ask your interviewer",
        "Post-interview follow-up strategies"
      ],
      estimatedTime: "25 min read",
      link: "/resources/interview-preparation"
    },
    {
      icon: "📊",
      title: "Salary Negotiation",
      description: "Strategies and scripts for negotiating your job offer",
      type: "Guide",
      content: [
        "Research and benchmarking your worth",
        "Negotiation scripts and templates",
        "Beyond salary: benefits negotiation",
        "Handling counteroffers",
        "When and how to walk away"
      ],
      estimatedTime: "18 min read",
      link: "/resources/salary-negotiation"
    },
    {
      icon: "🚀",
      title: "Career Development",
      description: "Resources for advancing your career and professional growth",
      type: "Collection",
      content: [
        "Building your personal brand",
        "Networking strategies that work",
        "Leadership development resources",
        "Skill development roadmaps",
        "Career transition planning"
      ],
      estimatedTime: "30 min read",
      link: "/resources/career-development"
    },
    {
      icon: "🔍",
      title: "Job Search Strategy",
      description: "Proven strategies for finding and landing your dream job",
      type: "Masterclass",
      content: [
        "Hidden job market strategies",
        "LinkedIn optimization guide",
        "Company research techniques",
        "Application tracking systems",
        "Building a job search pipeline"
      ],
      estimatedTime: "22 min read",
      link: "/resources/job-search-strategy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader backLabel="Back to Home" onCustomBack={handleBackToHome} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 glass-card">
            📖 Career Resources
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Level Up Your{" "}
            <span className="gradient-text">Career Game</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access our comprehensive library of career resources, guides, and tools 
            to help you succeed at every stage of your professional journey.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {resources.map((resource, index) => (
            <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300 group h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {resource.estimatedTime}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {resource.description}
                </CardDescription>
                
                {/* Content Preview */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">What you'll learn:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {resource.content.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {resource.content.length > 3 && (
                      <li className="text-primary">+ {resource.content.length - 3} more topics</li>
                    )}
                  </ul>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link to={resource.link}>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Access Resource
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center glass-card p-8 rounded-lg border border-border/20">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your Resume?</h3>
          <p className="text-muted-foreground mb-6">
            Put these resources to work and create a resume that gets results.
          </p>
          <Link to="/get-started">
            <Button variant="hero" size="lg">
              Start Building Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resources;