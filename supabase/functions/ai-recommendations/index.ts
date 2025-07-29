import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RecommendationRequest {
  userId: string;
  recommendationType: 'learning_path' | 'skill_gap' | 'career_transition' | 'mentor_match' | 'content' | 'personal_branding';
  context: {
    currentRole?: string;
    targetRole?: string;
    currentSkills?: Record<string, number>;
    careerGoals?: string[];
    industry?: string;
    experienceLevel?: string;
    preferences?: any;
    // Personal branding specific context
    fullName?: string;
    keySkills?: string[];
    achievements?: string[];
    uniqueValue?: string;
    personalStory?: string;
    targetAudience?: string;
    communicationStyle?: string;
  };
}

interface AIRecommendation {
  title: string;
  description: string;
  reasoning: string;
  confidence_score: number;
  priority: 'high' | 'medium' | 'low';
  category: string;
  recommended_actions: any[];
  metadata: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { userId, recommendationType, context }: RecommendationRequest = await req.json();

    console.log(`Generating ${recommendationType} recommendation for user ${userId}`);

    // Get recommendation template
    const { data: template, error: templateError } = await supabase
      .from('recommendation_templates')
      .select('*')
      .eq('category', recommendationType === 'skill_gap' ? 'skill_development' : recommendationType)
      .eq('is_active', true)
      .maybeSingle();

    if (templateError) {
      throw new Error(`Template not found: ${templateError.message}`);
    }

    if (!template) {
      throw new Error(`No active template found for category: ${recommendationType}`);
    }

    // Get user data for context
    const [profileData, goalsData, skillsData, preferencesData] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('career_goals').select('*').eq('user_id', userId).eq('status', 'active'),
      supabase.from('skills_assessments').select('*').eq('user_id', userId).order('assessment_date', { ascending: false }).limit(5),
      supabase.from('recommendation_preferences').select('*').eq('user_id', userId).single()
    ]);

    // Build context for AI prompt
    const aiContext = {
      profile: profileData.data,
      goals: goalsData.data || [],
      skills: skillsData.data || [],
      preferences: preferencesData.data,
      ...context
    };

    // Generate AI prompt based on template and context
    const prompt = generatePrompt(template, aiContext, recommendationType);

    console.log('Generated prompt:', prompt);

    // Call OpenAI API
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career coach and advisor. Provide personalized, actionable career recommendations based on the user context. Always format your response as a JSON object with the specified structure.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`OpenAI API error: ${aiResponse.statusText}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;

    console.log('AI Response:', aiContent);

    // Parse AI response
    let recommendation: AIRecommendation;
    try {
      recommendation = JSON.parse(aiContent);
    } catch (parseError) {
      // Fallback: create structured recommendation from text
      recommendation = {
        title: `${recommendationType.replace('_', ' ')} Recommendation`,
        description: aiContent.substring(0, 500),
        reasoning: aiContent,
        confidence_score: 0.8,
        priority: 'medium',
        category: recommendationType,
        recommended_actions: [],
        metadata: { source: 'ai_generated' }
      };
    }

    // Save recommendation to database
    const { data: savedRecommendation, error: saveError } = await supabase
      .from('ai_recommendations')
      .insert({
        user_id: userId,
        recommendation_type: recommendationType,
        title: recommendation.title,
        description: recommendation.description,
        reasoning: recommendation.reasoning,
        confidence_score: recommendation.confidence_score,
        priority: recommendation.priority,
        category: recommendation.category,
        recommended_actions: recommendation.recommended_actions,
        metadata: recommendation.metadata,
        source_data: aiContext,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving recommendation:', saveError);
      throw saveError;
    }

    // Generate specific recommendation details based on type
    await generateSpecificRecommendation(supabase, savedRecommendation.id, recommendationType, recommendation, aiContext);

    console.log('Recommendation generated successfully:', savedRecommendation.id);

    return new Response(JSON.stringify({
      success: true,
      recommendation: savedRecommendation,
      message: 'AI recommendation generated successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI recommendations function:', error);
    return new Response(JSON.stringify({
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generatePrompt(template: any, context: any, type: string): string {
  let prompt = template.prompt_template;

  // Replace template variables with actual data
  const replacements = {
    '{current_role}': context.currentRole || context.profile?.job_title || 'Not specified',
    '{{currentRole}}': context.currentRole || context.profile?.job_title || 'Not specified',
    '{target_role}': context.targetRole || context.goals?.[0]?.title || 'Not specified',
    '{{targetRole}}': context.targetRole || context.goals?.[0]?.title || 'Not specified',
    '{current_skills}': JSON.stringify(context.currentSkills || {}),
    '{{keySkills}}': context.keySkills?.join(', ') || 'Not specified',
    '{career_goals}': context.careerGoals?.join(', ') || context.goals?.map((g: any) => g.title).join(', ') || 'Not specified',
    '{industry}': context.industry || context.profile?.industry || 'Not specified',
    '{{industry}}': context.industry || context.profile?.industry || 'Not specified',
    '{current_industry}': context.industry || 'Not specified',
    '{target_industry}': context.targetIndustry || context.industry || 'Not specified',
    '{transferable_skills}': JSON.stringify(context.transferableSkills || {}),
    '{challenges}': context.challenges || 'Career growth and skill development',
    '{mentorship_style}': context.preferences?.learning_style || 'collaborative',
    '{goals}': context.careerGoals?.join(', ') || 'Professional development',
    '{time_commitment}': context.preferences?.time_commitment || 'moderate',
    '{learning_style}': context.preferences?.learning_style || 'balanced',
    // Personal branding replacements
    '{{achievements}}': context.achievements?.join(', ') || 'Not specified',
    '{{uniqueValue}}': context.uniqueValue || 'Not specified',
    '{{personalStory}}': context.personalStory || 'Not specified',
    '{{targetAudience}}': context.targetAudience || 'Not specified',
    '{{communicationStyle}}': context.communicationStyle || 'professional',
    '{{experienceLevel}}': context.experienceLevel || 'mid-level'
  };

  for (const [key, value] of Object.entries(replacements)) {
    prompt = prompt.replace(new RegExp(key, 'g'), value);
  }

  // Add specific formatting instructions based on type
  const formatInstructions = getFormatInstructions(type);
  prompt += `\n\n${formatInstructions}`;

  return prompt;
}

function getFormatInstructions(type: string): string {
  const baseFormat = `
Please respond with a JSON object containing:
{
  "title": "Clear, actionable title",
  "description": "Detailed description (2-3 sentences)",
  "reasoning": "Explanation of why this recommendation makes sense",
  "confidence_score": 0.8, // Between 0.0 and 1.0
  "priority": "high|medium|low",
  "category": "${type}",
  "recommended_actions": ["action1", "action2", "action3"],
  "metadata": { "key": "value" }
}`;

  switch (type) {
    case 'learning_path':
      return baseFormat + `
Additional requirements:
- Include specific courses, skills, and timeline in recommended_actions
- Metadata should include difficulty_level, estimated_weeks, prerequisites`;

    case 'skill_gap':
      return baseFormat + `
Additional requirements:
- List specific skills to develop in recommended_actions
- Include priority ranking and learning resources in metadata`;

    case 'career_transition':
      return baseFormat + `
Additional requirements:
- Include transition strategy steps in recommended_actions
- Metadata should include timeline, difficulty, success_probability`;

    case 'mentor_match':
      return baseFormat + `
Additional requirements:
- Describe ideal mentor characteristics in recommended_actions
- Include interaction frequency and focus areas in metadata`;

    case 'content':
      return baseFormat + `
Additional requirements:
- List specific learning resources in recommended_actions
- Include resource types and time commitment in metadata`;

    case 'personal_branding':
      return baseFormat + `
Additional requirements:
- Include specific branding tactics and strategies in recommended_actions
- Metadata should include timeline, difficulty, platforms, networking_opportunities, content_ideas`;

    default:
      return baseFormat;
  }
}

async function generateSpecificRecommendation(supabase: any, recommendationId: string, type: string, recommendation: AIRecommendation, context: any) {
  try {
    switch (type) {
      case 'learning_path':
        await supabase.from('learning_path_recommendations').insert({
          user_id: context.profile?.id,
          recommendation_id: recommendationId,
          path_name: recommendation.title,
          target_skill: context.targetSkill || 'Professional Development',
          current_level: 1,
          target_level: 4,
          estimated_duration_weeks: recommendation.metadata?.estimated_weeks || 8,
          learning_modules: recommendation.recommended_actions,
          milestones: recommendation.metadata?.milestones || [],
          industry_relevance_score: recommendation.confidence_score,
          market_demand_score: recommendation.confidence_score
        });
        break;

      case 'skill_gap':
        await supabase.from('skills_gap_analysis').insert({
          user_id: context.profile?.id,
          target_role: context.targetRole || 'Senior Professional',
          target_industry: context.industry || 'Technology',
          current_skills: context.currentSkills || {},
          required_skills: recommendation.metadata?.required_skills || {},
          skill_gaps: recommendation.recommended_actions,
          priority_skills: recommendation.recommended_actions.slice(0, 3),
          ai_insights: recommendation.reasoning,
          recommended_resources: recommendation.recommended_actions
        });
        break;

      case 'career_transition':
        await supabase.from('career_transition_recommendations').insert({
          user_id: context.profile?.id,
          recommendation_id: recommendationId,
          from_role: context.currentRole || 'Current Role',
          to_role: context.targetRole || 'Target Role',
          transition_type: recommendation.metadata?.transition_type || 'promotion',
          transition_difficulty: recommendation.priority === 'high' ? 'challenging' : 'moderate',
          estimated_timeline_months: recommendation.metadata?.timeline_months || 6,
          success_probability: recommendation.confidence_score,
          required_skills: recommendation.recommended_actions,
          transferable_skills: context.transferableSkills || [],
          action_plan: recommendation.recommended_actions
        });
        break;

      case 'mentor_match':
        await supabase.from('mentor_match_recommendations').insert({
          user_id: context.profile?.id,
          recommendation_id: recommendationId,
          mentor_profile: recommendation.metadata?.mentor_profile || {},
          focus_areas: recommendation.recommended_actions,
          mentorship_type: recommendation.metadata?.mentorship_type || 'career_guidance',
          matching_score: recommendation.confidence_score
        });
        break;

      case 'content':
        const contentRecommendations = recommendation.recommended_actions.map((action: any, index: number) => ({
          user_id: context.profile?.id,
          recommendation_id: recommendationId,
          content_type: recommendation.metadata?.content_types?.[index] || 'course',
          title: typeof action === 'string' ? action : action.title,
          description: typeof action === 'object' ? action.description : '',
          provider: typeof action === 'object' ? action.provider : 'Various',
          relevance_score: recommendation.confidence_score,
          quality_score: 0.8,
          recency_score: 0.9
        }));

        await supabase.from('content_recommendations').insert(contentRecommendations);
        break;

      case 'personal_branding':
        // Personal branding recommendations are stored in the main ai_recommendations table
        // No additional specific table needed for this type
        break;
    }
  } catch (error) {
    console.error(`Error creating specific recommendation for ${type}:`, error);
  }
}