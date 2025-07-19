import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  WifiOff,
  Settings,
  Timer,
  Plus,
  ArrowLeft,
  CheckCircle
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
    retryLastAction,
    setCurrentSession
  } = useAIInterview();

  const [selectedType, setSelectedType] = useState("behavioral");
  const [selectedRole, setSelectedRole] = useState("Business");
  const [selectedLength, setSelectedLength] = useState("medium");
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [sessionHistory, setSessionHistory] = useState([]);
  const [lastAnalysis, setLastAnalysis] = useState<InterviewAnalysis | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'limited'>('online');
  const [historyLoading, setHistoryLoading] = useState(false);
  const [isProcessingResponse, setIsProcessingResponse] = useState(false);

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

  const loadSessionHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      console.log('Loading session history...');
      const history = await getSessionHistory();
      console.log('Loaded session history:', history);
      setSessionHistory(history);
    } catch (error) {
      console.error('Error loading session history:', error);
      toast({
        title: "Error Loading History",
        description: "Could not load your session history. Please try refreshing.",
        variant: "destructive",
      });
    } finally {
      setHistoryLoading(false);
    }
  }, [getSessionHistory, toast]);

  // Refresh session history manually
  const refreshSessionHistory = useCallback(async () => {
    await loadSessionHistory();
    toast({
      title: "History Refreshed",
      description: "Session history has been updated.",
    });
  }, [loadSessionHistory, toast]);

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

  const sessionLengths = [
    { id: "quick", name: "Quick Practice", count: 3, description: "3 questions • 10-15 min", icon: Zap },
    { id: "short", name: "Short Session", count: 5, description: "5 questions • 15-20 min", icon: Clock },
    { id: "medium", name: "Medium Session", count: 8, description: "8 questions • 25-35 min", icon: Timer },
    { id: "long", name: "Long Session", count: 12, description: "12 questions • 35-50 min", icon: Target },
    { id: "comprehensive", name: "Comprehensive", count: 15, description: "15 questions • 45-60 min", icon: Brain }
  ];

  const getQuestionCount = () => {
    const length = sessionLengths.find(l => l.id === selectedLength);
    return length?.count || 5;
  };

  const handleStartSession = async () => {
    try {
      const questionCount = getQuestionCount();
      await startSession(selectedType, selectedRole, "medium", questionCount);
      setCurrentQuestionIndex(0);
      setTranscript("");
      setLastAnalysis(null);
      setConnectionStatus('online'); // Reset connection status on successful start
      
      toast({
        title: "Interview Started",
        description: `Your AI interview session has begun with ${questionCount} questions. Good luck!`,
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
      setIsProcessingResponse(true);
      
      const duration = recordingStartTime ? Math.round((Date.now() - recordingStartTime) / 1000) : 0;
      setRecordingStartTime(null);

      if (transcript.trim()) {
        try {
          const currentQuestion = currentSession.questions[currentQuestionIndex];
          console.log('Processing response for question:', currentQuestionIndex + 1, 'of', currentSession.questions.length);
          console.log('Current session responses before adding:', currentSession.responses.length);
          
          const result = await addResponse(currentQuestion.id, transcript.trim(), duration);
          
          console.log('Response added successfully, updated session:', result.session);
          console.log('New response count:', result.session.responses.length);
          
          setLastAnalysis(result.response.analysis);
          
          // Check if analysis indicates limited service
          if (result.response.analysis.summary.includes('temporarily unavailable')) {
            setConnectionStatus('limited');
          }
          
          toast({
            title: "Response Analyzed",
            description: `Score: ${result.response.analysis.overallScore}%. Great job!`,
          });

          // Use the updated session from the result to determine next action
          const updatedSession = result.session;
          const isLastQuestion = currentQuestionIndex >= updatedSession.questions.length - 1;
          const allQuestionsAnswered = updatedSession.responses.length >= updatedSession.questions.length;
          
          console.log('Session completion check:', {
            currentQuestionIndex,
            totalQuestions: updatedSession.questions.length,
            responsesCount: updatedSession.responses.length,
            isLastQuestion,
            allQuestionsAnswered
          });

          if (allQuestionsAnswered) {
            console.log('All questions answered, completing session...');
            // Update current session immediately to ensure 100% progress
            setCurrentSession(updatedSession);
            // Small delay to ensure UI updates with 100% progress
            setTimeout(async () => {
              await completeSession();
              await loadSessionHistory();
            }, 1500);
          } else {
            // Move to next question
            console.log('Moving to next question...');
            setCurrentQuestionIndex(prev => prev + 1);
            setTranscript("");
          }
        } catch (error) {
          console.error('Error processing response:', error);
          setConnectionStatus('limited');
          toast({
            title: "Response Processing Failed",
            description: "Your response could not be processed. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "No Response Detected",
          description: "Please try recording your answer again.",
          variant: "destructive",
        });
      }
      
      setIsProcessingResponse(false);
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

  const goBackToConfiguration = () => {
    // Reset current session and go back to configuration
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
    setCurrentQuestionIndex(0);
    setTranscript("");
    setLastAnalysis(null);
    // Reset the session to null to show configuration screen instead of completing it
    setCurrentSession(null);
  };

  const currentQuestion = currentSession?.questions[currentQuestionIndex];

  // Enhanced progress calculation that accounts for processing state
  const completedResponses = currentSession?.responses?.length || 0;
  const totalQuestions = currentSession?.questions?.length || 0;
  const isCurrentlyProcessing = isProcessingResponse && transcript.trim();
  
  // Calculate progress including current processing response
  let effectiveCompletedResponses = completedResponses;
  if (isCurrentlyProcessing && completedResponses < totalQuestions) {
    effectiveCompletedResponses = completedResponses + 1;
  }
  
  const progressPercentage = totalQuestions > 0 ? Math.round((effectiveCompletedResponses / totalQuestions) * 100) : 0;
  
  // Calculate remaining time based on actual remaining questions
  const remainingQuestions = Math.max(0, totalQuestions - effectiveCompletedResponses);
  const estimatedTimeRemaining = Math.round(remainingQuestions * 3.5);
  
  // Session is complete when all responses are recorded
  const isSessionComplete = completedResponses >= totalQuestions && totalQuestions > 0;

  console.log('Progress calculation:', {
    completedResponses,
    totalQuestions,
    isCurrentlyProcessing,
    effectiveCompletedResponses,
    progressPercentage,
    isSessionComplete
  });
  
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

  const analyticsData = useMemo(() => {
    if (!sessionHistory || sessionHistory.length === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        completedSessions: 0,
        questionsPracticed: 0,
        hasData: false
      };
    }

    console.log('Calculating analytics from session history:', sessionHistory);

    // Filter completed sessions with valid scores
    const completedSessions = sessionHistory.filter(session => 
      session.completed === true && 
      session.responses && 
      Array.isArray(session.responses) && 
      session.responses.length > 0
    );

    console.log('Completed sessions with responses:', completedSessions);

    // Calculate average score from sessions with valid overall scores
    const sessionsWithValidScores = completedSessions.filter(session => 
      session.scores?.overall && 
      typeof session.scores.overall === 'number' && 
      session.scores.overall > 0
    );

    console.log('Sessions with valid scores:', sessionsWithValidScores);

    const averageScore = sessionsWithValidScores.length > 0 
      ? Math.round(
          sessionsWithValidScores.reduce((sum, session) => sum + session.scores.overall, 0) / 
          sessionsWithValidScores.length
        )
      : 0;

    // Count questions actually practiced (from responses)
    const questionsPracticed = sessionHistory.reduce((total, session) => {
      const responseCount = session.responses && Array.isArray(session.responses) 
        ? session.responses.length 
        : 0;
      return total + responseCount;
    }, 0);

    const result = {
      totalSessions: sessionHistory.length,
      averageScore,
      completedSessions: completedSessions.length,
      questionsPracticed,
      hasData: true
    };

    console.log('Calculated analytics:', result);
    return result;
  }, [sessionHistory]);

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
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Interview Configuration
                    </CardTitle>
                    <CardDescription>
                      Customize your interview session settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Interview Type Selection */}
                    <div>
                      <h3 className="font-semibold mb-3">Interview Type</h3>
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
                                <h4 className="font-semibold">{type.name}</h4>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {/* Session Length Selection */}
                    <div>
                      <h3 className="font-semibold mb-3">Session Length</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {sessionLengths.map((length) => {
                          const IconComponent = length.icon;
                          return (
                            <Card
                              key={length.id}
                              className={`cursor-pointer transition-all hover:shadow-lg ${
                                selectedLength === length.id ? 'ring-2 ring-primary' : ''
                              }`}
                              onClick={() => setSelectedLength(length.id)}
                            >
                              <CardContent className="p-3 text-center">
                                <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary" />
                                <h4 className="font-medium text-sm">{length.name}</h4>
                                <p className="text-xs text-muted-foreground">{length.description}</p>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {/* Role Focus Selection */}
                    <div>
                      <h3 className="font-semibold mb-3">Role Focus</h3>
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
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Session Preview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong>Type:</strong> {interviewTypes.find(t => t.id === selectedType)?.name}
                      </div>
                      <div>
                        <strong>Questions:</strong> {getQuestionCount()}
                      </div>
                      <div>
                        <strong>Duration:</strong> {Math.round(getQuestionCount() * 3.5)} minutes
                      </div>
                    </div>
                  </div>
                  
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
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Interview Session
                      </>
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
                {/* Enhanced Progress Display */}
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={goBackToConfiguration}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </Button>
                        <div>
                          {isSessionComplete ? (
                            <>
                              <h3 className="font-semibold flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                Session Complete!
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                All {totalQuestions} questions answered • {currentSession.sessionType} • {currentSession.roleFocus}
                              </p>
                            </>
                          ) : (
                            <>
                              <h3 className="font-semibold">
                                Question {currentQuestionIndex + 1} of {totalQuestions}
                                {isProcessingResponse && <span className="text-blue-600 ml-2">(Processing...)</span>}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {completedResponses} answered • {currentSession.sessionType} • {currentSession.roleFocus}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={isSessionComplete ? "default" : "secondary"}>
                          {progressPercentage}% Complete
                        </Badge>
                        <Button variant="outline" size="sm" onClick={resetSession} disabled={isProcessingResponse}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                    <Progress value={progressPercentage} className="mb-2" />
                    <p className="text-xs text-muted-foreground">
                      {isSessionComplete 
                        ? "Session completed successfully!" 
                        : isProcessingResponse 
                          ? "Processing your response..."
                          : `Estimated time remaining: ${estimatedTimeRemaining} minutes`
                      }
                    </p>
                  </CardContent>
                </Card>

                {/* Current Question */}
                {currentQuestion && !isSessionComplete && (
                  <Card className="glass-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
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
                            disabled={analyzing || isProcessingResponse}
                            size="lg"
                            variant={isRecording ? "destructive" : "default"}
                            className="px-8"
                          >
                            {isRecording ? (
                              <>
                                <MicOff className="w-5 h-5 mr-2" />
                                Stop Recording
                              </>
                            ) : isProcessingResponse ? (
                              <>
                                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                Processing Response...
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

                {/* Session Complete Message */}
                {isSessionComplete && (
                  <Card className="glass-card border-green-200">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
                      <p className="text-muted-foreground mb-4">
                        You've completed all {totalQuestions} questions in this interview session.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button onClick={goBackToConfiguration} variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Start New Session
                        </Button>
                        <Button onClick={() => {
                          // Switch to analytics tab to view results
                          const analyticsTab = document.querySelector('[data-state="inactive"][value="analytics"]') as HTMLElement;
                          if (analyticsTab) analyticsTab.click();
                        }}>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
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
                {historyLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                    <span>Loading analytics...</span>
                  </div>
                ) : analyticsData.hasData ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {analyticsData.totalSessions}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Sessions</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {analyticsData.averageScore}%
                        </div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        {analyticsData.averageScore === 0 && (
                          <p className="text-xs text-orange-500 mt-1">Complete sessions to see score</p>
                        )}
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {analyticsData.completedSessions}
                        </div>
                        <p className="text-sm text-muted-foreground">Completed Sessions</p>
                        {analyticsData.totalSessions > analyticsData.completedSessions && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {analyticsData.totalSessions - analyticsData.completedSessions} in progress
                          </p>
                        )}
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {analyticsData.questionsPracticed}
                        </div>
                        <p className="text-sm text-muted-foreground">Questions Practiced</p>
                      </div>
                    </div>

                    {/* Additional insights */}
                    {analyticsData.completedSessions > 1 && (
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Insights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Completion Rate:</span>{" "}
                            {Math.round((analyticsData.completedSessions / analyticsData.totalSessions) * 100)}%
                          </div>
                          <div>
                            <span className="font-medium">Avg Questions per Session:</span>{" "}
                            {analyticsData.completedSessions > 0 
                              ? Math.round(analyticsData.questionsPracticed / analyticsData.completedSessions)
                              : 0
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <PlayCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">No analytics data available yet</p>
                    <p className="text-sm text-muted-foreground">Complete some interview sessions to see your performance analytics</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>
                    Review your past interview sessions and progress
                  </CardDescription>
                </div>
                <Button 
                  onClick={refreshSessionHistory} 
                  variant="outline" 
                  size="sm"
                  disabled={historyLoading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${historyLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                {historyLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                    <span>Loading session history...</span>
                  </div>
                ) : sessionHistory.length > 0 ? (
                  <div className="space-y-4">
                    {sessionHistory.map((session) => (
                      <Card key={session.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">
                                {session.session_type?.charAt(0).toUpperCase() + session.session_type?.slice(1) || 'Unknown'} Interview
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {session.role_focus} • {session.responses?.length || 0} questions answered • {new Date(session.created_at).toLocaleDateString()}
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
                          {session.responses?.length > 0 && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Questions practiced: {session.responses.length}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">No interview sessions yet</p>
                    <p className="text-sm text-muted-foreground">Start your first practice session to begin tracking your progress!</p>
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
