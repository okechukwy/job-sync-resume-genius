import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
const ATSOptimization = () => {
  const sections = [{
    title: "Understanding How ATS Systems Work",
    content: ["ATS (Applicant Tracking System) scans and parses resume content", "Systems look for specific keywords and phrases from job descriptions", "Formatting and structure affect how well ATS can read your resume", "Most large companies use ATS to filter applications before human review"]
  }, {
    title: "Keyword Optimization Strategies",
    content: ["Mirror the language used in job descriptions", "Include both acronyms and full terms (e.g., 'AI' and 'Artificial Intelligence')", "Use industry-standard job titles and skill names", "Incorporate keywords naturally throughout your resume"]
  }, {
    title: "Formatting for ATS Compatibility",
    content: ["Use standard fonts like Arial, Calibri, or Times New Roman", "Avoid complex formatting, tables, and graphics", "Use standard section headings (Experience, Education, Skills)", "Save and submit as both PDF and Word formats when possible"]
  }, {
    title: "Testing Your Resume Through ATS",
    content: ["Use free ATS scanning tools to test your resume", "Check keyword density and match percentage", "Ensure all sections are properly parsed", "Make adjustments based on scanning results"]
  }, {
    title: "Industry-Specific ATS Requirements",
    content: ["Tech roles: Include programming languages and technical skills", "Healthcare: Emphasize certifications and medical terminology", "Finance: Highlight relevant regulations and compliance experience", "Marketing: Focus on campaign metrics and digital marketing tools"]
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
              <span className="text-2xl">🎯</span>
              <div>
                <div className="text-xl font-bold gradient-text">ATS Optimization Tips</div>
                
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
              <Badge variant="secondary">Tutorial</Badge>
              <Badge variant="outline">Essential</Badge>
            </div>
            <CardTitle className="text-2xl">Master ATS Optimization for Your Resume</CardTitle>
            <CardDescription className="text-base">
              Learn how to optimize your resume for Applicant Tracking Systems and increase your chances 
              of getting past the initial screening process.
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
            <h3 className="text-2xl font-bold mb-4">Test Your Resume Now</h3>
            <p className="text-muted-foreground mb-6">
              Use our AI-powered resume builder to create an ATS-optimized resume that gets results.
            </p>
            <Link to="/get-started">
              <Button variant="hero" size="lg">
                Optimize My Resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default ATSOptimization;