-- Create tables for AI-powered recommendations (fixed version)

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

-- Career transition recommendations (fixed column names)
CREATE TABLE IF NOT EXISTS public.career_transition_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recommendation_id UUID NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  from_role TEXT NOT NULL, -- changed from current_role
  to_role TEXT NOT NULL, -- changed from target_role
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