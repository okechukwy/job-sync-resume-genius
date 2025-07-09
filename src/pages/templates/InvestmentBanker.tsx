import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const InvestmentBanker = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Investment Banking Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-28 h-28 border border-primary/20 rounded-lg transform rotate-12">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-6">
            <div className="absolute inset-2 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-24 h-24 border border-primary/15 rounded-md transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-primary/12 rounded-lg transform -rotate-12"></div>
      </div>
      
      {/* Financial Market Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-48 h-px bg-gradient-to-r from-primary/15 via-primary/25 to-primary/10"></div>
        <div className="absolute top-1/4 left-1/6 w-44 h-px bg-gradient-to-r from-primary/12 via-primary/22 to-primary/8 mt-2"></div>
        <div className="absolute top-1/4 left-1/6 w-40 h-px bg-gradient-to-r from-primary/10 via-primary/18 to-primary/6 mt-4"></div>
        
        <div className="absolute bottom-1/3 right-1/5 w-px h-32 bg-gradient-to-b from-primary/18 via-primary/12 to-primary/6"></div>
        <div className="absolute bottom-1/3 right-1/5 w-px h-28 bg-gradient-to-b from-primary/15 via-primary/20 to-primary/8 ml-2"></div>
      </div>
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
          <div className="text-6xl mb-4">💰</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Investment Banker Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Investment Banker{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            High-stakes finance and investment banking. 
            Perfect for showcasing deal experience and financial expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Elite</Badge>
            <Badge variant="outline">Quantitative</Badge>
            <Badge variant="outline">Professional</Badge>
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
                  <div className="border-b-2 border-gold-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Alexandra Sterling</h2>
                    <p className="text-gray-700 font-medium">Vice President, Investment Banking</p>
                    <p className="text-sm text-gray-600">a.sterling@bank.com | (555) 123-4567 | CFA, MBA</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 border-l-4 border-yellow-400 pl-3">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Investment banking professional with 8+ years executing M&A transactions...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 border-l-4 border-yellow-400 pl-3">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• M&A Advisory</div>
                      <div>• Capital Markets</div>
                      <div>• Financial Modeling</div>
                      <div>• Due Diligence</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 border-l-4 border-yellow-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Vice President</h4>
                          <span className="text-sm text-gray-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Goldman Sachs</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Led $2.5B M&A transactions across technology sector</li>
                          <li>Managed team of 8 analysts on complex deal structures</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 border-l-4 border-yellow-400 pl-3">EDUCATION</h3>
                    <div className="text-sm text-gray-700">
                      <div>• MBA, Wharton School (2018)</div>
                      <div>• BA Economics, Harvard University (2014)</div>
                      <div>• CFA Charterholder</div>
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
                    <h4 className="font-medium">Deal Experience</h4>
                    <p className="text-sm text-muted-foreground">Showcase transaction sizes and deal complexity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Financial Metrics</h4>
                    <p className="text-sm text-muted-foreground">Quantify your impact with dollar amounts and percentages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Elite Credentials</h4>
                    <p className="text-sm text-muted-foreground">Highlight top-tier education and certifications</p>
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
                    Investment Bankers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    M&A Advisors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Capital Markets
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Private Equity
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

export default InvestmentBanker;