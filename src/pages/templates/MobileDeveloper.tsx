import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const MobileDeveloper = () => {
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
          <div className="text-6xl mb-6 hover-scale text-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>📱</div>
          <Badge variant="secondary" className="mb-6 glass-card typography-caption hover-scale" style={{ animationDelay: "0.2s" }}>
            Mobile Developer Template
          </Badge>
          <h1 className="typography-display text-4xl md:text-5xl font-bold mb-6 text-contrast-high animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Mobile Developer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="typography-body text-lg text-contrast-medium max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Designed for iOS and Android app developers. 
            Perfect for showcasing mobile apps and cross-platform expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Mobile</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Apps</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Innovation</Badge>
          </div>
        </div>

        <div className="spacing-grid grid grid-cols-1 lg:grid-cols-2 mb-12">
          <Card className="glass-card hover-lift animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <CardHeader className="spacing-content">
              <CardTitle className="typography-heading flex items-center gap-2 text-contrast-high">
                <Eye className="w-5 h-5 text-primary" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-8 rounded-xl shadow-lg min-h-[600px] border hover-lift animate-fade-in">
                <div className="spacing-content">
                  <div className="bg-gradient-to-r from-purple-900 to-violet-900 text-white rounded-xl p-8 -mx-8 -mt-8 mb-8">
                    <h2 className="typography-heading text-3xl font-bold mb-3">Alex Mobile</h2>
                    <p className="typography-body text-purple-100 font-medium text-lg">Senior Mobile Developer</p>
                    <p className="typography-caption text-purple-200 mt-2">alex.mobile@apps.com | (555) 123-4567 | iOS & Android Expert</p>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-purple-600 pl-4">MOBILE EXPERTISE</h3>
                    <p className="resume-content-text">
                      Mobile developer with 6+ years building high-performance iOS and Android apps...
                    </p>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-purple-600 pl-4">TECHNICAL SKILLS</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-purple-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                        Swift, Kotlin, Dart
                      </div>
                      <div className="text-purple-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                        React Native, Flutter
                      </div>
                      <div className="text-purple-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                        iOS & Android SDKs
                      </div>
                      <div className="text-purple-600 typography-body font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                        App Store Optimization
                      </div>
                    </div>
                  </div>
                  
                  <div className="hover-scale">
                    <h3 className="resume-section-title border-l-4 border-purple-600 pl-4">EXPERIENCE</h3>
                    <div className="bg-contrast-medium rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="typography-heading font-semibold text-lg text-contrast-high">Senior Mobile Developer</h4>
                          <p className="typography-body text-contrast-medium font-medium">Mobile Innovations Inc.</p>
                        </div>
                        <span className="resume-meta-text text-purple-600">2021 - Present</span>
                      </div>
                      <ul className="space-y-2 resume-content-text">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                          Developed 15+ apps with 4.8+ App Store ratings
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                          Led cross-platform development for 2M+ users
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="spacing-content animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <Card className="glass-card hover-lift">
              <CardHeader className="spacing-content">
                <CardTitle className="typography-heading text-contrast-high">Template Features</CardTitle>
              </CardHeader>
              <CardContent className="spacing-content">
                <div className="flex items-start gap-3 hover-scale">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 hover-scale"></div>
                  <div>
                    <h4 className="typography-body font-semibold text-contrast-high">App Portfolio</h4>
                    <p className="typography-caption text-contrast-medium leading-relaxed">Showcase published apps and download metrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover-scale">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 hover-scale"></div>
                  <div>
                    <h4 className="typography-body font-semibold text-contrast-high">Platform Expertise</h4>
                    <p className="typography-caption text-contrast-medium leading-relaxed">Highlight iOS, Android, and cross-platform skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover-scale">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 hover-scale"></div>
                  <div>
                    <h4 className="typography-body font-semibold text-contrast-high">User Metrics</h4>
                    <p className="typography-caption text-contrast-medium leading-relaxed">Display app store ratings and user engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="spacing-content">
                <CardTitle className="typography-heading text-contrast-high">Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="spacing-content typography-body">
                  <li className="flex items-center gap-3 hover-scale">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full hover-scale"></div>
                    <span className="text-contrast-high">iOS Developers</span>
                  </li>
                  <li className="flex items-center gap-3 hover-scale">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full hover-scale"></div>
                    <span className="text-contrast-high">Android Developers</span>
                  </li>
                  <li className="flex items-center gap-3 hover-scale">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full hover-scale"></div>
                    <span className="text-contrast-high">React Native Developers</span>
                  </li>
                  <li className="flex items-center gap-3 hover-scale">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full hover-scale"></div>
                    <span className="text-contrast-high">Flutter Developers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center spacing-content animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button variant="hero" size="lg" className="min-w-48 hover-lift focus-ring">
                <FileText className="w-4 h-4 mr-2" />
                <span className="typography-body font-medium">Use This Template</span>
              </Button>
            </Link>
            <Button variant="glass" size="lg" className="min-w-48 hover-lift focus-ring">
              <Download className="w-4 h-4 mr-2" />
              <span className="typography-body font-medium">Download Sample</span>
            </Button>
          </div>
          <p className="typography-caption text-contrast-medium mt-6">
            Free to use • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileDeveloper;