import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const GraphicDesigner = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🖌️</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Graphic Designer Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Graphic Designer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visual-focused design for graphic artists. 
            Perfect for showcasing your creative portfolio and design expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Visual</Badge>
            <Badge variant="outline">Artistic</Badge>
            <Badge variant="outline">Portfolio-Ready</Badge>
          </div>
        </div>

        {/* Template Preview and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Template Preview */}
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
                    <h2 className="text-2xl font-bold text-orange-900">Alex Designer</h2>
                    <p className="text-orange-600 font-medium">Senior Graphic Designer</p>
                    <p className="text-sm text-gray-600">alex.designer@creative.com | (555) 123-4567 | Portfolio: alexdesigns.com</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">CREATIVE SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Innovative graphic designer with 8+ years creating compelling visual communications...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">DESIGN EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Adobe Creative Suite</div>
                      <div>• Brand Identity Design</div>
                      <div>• Print & Digital Design</div>
                      <div>• Typography & Layout</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2 border-l-4 border-orange-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Graphic Designer</h4>
                          <span className="text-sm text-orange-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Creative Studio Inc.</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Designed 50+ brand identities increasing client satisfaction by 85%</li>
                          <li>Led creative direction for major advertising campaigns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Details */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Visual Portfolio Integration</h4>
                    <p className="text-sm text-muted-foreground">Showcase your best design work and projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Creative Color Scheme</h4>
                    <p className="text-sm text-muted-foreground">Eye-catching design that reflects artistic skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Typography Focus</h4>
                    <p className="text-sm text-muted-foreground">Beautiful typography that showcases design sense</p>
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
                    Graphic Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Visual Artists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Brand Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Print Designers
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

export default GraphicDesigner;