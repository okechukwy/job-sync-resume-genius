
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { TemplateActions } from "@/components/template-preview/TemplateActions";
import { LivePreview } from "@/components/live-preview";
import { sampleResumeData } from "@/data/sampleResumeData";

const GradientCreative = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 glass-card">
            🎆 Gradient Creative Template
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gradient Creative{" "}
            <span className="gradient-text">Template</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pink-purple gradient design for creative roles that demand attention and showcase artistic vision.
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
                  template="gradient-creative"
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
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm">Gradient Header</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm">Creative Focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm">Modern Layout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm">Eye-catching Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    <span className="text-sm">Portfolio Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
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
                    "Creative Directors",
                    "Marketing Creatives",
                    "Brand Designers", 
                    "Visual Artists",
                    "Art Directors",
                    "Design Managers"
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
                  {["Creative", "Marketing", "Design", "Media"].map((industry, index) => (
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
                      <div className="w-4/5 h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">90%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Visual Impact</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">100%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Creativity</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-xs font-medium">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions 
          templateName="Gradient Creative" 
          templateId="gradient-creative"
        />
      </div>
    </div>
  );
};

export default GradientCreative;
