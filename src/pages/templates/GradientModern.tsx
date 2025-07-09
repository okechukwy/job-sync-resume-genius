import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const GradientModern = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌈</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Gradient Modern Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Gradient Modern{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stand out with stunning gradient backgrounds and modern typography. 
            Perfect for creative professionals who want to make a bold impression.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Gradient Design</Badge>
            <Badge variant="outline">Modern</Badge>
            <Badge variant="outline">Eye-Catching</Badge>
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
              <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 rounded-lg shadow-lg min-h-[600px] border">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
                    <h2 className="text-2xl font-bold">Sarah Chen</h2>
                    <p className="text-purple-100 text-lg">UX/UI Designer</p>
                    <p className="text-sm text-purple-100 mt-2">sarah.chen@email.com | (555) 123-4567 | Portfolio</p>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      CREATIVE SUMMARY
                    </h3>
                    <p className="text-sm text-gray-700">
                      Passionate UX/UI designer with 4+ years creating user-centered digital experiences...
                    </p>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      DESIGN SKILLS
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        Figma, Sketch, Adobe XD
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        Prototyping, Wireframing
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
                      EXPERIENCE
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900">Senior UX Designer</h4>
                          <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">2021 - Present</span>
                        </div>
                        <p className="text-sm text-purple-600 font-medium">TechFlow Inc.</p>
                        <p className="text-xs text-gray-600 mt-1">Led design for 5+ mobile apps with 2M+ users</p>
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
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Stunning Gradients</h4>
                    <p className="text-sm text-muted-foreground">Beautiful gradient backgrounds and accents</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Modern Typography</h4>
                    <p className="text-sm text-muted-foreground">Clean, readable fonts with visual hierarchy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Visual Elements</h4>
                    <p className="text-sm text-muted-foreground">Colorful dots, badges, and design elements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Creative Layout</h4>
                    <p className="text-sm text-muted-foreground">Non-traditional sections that stand out</p>
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
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    UX/UI Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                    Graphic Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Creative Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Marketing Professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Digital Artists
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <TemplateActions templateName="Gradient Modern" />
      </div>
    </div>
  );
};

export default GradientModern;