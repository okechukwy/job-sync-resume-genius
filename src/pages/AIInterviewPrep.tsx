
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Mic, MicOff, Play, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface AssessmentResults {
  clarity: number;
  confidence: number;
  relevance: number;
  structure: number;
  overall: number;
}

const AIInterviewPrep = () => {
  const { toast } = useToast();
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    error: speechError
  } = useSpeechRecognition();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [responses, setResponses] = useState<string[]>([]);

  const questions = [
    "Tell me about yourself and your professional background.",
    "Why are you interested in this position?",
    "What is your greatest strength?",
    "Describe a challenging situation you faced at work and how you handled it.",
    "Where do you see yourself in 5 years?"
  ];

  const analyzeResponse = async (responseText: string): Promise<AssessmentResults> => {
    console.log('Analyzing response:', responseText);
    
    if (!responseText || responseText.trim().length === 0) {
      console.warn('Empty response provided for analysis');
      toast({
        title: "No Response Detected",
        description: "Please record your answer and try again.",
        variant: "destructive",
      });
      return {
        clarity: 0,
        confidence: 0,
        relevance: 0,
        structure: 0,
        overall: 0
      };
    }

    if (responseText.trim().length < 10) {
      console.warn('Response too short for meaningful analysis');
      toast({
        title: "Response Too Short",
        description: "Please provide a more detailed answer for better assessment.",
        variant: "destructive",
      });
      return {
        clarity: Math.floor(Math.random() * 30) + 20, // 20-50 for short responses
        confidence: Math.floor(Math.random() * 30) + 20,
        relevance: Math.floor(Math.random() * 30) + 20,
        structure: Math.floor(Math.random() * 30) + 20,
        overall: Math.floor(Math.random() * 30) + 20
      };
    }

    // Simulate analysis with realistic scoring based on response content
    const wordCount = responseText.split(' ').length;
    const hasStructure = responseText.includes('first') || responseText.includes('second') || responseText.includes('finally');
    const hasExamples = responseText.includes('example') || responseText.includes('experience') || responseText.includes('when');
    
    const clarity = Math.min(95, Math.max(50, 60 + Math.floor(wordCount / 5) + (hasExamples ? 15 : 0)));
    const confidence = Math.min(95, Math.max(40, 55 + Math.floor(wordCount / 8) + (responseText.length > 100 ? 20 : 0)));
    const relevance = Math.min(95, Math.max(45, 65 + (hasExamples ? 20 : 0)));
    const structure = Math.min(95, Math.max(35, 50 + (hasStructure ? 25 : 0) + Math.floor(wordCount / 10)));
    const overall = Math.floor((clarity + confidence + relevance + structure) / 4);

    console.log('Analysis results:', { clarity, confidence, relevance, structure, overall });

    return {
      clarity,
      confidence,
      relevance,
      structure,
      overall
    };
  };

  const handleStartRecording = () => {
    console.log('Starting recording for question:', questions[currentQuestion]);
    resetTranscript();
    startListening();
    toast({
      title: "Recording Started",
      description: "Speak your answer clearly. Click stop when finished.",
    });
  };

  const handleStopRecording = async () => {
    console.log('Stopping recording...');
    setIsAnalyzing(true);
    
    try {
      const finalTranscript = await stopListening();
      console.log('Final transcript received:', finalTranscript);
      
      if (!finalTranscript || finalTranscript.trim().length === 0) {
        toast({
          title: "No Speech Detected",
          description: "Please try recording again and speak clearly.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      // Update responses array
      const newResponses = [...responses];
      newResponses[currentQuestion] = finalTranscript;
      setResponses(newResponses);

      toast({
        title: "Analyzing Response",
        description: "Please wait while we evaluate your answer...",
      });

      // Analyze the response
      const results = await analyzeResponse(finalTranscript);
      setAssessmentResults(results);

      toast({
        title: "Analysis Complete",
        description: `Overall score: ${results.overall}%`,
      });
    } catch (error) {
      console.error('Error during recording/analysis:', error);
      toast({
        title: "Analysis Failed",
        description: "Please try recording your answer again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAssessmentResults(null);
      resetTranscript();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAssessmentResults(null);
      resetTranscript();
    }
  };

  const handleResetQuestion = () => {
    setAssessmentResults(null);
    resetTranscript();
    toast({
      title: "Question Reset",
      description: "You can now record a new answer.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <div className="text-xl font-bold gradient-text">AI Interview Practice</div>
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Question Section */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Interview Question</Badge>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === questions.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl">{questions[currentQuestion]}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {!isListening ? (
                      <Button
                        onClick={handleStartRecording}
                        disabled={isAnalyzing}
                        className="flex-1"
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button
                        onClick={handleStopRecording}
                        disabled={isAnalyzing}
                        variant="destructive"
                        className="flex-1"
                      >
                        <MicOff className="w-4 h-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      onClick={handleResetQuestion}
                      disabled={isListening || isAnalyzing}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>

                  {speechError && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive">{speechError}</p>
                    </div>
                  )}

                  {isListening && (
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-sm text-primary">🎤 Listening... Speak your answer</p>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-600">🔍 Analyzing your response...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Transcript Display */}
            {transcript && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Your Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{transcript}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Word count: {transcript.split(' ').filter(word => word.length > 0).length}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Assessment Results */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl">Assessment Results</CardTitle>
                <CardDescription>
                  {assessmentResults 
                    ? "Your interview performance analysis"
                    : "Record your answer to see assessment results"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assessmentResults ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">
                          {assessmentResults.overall}%
                        </div>
                        <div className="text-sm text-muted-foreground">Overall Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">
                          {assessmentResults.overall >= 80 ? "Excellent" : 
                           assessmentResults.overall >= 60 ? "Good" : 
                           assessmentResults.overall >= 40 ? "Fair" : "Needs Work"}
                        </div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Clarity</span>
                          <span className="text-sm">{assessmentResults.clarity}%</span>
                        </div>
                        <Progress value={assessmentResults.clarity} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Confidence</span>
                          <span className="text-sm">{assessmentResults.confidence}%</span>
                        </div>
                        <Progress value={assessmentResults.confidence} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Relevance</span>
                          <span className="text-sm">{assessmentResults.relevance}%</span>
                        </div>
                        <Progress value={assessmentResults.relevance} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Structure</span>
                          <span className="text-sm">{assessmentResults.structure}%</span>
                        </div>
                        <Progress value={assessmentResults.structure} className="h-2" />
                      </div>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-medium mb-2">Feedback</h4>
                      <p className="text-sm text-muted-foreground">
                        {assessmentResults.overall >= 80 
                          ? "Great job! Your answer was well-structured and confident. Keep up the good work!"
                          : assessmentResults.overall >= 60
                          ? "Good response! Consider adding more specific examples and improving your structure."
                          : assessmentResults.overall >= 40
                          ? "Fair attempt. Try to be more specific and organize your thoughts before speaking."
                          : "Consider practicing more. Focus on clarity, structure, and providing relevant examples."
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎤</div>
                    <p className="text-muted-foreground">
                      Click "Start Recording" to practice your interview answer
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interview Tips */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use the STAR method: Situation, Task, Action, Result</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Speak clearly and at a moderate pace</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Provide specific examples from your experience</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Keep answers between 1-3 minutes long</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link to="/resources/interview-preparation">
            <Button variant="outline">
              View Interview Guide
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewPrep;
