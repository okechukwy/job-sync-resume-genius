import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const UxUiDesigner = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* UX/UI Design Background Pattern */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-20 left-16 w-24 h-24 border border-primary/20 rounded-lg transform rotate-12">
          <div className="absolute inset-2 border border-primary/15 rounded-md transform -rotate-6"></div>
        </div>
        <div className="absolute bottom-32 right-20 w-20 h-20 border border-primary/15 rounded-full">
          <div className="absolute inset-3 bg-primary/8 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-primary/10 transform rotate-45"></div>
      </div>
      
      {/* Design Grid Lines */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/8 to-transparent"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">📐</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            UX/UI Designer Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            UX/UI Designer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            User experience and interface design roles. 
            Perfect for showcasing your design process and user-centered approach.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">UX/UI</Badge>
            <Badge variant="outline" className="hover-scale">User-Centered</Badge>
            <Badge variant="outline" className="hover-scale">Modern</Badge>
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
              <div className="bg-white p-6 rounded-lg shadow-lg min-h-[600px] border">
                <div className="space-y-4">
                  <div className="border-b-2 border-teal-200 pb-4">
                    <h2 className="text-2xl font-bold text-teal-900">Emma Designer</h2>
                    <p className="text-teal-600 font-medium">Senior UX/UI Designer</p>
                    <p className="text-sm text-gray-600">emma.design@ux.com | (555) 123-4567 | Portfolio: emmadesigns.com</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">DESIGN PHILOSOPHY</h3>
                    <p className="text-sm text-gray-700">
                      User-centered designer with 6+ years creating intuitive digital experiences...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">DESIGN SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Figma, Sketch, Adobe XD</div>
                      <div>• User Research & Testing</div>
                      <div>• Wireframing & Prototyping</div>
                      <div>• Design Systems</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior UX/UI Designer</h4>
                          <span className="text-sm text-teal-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Digital Innovation Co.</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Redesigned mobile app increasing user engagement by 60%</li>
                          <li>Led design system implementation across 5 product teams</li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
                    <h4 className="font-medium">Design Process Showcase</h4>
                    <p className="text-sm text-muted-foreground">Highlight your UX research and design methodology</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Portfolio Integration</h4>
                    <p className="text-sm text-muted-foreground">Seamless links to your design portfolio and case studies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">User Impact Metrics</h4>
                    <p className="text-sm text-muted-foreground">Quantify your design impact on user experience</p>
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
                    UX Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    UI Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Product Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Interaction Designers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="UX/UI Designer" />
      </div>
    </div>
  );
};

export default UxUiDesigner;