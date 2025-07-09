import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const ProjectManager = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Project Management Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-24 border border-primary/20 rounded-lg transform rotate-6">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-3"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-20 border border-primary/15 rounded-lg transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-18 border border-primary/12 rounded-md transform rotate-8"></div>
      </div>
      
      {/* Calendar/Timeline Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 grid grid-cols-4 gap-1">
          <div className="w-3 h-3 bg-primary/15 rounded-sm"></div>
          <div className="w-3 h-3 bg-primary/12 rounded-sm"></div>
          <div className="w-3 h-3 bg-primary/10 rounded-sm"></div>
          <div className="w-3 h-3 bg-primary/8 rounded-sm"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 w-16 h-2 bg-primary/12 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-12 h-2 bg-primary/15 rounded-full mt-1"></div>
        <div className="absolute bottom-1/3 right-1/5 w-20 h-2 bg-primary/10 rounded-full mt-2"></div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">📅</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Project Manager Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Project Manager{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Project management and delivery specialists. 
            Perfect for showcasing your organizational skills and successful project deliveries.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Project Management</Badge>
            <Badge variant="outline" className="hover-scale">Organized</Badge>
            <Badge variant="outline" className="hover-scale">Leadership</Badge>
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
                    <h2 className="text-2xl font-bold text-purple-900">Alex Planning</h2>
                    <p className="text-purple-600 font-medium">Senior Project Manager</p>
                    <p className="text-sm text-gray-600">alex.pm@company.com | (555) 123-4567 | PMP Certified</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">PROJECT SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Certified project manager with 7+ years successfully delivering complex projects on time and budget...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Agile/Scrum</div>
                      <div>• Risk Management</div>
                      <div>• Stakeholder Management</div>
                      <div>• Budget Planning</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Project Manager</h4>
                          <span className="text-sm text-purple-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Tech Innovation Inc.</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Delivered 25+ projects worth $5M+ with 98% on-time delivery</li>
                          <li>Led cross-functional teams of 15+ members</li>
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
                    <h4 className="font-medium">Project Success Metrics</h4>
                    <p className="text-sm text-muted-foreground">Highlight on-time delivery and budget performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Methodology Expertise</h4>
                    <p className="text-sm text-muted-foreground">Showcase Agile, Scrum, and PM certifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Team Leadership</h4>
                    <p className="text-sm text-muted-foreground">Display cross-functional team management skills</p>
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
                    Project Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Scrum Masters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Program Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Delivery Managers
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

export default ProjectManager;