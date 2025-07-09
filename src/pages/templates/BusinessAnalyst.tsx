import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const BusinessAnalyst = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Analytics Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-24 border border-primary/20 rounded-lg transform rotate-3">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-6"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-20 border border-primary/15 rounded-lg transform -rotate-8"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-18 border border-primary/12 rounded-md transform rotate-12"></div>
      </div>
      
      {/* Data Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 grid grid-cols-3 gap-1">
          <div className="w-2 h-8 bg-primary/15 rounded-sm"></div>
          <div className="w-2 h-6 bg-primary/12 rounded-sm"></div>
          <div className="w-2 h-10 bg-primary/10 rounded-sm"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 w-16 h-16 border border-primary/12 rounded-full">
          <div className="absolute inset-2 border border-primary/8 rounded-full"></div>
        </div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">📊</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Business Analyst Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Business Analyst{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Business analysis and process improvement. 
            Perfect for showcasing your analytical skills and process optimization expertise.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Analytical</Badge>
            <Badge variant="outline" className="hover-scale">Process</Badge>
            <Badge variant="outline" className="hover-scale">Strategic</Badge>
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
                  <div className="border-b-2 border-teal-200 pb-4">
                    <h2 className="text-2xl font-bold text-teal-900">Jordan Analytics</h2>
                    <p className="text-teal-600 font-medium">Senior Business Analyst</p>
                    <p className="text-sm text-gray-600">jordan.ba@company.com | (555) 123-4567 | CBAP Certified</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Strategic business analyst with 6+ years driving process improvements and data-driven solutions...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Requirements Analysis</div>
                      <div>• Process Modeling</div>
                      <div>• Data Analysis</div>
                      <div>• Stakeholder Management</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Business Analyst</h4>
                          <span className="text-sm text-teal-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Enterprise Solutions Inc.</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Improved business processes resulting in 30% efficiency gains</li>
                          <li>Led requirements gathering for $2M+ IT initiatives</li>
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
                    <h4 className="font-medium">Process Improvements</h4>
                    <p className="text-sm text-muted-foreground">Showcase efficiency gains and optimization results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Requirements Expertise</h4>
                    <p className="text-sm text-muted-foreground">Highlight stakeholder management and analysis skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Data-Driven Solutions</h4>
                    <p className="text-sm text-muted-foreground">Display analytical thinking and problem-solving abilities</p>
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
                    Business Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Systems Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Process Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Data Analysts
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Business Analyst" />
      </div>
    </div>
  );
};

export default BusinessAnalyst;