-- Enable RLS on learning_modules if not already enabled
ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing learning modules if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'learning_modules' 
        AND policyname = 'Anyone can view learning modules'
    ) THEN
        CREATE POLICY "Anyone can view learning modules" 
        ON public.learning_modules 
        FOR SELECT 
        USING (true);
    END IF;
END $$;

-- Clear existing data first
DELETE FROM public.learning_modules;

-- Insert sample learning modules for Leadership Excellence Program
INSERT INTO public.learning_modules (program_id, title, description, content_type, content_url, duration_minutes, order_index, learning_objectives, prerequisites, is_interactive) VALUES
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Foundations of Leadership', 'Understand the core principles and theories of effective leadership in modern organizations.', 'video', 'https://example.com/leadership-foundations', 45, 1, '{"Identify different leadership styles", "Understand situational leadership", "Develop self-awareness as a leader"}', '{}', false),
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Strategic Thinking & Planning', 'Learn to think strategically and develop comprehensive plans for organizational success.', 'interactive', 'https://example.com/strategic-thinking', 60, 2, '{"Create strategic vision statements", "Develop SWOT analysis skills", "Build strategic roadmaps"}', '{"Foundations of Leadership"}', true),
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Team Management Excellence', 'Master the art of building, leading, and developing high-performing teams.', 'video', 'https://example.com/team-management', 50, 3, '{"Build effective teams", "Manage team dynamics", "Delegate effectively"}', '{"Foundations of Leadership"}', false),
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Executive Presence & Communication', 'Develop the presence and communication skills essential for senior leadership roles.', 'article', 'https://example.com/executive-presence', 40, 4, '{"Develop executive presence", "Master executive communication", "Build influence and credibility"}', '{"Team Management Excellence"}', false),
('756c7123-31a1-4e01-b9fc-28856d5fe2cc', 'Change Leadership Mastery', 'Learn to lead organizations through complex change initiatives and transformations.', 'assessment', 'https://example.com/change-leadership', 35, 5, '{"Lead change initiatives", "Manage resistance to change", "Create change management plans"}', '{"Strategic Thinking & Planning", "Executive Presence & Communication"}', true);

-- Insert sample learning modules for Technical Skills Acceleration
INSERT INTO public.learning_modules (program_id, title, description, content_type, content_url, duration_minutes, order_index, learning_objectives, prerequisites, is_interactive) VALUES
('5684db13-ad08-496e-894d-86d81a0d8966', 'Modern Programming Fundamentals', 'Master the core concepts of modern software development and programming best practices.', 'video', 'https://example.com/programming-fundamentals', 55, 1, '{"Understand modern programming paradigms", "Write clean, maintainable code", "Apply design patterns"}', '{}', false),
('5684db13-ad08-496e-894d-86d81a0d8966', 'DevOps & CI/CD Practices', 'Learn essential DevOps practices, continuous integration, and deployment strategies.', 'interactive', 'https://example.com/devops-practices', 75, 2, '{"Set up CI/CD pipelines", "Implement infrastructure as code", "Master containerization"}', '{"Modern Programming Fundamentals"}', true),
('5684db13-ad08-496e-894d-86d81a0d8966', 'System Architecture & Design', 'Design scalable, maintainable software systems and understand architectural patterns.', 'article', 'https://example.com/system-architecture', 65, 3, '{"Design scalable architectures", "Choose appropriate design patterns", "Plan system integrations"}', '{"Modern Programming Fundamentals"}', false),
('5684db13-ad08-496e-894d-86d81a0d8966', 'Code Review & Quality Assurance', 'Master the art of code review, testing strategies, and quality assurance practices.', 'video', 'https://example.com/code-review', 45, 4, '{"Conduct effective code reviews", "Implement testing strategies", "Ensure code quality"}', '{"System Architecture & Design"}', false),
('5684db13-ad08-496e-894d-86d81a0d8966', 'Performance Optimization', 'Learn advanced techniques for optimizing application performance and scalability.', 'assessment', 'https://example.com/performance-optimization', 50, 5, '{"Profile application performance", "Optimize database queries", "Implement caching strategies"}', '{"DevOps & CI/CD Practices", "Code Review & Quality Assurance"}', true);

-- Insert sample learning modules for Career Transition Mastery
INSERT INTO public.learning_modules (program_id, title, description, content_type, content_url, duration_minutes, order_index, learning_objectives, prerequisites, is_interactive) VALUES
('635ec236-225b-4583-8b41-2616ccfc4278', 'Career Self-Assessment & Discovery', 'Conduct a comprehensive assessment of your skills, values, and career aspirations.', 'interactive', 'https://example.com/career-assessment', 40, 1, '{"Complete skills inventory", "Identify career values", "Define career goals"}', '{}', true),
('635ec236-225b-4583-8b41-2616ccfc4278', 'Industry Research & Market Analysis', 'Research target industries, companies, and market trends for informed career decisions.', 'article', 'https://example.com/industry-research', 50, 2, '{"Research industry trends", "Analyze company cultures", "Identify growth opportunities"}', '{"Career Self-Assessment & Discovery"}', false),
('635ec236-225b-4583-8b41-2616ccfc4278', 'Strategic Networking & Relationship Building', 'Build a powerful professional network and leverage relationships for career advancement.', 'video', 'https://example.com/strategic-networking', 45, 3, '{"Build professional networks", "Leverage LinkedIn effectively", "Maintain relationships"}', '{"Industry Research & Market Analysis"}', false),
('635ec236-225b-4583-8b41-2616ccfc4278', 'Interview Mastery & Preparation', 'Master the interview process from preparation to follow-up for maximum success.', 'interactive', 'https://example.com/interview-mastery', 60, 4, '{"Prepare for different interview types", "Answer behavioral questions", "Negotiate job offers"}', '{"Strategic Networking & Relationship Building"}', true),
('635ec236-225b-4583-8b41-2616ccfc4278', 'Salary Negotiation & Benefits Optimization', 'Learn advanced negotiation strategies for salary, benefits, and total compensation packages.', 'assessment', 'https://example.com/salary-negotiation', 35, 5, '{"Research market salaries", "Negotiate compensation packages", "Evaluate job offers"}', '{"Interview Mastery & Preparation"}', true);

-- Insert sample learning modules for Communication & Influence
INSERT INTO public.learning_modules (program_id, title, description, content_type, content_url, duration_minutes, order_index, learning_objectives, prerequisites, is_interactive) VALUES
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Effective Communication Foundations', 'Master the fundamentals of clear, persuasive, and impactful communication.', 'video', 'https://example.com/communication-foundations', 40, 1, '{"Understand communication styles", "Practice active listening", "Communicate with clarity"}', '{}', false),
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Public Speaking & Presentation Skills', 'Develop confidence and expertise in public speaking and professional presentations.', 'interactive', 'https://example.com/public-speaking', 55, 2, '{"Deliver compelling presentations", "Manage presentation anxiety", "Engage audiences effectively"}', '{"Effective Communication Foundations"}', true),
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Stakeholder Management & Influence', 'Learn to manage diverse stakeholders and build influence across organizational levels.', 'article', 'https://example.com/stakeholder-management', 50, 3, '{"Map stakeholder relationships", "Build influence strategies", "Manage competing interests"}', '{"Effective Communication Foundations"}', false),
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Conflict Resolution & Negotiation', 'Master techniques for resolving conflicts and negotiating win-win outcomes.', 'video', 'https://example.com/conflict-resolution', 45, 4, '{"Resolve workplace conflicts", "Negotiate effectively", "Mediate disputes"}', '{"Stakeholder Management & Influence"}', false),
('e5761964-d5fa-4a40-9722-37eb5bbabaa6', 'Advanced Persuasion Techniques', 'Learn sophisticated influence and persuasion strategies for professional success.', 'assessment', 'https://example.com/persuasion-techniques', 40, 5, '{"Apply persuasion principles", "Influence without authority", "Build consensus"}', '{"Public Speaking & Presentation Skills", "Conflict Resolution & Negotiation"}', true);

-- Insert sample learning modules for Data-Driven Decision Making
INSERT INTO public.learning_modules (program_id, title, description, content_type, content_url, duration_minutes, order_index, learning_objectives, prerequisites, is_interactive) VALUES
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Analytics Fundamentals & Data Literacy', 'Build foundational skills in data analysis and develop data literacy for decision making.', 'video', 'https://example.com/analytics-fundamentals', 50, 1, '{"Understand data types and sources", "Perform basic statistical analysis", "Interpret data visualizations"}', '{}', false),
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Data Visualization & Storytelling', 'Learn to create compelling data visualizations and tell stories with data.', 'interactive', 'https://example.com/data-visualization', 60, 2, '{"Create effective visualizations", "Tell stories with data", "Choose appropriate chart types"}', '{"Analytics Fundamentals & Data Literacy"}', true),
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Statistical Analysis for Business', 'Apply statistical methods and analysis techniques to solve business problems.', 'article', 'https://example.com/statistical-analysis', 55, 3, '{"Apply statistical tests", "Analyze business metrics", "Interpret statistical results"}', '{"Analytics Fundamentals & Data Literacy"}', false),
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Business Intelligence & Dashboards', 'Build comprehensive business intelligence solutions and executive dashboards.', 'video', 'https://example.com/business-intelligence', 65, 4, '{"Design BI solutions", "Create executive dashboards", "Implement KPI tracking"}', '{"Data Visualization & Storytelling", "Statistical Analysis for Business"}', false),
('5a962c52-ed7b-43da-a17c-50549777d1ea', 'Predictive Analytics & Forecasting', 'Master advanced analytics techniques for forecasting and predictive modeling.', 'assessment', 'https://example.com/predictive-analytics', 70, 5, '{"Build predictive models", "Forecast business trends", "Validate model performance"}', '{"Business Intelligence & Dashboards"}', true);