import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Target, CheckCircle, AlertCircle, X, TrendingUp, Users, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { analyzeJobMatch, JobMatchingResult } from "@/utils/jobMatchingAnalyzer";
import { FileReadResult } from "@/utils/fileReader";
import FileProcessingResults from "@/components/FileProcessingResults";

const JobMatching = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<JobMatchingResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processingResult, setProcessingResult] = useState<FileReadResult | null>(null);
  const [manualResumeContent, setManualResumeContent] = useState<string>("");
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
    setProcessingResult(null);
    setAnalysis(null);
    setManualResumeContent("");
    toast.success('Resume uploaded successfully!');
  };

  const handleRemoveResume = () => {
    setUploadedResume(null);
    setProcessingResult(null);
    setManualResumeContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setAnalysis(null);
    toast.info('Resume removed. You can upload a new one.');
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please provide a job description');
      return;
    }

    if (!uploadedResume && !manualResumeContent.trim()) {
      toast.error('Please upload a resume or provide manual content');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeJobMatch(
        jobDescription, 
        uploadedResume!, 
        manualResumeContent || undefined
      );
      
      setAnalysis(result);
      setProcessingResult(result.processingResult || null);
      
      // Show appropriate success message based on confidence
      if (result.analysisConfidence === 'high') {
        toast.success('Analysis complete with high confidence!');
      } else if (result.analysisConfidence === 'medium') {
        toast.success('Analysis complete! Consider the confidence notes for best results.');
      } else {
        toast.success('Analysis complete, but confidence is low. See suggestions below.');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error(error.message || 'Failed to analyze job match. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleManualInput = (content: string) => {
    setManualResumeContent(content);
    toast.success('Manual content added successfully!');
  };

  const handleRetryAnalysis = async () => {
    if (uploadedResume && jobDescription.trim()) {
      await handleAnalyze();
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
                disabled={!jobDescription.trim() || (!uploadedResume && !manualResumeContent.trim()) || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Match'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* File Processing Results */}
        {processingResult && uploadedResume && (
          <FileProcessingResults
            fileName={uploadedResume.name}
            processingResult={processingResult}
            onManualInput={handleManualInput}
            onRetryAnalysis={handleRetryAnalysis}
          />
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Analysis Confidence Indicator */}
            {analysis.analysisConfidence !== 'high' && (
              <Card className="glass-card border-warning/20 bg-warning/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <h3 className="font-semibold">Analysis Confidence: {analysis.analysisConfidence.toUpperCase()}</h3>
                  </div>
                  {analysis.analysisWarnings.map((warning, index) => (
                    <p key={index} className="text-sm text-muted-foreground mb-2">• {warning}</p>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Enhanced Match Score with Category Breakdown */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Enhanced Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Overall Match Score</h3>
                    <span className="text-2xl font-bold text-primary">{analysis.matchScore}%</span>
                  </div>
                  <Progress value={analysis.matchScore} className="h-3" />
                </div>

                {/* Enhanced Category Scores */}
                {analysis.enhancedAnalysis && (
                  <div>
                    <h3 className="font-semibold mb-3">Skills Category Breakdown</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(analysis.enhancedAnalysis.categoryScores).map(([category, score]) => (
                        <div key={category} className="glass-card p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium capitalize">{category}</span>
                            <span className="font-bold text-primary">{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contextual Insights */}
                {analysis.enhancedAnalysis && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Contextual Insights
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary">{analysis.enhancedAnalysis.contextualInsights.industryFit}%</div>
                        <div className="text-sm text-muted-foreground">Industry Fit</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary">{analysis.enhancedAnalysis.contextualInsights.roleLevelMatch}%</div>
                        <div className="text-sm text-muted-foreground">Role Level Match</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary">{analysis.enhancedAnalysis.contextualInsights.experienceAlignment}%</div>
                        <div className="text-sm text-muted-foreground">Experience Alignment</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary">{analysis.enhancedAnalysis.contextualInsights.cultureMatch}%</div>
                        <div className="text-sm text-muted-foreground">Culture Match</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Competitive Analysis */}
            {analysis.enhancedAnalysis && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Competitive Position Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Strengths */}
                  <div>
                    <h4 className="font-medium text-success mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Your Competitive Strengths
                    </h4>
                    <div className="space-y-2">
                      {analysis.enhancedAnalysis.competitivePosition.strengthsVsMarket.map((strength, index) => (
                        <div key={index} className="glass-card p-3 rounded-lg border-success/20 bg-success/5">
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unique Differentiators */}
                  {analysis.enhancedAnalysis.competitivePosition.uniqueDifferentiators.length > 0 && (
                    <div>
                      <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Your Unique Differentiators
                      </h4>
                      <div className="space-y-2">
                        {analysis.enhancedAnalysis.competitivePosition.uniqueDifferentiators.map((diff, index) => (
                          <div key={index} className="glass-card p-3 rounded-lg border-primary/20 bg-primary/5">
                            <span className="text-sm">{diff}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Market Gaps */}
                  {analysis.enhancedAnalysis.competitivePosition.gapsVsMarket.length > 0 && (
                    <div>
                      <h4 className="font-medium text-warning mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Areas for Improvement
                      </h4>
                      <div className="space-y-2">
                        {analysis.enhancedAnalysis.competitivePosition.gapsVsMarket.map((gap, index) => (
                          <div key={index} className="glass-card p-3 rounded-lg border-warning/20 bg-warning/5">
                            <span className="text-sm">{gap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

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

            {/* Enhanced Career Guidance with Personalized Insights */}
            {analysis.personalizedInsights && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Personalized Career Action Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Resume Profile Summary */}
                  <div>
                    <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-3">📊 Your Profile Analysis</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary">{analysis.personalizedInsights.resumeProfile.totalYearsExperience}</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary capitalize">{analysis.personalizedInsights.resumeProfile.experienceLevel}</div>
                        <div className="text-sm text-muted-foreground">Experience Level</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary">{analysis.personalizedInsights.resumeProfile.skills.length}</div>
                        <div className="text-sm text-muted-foreground">Skills Identified</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-primary capitalize">{analysis.personalizedInsights.competitivePosition.marketPosition.replace('-', ' ')}</div>
                        <div className="text-sm text-muted-foreground">Market Position</div>
                      </div>
                    </div>
                  </div>

                  {/* Salary Intelligence */}
                  <div>
                    <h4 className="font-medium text-green-600 dark:text-green-400 mb-3">💰 Salary Intelligence</h4>
                    <div className="glass-card p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">${analysis.personalizedInsights.marketIntelligence.averageSalary.min.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Market Min</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">${analysis.personalizedInsights.marketIntelligence.averageSalary.median.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Market Median</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">${analysis.personalizedInsights.marketIntelligence.averageSalary.max.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Market Max</div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p><strong>Your Expected Range:</strong> ${analysis.personalizedInsights.competitivePosition.recommendedStrategy.salaryNegotiation.expectedRange.min.toLocaleString()} - ${analysis.personalizedInsights.competitivePosition.recommendedStrategy.salaryNegotiation.expectedRange.max.toLocaleString()}</p>
                        <p><strong>Negotiation Position:</strong> <span className="capitalize">{analysis.personalizedInsights.competitivePosition.recommendedStrategy.salaryNegotiation.negotiationPosition}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Personalized Learning Paths */}
                  {analysis.personalizedInsights.learningPaths.length > 0 && (
                    <div>
                      <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-3">📚 Personalized Learning Paths</h4>
                      <div className="space-y-4">
                        {analysis.personalizedInsights.learningPaths.map((path, index) => (
                          <div key={index} className="glass-card p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-purple-700 dark:text-purple-300">{path.skill}</h5>
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                                {path.estimatedTimeWeeks} weeks
                              </Badge>
                            </div>
                            <div className="text-sm space-y-2">
                              <p><strong>Current Level:</strong> {path.currentLevel} → <strong>Target:</strong> {path.targetLevel}</p>
                              <p><strong>Priority Score:</strong> {path.priorityScore}/100</p>
                              <div>
                                <strong>Learning Steps:</strong>
                                <ul className="list-disc list-inside mt-1 ml-4">
                                  {path.learningSteps.slice(0, 2).map((step, stepIndex) => (
                                    <li key={stepIndex} className="text-muted-foreground">{step.title}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <strong>Cost Range:</strong> ${path.costEstimate.totalCostRange.min} - ${path.costEstimate.totalCostRange.max}
                                {path.costEstimate.free.length > 0 && (
                                  <span className="text-green-600 ml-2">({path.costEstimate.free.length} free resources available)</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contextual Recommendations */}
                  <div>
                    <h4 className="font-medium text-orange-600 dark:text-orange-400 mb-3">🎯 Contextual Action Plan</h4>
                    <div className="space-y-3">
                      {analysis.personalizedInsights.contextualRecommendations.slice(0, 6).map((rec, index) => (
                        <div key={index} className={`glass-card p-4 rounded-lg border ${
                          rec.priority === 'critical' ? 'border-red-500/20 bg-red-500/5' :
                          rec.priority === 'high' ? 'border-orange-500/20 bg-orange-500/5' :
                          'border-blue-500/20 bg-blue-500/5'
                        }`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                rec.priority === 'critical' ? 'destructive' :
                                rec.priority === 'high' ? 'secondary' : 'secondary'
                              }>
                                {rec.priority}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {rec.timeframe}
                              </Badge>
                            </div>
                            <Badge variant="outline" className="text-xs capitalize">
                              {rec.category}
                            </Badge>
                          </div>
                          <h5 className="font-medium mb-1">{rec.action}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{rec.rationale}</p>
                          {rec.resources.length > 0 && (
                            <div className="text-xs">
                              <strong>Resources:</strong> {rec.resources.slice(0, 3).join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market Trends */}
                  <div>
                    <h4 className="font-medium text-teal-600 dark:text-teal-400 mb-3">📈 Market Intelligence</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="glass-card p-4 rounded-lg border border-teal-500/20 bg-teal-500/5">
                        <h5 className="font-medium text-teal-700 dark:text-teal-300 mb-2">🚀 Emerging Trends</h5>
                        <div className="flex flex-wrap gap-1">
                          {analysis.personalizedInsights.marketIntelligence.emergingTrends.map((trend, index) => (
                            <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300 text-xs">
                              {trend}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="glass-card p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                        <h5 className="font-medium text-red-700 dark:text-red-300 mb-2">📉 Declining Skills</h5>
                        <div className="flex flex-wrap gap-1">
                          {analysis.personalizedInsights.marketIntelligence.decliningSkills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Career Guidance - keep existing implementation but move after personalized insights */}
            {analysis.enhancedAnalysis && !analysis.personalizedInsights && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Personalized Career Action Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Use recommendations from the main analysis result */}
                  <div>
                    <h4 className="font-medium text-primary mb-3">🚀 Key Recommendations</h4>
                    <div className="space-y-3">
                      {analysis.recommendations.map((action, index) => (
                        <div key={index} className="glass-card p-4 rounded-lg border border-primary/20 bg-primary/5">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-sm">{action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tips */}
                  {analysis.proTips && analysis.proTips.length > 0 && (
                    <div>
                      <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-3">💡 Pro Tips</h4>
                      <div className="space-y-2">
                        {analysis.proTips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 glass-card rounded-lg border-blue-500/20 bg-blue-500/5">
                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                            <span className="text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Competitive Strengths */}
                  {analysis.enhancedAnalysis?.competitivePosition?.strengthsVsMarket && (
                    <div>
                      <h4 className="font-medium text-green-600 dark:text-green-400 mb-3">💪 Your Competitive Strengths</h4>
                      <div className="space-y-2">
                        {analysis.enhancedAnalysis.competitivePosition.strengthsVsMarket.map((strength, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 glass-card rounded-lg border-green-500/20 bg-green-500/5">
                            <span className="text-green-500 font-bold mt-0.5">•</span>
                            <span className="text-sm">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                 </CardContent>
              </Card>
            )}

            {/* Enhanced Recommendations */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                
                {/* Dynamic Pro Tips */}
                <div className="mt-6 p-4 glass-card rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">💡 Personalized Pro Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {analysis.proTips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatching;
