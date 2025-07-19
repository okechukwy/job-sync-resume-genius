
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Download, Copy, RefreshCw, AlertCircle, FileText, File, FileImage, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { generateCoverLetter, CoverLetterRequest } from "@/services/openaiServices";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { downloadFile } from "@/utils/downloadUtils";
import TemplateSelector from "@/components/cover-letter/TemplateSelector";
import { getTemplateById, getRecommendedTemplate } from "@/config/coverLetterTemplates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    companyName: "",
    companyAddress: "",
    hiringManager: "",
    jobDescription: "",
    tone: "",
    keyPoints: "",
    userBackground: "",
    letterLength: "standard" as 'brief' | 'standard' | 'detailed',
    closingType: "Sincerely",
    templateId: "classic-professional",
    industry: ""
  });
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<'txt' | 'pdf' | 'docx'>('pdf');
  const [currentTab, setCurrentTab] = useState("template");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleTemplateSelect = (templateId: string) => {
    setFormData(prev => ({ ...prev, templateId }));
    setCurrentTab("details");
  };

  const handleSmartRecommendation = () => {
    if (formData.industry && formData.jobTitle) {
      const recommended = getRecommendedTemplate(formData.industry, formData.jobTitle);
      setFormData(prev => ({ ...prev, templateId: recommended.id }));
      toast.success(`Recommended template: ${recommended.name}`);
    } else {
      toast.error('Please enter your industry and job title for smart recommendations');
    }
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
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        hiringManager: formData.hiringManager,
        jobDescription: formData.jobDescription,
        tone: formData.tone,
        keyPoints: formData.keyPoints,
        userBackground: formData.userBackground,
        letterLength: formData.letterLength,
        closingType: formData.closingType,
        templateId: formData.templateId,
        industry: formData.industry
      };

      const result = await generateCoverLetter(request);
      
      if (result.success && result.coverLetter) {
        setGeneratedLetter(result.coverLetter);
        toast.success('Cover letter generated successfully!');
        setCurrentTab("result");
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

  const handleDownload = async () => {
    if (!generatedLetter) return;
    
    const fileName = `cover_letter_${formData.jobTitle.replace(/\s+/g, '_')}_${formData.companyName.replace(/\s+/g, '_')}`;
    
    try {
      await downloadFile(generatedLetter, fileName, downloadFormat, false);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.');
    }
  };

  const handleRegenerate = () => {
    if (!isGenerating) {
      handleGenerate();
    }
  };

  const selectedTemplate = getTemplateById(formData.templateId);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Generate Perfect{" "}
            <span className="gradient-text">Cover Letters</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose from professional templates and create personalized cover letters that perfectly complement your resume using AI.
          </p>
        </div>

        {error && (
          <Alert className="mb-6 max-w-7xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 glass-card">
            <TabsTrigger value="template">1. Choose Template</TabsTrigger>
            <TabsTrigger value="details">2. Enter Details</TabsTrigger>
            <TabsTrigger value="result">3. Generated Letter</TabsTrigger>
          </TabsList>

          <TabsContent value="template">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Select Your Template
                </CardTitle>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="industry">Industry (for smart recommendations)</Label>
                    <Input 
                      id="industry"
                      placeholder="e.g., Technology, Healthcare, Finance" 
                      value={formData.industry} 
                      onChange={e => handleInputChange('industry', e.target.value)} 
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleSmartRecommendation}
                    className="mt-6"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Smart Recommend
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TemplateSelector
                  selectedTemplate={formData.templateId}
                  onTemplateSelect={handleTemplateSelect}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Cover Letter Details
                    {selectedTemplate && (
                      <span className="text-sm font-normal text-muted-foreground">
                        ({selectedTemplate.name})
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email"
                          placeholder="john.smith@example.com" 
                          value={formData.email} 
                          onChange={e => handleInputChange('email', e.target.value)} 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="+1 (555) 123-4567" 
                          value={formData.phone} 
                          onChange={e => handleInputChange('phone', e.target.value)} 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          placeholder="New York, NY" 
                          value={formData.location} 
                          onChange={e => handleInputChange('location', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Job Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Job Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyAddress">Company Address</Label>
                      <Input 
                        id="companyAddress" 
                        placeholder="e.g., 123 Main St, San Francisco, CA 94105 (optional)" 
                        value={formData.companyAddress} 
                        onChange={e => handleInputChange('companyAddress', e.target.value)} 
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
                  </div>

                  {/* Customization Options */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Customization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <Label htmlFor="letterLength">Letter Length</Label>
                        <Select value={formData.letterLength} onValueChange={value => handleInputChange('letterLength', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brief">Brief (2-3 paragraphs)</SelectItem>
                            <SelectItem value="standard">Standard (3-4 paragraphs)</SelectItem>
                            <SelectItem value="detailed">Detailed (4-5 paragraphs)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="closingType">Closing Type</Label>
                        <Select value={formData.closingType} onValueChange={value => handleInputChange('closingType', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sincerely">Sincerely</SelectItem>
                            <SelectItem value="Best regards">Best regards</SelectItem>
                            <SelectItem value="Yours truly">Yours truly</SelectItem>
                            <SelectItem value="Kind regards">Kind regards</SelectItem>
                            <SelectItem value="Respectfully">Respectfully</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
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

              {/* Template Preview */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Selected Template</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTemplate ? (
                    <div className="space-y-4">
                      <div className="text-center p-6 bg-background/50 rounded-lg">
                        <div className="text-4xl mb-2">{selectedTemplate.preview}</div>
                        <h3 className="font-semibold">{selectedTemplate.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Features:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedTemplate.features.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-secondary/50 px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Perfect for:</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedTemplate.perfectFor.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-12 text-muted-foreground">
                      <Sparkles className="w-16 h-16 mx-auto mb-4" />
                      <p>Select a template to see preview</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="result">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Generated Cover Letter</CardTitle>
                {generatedLetter && (
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="downloadFormat" className="text-sm">Format:</Label>
                      <Select value={downloadFormat} onValueChange={(value: 'txt' | 'pdf' | 'docx') => setDownloadFormat(value)}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">
                            <div className="flex items-center gap-2">
                              <FileImage className="w-3 h-3" />
                              PDF
                            </div>
                          </SelectItem>
                          <SelectItem value="docx">
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3" />
                              DOCX
                            </div>
                          </SelectItem>
                          <SelectItem value="txt">
                            <div className="flex items-center gap-2">
                              <File className="w-3 h-3" />
                              TXT
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                  <div className="bg-background/50 rounded-lg p-6 min-h-96 whitespace-pre-wrap text-sm leading-relaxed font-mono">
                    {generatedLetter}
                  </div>
                ) : (
                  <div className="bg-background/50 rounded-lg p-12 min-h-96 flex items-center justify-center text-center">
                    <div>
                      <Wand2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">Your AI-generated cover letter will appear here</p>
                      <p className="text-sm text-muted-foreground">Complete the template selection and details to generate your letter</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Enhanced Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold mb-2">8 Professional Templates</h3>
              <p className="text-sm text-muted-foreground">
                Industry-specific templates with different header styles and formats
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                AI analyzes your industry and role to suggest the best template
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">Bullet Point Format</h3>
              <p className="text-sm text-muted-foreground">
                Achievement-focused templates with quantifiable results
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold mb-2">ATS Optimized</h3>
              <p className="text-sm text-muted-foreground">
                All templates scored for ATS compatibility and readability
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
