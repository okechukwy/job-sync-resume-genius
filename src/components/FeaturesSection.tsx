import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🎯",
      title: "Smart Resume Builder",
      description: "Industry-specific templates optimized for ATS systems. Choose from Tech, Healthcare, Finance, and more.",
      badge: "AI-Powered",
      highlights: ["50+ Professional Templates", "ATS-Optimized Formatting", "Real-time Preview"]
    },
    {
      icon: "🔍",
      title: "Job Description Matching",
      description: "Upload any job posting and get instant analysis of how well your resume matches the requirements.",
      badge: "New",
      highlights: ["Keyword Analysis", "Skills Gap Detection", "Match Score Rating"]
    },
    {
      icon: "📊",
      title: "ATS Score Optimization",
      description: "Get detailed insights and actionable suggestions to improve your resume's ATS compatibility score.",
      badge: "Essential",
      highlights: ["Detailed Score Breakdown", "Optimization Tips", "Before/After Comparison"]
    },
    {
      icon: "✍️",
      title: "AI Cover Letter Generator",
      description: "Generate personalized cover letters that perfectly complement your resume and target role.",
      badge: "Premium",
      highlights: ["Context-Aware Writing", "Tone Customization", "Company Research Integration"]
    },
    {
      icon: "📈",
      title: "Performance Tracking",
      description: "Track application success rates and optimize your documents based on real performance data.",
      badge: "Analytics",
      highlights: ["Application Tracking", "Success Metrics", "Improvement Insights"]
    },
    {
      icon: "🔄",
      title: "Version Management",
      description: "Keep track of different resume versions and easily switch between them for different applications.",
      badge: "Productivity",
      highlights: ["Version History", "Easy Rollback", "Bulk Export Options"]
    }
  ];

  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 glass-card">
            ⚡ Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Stand Out</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools helps you create, optimize, and track 
            your job applications with unprecedented precision and efficiency.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const getFeatureLink = (title: string) => {
              switch (title) {
                case "Smart Resume Builder":
                  return "/get-started";
                case "Job Description Matching":
                  return "/job-matching";
                case "ATS Score Optimization":
                  return "/ats-analysis";
                case "AI Cover Letter Generator":
                  return "/cover-letter";
                case "Performance Tracking":
                  return "/performance";
                case "Version Management":
                  return "/versions";
                default:
                  return "/get-started";
              }
            };

            return (
              <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
                <a href={getFeatureLink(feature.title)} className="block h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {feature.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-sm font-medium text-primary">Try this feature →</div>
                    </div>
                  </CardContent>
                </a>
              </Card>
            );
          })}
        </div>

        {/* Process steps */}
        <div className="mt-24">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How It <span className="gradient-text">Works</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Upload or Create", desc: "Start with your existing resume or build from scratch" },
              { step: "2", title: "Analyze & Match", desc: "Upload job descriptions for AI-powered matching" },
              { step: "3", title: "Optimize & Enhance", desc: "Apply AI suggestions to improve your ATS score" },
              { step: "4", title: "Export & Apply", desc: "Download optimized resumes and cover letters" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4 shadow-glow">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;