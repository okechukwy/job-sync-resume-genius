import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ATSAnalysis = () => {
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOC, or DOCX file');
      return;
    }

    setUploadedResume(file);
    toast.success('Resume uploaded successfully!');
  };

  const handleAnalyze = async () => {
    if (!uploadedResume) {
      toast.error('Please upload a resume first');
      return;
    }

    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      const mockAnalysis = {
        overallScore: 82,
        categories: [
          { name: 'Format & Structure', score: 90, status: 'excellent' },
          { name: 'Content Quality', score: 85, status: 'good' },
          { name: 'Keyword Optimization', score: 75, status: 'needs-improvement' },
          { name: 'ATS Compatibility', score: 88, status: 'excellent' },
          { name: 'Contact Information', score: 95, status: 'excellent' },
          { name: 'Section Organization', score: 70, status: 'needs-improvement' }
        ],
        issues: [
          { type: 'critical', message: 'Missing professional email address format' },
          { type: 'warning', message: 'Some sections lack proper headings' },
          { type: 'info', message: 'Consider adding more industry-specific keywords' }
        ],
        recommendations: [
          'Add more action verbs to your experience descriptions',
          'Include quantifiable achievements with numbers and percentages',
          'Optimize section headings for better ATS parsing',
          'Add relevant technical skills section',
          'Use consistent formatting throughout the document'
        ],
        beforeAfter: {
          before: {
            atsScore: 65,
            keywordDensity: 3.2,
            readabilityScore: 70
          },
          after: {
            atsScore: 88,
            keywordDensity: 5.8,
            readabilityScore: 85
          }
        }
      };
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      toast.success('ATS analysis complete!');
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'good':
        return <Info className="h-5 w-5 text-primary" />;
      case 'needs-improvement':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      default:
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

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
            <div className="text-2xl font-bold gradient-text">ATS Score Optimization</div>
            <Badge variant="secondary" className="glass-card">Essential</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Optimize Your Resume for{" "}
            <span className="gradient-text">ATS Systems</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get detailed insights and actionable suggestions to improve your resume's ATS compatibility score.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upload Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="hidden"
            />
            
            {uploadedResume ? (
              <div className="glass-card p-4 rounded-lg border border-success/20 bg-success/5 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium text-success">{uploadedResume.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedResume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    Change File
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Upload your resume for ATS analysis</p>
                <p className="text-muted-foreground mb-6">
                  Supported formats: PDF, DOC, DOCX (max 5MB)
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Choose File
                </Button>
              </div>
            )}
            
            {uploadedResume && (
              <Button 
                variant="hero" 
                className="w-full" 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing ATS Compatibility...' : 'Start ATS Analysis'}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Overall Score */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">ATS Compatibility Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}
                    </div>
                    <div className="text-muted-foreground">out of 100</div>
                  </div>
                </div>
                <Progress value={analysis.overallScore} className="h-4" />
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Detailed Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.categories.map((category: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 glass-card rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(category.status)}
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${getScoreColor(category.score)}`}>
                          {category.score}%
                        </span>
                        <Progress value={category.score} className="w-24 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Issues Found */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Issues Found</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.issues.map((issue: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 glass-card rounded-lg">
                      {getIssueIcon(issue.type)}
                      <span>{issue.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Optimization Tips */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Before/After Comparison */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Before/After Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-4 text-muted-foreground">Before Optimization</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl font-bold text-destructive">{analysis.beforeAfter.before.atsScore}%</div>
                        <div className="text-sm text-muted-foreground">ATS Score</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{analysis.beforeAfter.before.keywordDensity}%</div>
                        <div className="text-sm text-muted-foreground">Keyword Density</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{analysis.beforeAfter.before.readabilityScore}</div>
                        <div className="text-sm text-muted-foreground">Readability Score</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-semibold mb-4 text-success">After Optimization</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl font-bold text-success">{analysis.beforeAfter.after.atsScore}%</div>
                        <div className="text-sm text-muted-foreground">ATS Score</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{analysis.beforeAfter.after.keywordDensity}%</div>
                        <div className="text-sm text-muted-foreground">Keyword Density</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{analysis.beforeAfter.after.readabilityScore}</div>
                        <div className="text-sm text-muted-foreground">Readability Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSAnalysis;