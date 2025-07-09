import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">ResumeAI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering job seekers with AI-powered resume optimization to land their dream careers.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At ResumeAI, we believe that everyone deserves the opportunity to showcase their best professional self. 
                Our mission is to democratize access to high-quality resume optimization tools, helping job seekers 
                at all levels create compelling resumes that get noticed by employers and pass through ATS systems.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We leverage cutting-edge AI technology to analyze and optimize resumes for maximum impact:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• AI-powered resume analysis and optimization</li>
                <li>• ATS compatibility checks and improvements</li>
                <li>• Industry-specific template recommendations</li>
                <li>• Job matching and application tracking</li>
                <li>• Cover letter generation and customization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded by a team of HR professionals, career coaches, and AI engineers, ResumeAI was born from 
                the frustration of seeing qualified candidates overlooked due to poorly optimized resumes. 
                We combine deep industry knowledge with advanced technology to bridge the gap between 
                talent and opportunity.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuously advancing our AI technology to provide the most effective resume optimization.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Making professional resume services available to everyone, regardless of budget or background.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Delivering results that make a real difference in our users' job search success.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Providing exceptional customer service and career guidance throughout the journey.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;