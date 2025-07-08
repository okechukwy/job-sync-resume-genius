import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ContentCreator = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
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
          <div className="text-6xl mb-4">📝</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Content Creator Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Content Creator{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Social media and content creation specialists design. 
            Perfect for showcasing your creative content and engagement metrics.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Content</Badge>
            <Badge variant="outline">Social Media</Badge>
            <Badge variant="outline">Engaging</Badge>
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
                  <div className="border-b-2 border-pink-200 pb-4">
                    <h2 className="text-2xl font-bold text-pink-900">Maya Content</h2>
                    <p className="text-pink-600 font-medium">Content Creator & Social Media Specialist</p>
                    <p className="text-sm text-gray-600">maya.content@social.com | (555) 123-4567 | @mayacontent</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-pink-900 mb-2 border-l-4 border-pink-400 pl-3">CREATIVE SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Dynamic content creator with 5+ years building engaged communities across platforms...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-pink-900 mb-2 border-l-4 border-pink-400 pl-3">CONTENT SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Video Production</div>
                      <div>• Social Media Strategy</div>
                      <div>• Content Writing</div>
                      <div>• Analytics & Growth</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-pink-900 mb-2 border-l-4 border-pink-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Content Creator</h4>
                          <span className="text-sm text-pink-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Digital Media Co.</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Grew follower base from 10K to 500K across platforms</li>
                          <li>Created viral content with 50M+ total views</li>
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
                    <h4 className="font-medium">Social Media Metrics</h4>
                    <p className="text-sm text-muted-foreground">Highlight follower growth and engagement statistics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Content Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Showcase your best content and viral posts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Platform Expertise</h4>
                    <p className="text-sm text-muted-foreground">Demonstrate knowledge across multiple platforms</p>
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
                    Content Creators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Social Media Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Influencers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Video Editors
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

export default ContentCreator;