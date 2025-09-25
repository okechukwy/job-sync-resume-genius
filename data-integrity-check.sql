-- Data Integrity Check for Core Leadership Principles Module
-- This script verifies that the data displayed in the UI matches the database

-- 1. Find the "Foundations of Leadership" module
SELECT 
  id,
  title,
  description,
  duration_minutes,
  learning_objectives,
  content_sections
FROM learning_modules 
WHERE title = 'Foundations of Leadership';

-- 2. Extract and verify the "Core Leadership Principles" section specifically
SELECT 
  id,
  title,
  json_extract(content_sections, '$[0]') as core_leadership_section,
  json_extract(content_sections, '$[0].title') as section_title,
  json_extract(content_sections, '$[0].duration_minutes') as section_duration,
  json_extract(content_sections, '$[0].content.text') as section_text,
  json_extract(content_sections, '$[0].content.key_points') as key_points,
  json_extract(content_sections, '$[0].content.objectives') as objectives
FROM learning_modules 
WHERE title = 'Foundations of Leadership';

-- 3. Verify key points count and content
SELECT 
  title,
  json_array_length(json_extract(content_sections, '$[0].content.key_points')) as key_points_count,
  json_array_length(json_extract(content_sections, '$[0].content.objectives')) as objectives_count
FROM learning_modules 
WHERE title = 'Foundations of Leadership';

-- 4. Extract individual key points for comparison
SELECT 
  title,
  json_extract(json_extract(content_sections, '$[0].content.key_points'), '$[0]') as key_point_1,
  json_extract(json_extract(content_sections, '$[0].content.key_points'), '$[1]') as key_point_2,
  json_extract(json_extract(content_sections, '$[0].content.key_points'), '$[2]') as key_point_3,
  json_extract(json_extract(content_sections, '$[0].content.key_points'), '$[3]') as key_point_4
FROM learning_modules 
WHERE title = 'Foundations of Leadership';

-- 5. Extract individual learning objectives for comparison
SELECT 
  title,
  json_extract(json_extract(content_sections, '$[0].content.objectives'), '$[0]') as objective_1,
  json_extract(json_extract(content_sections, '$[0].content.objectives'), '$[1]') as objective_2,
  json_extract(json_extract(content_sections, '$[0].content.objectives'), '$[2]') as objective_3
FROM learning_modules 
WHERE title = 'Foundations of Leadership';

-- 6. Get the coaching program information
SELECT 
  cp.id as program_id,
  cp.title as program_title,
  cp.description as program_description,
  lm.id as module_id,
  lm.title as module_title,
  lm.duration_minutes as module_duration
FROM coaching_programs cp
JOIN learning_modules lm ON cp.id = lm.program_id
WHERE lm.title = 'Foundations of Leadership';

-- 7. Verify the complete content structure matches expectations
SELECT 
  title,
  content_sections::text as full_content_json
FROM learning_modules 
WHERE title = 'Foundations of Leadership';