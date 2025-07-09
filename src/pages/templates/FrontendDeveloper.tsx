import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const FrontendDeveloper = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Frontend Development Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-32 h-24 border border-primary/20 rounded-lg">
          <div className="absolute inset-3 border border-primary/15 rounded-md">
            <div className="absolute inset-2 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-28 h-20 border border-primary/15 rounded-lg transform rotate-6"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-18 border border-primary/12 rounded-md transform -rotate-3"></div>
      </div>
      
      {/* UI Component Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-24 h-4 bg-primary/15 rounded-md"></div>
        <div className="absolute top-1/4 left-1/6 w-20 h-3 bg-primary/12 rounded-sm mt-2"></div>
        <div className="absolute top-1/4 left-1/6 w-16 h-2 bg-primary/10 rounded-sm mt-4"></div>
        
        <div className="absolute bottom-1/3 right-1/5 w-6 h-6 bg-primary/12 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-4 h-4 bg-primary/15 rounded-full ml-8"></div>
        <div className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-primary/10 rounded-full ml-14"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🎨</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Frontend Developer Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frontend Developer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Creative design for frontend specialists. 
            Perfect for showcasing UI/UX skills, modern frameworks, and responsive design expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Creative</Badge>
            <Badge variant="outline">Interactive</Badge>
            <Badge variant="outline">Responsive</Badge>
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
                  <div className="border-b-2 border-green-200 pb-4">
                    <h2 className="text-2xl font-bold text-green-900">Jamie Frontend</h2>
                    <p className="text-green-600 font-medium">Senior Frontend Developer</p>
                    <p className="text-sm text-gray-600">j.frontend@webtech.com | (555) 123-4567 | React Certified</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">FRONTEND EXPERTISE</h3>
                    <p className="text-sm text-gray-700">
                      Frontend developer with 6+ years creating responsive, accessible web applications...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">TECHNICAL SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• React/Next.js</div>
                      <div>• TypeScript</div>
                      <div>• CSS/Tailwind</div>
                      <div>• JavaScript ES6+</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Frontend Developer</h4>
                          <span className="text-sm text-green-600 font-medium">2022 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">WebFlow Studios</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Built 20+ responsive web applications</li>
                          <li>Improved page load speed by 50%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">FRAMEWORKS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• React, Vue.js, Angular</div>
                      <div>• Node.js, Express</div>
                      <div>• Webpack, Vite</div>
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
                    <h4 className="font-medium">Modern Frameworks</h4>
                    <p className="text-sm text-muted-foreground">Showcase expertise in React, Vue, and Angular</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Performance Metrics</h4>
                    <p className="text-sm text-muted-foreground">Highlight speed improvements and optimization results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">UI/UX Focus</h4>
                    <p className="text-sm text-muted-foreground">Display design sensibility and user experience skills</p>
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
                    Frontend Developers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    React Developers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    UI Developers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Web Developers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Frontend Developer" />
      </div>
    </div>
  );
};

export default FrontendDeveloper;