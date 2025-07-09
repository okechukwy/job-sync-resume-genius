import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const ExecutiveLeader = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Executive Leadership Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-32 h-32 border border-primary/20 rounded-lg transform rotate-12">
          <div className="absolute inset-4 border border-primary/15 rounded-md transform -rotate-6">
            <div className="absolute inset-3 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-28 h-28 border border-primary/15 rounded-md transform rotate-45">
          <div className="absolute inset-3 border border-primary/12 rounded-sm transform -rotate-45"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-primary/12 rounded-lg transform -rotate-12"></div>
      </div>
      
      {/* Strategic Vision Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-40 h-px bg-gradient-to-r from-primary/18 via-primary/12 to-transparent"></div>
        <div className="absolute top-1/4 left-1/6 w-36 h-px bg-gradient-to-r from-primary/15 via-primary/20 to-transparent mt-2"></div>
        <div className="absolute top-1/4 left-1/6 w-32 h-px bg-gradient-to-r from-primary/12 via-primary/15 to-transparent mt-4"></div>
        
        <div className="absolute bottom-1/3 right-1/5 w-px h-36 bg-gradient-to-b from-primary/15 via-primary/10 to-transparent"></div>
        <div className="absolute bottom-1/3 right-1/5 w-px h-32 bg-gradient-to-b from-primary/20 via-primary/12 to-transparent ml-2"></div>
      </div>
      {/* Header */}
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📊</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Executive Leader Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Executive Leader{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            For senior management and C-level executives. 
            Premium format that emphasizes leadership achievements and strategic impact.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Executive</Badge>
            <Badge variant="outline">Leadership</Badge>
            <Badge variant="outline">Premium</Badge>
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
                  <div className="border-b-2 border-gray-800 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Robert Executive, MBA</h2>
                    <p className="text-gray-700 font-semibold">Chief Technology Officer</p>
                    <p className="text-sm text-gray-600">robert.executive@corp.com | (555) 123-4567 | LinkedIn: /in/robertexec</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide">EXECUTIVE SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Strategic technology leader with 15+ years driving digital transformation at Fortune 500 companies...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Strategic Planning & Execution</div>
                      <div>• Digital Transformation</div>
                      <div>• Team Leadership (200+ direct reports)</div>
                      <div>• P&L Management ($100M+ budgets)</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide">EXECUTIVE EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-gray-900">Chief Technology Officer</h4>
                          <span className="text-sm text-gray-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">Fortune 500 Corporation</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Led $50M digital transformation increasing operational efficiency by 35%</li>
                          <li>Built and managed global technology team of 200+ professionals</li>
                          <li>Implemented cloud-first strategy reducing infrastructure costs by $15M annually</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide">BOARD POSITIONS & RECOGNITION</h3>
                    <div className="text-sm text-gray-700">
                      <div>• Board Member - Tech Industry Association (2022-Present)</div>
                      <div>• CEO of the Year Award - Business Magazine (2023)</div>
                      <div>• Featured Speaker - Global Tech Summit</div>
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
                    <h4 className="font-medium">Executive Summary Focus</h4>
                    <p className="text-sm text-muted-foreground">Prominent section highlighting strategic leadership</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Quantified Achievements</h4>
                    <p className="text-sm text-muted-foreground">Emphasizes revenue, team size, and business impact</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Premium Design</h4>
                    <p className="text-sm text-muted-foreground">Sophisticated layout appropriate for C-suite positions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Board & Recognition Section</h4>
                    <p className="text-sm text-muted-foreground">Highlights board positions and industry recognition</p>
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
                    C-Suite Executives (CEO, CTO, CFO)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Vice Presidents
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Senior Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    General Managers
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

        <TemplateActions templateName="Executive Leader" />
      </div>
    </div>
  );
};

export default ExecutiveLeader;