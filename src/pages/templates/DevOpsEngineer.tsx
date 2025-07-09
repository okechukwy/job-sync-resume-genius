import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const DevOpsEngineer = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* DevOps Infrastructure Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-24 left-20 w-20 h-12 border border-primary/20 rounded-sm">
          <div className="absolute inset-2 border border-primary/15">
            <div className="absolute inset-1 bg-primary/10"></div>
          </div>
        </div>
        <div className="absolute bottom-40 right-24 w-16 h-10 border border-primary/15 rounded-sm transform rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-18 h-8 border border-primary/12 rounded-sm transform -rotate-6"></div>
      </div>
      
      {/* Pipeline Connection Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/3 left-10 w-48 h-px bg-gradient-to-r from-primary/15 via-primary/20 to-primary/10"></div>
        <div className="absolute bottom-1/3 right-12 w-40 h-px bg-gradient-to-l from-primary/12 via-primary/18 to-primary/8"></div>
        
        <div className="absolute left-1/4 top-16 w-px h-32 bg-gradient-to-b from-primary/12 via-primary/15 to-primary/8"></div>
        <div className="absolute right-1/3 bottom-20 w-px h-28 bg-gradient-to-t from-primary/10 via-primary/12 to-primary/6"></div>
      </div>
      <PageHeader />

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

        <TemplateActions templateName="DevOps Engineer" />
      </div>
    </div>
  );
};

export default DevOpsEngineer;