import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  X, 
  Lightbulb,
  Star,
  Clock,
  ArrowRight,
  Plus,
  Settings,
  BarChart3,
  Award,
  Zap,
  Eye,
  EyeOff
} from "lucide-react";
import { useAIRecommendations } from "@/hooks/useAIRecommendations";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const AIRecommendationsSection = () => {
  const { user } = useAuth();
  const [selectedRecommendationType, setSelectedRecommendationType] = useState<string>('');
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [generateContext, setGenerateContext] = useState({
    currentRole: '',
    targetRole: '',
    industry: '',
    targetSkill: '',
    timeCommitment: 'moderate' as 'minimal' | 'moderate' | 'intensive'
  });

  const {
    aiRecommendations,
    learningPaths,
    skillsGapAnalysis,
    careerTransitions,
    mentorMatches,
    contentRecommendations,
    analytics,
    isLoading,
    isGenerating,
    generateRecommendation,
    dismissRecommendation,
    implementRecommendation,
    generateSkillsGapAnalysis,
    generateLearningPath,
    generateCareerTransition,
    generateContentRecommendations,
    isDismissing,
    isImplementing
  } = useAIRecommendations(user?.id);

  const handleGenerateRecommendation = async () => {
    if (!selectedRecommendationType) {
      toast.error('Please select a recommendation type');
      return;
    }

    try {
      const context = {
        currentRole: generateContext.currentRole,
        targetRole: generateContext.targetRole,
        industry: generateContext.industry,
        targetSkill: generateContext.targetSkill,
        timeCommitment: generateContext.timeCommitment
      };

      generateRecommendation({ 
        type: selectedRecommendationType as any, 
        context 
      });
      
      setIsGenerateDialogOpen(false);
      setGenerateContext({
        currentRole: '',
        targetRole: '',
        industry: '',
        targetSkill: '',
        timeCommitment: 'moderate'
      });
    } catch (error) {
      toast.error('Failed to generate recommendation');
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'learning_path': return <BookOpen className="h-5 w-5" />;
      case 'skill_gap': return <Target className="h-5 w-5" />;
      case 'career_transition': return <TrendingUp className="h-5 w-5" />;
      case 'mentor_match': return <Users className="h-5 w-5" />;
      case 'content': return <Lightbulb className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-orange-600';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              AI-Powered Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Analytics */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              AI-Powered Recommendations
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Personalized insights and guidance powered by advanced AI
            </p>
          </div>
          <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Generate New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Generate AI Recommendation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Recommendation Type</Label>
                  <Select value={selectedRecommendationType} onValueChange={setSelectedRecommendationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learning_path">Learning Path</SelectItem>
                      <SelectItem value="skill_gap">Skills Gap Analysis</SelectItem>
                      <SelectItem value="career_transition">Career Transition</SelectItem>
                      <SelectItem value="mentor_match">Mentor Matching</SelectItem>
                      <SelectItem value="content">Content Recommendations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Role</Label>
                    <Input
                      value={generateContext.currentRole}
                      onChange={(e) => setGenerateContext(prev => ({ ...prev, currentRole: e.target.value }))}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>Target Role</Label>
                    <Input
                      value={generateContext.targetRole}
                      onChange={(e) => setGenerateContext(prev => ({ ...prev, targetRole: e.target.value }))}
                      placeholder="Senior Engineer"
                    />
                  </div>
                </div>

                <div>
                  <Label>Industry</Label>
                  <Input
                    value={generateContext.industry}
                    onChange={(e) => setGenerateContext(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="Technology"
                  />
                </div>

                <div>
                  <Label>Time Commitment</Label>
                  <Select 
                    value={generateContext.timeCommitment} 
                    onValueChange={(value: any) => setGenerateContext(prev => ({ ...prev, timeCommitment: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal (1-2 hours/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-5 hours/week)</SelectItem>
                      <SelectItem value="intensive">Intensive (5+ hours/week)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGenerateRecommendation} 
                  className="w-full"
                  disabled={isGenerating || !selectedRecommendationType}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Recommendation
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        {analytics && (
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{analytics.total}</div>
                <div className="text-sm text-muted-foreground">Total Recommendations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analytics.implemented}</div>
                <div className="text-sm text-muted-foreground">Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{analytics.implementationRate.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{analytics.avgRating.toFixed(1)}★</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Recommendations Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 glass-card">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="mentoring">Mentoring</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {aiRecommendations?.length ? (
              aiRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="glass-card hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getRecommendationIcon(recommendation.recommendation_type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                          <p className="text-muted-foreground text-sm mt-1">
                            {recommendation.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(recommendation.priority) as any}>
                          {recommendation.priority}
                        </Badge>
                        <Badge variant="outline" className={getConfidenceColor(recommendation.confidence_score)}>
                          {Math.round(recommendation.confidence_score * 100)}% confident
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-1">AI Reasoning:</p>
                        <p className="text-sm">{recommendation.reasoning}</p>
                      </div>

                      {recommendation.recommended_actions && Array.isArray(recommendation.recommended_actions) && recommendation.recommended_actions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Recommended Actions:</p>
                          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                            {recommendation.recommended_actions.map((action: any, index: number) => (
                              <li key={index}>{typeof action === 'string' ? action : action.title || action}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {new Date(recommendation.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => dismissRecommendation(recommendation.id)}
                            disabled={isDismissing}
                          >
                            <EyeOff className="h-4 w-4 mr-1" />
                            Dismiss
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => implementRecommendation(recommendation.id)}
                            disabled={isImplementing || recommendation.is_implemented}
                          >
                            {recommendation.is_implemented ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Implemented
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Implement
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-12">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No AI Recommendations Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate your first AI-powered recommendation to get personalized career guidance.
                  </p>
                  <Button onClick={() => setIsGenerateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Recommendation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="learning">
          <div className="space-y-4">
            {learningPaths?.length ? (
              learningPaths.map((path) => (
                <Card key={path.id} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {path.path_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Target Skill: {path.target_skill}</p>
                          <p className="text-sm text-muted-foreground">
                            Level {path.current_level} → {path.target_level}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{path.estimated_duration_weeks} weeks</p>
                          <p className="text-sm text-muted-foreground">{path.difficulty_progression}</p>
                        </div>
                      </div>
                      
                      <Progress 
                        value={(path.current_level / path.target_level) * 100} 
                        className="h-2" 
                      />
                      
                      {path.learning_modules && Array.isArray(path.learning_modules) && (
                        <div>
                          <p className="text-sm font-medium mb-2">Learning Modules:</p>
                          <div className="space-y-2">
                            {path.learning_modules.map((module: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                <span className="text-sm">{module.title}</span>
                                <span className="text-xs text-muted-foreground">{module.duration_weeks}w</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-8">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No learning paths generated yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <div className="space-y-4">
            {skillsGapAnalysis?.length ? (
              skillsGapAnalysis.map((analysis) => (
                <Card key={analysis.id} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Skills Gap Analysis - {analysis.target_role}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Market Alignment</p>
                          <div className="flex items-center gap-2">
                            <Progress value={analysis.market_alignment_score * 100} className="h-2" />
                            <span className="text-sm">{Math.round(analysis.market_alignment_score * 100)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Competitiveness</p>
                          <div className="flex items-center gap-2">
                            <Progress value={analysis.competitiveness_score * 100} className="h-2" />
                            <span className="text-sm">{Math.round(analysis.competitiveness_score * 100)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      {analysis.ai_insights && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-1">AI Insights:</p>
                          <p className="text-sm">{analysis.ai_insights}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-8">
                  <Target className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No skills gap analysis available yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="career">
          <div className="space-y-4">
            {careerTransitions?.length ? (
              careerTransitions.map((transition) => (
                <Card key={transition.id} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      {transition.from_role} → {transition.to_role}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Timeline</p>
                          <p className="font-medium">{transition.estimated_timeline_months} months</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Difficulty</p>
                          <Badge variant="outline">{transition.transition_difficulty}</Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Success Rate</p>
                          <p className="font-medium">{Math.round(transition.success_probability * 100)}%</p>
                        </div>
                      </div>
                      
                      <Progress value={transition.success_probability * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-8">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No career transition recommendations yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mentoring">
          <div className="space-y-4">
            {mentorMatches?.length ? (
              mentorMatches.map((match) => (
                <Card key={match.id} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Mentor Match Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Mentorship Type: {match.mentorship_type}</p>
                        <Badge variant="secondary">{Math.round(match.matching_score * 100)}% match</Badge>
                      </div>
                      
                      {match.focus_areas?.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Focus Areas:</p>
                          <div className="flex flex-wrap gap-2">
                            {match.focus_areas.map((area, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-8">
                  <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No mentor recommendations yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="space-y-4">
            {contentRecommendations?.length ? (
              contentRecommendations.map((content) => (
                <Card key={content.id} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      {content.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {content.description && (
                        <p className="text-sm text-muted-foreground">{content.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{content.content_type}</Badge>
                          <Badge variant="outline">{content.difficulty_level}</Badge>
                          {content.estimated_time_minutes && (
                            <span className="text-sm text-muted-foreground">
                              {content.estimated_time_minutes} min
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{content.relevance_score.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      {content.provider && (
                        <p className="text-sm text-muted-foreground">by {content.provider}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-8">
                  <Lightbulb className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No content recommendations yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};