import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { readFileContent } from "@/utils/fileReader";
import { optimizeForATS, ATSOptimizationResult } from "@/services/openaiServices";
import { UnifiedATSOptimizer } from "@/components/ats-analysis/UnifiedATSOptimizer";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
const ATSAnalysis = () => {
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ATSOptimizationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("Business");
  const [originalContent, setOriginalContent] = useState("");
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
    setOriginalContent(""); // Clear previous content
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
      const rawResumeText = await readFileContent(uploadedResume);
      console.log('Extracted resume text length:', rawResumeText?.length || 0);
      
      if (!rawResumeText || rawResumeText.trim().length < 50) {
        toast.error('Unable to extract sufficient text from your resume. Please ensure it\'s not an image-based PDF and try again.');
        setIsAnalyzing(false);
        return;
      }

      // Sanitize content to remove Word artifacts and corruption
      const { sanitizeResumeContent, validateContentQuality } = await import('@/utils/contentSanitizer');
      const contentQuality = validateContentQuality(rawResumeText);
      
      if (!contentQuality.isValid && contentQuality.confidence < 50) {
        toast.error(`File appears to be corrupted (${contentQuality.issues.join(', ')}). Please try uploading a different format.`);
        setIsAnalyzing(false);
        return;
      }
      
      const resumeText = contentQuality.cleanedContent;
      console.log('Sanitized content length:', resumeText.length, 'Quality:', contentQuality.confidence);

      // Store sanitized content for optimization
      setOriginalContent(resumeText);

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

const handleExport = () => {
  toast.success("Export functionality coming soon!");
};

// Extract JD from URL using Supabase Edge Function
const handleExtractFromUrl = async () => {
  if (!jobUrl) return;
  try {
    const parsed = new URL(jobUrl);
    if (!/^https?:$/.test(parsed.protocol)) throw new Error("Invalid URL");
  } catch {
    toast.error("Please enter a valid job posting URL");
    return;
  }

  setIsExtracting(true);
  try {
    const { data, error } = await supabase.functions.invoke("job-description-extractor", {
      body: { url: jobUrl },
    });

    if (error) throw error;
    if (!data || !data.text) throw new Error("Could not extract job description");

    setJobDescription(data.text);
    toast.success("Job description extracted from URL");
  } catch (err) {
    console.error("JD extract error:", err);
    const message = err instanceof Error ? err.message : "Failed to extract from URL";
    toast.error(message);
  } finally {
    setIsExtracting(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-hero">
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
              {isAnalyzing && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analysis in progress...
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" disabled={isAnalyzing} />
            
            {uploadedResume ? (
              <div className={`glass-card p-4 rounded-lg border border-success/20 bg-success/5 mb-4 ${isAnalyzing ? 'opacity-75' : ''}`}>
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isAnalyzing}
                      className={isAnalyzing ? 'cursor-not-allowed opacity-50' : ''}
                      title={isAnalyzing ? 'Cannot change file during analysis' : 'Change file'}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Change File'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Upload your resume for comprehensive ATS analysis</p>
                <p className="text-muted-foreground mb-6">
                  Supported formats: PDF, DOC, DOCX (max 5MB)
                </p>
                <Button onClick={() => fileInputRef.current?.click()} disabled={isAnalyzing}>
                  Choose File
                </Button>
              </div>
            )}

            {/* Industry Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Target Industry</Label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry} disabled={isAnalyzing}>
                  <SelectTrigger className={isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

{/* Job Description (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description (Optional)</Label>

              {/* URL Extractor */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="url"
                  placeholder="Paste job posting URL (e.g., LinkedIn, Indeed)..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  disabled={isAnalyzing || isExtracting}
                  className={isAnalyzing || isExtracting ? 'opacity-50 cursor-not-allowed' : ''}
                />
                <Button
                  variant="outline"
                  onClick={handleExtractFromUrl}
                  disabled={!jobUrl || isExtracting || isAnalyzing}
                  title="Extract job description from URL"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    'Extract from URL'
                  )}
                </Button>
              </div>

              <Textarea 
                id="jobDescription" 
                placeholder="Paste the job description for more targeted optimization..." 
                value={jobDescription} 
                onChange={e => setJobDescription(e.target.value)} 
                className={`min-h-[100px] ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isAnalyzing}
              />
              <p className="text-sm text-muted-foreground">
                Adding a job description will provide more targeted keyword analysis and recommendations.
              </p>
            </div>
            
            {uploadedResume && (
              <Button variant="hero" className="w-full" onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing ATS Compatibility...
                  </>
                ) : (
                  'Start Comprehensive ATS Analysis'
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Unified ATS Optimizer */}
        {analysis && originalContent && (
          <UnifiedATSOptimizer
            analysis={analysis}
            originalContent={originalContent}
            onExport={handleExport}
          />
        )}
      </div>
    </div>
  );
};

export default ATSAnalysis;