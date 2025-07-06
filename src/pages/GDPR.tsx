import { ArrowLeft, Shield, Download, Trash2, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GDPR = () => {
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">GDPR</span> Compliance
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your data protection rights under the General Data Protection Regulation
          </p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Your Rights Under GDPR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                As a data subject under GDPR, you have several important rights regarding your personal data. 
                ResumeAI is committed to protecting these rights and making it easy for you to exercise them.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border border-border/20">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Download className="w-4 h-4 text-primary" />
                    Right to Access
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You can request a copy of all personal data we hold about you.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border border-border/20">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Edit className="w-4 h-4 text-primary" />
                    Right to Rectification
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You can request correction of inaccurate or incomplete data.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border border-border/20">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-primary" />
                    Right to Erasure
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You can request deletion of your personal data ("right to be forgotten").
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border border-border/20">
                  <h3 className="font-semibold mb-2">Right to Portability</h3>
                  <p className="text-sm text-muted-foreground">
                    You can request your data in a machine-readable format.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>How We Process Your Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Legal Basis for Processing</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Consent: When you explicitly agree to data processing</li>
                  <li>Contract: To provide our resume optimization services</li>
                  <li>Legitimate Interest: To improve our services and prevent fraud</li>
                  <li>Legal Obligation: To comply with applicable laws</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Retention</h3>
                <p className="text-muted-foreground text-sm">
                  We retain your personal data only for as long as necessary to provide our services 
                  or as required by law. Account data is typically deleted within 30 days of account closure.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When we transfer your data outside the European Economic Area (EEA), we ensure 
                appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Adequacy decisions for certain countries</li>
                <li>Appropriate technical and organizational measures</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Data Protection Officer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any questions about your data protection rights or our data processing practices, 
                you can contact our Data Protection Officer:
              </p>
              <div className="bg-muted/20 p-4 rounded-lg">
                <p className="font-medium">Email: dpo@resumeai.com</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We will respond to your request within 30 days as required by GDPR.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Exercise Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                To exercise any of your GDPR rights, please contact us through one of the methods below. 
                We may need to verify your identity before processing your request.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Contact Us
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Download My Data
                </Button>
                <Button variant="outline" size="lg">
                  Delete My Account
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Supervisory Authority</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                If you believe we have not handled your personal data in accordance with GDPR, 
                you have the right to lodge a complaint with your local supervisory authority. 
                You can find your local authority at{" "}
                <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" 
                   className="text-primary hover:underline" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  edpb.europa.eu
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GDPR;