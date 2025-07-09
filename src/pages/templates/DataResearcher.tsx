import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const DataResearcher = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Data Research Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-16 left-12 w-32 h-4 bg-primary/20 rounded-full"></div>
        <div className="absolute top-20 left-16 w-28 h-4 bg-primary/15 rounded-full"></div>
        <div className="absolute top-24 left-20 w-24 h-4 bg-primary/12 rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-4 h-20 bg-primary/18"></div>
        <div className="absolute bottom-32 right-20 w-4 h-16 bg-primary/15"></div>
        <div className="absolute bottom-32 right-24 w-4 h-24 bg-primary/12"></div>
      </div>
      
      {/* Statistical Charts */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/3 left-1/6 w-24 h-16 border border-primary/15 rounded-lg">
          <div className="absolute inset-2 border border-primary/12 rounded-md">
            <div className="absolute bottom-2 left-2 w-2 h-8 bg-primary/10"></div>
            <div className="absolute bottom-2 left-5 w-2 h-6 bg-primary/8"></div>
            <div className="absolute bottom-2 left-8 w-2 h-10 bg-primary/12"></div>
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/5 w-20 h-20 border border-primary/12 rounded-full">
          <div className="absolute inset-3 border border-primary/10 rounded-full"></div>
        </div>
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
          <div className="text-6xl mb-4 animate-bounce-subtle">📊</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Data Researcher Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Data Researcher{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Data-driven design for research professionals. 
            Perfect for showcasing statistical analysis, research methodologies, and data visualization skills.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Data-Driven</Badge>
            <Badge variant="outline" className="hover-scale">Statistical</Badge>
            <Badge variant="outline" className="hover-scale">Analytical</Badge>
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
                  <div className="border-b-2 border-orange-200 pb-4">
                    <h2 className="text-2xl font-bold text-orange-900">Dr. Taylor Data</h2>
                    <p className="text-orange-600 font-medium">Senior Data Researcher</p>
                    <p className="text-sm text-gray-600">t.data@research.org | (555) 123-4567 | PhD Statistics</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">RESEARCH EXPERTISE</h3>
                    <p className="text-sm text-gray-700">
                      Data researcher with 8+ years developing advanced statistical models for research insights...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">DATA SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Statistical Modeling</div>
                      <div>• Machine Learning</div>
                      <div>• Data Visualization</div>
                      <div>• Survey Design</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Data Researcher</h4>
                          <span className="text-sm text-orange-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Data Research Institute</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Analyzed datasets with 10M+ records</li>
                          <li>Published 20+ data-driven research papers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">TOOLS & PLATFORMS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• R, Python, SPSS</div>
                      <div>• Tableau, Power BI</div>
                      <div>• SQL, NoSQL Databases</div>
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
                    <h4 className="font-medium">Statistical Methods</h4>
                    <p className="text-sm text-muted-foreground">Showcase advanced statistical and analytical techniques</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Data Scale</h4>
                    <p className="text-sm text-muted-foreground">Highlight experience with large-scale datasets</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Research Impact</h4>
                    <p className="text-sm text-muted-foreground">Display research publications and insights generated</p>
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
                    Data Researchers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Statistical Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Survey Researchers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Quantitative Researchers
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

export default DataResearcher;