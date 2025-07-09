import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ItSupportSpecialist = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* IT Support Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-24 h-16 border border-primary/20 rounded-md">
          <div className="absolute inset-2 border border-primary/15 rounded-sm">
            <div className="absolute inset-1 bg-primary/10"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-20 h-14 border border-primary/15 rounded-md transform rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-18 h-12 border border-primary/12 rounded-sm transform -rotate-6"></div>
      </div>
      
      {/* Support Ticket Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-28 h-3 bg-primary/15 rounded-sm"></div>
        <div className="absolute top-1/4 left-1/6 w-24 h-2 bg-primary/12 rounded-sm mt-1"></div>
        <div className="absolute top-1/4 left-1/6 w-20 h-2 bg-primary/10 rounded-sm mt-2"></div>
        
        <div className="absolute bottom-1/3 right-1/5 w-6 h-2 bg-primary/12 rounded-sm"></div>
        <div className="absolute bottom-1/3 right-1/5 w-8 h-2 bg-primary/15 rounded-sm ml-2 mt-1"></div>
      </div>
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
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🛠️</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            IT Support Specialist Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            IT Support Specialist{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Problem-solving design for IT support professionals. 
            Perfect for showcasing technical troubleshooting, system administration, and user support skills.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Problem-Solving</Badge>
            <Badge variant="outline">Technical</Badge>
            <Badge variant="outline">Support</Badge>
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
                  <div className="border-b-2 border-cyan-200 pb-4">
                    <h2 className="text-2xl font-bold text-cyan-900">Sam TechSupport</h2>
                    <p className="text-cyan-600 font-medium">Senior IT Support Specialist</p>
                    <p className="text-sm text-gray-600">s.techsupport@itsolutions.com | (555) 123-4567 | CompTIA A+ Certified</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-cyan-900 mb-2 border-l-4 border-cyan-400 pl-3">IT SUPPORT EXPERTISE</h3>
                    <p className="text-sm text-gray-700">
                      IT support specialist with 5+ years providing technical support and system administration...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-cyan-900 mb-2 border-l-4 border-cyan-400 pl-3">TECHNICAL SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Windows/Linux Admin</div>
                      <div>• Network Troubleshooting</div>
                      <div>• Hardware Support</div>
                      <div>• Help Desk Management</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-cyan-900 mb-2 border-l-4 border-cyan-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior IT Support Specialist</h4>
                          <span className="text-sm text-cyan-600 font-medium">2022 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">TechFlow Corporation</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Resolved 95% of tickets within SLA</li>
                          <li>Supported 200+ end users daily</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-cyan-900 mb-2 border-l-4 border-cyan-400 pl-3">SYSTEMS & TOOLS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• Active Directory, Office 365</div>
                      <div>• ServiceNow, JIRA</div>
                      <div>• VMware, Hyper-V</div>
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
                    <h4 className="font-medium">Support Metrics</h4>
                    <p className="text-sm text-muted-foreground">Showcase ticket resolution rates and SLA performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">System Administration</h4>
                    <p className="text-sm text-muted-foreground">Highlight server and network management skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">User Support</h4>
                    <p className="text-sm text-muted-foreground">Display customer service and training abilities</p>
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
                    IT Support Specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Help Desk Technicians
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    System Administrators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Desktop Support Engineers
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

export default ItSupportSpecialist;