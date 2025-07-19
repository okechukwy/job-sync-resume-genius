import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, CheckCircle, AlertCircle, XCircle, Info, Target, Lightbulb, TrendingUp, TestTube } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { readFileContent } from "@/utils/fileReader";
import { optimizeForATS, ATSOptimizationResult } from "@/services/openaiServices";
import OptimizationTesting from "@/components/ats-analysis/OptimizationTesting";
const ATSAnalysis = () => {
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ATSOptimizationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("Business");
  const [showTesting, setShowTesting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const industries = ["Technology", "Healthcare", "Finance", "Creative", "Business", "Research", "Marketing", "Sales", "Education", "Manufacturing", "Retail"];
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOC, or DOCX file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }
    setUploadedResume(file);
    setAnalysis(null); // Clear previous analysis
    toast.success('Resume uploaded successfully!');
  };
  const handleAnalyze = async () => {
    if (!uploadedResume) {
      toast.error('Please upload a resume first');
      return;
    }
    setIsAnalyzing(true);
    try {
      console.log('Starting comprehensive resume analysis...');

      // Extract text from uploaded resume
      const resumeText = await readFileContent(uploadedResume);
      console.log('Extracted resume text length:', resumeText?.length || 0);
      if (!resumeText || resumeText.trim().length < 50) {
        toast.error('Unable to extract sufficient text from your resume. Please ensure it\'s not an image-based PDF and try again.');
        setIsAnalyzing(false);
        return;
      }

      // Validate inputs before sending
      if (resumeText.length > 15000) {
        console.log('Resume text is very long, truncating for API limits...');
      }
      console.log('Calling ATS optimization service with comprehensive analysis...');

      // Call the AI optimization service
      const result = await optimizeForATS(resumeText, jobDescription.trim() || undefined, selectedIndustry);
      console.log('Analysis result received:', {
        atsScore: result?.atsScore,
        contentOptimizations: result?.contentOptimizations?.length,
        formatOptimizations: result?.formatOptimizations?.length
      });
      if (!result) {
        throw new Error('No analysis result received');
      }
      setAnalysis(result);
      toast.success(`Comprehensive ATS analysis complete! Score: ${result.atsScore}/100 with ${result.contentOptimizations.length} content optimizations`);
    } catch (error) {
      console.error('Analysis error:', error);

      // Show more specific error messages
      let errorMessage = 'Failed to analyze resume. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('Insufficient resume content')) {
          errorMessage = 'Your resume doesn\'t contain enough text for analysis. Please upload a text-based resume.';
        } else if (error.message.includes('Service configuration error')) {
          errorMessage = 'Analysis service is temporarily unavailable. Please try again later.';
        } else if (error.message.includes('Invalid request format')) {
          errorMessage = 'There was an issue processing your request. Please try uploading your resume again.';
        } else {
          errorMessage = error.message;
        }
      }
      toast.error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };
  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-destructive/10 text-destructive border-destructive/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-primary/10 text-primary border-primary/20'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'quantification':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'keywords':
        return <Target className="h-4 w-4 text-green-500" />;
      case 'action-verbs':
        return <Lightbulb className="h-4 w-4 text-purple-500" />;
      case 'achievement':
        return <CheckCircle className="h-4 w-4 text-orange-500" />;
      case 'industry-alignment':
        return <Info className="h-4 w-4 text-indigo-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  const getCategoryBadge = (category: string) => {
    const colors = {
      quantification: 'bg-blue-50 text-blue-700 border-blue-200',
      keywords: 'bg-green-50 text-green-700 border-green-200',
      'action-verbs': 'bg-purple-50 text-purple-700 border-purple-200',
      achievement: 'bg-orange-50 text-orange-700 border-orange-200',
      'industry-alignment': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      formatting: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[category as keyof typeof colors] || colors.formatting;
  };
  const getGroupedOptimizations = () => {
    if (!analysis?.contentOptimizations) return {};
    return analysis.contentOptimizations.reduce((groups, optimization) => {
      const section = optimization.section;
      if (!groups[section]) {
        groups[section] = [];
      }
      groups[section].push(optimization);
      return groups;
    }, {} as Record<string, typeof analysis.contentOptimizations>);
  };
  return <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Optimize Your Resume for{" "}
            <span className="gradient-text">ATS Systems</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get comprehensive insights and actionable suggestions to improve your resume's ATS compatibility score.
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
          <CardContent className="space-y-6">
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
            
            {uploadedResume ? <div className="glass-card p-4 rounded-lg border border-success/20 bg-success/5 mb-4">
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
                  <div className="flex gap-2">
                    
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      Change File
                    </Button>
                  </div>
                </div>
              </div> : <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Upload your resume for comprehensive ATS analysis</p>
                <p className="text-muted-foreground mb-6">
                  Supported formats: PDF, DOC, DOCX (max 5MB)
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Choose File
                </Button>
              </div>}

            {/* Industry Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Target Industry</Label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Description (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description (Optional)</Label>
              <Textarea id="jobDescription" placeholder="Paste the job description for more targeted optimization..." value={jobDescription} onChange={e => setJobDescription(e.target.value)} className="min-h-[100px]" />
              <p className="text-sm text-muted-foreground">
                Adding a job description will provide more targeted keyword analysis and recommendations.
              </p>
            </div>
            
            {uploadedResume && <Button variant="hero" className="w-full" onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? 'Analyzing ATS Compatibility...' : 'Start Comprehensive ATS Analysis'}
              </Button>}
          </CardContent>
        </Card>

        {/* Testing Component */}
        {showTesting && uploadedResume && <div className="mb-8">
            <OptimizationTesting resumeText="" jobDescription={jobDescription} industry={selectedIndustry} />
          </div>}

        {/* Analysis Results */}
        {analysis && <div className="space-y-8">
            {/* Overall Score */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  ATS Compatibility Score
                  <Badge variant="outline" className="text-sm">
                    {analysis.contentOptimizations.length} Content Optimizations
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                      {analysis.atsScore}
                    </div>
                    <div className="text-muted-foreground">out of 100</div>
                  </div>
                </div>
                <Progress value={analysis.atsScore} className="h-4" />
              </CardContent>
            </Card>

            {/* Keyword Analysis */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Keyword Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-success">Found Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordMatches.found.map((keyword, index) => <Badge key={index} variant="secondary" className="bg-success/10 text-success border-success/20">
                          {keyword}
                        </Badge>)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-warning">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordMatches.missing.map((keyword, index) => <Badge key={index} variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                          {keyword}
                        </Badge>)}
                    </div>
                  </div>
                </div>
                
                {analysis.keywordMatches.suggestions.length > 0 && <div className="mt-6">
                    <h3 className="font-semibold mb-3">Keyword Suggestions</h3>
                    <ul className="space-y-2">
                      {analysis.keywordMatches.suggestions.map((suggestion, index) => <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {suggestion}
                        </li>)}
                    </ul>
                  </div>}
              </CardContent>
            </Card>

            {/* Format Optimizations */}
            {analysis.formatOptimizations.length > 0 && <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Format Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.formatOptimizations.map((optimization, index) => <div key={index} className="glass-card p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          {getPriorityIcon(optimization.priority)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{optimization.issue}</h4>
                              <Badge className={getPriorityBadge(optimization.priority)}>
                                {optimization.priority}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{optimization.recommendation}</p>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {/* Content Optimizations - Enhanced Display with Grouping */}
            {analysis.contentOptimizations.length > 0 && <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Content Improvements ({analysis.contentOptimizations.length} comprehensive suggestions)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive optimizations across all major resume sections
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(getGroupedOptimizations()).map(([sectionName, optimizations]) => <div key={sectionName} className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">
                          {sectionName} ({optimizations.length} improvement{optimizations.length !== 1 ? 's' : ''})
                        </h3>
                        {optimizations.map((optimization, index) => <div key={`${sectionName}-${index}`} className="glass-card p-4 rounded-lg border border-border/50">
                            <div className="flex items-start gap-3 mb-3">
                              {getCategoryIcon(optimization.category || 'formatting')}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {optimization.category && <Badge className={getCategoryBadge(optimization.category)}>
                                      {optimization.category.replace('-', ' ')}
                                    </Badge>}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Current:</p>
                                <p className="text-sm bg-muted/50 p-3 rounded border">{optimization.current}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-success mb-2">Improved:</p>
                                <p className="text-sm bg-success/10 p-3 rounded border border-success/20">{optimization.improved}</p>
                              </div>
                            </div>
                            
                            <div className="bg-primary/5 p-3 rounded border border-primary/10">
                              <p className="text-sm text-muted-foreground">
                                <strong>Why this helps:</strong> {optimization.reasoning}
                              </p>
                            </div>
                          </div>)}
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {/* Overall Recommendations */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysis.overallRecommendations.map((rec, index) => <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {rec}
                    </li>)}
                </ul>
              </CardContent>
            </Card>
          </div>}
      </div>
    </div>;
};
export default ATSAnalysis;