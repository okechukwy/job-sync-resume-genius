import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const HrManager = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* HR Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-24 border border-primary/20 rounded-lg transform rotate-6">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-3"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-20 border border-primary/15 rounded-lg transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-18 border border-primary/12 rounded-md transform rotate-8"></div>
      </div>
      
      {/* People Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 flex gap-2">
          <div className="w-6 h-6 bg-primary/15 rounded-full"></div>
          <div className="w-6 h-6 bg-primary/12 rounded-full"></div>
          <div className="w-6 h-6 bg-primary/10 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 w-12 h-12 border border-primary/12 rounded-full">
          <div className="absolute inset-2 border border-primary/8 rounded-full"></div>
        </div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">👥</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            HR Manager Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            HR Manager{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Human resources and talent management. 
            Perfect for showcasing your people-focused leadership and HR expertise.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">HR</Badge>
            <Badge variant="outline" className="hover-scale">People-Focused</Badge>
            <Badge variant="outline" className="hover-scale">Leadership</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 spacing-grid mb-12">
          <Card className="glass-card hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="visual-hierarchy-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg shadow-lg min-h-[600px] border">
                <div className="space-y-4">
                  <div className="border-b-2 border-amber-200 pb-4">
                    <h2 className="text-2xl font-bold text-amber-900">Patricia People</h2>
                    <p className="text-amber-600 font-medium">Senior HR Manager</p>
                    <p className="text-sm text-gray-600">patricia.hr@company.com | (555) 123-4567 | SHRM-CP</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2 border-l-4 border-amber-400 pl-3">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Experienced HR manager with 9+ years building high-performing teams and driving organizational culture...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2 border-l-4 border-amber-400 pl-3">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Talent Acquisition</div>
                      <div>• Employee Relations</div>
                      <div>• Performance Management</div>
                      <div>• Compensation & Benefits</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2 border-l-4 border-amber-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior HR Manager</h4>
                          <span className="text-sm text-amber-600 font-medium">2019 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Global Tech Corp</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Reduced employee turnover by 40% through retention initiatives</li>
                          <li>Led recruitment of 200+ employees across multiple departments</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="spacing-content">
            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Talent Management</h4>
                    <p className="text-sm text-muted-foreground">Showcase recruitment success and retention rates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Employee Relations</h4>
                    <p className="text-sm text-muted-foreground">Highlight conflict resolution and engagement initiatives</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Strategic Leadership</h4>
                    <p className="text-sm text-muted-foreground">Display organizational development and culture building</p>
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
                    HR Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Talent Acquisition
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Employee Relations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    HR Directors
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="HR Manager" />
      </div>
    </div>
  );
};

export default HrManager;