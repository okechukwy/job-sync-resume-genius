import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const ProductManagerTech = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Product Management Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-24 h-24 border border-primary/20 rounded-lg">
          <div className="absolute inset-3 border border-primary/15 rounded-md">
            <div className="absolute inset-2 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-20 h-20 border border-primary/15 rounded-md transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary/12 rounded-lg transform -rotate-12"></div>
      </div>
      
      {/* Product Roadmap Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/3 left-1/6 w-32 h-px bg-primary/15"></div>
        <div className="absolute top-1/3 left-1/6 w-4 h-4 bg-primary/20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/6 w-3 h-3 bg-primary/15 rounded-full ml-12"></div>
        <div className="absolute top-1/3 left-1/6 w-3 h-3 bg-primary/12 rounded-full ml-24"></div>
        <div className="absolute top-1/3 left-1/6 w-4 h-4 bg-primary/18 rounded-full ml-32"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚀</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Tech Product Manager Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tech Product Manager{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strategic design for product leaders. 
            Perfect for showcasing product strategy, roadmap planning, and cross-functional leadership.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Strategic</Badge>
            <Badge variant="outline">Leadership</Badge>
            <Badge variant="outline">Data-Driven</Badge>
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
                  <div className="border-b-2 border-indigo-200 pb-4">
                    <h2 className="text-2xl font-bold text-indigo-900">Alex ProductLead</h2>
                    <p className="text-indigo-600 font-medium">Senior Tech Product Manager</p>
                    <p className="text-sm text-gray-600">a.productlead@techcorp.com | (555) 123-4567 | MBA, PMP</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-2 border-l-4 border-indigo-400 pl-3">PRODUCT EXPERTISE</h3>
                    <p className="text-sm text-gray-700">
                      Product manager with 8+ years driving product strategy and launching successful digital products...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-2 border-l-4 border-indigo-400 pl-3">CORE SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Product Strategy</div>
                      <div>• Roadmap Planning</div>
                      <div>• Data Analysis</div>
                      <div>• Agile/Scrum</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-2 border-l-4 border-indigo-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Product Manager</h4>
                          <span className="text-sm text-indigo-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">TechFlow Solutions</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Launched 5 products generating $10M+ revenue</li>
                          <li>Increased user engagement by 40%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-2 border-l-4 border-indigo-400 pl-3">TOOLS & METHODS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• JIRA, Confluence</div>
                      <div>• Google Analytics, Mixpanel</div>
                      <div>• Design Thinking, Lean Startup</div>
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
                    <h4 className="font-medium">Product Impact</h4>
                    <p className="text-sm text-muted-foreground">Showcase revenue growth and user engagement metrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Strategic Vision</h4>
                    <p className="text-sm text-muted-foreground">Highlight roadmap planning and strategic thinking</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Cross-Functional Leadership</h4>
                    <p className="text-sm text-muted-foreground">Display team collaboration and stakeholder management</p>
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
                    Product Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Product Owners
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Product Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Technical Product Managers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Product Manager Tech" />
      </div>
    </div>
  );
};

export default ProductManagerTech;