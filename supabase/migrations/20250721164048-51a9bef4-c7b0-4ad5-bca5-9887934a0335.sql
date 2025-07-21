
-- Update the check constraint to include interview_in_progress status
ALTER TABLE public.job_applications 
DROP CONSTRAINT job_applications_status_check;

ALTER TABLE public.job_applications 
ADD CONSTRAINT job_applications_status_check 
CHECK (status = ANY (ARRAY[
  'applied'::text, 
  'under_review'::text, 
  'interview_scheduled'::text, 
  'interview_in_progress'::text,
  'interview_completed'::text, 
  'offer_received'::text, 
  'rejected'::text, 
  'withdrawn'::text
]));
