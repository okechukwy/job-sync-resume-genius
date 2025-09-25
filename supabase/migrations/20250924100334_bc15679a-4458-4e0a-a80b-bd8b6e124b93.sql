-- Enable RLS on user_subscriptions table and create secure policies
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view only their own subscription data
CREATE POLICY "Users can view their own subscription data" 
ON public.user_subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to update only their own subscription data
CREATE POLICY "Users can update their own subscription data" 
ON public.user_subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policy for system to insert subscription data (for new signups)
CREATE POLICY "System can insert subscription data" 
ON public.user_subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for system operations (auto-upgrades, trial expiration, etc.)
-- This allows edge functions with service role to manage subscriptions
CREATE POLICY "Service role can manage subscriptions" 
ON public.user_subscriptions 
FOR ALL 
USING (auth.role() = 'service_role');

-- Ensure the table has proper constraints
ALTER TABLE public.user_subscriptions 
ALTER COLUMN user_id SET NOT NULL;

-- Add index for better performance on user lookups
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id 
ON public.user_subscriptions(user_id);