import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const CybersecurityExpert = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Cybersecurity Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-20 h-20 border-2 border-primary/20 transform rotate-45">
          <div className="absolute inset-2 border border-primary/15 transform -rotate-45">
            <div className="absolute inset-2 border border-primary/10">
              <div className="absolute inset-1 bg-primary/8"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-16 h-16 border border-primary/15 transform rotate-12">
          <div className="absolute inset-2 border border-primary/12 transform -rotate-12"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 w-18 h-18 border border-primary/12 transform -rotate-30"></div>
      </div>
      
      {/* Security Shield Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-12 h-16 bg-primary/10 rounded-t-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-10 h-14 bg-primary/8 rounded-t-full transform rotate-15"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-12 bg-primary/6 rounded-t-full transform -rotate-12"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔒</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Cybersecurity Expert Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cybersecurity Expert{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure design for security professionals. 
            Perfect for showcasing threat analysis, incident response, and security architecture expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Security</Badge>
            <Badge variant="outline">Protection</Badge>
            <Badge variant="outline">Analysis</Badge>
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
                  <div className="border-b-2 border-red-200 pb-4">
                    <h2 className="text-2xl font-bold text-red-900">Morgan SecureShield</h2>
                    <p className="text-red-600 font-medium">Senior Cybersecurity Expert</p>
                    <p className="text-sm text-gray-600">m.secureshield@cybertech.com | (555) 123-4567 | CISSP Certified</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2 border-l-4 border-red-400 pl-3">SECURITY EXPERTISE</h3>
                    <p className="text-sm text-gray-700">
                      Cybersecurity expert with 12+ years protecting enterprise systems against advanced threats...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2 border-l-4 border-red-400 pl-3">SECURITY SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Threat Analysis</div>
                      <div>• Incident Response</div>
                      <div>• Security Architecture</div>
                      <div>• Penetration Testing</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2 border-l-4 border-red-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Security Architect</h4>
                          <span className="text-sm text-red-600 font-medium">2019 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">CyberDefense Corp</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Prevented 99.8% of security incidents</li>
                          <li>Led SOC team of 15 security analysts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2 border-l-4 border-red-400 pl-3">CERTIFICATIONS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• CISSP (Certified Information Systems Security Professional)</div>
                      <div>• CEH (Certified Ethical Hacker)</div>
                      <div>• CISM (Certified Information Security Manager)</div>
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
                    <h4 className="font-medium">Threat Intelligence</h4>
                    <p className="text-sm text-muted-foreground">Showcase advanced threat analysis capabilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Incident Response</h4>
                    <p className="text-sm text-muted-foreground">Highlight rapid response and mitigation experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Security Metrics</h4>
                    <p className="text-sm text-muted-foreground">Display prevention rates and security improvements</p>
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
                    Cybersecurity Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Security Architects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Penetration Testers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    SOC Managers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Cybersecurity Expert" />
      </div>
    </div>
  );
};

export default CybersecurityExpert;