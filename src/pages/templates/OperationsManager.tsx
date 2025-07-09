import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const OperationsManager = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Operations Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-24 border border-primary/20 rounded-lg transform rotate-6">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-3"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-20 border border-primary/15 rounded-lg transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-18 border border-primary/12 rounded-md transform rotate-8"></div>
      </div>
      
      {/* Gear Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-12 h-12 border border-primary/15 rounded-full"></div>
        <div className="absolute top-1/4 left-1/6 w-8 h-8 border border-primary/12 rounded-full ml-2 mt-2"></div>
        <div className="absolute bottom-1/3 right-1/5 w-10 h-10 border border-primary/10 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-6 h-6 border border-primary/8 rounded-full ml-2 mt-2"></div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">⚙️</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Operations Manager Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Operations Manager{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Operational excellence and process optimization. 
            Perfect for showcasing your efficiency improvements and management achievements.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Operations</Badge>
            <Badge variant="outline" className="hover-scale">Efficiency</Badge>
            <Badge variant="outline" className="hover-scale">Management</Badge>
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
                  <div className="border-b-2 border-blue-200 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900">Michael Operations</h2>
                    <p className="text-blue-600 font-medium">Senior Operations Manager</p>
                    <p className="text-sm text-gray-600">mike.ops@company.com | (555) 123-4567 | LinkedIn: /in/mikeops</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">OPERATIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Results-driven operations manager with 10+ years optimizing processes and driving efficiency...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Process Optimization</div>
                      <div>• Supply Chain Management</div>
                      <div>• Quality Control</div>
                      <div>• Team Leadership</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Operations Manager</h4>
                          <span className="text-sm text-blue-600 font-medium">2018 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Global Manufacturing Corp</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Reduced operational costs by 25% through process improvements</li>
                          <li>Led team of 50+ employees across multiple departments</li>
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
                    <p className="text-sm text-muted-foreground">Highlight efficiency gains and cost savings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Leadership Metrics</h4>
                    <p className="text-sm text-muted-foreground">Showcase team management and operational results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Quality Focus</h4>
                    <p className="text-sm text-muted-foreground">Demonstrate quality control and compliance expertise</p>
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
                    Operations Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Supply Chain Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Process Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Plant Managers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Operations Manager" />
      </div>
    </div>
  );
};

export default OperationsManager;