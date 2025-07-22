
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { TemplateHeader } from "@/components/template-preview/TemplateHeader";
import { TemplateActions } from "@/components/template-preview";
import { LivePreview } from "@/components/live-preview";
import { techProfessionalSample } from "@/data/sampleResumeData";

const ResearchScientist = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <TemplateHeader
          emoji="🔬"
          title="Research Scientist"
          description="Analytical design for research professionals. Perfect for showcasing research publications, methodologies, and scientific achievements."
          tags={["Analytical", "Scientific", "Research"]}
          badgeText="Research Scientist Template"
        />

        {/* Template Preview and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Template Preview */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                  <Badge variant="outline">Interactive</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <LivePreview
                  data={techProfessionalSample}
                  template="research-scientist"
                  className="h-[600px] rounded-lg overflow-hidden border border-border/20"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Template Information */}
          <div className="space-y-6">
            {/* Template Features */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Publication List</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Research Metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Technical Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Laboratory Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Grant Writing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">ATS Compatible</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Perfect For */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Perfect For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Research Scientists",
                    "PhD Researchers",
                    "Principal Investigators",
                    "Laboratory Directors",
                    "Clinical Researchers",
                    "Data Scientists"
                  ].map((role, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industries */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Industries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Research", "Biotechnology", "Pharmaceuticals", "Academia"].map((industry, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Stats */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ATS Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-full h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">97%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Scientific Appeal</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-full h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">98%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Readability</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-full h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions 
          templateName="Research Scientist" 
          templateId="research-scientist"
        />
      </div>
    </div>
  );
};

export default ResearchScientist;
