import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  Brain
} from "lucide-react";
import { toast } from "sonner";

const CareerCoaching = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [careerStage, setCareerStage] = useState("mid-level");
  const [completedAssessments, setCompletedAssessments] = useState(2);

  const coachingAreas = [
    {
      title: "Career Path Planning",
      description: "Define your career goals and create a roadmap",
      progress: 75,
      status: "in-progress",
      lessons: 8,
      timeToComplete: "2 weeks"
    },
    {
      title: "Leadership Development",
      description: "Build essential leadership and management skills",
      progress: 45,
      status: "in-progress", 
      lessons: 12,
      timeToComplete: "4 weeks"
    },
    {
      title: "Personal Branding",
      description: "Establish your professional brand and online presence",
      progress: 90,
      status: "complete",
      lessons: 6,
      timeToComplete: "1 week"
    },
    {
      title: "Networking Mastery",
      description: "Build meaningful professional relationships",
      progress: 30,
      status: "not-started",
      lessons: 10,
      timeToComplete: "3 weeks"
    }
  ];

  const personalizedInsights = [
    {
      category: "Strengths",
      insight: "Your analytical skills and attention to detail are exceptional",
      action: "Consider roles that leverage data analysis and strategic planning",
      impact: "High",
      icon: <Award className="h-5 w-5 text-yellow-500" />
    },
    {
      category: "Growth Areas",
      insight: "Developing public speaking skills could accelerate your career",
      action: "Join Toastmasters or take a presentation skills course",
      impact: "Medium",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />
    },
    {
      category: "Opportunities",
      insight: "Your industry is growing rapidly in the AI/ML space",
      action: "Consider upskilling in machine learning or data science",
      impact: "High",
      icon: <Lightbulb className="h-5 w-5 text-green-500" />
    },
    {
      category: "Market Trends",
      insight: "Remote work expertise is increasingly valuable",
      action: "Highlight your remote collaboration and management experience",
      impact: "Medium",
      icon: <BarChart3 className="h-5 w-5 text-purple-500" />
    }
  ];

  const upcomingSessions = [
    {
      title: "1:1 Career Strategy Session",
      coach: "Sarah Johnson",
      date: "Jan 18, 2024",
      time: "2:00 PM",
      duration: "60 min",
      type: "video"
    },
    {
      title: "Resume Review & Optimization",
      coach: "Mike Chen",
      date: "Jan 22, 2024", 
      time: "10:00 AM",
      duration: "45 min",
      type: "video"
    },
    {
      title: "Interview Preparation Workshop",
      coach: "Lisa Rodriguez",
      date: "Jan 25, 2024",
      time: "3:00 PM", 
      duration: "90 min",
      type: "group"
    }
  ];

  const learningModules = [
    {
      title: "Executive Presence Masterclass",
      description: "Develop the presence and confidence of a senior leader",
      instructor: "Dr. Amanda Williams",
      rating: 4.9,
      students: 1250,
      duration: "3.5 hours",
      level: "Advanced",
      topics: ["Executive Communication", "Influence & Persuasion", "Board Presentations"]
    },
    {
      title: "Negotiation Skills for Career Growth",
      description: "Master salary, promotion, and business negotiations",
      instructor: "Robert Kim",
      rating: 4.8,
      students: 980,
      duration: "2.5 hours", 
      level: "Intermediate",
      topics: ["Salary Negotiation", "Deal Making", "Conflict Resolution"]
    },
    {
      title: "Building High-Performance Teams",
      description: "Learn to build, lead, and motivate exceptional teams",
      instructor: "Jennifer Park", 
      rating: 4.7,
      students: 750,
      duration: "4 hours",
      level: "Advanced", 
      topics: ["Team Dynamics", "Performance Management", "Culture Building"]
    }
  ];

  const actionItems = [
    {
      task: "Complete skills assessment for leadership track",
      priority: "High",
      dueDate: "Jan 20, 2024",
      category: "Assessment",
      completed: false
    },
    {
      task: "Update LinkedIn profile with new certifications",
      priority: "Medium", 
      dueDate: "Jan 22, 2024",
      category: "Personal Branding",
      completed: false
    },
    {
      task: "Schedule coffee chat with industry mentor",
      priority: "High",
      dueDate: "Jan 25, 2024", 
      category: "Networking",
      completed: false
    },
    {
      task: "Review and practice elevator pitch",
      priority: "Low",
      dueDate: "Jan 18, 2024",
      category: "Communication", 
      completed: true
    }
  ];

  const handleCompleteAction = (index: number) => {
    const newActions = [...actionItems];
    newActions[index].completed = !newActions[index].completed;
    toast.success(newActions[index].completed ? "Action completed!" : "Action marked as incomplete");
  };

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
              <div className="text-2xl font-bold text-primary">68%</div>
              <div className="text-sm text-muted-foreground">Career Goals Progress</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Coaching Sessions</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rating</div>
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
                    {coachingAreas.map((area, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{area.title}</span>
                            <div className="text-xs text-muted-foreground">
                              {area.lessons} lessons • {area.timeToComplete}
                            </div>
                          </div>
                          <Badge 
                            variant={area.status === "complete" ? "default" : 
                                   area.status === "in-progress" ? "secondary" : "outline"}
                          >
                            {area.status}
                          </Badge>
                        </div>
                        <Progress value={area.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{area.description}</p>
                      </div>
                    ))}
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
                {coachingAreas.map((area, index) => (
                  <Card key={index} className="glass-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{area.title}</CardTitle>
                          <p className="text-muted-foreground mt-1">{area.description}</p>
                        </div>
                        <Badge 
                          variant={area.status === "complete" ? "default" : 
                                 area.status === "in-progress" ? "secondary" : "outline"}
                        >
                          {area.progress}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={area.progress} className="mb-4" />
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                        <span>{area.lessons} lessons</span>
                        <span>{area.timeToComplete}</span>
                      </div>
                      <Button className="w-full">
                        {area.status === "not-started" ? "Start Learning" : "Continue"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learning">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Learning Modules</h3>
              <div className="space-y-6">
                {learningModules.map((module, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2">{module.title}</h4>
                          <p className="text-muted-foreground mb-3">{module.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>by {module.instructor}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{module.rating}</span>
                            </div>
                            <span>{module.students} students</span>
                            <span>{module.duration}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{module.level}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="secondary" className="text-xs">
                            {topic}
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
                {upcomingSessions.map((session, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <MessageSquare className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{session.title}</h4>
                            <p className="text-muted-foreground text-sm mb-2">with {session.coach}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {session.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.time}
                              </div>
                              <span>{session.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            {session.type}
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
                    {actionItems.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          item.completed ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCompleteAction(index)}
                            className="p-1"
                          >
                            <CheckCircle2 
                              className={`h-4 w-4 ${
                                item.completed ? 'text-green-500' : 'text-muted-foreground'
                              }`} 
                            />
                          </Button>
                          <div>
                            <div className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {item.task}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Due: {item.dueDate} • {item.category}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={item.priority === "High" ? "destructive" : 
                                   item.priority === "Medium" ? "secondary" : "outline"}
                          >
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