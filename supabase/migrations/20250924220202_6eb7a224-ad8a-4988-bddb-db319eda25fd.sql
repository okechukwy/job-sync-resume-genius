-- Update Technical Skills Acceleration program and create comprehensive modules

-- First, delete existing modules for the Technical Skills Acceleration program
DELETE FROM learning_modules WHERE program_id = '5684db13-ad08-496e-894d-86d81a0d8966';

-- Update the program description
UPDATE coaching_programs 
SET description = 'Master essential technical skills through hands-on learning and practical application. Build expertise in JavaScript, CSS, system architecture, code quality, and performance optimization.',
    skills_covered = ARRAY['javascript', 'css', 'system_architecture', 'code_review', 'performance_optimization', 'quality_assurance'],
    estimated_duration_weeks = 8
WHERE id = '5684db13-ad08-496e-894d-86d81a0d8966';

-- Create Module 1: JavaScript & CSS Foundations
INSERT INTO learning_modules (
  id,
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  order_index,
  learning_objectives,
  prerequisites,
  is_interactive,
  content_sections
) VALUES (
  gen_random_uuid(),
  '5684db13-ad08-496e-894d-86d81a0d8966',
  'JavaScript & CSS Foundations',
  'Master modern JavaScript ES6+ features and advanced CSS techniques including Grid, Flexbox, and responsive design principles.',
  'article',
  120,
  1,
  ARRAY[
    'Master ES6+ JavaScript features and syntax',
    'Understand modern CSS layout systems (Grid, Flexbox)',
    'Implement responsive design principles',
    'Practice DOM manipulation and event handling',
    'Learn asynchronous programming patterns'
  ],
  ARRAY[
    'Basic HTML knowledge',
    'Understanding of web development concepts',
    'Text editor or IDE setup'
  ],
  true,
  '[
    {
      "id": "js_fundamentals",
      "title": "Modern JavaScript Essentials",
      "type": "article",
      "description": "Deep dive into ES6+ features, arrow functions, destructuring, and modern syntax",
      "duration_minutes": 45,
      "is_required": true,
      "order_index": 1,
      "content": {
        "text": "Modern JavaScript has evolved significantly with ES6+ features that make code more readable, maintainable, and powerful. This comprehensive guide covers the essential concepts every developer needs to master.",
        "key_points": [
          "Arrow functions and their lexical this binding",
          "Destructuring arrays and objects for cleaner code",
          "Template literals for string interpolation",
          "Let and const for proper variable scoping",
          "Spread operator and rest parameters",
          "Modules and import/export statements",
          "Promises and async/await for asynchronous operations"
        ],
        "objectives": [
          "Write modern JavaScript using ES6+ syntax",
          "Understand scope and hoisting concepts",
          "Implement proper error handling patterns",
          "Use destructuring for cleaner data extraction"
        ]
      }
    },
    {
      "id": "css_mastery",
      "title": "Advanced CSS Layout Systems",
      "type": "article", 
      "description": "Master CSS Grid, Flexbox, and responsive design techniques",
      "duration_minutes": 40,
      "is_required": true,
      "order_index": 2,
      "content": {
        "text": "CSS has powerful layout systems that enable complex, responsive designs. Grid and Flexbox solve different layout challenges and work together to create modern web interfaces.",
        "key_points": [
          "CSS Grid for two-dimensional layouts",
          "Flexbox for one-dimensional layouts",
          "Responsive design with media queries",
          "CSS custom properties (variables)",
          "Modern CSS features like clamp() and min()/max()",
          "Container queries for component-based responsive design"
        ],
        "objectives": [
          "Build complex layouts using CSS Grid",
          "Create flexible components with Flexbox",
          "Implement responsive design patterns",
          "Use CSS custom properties effectively"
        ]
      }
    },
    {
      "id": "dom_events",
      "title": "DOM Manipulation & Event Handling",
      "type": "interactive",
      "description": "Hands-on practice with DOM APIs and event-driven programming",
      "duration_minutes": 35,
      "is_required": true,
      "order_index": 3,
      "content": {
        "exercise_type": "coding_practice",
        "instructions": "Build interactive web components using modern DOM APIs and event handling patterns. Practice selecting elements, modifying content, and responding to user interactions.",
        "objectives": [
          "Select and manipulate DOM elements efficiently",
          "Implement event delegation patterns",
          "Create dynamic user interfaces",
          "Handle forms and user input validation"
        ]
      }
    },
    {
      "id": "foundations_assessment",
      "title": "JavaScript & CSS Knowledge Check",
      "type": "assessment",
      "description": "Test your understanding of JavaScript and CSS fundamentals",
      "duration_minutes": 20,
      "is_required": true,
      "order_index": 4,
      "content": {
        "questions": [
          {
            "question": "Which ES6 feature allows you to extract values from arrays or objects?",
            "type": "multiple_choice",
            "options": ["Spread operator", "Destructuring", "Template literals", "Arrow functions"],
            "correct_answer": 1
          },
          {
            "question": "What is the main difference between CSS Grid and Flexbox?",
            "type": "multiple_choice", 
            "options": ["Grid is older than Flexbox", "Grid is 2D, Flexbox is 1D", "Flexbox is more powerful", "They serve the same purpose"],
            "correct_answer": 1
          },
          {
            "question": "Explain the concept of event delegation and its benefits.",
            "type": "text"
          }
        ]
      }
    }
  ]'::jsonb
);

-- Create Module 2: System Architecture & Design
INSERT INTO learning_modules (
  id,
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  order_index,
  learning_objectives,
  prerequisites,
  is_interactive,
  content_sections
) VALUES (
  gen_random_uuid(),
  '5684db13-ad08-496e-894d-86d81a0d8966',
  'System Architecture & Design',
  'Learn to design scalable, maintainable software systems using proven architectural patterns and design principles.',
  'article',
  110,
  2,
  ARRAY[
    'Understand software architecture patterns and principles',
    'Learn to design scalable and maintainable systems',
    'Master database design and API architecture',
    'Practice system design interview scenarios'
  ],
  ARRAY[
    'Programming experience in any language',
    'Basic understanding of databases',
    'Familiarity with web development concepts'
  ],
  true,
  '[
    {
      "id": "architecture_principles",
      "title": "Software Architecture Fundamentals",
      "type": "article",
      "description": "Core principles of software architecture including SOLID principles and design patterns",
      "duration_minutes": 35,
      "is_required": true,
      "order_index": 1,
      "content": {
        "text": "Software architecture forms the backbone of any successful application. Understanding core principles and patterns helps create systems that are maintainable, scalable, and robust.",
        "key_points": [
          "SOLID principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion",
          "Design patterns: Observer, Factory, Strategy, Decorator, Command",
          "Separation of concerns and modular design",
          "Coupling and cohesion principles",
          "Layered architecture patterns",
          "Event-driven architecture concepts"
        ],
        "objectives": [
          "Apply SOLID principles in code design",
          "Identify and implement common design patterns",
          "Design modular, maintainable systems",
          "Understand architectural trade-offs"
        ]
      }
    },
    {
      "id": "system_design",
      "title": "Scalable System Design",
      "type": "article",
      "description": "Learn to design systems for scale, performance, and reliability",
      "duration_minutes": 40,
      "is_required": true,
      "order_index": 2,
      "content": {
        "text": "Designing systems that can handle growth requires understanding scalability patterns, performance considerations, and reliability strategies.",
        "key_points": [
          "Horizontal vs vertical scaling strategies",
          "Load balancing and distribution patterns",
          "Caching layers and strategies",
          "Database partitioning and sharding",
          "Microservices vs monolithic architectures",
          "Message queues and asynchronous processing",
          "Circuit breaker and retry patterns"
        ],
        "objectives": [
          "Design systems for horizontal scaling",
          "Implement effective caching strategies", 
          "Choose appropriate database architectures",
          "Plan for system reliability and fault tolerance"
        ]
      }
    },
    {
      "id": "api_design", 
      "title": "API Architecture & Database Design",
      "type": "interactive",
      "description": "Hands-on practice designing RESTful APIs and database schemas",
      "duration_minutes": 35,
      "is_required": true,
      "order_index": 3,
      "content": {
        "exercise_type": "design_exercise",
        "instructions": "Design a complete API and database schema for a real-world application. Consider data relationships, API endpoints, and performance optimization.",
        "objectives": [
          "Design RESTful API endpoints and resources",
          "Create normalized database schemas",
          "Implement proper data relationships",
          "Consider API versioning and evolution"
        ]
      }
    },
    {
      "id": "architecture_assessment",
      "title": "System Design Assessment", 
      "type": "assessment",
      "description": "Evaluate your system design knowledge and problem-solving skills",
      "duration_minutes": 25,
      "is_required": true,
      "order_index": 4,
      "content": {
        "questions": [
          {
            "question": "Which SOLID principle states that classes should be open for extension but closed for modification?",
            "type": "multiple_choice",
            "options": ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Dependency Inversion"],
            "correct_answer": 1
          },
          {
            "question": "What is the main advantage of microservices architecture?",
            "type": "multiple_choice",
            "options": ["Simpler deployment", "Independent scaling and development", "Easier debugging", "Faster performance"],
            "correct_answer": 1
          },
          {
            "question": "Design a high-level architecture for a social media platform that needs to handle millions of users. Include key components and their interactions.",
            "type": "text"
          }
        ]
      }
    }
  ]'::jsonb
);

-- Create Module 3: Code Review & Quality Assurance  
INSERT INTO learning_modules (
  id,
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  order_index,
  learning_objectives,
  prerequisites,
  is_interactive,
  content_sections
) VALUES (
  gen_random_uuid(),
  '5684db13-ad08-496e-894d-86d81a0d8966',
  'Code Review & Quality Assurance',
  'Develop effective code review skills, implement testing strategies, and master quality assurance methodologies.',
  'article',
  115,
  3,
  ARRAY[
    'Develop effective code review skills and processes',
    'Implement comprehensive testing strategies',
    'Learn quality assurance methodologies',
    'Master debugging and troubleshooting techniques'
  ],
  ARRAY[
    'Programming experience',
    'Understanding of version control (Git)',
    'Basic knowledge of software development lifecycle'
  ],
  true,
  '[
    {
      "id": "code_review_practices",
      "title": "Effective Code Review Processes",
      "type": "article",
      "description": "Best practices for conducting thorough, constructive code reviews",
      "duration_minutes": 35,
      "is_required": true,
      "order_index": 1,
      "content": {
        "text": "Code reviews are essential for maintaining code quality, sharing knowledge, and catching issues before they reach production. Effective reviews improve team collaboration and code standards.",
        "key_points": [
          "Pre-review preparation: clear commits and pull request descriptions",
          "Review focus areas: functionality, readability, performance, security",
          "Constructive feedback techniques and communication",
          "Automated checks vs manual review priorities",
          "Review tools and workflow integration",
          "Handling disagreements and building consensus",
          "Time management and review efficiency"
        ],
        "objectives": [
          "Conduct thorough yet efficient code reviews",
          "Provide constructive, actionable feedback",
          "Identify potential issues before deployment",
          "Foster positive team collaboration through reviews"
        ]
      }
    },
    {
      "id": "testing_strategies",
      "title": "Comprehensive Testing Approaches",
      "type": "article",
      "description": "Master unit testing, integration testing, and end-to-end testing strategies",
      "duration_minutes": 40,
      "is_required": true,
      "order_index": 2,
      "content": {
        "text": "A robust testing strategy ensures code reliability and enables confident refactoring. Different types of tests serve different purposes in the development lifecycle.",
        "key_points": [
          "Testing pyramid: unit tests, integration tests, E2E tests",
          "Test-driven development (TDD) principles and practices",
          "Mocking and stubbing external dependencies",
          "Code coverage metrics and their limitations",
          "Performance testing and load testing basics",
          "Automated testing in CI/CD pipelines",
          "Testing best practices and anti-patterns"
        ],
        "objectives": [
          "Implement comprehensive test suites",
          "Write effective unit and integration tests", 
          "Design tests that provide confidence in code changes",
          "Integrate testing into development workflows"
        ]
      }
    },
    {
      "id": "quality_metrics",
      "title": "Code Quality & Debugging Techniques",
      "type": "interactive",
      "description": "Hands-on practice with code quality tools and debugging strategies",
      "duration_minutes": 40,
      "is_required": true,
      "order_index": 3,
      "content": {
        "exercise_type": "debugging_practice",
        "instructions": "Practice systematic debugging approaches using various tools and techniques. Analyze code quality metrics and implement improvements.",
        "objectives": [
          "Use debugging tools effectively",
          "Implement systematic debugging approaches",
          "Analyze and improve code quality metrics",
          "Set up automated quality gates"
        ]
      }
    },
    {
      "id": "qa_assessment",
      "title": "Quality Assurance Knowledge Check",
      "type": "assessment", 
      "description": "Test your understanding of code review and quality assurance practices",
      "duration_minutes": 20,
      "is_required": true,
      "order_index": 4,
      "content": {
        "questions": [
          {
            "question": "What is the most important aspect of providing code review feedback?",
            "type": "multiple_choice",
            "options": ["Finding all bugs", "Being constructive and specific", "Approving quickly", "Following style guides"],
            "correct_answer": 1
          },
          {
            "question": "In the testing pyramid, which type of tests should you have the most of?",
            "type": "multiple_choice",
            "options": ["End-to-end tests", "Integration tests", "Unit tests", "Manual tests"],
            "correct_answer": 2
          },
          {
            "question": "Describe a systematic approach to debugging a complex issue in production.",
            "type": "text"
          }
        ]
      }
    }
  ]'::jsonb
);

-- Create Module 4: Performance Optimization
INSERT INTO learning_modules (
  id,
  program_id,
  title,
  description, 
  content_type,
  duration_minutes,
  order_index,
  learning_objectives,
  prerequisites,
  is_interactive,
  content_sections
) VALUES (
  gen_random_uuid(),
  '5684db13-ad08-496e-894d-86d81a0d8966',
  'Performance Optimization',
  'Master techniques for identifying and resolving performance bottlenecks in both frontend and backend applications.',
  'article',
  125,
  4,
  ARRAY[
    'Identify and resolve performance bottlenecks',
    'Optimize frontend and backend performance',
    'Implement effective caching strategies',
    'Monitor and measure application performance'
  ],
  ARRAY[
    'Web development experience',
    'Understanding of databases',
    'Basic knowledge of networking concepts'
  ],
  true,
  '[
    {
      "id": "performance_analysis",
      "title": "Performance Profiling & Analysis",
      "type": "article",
      "description": "Learn to identify performance bottlenecks using profiling tools and metrics",
      "duration_minutes": 35,
      "is_required": true,
      "order_index": 1,
      "content": {
        "text": "Performance optimization starts with understanding where bottlenecks occur. Profiling tools and metrics help identify the root causes of performance issues.",
        "key_points": [
          "Browser DevTools for frontend performance analysis",
          "Network waterfall analysis and optimization",
          "CPU and memory profiling techniques",
          "Database query analysis and optimization",
          "Key performance metrics: TTFB, FCP, LCP, CLS",
          "Performance budgets and monitoring",
          "Real user monitoring vs synthetic testing"
        ],
        "objectives": [
          "Use profiling tools to identify bottlenecks",
          "Analyze performance metrics effectively",
          "Create performance budgets and goals",
          "Implement performance monitoring strategies"
        ]
      }
    },
    {
      "id": "frontend_optimization",
      "title": "Frontend Performance Optimization",
      "type": "article",
      "description": "Optimize client-side performance through bundling, lazy loading, and rendering strategies", 
      "duration_minutes": 40,
      "is_required": true,
      "order_index": 2,
      "content": {
        "text": "Frontend performance directly impacts user experience. Modern techniques can dramatically improve load times and user interaction responsiveness.",
        "key_points": [
          "Code splitting and lazy loading strategies",
          "Bundle optimization and tree shaking",
          "Image optimization and modern formats (WebP, AVIF)",
          "Critical CSS and above-the-fold optimization",
          "Service workers and caching strategies",
          "Virtual scrolling and component optimization",
          "Web Vitals optimization techniques"
        ],
        "objectives": [
          "Implement effective code splitting strategies",
          "Optimize asset loading and caching",
          "Improve rendering performance",
          "Achieve excellent Web Vitals scores"
        ]
      }
    },
    {
      "id": "backend_optimization",
      "title": "Backend & Database Performance",
      "type": "interactive",
      "description": "Hands-on practice optimizing server-side performance and database queries",
      "duration_minutes": 35,
      "is_required": true,
      "order_index": 3,
      "content": {
        "exercise_type": "optimization_practice",
        "instructions": "Practice optimizing database queries, implementing caching layers, and improving server response times through hands-on exercises.",
        "objectives": [
          "Optimize database queries and indexes",
          "Implement effective caching strategies",
          "Design for horizontal scalability",
          "Monitor and tune server performance"
        ]
      }
    },
    {
      "id": "monitoring_project",
      "title": "Performance Monitoring Implementation",
      "type": "interactive",
      "description": "Build a comprehensive performance monitoring and alerting system",
      "duration_minutes": 30,
      "is_required": true,
      "order_index": 4,
      "content": {
        "exercise_type": "monitoring_setup",
        "instructions": "Set up performance monitoring tools, create dashboards, and implement alerting for key performance metrics.",
        "objectives": [
          "Implement performance monitoring tools",
          "Create meaningful performance dashboards",
          "Set up alerting for performance regressions",
          "Establish performance optimization workflows"
        ]
      }
    },
    {
      "id": "performance_assessment",
      "title": "Performance Optimization Assessment",
      "type": "assessment",
      "description": "Comprehensive evaluation of performance optimization knowledge and skills",
      "duration_minutes": 25,
      "is_required": true,
      "order_index": 5,
      "content": {
        "questions": [
          {
            "question": "Which Core Web Vital measures visual stability?",
            "type": "multiple_choice",
            "options": ["First Contentful Paint", "Largest Contentful Paint", "Cumulative Layout Shift", "Time to Interactive"],
            "correct_answer": 2
          },
          {
            "question": "What is the primary benefit of database indexing?",
            "type": "multiple_choice",
            "options": ["Reduces storage space", "Improves query performance", "Ensures data integrity", "Enables better security"],
            "correct_answer": 1
          },
          {
            "question": "Design a performance optimization strategy for a slow-loading e-commerce product page. Include both frontend and backend considerations.",
            "type": "text"
          }
        ]
      }
    }
  ]'::jsonb
);