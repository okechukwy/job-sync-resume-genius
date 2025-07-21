-- Add industry and target_role columns to cv_analyses table
ALTER TABLE public.cv_analyses 
ADD COLUMN industry text,
ADD COLUMN target_role text;