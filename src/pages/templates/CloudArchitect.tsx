import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const CloudArchitect = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Cloud Architecture Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-32 h-20 border border-primary/20 rounded-lg">
          <div className="absolute inset-3 border border-primary/15 rounded-md">
            <div className="absolute inset-2 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-36 right-20 w-28 h-18 border border-primary/15 rounded-lg transform rotate-6"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-16 border border-primary/12 rounded-md transform -rotate-3"></div>
      </div>
      
      {/* Cloud Connection Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/3 left-12 w-40 h-px bg-gradient-to-r from-primary/15 via-primary/8 to-transparent"></div>
        <div className="absolute bottom-1/3 right-16 w-36 h-px bg-gradient-to-l from-primary/12 via-primary/6 to-transparent"></div>
        <div className="absolute left-1/3 top-20 w-px h-32 bg-gradient-to-b from-primary/10 via-primary/15 to-primary/5"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">☁️</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Cloud Architect Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cloud Architect{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strategic design for cloud infrastructure experts. 
            Perfect for showcasing multi-cloud expertise, architecture patterns, and scalable solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Strategic</Badge>
            <Badge variant="outline">Scalable</Badge>
            <Badge variant="outline">Multi-Cloud</Badge>
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
                    <h2 className="text-2xl font-bold text-blue-900">Alex CloudMaster</h2>
                    <p className="text-blue-600 font-medium">Senior Cloud Architect</p>
                    <p className="text-sm text-gray-600">a.cloudmaster@tech.com | (555) 123-4567 | AWS Certified Solutions Architect</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">CLOUD EXPERTISE</h3>
                    <p className="text-sm text-gray-700">
                      Cloud architect with 10+ years designing enterprise-scale infrastructure across AWS, Azure, and GCP...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">CLOUD PLATFORMS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• AWS (Advanced)</div>
                      <div>• Azure (Expert)</div>
                      <div>• Google Cloud</div>
                      <div>• Kubernetes</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Cloud Architect</h4>
                          <span className="text-sm text-blue-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">TechCorp Solutions</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Reduced infrastructure costs by 40% through optimization</li>
                          <li>Led migration of 50+ applications to cloud</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">CERTIFICATIONS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• AWS Solutions Architect Professional</div>
                      <div>• Azure Solutions Architect Expert</div>
                      <div>• Google Cloud Professional Architect</div>
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
                    <h4 className="font-medium">Multi-Cloud Expertise</h4>
                    <p className="text-sm text-muted-foreground">Showcase proficiency across AWS, Azure, and GCP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Cost Optimization</h4>
                    <p className="text-sm text-muted-foreground">Highlight infrastructure savings and efficiency gains</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Architecture Patterns</h4>
                    <p className="text-sm text-muted-foreground">Display knowledge of scalable design patterns</p>
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
                    Cloud Architects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Solutions Architects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Infrastructure Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    DevOps Architects
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Cloud Architect" />
      </div>
    </div>
  );
};

export default CloudArchitect;