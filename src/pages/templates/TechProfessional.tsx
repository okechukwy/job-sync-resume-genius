import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TechProfessional = () => {
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
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💻</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Tech Professional Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tech Professional{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Optimized for software engineers, developers, and IT professionals. 
            Clean, modern design that highlights your technical skills and experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">ATS-Optimized</Badge>
            <Badge variant="outline">Modern</Badge>
            <Badge variant="outline">Clean</Badge>
          </div>
        </div>

        {/* Template Preview and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Template Preview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-8 rounded-xl shadow-lg min-h-[600px] border hover-lift animate-fade-in">
                <div className="spacing-content">
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-8 -mx-8 -mt-8 mb-8">
                    <h2 className="typography-heading text-3xl font-bold mb-3">John Developer</h2>
                    <p className="typography-body text-blue-100 font-medium text-lg">Senior Software Engineer</p>
                    <p className="typography-caption text-blue-200 mt-2">john.developer@email.com | (555) 123-4567 | LinkedIn</p>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-blue-600 pl-4">PROFESSIONAL SUMMARY</h3>
                    <p className="resume-content-text">
                      Experienced software engineer with 5+ years developing scalable web applications using modern technologies and best practices...
                    </p>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-blue-600 pl-4">TECHNICAL SKILLS</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-blue-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        JavaScript, TypeScript, Python
                      </div>
                      <div className="text-blue-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        React, Node.js, Express
                      </div>
                      <div className="text-blue-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        AWS, Docker, Kubernetes
                      </div>
                      <div className="text-blue-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        PostgreSQL, MongoDB
                      </div>
                    </div>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-blue-600 pl-4">EXPERIENCE</h3>
                    <div className="bg-contrast-medium rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="typography-heading font-semibold text-lg text-contrast-high">Senior Software Engineer</h4>
                          <p className="typography-body text-contrast-medium font-medium">Tech Corp Inc.</p>
                        </div>
                        <span className="resume-meta-text text-blue-600">2021 - Present</span>
                      </div>
                      <ul className="space-y-2 resume-content-text">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          Led development of microservices architecture
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          Improved application performance by 40%
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Details */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">ATS-Optimized Format</h4>
                    <p className="text-sm text-muted-foreground">Designed to pass Applicant Tracking Systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Technical Skills Section</h4>
                    <p className="text-sm text-muted-foreground">Dedicated space for programming languages and tools</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Project Highlights</h4>
                    <p className="text-sm text-muted-foreground">Section to showcase your best technical projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Clean Layout</h4>
                    <p className="text-sm text-muted-foreground">Professional and modern design that stands out</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Software Engineers & Developers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    DevOps Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Data Scientists & Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Product Managers (Technical)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    IT Professionals
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button variant="hero" size="lg" className="min-w-48">
                <FileText className="w-4 h-4 mr-2" />
                Use This Template
              </Button>
            </Link>
            <Button variant="glass" size="lg" className="min-w-48">
              <Download className="w-4 h-4 mr-2" />
              Download Sample
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Free to use • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechProfessional;