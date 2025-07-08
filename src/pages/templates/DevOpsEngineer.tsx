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

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔧</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            DevOps Engineer Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            DevOps Engineer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored for DevOps and infrastructure professionals. 
            Perfect for showcasing automation and cloud expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Infrastructure</Badge>
            <Badge variant="outline">Cloud</Badge>
            <Badge variant="outline">Technical</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg shadow-lg min-h-[600px] border">
                <div className="space-y-4">
                  <div className="border-b-2 border-green-200 pb-4">
                    <h2 className="text-2xl font-bold text-green-900">Chris Infrastructure</h2>
                    <p className="text-green-600 font-medium">Senior DevOps Engineer</p>
                    <p className="text-sm text-gray-600">chris.devops@cloud.com | (555) 123-4567 | AWS Certified</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">TECHNICAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      DevOps engineer with 7+ years automating infrastructure and CI/CD pipelines...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">INFRASTRUCTURE SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• AWS, Azure, GCP</div>
                      <div>• Docker, Kubernetes</div>
                      <div>• Terraform, Ansible</div>
                      <div>• Jenkins, GitLab CI</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior DevOps Engineer</h4>
                          <span className="text-sm text-green-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Cloud Solutions Corp</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Reduced deployment time by 80% through automation</li>
                          <li>Managed infrastructure for 50+ microservices</li>
                        </ul>
                      </div>
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