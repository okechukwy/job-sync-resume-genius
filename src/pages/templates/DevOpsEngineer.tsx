import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const DevOpsEngineer = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
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

      <div className="max-w-6xl mx-auto px-4 py-12 spacing-content">
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-6 hover-scale text-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>🔧</div>
          <Badge variant="secondary" className="mb-6 glass-card typography-caption hover-scale" style={{ animationDelay: "0.2s" }}>
            DevOps Engineer Template
          </Badge>
          <h1 className="typography-display text-4xl md:text-5xl font-bold mb-6 text-contrast-high animate-fade-in" style={{ animationDelay: "0.3s" }}>
            DevOps Engineer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="typography-body text-lg text-contrast-medium max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Tailored for DevOps and infrastructure professionals. 
            Perfect for showcasing automation and cloud expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Infrastructure</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Cloud</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Technical</Badge>
          </div>
        </div>

        <div className="spacing-grid grid grid-cols-1 lg:grid-cols-2 mb-12">
          <Card className="glass-card hover-lift animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <CardHeader className="spacing-content">
              <CardTitle className="typography-heading flex items-center gap-2 text-contrast-high">
                <Eye className="w-5 h-5 text-primary" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-8 rounded-xl shadow-lg min-h-[600px] border hover-lift animate-fade-in">
                <div className="spacing-content">
                  <div className="bg-gradient-to-r from-green-900 to-emerald-900 text-white rounded-xl p-8 -mx-8 -mt-8 mb-8">
                    <h2 className="typography-heading text-3xl font-bold mb-3">Chris Infrastructure</h2>
                    <p className="typography-body text-green-100 font-medium text-lg">Senior DevOps Engineer</p>
                    <p className="typography-caption text-green-200 mt-2">chris.devops@cloud.com | (555) 123-4567 | AWS Certified</p>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-green-600 pl-4">TECHNICAL SUMMARY</h3>
                    <p className="resume-content-text">
                      DevOps engineer with 7+ years automating infrastructure and CI/CD pipelines...
                    </p>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-green-600 pl-4">INFRASTRUCTURE SKILLS</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-green-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        AWS, Azure, GCP
                      </div>
                      <div className="text-green-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        Docker, Kubernetes
                      </div>
                      <div className="text-green-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        Terraform, Ansible
                      </div>
                      <div className="text-green-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        Jenkins, GitLab CI
                      </div>
                    </div>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-green-600 pl-4">EXPERIENCE</h3>
                    <div className="bg-contrast-medium rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="typography-heading font-semibold text-lg text-contrast-high">Senior DevOps Engineer</h4>
                          <p className="typography-body text-contrast-medium font-medium">Cloud Solutions Corp</p>
                        </div>
                        <span className="resume-meta-text text-green-600">2020 - Present</span>
                      </div>
                      <ul className="space-y-2 resume-content-text">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          Reduced deployment time by 80% through automation
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          Managed infrastructure for 50+ microservices
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Infrastructure Automation</h4>
                    <p className="text-sm text-muted-foreground">Highlight your automation and IaC expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Cloud Certifications</h4>
                    <p className="text-sm text-muted-foreground">Showcase AWS, Azure, and GCP credentials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Performance Metrics</h4>
                    <p className="text-sm text-muted-foreground">Quantify deployment and uptime improvements</p>
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
                    DevOps Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Site Reliability Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Cloud Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Infrastructure Specialists
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

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

export default DevOpsEngineer;