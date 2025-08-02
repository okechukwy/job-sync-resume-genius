-- Create enhancement history tracking table
CREATE TABLE public.cv_enhancement_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  cv_analysis_id UUID,
  original_content_hash TEXT NOT NULL,
  enhanced_content_hash TEXT,
  improvement_round INTEGER NOT NULL DEFAULT 1,
  applied_improvements JSONB NOT NULL DEFAULT '[]'::jsonb,
  content_changes JSONB NOT NULL DEFAULT '{}'::jsonb,
  optimization_areas JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cv_enhancement_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own enhancement history"
ON public.cv_enhancement_history
FOR ALL
USING (auth.uid() = user_id);

-- Add enhancement tracking to cv_analyses table
ALTER TABLE public.cv_analyses ADD COLUMN IF NOT EXISTS enhancement_round INTEGER DEFAULT 1;
ALTER TABLE public.cv_analyses ADD COLUMN IF NOT EXISTS previous_analysis_id UUID;
ALTER TABLE public.cv_analyses ADD COLUMN IF NOT EXISTS applied_improvements JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.cv_analyses ADD COLUMN IF NOT EXISTS content_hash TEXT;

-- Create trigger for updated_at
CREATE TRIGGER update_cv_enhancement_history_updated_at
BEFORE UPDATE ON public.cv_enhancement_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();