-- Add industry and target_role columns to cv_analyses table
ALTER TABLE public.cv_analyses 
ADD COLUMN industry TEXT,
ADD COLUMN target_role TEXT;