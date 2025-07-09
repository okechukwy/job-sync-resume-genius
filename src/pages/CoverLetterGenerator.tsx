import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Download, Copy, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    companyName: "",
    hiringManager: "",
    jobDescription: "",
    tone: "",
    keyPoints: ""
  });
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const generateToneSpecificContent = () => {
    const toneStyles = {
      professional: {
        greeting: `Dear ${formData.hiringManager || 'Hiring Manager'},`,
        opening: `I am writing to express my interest in the ${formData.jobTitle} position at ${formData.companyName}. With my extensive background and proven track record, I believe I would be a valuable addition to your team.`,
        experience: `Throughout my career, I have consistently demonstrated expertise in the areas outlined in your job description. My professional experience encompasses:`,
        closing: `I would welcome the opportunity to discuss how my qualifications align with your team's objectives. Thank you for your consideration, and I look forward to hearing from you.`,
        signature: `Sincerely,\n${formData.fullName || '[Your Name]'}`
      },
      enthusiastic: {
        greeting: `Dear ${formData.hiringManager || 'Hiring Manager'},`,
        opening: `I'm thrilled to apply for the ${formData.jobTitle} position at ${formData.companyName}! Your company's innovative approach and commitment to excellence perfectly align with my passion and career goals.`,
        experience: `I'm excited to share how my background makes me an ideal candidate for this role. My journey has been filled with amazing opportunities where I've excelled in:`,
        closing: `I can't wait to discuss how my enthusiasm and skills can contribute to ${formData.companyName}'s continued success! Thank you for considering my application - I'm looking forward to the possibility of joining your incredible team.`,
        signature: `With excitement,\n${formData.fullName || '[Your Name]'}`
      },
      confident: {
        greeting: `Dear ${formData.hiringManager || 'Hiring Manager'},`,
        opening: `I am the ideal candidate for the ${formData.jobTitle} position at ${formData.companyName}. My proven expertise and track record of success make me uniquely qualified to excel in this role.`,
        experience: `I have consistently delivered exceptional results in my previous positions, with particular strength in:`,
        closing: `I am confident that my skills and experience will drive significant value for ${formData.companyName}. I look forward to discussing how I can contribute to your team's success.`,
        signature: `Best regards,\n${formData.fullName || '[Your Name]'}`
      },
      creative: {
        greeting: `Hello ${formData.hiringManager || 'Creative Team'},`,
        opening: `Imagine a ${formData.jobTitle} who brings fresh perspectives, innovative solutions, and boundless creativity to every project. That's exactly what I offer ${formData.companyName}.`,
        experience: `My creative journey has been shaped by diverse experiences that have honed my ability to think outside the box:`,
        closing: `I'd love to brainstorm together about how my creative approach can bring new energy to ${formData.companyName}. Let's connect and explore the possibilities!`,
        signature: `Creatively yours,\n${formData.fullName || '[Your Name]'}`
      },
      formal: {
        greeting: `Dear Sir or Madam,`,
        opening: `I respectfully submit my application for the ${formData.jobTitle} position at ${formData.companyName}. I believe my qualifications and professional background align well with your requirements.`,
        experience: `I have maintained a distinguished record of achievement in my professional endeavors, with particular competencies in:`,
        closing: `I would be honored to discuss my candidacy further at your convenience. Please accept my gratitude for your time and consideration.`,
        signature: `Respectfully,\n${formData.fullName || '[Your Name]'}`
      }
    };
    return toneStyles[formData.tone as keyof typeof toneStyles] || toneStyles.professional;
  };
  const handleGenerate = async () => {
    if (!formData.fullName || !formData.jobTitle || !formData.companyName || !formData.jobDescription) {
      toast.error('Please fill in the required fields');
      return;
    }
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const toneContent = generateToneSpecificContent();
      const mockLetter = `${toneContent.greeting}

${toneContent.opening}

${toneContent.experience}

• Developing scalable web applications using modern technologies
• Collaborating with cross-functional teams to deliver high-quality products
• Implementing best practices for code quality and performance optimization
• Leading projects from conception to deployment

What particularly draws me to ${formData.companyName} is your reputation for innovation and excellence in the industry. I am impressed by your recent initiatives and would be excited to contribute my skills and expertise to help drive your continued growth.

${formData.keyPoints ? `${formData.keyPoints}

` : ''}${toneContent.closing}

${toneContent.signature}`;
      setGeneratedLetter(mockLetter);
      setIsGenerating(false);
      toast.success('Cover letter generated successfully!');
    }, 3000);
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
    element.download = `cover_letter_${formData.jobTitle}_${formData.companyName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Cover letter downloaded!');
  };
  return <div className="min-h-screen bg-gradient-hero">
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
                <Input id="fullName" placeholder="e.g., John Smith" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input id="jobTitle" placeholder="e.g., Senior Software Engineer" value={formData.jobTitle} onChange={e => handleInputChange('jobTitle', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input id="companyName" placeholder="e.g., Google" value={formData.companyName} onChange={e => handleInputChange('companyName', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hiringManager">Hiring Manager Name</Label>
                <Input id="hiringManager" placeholder="e.g., Sarah Johnson (optional)" value={formData.hiringManager} onChange={e => handleInputChange('hiringManager', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone & Style</Label>
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
                <Textarea id="jobDescription" placeholder="Paste the job description here..." className="min-h-32 resize-none" value={formData.jobDescription} onChange={e => handleInputChange('jobDescription', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyPoints">Key Points to Highlight</Label>
                <Textarea id="keyPoints" placeholder="Any specific achievements or skills you want to emphasize..." className="min-h-24 resize-none" value={formData.keyPoints} onChange={e => handleInputChange('keyPoints', e.target.value)} />
              </div>

              <Button variant="hero" className="w-full" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </> : <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Cover Letter
                  </>}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Letter */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Generated Cover Letter</CardTitle>
              {generatedLetter && <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>}
            </CardHeader>
            <CardContent>
              {generatedLetter ? <div className="bg-background/50 rounded-lg p-6 min-h-96 whitespace-pre-wrap font-mono text-sm">
                  {generatedLetter}
                </div> : <div className="bg-background/50 rounded-lg p-12 min-h-96 flex items-center justify-center text-center">
                  <div>
                    <Wand2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Your cover letter will appear here</p>
                  </div>
                </div>}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Context-Aware Writing</h3>
              <p className="text-sm text-muted-foreground">
                AI analyzes job requirements to create targeted content
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
              <h3 className="font-semibold mb-2">Company Research Integration</h3>
              <p className="text-sm text-muted-foreground">
                Incorporates company-specific information for personalization
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default CoverLetterGenerator;