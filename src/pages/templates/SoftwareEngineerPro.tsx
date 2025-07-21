import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";
import { ResumeLayoutRenderer } from "@/components/resume-layouts/ResumeLayoutRenderer";
import { techProfessionalSample, templateStyles } from "@/data/sampleResumeData";

const SoftwareEngineerPro = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Tech Industry Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-16 h-16 border border-primary/20">
          <div className="absolute inset-2 border border-primary/15"></div>
          <div className="absolute inset-4 bg-primary/10"></div>
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 border border-primary/15 rotate-45"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 border border-primary/10">
          <div className="absolute inset-3 border border-primary/8 rotate-45"></div>
        </div>
      </div>
      
      {/* Circuit-like Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute top-64 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
        <div className="absolute left-32 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute right-48 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/15 to-transparent"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">⚡</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Software Engineer Pro Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Software Engineer Pro{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Specialized for full-stack and backend developers. 
            Perfect for showcasing your technical expertise and coding achievements.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Code-Focused</Badge>
            <Badge variant="outline" className="hover-scale">Technical</Badge>
            <Badge variant="outline" className="hover-scale">ATS-Ready</Badge>
          </div>
        </div>

        {/* Template Preview and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 spacing-grid mb-12">
          <Card className="glass-card hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="visual-hierarchy-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg shadow-lg min-h-[600px] border overflow-hidden">
                <div className="scale-75 origin-top-left w-[133%] h-[133%]">
                  <ResumeLayoutRenderer 
                    data={techProfessionalSample}
                    templateId="software-engineer"
                    formatDate={(date) => {
                      if (!date) return '';
                      const [year, month] = date.split('-');
                      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      return `${monthNames[parseInt(month) - 1]} ${year}`;
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Details */}
          <div className="spacing-content">
            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Technical Skills Section</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive tech stack and programming languages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Project Highlights</h4>
                    <p className="text-sm text-muted-foreground">Showcase your best development projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Code Repository Links</h4>
                    <p className="text-sm text-muted-foreground">Direct links to GitHub and portfolio projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Full-Stack Developers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Backend Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Software Architects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Senior Developers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Software Engineer Pro" />
      </div>
    </div>
  );
};

export default SoftwareEngineerPro;