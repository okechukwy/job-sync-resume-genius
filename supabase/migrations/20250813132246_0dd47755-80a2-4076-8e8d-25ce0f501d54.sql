-- Add descriptions to database tables

COMMENT ON TABLE public.user_security_settings IS 'User security preferences including two-factor authentication, backup codes, and security notifications';

COMMENT ON TABLE public.user_job_preferences IS 'User preferences for job search criteria including salary range, location, job types, and search notifications';

COMMENT ON TABLE public.personalized_insights IS 'AI-generated personalized insights and recommendations based on user career data and market trends';

COMMENT ON TABLE public.export_history IS 'History of exported resumes and documents including download tracking and file metadata';

COMMENT ON TABLE public.coaching_sessions IS 'Career coaching session records with scheduling, notes, feedback, and action items';

COMMENT ON TABLE public.user_resumes IS 'User resume data including all sections, versions, and template configurations';

COMMENT ON TABLE public.user_privacy_settings IS 'User privacy preferences controlling data sharing, profile visibility, and analytics tracking';

COMMENT ON TABLE public.career_certifications IS 'Professional certifications earned by users with validation details and skill mappings';

COMMENT ON TABLE public.industry_benchmarks IS 'Industry-specific benchmarks for skills, salaries, and market demand data';

COMMENT ON TABLE public.security_events IS 'Security-related events including login attempts, suspicious activities, and audit logs';

COMMENT ON TABLE public.ai_generations IS 'AI content generation history tracking usage, tokens, and success rates for different generation types';

COMMENT ON TABLE public.career_transition_recommendations IS 'AI-powered career transition recommendations with skill gap analysis and action plans';

COMMENT ON TABLE public.user_module_progress IS 'User progress tracking for learning modules within coaching programs';

COMMENT ON TABLE public.performance_metrics IS 'Job application performance analytics including response rates, interview rates, and success metrics';

COMMENT ON TABLE public.interview_sessions IS 'AI interview practice sessions with questions, responses, scores, and feedback';

COMMENT ON TABLE public.user_coaching_enrollments IS 'User enrollments in coaching programs with progress tracking and completion status';

COMMENT ON TABLE public.skills_assessments IS 'Skills assessment results with current levels, targets, and improvement recommendations';

COMMENT ON TABLE public.job_applications IS 'Job application tracking with status management, ATS scores, and interview scheduling';

COMMENT ON TABLE public.ai_recommendations IS 'AI-generated recommendations for career improvement with confidence scores and implementation tracking';

COMMENT ON TABLE public.learning_resources IS 'Curated learning resources including courses, articles, and tools for skill development';

COMMENT ON TABLE public.action_items IS 'User action items and tasks with due dates, priorities, and completion tracking';

COMMENT ON TABLE public.recommendation_templates IS 'Templates for generating AI recommendations with target audience and prompt configurations';

COMMENT ON TABLE public.user_settings IS 'User application preferences including notifications, themes, keyboard shortcuts, and regional settings';

COMMENT ON TABLE public.export_jobs IS 'Background jobs for exporting user data with status tracking and file generation';

COMMENT ON TABLE public.white_label_configs IS 'White-label branding configurations for customizing application appearance and branding';

COMMENT ON TABLE public.learning_path_recommendations IS 'Personalized learning path recommendations with modules, milestones, and skill progression';

COMMENT ON TABLE public.linkedin_profiles IS 'LinkedIn profile data for optimization including experience, education, and skills';

COMMENT ON TABLE public.coaching_programs IS 'Available coaching programs with curricula, difficulty levels, and skill coverage';

COMMENT ON TABLE public.skills_gap_analysis IS 'Analysis of user skill gaps compared to market requirements with improvement timelines';

COMMENT ON TABLE public.user_professional_info IS 'Professional information including current role, company, industry, and career summary';

COMMENT ON TABLE public.content_recommendations IS 'Personalized content recommendations with relevance scoring and skill alignment';

COMMENT ON TABLE public.cv_enhancement_history IS 'History of CV improvements and optimizations with applied changes and content tracking';

COMMENT ON TABLE public.recommendation_feedback IS 'User feedback on AI recommendations including ratings, usefulness, and implementation outcomes';

COMMENT ON TABLE public.recommendation_preferences IS 'User preferences for AI recommendations including risk tolerance, learning style, and notification frequency';

COMMENT ON TABLE public.user_files IS 'User uploaded files and documents with metadata, storage paths, and purpose tracking';

COMMENT ON TABLE public.connected_accounts IS 'Third-party account connections and integrations with metadata and usage tracking';