-- Add enhanced content support columns to learning_modules
ALTER TABLE learning_modules 
ADD COLUMN IF NOT EXISTS learning_outcomes TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS target_audience TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS industry_applications TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS practical_applications TEXT[] DEFAULT '{}';