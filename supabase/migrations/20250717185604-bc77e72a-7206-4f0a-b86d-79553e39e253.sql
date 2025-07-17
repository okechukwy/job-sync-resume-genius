-- Create user resumes table
CREATE TABLE public.user_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'My Resume',
  template_id TEXT NOT NULL,
  personal_info JSONB NOT NULL DEFAULT '{}',
  summary JSONB NOT NULL DEFAULT '{}',
  experience JSONB NOT NULL DEFAULT '[]',
  education JSONB NOT NULL DEFAULT '[]',
  skills JSONB NOT NULL DEFAULT '{}',
  certificates JSONB NOT NULL DEFAULT '[]',
  projects JSONB NOT NULL DEFAULT '[]',
  languages JSONB NOT NULL DEFAULT '[]',
  volunteering JSONB NOT NULL DEFAULT '[]',
  awards JSONB NOT NULL DEFAULT '[]',
  publications JSONB NOT NULL DEFAULT '[]',
  interests JSONB NOT NULL DEFAULT '{}',
  additional_info JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create CV analysis results table
CREATE TABLE public.cv_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  overall_score INTEGER NOT NULL,
  ats_score INTEGER NOT NULL,
  sections JSONB NOT NULL DEFAULT '{}',
  keywords JSONB NOT NULL DEFAULT '{}',
  improvements JSONB NOT NULL DEFAULT '[]',
  analysis_type TEXT DEFAULT 'ai_generated',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create LinkedIn profiles table
CREATE TABLE public.linkedin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  headline TEXT,
  summary TEXT,
  location TEXT,
  industry TEXT,
  experience JSONB NOT NULL DEFAULT '[]',
  education JSONB NOT NULL DEFAULT '[]',
  skills JSONB NOT NULL DEFAULT '[]',
  contact_info JSONB NOT NULL DEFAULT '{}',
  photo_uploaded BOOLEAN DEFAULT false,
  background_uploaded BOOLEAN DEFAULT false,
  custom_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create interview sessions table
CREATE TABLE public.interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT NOT NULL,
  role_focus TEXT,
  questions JSONB NOT NULL DEFAULT '[]',
  responses JSONB NOT NULL DEFAULT '[]',
  scores JSONB NOT NULL DEFAULT '{}',
  feedback JSONB NOT NULL DEFAULT '{}',
  duration_minutes INTEGER,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user files storage table
CREATE TABLE public.user_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  purpose TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create AI generation history table
CREATE TABLE public.ai_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  generation_type TEXT NOT NULL,
  input_data JSONB NOT NULL,
  output_data JSONB NOT NULL,
  tokens_used INTEGER,
  model_used TEXT,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_resumes
CREATE POLICY "Users can manage their own resumes" ON public.user_resumes
FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for cv_analyses
CREATE POLICY "Users can manage their own CV analyses" ON public.cv_analyses
FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for linkedin_profiles
CREATE POLICY "Users can manage their own LinkedIn profiles" ON public.linkedin_profiles
FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for interview_sessions
CREATE POLICY "Users can manage their own interview sessions" ON public.interview_sessions
FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for user_files
CREATE POLICY "Users can manage their own files" ON public.user_files
FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for ai_generations
CREATE POLICY "Users can manage their own AI generations" ON public.ai_generations
FOR ALL USING (auth.uid() = user_id);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES 
  ('cv-uploads', 'cv-uploads', false, 10485760, ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']),
  ('profile-images', 'profile-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('background-images', 'background-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- Create storage policies for cv-uploads
CREATE POLICY "Users can upload their own CVs" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'cv-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own CVs" ON storage.objects
FOR SELECT USING (bucket_id = 'cv-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own CVs" ON storage.objects
FOR UPDATE USING (bucket_id = 'cv-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own CVs" ON storage.objects
FOR DELETE USING (bucket_id = 'cv-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for profile-images
CREATE POLICY "Profile images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Users can upload their own profile images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own profile images" ON storage.objects
FOR UPDATE USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile images" ON storage.objects
FOR DELETE USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for background-images
CREATE POLICY "Background images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'background-images');

CREATE POLICY "Users can upload their own background images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'background-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own background images" ON storage.objects
FOR UPDATE USING (bucket_id = 'background-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own background images" ON storage.objects
FOR DELETE USING (bucket_id = 'background-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create trigger for updated_at columns
CREATE TRIGGER update_user_resumes_updated_at
BEFORE UPDATE ON public.user_resumes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_linkedin_profiles_updated_at
BEFORE UPDATE ON public.linkedin_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();