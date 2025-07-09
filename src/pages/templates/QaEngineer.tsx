import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const QaEngineer = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* QA Testing Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-24 left-16 w-20 h-20 border-2 border-primary/20">
          <div className="absolute inset-2 border border-primary/15">
            <div className="absolute inset-2 border border-primary/10">
              <div className="absolute inset-1 bg-primary/8"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-16 h-16 border border-primary/15 rotate-45">
          <div className="absolute inset-2 border border-primary/12 rotate-45"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 w-18 h-18 border border-primary/12 rounded-sm"></div>
      </div>
      
      {/* Test Case Grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/3 left-1/5 w-32 h-24 border-l border-t border-primary/10">
          <div className="absolute top-2 left-2 w-6 h-4 bg-primary/8"></div>
          <div className="absolute top-8 left-2 w-8 h-4 bg-primary/6"></div>
          <div className="absolute top-14 left-2 w-4 h-4 bg-primary/10"></div>
        </div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔍</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            QA Engineer Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            QA Engineer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality-focused design for testing professionals. 
            Perfect for showcasing test automation, quality assurance, and bug detection expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Quality</Badge>
            <Badge variant="outline">Systematic</Badge>
            <Badge variant="outline">Reliable</Badge>
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
                  <div className="border-b-2 border-orange-200 pb-4">
                    <h2 className="text-2xl font-bold text-orange-900">Taylor QualityFirst</h2>
                    <p className="text-orange-600 font-medium">Senior QA Engineer</p>
                    <p className="text-sm text-gray-600">t.qualityfirst@testtech.com | (555) 123-4567 | ISTQB Certified</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">QA EXPERTISE</h3>
                    <p className="text-sm text-gray-700">
                      QA engineer with 7+ years ensuring software quality through comprehensive testing strategies...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">TESTING SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Test Automation</div>
                      <div>• Manual Testing</div>
                      <div>• API Testing</div>
                      <div>• Performance Testing</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior QA Engineer</h4>
                          <span className="text-sm text-orange-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">QualityTech Solutions</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Reduced bugs in production by 75%</li>
                          <li>Automated 90% of regression tests</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">TOOLS & FRAMEWORKS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• Selenium, Cypress</div>
                      <div>• Postman, REST Assured</div>
                      <div>• JMeter, LoadRunner</div>
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
                    <h4 className="font-medium">Quality Metrics</h4>
                    <p className="text-sm text-muted-foreground">Showcase bug reduction and quality improvements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Test Automation</h4>
                    <p className="text-sm text-muted-foreground">Highlight automation frameworks and coverage</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Testing Methodologies</h4>
                    <p className="text-sm text-muted-foreground">Display expertise in various testing approaches</p>
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
                    QA Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Test Automation Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Quality Assurance Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Software Testers
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

export default QaEngineer;