import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const AccountantPro = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Accounting Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-24 border border-primary/20 rounded-lg transform rotate-6">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-3"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-20 border border-primary/15 rounded-lg transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-18 border border-primary/12 rounded-md transform rotate-8"></div>
      </div>
      
      {/* Calculator/Numbers Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 grid grid-cols-4 gap-1">
          <div className="w-2 h-2 bg-primary/15 rounded-sm"></div>
          <div className="w-2 h-2 bg-primary/12 rounded-sm"></div>
          <div className="w-2 h-2 bg-primary/10 rounded-sm"></div>
          <div className="w-2 h-2 bg-primary/8 rounded-sm"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 flex gap-1">
          <div className="w-1 h-8 bg-primary/12 rounded-full"></div>
          <div className="w-1 h-6 bg-primary/15 rounded-full"></div>
          <div className="w-1 h-10 bg-primary/10 rounded-full"></div>
        </div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">🧮</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Accountant Pro Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Accountant Pro{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Professional template for accounting roles. 
            Perfect for showcasing your financial expertise and attention to detail.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Detailed</Badge>
            <Badge variant="outline" className="hover-scale">Organized</Badge>
            <Badge variant="outline" className="hover-scale">Trustworthy</Badge>
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
                    <h2 className="text-2xl font-bold text-blue-900">David Numbers</h2>
                    <p className="text-blue-600 font-medium">Senior Accountant, CPA</p>
                    <p className="text-sm text-gray-600">david.cpa@firm.com | (555) 123-4567 | CPA Licensed</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Certified Public Accountant with 10+ years providing comprehensive financial services...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Financial Reporting</div>
                      <div>• Tax Preparation</div>
                      <div>• Audit & Compliance</div>
                      <div>• Cost Analysis</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Accountant</h4>
                          <span className="text-sm text-blue-600 font-medium">2019 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Premier Accounting Firm</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Managed financial reporting for 50+ corporate clients</li>
                          <li>Reduced audit preparation time by 40% through process improvements</li>
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
                    <h4 className="font-medium">Financial Expertise</h4>
                    <p className="text-sm text-muted-foreground">Highlight accounting standards and financial analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Compliance Focus</h4>
                    <p className="text-sm text-muted-foreground">Showcase audit experience and regulatory knowledge</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Process Efficiency</h4>
                    <p className="text-sm text-muted-foreground">Display workflow optimization and accuracy metrics</p>
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
                    Staff Accountants
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Senior Accountants
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Tax Accountants
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Audit Associates
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button variant="hero" size="lg" className="min-w-48">
                <FileText className="w-4 h-4 mr-2" />
                Use This Template
              </Button>
            </Link>
            <Button variant="glass" size="lg" className="min-w-48">
              <Download className="w-4 h-4 mr-2" />
              Download Sample
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Free to use • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountantPro;