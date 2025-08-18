-- Create learning modules table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.learning_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'video',
  order_index INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  learning_objectives TEXT[] NOT NULL DEFAULT '{}',
  prerequisites TEXT[] NOT NULL DEFAULT '{}',
  is_required BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing learning modules
CREATE POLICY "Anyone can view active learning modules" 
ON public.learning_modules 
FOR SELECT 
USING (is_active = true);

-- Insert sample learning modules for Leadership Excellence Program
INSERT INTO public.learning_modules (program_id, title, description, content_type, order_index, duration_minutes, learning_objectives, prerequisites, is_required) VALUES
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Foundations of Leadership', 'Understand the core principles and theories of effective leadership in modern organizations.', 'video', 1, 45, '{"Identify different leadership styles", "Understand situational leadership", "Develop self-awareness as a leader"}', '{}', true),
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Strategic Thinking & Planning', 'Learn to think strategically and develop comprehensive plans for organizational success.', 'interactive', 2, 60, '{"Create strategic vision statements", "Develop SWOT analysis skills", "Build strategic roadmaps"}', '{"Foundations of Leadership"}', true),
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Team Management Excellence', 'Master the art of building, leading, and developing high-performing teams.', 'video', 3, 50, '{"Build effective teams", "Manage team dynamics", "Delegate effectively"}', '{"Foundations of Leadership"}', true),
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Executive Presence & Communication', 'Develop the presence and communication skills essential for senior leadership roles.', 'article', 4, 40, '{"Develop executive presence", "Master executive communication", "Build influence and credibility"}', '{"Team Management Excellence"}', true),
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Change Leadership Mastery', 'Learn to lead organizations through complex change initiatives and transformations.', 'assessment', 5, 35, '{"Lead change initiatives", "Manage resistance to change", "Create change management plans"}', '{"Strategic Thinking & Planning", "Executive Presence & Communication"}', true);

-- Insert sample learning modules for Technical Skills Acceleration
INSERT INTO public.learning_modules (program_id, title, description, content_type, order_index, duration_minutes, learning_objectives, prerequisites, is_required) VALUES
('5684db13-ad08-496e-894d-86d81a0d8966', 'Modern Programming Fundamentals', 'Master the core concepts of modern software development and programming best practices.', 'video', 1, 55, '{"Understand modern programming paradigms", "Write clean, maintainable code", "Apply design patterns"}', '{}', true),
('5684db13-ad08-496e-894d-86d81a0d8966', 'DevOps & CI/CD Practices', 'Learn essential DevOps practices, continuous integration, and deployment strategies.', 'interactive', 2, 75, '{"Set up CI/CD pipelines", "Implement infrastructure as code", "Master containerization"}', '{"Modern Programming Fundamentals"}', true),
('5684db13-ad08-496e-894d-86d81a0d8966', 'System Architecture & Design', 'Design scalable, maintainable software systems and understand architectural patterns.', 'article', 3, 65, '{"Design scalable architectures", "Choose appropriate design patterns", "Plan system integrations"}', '{"Modern Programming Fundamentals"}', true),
('5684db13-ad08-496e-894d-86d81a0d8966', 'Code Review & Quality Assurance', 'Master the art of code review, testing strategies, and quality assurance practices.', 'video', 4, 45, '{"Conduct effective code reviews", "Implement testing strategies", "Ensure code quality"}', '{"System Architecture & Design"}', true),
('5684db13-ad08-496e-894d-86d81a0d8966', 'Performance Optimization', 'Learn advanced techniques for optimizing application performance and scalability.', 'assessment', 5, 50, '{"Profile application performance", "Optimize database queries", "Implement caching strategies"}', '{"DevOps & CI/CD Practices", "Code Review & Quality Assurance"}', true);

-- Insert sample learning modules for Career Transition Mastery
INSERT INTO public.learning_modules (program_id, title, description, content_type, order_index, duration_minutes, learning_objectives, prerequisites, is_required) VALUES
('635ec236-225b-4583-8b41-2616ccfc4278', 'Career Self-Assessment & Discovery', 'Conduct a comprehensive assessment of your skills, values, and career aspirations.', 'interactive', 1, 40, '{"Complete skills inventory", "Identify career values", "Define career goals"}', '{}', true),
('635ec236-225b-4583-8b41-2616ccfc4278', 'Industry Research & Market Analysis', 'Research target industries, companies, and market trends for informed career decisions.', 'article', 2, 50, '{"Research industry trends", "Analyze company cultures", "Identify growth opportunities"}', '{"Career Self-Assessment & Discovery"}', true),
('635ec236-225b-4583-8b41-2616ccfc4278', 'Strategic Networking & Relationship Building', 'Build a powerful professional network and leverage relationships for career advancement.', 'video', 3, 45, '{"Build professional networks", "Leverage LinkedIn effectively", "Maintain relationships"}', '{"Industry Research & Market Analysis"}', true),
('635ec236-225b-4583-8b41-2616ccfc4278', 'Interview Mastery & Preparation', 'Master the interview process from preparation to follow-up for maximum success.', 'interactive', 4, 60, '{"Prepare for different interview types", "Answer behavioral questions", "Negotiate job offers"}', '{"Strategic Networking & Relationship Building"}', true),
('635ec236-225b-4583-8b41-2616ccfc4278', 'Salary Negotiation & Benefits Optimization', 'Learn advanced negotiation strategies for salary, benefits, and total compensation packages.', 'assessment', 5, 35, '{"Research market salaries", "Negotiate compensation packages", "Evaluate job offers"}', '{"Interview Mastery & Preparation"}', true);

-- Insert sample learning modules for Communication & Influence
INSERT INTO public.learning_modules (program_id, title, description, content_type, order_index, duration_minutes, learning_objectives, prerequisites, is_required) VALUES
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Effective Communication Foundations', 'Master the fundamentals of clear, persuasive, and impactful communication.', 'video', 1, 40, '{"Understand communication styles", "Practice active listening", "Communicate with clarity"}', '{}', true),
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Public Speaking & Presentation Skills', 'Develop confidence and expertise in public speaking and professional presentations.', 'interactive', 2, 55, '{"Deliver compelling presentations", "Manage presentation anxiety", "Engage audiences effectively"}', '{"Effective Communication Foundations"}', true),
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Stakeholder Management & Influence', 'Learn to manage diverse stakeholders and build influence across organizational levels.', 'article', 3, 50, '{"Map stakeholder relationships", "Build influence strategies", "Manage competing interests"}', '{"Effective Communication Foundations"}', true),
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Conflict Resolution & Negotiation', 'Master techniques for resolving conflicts and negotiating win-win outcomes.', 'video', 4, 45, '{"Resolve workplace conflicts", "Negotiate effectively", "Mediate disputes"}', '{"Stakeholder Management & Influence"}', true),
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Advanced Persuasion Techniques', 'Learn sophisticated influence and persuasion strategies for professional success.', 'assessment', 5, 40, '{"Apply persuasion principles", "Influence without authority", "Build consensus"}', '{"Public Speaking & Presentation Skills", "Conflict Resolution & Negotiation"}', true);

-- Insert sample learning modules for Data-Driven Decision Making
INSERT INTO public.learning_modules (program_id, title, description, content_type, order_index, duration_minutes, learning_objectives, prerequisites, is_required) VALUES
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Analytics Fundamentals & Data Literacy', 'Build foundational skills in data analysis and develop data literacy for decision making.', 'video', 1, 50, '{"Understand data types and sources", "Perform basic statistical analysis", "Interpret data visualizations"}', '{}', true),
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Data Visualization & Storytelling', 'Learn to create compelling data visualizations and tell stories with data.', 'interactive', 2, 60, '{"Create effective visualizations", "Tell stories with data", "Choose appropriate chart types"}', '{"Analytics Fundamentals & Data Literacy"}', true),
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Statistical Analysis for Business', 'Apply statistical methods and analysis techniques to solve business problems.', 'article', 3, 55, '{"Apply statistical tests", "Analyze business metrics", "Interpret statistical results"}', '{"Analytics Fundamentals & Data Literacy"}', true),
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Business Intelligence & Dashboards', 'Build comprehensive business intelligence solutions and executive dashboards.', 'video', 4, 65, '{"Design BI solutions", "Create executive dashboards", "Implement KPI tracking"}', '{"Data Visualization & Storytelling", "Statistical Analysis for Business"}', true),
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Predictive Analytics & Forecasting', 'Master advanced analytics techniques for forecasting and predictive modeling.', 'assessment', 5, 70, '{"Build predictive models", "Forecast business trends", "Validate model performance"}', '{"Business Intelligence & Dashboards"}', true);

-- Create trigger for updating timestamps
CREATE TRIGGER update_learning_modules_updated_at
  BEFORE UPDATE ON public.learning_modules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();