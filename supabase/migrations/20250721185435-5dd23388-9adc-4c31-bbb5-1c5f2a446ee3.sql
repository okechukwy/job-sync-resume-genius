
-- Update the calculate_performance_metrics function to provide granular interview metrics
CREATE OR REPLACE FUNCTION public.calculate_performance_metrics(user_uuid uuid, period text DEFAULT 'all_time'::text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  date_filter TIMESTAMP WITH TIME ZONE;
  total_apps INTEGER;
  responses INTEGER;
  interviews INTEGER;
  interviews_scheduled_count INTEGER;
  interviews_in_progress_count INTEGER;
  interviews_completed_count INTEGER;
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

  -- Calculate metrics with granular interview breakdowns
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE status IN ('under_review', 'interview_scheduled', 'interview_in_progress', 'interview_completed', 'offer_received')),
    COUNT(*) FILTER (WHERE status IN ('interview_scheduled', 'interview_in_progress', 'interview_completed', 'offer_received')),
    COUNT(*) FILTER (WHERE status = 'interview_scheduled'),
    COUNT(*) FILTER (WHERE status = 'interview_in_progress'),
    COUNT(*) FILTER (WHERE status = 'interview_completed'),
    COUNT(*) FILTER (WHERE status = 'offer_received'),
    AVG(ats_score) FILTER (WHERE ats_score IS NOT NULL)
  INTO total_apps, responses, interviews, interviews_scheduled_count, interviews_in_progress_count, interviews_completed_count, offers, avg_ats
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
$function$

-- Add new columns to performance_metrics table for granular interview tracking
ALTER TABLE public.performance_metrics 
ADD COLUMN IF NOT EXISTS interviews_scheduled_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS interviews_in_progress_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS interviews_completed_count integer DEFAULT 0;

-- Update the function to store granular interview counts
CREATE OR REPLACE FUNCTION public.calculate_performance_metrics(user_uuid uuid, period text DEFAULT 'all_time'::text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  date_filter TIMESTAMP WITH TIME ZONE;
  total_apps INTEGER;
  responses INTEGER;
  interviews INTEGER;
  interviews_scheduled_count INTEGER;
  interviews_in_progress_count INTEGER;
  interviews_completed_count INTEGER;
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

  -- Calculate metrics with granular interview breakdowns
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE status IN ('under_review', 'interview_scheduled', 'interview_in_progress', 'interview_completed', 'offer_received')),
    COUNT(*) FILTER (WHERE status IN ('interview_scheduled', 'interview_in_progress', 'interview_completed', 'offer_received')),
    COUNT(*) FILTER (WHERE status = 'interview_scheduled'),
    COUNT(*) FILTER (WHERE status = 'interview_in_progress'),
    COUNT(*) FILTER (WHERE status = 'interview_completed'),
    COUNT(*) FILTER (WHERE status = 'offer_received'),
    AVG(ats_score) FILTER (WHERE ats_score IS NOT NULL)
  INTO total_apps, responses, interviews, interviews_scheduled_count, interviews_in_progress_count, interviews_completed_count, offers, avg_ats
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
    interviews_scheduled_count,
    interviews_in_progress_count,
    interviews_completed_count,
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
    COALESCE(interviews_scheduled_count, 0),
    COALESCE(interviews_in_progress_count, 0),
    COALESCE(interviews_completed_count, 0),
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
    interviews_scheduled_count = EXCLUDED.interviews_scheduled_count,
    interviews_in_progress_count = EXCLUDED.interviews_in_progress_count,
    interviews_completed_count = EXCLUDED.interviews_completed_count,
    offers_received = EXCLUDED.offers_received,
    response_rate = EXCLUDED.response_rate,
    interview_rate = EXCLUDED.interview_rate,
    offer_rate = EXCLUDED.offer_rate,
    avg_ats_score = EXCLUDED.avg_ats_score,
    most_successful_resume_version = EXCLUDED.most_successful_resume_version,
    calculated_at = EXCLUDED.calculated_at,
    updated_at = EXCLUDED.updated_at;
END;
$function$
