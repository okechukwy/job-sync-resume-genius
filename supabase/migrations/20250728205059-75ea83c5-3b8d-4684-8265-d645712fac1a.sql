-- Create tables for AI-powered recommendations

-- Career recommendation types and templates
CREATE TABLE IF NOT EXISTS public.recommendation_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'learning_path', 'skill_development', 'career_transition', 'mentorship', 'content'
  prompt_template TEXT NOT NULL,
  target_audience TEXT[] NOT NULL DEFAULT '{}',
  priority_weight DECIMAL(3,2) NOT NULL DEFAULT 1.0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User-specific AI recommendations
CREATE TABLE IF NOT EXISTS public.ai_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recommendation_type TEXT NOT NULL, -- 'learning_path', 'skill_gap', 'career_transition', 'mentor_match', 'content'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reasoning TEXT NOT NULL, -- AI's explanation for the recommendation
  confidence_score DECIMAL(3,2) NOT NULL, -- 0.0 to 1.0
  priority TEXT NOT NULL DEFAULT 'medium', -- 'high', 'medium', 'low'
  category TEXT NOT NULL,
  recommended_actions JSONB NOT NULL DEFAULT '[]',
  metadata JSONB NOT NULL DEFAULT '{}', -- Additional context data
  source_data JSONB NOT NULL DEFAULT '{}', -- Data used to generate recommendation
  is_dismissed BOOLEAN NOT NULL DEFAULT false,
  is_implemented BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Learning path recommendations with structured progression
CREATE TABLE IF NOT EXISTS public.learning_path_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recommendation_id UUID NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  path_name TEXT NOT NULL,
  target_skill TEXT NOT NULL,
  current_level INTEGER NOT NULL CHECK (current_level >= 1 AND current_level <= 5),
  target_level INTEGER NOT NULL CHECK (target_level >= 1 AND target_level <= 5),
  estimated_duration_weeks INTEGER NOT NULL,
  difficulty_progression TEXT NOT NULL DEFAULT 'gradual', -- 'gradual', 'accelerated', 'intensive'
  learning_modules JSONB NOT NULL DEFAULT '[]',
  milestones JSONB NOT NULL DEFAULT '[]',
  prerequisites JSONB NOT NULL DEFAULT '[]',
  success_metrics JSONB NOT NULL DEFAULT '{}',
  industry_relevance_score DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  market_demand_score DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Skills gap analysis and recommendations
CREATE TABLE IF NOT EXISTS public.skills_gap_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  analysis_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  target_role TEXT NOT NULL,
  target_industry TEXT NOT NULL,
  current_skills JSONB NOT NULL DEFAULT '{}', -- skill -> level mapping
  required_skills JSONB NOT NULL DEFAULT '{}', -- skill -> required_level mapping
  skill_gaps JSONB NOT NULL DEFAULT '[]', -- array of gap objects
  priority_skills JSONB NOT NULL DEFAULT '[]', -- ordered by importance
  improvement_timeline JSONB NOT NULL DEFAULT '{}',
  market_alignment_score DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  competitiveness_score DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  ai_insights TEXT,
  recommended_resources JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Career transition recommendations
CREATE TABLE IF NOT EXISTS public.career_transition_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recommendation_id UUID NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  current_role TEXT NOT NULL,
  target_role TEXT NOT NULL,
  transition_type TEXT NOT NULL, -- 'lateral', 'promotion', 'industry_change', 'function_change'
  transition_difficulty TEXT NOT NULL, -- 'easy', 'moderate', 'challenging'
  estimated_timeline_months INTEGER NOT NULL,
  success_probability DECIMAL(3,2) NOT NULL,
  required_skills JSONB NOT NULL DEFAULT '[]',
  transferable_skills JSONB NOT NULL DEFAULT '[]',
  skill_development_plan JSONB NOT NULL DEFAULT '{}',
  networking_strategy JSONB NOT NULL DEFAULT '{}',
  experience_requirements JSONB NOT NULL DEFAULT '{}',
  salary_impact JSONB NOT NULL DEFAULT '{}',
  market_trends JSONB NOT NULL DEFAULT '{}',
  action_plan JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Mentor and coach matching recommendations
CREATE TABLE IF NOT EXISTS public.mentor_match_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recommendation_id UUID NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  mentor_profile JSONB NOT NULL DEFAULT '{}', -- Ideal mentor characteristics
  matching_criteria JSONB NOT NULL DEFAULT '{}',
  focus_areas TEXT[] NOT NULL DEFAULT '{}',
  mentorship_type TEXT NOT NULL, -- 'career_guidance', 'skill_development', 'industry_insight', 'leadership'
  interaction_frequency TEXT NOT NULL DEFAULT 'bi-weekly',
  duration_expectations TEXT NOT NULL DEFAULT '6_months',
  communication_style TEXT NOT NULL DEFAULT 'collaborative',
  availability_requirements JSONB NOT NULL DEFAULT '{}',
  success_metrics JSONB NOT NULL DEFAULT '{}',
  matching_score DECIMAL(3,2) NOT NULL DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Content recommendations (resources, courses, articles)
CREATE TABLE IF NOT EXISTS public.content_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recommendation_id UUID NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL, -- 'course', 'article', 'video', 'book', 'podcast', 'workshop'
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  provider TEXT,
  difficulty_level TEXT NOT NULL DEFAULT 'intermediate',
  estimated_time_minutes INTEGER,
  cost_type TEXT NOT NULL DEFAULT 'free', -- 'free', 'paid', 'subscription'
  relevance_score DECIMAL(3,2) NOT NULL,
  quality_score DECIMAL(3,2) NOT NULL,
  recency_score DECIMAL(3,2) NOT NULL,
  skill_alignment JSONB NOT NULL DEFAULT '{}',
  goal_alignment JSONB NOT NULL DEFAULT '{}',
  learning_objectives TEXT[] NOT NULL DEFAULT '{}',
  prerequisites TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User recommendation preferences and feedback
CREATE TABLE IF NOT EXISTS public.recommendation_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  preferred_recommendation_types TEXT[] NOT NULL DEFAULT '{}',
  learning_style TEXT NOT NULL DEFAULT 'balanced', -- 'visual', 'auditory', 'hands_on', 'reading', 'balanced'
  time_commitment TEXT NOT NULL DEFAULT 'moderate', -- 'minimal', 'moderate', 'intensive'
  risk_tolerance TEXT NOT NULL DEFAULT 'moderate', -- 'conservative', 'moderate', 'aggressive'
  career_ambition_level TEXT NOT NULL DEFAULT 'growth_focused', -- 'stability_focused', 'growth_focused', 'leadership_focused'
  industry_interests TEXT[] NOT NULL DEFAULT '{}',
  skill_priorities TEXT[] NOT NULL DEFAULT '{}',
  notification_frequency TEXT NOT NULL DEFAULT 'weekly', -- 'daily', 'weekly', 'monthly'
  auto_implement_low_risk BOOLEAN NOT NULL DEFAULT false,
  feedback_frequency TEXT NOT NULL DEFAULT 'after_completion',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Recommendation feedback and effectiveness tracking
CREATE TABLE IF NOT EXISTS public.recommendation_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recommendation_id UUID NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL, -- 'rating', 'implementation', 'outcome', 'dismissal'
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  usefulness_score INTEGER CHECK (usefulness_score >= 1 AND usefulness_score <= 5),
  accuracy_score INTEGER CHECK (accuracy_score >= 1 AND accuracy_score <= 5),
  relevance_score INTEGER CHECK (relevance_score >= 1 AND relevance_score <= 5),
  implementation_status TEXT, -- 'not_started', 'in_progress', 'completed', 'abandoned'
  implementation_notes TEXT,
  outcome_achieved BOOLEAN,
  outcome_description TEXT,
  improvement_suggestions TEXT,
  would_recommend BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.recommendation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_gap_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_transition_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_match_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Recommendation templates (public read)
CREATE POLICY "Anyone can view active recommendation templates" ON public.recommendation_templates FOR SELECT USING (is_active = true);

-- AI recommendations (user-specific)
CREATE POLICY "Users can view their own recommendations" ON public.ai_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own recommendations" ON public.ai_recommendations FOR UPDATE USING (auth.uid() = user_id);

-- Learning path recommendations (user-specific)
CREATE POLICY "Users can view their own learning path recommendations" ON public.learning_path_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own learning path recommendations" ON public.learning_path_recommendations FOR UPDATE USING (auth.uid() = user_id);

-- Skills gap analysis (user-specific)
CREATE POLICY "Users can manage their own skills gap analysis" ON public.skills_gap_analysis FOR ALL USING (auth.uid() = user_id);

-- Career transition recommendations (user-specific)
CREATE POLICY "Users can view their own career transition recommendations" ON public.career_transition_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own career transition recommendations" ON public.career_transition_recommendations FOR UPDATE USING (auth.uid() = user_id);

-- Mentor match recommendations (user-specific)
CREATE POLICY "Users can view their own mentor match recommendations" ON public.mentor_match_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own mentor match recommendations" ON public.mentor_match_recommendations FOR UPDATE USING (auth.uid() = user_id);

-- Content recommendations (user-specific)
CREATE POLICY "Users can view their own content recommendations" ON public.content_recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own content recommendations" ON public.content_recommendations FOR UPDATE USING (auth.uid() = user_id);

-- Recommendation preferences (user-specific)
CREATE POLICY "Users can manage their own recommendation preferences" ON public.recommendation_preferences FOR ALL USING (auth.uid() = user_id);

-- Recommendation feedback (user-specific)
CREATE POLICY "Users can manage their own recommendation feedback" ON public.recommendation_feedback FOR ALL USING (auth.uid() = user_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_recommendation_templates_updated_at BEFORE UPDATE ON public.recommendation_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_recommendations_updated_at BEFORE UPDATE ON public.ai_recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_path_recommendations_updated_at BEFORE UPDATE ON public.learning_path_recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_gap_analysis_updated_at BEFORE UPDATE ON public.skills_gap_analysis FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_transition_recommendations_updated_at BEFORE UPDATE ON public.career_transition_recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentor_match_recommendations_updated_at BEFORE UPDATE ON public.mentor_match_recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_recommendations_updated_at BEFORE UPDATE ON public.content_recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recommendation_preferences_updated_at BEFORE UPDATE ON public.recommendation_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recommendation_feedback_updated_at BEFORE UPDATE ON public.recommendation_feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample recommendation templates
INSERT INTO public.recommendation_templates (name, description, category, prompt_template, target_audience, priority_weight) VALUES
('Personalized Learning Path Generator', 'Generate personalized learning paths based on career goals and current skills', 'learning_path', 
'Based on the user''s current role as {current_role}, target role as {target_role}, current skills: {current_skills}, and career goals: {career_goals}, generate a comprehensive learning path that includes specific courses, timeframes, and milestones. Consider industry trends and skill demand.', 
ARRAY['early_career', 'mid_level', 'senior', 'executive'], 0.9),

('Skills Gap Analysis', 'Analyze skill gaps and provide targeted improvement recommendations', 'skill_development',
'Analyze the skill gap between the user''s current skills {current_skills} and the requirements for {target_role} in {industry}. Identify the most critical gaps, prioritize them by impact and achievability, and suggest specific learning resources and timelines.',
ARRAY['early_career', 'mid_level', 'senior'], 0.95),

('Career Transition Strategy', 'Provide strategic guidance for career transitions', 'career_transition',
'The user wants to transition from {current_role} in {current_industry} to {target_role} in {target_industry}. Analyze their transferable skills {transferable_skills}, identify skill gaps, and create a comprehensive transition strategy including networking, skill development, and timeline.',
ARRAY['mid_level', 'senior', 'executive'], 0.85),

('Mentor Matching', 'Match users with ideal mentors based on goals and preferences', 'mentorship',
'Based on the user''s career goals {career_goals}, current challenges {challenges}, preferred mentorship style {mentorship_style}, and industry {industry}, recommend the ideal mentor profile including specific characteristics, expertise areas, and interaction approach.',
ARRAY['early_career', 'mid_level'], 0.8),

('Content Recommendation Engine', 'Recommend relevant learning content and resources', 'content',
'Recommend the most relevant learning content for a user with these skills {current_skills}, working towards these goals {goals}, with {time_commitment} time commitment and {learning_style} learning preference. Include courses, articles, videos, and books with prioritization.',
ARRAY['early_career', 'mid_level', 'senior'], 0.9);

-- Insert sample skills gap analysis data
INSERT INTO public.skills_gap_analysis (user_id, target_role, target_industry, current_skills, required_skills, skill_gaps, priority_skills, ai_insights) VALUES
(gen_random_uuid(), 'Senior Software Engineer', 'Technology', 
'{"javascript": 4, "react": 4, "python": 3, "sql": 3}',
'{"javascript": 5, "react": 5, "python": 4, "sql": 4, "system_design": 4, "leadership": 3}',
'[{"skill": "system_design", "current": 0, "required": 4, "gap": 4}, {"skill": "leadership", "current": 0, "required": 3, "gap": 3}]',
'["system_design", "leadership", "python", "sql"]',
'Focus on system design fundamentals and leadership skills to advance to senior level. Your technical foundation is strong.');

-- Insert sample learning path recommendations  
INSERT INTO public.learning_path_recommendations (user_id, recommendation_id, path_name, target_skill, current_level, target_level, estimated_duration_weeks, learning_modules, milestones) VALUES
(gen_random_uuid(), gen_random_uuid(), 'System Design Mastery Path', 'system_design', 1, 4, 12,
'[{"title": "System Design Fundamentals", "duration_weeks": 3}, {"title": "Scalability Patterns", "duration_weeks": 4}, {"title": "Real-world System Design", "duration_weeks": 5}]',
'[{"week": 3, "milestone": "Complete fundamentals assessment"}, {"week": 8, "milestone": "Design first distributed system"}, {"week": 12, "milestone": "Present comprehensive system design"}]');