
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const CreativeProfessional = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Creative Industry Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-16 left-16 w-32 h-32 border border-primary/20 rounded-lg transform rotate-12">
          <div className="absolute inset-4 border border-primary/15 rounded-md transform -rotate-6"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-24 h-24 border border-primary/15 rounded-full">
          <div className="absolute inset-3 bg-primary/8 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-primary/12 transform rotate-45"></div>
      </div>
      
      {/* Creative Design Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent"></div>
        <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
      </div>
      {/* Header */}
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">🎨</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Creative Professional Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Creative Professional{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Ideal for designers, marketers, and creative roles. 
            Visually appealing format that showcases your creativity and design skills.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Creative</Badge>
            <Badge variant="outline" className="hover-scale">Visual</Badge>
            <Badge variant="outline" className="hover-scale">Unique</Badge>
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
              <div className="bg-white p-6 rounded-lg shadow-lg min-h-[600px] border">
                <div className="space-y-4">
                  <div className="border-b-2 border-purple-200 pb-4">
                    <h2 className="text-2xl font-bold text-purple-900">Emma Creative</h2>
                    <p className="text-purple-600 font-medium">Senior UI/UX Designer</p>
                    <p className="text-sm text-gray-600">emma.creative@design.com | (555) 123-4567 | Portfolio: emmacreative.com</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">CREATIVE SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Passionate UI/UX designer with 6+ years creating user-centered digital experiences...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">DESIGN SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Adobe Creative Suite</div>
                      <div>• Figma, Sketch, InVision</div>
                      <div>• HTML/CSS, JavaScript</div>
                      <div>• User Research & Testing</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior UI/UX Designer</h4>
                          <span className="text-sm text-purple-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Creative Agency Co.</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Redesigned mobile app increasing user engagement by 60%</li>
                          <li>Led design system implementation across 15+ products</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">AWARDS & RECOGNITION</h3>
                    <div className="text-sm text-gray-700">
                      <div>• Webby Award - Best Mobile App Design (2023)</div>
                      <div>• Adobe Design Achievement Award (2022)</div>
                      <div>• Featured in Design Weekly Magazine</div>
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
                    <h4 className="font-medium">Visual Hierarchy</h4>
                    <p className="text-sm text-muted-foreground">Creative use of colors and typography for impact</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Portfolio Integration</h4>
                    <p className="text-sm text-muted-foreground">Dedicated space for showcasing your best work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Creative Skills Section</h4>
                    <p className="text-sm text-muted-foreground">Highlight design tools and creative competencies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Awards & Recognition</h4>
                    <p className="text-sm text-muted-foreground">Showcase creative achievements and accolades</p>
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
                    UI/UX Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Graphic Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Marketing Professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Creative Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Content Creators
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions 
          templateName="Creative Professional" 
          templateId="graphic-designer"
        />
      </div>
    </div>
  );
};

export default CreativeProfessional;
