-- Create user_settings table for application preferences
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  theme TEXT NOT NULL DEFAULT 'system',
  language TEXT NOT NULL DEFAULT 'en',
  timezone TEXT NOT NULL DEFAULT 'UTC',
  date_format TEXT NOT NULL DEFAULT 'MM/DD/YYYY',
  auto_save BOOLEAN NOT NULL DEFAULT true,
  keyboard_shortcuts BOOLEAN NOT NULL DEFAULT true,
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  marketing_emails BOOLEAN NOT NULL DEFAULT false,
  job_match_alerts BOOLEAN NOT NULL DEFAULT true,
  application_status_updates BOOLEAN NOT NULL DEFAULT true,
  resume_view_notifications BOOLEAN NOT NULL DEFAULT true,
  notification_frequency TEXT NOT NULL DEFAULT 'immediate',
  weekly_progress_reports BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_professional_info table
CREATE TABLE public.user_professional_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_title TEXT,
  company TEXT,
  industry TEXT,
  experience_years TEXT,
  linkedin_url TEXT,
  professional_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_job_preferences table
CREATE TABLE public.user_job_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_types TEXT[] DEFAULT ARRAY[]::TEXT[],
  min_salary INTEGER,
  max_salary INTEGER,
  work_location TEXT DEFAULT 'any',
  preferred_locations TEXT[] DEFAULT ARRAY[]::TEXT[],
  max_commute_distance INTEGER,
  open_to_relocate BOOLEAN NOT NULL DEFAULT false,
  actively_searching BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_privacy_settings table
CREATE TABLE public.user_privacy_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  profile_visibility TEXT NOT NULL DEFAULT 'public',
  profile_searchable BOOLEAN NOT NULL DEFAULT true,
  activity_status_visible BOOLEAN NOT NULL DEFAULT true,
  data_collection BOOLEAN NOT NULL DEFAULT true,
  analytics_tracking BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add phone, city, country to profiles table
ALTER TABLE public.profiles 
ADD COLUMN phone TEXT,
ADD COLUMN city TEXT,
ADD COLUMN country TEXT,
ADD COLUMN profile_picture TEXT;

-- Enable RLS on new tables
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_professional_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_job_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_privacy_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own settings" 
ON public.user_settings 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own professional info" 
ON public.user_professional_info 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own job preferences" 
ON public.user_job_preferences 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own privacy settings" 
ON public.user_privacy_settings 
FOR ALL 
USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_user_settings_updated_at
BEFORE UPDATE ON public.user_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_professional_info_updated_at
BEFORE UPDATE ON public.user_professional_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_job_preferences_updated_at
BEFORE UPDATE ON public.user_job_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_privacy_settings_updated_at
BEFORE UPDATE ON public.user_privacy_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();