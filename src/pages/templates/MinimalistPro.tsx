import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const MinimalistPro = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Minimalist Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-32 left-24 w-24 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent"></div>
        <div className="absolute top-48 left-32 w-32 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute bottom-48 right-32 w-28 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent"></div>
        <div className="absolute bottom-32 right-24 w-24 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent"></div>
      </div>
      
      {/* Subtle Geometric Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 right-1/6 w-px h-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute bottom-1/4 left-1/6 w-px h-32 bg-gradient-to-b from-transparent via-primary/8 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 border border-primary/8 rounded-full"></div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">✨</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Minimalist Pro Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Minimalist Pro{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Clean, sophisticated design that lets your content shine. 
            Perfect balance of white space and information for maximum impact.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Clean</Badge>
            <Badge variant="outline" className="hover-scale">Minimalist</Badge>
            <Badge variant="outline" className="hover-scale">Professional</Badge>
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
                <div className="space-y-8">
                  <div className="border-b border-gray-100 pb-6">
                    <h2 className="text-3xl font-light text-gray-900 mb-1">Alexandra Smith</h2>
                    <p className="text-gray-600 text-lg font-light">Product Manager</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mt-3">
                      <span>alexandra.smith@email.com</span>
                      <span>•</span>
                      <span>(555) 123-4567</span>
                      <span>•</span>
                      <span>LinkedIn</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Professional Summary</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Strategic product manager with 6+ years of experience driving product development 
                      from conception to launch. Proven track record of increasing user engagement by 40%.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-gray-900 font-medium">Senior Product Manager</h4>
                          <span className="text-sm text-gray-500">2022 - Present</span>
                        </div>
                        <p className="text-gray-600 text-sm">TechVision Solutions</p>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>• Led cross-functional team of 12 members to deliver 3 major product releases</p>
                          <p>• Increased monthly active users by 65% through data-driven feature optimization</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-gray-900 font-medium">Product Manager</h4>
                          <span className="text-sm text-gray-500">2020 - 2022</span>
                        </div>
                        <p className="text-gray-600 text-sm">Innovation Labs</p>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>• Managed product roadmap for B2B SaaS platform with $2M ARR</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Product Strategy</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">User Research</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Agile/Scrum</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Analytics</span>
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
                    <h4 className="font-medium">Clean Typography</h4>
                    <p className="text-sm text-muted-foreground">Elegant font hierarchy for easy scanning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Strategic White Space</h4>
                    <p className="text-sm text-muted-foreground">Optimal spacing for professional presentation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Subtle Accents</h4>
                    <p className="text-sm text-muted-foreground">Minimal design elements that enhance content</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">ATS Friendly</h4>
                    <p className="text-sm text-muted-foreground">Simple structure that works with all systems</p>
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
                    Product Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Business Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Consultants
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Project Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Operations Managers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Minimalist Pro" />
      </div>
    </div>
  );
};

export default MinimalistPro;