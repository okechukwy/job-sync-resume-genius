-- Clean up duplicate user_settings records by keeping only the most recent one per user
DELETE FROM user_settings 
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id) id 
  FROM user_settings 
  ORDER BY user_id, updated_at DESC
);

-- Add unique constraint on user_id to prevent future duplicates
ALTER TABLE user_settings 
ADD CONSTRAINT user_settings_user_id_unique UNIQUE (user_id);