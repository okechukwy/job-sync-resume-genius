-- Clean up duplicate learning modules and standardize Leadership Excellence Program
-- Delete duplicate modules, keeping the oldest for consistency
DELETE FROM learning_modules 
WHERE id IN (
  SELECT id FROM (
    SELECT id, 
           ROW_NUMBER() OVER (PARTITION BY program_id, title ORDER BY created_at ASC) as rn
    FROM learning_modules
  ) t 
  WHERE t.rn > 1
);

-- Delete existing Leadership Excellence modules to start fresh
DELETE FROM learning_modules WHERE program_id = '756c7123-31a1-4e01-b9fc-28856d5fe2cc';

-- Insert standardized Leadership Excellence Program modules with enhanced content structure
INSERT INTO learning_modules (
  id, program_id, title, description, content_type, duration_minutes, 
  learning_objectives, prerequisites, order_index, content_sections, 
  practical_applications, target_audience, industry_applications
) VALUES 
(
  '24f320e8-308a-4e08-b483-0e17f9bba7fc',
  '756c7123-31a1-4e01-b9fc-28856d5fe2cc',
  'Foundations of Leadership',
  'Master the fundamental principles of leadership and develop your core leadership competencies.',
  'enhanced_interactive',
  90,
  ARRAY['Understand leadership vs management', 'Develop self-awareness', 'Build trust and credibility', 'Master communication fundamentals'],
  ARRAY[]::text[],
  1,
  '[{"id": "foundations", "title": "Leadership Foundation & Self-Assessment", "type": "interactive", "duration_minutes": 45}, {"id": "trust-communication", "title": "Building Trust & Communication Excellence", "type": "case_study", "duration_minutes": 45}]'::jsonb,
  ARRAY['Team leadership scenarios', 'Conflict resolution', 'Performance management', 'Change leadership'],
  ARRAY['New managers', 'Team leads', 'Individual contributors moving to leadership'],
  ARRAY['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Consulting']
),
(
  'b8e3f9d2-4c1a-4b7e-9e8f-1234567890ab',
  '756c7123-31a1-4e01-b9fc-28856d5fe2cc',
  'Strategic Decision Making',
  'Learn frameworks for making effective strategic decisions and managing complex business scenarios.',
  'interactive',
  75,
  ARRAY['Apply decision-making frameworks', 'Analyze complex scenarios', 'Manage risk and uncertainty', 'Communicate decisions effectively'],
  ARRAY['Foundations of Leadership'],
  2,
  '[{"id": "frameworks", "title": "Decision-Making Frameworks", "type": "article", "duration_minutes": 35}, {"id": "scenarios", "title": "Strategic Scenario Analysis", "type": "interactive", "duration_minutes": 40}]'::jsonb,
  ARRAY['Strategic planning', 'Crisis management', 'Resource allocation', 'Market entry decisions'],
  ARRAY['Senior managers', 'Directors', 'VPs', 'C-level executives'],
  ARRAY['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Consulting']
),
(
  'c9f4a0e3-5d2b-4c8f-0f9a-2345678901bc',
  '756c7123-31a1-4e01-b9fc-28856d5fe2cc',
  'Team Development & Performance',
  'Build high-performing teams through effective development strategies and performance management.',
  'interactive',
  80,
  ARRAY['Design team development plans', 'Implement performance management systems', 'Foster team collaboration', 'Handle difficult conversations'],
  ARRAY['Foundations of Leadership'],
  3,
  '[{"id": "development", "title": "Team Development Strategies", "type": "framework", "duration_minutes": 40}, {"id": "performance", "title": "Performance Management Excellence", "type": "case_study", "duration_minutes": 40}]'::jsonb,
  ARRAY['Team coaching', 'Performance reviews', 'Talent development', 'Succession planning'],
  ARRAY['Team managers', 'HR leaders', 'Department heads', 'Project managers'],
  ARRAY['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Consulting']
),
(
  'd0a5b1f4-6e3c-4d9a-1a0b-3456789012cd',
  '756c7123-31a1-4e01-b9fc-28856d5fe2cc',
  'Change Leadership & Innovation',
  'Master the art of leading organizational change and fostering innovation within teams.',
  'interactive',
  85,
  ARRAY['Lead change initiatives', 'Overcome resistance', 'Foster innovation culture', 'Communicate change vision'],
  ARRAY['Foundations of Leadership', 'Strategic Decision Making'],
  4,
  '[{"id": "change", "title": "Change Management Mastery", "type": "framework", "duration_minutes": 45}, {"id": "innovation", "title": "Innovation Leadership", "type": "interactive", "duration_minutes": 40}]'::jsonb,
  ARRAY['Digital transformation', 'Process improvement', 'Cultural change', 'Product innovation'],
  ARRAY['Change agents', 'Innovation leaders', 'Senior managers', 'Transformation leads'],
  ARRAY['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Consulting']
),
(
  'e1b6c2a5-7f4d-4e0b-2b1c-4567890123de',
  '756c7123-31a1-4e01-b9fc-28856d5fe2cc',
  'Executive Presence & Influence',
  'Develop executive presence and master advanced influence techniques for senior leadership roles.',
  'interactive',
  70,
  ARRAY['Build executive presence', 'Master influence without authority', 'Communicate with impact', 'Navigate organizational politics'],
  ARRAY['Strategic Decision Making', 'Team Development & Performance'],
  5,
  '[{"id": "presence", "title": "Executive Presence Development", "type": "assessment", "duration_minutes": 35}, {"id": "influence", "title": "Advanced Influence Techniques", "type": "interactive", "duration_minutes": 35}]'::jsonb,
  ARRAY['Board presentations', 'Stakeholder management', 'Cross-functional leadership', 'Executive communication'],
  ARRAY['Senior executives', 'C-level leaders', 'Board members', 'Executive candidates'],
  ARRAY['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Consulting']
);