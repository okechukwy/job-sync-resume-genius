import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const SocialMediaManager = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Social Media Background Pattern */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-20 left-16 w-18 h-18 border border-primary/20 rounded-lg">
          <div className="absolute inset-2 bg-primary/10 rounded-md"></div>
        </div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-primary/15 rounded-full">
          <div className="absolute inset-2 border border-primary/12 rounded-full"></div>
        </div>
        <div className="absolute bottom-40 left-1/4 w-14 h-14 border border-primary/15 rounded-sm transform rotate-45"></div>
        <div className="absolute bottom-56 right-1/3 w-20 h-20 border border-primary/10 rounded-lg transform -rotate-12"></div>
      </div>
      
      {/* Engagement Metrics Visualization */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/3 left-1/5 w-24 h-2 bg-primary/15 rounded-full"></div>
        <div className="absolute top-1/3 left-1/5 w-20 h-2 bg-primary/12 rounded-full mt-1"></div>
        <div className="absolute top-1/3 left-1/5 w-16 h-2 bg-primary/10 rounded-full mt-2"></div>
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
          <div className="text-6xl mb-6 hover-scale text-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>📲</div>
          <Badge variant="secondary" className="mb-6 glass-card typography-caption hover-scale" style={{ animationDelay: "0.2s" }}>
            Social Media Manager Template
          </Badge>
          <h1 className="typography-display text-4xl md:text-5xl font-bold mb-6 text-contrast-high animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Social Media Manager{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="typography-body text-lg text-contrast-medium max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Engaging design for social media professionals. 
            Perfect for showcasing your community building, content strategy, and viral campaign expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Engaging</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Community</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Viral</Badge>
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
                  <div className="border-b-2 border-blue-200 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900">Taylor SocialGuru</h2>
                    <p className="text-blue-600 font-medium">Senior Social Media Manager</p>
                    <p className="text-sm text-gray-600">taylor.socialguru@agency.com | (555) 123-4567 | @taylorsocial</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">SOCIAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Creative social media manager with 6+ years building engaged communities and viral campaigns...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">SOCIAL EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Content Strategy</div>
                      <div>• Community Management</div>
                      <div>• Influencer Relations</div>
                      <div>• Social Analytics</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Social Media Manager</h4>
                          <span className="text-sm text-blue-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Social Impact Agency</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Grew follower base by 300% across all platforms</li>
                          <li>Created viral campaign reaching 10M+ impressions</li>
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
                    <h4 className="font-medium">Community Growth</h4>
                    <p className="text-sm text-muted-foreground">Showcase follower growth and engagement metrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Content Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Highlight viral content and successful campaigns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Platform Expertise</h4>
                    <p className="text-sm text-muted-foreground">Display mastery across multiple social platforms</p>
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
                    Social Media Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Community Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Content Creators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Social Media Strategists
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

export default SocialMediaManager;