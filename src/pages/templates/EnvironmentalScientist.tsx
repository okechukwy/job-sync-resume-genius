import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const EnvironmentalScientist = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
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
          <div className="text-6xl mb-4">🌱</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Environmental Scientist Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Environmental Scientist{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sustainable design for environmental professionals. 
            Perfect for showcasing conservation projects, environmental assessments, and sustainability initiatives.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Sustainable</Badge>
            <Badge variant="outline">Conservation</Badge>
            <Badge variant="outline">Environmental</Badge>
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

          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
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

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Perfect For</CardTitle>
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

export default EnvironmentalScientist;