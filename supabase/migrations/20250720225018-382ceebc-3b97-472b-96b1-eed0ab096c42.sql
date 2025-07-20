
-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  position_title TEXT NOT NULL,
  job_description TEXT,
  date_applied DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'under_review', 'interview_scheduled', 'interview_completed', 'offer_received', 'rejected', 'withdrawn')),
  current_stage TEXT NOT NULL DEFAULT 'application_submitted' CHECK (current_stage IN ('application_submitted', 'hr_screening', 'technical_interview', 'final_interview', 'background_check', 'negotiation', 'completed')),
  resume_version TEXT,
  ats_score INTEGER CHECK (ats_score >= 0 AND ats_score <= 100),
  salary_range_min INTEGER,
  salary_range_max INTEGER,
  job_location TEXT,
  application_source TEXT,
  notes TEXT,
  follow_up_date DATE,
  interview_dates JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create application stages tracking table
CREATE TABLE public.application_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.job_applications(id) ON DELETE CASCADE NOT NULL,
  stage_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'skipped', 'failed')),
  date_entered TIMESTAMP WITH TIME ZONE DEFAULT now(),
  date_completed TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create performance metrics table for cached calculations
CREATE TABLE public.performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  metric_period TEXT NOT NULL CHECK (metric_period IN ('all_time', '30_days', '90_days', '180_days', '1_year')),
  total_applications INTEGER DEFAULT 0,
  responses_received INTEGER DEFAULT 0,
  interviews_scheduled INTEGER DEFAULT 0,
  offers_received INTEGER DEFAULT 0,
  response_rate DECIMAL(5,2) DEFAULT 0,
  interview_rate DECIMAL(5,2) DEFAULT 0,
  offer_rate DECIMAL(5,2) DEFAULT 0,
  avg_ats_score DECIMAL(5,2) DEFAULT 0,
  most_successful_resume_version TEXT,
  top_performing_companies JSONB DEFAULT '[]'::jsonb,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, metric_period)
);

-- Enable Row Level Security
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for job_applications
CREATE POLICY "Users can manage their own job applications" ON public.job_applications
FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for application_stages
CREATE POLICY "Users can manage their own application stages" ON public.application_stages
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.job_applications 
    WHERE job_applications.id = application_stages.application_id 
    AND job_applications.user_id = auth.uid()
  )
);

-- Create RLS policies for performance_metrics
CREATE POLICY "Users can manage their own performance metrics" ON public.performance_metrics
FOR ALL USING (auth.uid() = user_id);

-- Create function to update performance metrics
CREATE OR REPLACE FUNCTION public.calculate_performance_metrics(user_uuid UUID, period TEXT DEFAULT 'all_time')
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  date_filter TIMESTAMP WITH TIME ZONE;
  total_apps INTEGER;
  responses INTEGER;
  interviews INTEGER;
  offers INTEGER;
  avg_ats DECIMAL(5,2);
  top_resume TEXT;
BEGIN
  -- Set date filter based on period
  CASE period
    WHEN '30_days' THEN date_filter := now() - interval '30 days';
    WHEN '90_days' THEN date_filter := now() - interval '90 days';
    WHEN '180_days' THEN date_filter := now() - interval '180 days';
    WHEN '1_year' THEN date_filter := now() - interval '1 year';
    ELSE date_filter := '1900-01-01'::timestamp;
  END CASE;

  -- Calculate metrics
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE status IN ('under_review', 'interview_scheduled', 'interview_completed', 'offer_received')),
    COUNT(*) FILTER (WHERE status IN ('interview_scheduled', 'interview_completed', 'offer_received')),
    COUNT(*) FILTER (WHERE status = 'offer_received'),
    AVG(ats_score) FILTER (WHERE ats_score IS NOT NULL)
  INTO total_apps, responses, interviews, offers, avg_ats
  FROM public.job_applications
  WHERE user_id = user_uuid 
    AND created_at >= date_filter;

  -- Get most successful resume version
  SELECT resume_version
  INTO top_resume
  FROM public.job_applications
  WHERE user_id = user_uuid 
    AND created_at >= date_filter
    AND status = 'offer_received'
  GROUP BY resume_version
  ORDER BY COUNT(*) DESC
  LIMIT 1;

  -- Insert or update metrics
  INSERT INTO public.performance_metrics (
    user_id, 
    metric_period, 
    total_applications,
    responses_received,
    interviews_scheduled,
    offers_received,
    response_rate,
    interview_rate,
    offer_rate,
    avg_ats_score,
    most_successful_resume_version,
    calculated_at,
    updated_at
  ) VALUES (
    user_uuid,
    period,
    COALESCE(total_apps, 0),
    COALESCE(responses, 0),
    COALESCE(interviews, 0),
    COALESCE(offers, 0),
    CASE WHEN total_apps > 0 THEN ROUND((responses::DECIMAL / total_apps) * 100, 2) ELSE 0 END,
    CASE WHEN total_apps > 0 THEN ROUND((interviews::DECIMAL / total_apps) * 100, 2) ELSE 0 END,
    CASE WHEN total_apps > 0 THEN ROUND((offers::DECIMAL / total_apps) * 100, 2) ELSE 0 END,
    COALESCE(avg_ats, 0),
    top_resume,
    now(),
    now()
  )
  ON CONFLICT (user_id, metric_period)
  DO UPDATE SET
    total_applications = EXCLUDED.total_applications,
    responses_received = EXCLUDED.responses_received,
    interviews_scheduled = EXCLUDED.interviews_scheduled,
    offers_received = EXCLUDED.offers_received,
    response_rate = EXCLUDED.response_rate,
    interview_rate = EXCLUDED.interview_rate,
    offer_rate = EXCLUDED.offer_rate,
    avg_ats_score = EXCLUDED.avg_ats_score,
    most_successful_resume_version = EXCLUDED.most_successful_resume_version,
    calculated_at = EXCLUDED.calculated_at,
    updated_at = EXCLUDED.updated_at;
END;
$$;

-- Create trigger to automatically update metrics when applications change
CREATE OR REPLACE FUNCTION public.trigger_update_performance_metrics()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update metrics for all periods
  PERFORM public.calculate_performance_metrics(COALESCE(NEW.user_id, OLD.user_id), 'all_time');
  PERFORM public.calculate_performance_metrics(COALESCE(NEW.user_id, OLD.user_id), '30_days');
  PERFORM public.calculate_performance_metrics(COALESCE(NEW.user_id, OLD.user_id), '90_days');
  PERFORM public.calculate_performance_metrics(COALESCE(NEW.user_id, OLD.user_id), '180_days');
  PERFORM public.calculate_performance_metrics(COALESCE(NEW.user_id, OLD.user_id), '1_year');
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create triggers for automatic metric updates
CREATE TRIGGER update_performance_metrics_on_application_change
AFTER INSERT OR UPDATE OR DELETE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.trigger_update_performance_metrics();

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_performance_metrics_updated_at
BEFORE UPDATE ON public.performance_metrics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
