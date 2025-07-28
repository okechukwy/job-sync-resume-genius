import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type CoachingProgram = Database['public']['Tables']['coaching_programs']['Row'];
type UserEnrollment = Database['public']['Tables']['user_coaching_enrollments']['Row'];
type LearningModule = Database['public']['Tables']['learning_modules']['Row'];
type ModuleProgress = Database['public']['Tables']['user_module_progress']['Row'];
type CareerGoal = Database['public']['Tables']['career_goals']['Row'];
type SkillsAssessment = Database['public']['Tables']['skills_assessments']['Row'];
type CoachingSession = Database['public']['Tables']['coaching_sessions']['Row'];
type PersonalizedInsight = Database['public']['Tables']['personalized_insights']['Row'];
type ActionItem = Database['public']['Tables']['action_items']['Row'];
type CareerCertification = Database['public']['Tables']['career_certifications']['Row'];
type LearningResource = Database['public']['Tables']['learning_resources']['Row'];

export class CoachingService {
  // Coaching Programs
  static async getCoachingPrograms() {
    const { data, error } = await supabase
      .from('coaching_programs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as CoachingProgram[];
  }

  static async getUserEnrollments(userId: string) {
    const { data, error } = await supabase
      .from('user_coaching_enrollments')
      .select(`
        *,
        coaching_programs (*)
      `)
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async enrollInProgram(userId: string, programId: string) {
    const { data, error } = await supabase
      .from('user_coaching_enrollments')
      .insert({
        user_id: userId,
        program_id: programId,
        status: 'active',
        progress_percentage: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Learning Modules
  static async getLearningModules(programId: string) {
    const { data, error } = await supabase
      .from('learning_modules')
      .select('*')
      .eq('program_id', programId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data as LearningModule[];
  }

  static async getUserModuleProgress(userId: string, enrollmentId?: string) {
    let query = supabase
      .from('user_module_progress')
      .select(`
        *,
        learning_modules (*)
      `)
      .eq('user_id', userId);

    if (enrollmentId) {
      query = query.eq('enrollment_id', enrollmentId);
    }

    const { data, error } = await query.order('last_accessed_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async updateModuleProgress(
    userId: string,
    moduleId: string,
    enrollmentId: string,
    progressData: Partial<ModuleProgress>
  ) {
    const { data, error } = await supabase
      .from('user_module_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        enrollment_id: enrollmentId,
        ...progressData,
        last_accessed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Career Goals
  static async getCareerGoals(userId: string) {
    const { data, error } = await supabase
      .from('career_goals')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as CareerGoal[];
  }

  static async createCareerGoal(userId: string, goalData: {
    title: string;
    category: string;
    description?: string;
    target_date?: string;
    priority?: string;
  }) {
    const { data, error } = await supabase
      .from('career_goals')
      .insert({
        user_id: userId,
        ...goalData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateCareerGoal(goalId: string, updates: Partial<CareerGoal>) {
    const { data, error } = await supabase
      .from('career_goals')
      .update(updates)
      .eq('id', goalId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Skills Assessments
  static async getSkillsAssessments(userId: string) {
    const { data, error } = await supabase
      .from('skills_assessments')
      .select('*')
      .eq('user_id', userId)
      .order('assessment_date', { ascending: false });

    if (error) throw error;
    return data as SkillsAssessment[];
  }

  static async createSkillsAssessment(userId: string, assessmentData: {
    skill_name: string;
    category: string;
    current_level: number;
    target_level: number;
    improvement_recommendations?: string[];
    learning_resources?: string[];
  }) {
    const { data, error } = await supabase
      .from('skills_assessments')
      .insert({
        user_id: userId,
        ...assessmentData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Coaching Sessions
  static async getCoachingSessions(userId: string) {
    const { data, error } = await supabase
      .from('coaching_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('scheduled_at', { ascending: false });

    if (error) throw error;
    return data as CoachingSession[];
  }

  static async scheduleCoachingSession(userId: string, sessionData: {
    session_type: string;
    title: string;
    scheduled_at: string;
    description?: string;
    duration_minutes?: number;
  }) {
    const { data, error } = await supabase
      .from('coaching_sessions')
      .insert({
        user_id: userId,
        ...sessionData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Personalized Insights
  static async getPersonalizedInsights(userId: string) {
    const { data, error } = await supabase
      .from('personalized_insights')
      .select('*')
      .eq('user_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as PersonalizedInsight[];
  }

  static async markInsightAsRead(insightId: string) {
    const { data, error } = await supabase
      .from('personalized_insights')
      .update({ is_read: true })
      .eq('id', insightId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Action Items
  static async getActionItems(userId: string) {
    const { data, error } = await supabase
      .from('action_items')
      .select('*')
      .eq('user_id', userId)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data as ActionItem[];
  }

  static async createActionItem(userId: string, actionData: {
    title: string;
    category: string;
    description?: string;
    priority?: string;
    due_date?: string;
    estimated_time_minutes?: number;
    related_goal_id?: string;
  }) {
    const { data, error } = await supabase
      .from('action_items')
      .insert({
        user_id: userId,
        ...actionData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateActionItem(actionId: string, updates: Partial<ActionItem>) {
    const { data, error } = await supabase
      .from('action_items')
      .update(updates)
      .eq('id', actionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async completeActionItem(actionId: string, completionNotes?: string) {
    const { data, error } = await supabase
      .from('action_items')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        completion_notes: completionNotes
      })
      .eq('id', actionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Certifications
  static async getCertifications(userId: string) {
    const { data, error } = await supabase
      .from('career_certifications')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;
    return data as CareerCertification[];
  }

  // Learning Resources
  static async getLearningResources(skillAreas?: string[]) {
    let query = supabase
      .from('learning_resources')
      .select('*');

    if (skillAreas && skillAreas.length > 0) {
      query = query.overlaps('skill_areas', skillAreas);
    }

    const { data, error } = await query
      .order('is_recommended', { ascending: false })
      .order('rating', { ascending: false });

    if (error) throw error;
    return data as LearningResource[];
  }

  // Analytics and Progress
  static async calculateOverallProgress(userId: string) {
    // Get all user enrollments
    const enrollments = await this.getUserEnrollments(userId);
    
    if (!enrollments || enrollments.length === 0) {
      return { overallProgress: 0, completedPrograms: 0, totalPrograms: 0 };
    }

    const totalPrograms = enrollments.length;
    const completedPrograms = enrollments.filter(e => e.status === 'completed').length;
    const totalProgress = enrollments.reduce((sum, e) => sum + (e.progress_percentage || 0), 0);
    const overallProgress = totalProgress / totalPrograms;

    return {
      overallProgress: Math.round(overallProgress),
      completedPrograms,
      totalPrograms
    };
  }

  static async getCareerStageAnalytics(userId: string) {
    const goals = await this.getCareerGoals(userId);
    const assessments = await this.getSkillsAssessments(userId);
    const certifications = await this.getCertifications(userId);
    
    const skillGaps = assessments.filter(a => a.current_level < a.target_level);
    const recentAssessments = assessments.filter(a => {
      const assessmentDate = new Date(a.assessment_date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return assessmentDate > thirtyDaysAgo;
    });

    return {
      totalGoals: goals.length,
      activeGoals: goals.filter(g => g.status === 'active').length,
      skillGapsCount: skillGaps.length,
      recentAssessmentsCount: recentAssessments.length,
      certificationsCount: certifications.length
    };
  }
}