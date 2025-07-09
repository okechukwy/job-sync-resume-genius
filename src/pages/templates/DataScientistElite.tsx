import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TemplateActions } from "@/components/template-preview";

const DataScientistElite = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Data Science Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-24 left-20 w-24 h-24 border border-primary/20 rounded-full">
          <div className="absolute inset-2 border border-primary/15 rounded-full">
            <div className="absolute inset-3 bg-primary/10 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-36 right-24 w-20 h-20 border border-primary/15 rounded-full">
          <div className="absolute inset-3 border border-primary/12 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary/12 rounded-full"></div>
      </div>
      
      {/* Data Visualization Elements */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/3 left-1/6 w-32 h-2 bg-primary/15 rounded-full"></div>
        <div className="absolute top-1/3 left-1/6 w-28 h-2 bg-primary/12 rounded-full mt-1"></div>
        <div className="absolute top-1/3 left-1/6 w-24 h-2 bg-primary/10 rounded-full mt-2"></div>
        <div className="absolute bottom-1/4 right-1/5 w-4 h-16 bg-primary/12"></div>
        <div className="absolute bottom-1/4 right-1/5 w-4 h-12 bg-primary/15 ml-2"></div>
        <div className="absolute bottom-1/4 right-1/5 w-4 h-20 bg-primary/10 ml-4"></div>
      </div>
      {/* Header */}
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Template Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-subtle">📊</div>
          <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
            Data Scientist Elite Template
          </Badge>
          <h1 className="visual-hierarchy-1 mb-6 animate-fade-in">
            Data Scientist Elite{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="visual-hierarchy-body max-w-2xl mx-auto animate-fade-in">
            Perfect for data scientists and machine learning engineers. 
            Showcase your analytical skills and ML expertise.
          </p>
          
          <div className="flex flex-wrap justify-center spacing-grid mt-6 animate-fade-in">
            <Badge variant="outline" className="hover-scale">Analytics</Badge>
            <Badge variant="outline" className="hover-scale">Research</Badge>
            <Badge variant="outline" className="hover-scale">Modern</Badge>
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
                  <div className="border-b-2 border-purple-200 pb-4">
                    <h2 className="text-2xl font-bold text-purple-900">Dr. Sarah Analytics</h2>
                    <p className="text-purple-600 font-medium">Senior Data Scientist</p>
                    <p className="text-sm text-gray-600">sarah.data@ml.com | (555) 123-4567 | LinkedIn: /sarahanalytics</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">RESEARCH SUMMARY</h3>
                    <p className="text-sm text-gray-700">
                      PhD Data Scientist with 7+ years developing ML models and statistical analysis...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">TECHNICAL EXPERTISE</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Python, R, SQL</div>
                      <div>• TensorFlow, PyTorch</div>
                      <div>• Scikit-learn, Pandas</div>
                      <div>• AWS SageMaker, MLflow</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior Data Scientist</h4>
                          <span className="text-sm text-purple-600 font-medium">2020 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">AI Research Lab</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Built ML models with 95% accuracy for customer prediction</li>
                          <li>Published 15 peer-reviewed papers in top-tier journals</li>
                        </ul>
                      </div>
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
                    <h4 className="font-medium">Research Publications</h4>
                    <p className="text-sm text-muted-foreground">Dedicated section for academic papers and research</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">ML Model Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Showcase your machine learning projects and results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Statistical Analysis</h4>
                    <p className="text-sm text-muted-foreground">Highlight data analysis and statistical expertise</p>
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
                    Data Scientists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    ML Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Research Scientists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Statistical Analysts
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <TemplateActions templateName="Data Scientist Elite" />
      </div>
    </div>
  );
};

export default DataScientistElite;