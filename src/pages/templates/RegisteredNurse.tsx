import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const RegisteredNurse = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Nursing Care Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-16 left-14 w-28 h-28 border border-primary/20 rounded-full">
          <div className="absolute inset-3 border border-primary/15 rounded-full">
            <div className="absolute inset-3 bg-primary/8 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-28 right-18 w-24 h-24 border border-primary/15 rounded-full">
          <div className="absolute inset-2 border border-primary/10 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/12 rounded-full"></div>
      </div>
      
      {/* Healthcare Plus Signs */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/5 w-4 h-16 bg-primary/10"></div>
        <div className="absolute top-1/4 left-1/5 w-16 h-4 bg-primary/10 mt-6"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-12 bg-primary/8"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-3 bg-primary/8 mt-4.5"></div>
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
          <div className="text-6xl mb-4">👩‍⚕️</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Registered Nurse Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Registered Nurse{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Caring design for nursing professionals. 
            Perfect for highlighting patient care experience and clinical skills.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Compassionate</Badge>
            <Badge variant="outline">Professional</Badge>
            <Badge variant="outline">Detailed</Badge>
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
                  <div className="border-b-2 border-green-200 pb-4">
                    <h2 className="text-2xl font-bold text-green-900">Sarah Caring, RN</h2>
                    <p className="text-green-600 font-medium">Registered Nurse - ICU Specialist</p>
                    <p className="text-sm text-gray-600">s.caring@hospital.com | (555) 123-4567 | License: RN123456</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">NURSING PHILOSOPHY</h3>
                    <p className="text-sm text-gray-700">
                      Compassionate registered nurse with 8+ years providing exceptional patient care...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">CLINICAL SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Critical Care Nursing</div>
                      <div>• Patient Assessment</div>
                      <div>• Medication Administration</div>
                      <div>• Emergency Response</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">ICU Staff Nurse</h4>
                          <span className="text-sm text-green-600 font-medium">2019 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">General Hospital</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Provided care for 150+ critical patients monthly</li>
                          <li>Achieved 98% patient satisfaction scores</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2 border-l-4 border-green-400 pl-3">CERTIFICATIONS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• BLS, ACLS, PALS Certified</div>
                      <div>• Critical Care Registered Nurse (CCRN)</div>
                      <div>• Bachelor of Science in Nursing</div>
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
                    <h4 className="font-medium">Patient Care Metrics</h4>
                    <p className="text-sm text-muted-foreground">Highlight patient satisfaction and care outcomes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Clinical Certifications</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive section for nursing credentials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Specialty Areas</h4>
                    <p className="text-sm text-muted-foreground">Showcase specialized nursing experience</p>
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
                    Registered Nurses
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    ICU Nurses
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Emergency Nurses
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Specialty Nurses
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

export default RegisteredNurse;