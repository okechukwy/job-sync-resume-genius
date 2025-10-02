import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
const CareerDevelopment = () => {
  const sections = [{
    title: "Building Your Personal Brand",
    content: ["Define your unique value proposition and professional identity", "Create consistent messaging across LinkedIn, resume, and portfolio", "Develop thought leadership through content creation and speaking", "Build an online presence that showcases your expertise", "Network authentically and maintain professional relationships"]
  }, {
    title: "Networking Strategies That Work",
    content: ["Quality over quantity: focus on meaningful connections", "Attend industry events, conferences, and professional meetups", "Leverage LinkedIn for professional networking and outreach", "Offer value first before asking for favors or opportunities", "Follow up consistently and maintain long-term relationships"]
  }, {
    title: "Leadership Development Resources",
    content: ["Take on stretch assignments and leadership opportunities", "Develop emotional intelligence and communication skills", "Learn to delegate effectively and empower team members", "Study successful leaders in your industry and beyond", "Seek mentorship and consider becoming a mentor yourself"]
  }, {
    title: "Skill Development Roadmaps",
    content: ["Identify in-demand skills for your industry and role", "Create a learning plan with specific goals and timelines", "Mix formal education with online courses and certifications", "Practice new skills through projects and real-world application", "Stay current with industry trends and emerging technologies"]
  }, {
    title: "Career Transition Planning",
    content: ["Assess your transferable skills and identify gaps", "Research target roles and required qualifications", "Build bridges through networking and informational interviews", "Consider lateral moves that provide relevant experience", "Plan financially for potential salary changes during transition"]
  }];
  return <div className="min-h-screen bg-gradient-hero">
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
              <span className="text-2xl">🚀</span>
              <div>
                <div className="text-xl font-bold gradient-text">Career Development</div>
                
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
              <Badge variant="secondary">Collection</Badge>
              <Badge variant="outline">Long-term Growth</Badge>
            </div>
            <CardTitle className="text-2xl">Accelerate Your Career Development</CardTitle>
            <CardDescription className="text-base">
              Comprehensive resources for advancing your career and achieving professional growth. 
              Build the skills, network, and strategy needed for long-term success.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => <Card key={index} className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.content.map((item, idx) => <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Call to Action */}
        <Card className="glass-card mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Advance Your Career?</h3>
            <p className="text-muted-foreground mb-6">
              Start with a professional resume that opens doors to new opportunities.
            </p>
            <Link to="/get-started">
              <Button variant="hero" size="lg">
                Build My Future
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default CareerDevelopment;