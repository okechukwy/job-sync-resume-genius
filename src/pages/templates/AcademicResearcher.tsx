import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const AcademicResearcher = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Academic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-24 h-24 border border-primary/20 rounded-lg transform rotate-12">
          <div className="absolute inset-2 border border-primary/15 rounded-md transform -rotate-6">
            <div className="absolute inset-2 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-20 h-20 border border-primary/15 rounded-full">
          <div className="absolute inset-3 bg-primary/8 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary/12 rounded-lg transform rotate-45"></div>
      </div>
      
      {/* Academic Grid Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent"></div>
        <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/8 to-transparent"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">🎓</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Academic Researcher Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Academic Researcher{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Scholarly design for academic professionals. 
            Perfect for highlighting teaching experience, research publications, and academic achievements.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Academic</Badge>
            <Badge variant="outline" className="hover-scale">Scholarly</Badge>
            <Badge variant="outline" className="hover-scale">Teaching</Badge>
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
                  <div className="border-b-2 border-purple-200 pb-4">
                    <h2 className="text-2xl font-bold text-purple-900">Dr. Maria Academic</h2>
                    <p className="text-purple-600 font-medium">Associate Professor & Researcher</p>
                    <p className="text-sm text-gray-600">m.academic@university.edu | (555) 123-4567 | PhD Psychology</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">RESEARCH INTERESTS</h3>
                    <p className="text-sm text-gray-700">
                      Cognitive psychology researcher with 12+ years investigating memory and learning processes...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">ACADEMIC SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Research Design</div>
                      <div>• Statistical Analysis</div>
                      <div>• Curriculum Development</div>
                      <div>• Grant Writing</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">ACADEMIC EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Associate Professor</h4>
                          <span className="text-sm text-purple-600 font-medium">2018 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">State University</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Published 35+ peer-reviewed articles</li>
                          <li>Secured $1.8M in research grants</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">TEACHING</h3>
                    <div className="text-sm text-gray-700">
                      <div>• Cognitive Psychology (Undergraduate)</div>
                      <div>• Research Methods (Graduate)</div>
                      <div>• Statistics for Psychology</div>
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
                    <h4 className="font-medium">Teaching Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Showcase courses taught and educational impact</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Grant History</h4>
                    <p className="text-sm text-muted-foreground">Highlight successful funding applications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Conference Presentations</h4>
                    <p className="text-sm text-muted-foreground">Display academic conference participation</p>
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
                    University Professors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Postdoc Researchers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Academic Administrators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    PhD Candidates
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

export default AcademicResearcher;