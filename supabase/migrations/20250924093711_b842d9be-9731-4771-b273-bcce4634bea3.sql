-- Fix search_path security issues for all functions
ALTER FUNCTION public.create_trial_subscription() SET search_path = public;
ALTER FUNCTION public.is_trial_expired(uuid) SET search_path = public;
ALTER FUNCTION public.get_trial_days_remaining(uuid) SET search_path = public;
ALTER FUNCTION public.trigger_update_performance_metrics() SET search_path = public;
ALTER FUNCTION public.calculate_performance_metrics(uuid, text) SET search_path = public;
ALTER FUNCTION public.get_resume_version_metrics(uuid) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.detect_login_anomaly(uuid, inet, text, text) SET search_path = public;
ALTER FUNCTION public.check_brute_force_protection(text, inet) SET search_path = public;