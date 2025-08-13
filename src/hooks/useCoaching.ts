import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CoachingService } from '@/services/coachingService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useCoaching = (userId?: string) => {
  const queryClient = useQueryClient();

  // Coaching Programs
  const {
    data: coachingPrograms,
    isLoading: programsLoading,
    error: programsError
  } = useQuery({
    queryKey: ['coaching-programs'],
    queryFn: CoachingService.getCoachingPrograms,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // User Enrollments
  const {
    data: userEnrollments,
    isLoading: enrollmentsLoading,
    error: enrollmentsError
  } = useQuery({
    queryKey: ['user-enrollments', userId],
    queryFn: () => userId ? CoachingService.getUserEnrollments(userId) : Promise.resolve([]),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Career Goals
  const {
    data: careerGoals,
    isLoading: goalsLoading,
    error: goalsError
  } = useQuery({
    queryKey: ['career-goals', userId],
    queryFn: () => userId ? CoachingService.getCareerGoals(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Skills Assessments
  const {
    data: skillsAssessments,
    isLoading: assessmentsLoading,
    error: assessmentsError
  } = useQuery({
    queryKey: ['skills-assessments', userId],
    queryFn: () => userId ? CoachingService.getSkillsAssessments(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Coaching Sessions
  const {
    data: coachingSessions,
    isLoading: sessionsLoading,
    error: sessionsError
  } = useQuery({
    queryKey: ['coaching-sessions', userId],
    queryFn: () => userId ? CoachingService.getCoachingSessions(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Personalized Insights
  const {
    data: personalizedInsights,
    isLoading: insightsLoading,
    error: insightsError
  } = useQuery({
    queryKey: ['personalized-insights', userId],
    queryFn: () => userId ? CoachingService.getPersonalizedInsights(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Action Items
  const {
    data: actionItems,
    isLoading: actionsLoading,
    error: actionsError
  } = useQuery({
    queryKey: ['action-items', userId],
    queryFn: () => userId ? CoachingService.getActionItems(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Certifications
  const {
    data: certifications,
    isLoading: certificationsLoading,
    error: certificationsError
  } = useQuery({
    queryKey: ['certifications', userId],
    queryFn: () => userId ? CoachingService.getCertifications(userId) : Promise.resolve([]),
    enabled: !!userId,
  });

  // Learning Resources
  const {
    data: learningResources,
    isLoading: resourcesLoading,
    error: resourcesError
  } = useQuery({
    queryKey: ['learning-resources'],
    queryFn: () => CoachingService.getLearningResources(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  // Progress Analytics
  const {
    data: overallProgress,
    isLoading: progressLoading
  } = useQuery({
    queryKey: ['overall-progress', userId],
    queryFn: () => userId ? CoachingService.calculateOverallProgress(userId) : Promise.resolve({ overallProgress: 0, completedPrograms: 0, totalPrograms: 0 }),
    enabled: !!userId,
  });

  const {
    data: careerStageAnalytics,
    isLoading: analyticsLoading
  } = useQuery({
    queryKey: ['career-stage-analytics', userId],
    queryFn: () => userId ? CoachingService.getCareerStageAnalytics(userId) : Promise.resolve({
      totalGoals: 0,
      activeGoals: 0,
      skillGapsCount: 0,
      recentAssessmentsCount: 0,
      certificationsCount: 0
    }),
    enabled: !!userId,
  });

  // Mutations
  const enrollInProgramMutation = useMutation({
    mutationFn: ({ programId }: { programId: string }) => 
      userId ? CoachingService.enrollInProgram(userId, programId) : Promise.reject('No user ID'),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['user-enrollments', userId] });
      queryClient.invalidateQueries({ queryKey: ['overall-progress', userId] });
      
      if (data.isExisting) {
        toast.info('You are already enrolled in this program!');
      } else if (data.isReactivated) {
        toast.success('Program reactivated! Continue your learning journey.');
      } else {
        toast.success('Successfully enrolled in program!');
      }
    },
    onError: (error) => {
      toast.error('Failed to enroll in program: ' + error.message);
    },
  });

  const createGoalMutation = useMutation({
    mutationFn: (goalData: Parameters<typeof CoachingService.createCareerGoal>[1]) =>
      userId ? CoachingService.createCareerGoal(userId, goalData) : Promise.reject('No user ID'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-goals', userId] });
      queryClient.invalidateQueries({ queryKey: ['career-stage-analytics', userId] });
      toast.success('Career goal created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create goal: ' + error.message);
    },
  });

  const updateGoalMutation = useMutation({
    mutationFn: ({ goalId, updates }: { goalId: string; updates: any }) =>
      CoachingService.updateCareerGoal(goalId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-goals', userId] });
      queryClient.invalidateQueries({ queryKey: ['career-stage-analytics', userId] });
      toast.success('Goal updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update goal: ' + error.message);
    },
  });

  const createActionItemMutation = useMutation({
    mutationFn: (actionData: Parameters<typeof CoachingService.createActionItem>[1]) =>
      userId ? CoachingService.createActionItem(userId, actionData) : Promise.reject('No user ID'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['action-items', userId] });
      toast.success('Action item created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create action item: ' + error.message);
    },
  });

  const completeActionItemMutation = useMutation({
    mutationFn: ({ actionId, notes }: { actionId: string; notes?: string }) =>
      CoachingService.completeActionItem(actionId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['action-items', userId] });
      toast.success('Action item completed!');
    },
    onError: (error) => {
      toast.error('Failed to complete action item: ' + error.message);
    },
  });

  const createSkillsAssessmentMutation = useMutation({
    mutationFn: (assessmentData: Parameters<typeof CoachingService.createSkillsAssessment>[1]) =>
      userId ? CoachingService.createSkillsAssessment(userId, assessmentData) : Promise.reject('No user ID'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills-assessments', userId] });
      queryClient.invalidateQueries({ queryKey: ['career-stage-analytics', userId] });
      toast.success('Skills assessment completed!');
    },
    onError: (error) => {
      toast.error('Failed to create assessment: ' + error.message);
    },
  });

  const markInsightAsReadMutation = useMutation({
    mutationFn: (insightId: string) => CoachingService.markInsightAsRead(insightId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalized-insights', userId] });
    },
  });

  // Real-time subscriptions
  useEffect(() => {
    if (!userId) return;

    const channels = [
      supabase
        .channel(`user-coaching-${userId}`)
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'user_coaching_enrollments', filter: `user_id=eq.${userId}` },
          () => {
            queryClient.invalidateQueries({ queryKey: ['user-enrollments', userId] });
            queryClient.invalidateQueries({ queryKey: ['overall-progress', userId] });
          }
        )
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'career_goals', filter: `user_id=eq.${userId}` },
          () => {
            queryClient.invalidateQueries({ queryKey: ['career-goals', userId] });
            queryClient.invalidateQueries({ queryKey: ['career-stage-analytics', userId] });
          }
        )
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'action_items', filter: `user_id=eq.${userId}` },
          () => {
            queryClient.invalidateQueries({ queryKey: ['action-items', userId] });
          }
        )
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'personalized_insights', filter: `user_id=eq.${userId}` },
          () => {
            queryClient.invalidateQueries({ queryKey: ['personalized-insights', userId] });
          }
        )
        .subscribe()
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, [userId, queryClient]);

  return {
    // Data
    coachingPrograms,
    userEnrollments,
    careerGoals,
    skillsAssessments,
    coachingSessions,
    personalizedInsights,
    actionItems,
    certifications,
    learningResources,
    overallProgress,
    careerStageAnalytics,

    // Loading states
    isLoading: programsLoading || enrollmentsLoading || goalsLoading || 
               assessmentsLoading || sessionsLoading || insightsLoading || 
               actionsLoading || certificationsLoading || resourcesLoading ||
               progressLoading || analyticsLoading,

    // Individual loading states
    programsLoading,
    enrollmentsLoading,
    goalsLoading,
    assessmentsLoading,
    sessionsLoading,
    insightsLoading,
    actionsLoading,
    certificationsLoading,
    resourcesLoading,
    progressLoading,
    analyticsLoading,

    // Errors
    hasError: !!(programsError || enrollmentsError || goalsError || 
                  assessmentsError || sessionsError || insightsError || 
                  actionsError || certificationsError || resourcesError),

    // Actions
    enrollInProgram: enrollInProgramMutation.mutate,
    createGoal: createGoalMutation.mutate,
    updateGoal: updateGoalMutation.mutate,
    createActionItem: createActionItemMutation.mutate,
    completeActionItem: completeActionItemMutation.mutate,
    createSkillsAssessment: createSkillsAssessmentMutation.mutate,
    markInsightAsRead: markInsightAsReadMutation.mutate,

    // Mutation states
    isEnrolling: enrollInProgramMutation.isPending,
    isCreatingGoal: createGoalMutation.isPending,
    isUpdatingGoal: updateGoalMutation.isPending,
    isCreatingAction: createActionItemMutation.isPending,
    isCompletingAction: completeActionItemMutation.isPending,
    isCreatingAssessment: createSkillsAssessmentMutation.isPending,
  };
};

export type UseCoachingReturn = ReturnType<typeof useCoaching>;