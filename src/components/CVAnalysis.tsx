import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Target,
  Zap,
  Award
} from "lucide-react";
import { toast } from "sonner";

interface CVAnalysisProps {
  uploadedFile: File;
  onContinue: () => void;
  onReupload: () => void;
}

const CVAnalysis = ({ uploadedFile, onContinue, onReupload }: CVAnalysisProps) => {
  // Mock analysis data - in real app this would come from AI/ML service
  const analysisData = {
    overallScore: 72,
    atsScore: 68,
    sections: {
      contact: { score: 95, status: 'excellent' },
      summary: { score: 45, status: 'needs_work' },
      experience: { score: 78, status: 'good' },
      education: { score: 85, status: 'good' },
      skills: { score: 60, status: 'fair' },
      formatting: { score: 70, status: 'fair' }
    },
    keywords: {
      found: 12,
      missing: 8,
      suggestions: ['JavaScript', 'React', 'Node.js', 'AWS', 'Agile', 'SQL', 'Git', 'Docker']
    },
    improvements: [
      {
        priority: 'high',
        issue: 'Missing professional summary',
        suggestion: 'Add a compelling 2-3 sentence summary highlighting your key achievements'
      },
      {
        priority: 'high', 
        issue: 'Limited quantifiable achievements',
        suggestion: 'Include specific numbers and metrics in your experience descriptions'
      },
      {
        priority: 'medium',
        issue: 'Skills section needs updating',
        suggestion: 'Add more relevant technical skills and certifications'
      },
      {
        priority: 'medium',
        issue: 'ATS formatting issues',
        suggestion: 'Simplify formatting and avoid complex layouts that ATS systems might miss'
      },
      {
        priority: 'low',
        issue: 'Consider adding volunteer work',
        suggestion: 'Include relevant volunteer experience to show well-roundedness'
      }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <XCircle className="w-4 h-4 text-destructive" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const handleContinueOptimization = () => {
    toast.success("Let's optimize your resume for better ATS performance!");
    onContinue();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 glass-card">
          📊 Analysis Complete
        </Badge>
        <h2 className="text-3xl font-bold mb-4">
          Your Resume <span className="gradient-text">Analysis</span>
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg font-medium">{uploadedFile.name}</span>
          <Badge variant="outline">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</Badge>
        </div>
      </div>

      {/* Overall Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5" />
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysisData.overallScore)}`}>
              {analysisData.overallScore}/100
            </div>
            <Progress value={analysisData.overallScore} className="mb-3" />
            <p className="text-sm text-muted-foreground">
              Good foundation with room for improvement
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              ATS Compatibility
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysisData.atsScore)}`}>
              {analysisData.atsScore}/100
            </div>
            <Progress value={analysisData.atsScore} className="mb-3" />
            <p className="text-sm text-muted-foreground">
              Needs optimization for ATS systems
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Section Breakdown */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Section Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(analysisData.sections).map(([section, data]) => (
              <div key={section} className={`p-4 rounded-lg border ${getScoreBg(data.score)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{section.replace('_', ' ')}</span>
                  <Badge variant="outline" className="text-xs">
                    {data.score}/100
                  </Badge>
                </div>
                <Progress value={data.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Keywords Analysis */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Keyword Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="font-medium">Keywords Found: {analysisData.keywords.found}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="font-medium">Missing Keywords: {analysisData.keywords.missing}</span>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Suggested Keywords to Add:</p>
              <div className="flex flex-wrap gap-2">
                {analysisData.keywords.suggestions.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Suggestions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisData.improvements.map((improvement, index) => (
              <div key={index} className="flex gap-3 p-4 rounded-lg border border-border/50">
                {getPriorityIcon(improvement.priority)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{improvement.issue}</span>
                    <Badge 
                      variant={improvement.priority === 'high' ? 'destructive' : 
                              improvement.priority === 'medium' ? 'secondary' : 'outline'} 
                      className="text-xs"
                    >
                      {improvement.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{improvement.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Apply Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Let our AI apply the optimization recommendations directly to your resume for better ATS performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={() => {
                toast.success("Applying recommendations to your resume...");
                // TODO: Implement recommendation application logic
              }}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Apply All Recommendations
            </Button>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => {
                toast.success("Downloading your optimized resume...");
                // TODO: Implement download logic based on subscription level
              }}
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download Optimized CV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleContinueOptimization}
          className="flex-1 max-w-xs"
        >
          Continue to Manual Editing
        </Button>
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={onReupload}
          className="flex-1 max-w-xs"
        >
          Upload Different Resume
        </Button>
      </div>
    </div>
  );
};

export default CVAnalysis;