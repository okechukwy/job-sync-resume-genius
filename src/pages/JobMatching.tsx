import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Target, CheckCircle, AlertCircle, X } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { analyzeJobMatch, JobMatchingResult } from "@/utils/jobMatchingAnalyzer";

const JobMatching = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<JobMatchingResult | null>(null);
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

  const handleRemoveResume = () => {
    setUploadedResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setAnalysis(null); // Clear any existing analysis
    toast.info('Resume removed. You can upload a new one.');
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !uploadedResume) {
      toast.error('Please provide both job description and resume');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeJobMatch(jobDescription, uploadedResume);
      setAnalysis(result);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze job match. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Match Your Resume to{" "}
            <span className="gradient-text">Any Job</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Upload your resume and paste a job description to get instant analysis of how well you match the requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Job Description Input */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the job description here..."
                className="min-h-64 resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Resume Upload */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Resume
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveResume}
                      className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Click to upload your resume
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    Choose File
                  </Button>
                </div>
              )}
              
              <Button 
                variant="hero" 
                className="w-full mt-4" 
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || !uploadedResume || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Match'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Match Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Overall Match Score</h3>
                  <span className="text-2xl font-bold text-primary">{analysis.matchScore}%</span>
                </div>
                <Progress value={analysis.matchScore} className="h-3" />
              </div>

              {/* Matched Keywords */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Matched Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedKeywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Missing Keywords ({analysis.missingKeywords.length})
                </h3>
                {analysis.missingKeywords.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingKeywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="glass-card p-4 rounded-lg border-destructive/20 bg-destructive/5">
                      <p className="text-sm text-muted-foreground">
                        <strong>Action Required:</strong> Consider adding these keywords to your resume. Include them in your skills section, work experience descriptions, or project summaries where relevant and truthful.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card p-4 rounded-lg border-success/20 bg-success/5">
                    <p className="text-sm text-success">Excellent! Your resume contains all the key terms from the job description.</p>
                  </div>
                )}
              </div>

              {/* Skills Gap Analysis */}
              <div>
                <h3 className="font-semibold mb-3">Skills Gap Analysis</h3>
                <div className="space-y-4">
                  {/* Missing High Priority Skills */}
                  {analysis.skillsGap.filter(skill => !skill.hasSkill && skill.importance === 'High').length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-destructive mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Critical Skills Missing
                      </h4>
                      <div className="space-y-2">
                        {analysis.skillsGap
                          .filter(skill => !skill.hasSkill && skill.importance === 'High')
                          .map((skill: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg border-destructive/20 bg-destructive/5">
                              <div className="flex items-center gap-3">
                                <AlertCircle className="h-5 w-5 text-destructive" />
                                <span className="font-medium">{skill.skill}</span>
                              </div>
                              <Badge variant="destructive">
                                {skill.importance} Priority
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Skills You Have */}
                  {analysis.skillsGap.filter(skill => skill.hasSkill).length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-success mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Skills You Have
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {analysis.skillsGap
                          .filter(skill => skill.hasSkill)
                          .map((skill: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg border-success/20 bg-success/5">
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-success" />
                                <span>{skill.skill}</span>
                              </div>
                              <Badge variant={skill.importance === 'High' ? 'destructive' : 'secondary'} className="bg-success/20 text-success">
                                ✓ Match
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Medium/Low Priority Missing Skills */}
                  {analysis.skillsGap.filter(skill => !skill.hasSkill && skill.importance !== 'High').length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Additional Skills to Consider
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {analysis.skillsGap
                          .filter(skill => !skill.hasSkill && skill.importance !== 'High')
                          .map((skill: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
                              <div className="flex items-center gap-3">
                                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                <span>{skill.skill}</span>
                              </div>
                              <Badge variant="secondary">
                                {skill.importance} Priority
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Action Plan for CV Optimization
                </h3>
                <div className="space-y-3">
                  {analysis.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="glass-card p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm">{rec}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Additional optimization tips */}
                  <div className="mt-6 p-4 glass-card rounded-lg border border-blue-500/20 bg-blue-500/5">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">💡 Pro Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Quantify achievements with numbers and percentages</li>
                      <li>• Use action verbs at the beginning of bullet points</li>
                      <li>• Mirror the language and terminology used in the job posting</li>
                      <li>• Keep your resume to 1-2 pages for maximum impact</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobMatching;