import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const PharmacistPro = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Pharmacy Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-32 h-24 border border-primary/20 rounded-lg transform rotate-3">
          <div className="absolute inset-3 border border-primary/15 rounded-md transform -rotate-6"></div>
        </div>
        <div className="absolute bottom-32 right-24 w-28 h-20 border border-primary/15 rounded-lg transform -rotate-8"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-18 border border-primary/12 rounded-md transform rotate-12"></div>
      </div>
      
      {/* Pill/Medicine Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 flex gap-2">
          <div className="w-4 h-8 bg-primary/15 rounded-full"></div>
          <div className="w-4 h-6 bg-primary/12 rounded-full"></div>
          <div className="w-4 h-10 bg-primary/10 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/5 w-8 h-8 border-2 border-primary/12 rounded-full">
          <div className="absolute inset-1 bg-primary/8 rounded-full"></div>
        </div>
      </div>
      
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">💊</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Pharmacist Pro Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Pharmacist Pro{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Clinical and retail pharmacy professionals. 
            Perfect for showcasing your pharmaceutical expertise and patient care skills.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Clinical</Badge>
            <Badge variant="outline" className="hover-scale">Precise</Badge>
            <Badge variant="outline" className="hover-scale">Trustworthy</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 spacing-grid mb-12">
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
                  <div className="border-b-2 border-emerald-200 pb-4">
                    <h2 className="text-2xl font-bold text-emerald-900">Dr. Rachel Pharmacy</h2>
                    <p className="text-emerald-600 font-medium">Clinical Pharmacist, PharmD</p>
                    <p className="text-sm text-gray-600">rachel.pharm@hospital.com | (555) 123-4567 | Licensed RPh</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2 border-l-4 border-emerald-400 pl-3">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Licensed pharmacist with 8+ years providing clinical pharmacy services and patient care...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2 border-l-4 border-emerald-400 pl-3">CORE COMPETENCIES</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Medication Therapy</div>
                      <div>• Clinical Consultation</div>
                      <div>• Drug Interactions</div>
                      <div>• Patient Counseling</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2 border-l-4 border-emerald-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Clinical Pharmacist</h4>
                          <span className="text-sm text-emerald-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Regional Medical Center</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Provided medication therapy management for 500+ patients</li>
                          <li>Reduced adverse drug events by 35% through clinical interventions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="spacing-content">
            <Card className="glass-card hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="visual-hierarchy-3">Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Clinical Expertise</h4>
                    <p className="text-sm text-muted-foreground">Highlight medication therapy and clinical interventions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Patient Care Focus</h4>
                    <p className="text-sm text-muted-foreground">Showcase counseling and patient education skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Regulatory Compliance</h4>
                    <p className="text-sm text-muted-foreground">Display knowledge of pharmaceutical regulations</p>
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
                    Clinical Pharmacists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Retail Pharmacists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Hospital Pharmacists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Pharmaceutical Specialists
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

export default PharmacistPro;