-- Create security monitoring tables
CREATE TABLE IF NOT EXISTS public.security_anomalies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  anomaly_type TEXT NOT NULL CHECK (anomaly_type IN ('login_pattern', 'location_change', 'unusual_activity', 'suspicious_behavior')),
  severity_level TEXT NOT NULL CHECK (severity_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'low',
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  email TEXT NOT NULL,
  ip_address INET NOT NULL,
  user_agent TEXT,
  country_code TEXT,
  city TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  success BOOLEAN NOT NULL DEFAULT false,
  failure_reason TEXT,
  attempt_count INTEGER DEFAULT 1,
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.trusted_devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  device_fingerprint TEXT NOT NULL,
  device_name TEXT,
  user_agent TEXT,
  ip_address INET,
  country_code TEXT,
  city TEXT,
  trusted BOOLEAN DEFAULT false,
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, device_fingerprint)
);

CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  ip_address INET,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.encrypted_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data_type TEXT NOT NULL CHECK (data_type IN ('resume_content', 'personal_info', 'employment_history', 'sensitive_notes')),
  encrypted_content TEXT NOT NULL,
  encryption_key_id TEXT NOT NULL,
  iv TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.data_retention_policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data_type TEXT NOT NULL,
  retention_period INTERVAL NOT NULL DEFAULT '2 years',
  auto_delete BOOLEAN DEFAULT true,
  last_cleanup_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, data_type)
);

CREATE TABLE IF NOT EXISTS public.anonymized_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_hash TEXT NOT NULL,
  event_type TEXT NOT NULL,
  anonymized_data JSONB DEFAULT '{}',
  user_segment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.security_anomalies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trusted_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encrypted_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_retention_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anonymized_analytics ENABLE ROW LEVEL SECURITY;

-- RLS policies for security_anomalies
CREATE POLICY "Users can view their own anomalies" ON public.security_anomalies
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert anomalies" ON public.security_anomalies
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own anomalies" ON public.security_anomalies
FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for login_attempts
CREATE POLICY "Users can view their own login attempts" ON public.login_attempts
FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "System can insert login attempts" ON public.login_attempts
FOR INSERT WITH CHECK (true);

-- RLS policies for trusted_devices
CREATE POLICY "Users can view their own devices" ON public.trusted_devices
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own devices" ON public.trusted_devices
FOR ALL USING (auth.uid() = user_id);

-- RLS policies for api_rate_limits
CREATE POLICY "System can manage rate limits" ON public.api_rate_limits
FOR ALL WITH CHECK (true);

-- RLS policies for encrypted_data
CREATE POLICY "Users can access their own encrypted data" ON public.encrypted_data
FOR ALL USING (auth.uid() = user_id);

-- RLS policies for data_retention_policies
CREATE POLICY "Users can manage their own retention policies" ON public.data_retention_policies
FOR ALL USING (auth.uid() = user_id);

-- RLS policies for anonymized_analytics
CREATE POLICY "System can manage anonymized analytics" ON public.anonymized_analytics
FOR ALL WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_security_anomalies_user_id ON public.security_anomalies(user_id);
CREATE INDEX idx_security_anomalies_created_at ON public.security_anomalies(created_at);
CREATE INDEX idx_login_attempts_email ON public.login_attempts(email);
CREATE INDEX idx_login_attempts_ip_address ON public.login_attempts(ip_address);
CREATE INDEX idx_login_attempts_created_at ON public.login_attempts(created_at);
CREATE INDEX idx_trusted_devices_user_id ON public.trusted_devices(user_id);
CREATE INDEX idx_api_rate_limits_ip_address ON public.api_rate_limits(ip_address);
CREATE INDEX idx_api_rate_limits_user_id ON public.api_rate_limits(user_id);
CREATE INDEX idx_encrypted_data_user_id ON public.encrypted_data(user_id);
CREATE INDEX idx_anonymized_analytics_created_at ON public.anonymized_analytics(created_at);

-- Create function to detect anomalies
CREATE OR REPLACE FUNCTION public.detect_login_anomaly(
  p_user_id UUID,
  p_ip_address INET,
  p_country_code TEXT,
  p_user_agent TEXT
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  anomalies JSONB := '[]'::JSONB;
  recent_locations TEXT[];
  usual_times INTEGER[];
  current_hour INTEGER;
  location_anomaly BOOLEAN := false;
  time_anomaly BOOLEAN := false;
BEGIN
  current_hour := EXTRACT(HOUR FROM now());
  
  -- Check for location anomalies
  SELECT ARRAY_AGG(DISTINCT country_code) 
  INTO recent_locations
  FROM public.login_attempts 
  WHERE user_id = p_user_id 
    AND success = true 
    AND created_at > now() - INTERVAL '30 days';
  
  IF recent_locations IS NOT NULL AND NOT (p_country_code = ANY(recent_locations)) THEN
    location_anomaly := true;
    anomalies := anomalies || jsonb_build_object(
      'type', 'new_location',
      'severity', 'medium',
      'description', 'Login from new geographic location',
      'metadata', jsonb_build_object('country', p_country_code)
    );
  END IF;
  
  -- Check for time-based anomalies
  SELECT ARRAY_AGG(DISTINCT EXTRACT(HOUR FROM created_at)::INTEGER)
  INTO usual_times
  FROM public.login_attempts
  WHERE user_id = p_user_id
    AND success = true
    AND created_at > now() - INTERVAL '60 days';
  
  IF usual_times IS NOT NULL AND NOT (current_hour = ANY(usual_times)) THEN
    time_anomaly := true;
    anomalies := anomalies || jsonb_build_object(
      'type', 'unusual_time',
      'severity', 'low',
      'description', 'Login at unusual time',
      'metadata', jsonb_build_object('hour', current_hour)
    );
  END IF;
  
  RETURN anomalies;
END;
$$;

-- Create function to check brute force attempts
CREATE OR REPLACE FUNCTION public.check_brute_force_protection(
  p_email TEXT,
  p_ip_address INET
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  email_attempts INTEGER := 0;
  ip_attempts INTEGER := 0;
  block_duration INTERVAL;
  result JSONB;
BEGIN
  -- Count failed attempts in last hour for email
  SELECT COUNT(*) INTO email_attempts
  FROM public.login_attempts
  WHERE email = p_email
    AND success = false
    AND created_at > now() - INTERVAL '1 hour';
  
  -- Count failed attempts in last hour for IP
  SELECT COUNT(*) INTO ip_attempts
  FROM public.login_attempts
  WHERE ip_address = p_ip_address
    AND success = false
    AND created_at > now() - INTERVAL '1 hour';
  
  -- Progressive blocking logic
  IF email_attempts >= 10 OR ip_attempts >= 20 THEN
    block_duration := INTERVAL '24 hours';
  ELSIF email_attempts >= 5 OR ip_attempts >= 10 THEN
    block_duration := INTERVAL '1 hour';
  ELSIF email_attempts >= 3 OR ip_attempts >= 5 THEN
    block_duration := INTERVAL '15 minutes';
  ELSE
    block_duration := NULL;
  END IF;
  
  result := jsonb_build_object(
    'blocked', block_duration IS NOT NULL,
    'block_duration', EXTRACT(EPOCH FROM block_duration),
    'email_attempts', email_attempts,
    'ip_attempts', ip_attempts
  );
  
  -- Insert or update login attempt record
  INSERT INTO public.login_attempts (
    email, ip_address, success, blocked_until, attempt_count
  ) VALUES (
    p_email, p_ip_address, false, 
    CASE WHEN block_duration IS NOT NULL THEN now() + block_duration ELSE NULL END,
    1
  )
  ON CONFLICT (email, ip_address) 
  WHERE created_at > now() - INTERVAL '1 hour'
  DO UPDATE SET
    attempt_count = login_attempts.attempt_count + 1,
    blocked_until = CASE WHEN block_duration IS NOT NULL THEN now() + block_duration ELSE login_attempts.blocked_until END,
    created_at = now();
  
  RETURN result;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_security_anomalies_updated_at
  BEFORE UPDATE ON public.security_anomalies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_encrypted_data_updated_at
  BEFORE UPDATE ON public.encrypted_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_retention_policies_updated_at
  BEFORE UPDATE ON public.data_retention_policies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();