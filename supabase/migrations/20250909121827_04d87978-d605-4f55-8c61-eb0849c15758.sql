-- Create user subscriptions table to manage trial and paid subscriptions
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_status TEXT NOT NULL DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'expired', 'cancelled')),
  subscription_plan TEXT DEFAULT 'starter' CHECK (subscription_plan IN ('starter', 'professional', 'premium')),
  trial_start_date TIMESTAMPTZ DEFAULT now(),
  trial_end_date TIMESTAMPTZ DEFAULT (now() + INTERVAL '14 days'),
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  auto_upgrade_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own subscription" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" ON public.user_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all subscriptions" ON public.user_subscriptions
  FOR ALL USING (true);

-- Create trial settings table for configuration
CREATE TABLE public.trial_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trial_duration_days INTEGER DEFAULT 14,
  auto_upgrade_plan TEXT DEFAULT 'starter' CHECK (auto_upgrade_plan IN ('starter', 'professional', 'premium')),
  trial_features_enabled JSONB DEFAULT '["resume_builder", "template_access", "ats_analysis", "basic_ai_recommendations"]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default trial settings
INSERT INTO public.trial_settings (trial_duration_days, auto_upgrade_plan, trial_features_enabled) 
VALUES (14, 'starter', '["resume_builder", "template_access", "ats_analysis", "basic_ai_recommendations", "interview_prep", "linkedin_optimization"]'::jsonb);

-- Enable RLS for trial settings (read-only for users)
ALTER TABLE public.trial_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view trial settings" ON public.trial_settings
  FOR SELECT USING (true);

-- Function to automatically create trial subscription on user signup
CREATE OR REPLACE FUNCTION public.create_trial_subscription()
RETURNS TRIGGER AS $$
BEGIN
  -- Create trial subscription for new user
  INSERT INTO public.user_subscriptions (
    user_id,
    subscription_status,
    trial_start_date,
    trial_end_date
  ) VALUES (
    NEW.id,
    'trial',
    now(),
    now() + INTERVAL '14 days'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create trial subscription on user creation
DROP TRIGGER IF EXISTS on_auth_user_created_trial ON auth.users;
CREATE TRIGGER on_auth_user_created_trial
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_trial_subscription();

-- Function to check if trial has expired
CREATE OR REPLACE FUNCTION public.is_trial_expired(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  trial_end TIMESTAMPTZ;
BEGIN
  SELECT trial_end_date INTO trial_end
  FROM public.user_subscriptions
  WHERE user_id = user_uuid AND subscription_status = 'trial';
  
  IF trial_end IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN now() > trial_end;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get days remaining in trial
CREATE OR REPLACE FUNCTION public.get_trial_days_remaining(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  trial_end TIMESTAMPTZ;
  days_remaining INTEGER;
BEGIN
  SELECT trial_end_date INTO trial_end
  FROM public.user_subscriptions
  WHERE user_id = user_uuid AND subscription_status = 'trial';
  
  IF trial_end IS NULL THEN
    RETURN 0;
  END IF;
  
  days_remaining := EXTRACT(DAY FROM (trial_end - now()));
  
  RETURN GREATEST(days_remaining, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add updated_at trigger
CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trial_settings_updated_at
  BEFORE UPDATE ON public.trial_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();