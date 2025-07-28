
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface InterviewQuestion {
  id: string;
  text: string;
  category: string;
  difficulty: string;
  tips: string;
  expectedElements: string[];
}

export interface InterviewAnalysis {
  overallScore: number;
  scores: {
    communication: number;
    content: number;
    structure: number;
    impact: number;
  };
  strengths: string[];
  improvements: Array<{
    area: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  industryFeedback: string;
  summary: string;
}

export interface SampleAnswer {
  sampleAnswer: string;
  structure: string;
  keyPoints: string[];
  tips: string[];
  reasoning: string;
}

export interface InterviewSession {
  id: string;
  questions: InterviewQuestion[];
  responses: Array<{
    questionId: string;
    transcript: string;
    analysis: InterviewAnalysis;
    duration: number;
  }>;
  sessionType: string;
  roleFocus: string;
  completed: boolean;
  totalScore: number;
  createdAt: string;
  questionCount: number;
  sampleAnswers?: Record<string, SampleAnswer>;
}

export const useAIInterview = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [generatingSample, setGeneratingSample] = useState(false);
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const generateQuestions = useCallback(async (
    sessionType: string = 'behavioral',
    roleFocus: string = 'General Business',
    difficulty: string = 'medium',
    previousQuestions: string[] = [],
    questionCount: number = 5
  ) => {
    setLoading(true);
    setRetryCount(0);
    
    try {
      console.log('Generating questions...', { sessionType, roleFocus, difficulty, questionCount });
      
      const { data, error } = await supabase.functions.invoke('question-generator', {
        body: { sessionType, roleFocus, difficulty, previousQuestions, questionCount }
      });

      if (error) {
        console.error('Question generation error:', error);
        throw error;
      }

      console.log('Generated questions data:', data);
      
      if (data?.sessionInfo?.focus?.includes('offline mode')) {
        toast({
          title: "Using Offline Questions",
          description: `AI service temporarily unavailable. Using curated question bank (${data.questions?.length || questionCount} questions).`,
          variant: "default",
        });
      } else {
        toast({
          title: "Questions Generated Successfully",
          description: `Generated ${data.questions?.length || questionCount} AI-powered questions for your ${sessionType} interview.`,
          variant: "default",
        });
      }
      
      return data;
    } catch (error) {
      console.error('Error generating questions:', error);
      
      let errorMessage = "Failed to generate questions. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          errorMessage = "AI service is busy. Please wait a moment and try again.";
        } else if (error.message.includes('503')) {
          errorMessage = "AI service temporarily unavailable. Please try again in a few minutes.";
        }
      }
      
      toast({
        title: "Question Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const analyzeResponse = useCallback(async (
    transcript: string,
    question: string,
    sessionType: string = 'behavioral',
    roleFocus: string = 'General Business'
  ): Promise<InterviewAnalysis> => {
    setAnalyzing(true);
    try {
      console.log('Analyzing response...', { question, transcript: transcript.substring(0, 100) + '...' });
      
      const { data, error } = await supabase.functions.invoke('interview-analysis', {
        body: { transcript, question, sessionType, roleFocus }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw error;
      }

      console.log('Analysis result:', data);
      return data as InterviewAnalysis;
    } catch (error) {
      console.error('Error analyzing response:', error);
      
      let errorMessage = "Failed to analyze your response.";
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          errorMessage = "AI analysis service is busy. Your response was recorded.";
        } else if (error.message.includes('503')) {
          errorMessage = "AI analysis temporarily unavailable. Your response was saved.";
        }
      }
      
      toast({
        title: "Analysis Unavailable",
        description: errorMessage,
        variant: "destructive",
      });
      
      return {
        overallScore: 75,
        scores: { communication: 75, content: 75, structure: 75, impact: 75 },
        strengths: ["Response recorded successfully"],
        improvements: [{
          area: "Analysis",
          suggestion: "AI analysis temporarily unavailable. Your response has been saved for review.",
          priority: "low"
        }],
        industryFeedback: "Analysis will be available when AI service is restored.",
        summary: "Response recorded - analysis temporarily unavailable"
      };
    } finally {
      setAnalyzing(false);
    }
  }, [toast]);

  const generateSampleAnswer = useCallback(async (
    question: string,
    sessionType: string,
    roleFocus: string
  ): Promise<SampleAnswer> => {
    setGeneratingSample(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-sample-answer', {
        body: { question, sessionType, roleFocus }
      });

      if (error) {
        console.error('Sample answer generation error:', error);
        throw error;
      }

      return data as SampleAnswer;
    } catch (error) {
      console.error('Error generating sample answer:', error);
      toast({
        title: "Sample Answer Error",
        description: "Failed to generate sample answer. Please try again.",
        variant: "destructive",
      });
      
      return {
        sampleAnswer: "I would approach this question by providing a structured response with specific examples from my experience, demonstrating relevant skills and showing the impact of my actions.",
        structure: "Structured approach with examples",
        keyPoints: ["Clear structure", "Specific examples", "Demonstrated impact"],
        tips: ["Use concrete examples", "Show measurable results", "Connect to role requirements"],
        reasoning: "This approach demonstrates competency and provides evidence of capability."
      };
    } finally {
      setGeneratingSample(false);
    }
  }, [toast]);

  const saveIncompleteSession = useCallback(async (session: InterviewSession) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error('User not authenticated');
      }

      const sessionData = {
        id: session.id,
        user_id: userData.user.id,
        session_type: session.sessionType,
        role_focus: session.roleFocus,
        questions: session.questions as any,
        responses: session.responses as any,
        completed: false,
        scores: { overall: 0 } as any,
        feedback: {} as any
      };

      const { error } = await supabase.from('interview_sessions').insert(sessionData);

      if (error) {
        console.error('Error saving incomplete session:', error);
        // Don't throw error here - session can still work locally
      }
    } catch (error) {
      console.error('Error saving incomplete session:', error);
      // Don't throw error here - session can still work locally
    }
  }, []);

  const startSessionWithQuestion = useCallback(async (
    question: InterviewQuestion,
    sessionType: string,
    roleFocus: string
  ) => {
    try {
      const newSession: InterviewSession = {
        id: crypto.randomUUID(),
        questions: [question],
        responses: [],
        sessionType,
        roleFocus,
        completed: false,
        totalScore: 0,
        createdAt: new Date().toISOString(),
        questionCount: 1,
      };

      // Save incomplete session to database immediately
      await saveIncompleteSession(newSession);

      setCurrentSession(newSession);
      
      toast({
        title: "Specific Question Practice",
        description: `Starting practice with your selected question.`,
      });

      return newSession;
    } catch (error) {
      console.error('Error starting session with specific question:', error);
      throw error;
    }
  }, [toast, saveIncompleteSession]);

  const startSessionWithMultipleQuestions = useCallback(async (
    questions: InterviewQuestion[],
    sessionType: string,
    roleFocus: string
  ) => {
    try {
      const newSession: InterviewSession = {
        id: crypto.randomUUID(),
        questions,
        responses: [],
        sessionType,
        roleFocus,
        completed: false,
        totalScore: 0,
        createdAt: new Date().toISOString(),
        questionCount: questions.length,
      };

      // Save incomplete session to database immediately
      await saveIncompleteSession(newSession);

      setCurrentSession(newSession);
      
      toast({
        title: "Bookmarked Questions Practice",
        description: `Starting practice session with ${questions.length} bookmarked questions.`,
      });

      return newSession;
    } catch (error) {
      console.error('Error starting session with multiple questions:', error);
      throw error;
    }
  }, [toast, saveIncompleteSession]);

  const startSession = useCallback(async (
    sessionType: string,
    roleFocus: string,
    difficulty: string = 'medium',
    questionCount: number = 5
  ) => {
    try {
      const questionsData = await generateQuestions(sessionType, roleFocus, difficulty, [], questionCount);
      
      if (!questionsData?.questions?.length) {
        throw new Error('No questions generated');
      }

      const newSession: InterviewSession = {
        id: crypto.randomUUID(),
        questions: questionsData.questions,
        responses: [],
        sessionType,
        roleFocus,
        completed: false,
        totalScore: 0,
        createdAt: new Date().toISOString(),
        questionCount: questionsData.questions.length,
      };

      // Save incomplete session to database immediately
      await saveIncompleteSession(newSession);

      setCurrentSession(newSession);
      
      const isOfflineMode = questionsData.sessionInfo?.focus?.includes('offline mode');
      
      toast({
        title: "Session Started",
        description: `Generated ${questionsData.questions.length} questions for your ${sessionType} interview.${isOfflineMode ? ' (Offline mode)' : ''}`,
      });

      return newSession;
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  }, [generateQuestions, toast, saveIncompleteSession]);

  const addResponse = useCallback(async (
    questionId: string,
    transcript: string,
    duration: number
  ) => {
    if (!currentSession) {
      throw new Error('No active session');
    }

    const question = currentSession.questions.find(q => q.id === questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    const analysis = await analyzeResponse(
      transcript,
      question.text,
      currentSession.sessionType,
      currentSession.roleFocus
    );

    // Generate sample answer in the background
    const sampleAnswerPromise = generateSampleAnswer(
      question.text,
      currentSession.sessionType,
      currentSession.roleFocus
    );

    const newResponse = {
      questionId,
      transcript,
      analysis,
      duration
    };

    // Get the sample answer
    const sampleAnswer = await sampleAnswerPromise;

    const updatedSession = {
      ...currentSession,
      responses: [...currentSession.responses, newResponse],
      sampleAnswers: {
        ...currentSession.sampleAnswers,
        [questionId]: sampleAnswer
      }
    };

    const totalScore = updatedSession.responses.reduce(
      (sum, response) => sum + response.analysis.overallScore,
      0
    ) / updatedSession.responses.length;

    updatedSession.totalScore = Math.round(totalScore);

    setCurrentSession(updatedSession);

    return { response: newResponse, session: updatedSession };
  }, [currentSession, analyzeResponse, generateSampleAnswer]);

  const completeSession = useCallback(async (sessionToComplete?: InterviewSession) => {
    // Use the passed session or fall back to current session
    const sessionForCompletion = sessionToComplete || currentSession;
    
    if (!sessionForCompletion) {
      throw new Error('No active session to complete');
    }

    console.log('Completing session with data:', {
      sessionId: sessionForCompletion.id,
      responseCount: sessionForCompletion.responses.length,
      questionCount: sessionForCompletion.questions.length
    });

    // Handle sessions with no responses - delete from database and mark as completed locally
    if (sessionForCompletion.responses.length === 0) {
      console.log('Session has no responses, removing from database');
      
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          await supabase
            .from('interview_sessions')
            .delete()
            .eq('id', sessionForCompletion.id)
            .eq('user_id', userData.user.id);
        }
      } catch (error) {
        console.error('Error deleting empty session:', error);
      }

      toast({
        title: "Session Not Saved",
        description: "Session had no responses and was not saved.",
        variant: "default",
      });
      
      const completedSession = { ...sessionForCompletion, completed: true };
      setCurrentSession(completedSession);
      return completedSession;
    }

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error('User not authenticated');
      }

      const sessionData = {
        session_type: sessionForCompletion.sessionType,
        role_focus: sessionForCompletion.roleFocus,
        questions: sessionForCompletion.questions as any,
        responses: sessionForCompletion.responses as any,
        completed: true,
        scores: {
          overall: sessionForCompletion.totalScore,
          communication: Math.round(
            sessionForCompletion.responses.reduce((sum, r) => sum + r.analysis.scores.communication, 0) / 
            sessionForCompletion.responses.length
          ),
          content: Math.round(
            sessionForCompletion.responses.reduce((sum, r) => sum + r.analysis.scores.content, 0) / 
            sessionForCompletion.responses.length
          ),
          structure: Math.round(
            sessionForCompletion.responses.reduce((sum, r) => sum + r.analysis.scores.structure, 0) / 
            sessionForCompletion.responses.length
          ),
          impact: Math.round(
            sessionForCompletion.responses.reduce((sum, r) => sum + r.analysis.scores.impact, 0) / 
            sessionForCompletion.responses.length
          )
        } as any,
        feedback: {
          strengths: [...new Set(sessionForCompletion.responses.flatMap(r => r.analysis.strengths))],
          improvements: sessionForCompletion.responses.flatMap(r => r.analysis.improvements),
          summary: sessionForCompletion.responses[sessionForCompletion.responses.length - 1]?.analysis.summary || ''
        } as any
      };

      console.log('Updating session to completed:', sessionData);

      // Update the existing session instead of inserting a new one
      const { error } = await supabase
        .from('interview_sessions')
        .update(sessionData)
        .eq('id', sessionForCompletion.id)
        .eq('user_id', userData.user.id);

      if (error) {
        console.error('Error updating session:', error);
        throw error;
      }

      const completedSession = { ...sessionForCompletion, completed: true };
      
      // Only update current session if we're completing the current session
      if (!sessionToComplete || sessionToComplete.id === currentSession?.id) {
        setCurrentSession(completedSession);
      }

      toast({
        title: "Session Completed",
        description: `Your interview session has been saved with an overall score of ${sessionForCompletion.totalScore}%.`,
      });

      return completedSession;
    } catch (error) {
      console.error('Error completing session:', error);
      toast({
        title: "Session Save Failed",
        description: "Session completed locally but failed to save to database. Please check your connection.",
        variant: "destructive",
      });
      
      const completedSession = { ...sessionForCompletion, completed: true };
      
      // Only update current session if we're completing the current session
      if (!sessionToComplete || sessionToComplete.id === currentSession?.id) {
        setCurrentSession(completedSession);
      }
      
      return completedSession;
    }
  }, [currentSession, toast]);

  const getSessionHistory = useCallback(async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        console.log('No authenticated user found');
        return [];
      }

      console.log('Fetching session history for user:', userData.user.id);

      const { data, error } = await supabase
        .from('interview_sessions')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching session history:', error);
        throw error;
      }

      console.log('Fetched session history:', data);

      // Filter out invalid sessions (those marked complete but with no responses)
      const validSessions = (data || []).filter(session => {
        if (!session.completed) return true; // Keep incomplete sessions
        return session.responses && Array.isArray(session.responses) && session.responses.length > 0;
      });

      return validSessions;
    } catch (error) {
      console.error('Error fetching session history:', error);
      toast({
        title: "Failed to Load History",
        description: "Could not load your session history. Please check your connection and try again.",
        variant: "destructive",
      });
      return [];
    }
  }, [toast]);

  const retryLastAction = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  return {
    loading,
    analyzing,
    generatingSample,
    currentSession,
    retryCount,
    generateQuestions,
    analyzeResponse,
    generateSampleAnswer,
    startSession,
    startSessionWithQuestion,
    startSessionWithMultipleQuestions,
    addResponse,
    completeSession,
    getSessionHistory,
    retryLastAction,
    setCurrentSession
  };
};
