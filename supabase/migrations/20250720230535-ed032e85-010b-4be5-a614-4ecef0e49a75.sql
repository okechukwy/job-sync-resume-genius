
-- Add version management fields to user_resumes table
ALTER TABLE public.user_resumes 
ADD COLUMN version_number INTEGER DEFAULT 1,
ADD COLUMN parent_resume_id UUID REFERENCES public.user_resumes(id),
ADD COLUMN description TEXT,
ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE;

-- Create index for better performance on version queries
CREATE INDEX idx_user_resumes_version ON public.user_resumes(user_id, version_number);
CREATE INDEX idx_user_resumes_parent ON public.user_resumes(parent_resume_id);

-- Create function to get resume version metrics
CREATE OR REPLACE FUNCTION public.get_resume_version_metrics(resume_id UUID)
RETURNS TABLE (
  total_applications INTEGER,
  responses_received INTEGER,
  interviews_scheduled INTEGER,
  offers_received INTEGER,
  avg_ats_score DECIMAL(5,2),
  response_rate DECIMAL(5,2),
  interview_rate DECIMAL(5,2),
  offer_rate DECIMAL(5,2)
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as total_applications,
    COUNT(*) FILTER (WHERE ja.status IN ('under_review', 'interview_scheduled', 'interview_completed', 'offer_received'))::INTEGER as responses_received,
    COUNT(*) FILTER (WHERE ja.status IN ('interview_scheduled', 'interview_completed', 'offer_received'))::INTEGER as interviews_scheduled,
    COUNT(*) FILTER (WHERE ja.status = 'offer_received')::INTEGER as offers_received,
    AVG(ja.ats_score) FILTER (WHERE ja.ats_score IS NOT NULL) as avg_ats_score,
    CASE WHEN COUNT(*) > 0 THEN 
      ROUND((COUNT(*) FILTER (WHERE ja.status IN ('under_review', 'interview_scheduled', 'interview_completed', 'offer_received'))::DECIMAL / COUNT(*)) * 100, 2)
      ELSE 0 
    END as response_rate,
    CASE WHEN COUNT(*) > 0 THEN 
      ROUND((COUNT(*) FILTER (WHERE ja.status IN ('interview_scheduled', 'interview_completed', 'offer_received'))::DECIMAL / COUNT(*)) * 100, 2)
      ELSE 0 
    END as interview_rate,
    CASE WHEN COUNT(*) > 0 THEN 
      ROUND((COUNT(*) FILTER (WHERE ja.status = 'offer_received')::DECIMAL / COUNT(*)) * 100, 2)
      ELSE 0 
    END as offer_rate
  FROM public.job_applications ja
  WHERE ja.resume_version = resume_id::TEXT
    AND EXISTS (
      SELECT 1 FROM public.user_resumes ur 
      WHERE ur.id = resume_id 
      AND ur.user_id = auth.uid()
    );
END;
$$;

-- Update existing resumes to have proper version numbers
UPDATE public.user_resumes 
SET version_number = 1 
WHERE version_number IS NULL;

-- Make version_number NOT NULL after setting defaults
ALTER TABLE public.user_resumes 
ALTER COLUMN version_number SET NOT NULL;
