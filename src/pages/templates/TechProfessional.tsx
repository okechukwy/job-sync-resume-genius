import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";
import { ResumeLayoutRenderer } from "@/components/resume-layouts/ResumeLayoutRenderer";
import { techProfessionalSample, templateStyles } from "@/data/sampleResumeData";

const TechProfessional = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Technology Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-24 h-24 border border-primary/20 rounded-lg">
          <div className="absolute inset-3 border border-primary/15 rounded-md">
            <div className="absolute inset-2 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-20 h-20 border border-primary/15 rounded-md"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary/12 rounded-md"></div>
      </div>
      
      {/* Code Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/3 left-1/6 w-32 h-2 bg-primary/15 rounded-sm"></div>
        <div className="absolute top-1/3 left-1/6 w-28 h-2 bg-primary/12 rounded-sm mt-1"></div>
        <div className="absolute top-1/3 left-1/6 w-24 h-2 bg-primary/10 rounded-sm mt-2"></div>
        
        <div className="absolute bottom-1/4 right-1/5 w-2 h-16 bg-primary/12 rounded-sm"></div>
        <div className="absolute bottom-1/4 right-1/5 w-2 h-12 bg-primary/15 rounded-sm ml-2"></div>
        <div className="absolute bottom-1/4 right-1/5 w-2 h-20 bg-primary/10 rounded-sm ml-4"></div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">💻</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Tech Professional Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Tech Professional{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Optimized for software engineers, developers, and IT professionals. 
            Clean, modern design that highlights your technical skills and experience.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">ATS-Optimized</Badge>
            <Badge variant="outline" className="hover-scale">Modern</Badge>
            <Badge variant="outline" className="hover-scale">Clean</Badge>
          </div>
        </div>

        {/* Template Preview and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 spacing-grid mb-12">
          {/* Template Preview */}
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

            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Perfect For</CardTitle>
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

        <TemplateActions templateName="Tech Professional" />
      </div>
    </div>
  );
};

export default TechProfessional;