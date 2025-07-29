import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type AIRecommendation = Database['public']['Tables']['ai_recommendations']['Row'];
type LearningPathRecommendation = Database['public']['Tables']['learning_path_recommendations']['Row'];
type SkillsGapAnalysis = Database['public']['Tables']['skills_gap_analysis']['Row'];
type CareerTransitionRecommendation = Database['public']['Tables']['career_transition_recommendations']['Row'];
type MentorMatchRecommendation = Database['public']['Tables']['mentor_match_recommendations']['Row'];
type ContentRecommendation = Database['public']['Tables']['content_recommendations']['Row'];
type RecommendationPreferences = Database['public']['Tables']['recommendation_preferences']['Row'];
type RecommendationFeedback = Database['public']['Tables']['recommendation_feedback']['Row'];

export class AIRecommendationService {
  // Generate AI Recommendations
  static async generateRecommendation(
    userId: string,
    recommendationType: 'learning_path' | 'skill_gap' | 'career_transition' | 'mentor_match' | 'content' | 'personal_branding',
    context: {
      currentRole?: string;
      targetRole?: string;
      currentSkills?: Record<string, number>;
      careerGoals?: string[];
      industry?: string;
      experienceLevel?: string;
      preferences?: any;
      targetSkill?: string;
      currentLevel?: number;
      targetLevel?: number;
      timeCommitment?: 'minimal' | 'moderate' | 'intensive';
      targetIndustry?: string;
      transferableSkills?: Record<string, number>;
      keySkills?: string[];
      achievements?: string[];
      uniqueValue?: string;
      personalStory?: string;
      targetAudience?: string;
      communicationStyle?: string;
    }
  ) {
    const { data, error } = await supabase.functions.invoke('ai-recommendations', {
      body: {
        userId,
        recommendationType,
        context
      }
    });

    if (error) throw error;
    return data;
  }

  // Get AI Recommendations
  static async getAIRecommendations(userId: string, type?: string) {
    let query = supabase
      .from('ai_recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('is_dismissed', false)
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('recommendation_type', type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as AIRecommendation[];
  }

  // Get Learning Path Recommendations
  static async getLearningPathRecommendations(userId: string) {
    const { data, error } = await supabase
      .from('learning_path_recommendations')
      .select(`
        *,
        ai_recommendations (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get Skills Gap Analysis
  static async getSkillsGapAnalysis(userId: string) {
    const { data, error } = await supabase
      .from('skills_gap_analysis')
      .select('*')
      .eq('user_id', userId)
      .order('analysis_date', { ascending: false });

    if (error) throw error;
    return data as SkillsGapAnalysis[];
  }

  // Get Career Transition Recommendations
  static async getCareerTransitionRecommendations(userId: string) {
    const { data, error } = await supabase
      .from('career_transition_recommendations')
      .select(`
        *,
        ai_recommendations (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get Mentor Match Recommendations
  static async getMentorMatchRecommendations(userId: string) {
    const { data, error } = await supabase
      .from('mentor_match_recommendations')
      .select(`
        *,
        ai_recommendations (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get Content Recommendations
  static async getContentRecommendations(userId: string) {
    const { data, error } = await supabase
      .from('content_recommendations')
      .select(`
        *,
        ai_recommendations (*)
      `)
      .eq('user_id', userId)
      .order('relevance_score', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Update recommendation status
  static async updateRecommendation(recommendationId: string, updates: Partial<AIRecommendation>) {
    const { data, error } = await supabase
      .from('ai_recommendations')
      .update(updates)
      .eq('id', recommendationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Dismiss recommendation
  static async dismissRecommendation(recommendationId: string) {
    return this.updateRecommendation(recommendationId, { is_dismissed: true });
  }

  // Mark recommendation as implemented
  static async implementRecommendation(recommendationId: string) {
    return this.updateRecommendation(recommendationId, { is_implemented: true });
  }

  // Get/Create User Preferences
  static async getUserPreferences(userId: string) {
    const { data, error } = await supabase
      .from('recommendation_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      // Create default preferences if none exist
      const { data: newPrefs, error: createError } = await supabase
        .from('recommendation_preferences')
        .insert({ user_id: userId })
        .select()
        .single();

      if (createError) throw createError;
      return newPrefs as RecommendationPreferences;
    }

    if (error) throw error;
    return data as RecommendationPreferences;
  }

  // Update User Preferences
  static async updateUserPreferences(userId: string, preferences: Partial<RecommendationPreferences>) {
    const { data, error } = await supabase
      .from('recommendation_preferences')
      .upsert({
        user_id: userId,
        ...preferences
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Submit Recommendation Feedback
  static async submitFeedback(
    userId: string,
    recommendationId: string,
    feedback: {
      feedbackType: 'rating' | 'implementation' | 'outcome' | 'dismissal';
      rating?: number;
      usefulnessScore?: number;
      accuracyScore?: number;
      relevanceScore?: number;
      implementationStatus?: string;
      implementationNotes?: string;
      outcomeAchieved?: boolean;
      outcomeDescription?: string;
      improvementSuggestions?: string;
      wouldRecommend?: boolean;
    }
  ) {
    const { data, error } = await supabase
      .from('recommendation_feedback')
      .insert({
        user_id: userId,
        recommendation_id: recommendationId,
        feedback_type: feedback.feedbackType,
        rating: feedback.rating,
        usefulness_score: feedback.usefulnessScore,
        accuracy_score: feedback.accuracyScore,
        relevance_score: feedback.relevanceScore,
        implementation_status: feedback.implementationStatus,
        implementation_notes: feedback.implementationNotes,
        outcome_achieved: feedback.outcomeAchieved,
        outcome_description: feedback.outcomeDescription,
        improvement_suggestions: feedback.improvementSuggestions,
        would_recommend: feedback.wouldRecommend
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get Recommendation Feedback
  static async getRecommendationFeedback(userId: string, recommendationId?: string) {
    let query = supabase
      .from('recommendation_feedback')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (recommendationId) {
      query = query.eq('recommendation_id', recommendationId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as RecommendationFeedback[];
  }

  // Generate Skills Gap Analysis
  static async generateSkillsGapAnalysis(userId: string, targetRole: string, targetIndustry: string) {
    // Get user's current skills from assessments
    const { data: skillsAssessments } = await supabase
      .from('skills_assessments')
      .select('*')
      .eq('user_id', userId)
      .order('assessment_date', { ascending: false });

    const currentSkills: Record<string, number> = {};
    skillsAssessments?.forEach(assessment => {
      currentSkills[assessment.skill_name] = assessment.current_level;
    });

    return this.generateRecommendation(userId, 'skill_gap', {
      targetRole,
      industry: targetIndustry,
      currentSkills
    });
  }

  // Generate Learning Path
  static async generateLearningPath(
    userId: string, 
    targetSkill: string, 
    currentLevel: number, 
    targetLevel: number,
    timeCommitment: 'minimal' | 'moderate' | 'intensive' = 'moderate'
  ) {
    const context = {
      targetSkill,
      currentLevel,
      targetLevel,
      timeCommitment
    };

    return this.generateRecommendation(userId, 'learning_path', context);
  }

  // Generate Career Transition Strategy
  static async generateCareerTransitionStrategy(
    userId: string,
    fromRole: string,
    toRole: string,
    fromIndustry?: string,
    toIndustry?: string
  ) {
    // Get user's transferable skills
    const { data: skillsAssessments } = await supabase
      .from('skills_assessments')
      .select('*')
      .eq('user_id', userId);

    const transferableSkills = skillsAssessments?.reduce((acc: Record<string, number>, skill) => {
      if (skill.current_level >= 3) { // Consider skills level 3+ as transferable
        acc[skill.skill_name] = skill.current_level;
      }
      return acc;
    }, {});

    return this.generateRecommendation(userId, 'career_transition', {
      currentRole: fromRole,
      targetRole: toRole,
      industry: fromIndustry,
      targetIndustry: toIndustry,
      transferableSkills
    });
  }

  // Generate Content Recommendations
  static async generateContentRecommendations(
    userId: string,
    learningGoals: string[],
    timeCommitment: 'minimal' | 'moderate' | 'intensive' = 'moderate'
  ) {
    const { data: preferences } = await supabase
      .from('recommendation_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    return this.generateRecommendation(userId, 'content', {
      careerGoals: learningGoals,
      timeCommitment,
      preferences
    });
  }

  // Generate Personal Branding Strategies
  static async generatePersonalBrandingStrategies(
    userId: string,
    brandingData: {
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
    }
  ) {
    return this.generateRecommendation(userId, 'personal_branding', {
      currentRole: brandingData.currentRole,
      targetRole: brandingData.targetRole,
      industry: brandingData.industry,
      keySkills: brandingData.keySkills,
      achievements: brandingData.achievements,
      uniqueValue: brandingData.uniqueValue,
      personalStory: brandingData.personalStory,
      targetAudience: brandingData.targetAudience,
      communicationStyle: brandingData.communicationStyle,
      experienceLevel: brandingData.experienceLevel
    });
  }

  // Get Personal Branding Recommendations
  static async getPersonalBrandingRecommendations(userId: string) {
    const { data, error } = await supabase
      .from('ai_recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('recommendation_type', 'personal_branding')
      .eq('is_dismissed', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get Recommendation Analytics
  static async getRecommendationAnalytics(userId: string) {
    const [recommendationsData, feedbackData] = await Promise.all([
      this.getAIRecommendations(userId),
      this.getRecommendationFeedback(userId)
    ]);

    const total = recommendationsData.length;
    const implemented = recommendationsData.filter(r => r.is_implemented).length;
    const dismissed = recommendationsData.filter(r => r.is_dismissed).length;
    const pending = total - implemented - dismissed;

    const avgRating = feedbackData.length > 0 
      ? feedbackData.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbackData.filter(f => f.rating).length
      : 0;

    const avgUsefulness = feedbackData.length > 0
      ? feedbackData.reduce((sum, f) => sum + (f.usefulness_score || 0), 0) / feedbackData.filter(f => f.usefulness_score).length
      : 0;

    return {
      total,
      implemented,
      dismissed,
      pending,
      implementationRate: total > 0 ? (implemented / total) * 100 : 0,
      avgRating,
      avgUsefulness,
      feedbackCount: feedbackData.length
    };
  }
}