import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const ElegantProfessional = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Executive Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-24 left-20 w-32 h-32 border border-primary/20 rounded-lg transform rotate-3">
          <div className="absolute inset-4 border border-primary/15 rounded-md transform -rotate-3">
            <div className="absolute inset-3 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-28 border border-primary/15 rounded-md transform -rotate-6"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-primary/12 rounded-lg transform rotate-12"></div>
      </div>
      
      {/* Sophisticated Lines */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/4 left-1/6 w-48 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
        <div className="absolute bottom-1/3 right-1/5 w-px h-32 bg-gradient-to-b from-transparent via-primary/12 to-transparent"></div>
        <div className="absolute top-2/3 left-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      </div>
      
      {/* Header */}
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">👑</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Elegant Professional Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Elegant Professional{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Sophisticated design with refined typography and subtle elegance. 
            Perfect for senior professionals and executive positions.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Sophisticated</Badge>
            <Badge variant="outline" className="hover-scale">Elegant</Badge>
            <Badge variant="outline" className="hover-scale">Executive</Badge>
          </div>
        </div>

        {/* Template Preview and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 spacing-grid mb-12">
          {/* Template Preview */}
          <Card className="glass-card hover-lift animate-fade-in">
            <CardHeader>
              <CardTitle className="visual-hierarchy-3 flex items-center gap-2">
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
          <div className="spacing-content">
            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Template Features</CardTitle>
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

            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Perfect For</CardTitle>
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

        <TemplateActions templateName="Elegant Professional" />
      </div>
    </div>
  );
};

export default ElegantProfessional;