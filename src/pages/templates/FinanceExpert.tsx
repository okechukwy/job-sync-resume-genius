import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const FinanceExpert = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-2xl font-bold gradient-text">ResumeAI</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💼</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Finance Expert Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Finance Expert{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for banking, accounting, and finance professionals. 
            Corporate format that highlights your analytical skills and financial expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Corporate</Badge>
            <Badge variant="outline">Analytical</Badge>
            <Badge variant="outline">Precise</Badge>
          </div>
        </div>

        {/* Template Preview and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Template Preview */}
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
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Michael Thompson, CFA</h2>
                    <p className="text-gray-600">Senior Financial Analyst</p>
                    <p className="text-sm text-gray-500">michael.thompson@finance.com | (555) 123-4567 | CFA Institute Member</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Results-driven financial analyst with 7+ years of experience in investment banking...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Financial Modeling & Valuation</div>
                      <div>• Risk Assessment & Management</div>
                      <div>• Excel, Bloomberg, SAP</div>
                      <div>• Portfolio Management</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">PROFESSIONAL EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Financial Analyst</h4>
                          <span className="text-sm text-gray-500">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Goldman Sachs</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Developed financial models resulting in $50M cost savings</li>
                          <li>Led due diligence for M&A transactions worth $2B+</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">EDUCATION & CERTIFICATIONS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• MBA Finance - Wharton School (2018)</div>
                      <div>• CFA Charter - CFA Institute (2019)</div>
                      <div>• BS Economics - University of Chicago (2016)</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Details */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Quantified Achievements</h4>
                    <p className="text-sm text-muted-foreground">Emphasizes financial metrics and measurable results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Professional Certifications</h4>
                    <p className="text-sm text-muted-foreground">Highlights CFA, CPA, FRM and other credentials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Corporate Design</h4>
                    <p className="text-sm text-muted-foreground">Professional layout suitable for financial institutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Technical Skills Focus</h4>
                    <p className="text-sm text-muted-foreground">Dedicated section for financial software and tools</p>
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
                    Investment Bankers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Accountants & CPAs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Portfolio Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Financial Consultants
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
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

export default FinanceExpert;