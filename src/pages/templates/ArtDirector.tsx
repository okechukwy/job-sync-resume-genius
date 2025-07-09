import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ArtDirector = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Creative Industry Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-16 w-32 h-2 bg-gradient-to-r from-primary/20 to-transparent transform rotate-12"></div>
        <div className="absolute top-40 right-24 w-24 h-3 bg-gradient-to-l from-accent/20 to-transparent transform -rotate-6"></div>
        <div className="absolute bottom-60 left-1/3 w-40 h-1 bg-gradient-to-r from-transparent via-primary/15 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-32 right-1/4 w-28 h-2 bg-gradient-to-l from-primary/10 to-transparent transform -rotate-12"></div>
      </div>
      
      {/* Abstract Brush Strokes */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/3 left-10 w-48 h-8 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 transform rotate-3 rounded-full"></div>
        <div className="absolute bottom-1/4 right-16 w-36 h-6 bg-gradient-to-l from-accent/8 via-transparent to-accent/12 transform -rotate-6 rounded-full"></div>
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

      <div className="max-w-6xl mx-auto px-4 py-12 spacing-content">
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-6 hover-scale text-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>🎨</div>
          <Badge variant="secondary" className="mb-6 glass-card typography-caption hover-scale" style={{ animationDelay: "0.2s" }}>
            Art Director Template
          </Badge>
          <h1 className="typography-display text-4xl md:text-5xl font-bold mb-6 text-contrast-high animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Art Director{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="typography-body text-lg text-contrast-medium max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Visionary design for creative leaders. 
            Perfect for showcasing your creative vision, team leadership, and award-winning campaigns.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Visionary</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Leadership</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Award-Winning</Badge>
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
                  <div className="border-b-2 border-pink-200 pb-4">
                    <h2 className="text-2xl font-bold text-pink-900">Casey ArtVision</h2>
                    <p className="text-pink-600 font-medium">Senior Art Director</p>
                    <p className="text-sm text-gray-600">casey.artvision@agency.com | (555) 123-4567 | Cannes Lion Winner</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-pink-900 mb-2 border-l-4 border-pink-400 pl-3">CREATIVE VISION</h3>
                    <p className="text-sm text-gray-700">
                      Visionary art director with 10+ years leading creative teams to deliver award-winning campaigns...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-pink-900 mb-2 border-l-4 border-pink-400 pl-3">CREATIVE EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Creative Strategy</div>
                      <div>• Team Leadership</div>
                      <div>• Brand Development</div>
                      <div>• Campaign Direction</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-pink-900 mb-2 border-l-4 border-pink-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Art Director</h4>
                          <span className="text-sm text-pink-600 font-medium">2018 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Premier Creative Agency</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Led creative team of 15+ designers and artists</li>
                          <li>Won 8 industry awards for campaign excellence</li>
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
                    <h4 className="font-medium">Creative Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Showcase award-winning campaigns and creative direction</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Leadership Impact</h4>
                    <p className="text-sm text-muted-foreground">Highlight team leadership and creative development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Industry Recognition</h4>
                    <p className="text-sm text-muted-foreground">Display awards, recognition, and creative achievements</p>
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
                    Art Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Creative Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Visual Directors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Design Leads
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

export default ArtDirector;