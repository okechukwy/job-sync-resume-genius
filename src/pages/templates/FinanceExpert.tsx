import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";
import { ResumeLayoutRenderer } from "@/components/resume-layouts/ResumeLayoutRenderer";
import { financeProfessionalSample, templateStyles } from "@/data/sampleResumeData";

const FinanceExpert = () => {
  return (
    <div className="min-h-screen bg-gradient-finance relative overflow-hidden">
      {/* Sophisticated Finance Background with Gold Accents */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-16 w-32 h-20 border border-finance-primary/30 rounded-lg">
          <div className="absolute inset-3 border border-finance-secondary/20 rounded-md">
            <div className="absolute inset-2 bg-finance-primary/10 rounded-sm"></div>
          </div>
        </div>
        <div className="absolute bottom-32 right-20 w-28 h-18 border border-finance-border rounded-lg transform rotate-6"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-16 border border-finance-accent/20 rounded-md transform -rotate-3"></div>
      </div>
      
      {/* Financial Chart Elements with Gold Accents */}
      <div className="absolute inset-0 opacity-[0.04]">
        {/* Rising chart bars in gold */}
        <div className="absolute top-1/3 left-1/6">
          <div className="flex items-end gap-1">
            <div className="w-3 h-8 bg-finance-primary/20"></div>
            <div className="w-3 h-12 bg-finance-primary/25"></div>
            <div className="w-3 h-16 bg-finance-primary/30"></div>
            <div className="w-3 h-20 bg-finance-primary/35"></div>
            <div className="w-3 h-14 bg-finance-primary/25"></div>
          </div>
        </div>
        
        {/* Sophisticated grid pattern */}
        <svg className="absolute bottom-1/4 right-1/5 opacity-20" width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--finance-primary))" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      {/* Header */}
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💼</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            Finance Expert Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Finance Expert{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for banking, accounting, and finance professionals. 
            Corporate format that highlights your analytical skills and financial expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Corporate</Badge>
            <Badge variant="outline">Analytical</Badge>
            <Badge variant="outline">Precise</Badge>
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
              <div className="bg-white p-4 rounded-lg shadow-lg min-h-[600px] border overflow-hidden">
                <div className="scale-75 origin-top-left w-[133%] h-[133%]">
                  <ResumeLayoutRenderer 
                    data={financeProfessionalSample}
                    styles={templateStyles.finance}
                    layoutVariant="classic-professional"
                    formatDate={(date) => {
                      if (!date) return '';
                      const [year, month] = date.split('-');
                      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      return `${monthNames[parseInt(month) - 1]} ${year}`;
                    }}
                  />
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
                    <h4 className="font-medium">Quantified Achievements</h4>
                    <p className="text-sm text-muted-foreground">Emphasizes financial metrics and measurable results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Professional Certifications</h4>
                    <p className="text-sm text-muted-foreground">Highlights CFA, CPA, FRM and other credentials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Corporate Design</h4>
                    <p className="text-sm text-muted-foreground">Professional layout suitable for financial institutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Technical Skills Focus</h4>
                    <p className="text-sm text-muted-foreground">Dedicated section for financial software and tools</p>
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
                    Financial Analysts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Investment Bankers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Accountants & CPAs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Portfolio Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Financial Consultants
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <TemplateActions templateName="Finance Expert" />
      </div>
    </div>
  );
};

export default FinanceExpert;