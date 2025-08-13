import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  GraduationCap, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  Lightbulb,
  MessageSquare,
  BookOpen,
  BarChart3,
  Star,
  ArrowRight,
  PlayCircle,
  FileText,
  Brain,
  Plus,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { useCoaching } from "@/hooks/useCoaching";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

const CareerCoaching = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Get coaching data using the hook
  const {
    coachingPrograms,
    userEnrollments,
    careerGoals,
    personalizedInsights,
    actionItems,
    coachingSessions,
    learningResources,
    learningModules,
    overallProgress,
    careerStageAnalytics,
    isLoading,
    enrollInProgram,
    createGoal,
    createActionItem,
    completeActionItem,
    markInsightAsRead,
    isEnrolling,
    isCreatingGoal,
    isCreatingAction,
    isCompletingAction
  } = useCoaching(user?.id, selectedProgramId);

  // Helper functions for icons
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'strengths':
        return <Award className="h-5 w-5 text-yellow-500" />;
      case 'growth areas':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'opportunities':
        return <Lightbulb className="h-5 w-5 text-green-500" />;
      case 'market trends':
        return <BarChart3 className="h-5 w-5 text-purple-500" />;
      default:
        return <Brain className="h-5 w-5 text-primary" />;
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'complete':
        return 'default';
      case 'active':
      case 'in-progress':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handleCompleteAction = async (actionId: string) => {
    try {
      await completeActionItem({ actionId });
    } catch (error) {
      toast.error('Failed to complete action item');
    }
  };

  const handleEnrollInProgram = async (programId: string) => {
    try {
      await enrollInProgram({ programId });
    } catch (error) {
      toast.error('Failed to enroll in program');
    }
  };

  // Check if user is enrolled in a program
  const isEnrolledInProgram = (programId: string) => {
    return userEnrollments?.some(enrollment => 
      enrollment.program_id === programId && enrollment.status === 'active'
    );
  };

  // Get enrollment for a program
  const getProgramEnrollment = (programId: string) => {
    return userEnrollments?.find(enrollment => 
      enrollment.program_id === programId
    );
  };

  const handleCreateGoal = async () => {
    try {
      await createGoal({
        title: "New Career Goal",
        category: "career_development",
        description: "Set a meaningful career goal"
      });
    } catch (error) {
      toast.error('Failed to create goal');
    }
  };

  const handleContinueLearning = (programId: string) => {
    setSelectedProgramId(programId);
    setActiveTab("learning");
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold gradient-text">Career Coaching Hub</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get personalized career guidance, professional development insights, and strategic advice to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="glass-card text-center">
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Career Coaching Hub</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized career guidance, professional development insights, and strategic advice to accelerate your career growth
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">{overallProgress?.overallProgress || 0}%</div>
              <div className="text-sm text-muted-foreground">Career Goals Progress</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">{coachingSessions?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Coaching Sessions</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">{overallProgress?.completedPrograms || 0}</div>
              <div className="text-sm text-muted-foreground">Programs Completed</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">{careerStageAnalytics?.activeGoals || 0}</div>
              <div className="text-sm text-muted-foreground">Active Goals</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 glass-card">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="coaching" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Coaching
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learning
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="actions" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Career Development Progress */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Career Development Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userEnrollments?.slice(0, 4).map((enrollment, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{enrollment.coaching_programs?.title}</span>
                            <div className="text-xs text-muted-foreground">
                              {enrollment.coaching_programs?.estimated_duration_weeks} weeks • {enrollment.coaching_programs?.difficulty_level}
                            </div>
                          </div>
                          <Badge variant={getStatusVariant(enrollment.status)}>
                            {enrollment.status}
                          </Badge>
                        </div>
                        <Progress value={enrollment.progress_percentage || 0} className="h-2" />
                        <p className="text-xs text-muted-foreground">{enrollment.coaching_programs?.description}</p>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="h-8 w-8 mx-auto mb-2" />
                        <p>No active coaching programs yet.</p>
                        <Button onClick={handleCreateGoal} className="mt-2" size="sm">
                          Explore Programs
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Completed:</strong> Personal Branding Module - 90% score achieved!
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Star className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Milestone:</strong> Reached 50+ professional connections this quarter
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <TrendingUp className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Progress:</strong> 75% completion rate on career path planning
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="coaching">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Professional Coaching Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coachingPrograms?.map((program, index) => (
                  <Card key={index} className="glass-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{program.title}</CardTitle>
                          <p className="text-muted-foreground mt-1">{program.description}</p>
                        </div>
                        <Badge variant="outline">
                          {program.difficulty_level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                        <span>{program.estimated_duration_weeks} weeks</span>
                        <span>{program.is_premium ? 'Premium' : 'Free'}</span>
                      </div>
                      
                      {(() => {
                        const enrollment = getProgramEnrollment(program.id);
                        const isEnrolled = isEnrolledInProgram(program.id);
                        
                        if (isEnrolled) {
                          return (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>Enrolled - {enrollment?.progress_percentage || 0}% complete</span>
                              </div>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => handleContinueLearning(program.id)}
                              >
                                Continue Learning
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          );
                        }
                        
                        return (
                          <Button 
                            className="w-full" 
                            onClick={() => handleEnrollInProgram(program.id)}
                            disabled={isEnrolling}
                          >
                            {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )) || <div>No programs available</div>}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learning">
            <div className="space-y-6">
              {selectedProgramId ? (
                <>
                  {/* Program-specific learning modules */}
                  <div className="flex items-center gap-4 mb-6">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedProgramId(null)}
                    >
                      ← Back to All Resources
                    </Button>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {coachingPrograms?.find(p => p.id === selectedProgramId)?.title} - Learning Modules
                      </h3>
                      <p className="text-muted-foreground">
                        Complete these modules to progress in your program
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {learningModules?.length > 0 ? (
                      learningModules.map((module, index) => (
                        <Card key={module.id} className="glass-card">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  <BookOpen className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold mb-2">{module.title}</h4>
                                  <p className="text-muted-foreground mb-3">{module.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>Module {module.order_index}</span>
                                    <span>{module.estimated_duration_minutes} min</span>
                                    <Badge variant="outline">{module.difficulty_level}</Badge>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="secondary">
                                {module.module_type}
                              </Badge>
                            </div>
                            
                            {module.learning_objectives && (
                              <div className="mb-4">
                                <h5 className="font-medium mb-2">Learning Objectives:</h5>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {module.learning_objectives.map((objective, objIndex) => (
                                    <li key={objIndex} className="flex items-start gap-2">
                                      <CheckCircle2 className="h-3 w-3 mt-1 text-green-500" />
                                      {objective}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <Button className="w-full">
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Start Module
                            </Button>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card className="glass-card">
                        <CardContent className="p-6 text-center">
                          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h4 className="text-lg font-semibold mb-2">No Modules Available</h4>
                          <p className="text-muted-foreground mb-4">
                            Learning modules for this program are being prepared.
                          </p>
                          <Button variant="outline" onClick={() => setSelectedProgramId(null)}>
                            Browse All Resources
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* General learning resources */}
                  <h3 className="text-xl font-semibold">Learning Resources</h3>
                  <div className="space-y-6">
                    {learningResources?.slice(0, 5).map((resource, index) => (
                      <Card key={index} className="glass-card">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold mb-2">{resource.title}</h4>
                              <p className="text-muted-foreground mb-3">{resource.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>by {resource.provider}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{resource.rating || 4.5}</span>
                                </div>
                                <span>{resource.estimated_time_minutes ? `${resource.estimated_time_minutes} min` : 'Self-paced'}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{resource.difficulty_level}</Badge>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {resource.skill_areas?.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <Button className="w-full">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Start Module
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Personalized Career Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalizedInsights.map((insight, index) => (
                  <Card key={index} className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {insight.icon}
                        {insight.category}
                        <Badge 
                          variant={insight.impact === "High" ? "default" : 
                                 insight.impact === "Medium" ? "secondary" : "outline"}
                          className="ml-auto"
                        >
                          {insight.impact} Impact
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-3">{insight.insight}</p>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium">Recommended Action:</p>
                        <p className="text-sm">{insight.action}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Upcoming Coaching Sessions</h3>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Session
                </Button>
              </div>
              
              <div className="space-y-4">
                {coachingSessions?.slice(0, 5).map((session, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <MessageSquare className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{session.title}</h4>
                            <p className="text-muted-foreground text-sm mb-2">{session.session_type}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(session.scheduled_at), 'MMM dd, yyyy')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {format(new Date(session.scheduled_at), 'h:mm a')}
                              </div>
                              <span>{session.duration_minutes} min</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={getStatusVariant(session.status)}>
                            {session.status}
                          </Badge>
                          <Button size="sm">Join Session</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Action Items & Goals</h3>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Your Action Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actionItems?.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          item.status === 'completed' ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCompleteAction(item.id)}
                            className="p-1"
                          >
                            <CheckCircle2 
                              className={`h-4 w-4 ${
                                item.status === 'completed' ? 'text-green-500' : 'text-muted-foreground'
                              }`} 
                            />
                          </Button>
                          <div>
                            <div className={`font-medium ${item.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                              {item.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Due: {item.due_date ? format(new Date(item.due_date), 'MMM dd, yyyy') : 'No due date'} • {item.category}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityVariant(item.priority)}>
                            {item.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Goal Setting Workshop</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Set SMART career goals and create actionable plans to achieve them.
                  </p>
                  <Button className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Start Goal Setting
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerCoaching;