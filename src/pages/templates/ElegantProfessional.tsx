import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ElegantProfessional = () => {
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
          <div className="text-6xl mb-4">👑</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Elegant Professional Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Elegant Professional{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sophisticated design with refined typography and subtle elegance. 
            Perfect for senior professionals and executive positions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Sophisticated</Badge>
            <Badge variant="outline">Elegant</Badge>
            <Badge variant="outline">Executive</Badge>
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
              <div className="bg-white p-8 rounded-lg shadow-lg min-h-[600px] border">
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b-2 border-gray-200">
                    <h2 className="text-3xl font-serif text-gray-900 mb-2">Victoria Sterling</h2>
                    <p className="text-gray-600 text-lg tracking-wide">CHIEF MARKETING OFFICER</p>
                    <div className="flex justify-center items-center gap-3 text-sm text-gray-500 mt-3">
                      <span>victoria.sterling@executive.com</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>+1 (555) 123-4567</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>New York, NY</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
                      Executive Summary
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Strategic marketing executive with 12+ years of experience driving revenue growth 
                      for Fortune 500 companies. Proven track record of building high-performing teams 
                      and executing multi-million dollar campaigns.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
                      Professional Experience
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h4 className="text-gray-900 font-semibold">Chief Marketing Officer</h4>
                            <p className="text-gray-600 text-sm italic">Global Innovations Corp</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">2020 - Present</span>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1.5">•</span>
                            <span>Led digital transformation resulting in 45% increase in online revenue</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1.5">•</span>
                            <span>Managed $15M annual marketing budget across 12 global markets</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h4 className="text-gray-900 font-semibold">Senior Marketing Director</h4>
                            <p className="text-gray-600 text-sm italic">Premier Solutions Inc</p>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">2017 - 2020</span>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1.5">•</span>
                            <span>Developed brand strategy that increased market share by 30%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
                        Education
                      </h3>
                      <div className="text-sm">
                        <h4 className="font-semibold text-gray-900">MBA, Marketing Strategy</h4>
                        <p className="text-gray-600 italic">Harvard Business School</p>
                        <p className="text-gray-500 text-xs">2015 • Magna Cum Laude</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
                        Core Competencies
                      </h3>
                      <div className="grid grid-cols-1 gap-1 text-sm text-gray-700">
                        <span>• Strategic Planning</span>
                        <span>• Team Leadership</span>
                        <span>• Digital Marketing</span>
                        <span>• Brand Management</span>
                      </div>
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
                    <h4 className="font-medium">Refined Typography</h4>
                    <p className="text-sm text-muted-foreground">Elegant serif and sans-serif font combination</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Executive Layout</h4>
                    <p className="text-sm text-muted-foreground">Sophisticated structure for senior positions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Premium Styling</h4>
                    <p className="text-sm text-muted-foreground">Subtle borders and refined spacing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Professional Polish</h4>
                    <p className="text-sm text-muted-foreground">Executive summary and achievement focus</p>
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
                    C-Level Executives
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Senior Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Vice Presidents
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Management Consultants
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Board Members
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

export default ElegantProfessional;