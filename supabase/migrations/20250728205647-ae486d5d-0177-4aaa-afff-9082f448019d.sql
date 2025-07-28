-- Add RLS policies for AI recommendations tables

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