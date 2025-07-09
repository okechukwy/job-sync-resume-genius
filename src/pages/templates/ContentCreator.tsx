import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const ContentCreator = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Content Creation Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-24 border border-primary/20 rounded-xl transform rotate-12">
          <div className="absolute inset-3 border border-primary/15 rounded-lg transform -rotate-6"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-28 bg-gradient-to-br from-primary/15 to-primary/8 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-20 border border-primary/12 rounded-lg transform -rotate-8"></div>
      </div>
      
      {/* Social Media Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-primary/15 rounded-full"></div>
        <div className="absolute top-1/4 left-1/6 w-4 h-4 bg-primary/12 rounded-full ml-8 mt-2"></div>
        <div className="absolute top-1/4 left-1/6 w-5 h-5 bg-primary/10 rounded-full ml-14 mt-4"></div>
        
        <div className="absolute bottom-1/3 right-1/5 w-16 h-2 bg-primary/12 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-12 h-2 bg-primary/15 rounded-full mt-1"></div>
        <div className="absolute bottom-1/3 right-1/5 w-20 h-2 bg-primary/10 rounded-full mt-2"></div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">📝</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Content Creator Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Content Creator{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Social media and content creation specialists design. 
            Perfect for showcasing your creative content and engagement metrics.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Content</Badge>
            <Badge variant="outline" className="hover-scale">Social Media</Badge>
            <Badge variant="outline" className="hover-scale">Engaging</Badge>
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
          <div className="spacing-content">
            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Template Features</CardTitle>
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

            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Perfect For</CardTitle>
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