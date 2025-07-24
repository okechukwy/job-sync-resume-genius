import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  Users, 
  BarChart3, 
  Briefcase, 
  GraduationCap,
  Settings,
  ExternalLink,
  Home,
  Search,
  Clock,
  Star
} from "lucide-react";

const Documentation = () => {
  const serviceCategories = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Resume Tools",
      path: "/dashboard/resume/",
      description: "Create, optimize, and manage professional resumes",
      services: [
        {
          name: "Resume Builder",
          path: "/dashboard/resume/builder",
          description: "Create professional resumes with 50+ templates and AI assistance",
          features: ["Industry-specific templates", "ATS-optimized formatting", "Real-time preview", "AI content suggestions"],
          usage: "Start from scratch or upload existing resume → Choose template → Fill sections → Download optimized resume"
        },
        {
          name: "Templates",
          path: "/dashboard/resume/templates", 
          description: "Browse and select from 50+ professional resume templates",
          features: ["Technology, Healthcare, Finance, Creative, Business categories", "Preview before selection", "Industry-optimized"],
          usage: "Filter by industry → Preview templates → Select and customize"
        },
        {
          name: "ATS Analysis",
          path: "/dashboard/resume/ats-analysis",
          description: "Analyze resume compatibility with Applicant Tracking Systems",
          features: ["Detailed score breakdown", "Optimization tips", "Keyword analysis", "Industry recommendations"],
          usage: "Upload resume → Receive ATS score → Apply suggested improvements"
        },
        {
          name: "Version Management",
          path: "/dashboard/resume/versions",
          description: "Track and manage different resume versions",
          features: ["Version history", "Easy rollback", "Bulk export", "Version comparison"],
          usage: "Create versions for different jobs → Switch between versions → Compare changes"
        }
      ]
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Job Search",
      path: "/dashboard/job-search/",
      description: "Match, track, and optimize job applications",
      services: [
        {
          name: "Job Matching",
          path: "/dashboard/job-search/matching",
          description: "Match resumes with job descriptions for better targeting",
          features: ["Keyword analysis", "Skills gap detection", "Match score rating", "Improvement suggestions"],
          usage: "Upload job posting → Analyze match score → Optimize resume accordingly"
        },
        {
          name: "Performance Tracking",
          path: "/dashboard/job-search/performance",
          description: "Track job application success rates and analytics",
          features: ["Application tracking", "Success metrics", "Performance insights", "Analytics dashboard"],
          usage: "Log applications → Track responses → Analyze success patterns"
        },
        {
          name: "Cover Letter Generator",
          path: "/dashboard/job-search/cover-letter",
          description: "Generate personalized cover letters with AI",
          features: ["Context-aware writing", "Tone customization", "Company research", "Multiple formats"],
          usage: "Input job details → Generate tailored cover letter → Customize and download"
        }
      ]
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Career Development",
      path: "/dashboard/career/",
      description: "Develop skills and advance your career",
      services: [
        {
          name: "AI Interview Prep",
          path: "/dashboard/career/interview-prep",
          description: "Practice interviews with AI-powered feedback",
          features: ["Mock interview sessions", "Real-time feedback", "Industry-specific questions", "Performance tracking"],
          usage: "Select interview type → Practice with AI → Receive feedback → Improve responses"
        },
        {
          name: "LinkedIn Optimization", 
          path: "/dashboard/career/linkedin",
          description: "Optimize LinkedIn profiles for better visibility",
          features: ["Profile scoring", "Keyword optimization", "Headline generator", "Content suggestions"],
          usage: "Input profile data → Receive optimization suggestions → Generate headlines/summaries"
        },
        {
          name: "Personal Branding",
          path: "/dashboard/career/branding", 
          description: "Build compelling personal brand with strategy guidance",
          features: ["Brand strategy development", "Content generation", "Audience analysis", "Brand consistency"],
          usage: "Define brand positioning → Generate content → Maintain consistency"
        },
        {
          name: "Career Coaching",
          path: "/dashboard/career/coaching",
          description: "Receive personalized career development guidance", 
          features: ["Career roadmaps", "Skill gap analysis", "Goal setting", "Progress tracking"],
          usage: "Set career goals → Receive coaching insights → Track progress"
        }
      ]
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Resources & Support",
      path: "/dashboard/resources/",
      description: "Access guides, support, and help resources",
      services: [
        {
          name: "Resources",
          path: "/dashboard/resources",
          description: "Access comprehensive career development guides",
          features: ["Resume Writing Guide (15 min)", "ATS Optimization (12 min)", "Interview Prep (25 min)", "Salary Negotiation (18 min)"],
          usage: "Browse by topic → Follow step-by-step guides → Apply learnings"
        },
        {
          name: "Priority Support",
          path: "/dashboard/support",
          description: "Access premium support services",
          features: ["24/7 availability", "Priority queue", "Dedicated support", "Instant resolution"],
          usage: "Submit support requests → Get priority assistance → Resolve issues quickly"
        },
        {
          name: "Help Center",
          path: "/dashboard/help",
          description: "Self-service help and FAQs",
          features: ["Searchable knowledge base", "Video tutorials", "Common solutions", "Step-by-step guides"],
          usage: "Search for help topics → Follow tutorials → Find solutions"
        }
      ]
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Advanced",
      path: "/dashboard/exports/",
      description: "Enterprise features and advanced exports",
      services: [
        {
          name: "White Label Exports",
          path: "/dashboard/exports",
          description: "Enterprise-level custom branding and bulk exports",
          features: ["Custom branding", "Bulk export capabilities", "API integration", "White-label solutions"],
          usage: "Configure branding → Set up export jobs → Manage client exports"
        }
      ]
    }
  ];

  const quickNavigation = [
    { icon: <Home className="h-4 w-4" />, title: "Dashboard Home", path: "/dashboard", description: "Central hub with statistics and quick actions" },
    { icon: <FileText className="h-4 w-4" />, title: "Resume Builder", path: "/dashboard/resume/builder", description: "Start creating resumes immediately" },
    { icon: <BarChart3 className="h-4 w-4" />, title: "ATS Analysis", path: "/dashboard/resume/ats-analysis", description: "Check resume compatibility" },
    { icon: <Search className="h-4 w-4" />, title: "Job Matching", path: "/dashboard/job-search/matching", description: "Match resumes to job postings" }
  ];

  const getStartedWorkflow = [
    { step: 1, title: "Sign Up", path: "/auth", description: "Create your account to access all features" },
    { step: 2, title: "Complete Profile", path: "/dashboard", description: "Fill in your professional information" },
    { step: 3, title: "Build Resume", path: "/dashboard/resume/builder", description: "Create your first professional resume" },
    { step: 4, title: "Optimize for ATS", path: "/dashboard/resume/ats-analysis", description: "Ensure your resume passes ATS systems" },
    { step: 5, title: "Track Applications", path: "/dashboard/job-search/performance", description: "Monitor your job search success" }
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">ResumeAI Documentation</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete guide to navigating and using all services in your career development platform
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">50+ Templates</Badge>
          <Badge variant="secondary">AI-Powered</Badge>
          <Badge variant="secondary">ATS-Optimized</Badge>
          <Badge variant="secondary">Enterprise Ready</Badge>
        </div>
      </div>

      {/* Quick Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Quick Access
          </CardTitle>
          <CardDescription>
            Jump directly to the most popular features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickNavigation.map((item) => (
              <Button key={item.path} variant="outline" asChild className="h-auto p-4 justify-start">
                <Link to={item.path}>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Getting Started Workflow
          </CardTitle>
          <CardDescription>
            Follow this path for the best experience as a new user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getStartedWorkflow.map((item, index) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{item.title}</h4>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={item.path}>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < getStartedWorkflow.length - 1 && (
                  <div className="absolute left-4 mt-8 w-px h-6 bg-border" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Categories */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Complete Service Guide</h2>
        
        {serviceCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.title}
                <Badge variant="outline">{category.services.length} services</Badge>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.services.map((service, index) => (
                <div key={service.name}>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="text-lg font-semibold flex items-center gap-2">
                          {service.name}
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={service.path}>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                        </h4>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Key Features</h5>
                        <ul className="space-y-1">
                          {service.features.map((feature) => (
                            <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">How to Use</h5>
                        <p className="text-sm text-muted-foreground">{service.usage}</p>
                      </div>
                    </div>
                  </div>
                  
                  {index < category.services.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Tips</CardTitle>
          <CardDescription>Make the most of your platform experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Desktop Navigation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use the sidebar for quick access to all services</li>
                <li>• Breadcrumbs show your current location</li>
                <li>• Dashboard home provides overview and quick actions</li>
                <li>• Search functionality helps find specific features</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Mobile Experience</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Collapsible sidebar optimized for mobile</li>
                <li>• Touch-friendly controls throughout</li>
                <li>• Responsive design adapts to all screen sizes</li>
                <li>• Swipe gestures for navigation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
          <CardDescription>Recommended workflows for optimal results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Resume Creation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Start with industry-appropriate template</li>
                <li>• Use ATS analysis to optimize</li>
                <li>• Create versions for different job types</li>
                <li>• Track performance to improve</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Job Search</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use job matching for each application</li>
                <li>• Generate custom cover letters</li>
                <li>• Track all applications</li>
                <li>• Analyze success patterns</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Career Development</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Regular LinkedIn optimization</li>
                <li>• Practice interviews consistently</li>
                <li>• Build personal brand systematically</li>
                <li>• Set and track career goals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              This documentation is automatically updated as new features are added.
            </p>
            <p className="text-sm text-muted-foreground">
              Need help? Visit our <Link to="/dashboard/help" className="text-primary hover:underline">Help Center</Link> or contact <Link to="/dashboard/support" className="text-primary hover:underline">Priority Support</Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentation;