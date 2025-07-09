import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ResearchScientist = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Research Industry Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-16 left-12 w-24 h-24 border border-primary/20 rounded-full">
          <div className="absolute inset-2 border border-primary/15 rounded-full">
            <div className="absolute inset-2 border border-primary/10 rounded-full">
              <div className="absolute inset-2 bg-primary/5 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-24 right-16 w-20 h-20 border border-primary/15 rounded-full">
          <div className="absolute inset-3 border border-primary/10 rounded-full"></div>
        </div>
      </div>
      
      {/* Molecular Structure Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/3 left-1/4 w-32 h-px bg-primary/15 transform rotate-45"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-px bg-primary/12 transform -rotate-45 mt-6"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-px bg-primary/10 transform rotate-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-px bg-primary/8 transform -rotate-30 mt-4"></div>
      </div>
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
          <div className="text-6xl mb-4 animate-bounce-subtle">🔬</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Research Scientist Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Research Scientist{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Analytical design for research professionals. 
            Perfect for showcasing research publications, methodologies, and scientific achievements.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Analytical</Badge>
            <Badge variant="outline" className="hover-scale">Scientific</Badge>
            <Badge variant="outline" className="hover-scale">Research</Badge>
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
                  <div className="border-b-2 border-blue-200 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900">Dr. Alex Research</h2>
                    <p className="text-blue-600 font-medium">Senior Research Scientist</p>
                    <p className="text-sm text-gray-600">a.research@lab.edu | (555) 123-4567 | PhD Molecular Biology</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">RESEARCH FOCUS</h3>
                    <p className="text-sm text-gray-700">
                      Molecular biologist with 10+ years conducting breakthrough research in gene therapy...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">RESEARCH SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Molecular Biology</div>
                      <div>• Data Analysis</div>
                      <div>• Laboratory Management</div>
                      <div>• Grant Writing</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Research Scientist</h4>
                          <span className="text-sm text-blue-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">National Research Institute</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Published 25+ peer-reviewed articles</li>
                          <li>Secured $2.5M in research funding</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">PUBLICATIONS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• Nature Communications (2023)</div>
                      <div>• Cell Biology Journal (2022)</div>
                      <div>• Molecular Research Today (2021)</div>
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
                    <h4 className="font-medium">Publication List</h4>
                    <p className="text-sm text-muted-foreground">Showcase peer-reviewed publications and citations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Research Metrics</h4>
                    <p className="text-sm text-muted-foreground">Highlight funding secured and research impact</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Technical Skills</h4>
                    <p className="text-sm text-muted-foreground">Display specialized research methodologies</p>
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
                    Research Scientists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    PhD Researchers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Principal Investigators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Laboratory Directors
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

export default ResearchScientist;