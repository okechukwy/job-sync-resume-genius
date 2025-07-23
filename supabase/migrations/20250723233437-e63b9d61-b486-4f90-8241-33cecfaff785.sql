-- Create white_label_configs table for storing user branding configurations
CREATE TABLE public.white_label_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  config_name TEXT NOT NULL DEFAULT 'Default Config',
  company_name TEXT,
  company_logo_url TEXT,
  primary_color TEXT DEFAULT '#3b82f6',
  secondary_color TEXT DEFAULT '#1e40af',
  accent_color TEXT DEFAULT '#06b6d4',
  font_family TEXT DEFAULT 'Inter',
  footer_text TEXT,
  watermark_enabled BOOLEAN DEFAULT false,
  watermark_text TEXT,
  email_signature TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create export_jobs table for tracking export requests
CREATE TABLE public.export_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  config_id UUID REFERENCES public.white_label_configs(id),
  resume_id UUID,
  client_name TEXT,
  export_format TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  file_url TEXT,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create export_history table for maintaining export records
CREATE TABLE public.export_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  job_id UUID REFERENCES public.export_jobs(id),
  export_type TEXT NOT NULL,
  client_name TEXT,
  format TEXT NOT NULL,
  file_size INTEGER,
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.white_label_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for white_label_configs
CREATE POLICY "Users can manage their own white label configs" 
ON public.white_label_configs 
FOR ALL 
USING (auth.uid() = user_id);

-- Create RLS policies for export_jobs
CREATE POLICY "Users can manage their own export jobs" 
ON public.export_jobs 
FOR ALL 
USING (auth.uid() = user_id);

-- Create RLS policies for export_history
CREATE POLICY "Users can view their own export history" 
ON public.export_history 
FOR ALL 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_white_label_configs_user_id ON public.white_label_configs(user_id);
CREATE INDEX idx_export_jobs_user_id ON public.export_jobs(user_id);
CREATE INDEX idx_export_jobs_status ON public.export_jobs(status);
CREATE INDEX idx_export_history_user_id ON public.export_history(user_id);

-- Create trigger for updating timestamps
CREATE TRIGGER update_white_label_configs_updated_at
BEFORE UPDATE ON public.white_label_configs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();