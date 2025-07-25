-- Add unique constraint to user_privacy_settings table
-- First, clean up any duplicate records, keeping the most recent one
DELETE FROM public.user_privacy_settings 
WHERE id NOT IN (
    SELECT DISTINCT ON (user_id) id 
    FROM public.user_privacy_settings 
    ORDER BY user_id, updated_at DESC
);

-- Add unique constraint on user_id
ALTER TABLE public.user_privacy_settings 
ADD CONSTRAINT user_privacy_settings_user_id_key UNIQUE (user_id);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_user_privacy_settings_user_id 
ON public.user_privacy_settings (user_id);