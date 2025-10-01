-- Insert DevOps Fundamentals: CI/CD, Docker & Kubernetes module into Technical Skills Acceleration program
INSERT INTO public.learning_modules (
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  order_index,
  learning_objectives,
  prerequisites,
  target_audience,
  industry_applications,
  practical_applications,
  is_interactive,
  content_sections,
  learning_outcomes,
  created_at,
  updated_at
) VALUES (
  '5684db13-ad08-496e-894d-86d81a0d8966',
  'DevOps Fundamentals: CI/CD, Docker & Kubernetes',
  'Master modern DevOps practices including continuous integration and deployment, containerization with Docker, and orchestration with Kubernetes. Learn to build automated pipelines, create production-ready containers, and deploy scalable applications.',
  'interactive',
  180,
  5,
  ARRAY[
    'Design and implement complete CI/CD pipelines using modern tools',
    'Create production-ready Docker containers with security best practices',
    'Deploy and manage applications on Kubernetes clusters',
    'Implement monitoring, logging, and alerting for containerized applications',
    'Apply GitOps workflows and infrastructure as code principles'
  ],
  ARRAY[
    'Basic understanding of command line interfaces',
    'Familiarity with Git version control',
    'Knowledge of web application development',
    'Understanding of cloud computing concepts'
  ],
  ARRAY[
    'Software Engineers',
    'DevOps Engineers',
    'Platform Engineers',
    'Site Reliability Engineers',
    'Cloud Architects',
    'Technical Leads'
  ],
  ARRAY[
    'Technology & Software Development',
    'Cloud Computing & Infrastructure',
    'Financial Technology',
    'E-commerce & Retail',
    'Healthcare Technology',
    'Media & Entertainment'
  ],
  ARRAY[
    'Building automated deployment pipelines for web applications',
    'Containerizing microservices architectures',
    'Setting up Kubernetes clusters for production workloads',
    'Implementing blue-green and canary deployment strategies',
    'Creating infrastructure as code with Terraform'
  ],
  true,
  jsonb_build_array(
    jsonb_build_object(
      'id', 'section-1-cicd',
      'title', 'CI/CD Pipeline Mastery',
      'type', 'interactive',
      'duration_minutes', 60,
      'description', 'Learn to build automated continuous integration and deployment pipelines using GitHub Actions, GitLab CI, and modern DevOps practices.',
      'is_required', true,
      'order_index', 1
    ),
    jsonb_build_object(
      'id', 'section-2-docker',
      'title', 'Docker Containerization',
      'type', 'interactive',
      'duration_minutes', 60,
      'description', 'Master container creation, multi-stage builds, Docker Compose, and security best practices for production-ready containers.',
      'is_required', true,
      'order_index', 2
    ),
    jsonb_build_object(
      'id', 'section-3-kubernetes',
      'title', 'Kubernetes Orchestration',
      'type', 'interactive',
      'duration_minutes', 60,
      'description', 'Deploy and manage containerized applications at scale with Kubernetes, including pods, services, deployments, and monitoring.',
      'is_required', true,
      'order_index', 3
    )
  ),
  ARRAY[
    'Build end-to-end CI/CD pipelines',
    'Create optimized Docker images',
    'Deploy applications to Kubernetes',
    'Implement GitOps workflows',
    'Monitor containerized applications'
  ],
  now(),
  now()
);