-- Create user achievements table to track user progress and accomplishments
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_type TEXT NOT NULL, -- 'module_completion', 'skill_milestone', 'goal_reached', 'learning_streak', 'assessment_score'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'progress', -- 'progress', 'milestone', 'certification', 'skill'
  points_earned INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}', -- store additional data like scores, streaks, etc.
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_viewed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own achievements
CREATE POLICY "Users can manage their own achievements"
ON public.user_achievements
FOR ALL
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX idx_user_achievements_type ON public.user_achievements(achievement_type);
CREATE INDEX idx_user_achievements_unlocked_at ON public.user_achievements(unlocked_at DESC);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_achievements_updated_at
BEFORE UPDATE ON public.user_achievements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();