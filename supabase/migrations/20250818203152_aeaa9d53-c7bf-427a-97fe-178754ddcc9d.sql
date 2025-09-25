-- Add content sections to learning modules
ALTER TABLE public.learning_modules 
ADD COLUMN IF NOT EXISTS content_sections JSONB DEFAULT '[]'::jsonb;

-- Update existing learning modules with structured content sections for video content
UPDATE public.learning_modules 
SET content_sections = jsonb_build_array(
  jsonb_build_object(
    'id', 'introduction',
    'title', 'Introduction', 
    'type', 'video',
    'content_url', COALESCE(content_url, ''),
    'duration_minutes', 5,
    'description', 'Welcome and module overview',
    'is_required', true,
    'order_index', 1
  ),
  jsonb_build_object(
    'id', 'main_content',
    'title', 'Main Video Content',
    'type', 'video', 
    'content_url', COALESCE(content_url, ''),
    'duration_minutes', GREATEST(duration_minutes - 10, 15),
    'description', 'Core learning content',
    'is_required', true,
    'order_index', 2
  ),
  jsonb_build_object(
    'id', 'knowledge_check',
    'title', 'Knowledge Check',
    'type', 'assessment',
    'content', jsonb_build_object(
      'questions', jsonb_build_array(
        jsonb_build_object(
          'question', 'What are the key concepts covered in this module?',
          'type', 'multiple_choice',
          'options', jsonb_build_array('Basic concepts', 'Advanced strategies', 'Practical applications', 'All of the above'),
          'correct_answer', 3
        )
      )
    ),
    'duration_minutes', 5,
    'description', 'Test your understanding', 
    'is_required', true,
    'order_index', 3
  )
)
WHERE content_type = 'video' AND (content_sections = '[]'::jsonb OR content_sections IS NULL);

-- Update interactive content
UPDATE public.learning_modules
SET content_sections = jsonb_build_array(
  jsonb_build_object(
    'id', 'overview',
    'title', 'Module Overview',
    'type', 'article',
    'content', jsonb_build_object(
      'text', description,
      'key_points', to_jsonb(learning_objectives)
    ),
    'duration_minutes', 5,
    'description', 'Understanding the module goals',
    'is_required', true,
    'order_index', 1
  ),
  jsonb_build_object(
    'id', 'interactive_exercise', 
    'title', 'Interactive Exercise',
    'type', 'interactive',
    'content_url', COALESCE(content_url, ''),
    'content', jsonb_build_object(
      'exercise_type', 'simulation',
      'instructions', 'Apply the concepts in this hands-on exercise'
    ),
    'duration_minutes', GREATEST(duration_minutes - 15, 20),
    'description', 'Hands-on practice session',
    'is_required', true,
    'order_index', 2
  ),
  jsonb_build_object(
    'id', 'reflection',
    'title', 'Reflection & Next Steps',
    'type', 'article',
    'content', jsonb_build_object(
      'text', 'Reflect on what you have learned and plan your next steps.',
      'reflection_questions', jsonb_build_array(
        'What was the most valuable insight from this exercise?',
        'How will you apply this in your work?',
        'What areas need more practice?'
      )
    ),
    'duration_minutes', 10,
    'description', 'Consolidate your learning',
    'is_required', true,
    'order_index', 3
  )
)
WHERE content_type = 'interactive' AND (content_sections = '[]'::jsonb OR content_sections IS NULL);

-- Update other content types
UPDATE public.learning_modules
SET content_sections = jsonb_build_array(
  jsonb_build_object(
    'id', 'introduction',
    'title', 'Getting Started',
    'type', 'article',
    'content', jsonb_build_object(
      'text', description,
      'objectives', to_jsonb(learning_objectives)
    ),
    'duration_minutes', 10,
    'description', 'Module introduction and objectives',
    'is_required', true,
    'order_index', 1
  ),
  jsonb_build_object(
    'id', 'content',
    'title', 'Learning Materials', 
    'type', 'article',
    'content_url', COALESCE(content_url, ''),
    'content', jsonb_build_object(
      'text', 'Comprehensive learning materials covering all key concepts.'
    ),
    'duration_minutes', GREATEST(duration_minutes - 10, 15),
    'description', 'Core learning content',
    'is_required', true,
    'order_index', 2
  )
)
WHERE content_type NOT IN ('video', 'interactive') AND (content_sections = '[]'::jsonb OR content_sections IS NULL);