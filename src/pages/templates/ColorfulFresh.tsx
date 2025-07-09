import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ColorfulFresh = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Creative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-28 h-28 bg-gradient-to-br from-primary/15 to-primary/25 rounded-full">
          <div className="absolute inset-4 bg-gradient-to-tl from-primary/20 to-primary/10 rounded-full"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-24 h-24 bg-gradient-to-tr from-primary/12 to-primary/18 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-bl from-primary/10 to-primary/15 rounded-full"></div>
      </div>
      
      {/* Vibrant Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-36 h-3 bg-gradient-to-r from-primary/15 via-primary/25 to-primary/12 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-3 h-24 bg-gradient-to-b from-primary/20 via-primary/15 to-primary/8 rounded-full"></div>
        <div className="absolute top-2/3 left-1/2 w-16 h-16 border-2 border-primary/12 rounded-full"></div>
      </div>
      
      {/* Header */}
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
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">🎯</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Colorful Fresh Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Colorful Fresh{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Vibrant and energetic design perfect for young professionals and dynamic industries. 
            Bold colors that showcase your personality and creativity.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Vibrant</Badge>
            <Badge variant="outline" className="hover-scale">Energetic</Badge>
            <Badge variant="outline" className="hover-scale">Bold</Badge>
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
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">JD</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Jordan Davis</h2>
                      <p className="text-orange-600 font-semibold">Digital Marketing Specialist</p>
                      <p className="text-sm text-gray-600">jordan.davis@email.com | (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-blue-800 mb-2">🚀 ABOUT ME</h3>
                    <p className="text-sm text-gray-700">
                      Passionate digital marketer with 3+ years driving brand growth through innovative campaigns...
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 text-sm mb-2">💡 CREATIVE SKILLS</h4>
                      <div className="space-y-1 text-xs text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Social Media Strategy
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Content Creation
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 text-sm mb-2">📊 ANALYTICS</h4>
                      <div className="space-y-1 text-xs text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Google Analytics
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          A/B Testing
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h3 className="font-bold text-orange-800 mb-3">🏆 EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-gray-900 text-sm">Marketing Specialist</h4>
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">2022 - Now</span>
                        </div>
                        <p className="text-orange-600 text-sm font-medium">BrandBoost Agency</p>
                        <div className="mt-1">
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                            Increased client social engagement by 150%
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                            Managed campaigns for 15+ brands
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border-l-4 border-teal-500">
                    <h3 className="font-bold text-teal-800 mb-2">🎓 EDUCATION</h3>
                    <div className="text-sm">
                      <h4 className="font-semibold text-gray-900">Bachelor of Marketing</h4>
                      <p className="text-teal-600">State University • 2020</p>
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
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Vibrant Color Scheme</h4>
                    <p className="text-sm text-muted-foreground">Bold, energetic colors that stand out</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Creative Icons</h4>
                    <p className="text-sm text-muted-foreground">Fun emoji and visual elements throughout</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Modular Sections</h4>
                    <p className="text-sm text-muted-foreground">Color-coded sections for easy navigation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Personal Branding</h4>
                    <p className="text-sm text-muted-foreground">Avatar and personality-focused design</p>
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
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Digital Marketers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                    Social Media Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    Content Creators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Sales Representatives
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Young Professionals
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

export default ColorfulFresh;