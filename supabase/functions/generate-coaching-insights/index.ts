import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { userId, achievementId } = await req.json();

    if (!userId) {
      throw new Error('User ID is required');
    }

    // Fetch user's achievements
    const { data: achievements } = await supabaseClient
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false });

    // Fetch user's enrollments
    const { data: enrollments } = await supabaseClient
      .from('user_coaching_enrollments')
      .select('*, coaching_programs(*)')
      .eq('user_id', userId);

    // Fetch user's module progress
    const { data: moduleProgress } = await supabaseClient
      .from('user_module_progress')
      .select('*')
      .eq('user_id', userId);

    // Generate insights based on user activity
    const insights = generateInsights(achievements, enrollments, moduleProgress);

    // Insert insights into database
    for (const insight of insights) {
      await supabaseClient
        .from('personalized_insights')
        .insert({
          user_id: userId,
          ...insight
        });
    }

    return new Response(
      JSON.stringify({ success: true, insightsGenerated: insights.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

function generateInsights(achievements: any[], enrollments: any[], moduleProgress: any[]) {
  const insights = [];
  
  // Insight 1: Module completion streak
  const completedModules = achievements?.filter(a => a.achievement_type === 'module_completion') || [];
  if (completedModules.length >= 3) {
    insights.push({
      title: 'Outstanding Learning Momentum! 🚀',
      content: `You've completed ${completedModules.length} modules! You're demonstrating exceptional commitment to your professional development. Your consistent progress shows strong dedication to advancing your career.`,
      category: 'Strengths',
      insight_type: 'achievement_milestone',
      priority: 'high',
      metadata: {
        modules_completed: completedModules.length,
        recommended_actions: [
          'Continue your current learning pace',
          'Consider enrolling in an advanced program',
          'Share your learnings with peers or on LinkedIn'
        ],
        impact_score: 9
      },
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  // Insight 2: Diverse program enrollment
  if (enrollments && enrollments.length >= 2) {
    const categories = [...new Set(enrollments.map(e => e.coaching_programs?.category))];
    insights.push({
      title: 'Versatile Skill Development 🎯',
      content: `You're enrolled in ${enrollments.length} programs across ${categories.length} different areas. This diverse approach is excellent for building a well-rounded professional profile and makes you more adaptable in the job market.`,
      category: 'Growth Areas',
      insight_type: 'skill_diversity',
      priority: 'medium',
      metadata: {
        programs_enrolled: enrollments.length,
        categories: categories,
        recommended_actions: [
          'Focus on completing one program at a time',
          'Create a learning schedule to balance all programs',
          'Update your resume to reflect new skills'
        ],
        impact_score: 8
      },
      expires_at: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  // Insight 3: Technical skills focus (if enrolled in technical programs)
  const technicalPrograms = enrollments?.filter(e => 
    e.coaching_programs?.category === 'technical' || 
    e.coaching_programs?.title?.toLowerCase().includes('cybersecurity')
  ) || [];
  
  if (technicalPrograms.length > 0) {
    insights.push({
      title: 'High-Value Technical Expertise 💻',
      content: 'Cybersecurity skills are among the most in-demand in the current job market. By mastering these frameworks and practices, you\'re positioning yourself for roles with average salary increases of 20-30% compared to general IT positions.',
      category: 'Opportunities',
      insight_type: 'market_trend',
      priority: 'high',
      metadata: {
        recommended_actions: [
          'Pursue industry certifications (CISSP, CEH, Security+)',
          'Build a portfolio of security projects',
          'Network with cybersecurity professionals on LinkedIn',
          'Consider specializing in cloud security or incident response'
        ],
        impact_score: 10
      },
      expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  // Insight 4: Learning velocity
  const recentAchievements = achievements?.filter(a => {
    const unlockDate = new Date(a.unlocked_at);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return unlockDate > weekAgo;
  }) || [];

  if (recentAchievements.length >= 2) {
    insights.push({
      title: 'Exceptional Learning Velocity ⚡',
      content: `You've earned ${recentAchievements.length} achievements in the past week! This rapid progress demonstrates strong time management and dedication. Maintaining this pace will accelerate your career advancement significantly.`,
      category: 'Strengths',
      insight_type: 'progress_pattern',
      priority: 'medium',
      metadata: {
        weekly_achievements: recentAchievements.length,
        recommended_actions: [
          'Schedule regular breaks to avoid burnout',
          'Document key learnings in a personal knowledge base',
          'Apply new skills to real projects or case studies'
        ],
        impact_score: 8
      },
      expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  // Insight 5: Career development focus
  const careerDevPrograms = enrollments?.filter(e => 
    e.coaching_programs?.category === 'career_development' || 
    e.coaching_programs?.category === 'leadership'
  ) || [];

  if (careerDevPrograms.length > 0) {
    insights.push({
      title: 'Strategic Career Planning 🎓',
      content: 'You\'re investing in leadership and career development skills that differentiate you from purely technical professionals. These "soft skills" are critical for advancing to senior and executive roles.',
      category: 'Goals',
      insight_type: 'career_path',
      priority: 'medium',
      metadata: {
        recommended_actions: [
          'Update LinkedIn with leadership training',
          'Seek mentorship opportunities',
          'Practice skills through volunteer leadership roles',
          'Set specific career milestone goals for the next 12 months'
        ],
        impact_score: 9
      },
      expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  // Insight 6: First module completion
  if (completedModules.length === 1) {
    insights.push({
      title: 'Great Start! First Module Complete 🎉',
      content: 'Congratulations on completing your first module! The hardest part is starting, and you\'ve done it. Research shows that completing the first module increases the likelihood of program completion by 80%.',
      category: 'Achievement',
      insight_type: 'milestone',
      priority: 'high',
      metadata: {
        recommended_actions: [
          'Set a goal to complete the next module within 7 days',
          'Reflect on what you learned and how to apply it',
          'Share your progress to increase accountability'
        ],
        impact_score: 7
      },
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return insights;
}
