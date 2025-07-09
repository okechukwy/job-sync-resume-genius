import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const DigitalMarketer = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📱</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Digital Marketer Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Digital Marketer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data-driven design for digital professionals. 
            Perfect for showcasing your analytics expertise, campaign optimization, and digital growth strategies.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Data-Driven</Badge>
            <Badge variant="outline">Performance</Badge>
            <Badge variant="outline">Growth-Focused</Badge>
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
                  <div className="border-b-2 border-teal-200 pb-4">
                    <h2 className="text-2xl font-bold text-teal-900">Alex DigitalGrowth</h2>
                    <p className="text-teal-600 font-medium">Senior Digital Marketing Specialist</p>
                    <p className="text-sm text-gray-600">alex.digitalgrowth@agency.com | (555) 123-4567 | Google Ads Certified</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">DIGITAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Performance-driven digital marketer with 7+ years optimizing campaigns across multiple channels...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">DIGITAL EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• PPC & SEM</div>
                      <div>• Social Media Advertising</div>
                      <div>• Analytics & Attribution</div>
                      <div>• Conversion Optimization</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-teal-900 mb-2 border-l-4 border-teal-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Digital Marketing Specialist</h4>
                          <span className="text-sm text-teal-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Digital Growth Agency</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Achieved 250% ROAS across Google and Facebook campaigns</li>
                          <li>Reduced customer acquisition cost by 40% through optimization</li>
                        </ul>
                      </div>
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
                    <h4 className="font-medium">Performance Metrics</h4>
                    <p className="text-sm text-muted-foreground">Showcase ROAS, conversion rates, and growth achievements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Channel Expertise</h4>
                    <p className="text-sm text-muted-foreground">Highlight multi-platform campaign management skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Analytics Focus</h4>
                    <p className="text-sm text-muted-foreground">Display data analysis and optimization capabilities</p>
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
                    Digital Marketing Specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    PPC Specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Performance Marketers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Growth Marketers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Digital Marketer" />
      </div>
    </div>
  );
};

export default DigitalMarketer;