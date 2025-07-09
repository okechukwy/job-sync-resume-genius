import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";
import { ResumeLayoutRenderer } from "@/components/resume-layouts/ResumeLayoutRenderer";
import { financeResumeData } from "@/data/sampleResumeData";
import { formatDate } from "@/lib/utils";

const CorporateFinance = () => {
  const financeStyles = {
    headerBg: "bg-gradient-finance",
    headerText: "text-finance-text",
    accentColor: "text-finance-primary",
    borderColor: "border-finance-border",
    sectionBorder: "border-l-4 border-finance-primary pl-3",
    layout: "sophisticated",
    spacing: "elegant",
    skillsGrid: true,
    backgroundPattern: "bg-finance-bg"
  };

  return (
    <div className="min-h-screen bg-gradient-sophisticated relative overflow-hidden">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">🏢</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Corporate Finance Template
          </Badge>
          <h1 className="typography-display mb-6 animate-fade-in">
            Corporate Finance{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="typography-body max-w-2xl mx-auto animate-fade-in text-contrast-medium">
            Corporate financial planning and analysis professionals showcasing strategic expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Corporate</Badge>
            <Badge variant="outline" className="hover-scale">Strategic</Badge>
            <Badge variant="outline" className="hover-scale">Executive</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="glass-card hover-lift animate-fade-in">
            <CardContent className="p-6">
              <div className="bg-finance-background rounded-lg p-6 min-h-[600px] finance-shadows">
                <ResumeLayoutRenderer 
                  data={financeResumeData}
                  styles={financeStyles}
                  layoutVariant="classic-professional"
                  formatDate={formatDate}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card hover-lift animate-fade-in">
              <CardContent className="p-6 space-y-4">
                <h3 className="typography-heading">Perfect For</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-finance-accent rounded-full"></div>
                    Corporate Finance Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-finance-accent rounded-full"></div>
                    Financial Planning & Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-finance-accent rounded-full"></div>
                    Treasury Managers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-finance-accent rounded-full"></div>
                    Corporate Development
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Corporate Finance" />
      </div>
    </div>
  );
};

export default CorporateFinance;