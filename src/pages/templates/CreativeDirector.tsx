import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";
import { ResumeLayoutRenderer } from "@/components/resume-layouts/ResumeLayoutRenderer";
import { creativeProfessionalSample, templateStyles } from "@/data/sampleResumeData";

const CreativeDirector = () => {
  return (
    <div className="min-h-screen bg-gradient-creative relative overflow-hidden">
      {/* Creative Background with Artistic Elements */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute top-20 left-16 w-32 h-2 bg-gradient-to-r from-creative-primary to-creative-secondary transform rotate-12"></div>
        <div className="absolute top-40 right-24 w-24 h-3 bg-gradient-to-l from-creative-accent to-transparent transform -rotate-6"></div>
        <div className="absolute bottom-60 left-1/3 w-40 h-1 bg-gradient-to-r from-transparent via-creative-primary to-transparent transform rotate-45"></div>
        <div className="absolute bottom-32 right-1/4 w-28 h-2 bg-gradient-to-l from-creative-secondary to-transparent transform -rotate-12"></div>
        
        {/* Artistic brush strokes */}
        <svg className="absolute top-1/4 left-1/4 opacity-10" width="200" height="100" viewBox="0 0 200 100">
          <path d="M10,50 Q50,10 100,50 T190,50" stroke="hsl(var(--creative-primary))" strokeWidth="3" fill="none" />
          <path d="M10,30 Q80,70 150,30" stroke="hsl(var(--creative-accent))" strokeWidth="2" fill="none" />
        </svg>
        
        <svg className="absolute bottom-1/3 right-1/3 opacity-10" width="150" height="80" viewBox="0 0 150 80">
          <path d="M20,40 Q60,10 100,40 T140,40" stroke="hsl(var(--creative-secondary))" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎯</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Creative Director Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Creative Director{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Executive design for creative leaders. 
            Perfect for showcasing your strategic vision, team leadership, and industry-changing creative work.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Visionary</Badge>
            <Badge variant="outline">Strategic</Badge>
            <Badge variant="outline">Award-Winning</Badge>
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
              <div className="bg-white p-4 rounded-lg shadow-lg min-h-[600px] border overflow-hidden">
                <div className="scale-75 origin-top-left w-[133%] h-[133%]">
                  <ResumeLayoutRenderer 
                    data={creativeProfessionalSample}
                    styles={templateStyles.creative}
                    layoutVariant="classic-professional"
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

          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Executive Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Showcase industry-leading campaigns and strategic vision</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Leadership Impact</h4>
                    <p className="text-sm text-muted-foreground">Highlight team leadership and organizational transformation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Industry Recognition</h4>
                    <p className="text-sm text-muted-foreground">Display prestigious awards and creative achievements</p>
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
                    Creative Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Executive Creative Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Chief Creative Officers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Creative Strategists
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Creative Director" />
      </div>
    </div>
  );
};

export default CreativeDirector;