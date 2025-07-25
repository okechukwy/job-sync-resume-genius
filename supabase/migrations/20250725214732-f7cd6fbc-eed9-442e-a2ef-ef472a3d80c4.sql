-- Add comprehensive table descriptions to improve database documentation

-- User-related core tables
COMMENT ON TABLE profiles IS 'User profile information including personal details and contact information';
COMMENT ON TABLE user_settings IS 'General application settings including notifications, theme, and user preferences';
COMMENT ON TABLE user_security_settings IS 'Security configuration including two-factor authentication and backup codes';
COMMENT ON TABLE user_privacy_settings IS 'Privacy configuration settings for user profiles and data sharing preferences';
COMMENT ON TABLE user_professional_info IS 'Professional background information including current job, experience, and industry';
COMMENT ON TABLE user_job_preferences IS 'User preferences for job search including location, salary, and job type preferences';

-- Resume and CV related tables
COMMENT ON TABLE user_resumes IS 'Resume data storage with all sections, versions, and template information';
COMMENT ON TABLE cv_analyses IS 'CV/resume analysis results including ATS scores, keyword analysis, and improvement suggestions';

-- Job application tracking
COMMENT ON TABLE job_applications IS 'Main table for tracking job applications with company details, status, and timeline';
COMMENT ON TABLE application_stages IS 'Tracks different stages of job applications with dates, feedback, and status updates';
COMMENT ON TABLE performance_metrics IS 'Aggregated performance statistics for job applications including response rates and success metrics';

-- AI and automation features
COMMENT ON TABLE ai_generations IS 'Stores AI-generated content and metadata including tokens used, model info, and generation results';
COMMENT ON TABLE interview_sessions IS 'Stores AI interview preparation sessions with questions, responses, and performance scores';

-- LinkedIn integration
COMMENT ON TABLE linkedin_profiles IS 'Stores LinkedIn profile data including experience, education, skills, and contact information';

-- File management and exports
COMMENT ON TABLE user_files IS 'File storage metadata for user-uploaded documents and assets';
COMMENT ON TABLE export_jobs IS 'Manages background export jobs for resumes and documents with status tracking';
COMMENT ON TABLE export_history IS 'Tracks file download history and export activities with client information and usage metrics';
COMMENT ON TABLE white_label_configs IS 'White-label branding configurations for custom client exports';

-- Security and integrations
COMMENT ON TABLE security_events IS 'Audit log for security-related events and user account activities';
COMMENT ON TABLE connected_accounts IS 'Manages external account connections (LinkedIn, etc.) with provider details and metadata';