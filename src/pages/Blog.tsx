import { ArrowLeft, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  const blogPosts = [
    {
      title: "10 Resume Mistakes That Cost You Job Interviews",
      excerpt: "Learn about the most common resume errors that prevent you from getting called for interviews and how to fix them.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Resume Tips",
      readTime: "5 min read"
    },
    {
      title: "How to Beat ATS Systems in 2024",
      excerpt: "Master the art of ATS optimization with our comprehensive guide to getting your resume past automated screening systems.",
      author: "Michael Chen",
      date: "March 10, 2024",
      category: "ATS Optimization",
      readTime: "8 min read"
    },
    {
      title: "The Psychology of Hiring Managers",
      excerpt: "Understand what hiring managers really look for in resumes and how to position yourself as the ideal candidate.",
      author: "Emily Rodriguez",
      date: "March 5, 2024",
      category: "Career Insights",
      readTime: "6 min read"
    },
    {
      title: "Remote Work Resume Strategies",
      excerpt: "Optimize your resume for remote positions with specific keywords, skills, and formatting that remote employers seek.",
      author: "David Park",
      date: "February 28, 2024",
      category: "Remote Work",
      readTime: "7 min read"
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
            Career <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert insights, tips, and strategies to accelerate your career growth and job search success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest career tips and resume optimization strategies.
            </p>
            <Button variant="hero" size="lg">
              Subscribe to Newsletter
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;