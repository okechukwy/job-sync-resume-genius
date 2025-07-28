-- Enable database functions for the coaching system

-- First, apply the migration that was created
-- Create coaching programs table
CREATE TABLE IF NOT EXISTS public.coaching_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL DEFAULT 'beginner',
  estimated_duration_weeks INTEGER NOT NULL DEFAULT 4,
  skills_covered TEXT[] NOT NULL DEFAULT '{}',
  prerequisites TEXT[] NOT NULL DEFAULT '{}',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user coaching enrollments table
CREATE TABLE IF NOT EXISTS public.user_coaching_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  program_id UUID NOT NULL REFERENCES public.coaching_programs(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active',
  progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, program_id)
);

-- Create learning modules table
CREATE TABLE IF NOT EXISTS public.learning_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID NOT NULL REFERENCES public.coaching_programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'article',
  content_url TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  order_index INTEGER NOT NULL DEFAULT 0,
  prerequisites TEXT[] NOT NULL DEFAULT '{}',
  learning_objectives TEXT[] NOT NULL DEFAULT '{}',
  is_interactive BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user module progress table
CREATE TABLE IF NOT EXISTS public.user_module_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_id UUID NOT NULL REFERENCES public.learning_modules(id) ON DELETE CASCADE,
  enrollment_id UUID NOT NULL REFERENCES public.user_coaching_enrollments(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started',
  progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
  time_spent_minutes INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Create career goals table
CREATE TABLE IF NOT EXISTS public.career_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  target_date DATE,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'active',
  progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
  milestones JSONB NOT NULL DEFAULT '[]',
  success_metrics JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills assessments table
CREATE TABLE IF NOT EXISTS public.skills_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  skill_name TEXT NOT NULL,
  category TEXT NOT NULL,
  current_level INTEGER NOT NULL CHECK (current_level >= 1 AND current_level <= 5),
  target_level INTEGER NOT NULL CHECK (target_level >= 1 AND target_level <= 5),
  assessment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  next_assessment_date TIMESTAMP WITH TIME ZONE,
  improvement_recommendations TEXT[],
  learning_resources TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create coaching sessions table
CREATE TABLE IF NOT EXISTS public.coaching_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'scheduled',
  coach_notes TEXT,
  action_items JSONB NOT NULL DEFAULT '[]',
  feedback_score INTEGER CHECK (feedback_score >= 1 AND feedback_score <= 5),
  feedback_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create personalized insights table
CREATE TABLE IF NOT EXISTS public.personalized_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  insight_type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  category TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create action items table
CREATE TABLE IF NOT EXISTS public.action_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'pending',
  due_date DATE,
  estimated_time_minutes INTEGER,
  related_goal_id UUID REFERENCES public.career_goals(id) ON DELETE SET NULL,
  completion_notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create career certifications table
CREATE TABLE IF NOT EXISTS public.career_certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  certification_name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  description TEXT,
  skills_validated TEXT[] NOT NULL DEFAULT '{}',
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  verification_url TEXT,
  badge_image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create industry benchmarks table
CREATE TABLE IF NOT EXISTS public.industry_benchmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  industry TEXT NOT NULL,
  job_role TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  benchmark_level DECIMAL(3,2) NOT NULL,
  salary_range_min INTEGER,
  salary_range_max INTEGER,
  market_demand TEXT,
  growth_projection DECIMAL(5,2),
  data_source TEXT,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning resources table
CREATE TABLE IF NOT EXISTS public.learning_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  skill_areas TEXT[] NOT NULL DEFAULT '{}',
  difficulty_level TEXT NOT NULL DEFAULT 'beginner',
  estimated_time_minutes INTEGER,
  provider TEXT,
  resource_url TEXT,
  cost_type TEXT NOT NULL DEFAULT 'free',
  rating DECIMAL(2,1),
  is_recommended BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.coaching_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_coaching_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personalized_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Coaching programs (public read, admin write)
CREATE POLICY "Anyone can view active coaching programs" ON public.coaching_programs FOR SELECT USING (is_active = true);

-- User coaching enrollments (user-specific)
CREATE POLICY "Users can manage their own enrollments" ON public.user_coaching_enrollments FOR ALL USING (auth.uid() = user_id);

-- Learning modules (public read)
CREATE POLICY "Anyone can view learning modules" ON public.learning_modules FOR SELECT USING (true);

-- User module progress (user-specific)
CREATE POLICY "Users can manage their own module progress" ON public.user_module_progress FOR ALL USING (auth.uid() = user_id);

-- Career goals (user-specific)
CREATE POLICY "Users can manage their own career goals" ON public.career_goals FOR ALL USING (auth.uid() = user_id);

-- Skills assessments (user-specific)
CREATE POLICY "Users can manage their own skills assessments" ON public.skills_assessments FOR ALL USING (auth.uid() = user_id);

-- Coaching sessions (user-specific)
CREATE POLICY "Users can manage their own coaching sessions" ON public.coaching_sessions FOR ALL USING (auth.uid() = user_id);

-- Personalized insights (user-specific)
CREATE POLICY "Users can manage their own insights" ON public.personalized_insights FOR ALL USING (auth.uid() = user_id);

-- Action items (user-specific)
CREATE POLICY "Users can manage their own action items" ON public.action_items FOR ALL USING (auth.uid() = user_id);

-- Career certifications (user-specific)
CREATE POLICY "Users can manage their own certifications" ON public.career_certifications FOR ALL USING (auth.uid() = user_id);

-- Industry benchmarks (public read)
CREATE POLICY "Anyone can view industry benchmarks" ON public.industry_benchmarks FOR SELECT USING (true);

-- Learning resources (public read)
CREATE POLICY "Anyone can view learning resources" ON public.learning_resources FOR SELECT USING (true);

-- Add triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_coaching_programs_updated_at BEFORE UPDATE ON public.coaching_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_coaching_enrollments_updated_at BEFORE UPDATE ON public.user_coaching_enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_modules_updated_at BEFORE UPDATE ON public.learning_modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_module_progress_updated_at BEFORE UPDATE ON public.user_module_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_goals_updated_at BEFORE UPDATE ON public.career_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_assessments_updated_at BEFORE UPDATE ON public.skills_assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coaching_sessions_updated_at BEFORE UPDATE ON public.coaching_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personalized_insights_updated_at BEFORE UPDATE ON public.personalized_insights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_action_items_updated_at BEFORE UPDATE ON public.action_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_career_certifications_updated_at BEFORE UPDATE ON public.career_certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_learning_resources_updated_at BEFORE UPDATE ON public.learning_resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample coaching programs
INSERT INTO public.coaching_programs (title, description, category, difficulty_level, estimated_duration_weeks, skills_covered, is_premium) VALUES
('Leadership Excellence Program', 'Comprehensive leadership development program focusing on strategic thinking, team management, and executive presence.', 'leadership', 'advanced', 8, ARRAY['strategic_thinking', 'team_management', 'executive_presence', 'decision_making'], true),
('Technical Skills Acceleration', 'Fast-track your technical skills with hands-on projects and industry best practices.', 'technical', 'intermediate', 6, ARRAY['programming', 'system_design', 'code_review', 'testing'], false),
('Career Transition Mastery', 'Navigate career transitions successfully with strategic planning and networking.', 'career_development', 'beginner', 4, ARRAY['networking', 'resume_writing', 'interview_skills', 'personal_branding'], false),
('Communication & Influence', 'Master the art of persuasive communication and stakeholder management.', 'soft_skills', 'intermediate', 5, ARRAY['public_speaking', 'presentation_skills', 'negotiation', 'stakeholder_management'], true),
('Data-Driven Decision Making', 'Learn to leverage data analytics for strategic business decisions.', 'analytical', 'intermediate', 7, ARRAY['data_analysis', 'statistical_thinking', 'visualization', 'business_intelligence'], true);

-- Insert sample learning resources
INSERT INTO public.learning_resources (title, description, resource_type, skill_areas, difficulty_level, estimated_time_minutes, provider, cost_type, rating, is_recommended) VALUES
('Strategic Thinking Fundamentals', 'Learn the core principles of strategic thinking and long-term planning.', 'course', ARRAY['strategic_thinking', 'planning'], 'beginner', 180, 'CareerBuilder Academy', 'free', 4.5, true),
('Advanced Leadership Techniques', 'Master advanced leadership strategies for complex organizational challenges.', 'video_series', ARRAY['leadership', 'management'], 'advanced', 240, 'Executive Learning', 'premium', 4.8, true),
('Network Building Strategies', 'Practical guide to building and maintaining professional networks.', 'ebook', ARRAY['networking', 'relationship_building'], 'intermediate', 90, 'Career Success Publications', 'free', 4.2, false),
('Public Speaking Mastery', 'Overcome fear and become a confident public speaker.', 'workshop', ARRAY['public_speaking', 'presentation_skills'], 'beginner', 360, 'Communication Experts', 'premium', 4.7, true),
('Data Visualization Best Practices', 'Create compelling data visualizations that tell a story.', 'tutorial', ARRAY['data_visualization', 'analytics'], 'intermediate', 120, 'DataViz Pro', 'free', 4.3, false);

-- Insert sample industry benchmarks
INSERT INTO public.industry_benchmarks (industry, job_role, skill_name, benchmark_level, salary_range_min, salary_range_max, market_demand, growth_projection) VALUES
('Technology', 'Software Engineer', 'programming', 4.2, 80000, 150000, 'high', 22.5),
('Technology', 'Product Manager', 'strategic_thinking', 4.0, 100000, 180000, 'high', 15.3),
('Finance', 'Financial Analyst', 'data_analysis', 3.8, 70000, 120000, 'medium', 8.7),
('Marketing', 'Marketing Manager', 'digital_marketing', 3.9, 65000, 110000, 'medium', 10.2),
('Healthcare', 'Healthcare Administrator', 'healthcare_management', 4.1, 75000, 130000, 'high', 18.4);