import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const RecentGraduate = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Academic Graduate Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-16 left-12 w-24 h-32 border border-primary/20 rounded-lg transform rotate-12">
          <div className="absolute inset-2 border border-primary/15 rounded-md transform -rotate-6">
            <div className="absolute inset-2 bg-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-24 right-16 w-20 h-20 border border-primary/15 rounded-full">
          <div className="absolute inset-3 bg-primary/8 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 right-1/4 w-16 h-24 border border-primary/12 rounded-lg transform -rotate-15"></div>
      </div>
      
      {/* Academic Achievement Lines */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent"></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/8 to-transparent"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">🎓</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Recent Graduate Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Recent Graduate{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Perfect for new graduates and entry-level positions. 
            Fresh, modern design that highlights your education, projects, and potential.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Fresh</Badge>
            <Badge variant="outline" className="hover-scale">Modern</Badge>
            <Badge variant="outline" className="hover-scale">Entry-Level</Badge>
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
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-blue-900">Alex Graduate</h2>
                    <p className="text-blue-600">Computer Science Graduate</p>
                    <p className="text-sm text-gray-500">alex.graduate@university.edu | (555) 123-4567 | GitHub: alexgrad</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">OBJECTIVE</h3>
                    <p className="text-sm text-gray-700">
                      Recent Computer Science graduate seeking entry-level software development position to apply technical skills...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">EDUCATION</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Bachelor of Science in Computer Science</h4>
                          <span className="text-sm text-gray-500">May 2024</span>
                        </div>
                        <p className="text-sm text-gray-600">University of Technology • GPA: 3.8/4.0</p>
                        <p className="text-xs text-gray-600">Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">TECHNICAL SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Java, Python, JavaScript</div>
                      <div>• React, HTML/CSS</div>
                      <div>• MySQL, MongoDB</div>
                      <div>• Git, GitHub</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">PROJECTS</h3>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-gray-900">E-Commerce Web Application</h4>
                        <p className="text-xs text-gray-700">
                          Built full-stack e-commerce platform using React and Node.js with user authentication and payment integration
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Machine Learning Stock Predictor</h4>
                        <p className="text-xs text-gray-700">
                          Developed Python application using scikit-learn to predict stock prices with 85% accuracy
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">EXPERIENCE</h3>
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-900">Software Development Intern</h4>
                        <span className="text-sm text-gray-500">Summer 2023</span>
                      </div>
                      <p className="text-sm text-gray-600">StartupTech Inc.</p>
                      <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                        <li>Contributed to mobile app development using React Native</li>
                        <li>Collaborated with team of 5 developers using Agile methodology</li>
                      </ul>
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
                    <h4 className="font-medium">Education Emphasis</h4>
                    <p className="text-sm text-muted-foreground">Prominently displays academic achievements and coursework</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Projects Showcase</h4>
                    <p className="text-sm text-muted-foreground">Dedicated section for academic and personal projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Skills Focus</h4>
                    <p className="text-sm text-muted-foreground">Highlights technical skills and programming languages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Fresh Design</h4>
                    <p className="text-sm text-muted-foreground">Modern layout that appeals to entry-level positions</p>
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
                    Recent College Graduates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Entry-Level Professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Career Changers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Internship Seekers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    New Graduates (Any Field)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
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

export default RecentGraduate;