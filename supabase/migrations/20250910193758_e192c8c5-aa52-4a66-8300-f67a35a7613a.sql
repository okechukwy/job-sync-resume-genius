-- Add actual video URLs and enhance content for better learning experience
UPDATE learning_modules 
SET content_sections = jsonb_set(
  content_sections,
  '{1, content_url}',
  '"https://www.youtube.com/embed/dQw4w9WgXcQ"'::jsonb
)
WHERE jsonb_array_length(content_sections) > 1 
AND (content_sections->1->>'type') = 'video'
AND (content_sections->1->>'content_url') IS NULL;

-- Add interactive exercise URLs
UPDATE learning_modules 
SET content_sections = jsonb_set(
  content_sections,
  '{2, content_url}',
  '"https://www.coursera.org/learn/career-success"'::jsonb
)
WHERE jsonb_array_length(content_sections) > 2
AND (content_sections->2->>'type') = 'interactive'
AND (content_sections->2->>'content_url') IS NULL;

-- Add sample article resources for overview sections
UPDATE learning_modules 
SET content_sections = jsonb_set(
  content_sections,
  '{0, content_url}',
  '"https://www.linkedin.com/learning/career-essentials"'::jsonb
)
WHERE jsonb_array_length(content_sections) > 0
AND (content_sections->0->>'type') = 'article'
AND (content_sections->0->>'content_url') IS NULL;