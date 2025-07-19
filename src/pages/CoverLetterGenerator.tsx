
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Download, Copy, RefreshCw, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { generateCoverLetter, CoverLetterRequest } from "@/services/openaiServices";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    companyName: "",
    hiringManager: "",
    jobDescription: "",
    tone: "",
    keyPoints: "",
    userBackground: ""
  });
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleGenerate = async () => {
    if (!formData.fullName || !formData.jobTitle || !formData.companyName || !formData.jobDescription || !formData.tone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const request: CoverLetterRequest = {
        fullName: formData.fullName,
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        hiringManager: formData.hiringManager,
        jobDescription: formData.jobDescription,
        tone: formData.tone,
        keyPoints: formData.keyPoints,
        userBackground: formData.userBackground
      };

      const result = await generateCoverLetter(request);
      
      if (result.success && result.coverLetter) {
        setGeneratedLetter(result.coverLetter);
        toast.success('Cover letter generated successfully!');
      } else {
        throw new Error('Failed to generate cover letter');
      }
    } catch (error) {
      console.error('Cover letter generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate cover letter';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success('Cover letter copied to clipboard!');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], {
      type: 'text/plain'
    });
    element.href = URL.createObjectURL(file);
    element.download = `cover_letter_${formData.jobTitle.replace(/\s+/g, '_')}_${formData.companyName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Cover letter downloaded!');
  };

  const handleRegenerate = () => {
    if (!isGenerating) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Generate Perfect{" "}
            <span className="gradient-text">Cover Letters</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Create personalized cover letters that perfectly complement your resume and target role using AI.
          </p>
        </div>

        {error && (
          <Alert className="mb-6 max-w-6xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input 
                  id="fullName" 
                  placeholder="e.g., John Smith" 
                  value={formData.fullName} 
                  onChange={e => handleInputChange('fullName', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input 
                  id="jobTitle" 
                  placeholder="e.g., Senior Software Engineer" 
                  value={formData.jobTitle} 
                  onChange={e => handleInputChange('jobTitle', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input 
                  id="companyName" 
                  placeholder="e.g., Google" 
                  value={formData.companyName} 
                  onChange={e => handleInputChange('companyName', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hiringManager">Hiring Manager Name</Label>
                <Input 
                  id="hiringManager" 
                  placeholder="e.g., Sarah Johnson (optional)" 
                  value={formData.hiringManager} 
                  onChange={e => handleInputChange('hiringManager', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone & Style *</Label>
                <Select onValueChange={value => handleInputChange('tone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="confident">Confident</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description *</Label>
                <Textarea 
                  id="jobDescription" 
                  placeholder="Paste the job description here..." 
                  className="min-h-32 resize-none" 
                  value={formData.jobDescription} 
                  onChange={e => handleInputChange('jobDescription', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyPoints">Key Points to Highlight</Label>
                <Textarea 
                  id="keyPoints" 
                  placeholder="Any specific achievements or skills you want to emphasize..." 
                  className="min-h-24 resize-none" 
                  value={formData.keyPoints} 
                  onChange={e => handleInputChange('keyPoints', e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userBackground">Your Background</Label>
                <Textarea 
                  id="userBackground" 
                  placeholder="Brief summary of your experience and qualifications..." 
                  className="min-h-24 resize-none" 
                  value={formData.userBackground} 
                  onChange={e => handleInputChange('userBackground', e.target.value)} 
                />
              </div>

              <Button 
                variant="hero" 
                className="w-full" 
                onClick={handleGenerate} 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Letter */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Generated Cover Letter</CardTitle>
              {generatedLetter && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isGenerating}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {generatedLetter ? (
                <div className="bg-background/50 rounded-lg p-6 min-h-96 whitespace-pre-wrap text-sm leading-relaxed">
                  {generatedLetter}
                </div>
              ) : (
                <div className="bg-background/50 rounded-lg p-12 min-h-96 flex items-center justify-center text-center">
                  <div>
                    <Wand2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">Your AI-generated cover letter will appear here</p>
                    <p className="text-sm text-muted-foreground">Fill in the form and click "Generate Cover Letter" to get started</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI analyzes job requirements to create perfectly targeted content
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold mb-2">Tone Customization</h3>
              <p className="text-sm text-muted-foreground">
                Choose from different writing styles to match company culture
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="font-semibold mb-2">Keyword Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Automatically incorporates relevant keywords from job descriptions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
