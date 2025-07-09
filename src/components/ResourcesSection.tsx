import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const ResourcesSection = () => {
const resources = [
    {
      icon: "📚",
      title: "Resume Writing Guide",
      description: "Complete guide to writing resumes that get noticed by recruiters",
      type: "Guide",
      link: "/resources/resume-writing-guide",
      keyPoints: [
        "How to structure your resume for maximum impact",
        "Writing compelling professional summaries",
        "Quantifying achievements with metrics"
      ]
    },
    {
      icon: "🎯",
      title: "ATS Optimization Tips",
      description: "Learn how to optimize your resume for Applicant Tracking Systems",
      type: "Tutorial",
      link: "/resources/ats-optimization",
      keyPoints: [
        "Understanding how ATS systems work",
        "Keyword optimization strategies",
        "Formatting for ATS compatibility"
      ]
    },
    {
      icon: "💼",
      title: "Interview Preparation",
      description: "Comprehensive interview preparation resources and common questions",
      type: "Toolkit",
      link: "/resources/interview-preparation",
      keyPoints: [
        "50+ most common interview questions",
        "STAR method for behavioral questions",
        "Technical interview preparation"
      ]
    },
    {
      icon: "📊",
      title: "Salary Negotiation",
      description: "Strategies and scripts for negotiating your job offer",
      type: "Guide",
      link: "/resources/salary-negotiation",
      keyPoints: [
        "Research and benchmarking your worth",
        "Negotiation scripts and templates",
        "Beyond salary: benefits negotiation"
      ]
    },
    {
      icon: "🚀",
      title: "Career Development",
      description: "Resources for advancing your career and professional growth",
      type: "Collection",
      link: "/resources/career-development",
      keyPoints: [
        "Building your personal brand",
        "Networking strategies that work",
        "Leadership development resources"
      ]
    },
    {
      icon: "🔍",
      title: "Job Search Strategy",
      description: "Proven strategies for finding and landing your dream job",
      type: "Masterclass",
      link: "/resources/job-search-strategy",
      keyPoints: [
        "Hidden job market strategies",
        "LinkedIn optimization guide",
        "Company research techniques"
      ]
    }
  ];

  return (
    <section id="resources" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 glass-card">
            📖 Career Resources
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Level Up Your{" "}
            <span className="gradient-text">Career Game</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access our comprehensive library of career resources, guides, and tools 
            to help you succeed at every stage of your professional journey.
          </p>
        </div>

        {/* Resources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Points */}
                <div>
                  <p className="text-sm font-medium mb-2">What you'll learn:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {resource.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>


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

        <div className="text-center mt-12">
          <Link to="/resources">
            <Button variant="hero" size="lg">
              View All Resources
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;