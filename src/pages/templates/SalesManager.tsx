import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const SalesManager = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Sales Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-24 border border-primary/20 rounded-lg transform rotate-3">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-6"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-20 border border-primary/15 rounded-lg transform -rotate-8"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-18 border border-primary/12 rounded-md transform rotate-12"></div>
      </div>
      
      {/* Chart Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-16 h-2 bg-primary/15 rounded-full"></div>
        <div className="absolute top-1/4 left-1/6 w-12 h-2 bg-primary/12 rounded-full mt-1"></div>
        <div className="absolute top-1/4 left-1/6 w-20 h-2 bg-primary/10 rounded-full mt-2"></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-16 bg-primary/12 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-12 bg-primary/15 rounded-full ml-1"></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-20 bg-primary/10 rounded-full ml-2"></div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">📈</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Sales Manager Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Sales Manager{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Sales leadership and business development. 
            Perfect for showcasing your revenue growth and team leadership achievements.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Sales</Badge>
            <Badge variant="outline" className="hover-scale">Leadership</Badge>
            <Badge variant="outline" className="hover-scale">Results</Badge>
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
                  <div className="border-b-2 border-green-200 pb-4">
                    <h2 className="text-2xl font-bold text-green-900">Sarah Revenue</h2>
                    <p className="text-green-600 font-medium">Senior Sales Manager</p>
                    <p className="text-sm text-gray-600">sarah.sales@company.com | (555) 123-4567 | LinkedIn: /in/sarahsales</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">SALES SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      High-performing sales manager with 8+ years driving revenue growth and leading winning teams...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Revenue Growth</div>
                      <div>• Team Leadership</div>
                      <div>• Client Relations</div>
                      <div>• Strategic Planning</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Sales Manager</h4>
                          <span className="text-sm text-green-600 font-medium">2019 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">TechCorp Solutions</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Exceeded sales targets by 150% for 3 consecutive years</li>
                          <li>Built and managed team of 12 sales representatives</li>
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
                    <h4 className="font-medium">Revenue Metrics</h4>
                    <p className="text-sm text-muted-foreground">Showcase sales achievements and growth percentages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Team Leadership</h4>
                    <p className="text-sm text-muted-foreground">Highlight team building and management success</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Client Success</h4>
                    <p className="text-sm text-muted-foreground">Display client relationships and retention rates</p>
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
                    Sales Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Business Development
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Account Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Sales Directors
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Sales Manager" />
      </div>
    </div>
  );
};

export default SalesManager;