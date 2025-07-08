import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, FileText, Target, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
            <div className="text-2xl font-bold gradient-text">Job Description Matching</div>
            <Badge variant="secondary" className="glass-card">New</Badge>
          </div>
        </div>
      </div>

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
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium text-success">{uploadedResume.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedResume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
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
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-destructive/10 text-destructive">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills Gap */}
              <div>
                <h3 className="font-semibold mb-3">Skills Gap Analysis</h3>
                <div className="space-y-2">
                  {analysis.skillsGap.map((skill: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <div className="flex items-center gap-3">
                        {skill.hasSkill ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        )}
                        <span>{skill.skill}</span>
                      </div>
                      <Badge variant={skill.importance === 'High' ? 'destructive' : 'secondary'}>
                        {skill.importance} Priority
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobMatching;