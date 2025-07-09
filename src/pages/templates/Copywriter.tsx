import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const Copywriter = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Writing Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-20 border border-primary/20 rounded-lg transform rotate-6">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-3"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-24 h-24 border border-primary/15 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-28 h-16 border border-primary/12 rounded-lg transform -rotate-12"></div>
      </div>
      
      {/* Writing Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-40 h-2 bg-primary/15 rounded-full"></div>
        <div className="absolute top-1/4 left-1/6 w-36 h-2 bg-primary/12 rounded-full mt-1"></div>
        <div className="absolute top-1/4 left-1/6 w-32 h-2 bg-primary/10 rounded-full mt-2"></div>
        
        <div className="absolute bottom-1/3 right-1/5 w-2 h-24 bg-primary/12 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-1 h-20 bg-primary/15 rounded-full ml-3"></div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">✍️</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Copywriter Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Copywriter{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Persuasive design for content professionals. 
            Perfect for showcasing your writing portfolio, campaign results, and brand storytelling expertise.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Persuasive</Badge>
            <Badge variant="outline" className="hover-scale">Creative</Badge>
            <Badge variant="outline" className="hover-scale">Results-Driven</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 spacing-grid mb-12">
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
                  <div className="border-b-2 border-indigo-200 pb-4">
                    <h2 className="text-2xl font-bold text-indigo-900">Emma WordSmith</h2>
                    <p className="text-indigo-600 font-medium">Senior Copywriter</p>
                    <p className="text-sm text-gray-600">emma.wordsmith@agency.com | (555) 123-4567 | Portfolio: emmawords.com</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-2 border-l-4 border-indigo-400 pl-3">CREATIVE SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Strategic copywriter with 6+ years crafting compelling content that drives engagement and conversions...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-2 border-l-4 border-indigo-400 pl-3">WRITING EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Brand Storytelling</div>
                      <div>• Digital Marketing Copy</div>
                      <div>• Content Strategy</div>
                      <div>• Email Campaigns</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-indigo-900 mb-2 border-l-4 border-indigo-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Copywriter</h4>
                          <span className="text-sm text-indigo-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Creative Agency Pro</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Increased client conversion rates by 45% through targeted copy</li>
                          <li>Led copy strategy for 50+ successful marketing campaigns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="spacing-content">
            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Portfolio Showcase</h4>
                    <p className="text-sm text-muted-foreground">Highlight your best writing samples and campaigns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Conversion Metrics</h4>
                    <p className="text-sm text-muted-foreground">Showcase measurable impact of your copy on business results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Brand Voice Expertise</h4>
                    <p className="text-sm text-muted-foreground">Display versatility across different brand tones and styles</p>
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
                    Copywriters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Content Writers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Content Strategists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Marketing Writers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Copywriter" />
      </div>
    </div>
  );
};

export default Copywriter;