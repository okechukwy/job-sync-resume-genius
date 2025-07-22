
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { TemplateActions } from "@/components/template-preview/TemplateActions";
import { LivePreview } from "@/components/live-preview";
import { sampleResumeData } from "@/data/sampleResumeData";

const CleanMinimalist = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 glass-card">
            ✨ Clean Minimalist Template
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Clean Minimalist{" "}
            <span className="gradient-text">Template</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ultra-clean typography and layout perfect for modern professionals who prefer simplicity and elegance.
          </p>
        </div>

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
                  data={sampleResumeData}
                  template="clean-minimalist"
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
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm">Minimalist Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm">Clean Typography</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm">Modern Layout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm">Spacious Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm">Professional Focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm">ATS Optimized</span>
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
                    "Product Managers",
                    "Business Analysts",
                    "Consultants",
                    "Modern Professionals",
                    "Executive Assistants",
                    "Operations Managers"
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
                  {["Business", "Technology", "Consulting", "Product Management"].map((industry, index) => (
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
                      <div className="w-full h-full bg-gray-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">100%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Simplicity</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gray-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">100%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Elegance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gray-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions 
          templateName="Clean Minimalist" 
          templateId="clean-minimalist"
        />
      </div>
    </div>
  );
};

export default CleanMinimalist;
