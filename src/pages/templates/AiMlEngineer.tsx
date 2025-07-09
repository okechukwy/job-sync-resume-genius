import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AiMlEngineer = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* AI/ML Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-16 left-12 w-24 h-24 border border-primary/20 rounded-full">
          <div className="absolute inset-2 border border-primary/15 rounded-full">
            <div className="absolute inset-2 border border-primary/10 rounded-full">
              <div className="absolute inset-2 bg-primary/8 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 right-16 w-20 h-20 border border-primary/15 rounded-full">
          <div className="absolute inset-3 border border-primary/12 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary/12 rounded-full">
          <div className="absolute inset-2 bg-primary/6 rounded-full"></div>
        </div>
      </div>
      
      {/* Neural Network Connections */}
      <div className="absolute inset-0 opacity-[0.025]">
        <div className="absolute top-1/4 left-1/5 w-32 h-px bg-primary/15 transform rotate-12"></div>
        <div className="absolute top-1/4 left-1/5 w-28 h-px bg-primary/12 transform rotate-45 mt-4"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-px bg-primary/10 transform -rotate-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-px bg-primary/8 transform -rotate-60 mt-3"></div>
      </div>
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
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🤖</div>
          <Badge variant="secondary" className="mb-4 glass-card">
            AI/ML Engineer Template
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI/ML Engineer{" "}
            <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Intelligent design for AI/ML professionals. 
            Perfect for showcasing machine learning models, neural networks, and data science expertise.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Intelligent</Badge>
            <Badge variant="outline">Data-Driven</Badge>
            <Badge variant="outline">Innovative</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
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
                  <div className="border-b-2 border-purple-200 pb-4">
                    <h2 className="text-2xl font-bold text-purple-900">Dr. AI Neural</h2>
                    <p className="text-purple-600 font-medium">Senior AI/ML Engineer</p>
                    <p className="text-sm text-gray-600">ai.neural@mltech.com | (555) 123-4567 | PhD Machine Learning</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">AI EXPERTISE</h3>
                    <p className="text-sm text-gray-700">
                      AI/ML engineer with 8+ years developing production-scale machine learning systems...
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">ML SKILLS</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div>• Deep Learning</div>
                      <div>• Neural Networks</div>
                      <div>• Computer Vision</div>
                      <div>• NLP</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">EXPERIENCE</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Senior AI/ML Engineer</h4>
                          <span className="text-sm text-purple-600 font-medium">2021 - Present</span>
                        </div>
                        <p className="text-sm text-gray-600">AI Innovations Inc</p>
                        <ul className="text-xs text-gray-700 mt-1 list-disc list-inside">
                          <li>Deployed 15+ ML models to production</li>
                          <li>Improved model accuracy by 25%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2 border-l-4 border-purple-400 pl-3">FRAMEWORKS</h3>
                    <div className="text-sm text-gray-700">
                      <div>• TensorFlow, PyTorch</div>
                      <div>• Scikit-learn, Keras</div>
                      <div>• MLflow, Kubeflow</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Model Performance</h4>
                    <p className="text-sm text-muted-foreground">Showcase accuracy improvements and deployment metrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">ML Frameworks</h4>
                    <p className="text-sm text-muted-foreground">Display expertise in modern ML/AI frameworks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium">Research Impact</h4>
                    <p className="text-sm text-muted-foreground">Highlight publications and innovative solutions</p>
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
                    AI/ML Engineers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Data Scientists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    Research Scientists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    ML Architects
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

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

export default AiMlEngineer;