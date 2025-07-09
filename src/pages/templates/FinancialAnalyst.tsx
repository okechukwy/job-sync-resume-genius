import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const FinancialAnalyst = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Finance Industry Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-24 left-16 w-40 h-1 bg-gradient-to-r from-primary/15 via-primary/25 to-primary/10"></div>
        <div className="absolute top-28 left-20 w-32 h-1 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/5"></div>
        <div className="absolute top-32 left-24 w-24 h-1 bg-gradient-to-r from-primary/8 via-primary/15 to-transparent"></div>
        
        <div className="absolute bottom-32 right-20 w-36 h-1 bg-gradient-to-l from-primary/20 via-primary/15 to-primary/8"></div>
        <div className="absolute bottom-28 right-16 w-28 h-1 bg-gradient-to-l from-primary/15 via-primary/20 to-primary/10"></div>
      </div>
      
      {/* Chart-like Grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute bottom-20 left-1/4 w-48 h-32 border-l border-b border-primary/20">
          <div className="absolute bottom-0 left-4 w-px h-8 bg-primary/15"></div>
          <div className="absolute bottom-0 left-12 w-px h-16 bg-primary/15"></div>
          <div className="absolute bottom-0 left-20 w-px h-12 bg-primary/15"></div>
          <div className="absolute bottom-0 left-28 w-px h-20 bg-primary/15"></div>
        </div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📊</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Financial Analyst Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Financial Analyst{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data-driven design for financial analysis roles. 
            Perfect for showcasing analytical skills and financial modeling expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Analytical</Badge>
            <Badge variant="outline">Data-Driven</Badge>
            <Badge variant="outline">Precise</Badge>
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
                  <div className="border-b-2 border-blue-200 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900">David Analytics</h2>
                    <p className="text-blue-600 font-medium">Senior Financial Analyst</p>
                    <p className="text-sm text-gray-600">d.analytics@finance.com | (555) 123-4567 | CFA Level II</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Detail-oriented financial analyst with 5+ years developing financial models...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">TECHNICAL SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Financial Modeling</div>
                      <div>• Excel & VBA</div>
                      <div>• Bloomberg Terminal</div>
                      <div>• SQL & Python</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Financial Analyst</h4>
                          <span className="text-sm text-blue-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Investment Capital LLC</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Built financial models for $500M+ investment decisions</li>
                          <li>Improved forecasting accuracy by 25% through data analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">KEY ACHIEVEMENTS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• Led valuation of 20+ M&A transactions</div>
                      <div>• Developed automated reporting dashboards</div>
                      <div>• Reduced analysis time by 40%</div>
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
                    <h4 className="font-medium">Financial Modeling</h4>
                    <p className="text-sm text-muted-foreground">Highlight complex financial model development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Data Analysis</h4>
                    <p className="text-sm text-muted-foreground">Showcase statistical and quantitative analysis skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Investment Impact</h4>
                    <p className="text-sm text-muted-foreground">Quantify investment recommendations and results</p>
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
                    Financial Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Investment Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Research Associates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Equity Research
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Financial Analyst" />
      </div>
    </div>
  );
};

export default FinancialAnalyst;