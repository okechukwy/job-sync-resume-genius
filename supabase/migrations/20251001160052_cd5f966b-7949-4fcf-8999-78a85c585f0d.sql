-- Remove duplicate DevOps modules, keeping only the first one
DELETE FROM public.learning_modules 
WHERE title = 'DevOps Fundamentals: CI/CD, Docker & Kubernetes' 
  AND id NOT IN (
    SELECT id FROM public.learning_modules 
    WHERE title = 'DevOps Fundamentals: CI/CD, Docker & Kubernetes' 
    ORDER BY created_at ASC 
    LIMIT 1
  );