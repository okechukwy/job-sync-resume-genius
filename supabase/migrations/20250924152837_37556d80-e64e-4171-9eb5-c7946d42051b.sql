-- Fix critical security vulnerability in user_subscriptions table
-- Remove overly permissive policies and implement proper access controls

-- First, drop the dangerous public access policy
DROP POLICY IF EXISTS "Service role can manage all subscriptions" ON public.user_subscriptions;

-- Drop duplicate policies to clean up
DROP POLICY IF EXISTS "Users can view their own subscription data" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can update their own subscription data" ON public.user_subscriptions;

-- Ensure we have proper policies for user access
-- Users can only view their own subscription data
CREATE POLICY "Users can view own subscription" ON public.user_subscriptions
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Users can only update their own subscription data
CREATE POLICY "Users can update own subscription" ON public.user_subscriptions
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Service role can manage all subscriptions (for system operations)
CREATE POLICY "Service role full access" ON public.user_subscriptions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- System can insert subscription data (for new user registration)
DROP POLICY IF EXISTS "System can insert subscription data" ON public.user_subscriptions;
CREATE POLICY "System can insert subscription" ON public.user_subscriptions
FOR INSERT
TO service_role
WITH CHECK (true);