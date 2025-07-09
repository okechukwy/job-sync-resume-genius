import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const MotionGraphics = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Motion Graphics Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-6 h-32 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent transform rotate-12 rounded-full"></div>
        <div className="absolute top-40 right-28 w-8 h-28 bg-gradient-to-t from-accent/15 via-accent/8 to-transparent transform -rotate-15 rounded-full"></div>
        <div className="absolute bottom-40 left-1/3 w-4 h-24 bg-gradient-to-b from-primary/15 to-transparent transform rotate-30 rounded-full"></div>
        <div className="absolute bottom-60 right-1/4 w-10 h-20 bg-gradient-to-t from-primary/12 to-transparent transform -rotate-8 rounded-full"></div>
      </div>
      
      {/* Animation Path Lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-10 w-40 h-px bg-gradient-to-r from-primary/15 via-primary/8 to-transparent transform rotate-6"></div>
        <div className="absolute bottom-1/3 right-12 w-32 h-px bg-gradient-to-l from-accent/12 via-accent/6 to-transparent transform -rotate-12"></div>
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
          <div className="text-6xl mb-4">🎭</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Motion Graphics Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Motion Graphics{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dynamic design for animation professionals. 
            Perfect for showcasing your motion design portfolio, technical animation skills, and creative storytelling.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Dynamic</Badge>
            <Badge variant="outline">Creative</Badge>
            <Badge variant="outline">Animated</Badge>
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
                  <div className="border-b-2 border-violet-200 pb-4">
                    <h2 className="text-2xl font-bold text-violet-900">Sam MotionMaster</h2>
                    <p className="text-violet-600 font-medium">Senior Motion Graphics Designer</p>
                    <p className="text-sm text-gray-600">sam.motionmaster@studio.com | (555) 123-4567 | sammotions.com</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-violet-900 mb-2 border-l-4 border-violet-400 pl-3">CREATIVE SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Innovative motion graphics designer with 9+ years creating compelling animations and visual effects...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-violet-900 mb-2 border-l-4 border-violet-400 pl-3">ANIMATION SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• After Effects</div>
                      <div>• Cinema 4D</div>
                      <div>• 2D/3D Animation</div>
                      <div>• Visual Effects</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-violet-900 mb-2 border-l-4 border-violet-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Motion Graphics Designer</h4>
                          <span className="text-sm text-violet-600 font-medium">2018 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Animation Studios Inc</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Created 200+ motion graphics for broadcast and digital</li>
                          <li>Won Emmy nomination for outstanding graphics design</li>
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
                    <h4 className="font-medium">Animation Showcase</h4>
                    <p className="text-sm text-muted-foreground">Display your best motion graphics and animation work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Technical Expertise</h4>
                    <p className="text-sm text-muted-foreground">Highlight software proficiency and animation techniques</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Industry Recognition</h4>
                    <p className="text-sm text-muted-foreground">Showcase awards, recognition, and notable projects</p>
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
                    Motion Graphics Designers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    2D/3D Animators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Visual Effects Artists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Broadcast Designers
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

export default MotionGraphics;