import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { ResumeLayoutRenderer } from "@/components/resume-layouts/ResumeLayoutRenderer";
import { healthcareProfessionalSample, templateStyles } from "@/data/sampleResumeData";

const HealthcareSpecialist = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Healthcare Industry Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-primary/10 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 border-2 border-primary/15 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/10 rounded-full"></div>
      </div>
      
      {/* Subtle Medical Cross Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-1/6 w-6 h-20 bg-primary/10"></div>
        <div className="absolute top-1/4 left-1/6 w-20 h-6 bg-primary/10 mt-7"></div>
        <div className="absolute bottom-1/3 right-1/5 w-4 h-16 bg-primary/8"></div>
        <div className="absolute bottom-1/3 right-1/5 w-16 h-4 bg-primary/8 mt-6"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12 spacing-content">
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-6 hover-scale text-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>🏥</div>
          <Badge variant="secondary" className="mb-6 glass-card typography-caption hover-scale" style={{ animationDelay: "0.2s" }}>
            Healthcare Specialist Template
          </Badge>
          <h1 className="typography-display text-4xl md:text-5xl font-bold mb-6 text-contrast-high animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Healthcare Specialist{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="typography-body text-lg text-contrast-medium max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Professional format for healthcare professionals. 
            Perfect for emphasizing your medical expertise, clinical experience, and patient care achievements.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Professional</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Clinical</Badge>
            <Badge variant="outline" className="typography-caption hover-scale border-primary/30">Credentialed</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 typography-heading">
                <Eye className="w-5 h-5" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg shadow-lg min-h-[600px] border hover-glow smooth-transition">
                <div className="space-y-4">
                  <div className="border-b-2 border-blue-200 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900">Dr. Sarah Johnson, MD</h2>
                    <p className="text-blue-600 font-medium">Internal Medicine Physician</p>
                    <p className="text-sm text-gray-600">sarah.johnson@hospital.com | (555) 123-4567 | Medical License: #MD12345</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Board-certified Internal Medicine physician with 8+ years of experience in patient care...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">MEDICAL EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Internal Medicine</div>
                      <div>• Preventive Care</div>
                      <div>• Chronic Disease Management</div>
                      <div>• Electronic Health Records</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">CLINICAL EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Attending Physician</h4>
                          <span className="text-sm text-blue-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">City General Hospital</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Manage 40+ patients daily in internal medicine unit</li>
                          <li>Reduced readmission rates by 25% through care coordination</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">EDUCATION & CERTIFICATIONS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• MD - Harvard Medical School (2015)</div>
                      <div>• Internal Medicine Residency - Johns Hopkins (2018)</div>
                      <div>• Board Certified - American Board of Internal Medicine</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="typography-heading">Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 hover-scale smooth-transition">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium typography-body">Medical Credentials Section</h4>
                    <p className="text-sm text-contrast-medium">Prominent display of licenses and certifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover-scale smooth-transition">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium typography-body">Clinical Experience Focus</h4>
                    <p className="text-sm text-contrast-medium">Emphasizes patient care and medical achievements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover-scale smooth-transition">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium typography-body">Professional Format</h4>
                    <p className="text-sm text-contrast-medium">Conservative design appropriate for healthcare settings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover-scale smooth-transition">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium typography-body">Continuing Education</h4>
                    <p className="text-sm text-contrast-medium">Section for ongoing training and certifications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="typography-heading">Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 hover-scale smooth-transition">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Physicians & Doctors
                  </li>
                  <li className="flex items-center gap-2 hover-scale smooth-transition">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Registered Nurses
                  </li>
                  <li className="flex items-center gap-2 hover-scale smooth-transition">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Medical Specialists
                  </li>
                  <li className="flex items-center gap-2 hover-scale smooth-transition">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Healthcare Administrators
                  </li>
                  <li className="flex items-center gap-2 hover-scale smooth-transition">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Medical Technicians
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-started">
              <Button variant="hero" size="lg" className="min-w-48 hover-lift focus-ring">
                <FileText className="w-4 h-4 mr-2" />
                Use This Template
              </Button>
            </Link>
            <Button variant="glass" size="lg" className="min-w-48 hover-lift focus-ring">
              <Download className="w-4 h-4 mr-2" />
              Download Sample
            </Button>
          </div>
          <p className="text-sm text-contrast-medium typography-body">
            Free to use • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthcareSpecialist;