import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const HealthcareSpecialist = () => {
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
          <div className="text-6xl mb-4">🏥</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Healthcare Specialist Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Healthcare Specialist{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perfect for doctors, nurses, and healthcare professionals. 
            Professional format that emphasizes your medical expertise and patient care experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Professional</Badge>
            <Badge variant="outline">Detailed</Badge>
            <Badge variant="outline">Credible</Badge>
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
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Dr. Sarah Johnson, MD</h2>
                    <p className="text-gray-600">Internal Medicine Physician</p>
                    <p className="text-sm text-gray-500">sarah.johnson@hospital.com | (555) 123-4567 | Medical License: #MD12345</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Board-certified Internal Medicine physician with 8+ years of experience in patient care...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">MEDICAL EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Internal Medicine</div>
                      <div>• Preventive Care</div>
                      <div>• Chronic Disease Management</div>
                      <div>• Electronic Health Records</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">CLINICAL EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Attending Physician</h4>
                          <span className="text-sm text-gray-500">2020 - Present</span>
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
                    <h3 className="font-semibold text-gray-900 mb-2">EDUCATION & CERTIFICATIONS</h3>
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
                    <h4 className="font-medium">Medical Credentials Section</h4>
                    <p className="text-sm text-muted-foreground">Prominent display of licenses and certifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Clinical Experience Focus</h4>
                    <p className="text-sm text-muted-foreground">Emphasizes patient care and medical achievements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Professional Format</h4>
                    <p className="text-sm text-muted-foreground">Conservative design appropriate for healthcare settings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Continuing Education</h4>
                    <p className="text-sm text-muted-foreground">Section for ongoing training and certifications</p>
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
                    Physicians & Doctors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Registered Nurses
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Medical Specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Healthcare Administrators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Medical Technicians
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

export default HealthcareSpecialist;