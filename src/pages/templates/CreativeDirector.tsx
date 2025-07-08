import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const CreativeDirector = () => {
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
          <div className="text-6xl mb-4">🎯</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Creative Director Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Creative Director{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Executive design for creative leaders. 
            Perfect for showcasing your strategic vision, team leadership, and industry-changing creative work.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Visionary</Badge>
            <Badge variant="outline">Strategic</Badge>
            <Badge variant="outline">Award-Winning</Badge>
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
                  <div className="border-b-2 border-amber-200 pb-4">
                    <h2 className="text-2xl font-bold text-amber-900">Alex CreativeLeader</h2>
                    <p className="text-amber-600 font-medium">Executive Creative Director</p>
                    <p className="text-sm text-gray-600">alex.creativeleader@agency.com | (555) 123-4567 | Cannes Grand Prix Winner</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2 border-l-4 border-amber-400 pl-3">CREATIVE VISION</h3>
                    <p className="text-sm text-gray-700">
                      Visionary creative director with 15+ years leading global creative teams and award-winning campaigns...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2 border-l-4 border-amber-400 pl-3">LEADERSHIP EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Creative Strategy</div>
                      <div>• Team Leadership</div>
                      <div>• Brand Vision</div>
                      <div>• Client Relations</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2 border-l-4 border-amber-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Executive Creative Director</h4>
                          <span className="text-sm text-amber-600 font-medium">2015 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Global Creative Agency</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Led creative team of 50+ across 12 global offices</li>
                          <li>Won 25+ international creative awards including Cannes Lions</li>
                        </ul>
                      </div>
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
                    <h4 className="font-medium">Executive Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Showcase industry-leading campaigns and strategic vision</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Leadership Impact</h4>
                    <p className="text-sm text-muted-foreground">Highlight team leadership and organizational transformation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Industry Recognition</h4>
                    <p className="text-sm text-muted-foreground">Display prestigious awards and creative achievements</p>
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
                    Creative Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Executive Creative Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Chief Creative Officers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Creative Strategists
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

export default CreativeDirector;