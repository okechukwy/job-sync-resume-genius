import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  MessageSquare, 
  Users, 
  Target, 
  Clock, 
  CheckCircle2, 
  Play,
  Pause,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  RotateCcw,
  TrendingUp,
  Award,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";

const AIInterviewPrep = () => {
  const [activeTab, setActiveTab] = useState("practice");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(3);

  const practiceCategories = [
    {
      id: "behavioral",
      title: "Behavioral Questions",
      description: "Practice STAR method responses",
      questions: 25,
      difficulty: "Medium",
      color: "bg-blue-500"
    },
    {
      id: "technical",
      title: "Technical Skills",
      description: "Role-specific technical questions",
      questions: 40,
      difficulty: "Hard",
      color: "bg-purple-500"
    },
    {
      id: "leadership",
      title: "Leadership & Management",
      description: "Management scenario questions",
      questions: 18,
      difficulty: "Medium",
      color: "bg-green-500"
    },
    {
      id: "situational",
      title: "Situational Judgment",
      description: "Problem-solving scenarios",
      questions: 30,
      difficulty: "Medium",
      color: "bg-orange-500"
    }
  ];

  const mockInterviewTypes = [
    {
      type: "Phone Screen",
      duration: "30 min",
      description: "Initial screening interview simulation",
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      type: "Technical Interview",
      duration: "60 min", 
      description: "Role-specific technical assessment",
      icon: <Brain className="h-6 w-6" />
    },
    {
      type: "Panel Interview",
      duration: "45 min",
      description: "Multiple interviewer simulation",
      icon: <Users className="h-6 w-6" />
    },
    {
      type: "Final Round",
      duration: "90 min",
      description: "Executive-level interview prep",
      icon: <Target className="h-6 w-6" />
    }
  ];

  const strengths = [
    { area: "Communication", score: 85, improvement: "+12%" },
    { area: "Technical Knowledge", score: 92, improvement: "+8%" },
    { area: "Problem Solving", score: 78, improvement: "+15%" },
    { area: "Cultural Fit", score: 88, improvement: "+5%" }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    toast.success("Recording started - answer the question naturally");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    // Simulate AI analysis
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70;
      setPracticeScore(score);
      toast.success(`Analysis complete! Score: ${score}/100`);
    }, 2000);
  };

  const handlePauseRecording = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? "Recording resumed" : "Recording paused");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">AI Interview Preparation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practice with AI-powered mock interviews, get instant feedback, and build confidence for your next opportunity
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{completedSessions}</div>
                <div className="text-sm text-muted-foreground">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">87%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Hours Practiced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">+15%</div>
                <div className="text-sm text-muted-foreground">Improvement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 glass-card">
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Practice
            </TabsTrigger>
            <TabsTrigger value="mock" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Mock Interview
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Question Bank
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="practice">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Practice Categories */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Choose Practice Category</h3>
                <div className="space-y-4">
                  {practiceCategories.map((category) => (
                    <Card key={category.id} className="glass-card hover:shadow-lg transition-all cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                            <div>
                              <h4 className="font-medium">{category.title}</h4>
                              <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{category.questions} Questions</Badge>
                            <div className="text-xs text-muted-foreground mt-1">{category.difficulty}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Current Practice Session */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Practice Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Current Question:</h4>
                    <p className="text-muted-foreground">
                      "Tell me about a time when you had to overcome a significant challenge at work. 
                      How did you approach it and what was the outcome?"
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    {!isRecording ? (
                      <Button onClick={handleStartRecording} size="lg" className="flex items-center gap-2">
                        <Mic className="h-4 w-4" />
                        Start Recording
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button 
                          onClick={handlePauseRecording} 
                          variant="outline" 
                          size="lg"
                          className="flex items-center gap-2"
                        >
                          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                          {isPaused ? "Resume" : "Pause"}
                        </Button>
                        <Button 
                          onClick={handleStopRecording} 
                          variant="destructive" 
                          size="lg"
                          className="flex items-center gap-2"
                        >
                          <MicOff className="h-4 w-4" />
                          Stop & Analyze
                        </Button>
                      </div>
                    )}
                  </div>

                  {isRecording && (
                    <div className="text-center">
                      <div className="animate-pulse text-red-500 font-medium">Recording in progress...</div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {isPaused ? "Recording paused" : "Speak naturally and take your time"}
                      </div>
                    </div>
                  )}

                  {practiceScore > 0 && (
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        Great response! Score: {practiceScore}/100. Key strengths: Clear structure, specific examples, quantified results.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mock">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Full Mock Interview Sessions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockInterviewTypes.map((mock, index) => (
                  <Card key={index} className="glass-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {mock.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{mock.type}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{mock.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{mock.description}</p>
                      <Button className="w-full">Start Mock Interview</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Performance Analysis</h3>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Strength Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {strengths.map((strength, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{strength.area}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-green-600">
                              {strength.improvement}
                            </Badge>
                            <span className="font-bold">{strength.score}/100</span>
                          </div>
                        </div>
                        <Progress value={strength.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Excellent:</strong> Your responses show strong problem-solving skills and clear communication.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Improvement:</strong> Consider adding more specific metrics and quantifiable results to your examples.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="library">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Interview Question Library</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {practiceCategories.map((category) => (
                  <Card key={category.id} className="glass-card">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-muted-foreground">{category.questions} questions</span>
                        <Badge variant="outline">{category.difficulty}</Badge>
                      </div>
                      <Button variant="outline" className="w-full">Browse Questions</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-500">+15%</div>
                        <div className="text-sm text-muted-foreground">Improvement this month</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Confidence Level</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Personalized Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">Focus on providing more specific examples in your behavioral responses.</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">Practice technical questions for your industry more frequently.</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">Your communication style is excellent - maintain this confidence.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIInterviewPrep;