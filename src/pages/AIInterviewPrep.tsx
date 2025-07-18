import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mic, 
  MicOff, 
  RotateCcw, 
  PlayCircle, 
  Clock, 
  TrendingUp,
  Brain,
  MessageSquare,
  Target,
  Zap,
  RefreshCw,
  AlertCircle,
  Wifi,
  WifiOff
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAIInterview, InterviewQuestion, InterviewAnalysis } from "@/hooks/useAIInterview";

const AIInterviewPrep = () => {
  const { toast } = useToast();
  const {
    loading,
    analyzing,
    currentSession,
    retryCount,
    startSession,
    addResponse,
    completeSession,
    getSessionHistory,
    retryLastAction
  } = useAIInterview();

  const [selectedType, setSelectedType] = useState("behavioral");
  const [selectedRole, setSelectedRole] = useState("Business");
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [sessionHistory, setSessionHistory] = useState([]);
  const [lastAnalysis, setLastAnalysis] = useState<InterviewAnalysis | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'limited'>('online');

  // Speech recognition setup
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Recording Error",
          description: "There was an issue with speech recognition. Please try again.",
          variant: "destructive",
        });
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }

    // Load session history
    loadSessionHistory();

    // Check connection status periodically
    const checkConnection = () => {
      setConnectionStatus(navigator.onLine ? 'online' : 'offline');
    };
    
    checkConnection();
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);
    
    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, [toast]);

  const loadSessionHistory = async () => {
    const history = await getSessionHistory();
    setSessionHistory(history);
  };

  const interviewTypes = [
    { id: "behavioral", name: "Behavioral", icon: MessageSquare, description: "STAR method questions" },
    { id: "technical", name: "Technical", icon: Brain, description: "Role-specific skills" },
    { id: "situational", name: "Situational", icon: Target, description: "Problem-solving scenarios" },
    { id: "mock", name: "Full Mock", icon: Zap, description: "Complete interview simulation" }
  ];

  const roleOptions = [
    "Business", "Technology", "Healthcare", "Finance", "Marketing", 
    "Sales", "Engineering", "Design", "Management", "Operations"
  ];

  const handleStartSession = async () => {
    try {
      await startSession(selectedType, selectedRole, "medium");
      setCurrentQuestionIndex(0);
      setTranscript("");
      setLastAnalysis(null);
      setConnectionStatus('online'); // Reset connection status on successful start
      
      toast({
        title: "Interview Started",
        description: "Your AI interview session has begun. Good luck!",
      });
    } catch (error) {
      console.error('Error starting session:', error);
      setConnectionStatus('limited');
    }
  };

  const handleRetrySession = async () => {
    retryLastAction();
    await handleStartSession();
  };

  const startRecording = () => {
    if (recognition && !isRecording) {
      setTranscript("");
      setRecordingStartTime(Date.now());
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = async () => {
    if (recognition && isRecording && currentSession) {
      recognition.stop();
      setIsRecording(false);
      
      const duration = recordingStartTime ? Math.round((Date.now() - recordingStartTime) / 1000) : 0;
      setRecordingStartTime(null);

      if (transcript.trim()) {
        try {
          const currentQuestion = currentSession.questions[currentQuestionIndex];
          const result = await addResponse(currentQuestion.id, transcript.trim(), duration);
          
          setLastAnalysis(result.response.analysis);
          
          // Check if analysis indicates limited service
          if (result.response.analysis.summary.includes('temporarily unavailable')) {
            setConnectionStatus('limited');
          }
          
          toast({
            title: "Response Analyzed",
            description: `Score: ${result.response.analysis.overallScore}%. Great job!`,
          });

          // Move to next question or complete session
          if (currentQuestionIndex < currentSession.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setTranscript("");
          } else {
            await completeSession();
            await loadSessionHistory();
          }
        } catch (error) {
          console.error('Error processing response:', error);
          setConnectionStatus('limited');
        }
      } else {
        toast({
          title: "No Response Detected",
          description: "Please try recording your answer again.",
          variant: "destructive",
        });
      }
    }
  };

  const resetSession = () => {
    setCurrentQuestionIndex(0);
    setTranscript("");
    setLastAnalysis(null);
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const currentQuestion = currentSession?.questions[currentQuestionIndex];

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'online':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'limited':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
    }
  };

  const getConnectionMessage = () => {
    switch (connectionStatus) {
      case 'online':
        return "AI services online";
      case 'limited':
        return "Limited AI services - using fallback mode";
      case 'offline':
        return "Offline mode - using cached questions";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">AI Interview Preparation</h1>
          <p className="text-xl text-muted-foreground">
            Practice with AI-powered interview questions and get real-time feedback
          </p>
          
          {/* Connection Status Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {getConnectionIcon()}
            <span className="text-sm text-muted-foreground">{getConnectionMessage()}</span>
          </div>
        </div>

        <Tabs defaultValue="practice" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="practice">Practice Session</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            {!currentSession ? (
              // Session Setup
              <div className="grid gap-6">
                {/* Connection Warning */}
                {connectionStatus !== 'online' && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {connectionStatus === 'limited' 
                        ? "AI services are experiencing issues. You can still practice with our curated question bank."
                        : "You're offline. Using cached questions for practice."
                      }
                    </AlertDescription>
                  </Alert>
                )}

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Choose Your Interview Type</CardTitle>
                    <CardDescription>
                      Select the type of interview you'd like to practice
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {interviewTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <Card
                            key={type.id}
                            className={`cursor-pointer transition-all hover:shadow-lg ${
                              selectedType === type.id ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => setSelectedType(type.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                              <h3 className="font-semibold">{type.name}</h3>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Select Your Role Focus</CardTitle>
                    <CardDescription>
                      Choose your industry or role for targeted questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {roleOptions.map((role) => (
                        <Button
                          key={role}
                          variant={selectedRole === role ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedRole(role)}
                          className="justify-start"
                        >
                          {role}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center space-y-4">
                  <Button
                    onClick={handleStartSession}
                    disabled={loading}
                    size="lg"
                    className="px-8"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Questions...
                      </>
                    ) : (
                      "Start Interview Session"
                    )}
                  </Button>
                  
                  {retryCount > 0 && (
                    <div className="text-center">
                      <Button
                        onClick={handleRetrySession}
                        variant="outline"
                        size="sm"
                        disabled={loading}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry ({retryCount})
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Active Session
              <div className="grid gap-6">
                {/* Progress */}
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-semibold">Question {currentQuestionIndex + 1} of {currentSession.questions.length}</h3>
                        <p className="text-sm text-muted-foreground">{currentSession.sessionType} • {currentSession.roleFocus}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={resetSession}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                    <Progress value={(currentQuestionIndex / currentSession.questions.length) * 100} className="mb-2" />
                  </CardContent>
                </Card>

                {/* Current Question */}
                {currentQuestion && (
                  <Card className="glass-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{currentQuestion.text}</CardTitle>
                          <div className="flex gap-2 mb-4">
                            <Badge variant="secondary">{currentQuestion.category}</Badge>
                            <Badge variant="outline">{currentQuestion.difficulty}</Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm bg-muted/30 p-3 rounded-lg">
                        💡 <strong>Tip:</strong> {currentQuestion.tips}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Recording Interface */}
                      <div className="text-center space-y-4">
                        <div className="flex justify-center items-center gap-4">
                          <Button
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={analyzing}
                            size="lg"
                            variant={isRecording ? "destructive" : "default"}
                            className="px-8"
                          >
                            {isRecording ? (
                              <>
                                <MicOff className="w-5 h-5 mr-2" />
                                Stop Recording
                              </>
                            ) : analyzing ? (
                              <>
                                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                Analyzing Response...
                              </>
                            ) : (
                              <>
                                <Mic className="w-5 h-5 mr-2" />
                                Start Recording
                              </>
                            )}
                          </Button>
                        </div>

                        {isRecording && (
                          <div className="text-center">
                            <div className="inline-flex items-center gap-2 text-red-500 animate-pulse">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              Recording...
                            </div>
                          </div>
                        )}

                        {transcript && (
                          <Card className="text-left">
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-2">Your Response:</h4>
                              <p className="text-muted-foreground">{transcript}</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Analysis Results */}
                {lastAnalysis && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Assessment Results
                        {lastAnalysis.summary.includes('temporarily unavailable') && (
                          <Badge variant="outline" className="text-orange-600">
                            Limited Analysis
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {lastAnalysis.overallScore}%
                        </div>
                        <p className="text-muted-foreground">Overall Score</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-semibold">{lastAnalysis.scores.communication}%</div>
                          <p className="text-sm text-muted-foreground">Communication</p>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-semibold">{lastAnalysis.scores.content}%</div>
                          <p className="text-sm text-muted-foreground">Content</p>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-semibold">{lastAnalysis.scores.structure}%</div>
                          <p className="text-sm text-muted-foreground">Structure</p>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-semibold">{lastAnalysis.scores.impact}%</div>
                          <p className="text-sm text-muted-foreground">Impact</p>
                        </div>
                      </div>

                      {lastAnalysis.strengths.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Strengths:</h4>
                          <ul className="space-y-1">
                            {lastAnalysis.strengths.map((strength, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {lastAnalysis.improvements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-orange-600 mb-2">Areas for Improvement:</h4>
                          <div className="space-y-2">
                            {lastAnalysis.improvements.map((improvement, index) => (
                              <div key={index} className="text-sm">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant={improvement.priority === 'high' ? 'destructive' : improvement.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                                    {improvement.priority}
                                  </Badge>
                                  <span className="font-medium">{improvement.area}</span>
                                </div>
                                <p className="text-muted-foreground">{improvement.suggestion}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {lastAnalysis.industryFeedback && (
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Industry-Specific Feedback:</h4>
                          <p className="text-sm text-muted-foreground">{lastAnalysis.industryFeedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track your progress and improvement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sessionHistory.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {sessionHistory.length}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Sessions</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {Math.round(sessionHistory.reduce((sum, session) => sum + (session.scores?.overall || 0), 0) / sessionHistory.length)}%
                        </div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {sessionHistory.filter(s => s.completed).length}
                        </div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <PlayCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Complete some interview sessions to see your analytics</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Session History</CardTitle>
                <CardDescription>
                  Review your past interview sessions and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sessionHistory.length > 0 ? (
                  <div className="space-y-4">
                    {sessionHistory.map((session, index) => (
                      <Card key={session.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{session.session_type} Interview</h4>
                              <p className="text-sm text-muted-foreground">
                                {session.role_focus} • {new Date(session.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">
                                {session.scores?.overall || 0}%
                              </div>
                              <Badge variant={session.completed ? "default" : "secondary"}>
                                {session.completed ? "Completed" : "In Progress"}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No interview sessions yet. Start your first practice session!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIInterviewPrep;
