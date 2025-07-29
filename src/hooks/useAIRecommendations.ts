import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AIRecommendationService } from '@/services/aiRecommendationService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAIRecommendations = (userId?: string) => {
  const queryClient = useQueryClient();
  const [isGenerating, setIsGenerating] = useState(false);

  // Get AI Recommendations
  const {
    data: aiRecommendations,
    isLoading: recommendationsLoading,
    error: recommendationsError
  } = useQuery({
    queryKey: ['ai-recommendations', userId],
    queryFn: () => userId ? AIRecommendationService.getAIRecommendations(userId) : Promise.resolve([]),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get Learning Path Recommendations
  const {
    data: learningPaths,
    isLoading: learningPathsLoading
  } = useQuery({
    queryKey: ['learning-path-recommendations', userId],
    queryFn: () => userId ? AIRecommendationService.getLearningPathRecommendations(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Get Skills Gap Analysis
  const {
    data: skillsGapAnalysis,
    isLoading: skillsGapLoading
  } = useQuery({
    queryKey: ['skills-gap-analysis', userId],
    queryFn: () => userId ? AIRecommendationService.getSkillsGapAnalysis(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Get Career Transition Recommendations
  const {
    data: careerTransitions,
    isLoading: careerTransitionsLoading
  } = useQuery({
    queryKey: ['career-transition-recommendations', userId],
    queryFn: () => userId ? AIRecommendationService.getCareerTransitionRecommendations(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Get Mentor Match Recommendations
  const {
    data: mentorMatches,
    isLoading: mentorMatchesLoading
  } = useQuery({
    queryKey: ['mentor-match-recommendations', userId],
    queryFn: () => userId ? AIRecommendationService.getMentorMatchRecommendations(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Get Content Recommendations
  const {
    data: contentRecommendations,
    isLoading: contentLoading
  } = useQuery({
    queryKey: ['content-recommendations', userId],
    queryFn: () => userId ? AIRecommendationService.getContentRecommendations(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Get User Preferences
  const {
    data: userPreferences,
    isLoading: preferencesLoading
  } = useQuery({
    queryKey: ['recommendation-preferences', userId],
    queryFn: () => userId ? AIRecommendationService.getUserPreferences(userId) : Promise.resolve(null),
    enabled: !!userId,
  });

  // Get Recommendation Analytics
  const {
    data: analytics,
    isLoading: analyticsLoading
  } = useQuery({
    queryKey: ['recommendation-analytics', userId],
    queryFn: () => userId ? AIRecommendationService.getRecommendationAnalytics(userId) : Promise.resolve(null),
    enabled: !!userId,
  });

  // Get Personal Branding Recommendations
  const {
    data: personalBrandingRecommendations,
    isLoading: personalBrandingLoading
  } = useQuery({
    queryKey: ['personal-branding-recommendations', userId],
    queryFn: () => userId ? AIRecommendationService.getPersonalBrandingRecommendations(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Generate AI Recommendation Mutation
  const generateRecommendationMutation = useMutation({
    mutationFn: ({ 
      type, 
      context 
    }: { 
      type: 'learning_path' | 'skill_gap' | 'career_transition' | 'mentor_match' | 'content' | 'personal_branding';
      context: any;
    }) => {
      if (!userId) throw new Error('User ID required');
      setIsGenerating(true);
      return AIRecommendationService.generateRecommendation(userId, type, context);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
      queryClient.invalidateQueries({ queryKey: ['recommendation-analytics', userId] });
      toast.success('AI recommendation generated successfully!');
      setIsGenerating(false);
    },
    onError: (error) => {
      toast.error('Failed to generate recommendation: ' + error.message);
      setIsGenerating(false);
    },
  });

  // Dismiss Recommendation Mutation
  const dismissRecommendationMutation = useMutation({
    mutationFn: (recommendationId: string) => 
      AIRecommendationService.dismissRecommendation(recommendationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
      queryClient.invalidateQueries({ queryKey: ['recommendation-analytics', userId] });
      toast.success('Recommendation dismissed');
    },
    onError: (error) => {
      toast.error('Failed to dismiss recommendation: ' + error.message);
    },
  });

  // Implement Recommendation Mutation
  const implementRecommendationMutation = useMutation({
    mutationFn: (recommendationId: string) => 
      AIRecommendationService.implementRecommendation(recommendationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
      queryClient.invalidateQueries({ queryKey: ['recommendation-analytics', userId] });
      toast.success('Recommendation marked as implemented!');
    },
    onError: (error) => {
      toast.error('Failed to implement recommendation: ' + error.message);
    },
  });

  // Update Preferences Mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: (preferences: any) => {
      if (!userId) throw new Error('User ID required');
      return AIRecommendationService.updateUserPreferences(userId, preferences);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendation-preferences', userId] });
      toast.success('Preferences updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update preferences: ' + error.message);
    },
  });

  // Submit Feedback Mutation
  const submitFeedbackMutation = useMutation({
    mutationFn: ({ recommendationId, feedback }: { recommendationId: string; feedback: any }) => {
      if (!userId) throw new Error('User ID required');
      return AIRecommendationService.submitFeedback(userId, recommendationId, feedback);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendation-analytics', userId] });
      toast.success('Feedback submitted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to submit feedback: ' + error.message);
    },
  });

  // Convenience methods for generating specific types of recommendations
  const generateSkillsGapAnalysis = useCallback(async (targetRole: string, targetIndustry: string) => {
    if (!userId) return;
    try {
      setIsGenerating(true);
      await AIRecommendationService.generateSkillsGapAnalysis(userId, targetRole, targetIndustry);
      queryClient.invalidateQueries({ queryKey: ['skills-gap-analysis', userId] });
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
      toast.success('Skills gap analysis generated!');
    } catch (error: any) {
      toast.error('Failed to generate skills gap analysis: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  }, [userId, queryClient]);

  const generateLearningPath = useCallback(async (
    targetSkill: string, 
    currentLevel: number, 
    targetLevel: number,
    timeCommitment: 'minimal' | 'moderate' | 'intensive' = 'moderate'
  ) => {
    if (!userId) return;
    try {
      setIsGenerating(true);
      await AIRecommendationService.generateLearningPath(userId, targetSkill, currentLevel, targetLevel, timeCommitment);
      queryClient.invalidateQueries({ queryKey: ['learning-path-recommendations', userId] });
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
      toast.success('Learning path generated!');
    } catch (error: any) {
      toast.error('Failed to generate learning path: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  }, [userId, queryClient]);

  const generateCareerTransition = useCallback(async (
    fromRole: string,
    toRole: string,
    fromIndustry?: string,
    toIndustry?: string
  ) => {
    if (!userId) return;
    try {
      setIsGenerating(true);
      await AIRecommendationService.generateCareerTransitionStrategy(userId, fromRole, toRole, fromIndustry, toIndustry);
      queryClient.invalidateQueries({ queryKey: ['career-transition-recommendations', userId] });
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
      toast.success('Career transition strategy generated!');
    } catch (error: any) {
      toast.error('Failed to generate career transition strategy: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  }, [userId, queryClient]);

  const generateContentRecommendations = useCallback(async (
    learningGoals: string[],
    timeCommitment: 'minimal' | 'moderate' | 'intensive' = 'moderate'
  ) => {
    if (!userId) return;
    try {
      setIsGenerating(true);
      await AIRecommendationService.generateContentRecommendations(userId, learningGoals, timeCommitment);
      queryClient.invalidateQueries({ queryKey: ['content-recommendations', userId] });
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
      toast.success('Content recommendations generated!');
    } catch (error: any) {
      toast.error('Failed to generate content recommendations: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  }, [userId, queryClient]);

  const generatePersonalBrandingStrategies = useCallback(async (brandingData: {
    fullName: string;
    currentRole: string;
    targetRole: string;
    industry: string;
    keySkills: string[];
    achievements: string[];
    uniqueValue: string;
    personalStory: string;
    targetAudience: string;
    communicationStyle?: string;
    experienceLevel?: string;
  }) => {
    if (!userId) return;
    try {
      setIsGenerating(true);
      await AIRecommendationService.generatePersonalBrandingStrategies(userId, brandingData);
      queryClient.invalidateQueries({ queryKey: ['personal-branding-recommendations', userId] });
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
      toast.success('Personal branding strategies generated!');
    } catch (error: any) {
      toast.error('Failed to generate personal branding strategies: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  }, [userId, queryClient]);

  // Real-time subscriptions
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`ai-recommendations-${userId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'ai_recommendations', filter: `user_id=eq.${userId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['ai-recommendations', userId] });
          queryClient.invalidateQueries({ queryKey: ['recommendation-analytics', userId] });
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'recommendation_feedback', filter: `user_id=eq.${userId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['recommendation-analytics', userId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  return {
    // Data
    aiRecommendations,
    learningPaths,
    skillsGapAnalysis,
    careerTransitions,
    mentorMatches,
    contentRecommendations,
    personalBrandingRecommendations,
    userPreferences,
    analytics,

    // Loading states
    isLoading: recommendationsLoading || learningPathsLoading || skillsGapLoading || 
               careerTransitionsLoading || mentorMatchesLoading || contentLoading ||
               personalBrandingLoading || preferencesLoading || analyticsLoading,
    isGenerating,

    // Individual loading states
    recommendationsLoading,
    learningPathsLoading,
    skillsGapLoading,
    careerTransitionsLoading,
    mentorMatchesLoading,
    contentLoading,
    personalBrandingLoading,
    preferencesLoading,
    analyticsLoading,

    // Errors
    hasError: !!recommendationsError,

    // Actions
    generateRecommendation: generateRecommendationMutation.mutate,
    dismissRecommendation: dismissRecommendationMutation.mutate,
    implementRecommendation: implementRecommendationMutation.mutate,
    updatePreferences: updatePreferencesMutation.mutate,
    submitFeedback: submitFeedbackMutation.mutate,

    // Convenience methods
    generateSkillsGapAnalysis,
    generateLearningPath,
    generateCareerTransition,
    generateContentRecommendations,
    generatePersonalBrandingStrategies,

    // Mutation states
    isGeneratingRecommendation: generateRecommendationMutation.isPending,
    isDismissing: dismissRecommendationMutation.isPending,
    isImplementing: implementRecommendationMutation.isPending,
    isUpdatingPreferences: updatePreferencesMutation.isPending,
    isSubmittingFeedback: submitFeedbackMutation.isPending,
  };
};

export type UseAIRecommendationsReturn = ReturnType<typeof useAIRecommendations>;