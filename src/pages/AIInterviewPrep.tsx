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
      description: "STAR method responses for behavioral interviews",
      questions: 50,
      difficulty: "Medium",
      color: "bg-blue-500",
      sampleQuestions: [
        "Tell me about a time when you had to overcome a significant challenge at work.",
        "Describe a situation where you had to work with a difficult team member.",
        "Give me an example of when you had to make a decision with limited information.",
        "Tell me about a time when you failed and how you handled it.",
        "Describe a situation where you had to influence others without formal authority."
      ]
    },
    {
      id: "technical",
      title: "Technical Skills",
      description: "Role-specific technical assessment questions",
      questions: 75,
      difficulty: "Hard",
      color: "bg-purple-500",
      sampleQuestions: [
        "Explain the difference between REST and GraphQL APIs.",
        "How would you optimize a slow-performing database query?",
        "Describe your approach to designing a scalable system architecture.",
        "Walk me through your debugging process for production issues.",
        "What security measures would you implement for a web application?"
      ]
    },
    {
      id: "leadership",
      title: "Leadership & Management",
      description: "Management scenarios and leadership challenges",
      questions: 35,
      difficulty: "Medium",
      color: "bg-green-500",
      sampleQuestions: [
        "How do you handle underperforming team members?",
        "Describe your approach to managing competing priorities.",
        "Tell me about a time you had to deliver difficult feedback.",
        "How do you motivate team members during challenging projects?",
        "Describe your experience with change management initiatives."
      ]
    },
    {
      id: "situational",
      title: "Situational Judgment",
      description: "Critical thinking and problem-solving scenarios",
      questions: 40,
      difficulty: "Medium", 
      color: "bg-orange-500",
      sampleQuestions: [
        "A key client is threatening to leave due to service issues. What's your approach?",
        "You discover a critical bug in production right before a major release. What do you do?",
        "Your team is missing deadlines consistently. How do you address this?",
        "A colleague takes credit for your work in a meeting. How do you handle it?",
        "You're asked to implement a feature you believe is ethically questionable. What's your response?"
      ]
    }
  ];

  const mockInterviewTypes = [
    {
      type: "Phone/Video Screen",
      duration: "30-45 min",
      description: "Initial screening with HR and hiring manager focusing on culture fit and basic qualifications",
      icon: <MessageSquare className="h-6 w-6" />,
      topics: ["Background Review", "Culture Fit", "Salary Expectations", "Availability"]
    },
    {
      type: "Technical Deep Dive",
      duration: "60-90 min", 
      description: "Comprehensive technical assessment with coding challenges and system design",
      icon: <Brain className="h-6 w-6" />,
      topics: ["Live Coding", "System Design", "Technical Problem Solving", "Code Review"]
    },
    {
      type: "Behavioral & Leadership",
      duration: "45-60 min",
      description: "Behavioral questions using STAR method and leadership scenarios",
      icon: <Users className="h-6 w-6" />,
      topics: ["STAR Method", "Leadership Experience", "Conflict Resolution", "Team Collaboration"]
    },
    {
      type: "Executive Final Round",
      duration: "60-120 min",
      description: "Senior leadership interview focusing on strategic thinking and cultural alignment",
      icon: <Target className="h-6 w-6" />,
      topics: ["Strategic Vision", "Executive Presence", "Business Acumen", "Long-term Goals"]
    },
    {
      type: "Case Study Interview",
      duration: "90 min",
      description: "Business case analysis and presentation for consulting and strategy roles",
      icon: <Lightbulb className="h-6 w-6" />,
      topics: ["Problem Analysis", "Framework Thinking", "Data Interpretation", "Recommendation"]
    }
  ];

  const performanceAreas = [
    { 
      area: "Communication Skills", 
      score: 87, 
      improvement: "+12%", 
      feedback: "Clear articulation and active listening. Work on reducing filler words.",
      trend: "improving"
    },
    { 
      area: "Technical Expertise", 
      score: 92, 
      improvement: "+8%", 
      feedback: "Strong technical knowledge. Consider practicing system design problems.",
      trend: "stable"
    },
    { 
      area: "Problem-Solving Approach", 
      score: 84, 
      improvement: "+18%", 
      feedback: "Structured thinking process. Focus on edge case consideration.",
      trend: "improving"
    },
    { 
      area: "Cultural Alignment", 
      score: 89, 
      improvement: "+5%", 
      feedback: "Good value alignment. Share more specific examples of cultural fit.",
      trend: "stable"
    },
    {
      area: "Leadership Potential",
      score: 78,
      improvement: "+22%",
      feedback: "Growing leadership awareness. Practice conflict resolution scenarios.",
      trend: "improving"
    }
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
                  <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Current Question:</h4>
                      <Badge variant="secondary">Behavioral</Badge>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      "Describe a situation where you had to make a critical decision with incomplete information. 
                      Walk me through your thought process, the actions you took, and the outcome. What would you 
                      do differently if faced with a similar situation?"
                    </p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      💡 <strong>Tip:</strong> Use the STAR method (Situation, Task, Action, Result) for structured responses
                    </div>
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
                    <div className="space-y-3">
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          <strong>Excellent Response! Score: {practiceScore}/100</strong>
                        </AlertDescription>
                      </Alert>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="font-medium text-green-800 mb-1">✅ Strengths</div>
                          <ul className="text-green-700 space-y-1 list-disc list-inside">
                            <li>Clear STAR structure</li>
                            <li>Specific examples with context</li>
                            <li>Quantified results and impact</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="font-medium text-blue-800 mb-1">💡 Improvements</div>
                          <ul className="text-blue-700 space-y-1 list-disc list-inside">
                            <li>Include lessons learned</li>
                            <li>Mention stakeholder impact</li>
                            <li>Add emotional intelligence aspects</li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Interview Topics:</div>
                          <div className="flex flex-wrap gap-1">
                            {mock.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Start Interview</Button>
                        <Button variant="outline" size="sm">Preview</Button>
                      </div>
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
                  <div className="space-y-6">
                    {performanceAreas.map((area, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{area.area}</span>
                              <Badge 
                                variant="outline" 
                                className={area.trend === 'improving' ? 'text-green-600 border-green-200' : 'text-blue-600 border-blue-200'}
                              >
                                {area.improvement}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{area.feedback}</p>
                          </div>
                          <span className="font-bold text-lg ml-4">{area.score}/100</span>
                        </div>
                        <Progress value={area.score} className="h-2" />
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
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Strengths Identified:</strong> Excellent use of the STAR method in behavioral responses. 
                        Your technical explanations are clear and well-structured. Strong examples of leadership impact.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-blue-200 bg-blue-50">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>Growth Opportunities:</strong> Include more quantified business impact in your examples. 
                        Practice articulating failures and lessons learned. Work on asking strategic questions at interview end.
                      </AlertDescription>
                    </Alert>
                    <Alert className="border-orange-200 bg-orange-50">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        <strong>AI Insight:</strong> Your confidence has improved 23% over the last month. 
                        Focus on technical system design questions for continued growth.
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
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{category.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{category.questions} questions</span>
                        <Badge variant="outline">{category.difficulty}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Sample Questions:</div>
                        <div className="space-y-1">
                          {category.sampleQuestions.slice(0, 2).map((question, qIndex) => (
                            <div key={qIndex} className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">
                              "{question}"
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">Browse All</Button>
                        <Button size="sm">Practice</Button>
                      </div>
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
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">Priority</Badge>
                          <p className="text-sm text-blue-800">
                            <strong>Enhance STAR Responses:</strong> Include specific metrics and quantified outcomes. 
                            Practice with "So what?" follow-ups to demonstrate business impact.
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">Technical</Badge>
                          <p className="text-sm text-purple-800">
                            <strong>System Design Practice:</strong> Focus on scalability discussions and trade-off analysis. 
                            Practice drawing diagrams while explaining your thought process.
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">Strength</Badge>
                          <p className="text-sm text-green-800">
                            <strong>Communication Excellence:</strong> Your clear articulation and active listening skills 
                            are standout strengths. Continue leveraging this in complex technical discussions.
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">Strategy</Badge>
                          <p className="text-sm text-orange-800">
                            <strong>Question Preparation:</strong> Develop 3-5 thoughtful questions about company culture, 
                            team dynamics, and growth opportunities to ask at interview end.
                          </p>
                        </div>
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