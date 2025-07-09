import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const MedicalDoctor = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Medical Professional Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-16 left-12 w-32 h-32 border border-primary/20 rounded-full">
          <div className="absolute inset-4 border border-primary/15 rounded-full">
            <div className="absolute inset-4 bg-primary/10 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-28 right-16 w-28 h-28 border border-primary/15 rounded-full">
          <div className="absolute inset-3 border border-primary/12 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 border border-primary/10 rounded-full"></div>
      </div>
      
      {/* Medical Cross Symbols */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/6 w-5 h-20 bg-primary/12"></div>
        <div className="absolute top-1/4 left-1/6 w-20 h-5 bg-primary/12 mt-7.5"></div>
        <div className="absolute bottom-1/3 right-1/5 w-4 h-16 bg-primary/10"></div>
        <div className="absolute bottom-1/3 right-1/5 w-16 h-4 bg-primary/10 mt-6"></div>
      </div>
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">👨‍⚕️</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Medical Doctor Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Medical Doctor{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Sophisticated template for physicians and specialists. 
            Perfect for highlighting medical expertise and clinical experience.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Medical</Badge>
            <Badge variant="outline" className="hover-scale">Professional</Badge>
            <Badge variant="outline" className="hover-scale">Prestigious</Badge>
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
                  <div className="border-b-2 border-blue-200 pb-4">
                    <h2 className="text-2xl font-bold text-blue-900">Dr. Michael Johnson, MD</h2>
                    <p className="text-blue-600 font-medium">Board-Certified Cardiologist</p>
                    <p className="text-sm text-gray-600">m.johnson@hospital.com | (555) 123-4567 | License: MD123456</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">MEDICAL SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      Board-certified cardiologist with 15+ years providing exceptional patient care...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">SPECIALIZATIONS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Interventional Cardiology</div>
                      <div>• Cardiac Catheterization</div>
                      <div>• Preventive Cardiology</div>
                      <div>• Heart Failure Management</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">CLINICAL EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Cardiologist</h4>
                          <span className="text-sm text-blue-600 font-medium">2015 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">Metropolitan Medical Center</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Performed 500+ cardiac catheterizations with 98% success rate</li>
                          <li>Led heart failure clinic serving 200+ patients annually</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2 border-l-4 border-blue-400 pl-3">EDUCATION & CERTIFICATION</h3>
                    <div className="text-sm text-gray-700">
                      <div>• MD, Harvard Medical School (2005)</div>
                      <div>• Cardiology Fellowship, Mayo Clinic (2010)</div>
                      <div>• Board Certified Internal Medicine & Cardiology</div>
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
                    <h4 className="font-medium">Medical Credentials</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive section for licenses and certifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Clinical Experience</h4>
                    <p className="text-sm text-muted-foreground">Detailed patient care and procedure statistics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Research & Publications</h4>
                    <p className="text-sm text-muted-foreground">Space for medical research and published papers</p>
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
                    Medical Doctors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Surgeons
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Department Heads
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Medical Doctor" />
      </div>
    </div>
  );
};

export default MedicalDoctor;