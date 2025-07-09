import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const VideoEditor = () => {
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

      <div className="max-w-6xl mx-auto px-4 py-12 spacing-content">
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-6 hover-scale text-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>🎬</div>
          <Badge variant="secondary" className="mb-6 glass-card typography-caption hover-scale" style={{ animationDelay: "0.2s" }}>
            Video Editor Template
          </Badge>
          <h1 className="typography-display text-4xl md:text-5xl font-bold mb-6 text-contrast-high animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Video Editor{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="typography-body text-lg text-contrast-medium max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Creative design for video professionals. 
            Perfect for showcasing your portfolio, technical skills, and visual storytelling expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Creative</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Technical</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Storytelling</Badge>
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
                  <div className="border-b-2 border-red-200 pb-4">
                    <h2 className="text-2xl font-bold text-red-900">Alex VideoMaster</h2>
                    <p className="text-red-600 font-medium">Senior Video Editor</p>
                    <p className="text-sm text-gray-600">alex.videomaster@studio.com | (555) 123-4567 | Portfolio: alexvideos.com</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2 border-l-4 border-red-400 pl-3">CREATIVE SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Skilled video editor with 7+ years creating compelling visual narratives across multiple platforms...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2 border-l-4 border-red-400 pl-3">TECHNICAL EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Adobe Premiere Pro</div>
                      <div>• After Effects</div>
                      <div>• DaVinci Resolve</div>
                      <div>• Motion Graphics</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2 border-l-4 border-red-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Video Editor</h4>
                          <span className="text-sm text-red-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Creative Media Studios</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Edited 100+ promotional videos reaching 5M+ views</li>
                          <li>Reduced post-production time by 30% through workflow optimization</li>
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
                    <h4 className="font-medium">Portfolio Integration</h4>
                    <p className="text-sm text-muted-foreground">Showcase your best video work and creative projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Technical Skills Focus</h4>
                    <p className="text-sm text-muted-foreground">Highlight software proficiency and technical expertise</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Creative Metrics</h4>
                    <p className="text-sm text-muted-foreground">Display view counts, engagement, and project impact</p>
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
                    Video Editors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Motion Graphics Artists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Post-Production Specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Content Creators
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

export default VideoEditor;