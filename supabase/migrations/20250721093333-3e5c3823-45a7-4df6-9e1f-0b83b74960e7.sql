
-- Add sample_answers column to interview_sessions table to cache AI-generated sample answers
ALTER TABLE public.interview_sessions 
ADD COLUMN sample_answers JSONB DEFAULT '{}'::jsonb;

-- Add a comment to document the new column
COMMENT ON COLUMN public.interview_sessions.sample_answers IS 'Stores AI-generated sample answers for each question in the session, keyed by question ID';
