import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const EnvironmentalScientist = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Environmental Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-20 h-32 bg-gradient-to-t from-primary/20 via-primary/15 to-primary/8 rounded-full transform rotate-12"></div>
        <div className="absolute bottom-32 right-20 w-16 h-28 bg-gradient-to-b from-primary/18 via-primary/12 to-primary/6 rounded-full transform -rotate-15"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-24 bg-gradient-to-t from-primary/15 to-primary/5 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-14 h-20 bg-gradient-to-b from-primary/12 to-primary/4 rounded-full transform rotate-8"></div>
      </div>
      
      {/* Organic Flowing Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-10 w-40 h-2 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent rounded-full transform rotate-6"></div>
        <div className="absolute bottom-1/3 right-12 w-32 h-2 bg-gradient-to-l from-primary/12 via-primary/8 to-transparent rounded-full transform -rotate-12"></div>
        <div className="absolute top-2/3 left-1/3 w-28 h-2 bg-gradient-to-r from-transparent via-primary/8 to-primary/12 rounded-full transform rotate-3"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">🌱</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Environmental Scientist Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Environmental Scientist{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Sustainable design for environmental professionals. 
            Perfect for showcasing conservation projects, environmental assessments, and sustainability initiatives.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Sustainable</Badge>
            <Badge variant="outline" className="hover-scale">Conservation</Badge>
            <Badge variant="outline" className="hover-scale">Environmental</Badge>
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
                  <div className="border-b-2 border-green-200 pb-4">
                    <h2 className="text-2xl font-bold text-green-900">Dr. Morgan Green</h2>
                    <p className="text-green-600 font-medium">Senior Environmental Scientist</p>
                    <p className="text-sm text-gray-600">m.green@environ.org | (555) 123-4567 | PhD Environmental Science</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">ENVIRONMENTAL FOCUS</h3>
                    <p className="text-sm text-gray-700">
                      Environmental scientist with 11+ years researching climate change impacts and solutions...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">ENVIRONMENTAL SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Environmental Assessment</div>
                      <div>• Climate Modeling</div>
                      <div>• Sustainability Planning</div>
                      <div>• Field Research</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Environmental Scientist</h4>
                          <span className="text-sm text-green-600 font-medium">2018 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Environmental Consulting Group</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Led 50+ environmental impact assessments</li>
                          <li>Reduced client emissions by 30% on average</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">PROJECTS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• Wetland Restoration (500 acres)</div>
                      <div>• Carbon Footprint Analysis</div>
                      <div>• Biodiversity Conservation Study</div>
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
                    <h4 className="font-medium">Impact Metrics</h4>
                    <p className="text-sm text-muted-foreground">Showcase environmental improvements and conservation results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Project Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Highlight major environmental projects and initiatives</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Field Experience</h4>
                    <p className="text-sm text-muted-foreground">Display hands-on environmental research and assessment skills</p>
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
                    Environmental Scientists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Conservation Biologists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Sustainability Consultants
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Climate Researchers
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Environmental Scientist" />
      </div>
    </div>
  );
};

export default EnvironmentalScientist;