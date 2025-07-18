
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
}

export const useAIInterview = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const generateQuestions = useCallback(async (
    sessionType: string = 'behavioral',
    roleFocus: string = 'General Business',
    difficulty: string = 'medium',
    previousQuestions: string[] = []
  ) => {
    setLoading(true);
    setRetryCount(0);
    
    try {
      console.log('Generating questions...', { sessionType, roleFocus, difficulty });
      
      const { data, error } = await supabase.functions.invoke('question-generator', {
        body: { sessionType, roleFocus, difficulty, previousQuestions }
      });

      if (error) {
        console.error('Question generation error:', error);
        throw error;
      }

      console.log('Generated questions data:', data);
      
      // Check if we got fallback questions (offline mode)
      if (data?.sessionInfo?.focus?.includes('offline mode')) {
        toast({
          title: "Using Offline Questions",
          description: "AI service temporarily unavailable. Using curated question bank.",
          variant: "default",
        });
      }
      
      return data;
    } catch (error) {
      console.error('Error generating questions:', error);
      
      // Provide user-friendly error messages
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
      
      // Return fallback analysis with basic feedback
      return {
        overallScore: 75, // Neutral score when analysis fails
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

  const startSession = useCallback(async (
    sessionType: string,
    roleFocus: string,
    difficulty: string = 'medium'
  ) => {
    try {
      const questionsData = await generateQuestions(sessionType, roleFocus, difficulty);
      
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
      };

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
  }, [generateQuestions, toast]);

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

    const newResponse = {
      questionId,
      transcript,
      analysis,
      duration
    };

    const updatedSession = {
      ...currentSession,
      responses: [...currentSession.responses, newResponse]
    };

    // Calculate total score
    const totalScore = updatedSession.responses.reduce(
      (sum, response) => sum + response.analysis.overallScore,
      0
    ) / updatedSession.responses.length;

    updatedSession.totalScore = Math.round(totalScore);

    setCurrentSession(updatedSession);

    return { response: newResponse, session: updatedSession };
  }, [currentSession, analyzeResponse]);

  const completeSession = useCallback(async () => {
    if (!currentSession) {
      throw new Error('No active session to complete');
    }

    try {
      // Save session to database
      const { data: userData } = await supabase.auth.getUser();
      const sessionData = {
        user_id: userData.user?.id || '',
        session_type: currentSession.sessionType,
        role_focus: currentSession.roleFocus,
        questions: currentSession.questions,
        responses: currentSession.responses,
        completed: true,
        scores: {
          overall: currentSession.totalScore,
          communication: Math.round(
            currentSession.responses.reduce((sum, r) => sum + r.analysis.scores.communication, 0) / 
            currentSession.responses.length
          ),
          content: Math.round(
            currentSession.responses.reduce((sum, r) => sum + r.analysis.scores.content, 0) / 
            currentSession.responses.length
          ),
          structure: Math.round(
            currentSession.responses.reduce((sum, r) => sum + r.analysis.scores.structure, 0) / 
            currentSession.responses.length
          ),
          impact: Math.round(
            currentSession.responses.reduce((sum, r) => sum + r.analysis.scores.impact, 0) / 
            currentSession.responses.length
          )
        },
        feedback: {
          strengths: [...new Set(currentSession.responses.flatMap(r => r.analysis.strengths))],
          improvements: currentSession.responses.flatMap(r => r.analysis.improvements),
          summary: currentSession.responses[currentSession.responses.length - 1]?.analysis.summary || ''
        }
      } as any;

      const { error } = await supabase.from('interview_sessions').insert(sessionData);

      if (error) {
        console.error('Error saving session:', error);
        throw error;
      }

      const completedSession = { ...currentSession, completed: true };
      setCurrentSession(completedSession);

      toast({
        title: "Session Completed",
        description: `Your interview session has been saved with an overall score of ${currentSession.totalScore}%.`,
      });

      return completedSession;
    } catch (error) {
      console.error('Error completing session:', error);
      // Don't throw error - allow session to complete locally even if save fails
      toast({
        title: "Session Complete",
        description: "Session completed locally. Database save may have failed.",
        variant: "destructive",
      });
      
      const completedSession = { ...currentSession, completed: true };
      setCurrentSession(completedSession);
      return completedSession;
    }
  }, [currentSession, toast]);

  const getSessionHistory = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('interview_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching session history:', error);
      return [];
    }
  }, []);

  const retryLastAction = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  return {
    loading,
    analyzing,
    currentSession,
    retryCount,
    generateQuestions,
    analyzeResponse,
    startSession,
    addResponse,
    completeSession,
    getSessionHistory,
    retryLastAction,
    setCurrentSession
  };
};
