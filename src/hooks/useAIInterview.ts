
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

  const generateQuestions = useCallback(async (
    sessionType: string = 'behavioral',
    roleFocus: string = 'General Business',
    difficulty: string = 'medium',
    previousQuestions: string[] = []
  ) => {
    setLoading(true);
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
      return data;
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
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
      toast({
        title: "Analysis Error",
        description: "Failed to analyze your response. Please try again.",
        variant: "destructive",
      });
      
      // Return fallback analysis
      return {
        overallScore: 0,
        scores: { communication: 0, content: 0, structure: 0, impact: 0 },
        strengths: [],
        improvements: [{
          area: "Analysis",
          suggestion: "Please try recording your response again",
          priority: "high"
        }],
        industryFeedback: "Unable to analyze response at this time",
        summary: "Analysis failed - please try again"
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
      
      toast({
        title: "Session Started",
        description: `Generated ${questionsData.questions.length} questions for your ${sessionType} interview.`,
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
      const { error } = await supabase.from('interview_sessions').insert({
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
      });

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
      throw error;
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

  return {
    loading,
    analyzing,
    currentSession,
    generateQuestions,
    analyzeResponse,
    startSession,
    addResponse,
    completeSession,
    getSessionHistory,
    setCurrentSession
  };
};
