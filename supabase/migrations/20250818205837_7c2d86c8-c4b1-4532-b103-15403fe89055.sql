-- Update the learning modules with rich educational content
UPDATE learning_modules 
SET content_sections = '[
  {
    "id": "introduction",
    "title": "Introduction to Strategic Networking",
    "type": "article",
    "duration_minutes": 10,
    "description": "Learn the fundamentals of strategic networking and relationship building",
    "is_required": true,
    "order_index": 1,
    "content": {
      "text": "Strategic networking is the art of building meaningful professional relationships that create mutual value and open doors to opportunities. Unlike casual networking, strategic networking is intentional, focused, and built on genuine connections.",
      "key_points": [
        "Quality over quantity - focus on meaningful connections",
        "Strategic networking is about giving value, not just taking",
        "Authenticity is crucial for building lasting relationships",
        "Follow-up is what transforms contacts into relationships"
      ],
      "objectives": [
        "Understand the difference between networking and strategic networking",
        "Learn the key principles of relationship building",
        "Develop a networking mindset focused on mutual value"
      ],
      "reflection_questions": [
        "Think about your current professional network. What relationships have been most valuable to your career?",
        "How do you currently approach networking? What could you improve?"
      ]
    }
  },
  {
    "id": "networking_strategies",
    "title": "Effective Networking Strategies",
    "type": "interactive",
    "duration_minutes": 25,
    "description": "Explore proven strategies for building and maintaining professional relationships",
    "is_required": true,
    "order_index": 2,
    "content": {
      "exercise_type": "Strategy Planning Workshop",
      "instructions": "Complete the interactive exercises to develop your personal networking strategy",
      "text": "Effective networking requires a strategic approach. Learn how to identify key contacts, engage meaningfully, and maintain relationships over time.",
      "key_points": [
        "The 3-2-1 rule: 3 existing contacts, 2 new connections, 1 follow-up daily",
        "Use the GIVE method: Generous, Interested, Valuable, Engaging",
        "Leverage social media and professional platforms strategically",
        "Create a systematic approach to relationship maintenance"
      ],
      "objectives": [
        "Develop a personal networking strategy",
        "Learn how to identify and prioritize networking opportunities",
        "Master the art of meaningful professional conversations"
      ]
    }
  },
  {
    "id": "relationship_maintenance",
    "title": "Maintaining Long-term Relationships",
    "type": "article",
    "duration_minutes": 15,
    "description": "Learn how to nurture and maintain professional relationships over time",
    "is_required": true,
    "order_index": 3,
    "content": {
      "text": "Building relationships is just the beginning. The real value comes from maintaining and deepening these connections over time through consistent, valuable interactions.",
      "key_points": [
        "Regular check-ins without asking for anything",
        "Share relevant opportunities and insights",
        "Remember personal details and follow up on them",
        "Celebrate others'' successes and offer support during challenges"
      ],
      "objectives": [
        "Develop a system for relationship maintenance",
        "Learn how to add value to your network consistently",
        "Understand the importance of long-term relationship building"
      ],
      "reflection_questions": [
        "How do you currently stay in touch with your professional network?",
        "What value can you offer to others in your network?"
      ]
    }
  },
  {
    "id": "knowledge_check",
    "title": "Strategic Networking Assessment",
    "type": "assessment",
    "duration_minutes": 10,
    "description": "Test your understanding of strategic networking principles",
    "is_required": true,
    "order_index": 4,
    "content": {
      "questions": [
        {
          "question": "What is the most important principle of strategic networking?",
          "type": "multiple_choice",
          "options": [
            "Collecting as many business cards as possible",
            "Focusing on what you can get from others",
            "Building mutually beneficial relationships",
            "Only networking with senior executives"
          ],
          "correct_answer": 2
        },
        {
          "question": "What does the GIVE method stand for in networking?",
          "type": "multiple_choice",
          "options": [
            "Generous, Interested, Valuable, Engaging",
            "Goal-oriented, Intentional, Visible, Effective",
            "Genuine, Inspiring, Versatile, Efficient",
            "Growth-focused, Innovative, Valuable, Expert"
          ],
          "correct_answer": 0
        },
        {
          "question": "Describe a time when you successfully helped someone in your professional network. What was the outcome?",
          "type": "text"
        }
      ]
    }
  }
]'::jsonb
WHERE title = 'Strategic Networking & Relationship Building';

-- Update System Architecture module with rich content
UPDATE learning_modules 
SET content_sections = '[
  {
    "id": "architecture_fundamentals",
    "title": "Architecture Fundamentals",
    "type": "article",
    "duration_minutes": 15,
    "description": "Core principles of software architecture and system design",
    "is_required": true,
    "order_index": 1,
    "content": {
      "text": "Software architecture is the fundamental organization of a system, including its components, relationships, and principles governing its design and evolution. Good architecture enables scalability, maintainability, and adaptability.",
      "key_points": [
        "Separation of concerns - each component has a single responsibility",
        "Modularity enables independent development and testing",
        "Abstraction hides complexity and implementation details",
        "Scalability must be considered from the beginning"
      ],
      "objectives": [
        "Understand the role of software architecture in system design",
        "Learn fundamental architectural principles",
        "Recognize the impact of architectural decisions on system quality"
      ]
    }
  },
  {
    "id": "design_patterns",
    "title": "Common Design Patterns",
    "type": "interactive",
    "duration_minutes": 30,
    "description": "Explore essential design patterns and their applications",
    "is_required": true,
    "order_index": 2,
    "content": {
      "exercise_type": "Pattern Implementation Lab",
      "instructions": "Work through examples of common design patterns and implement them in your preferred language",
      "text": "Design patterns are reusable solutions to common problems in software design. They represent best practices and provide a shared vocabulary for developers.",
      "key_points": [
        "Singleton pattern ensures only one instance of a class",
        "Observer pattern enables loose coupling between objects",
        "Factory pattern abstracts object creation",
        "MVC pattern separates presentation from business logic"
      ],
      "objectives": [
        "Master commonly used design patterns",
        "Understand when and how to apply different patterns",
        "Practice implementing patterns in real scenarios"
      ]
    }
  },
  {
    "id": "scalability_planning",
    "title": "Planning for Scale",
    "type": "article",
    "duration_minutes": 20,
    "description": "Learn how to design systems that can grow with demand",
    "is_required": true,
    "order_index": 3,
    "content": {
      "text": "Scalable architecture anticipates growth and handles increased load gracefully. This involves both vertical scaling (more powerful hardware) and horizontal scaling (more instances).",
      "key_points": [
        "Load balancing distributes traffic across multiple servers",
        "Caching reduces database load and improves response times",
        "Database sharding spreads data across multiple databases",
        "Microservices enable independent scaling of components"
      ],
      "objectives": [
        "Design systems that can handle increasing load",
        "Understand different scaling strategies",
        "Learn to identify and address performance bottlenecks"
      ],
      "reflection_questions": [
        "What would happen to your current system if traffic increased 10x overnight?",
        "Which components in your system are most likely to become bottlenecks?"
      ]
    }
  }
]'::jsonb
WHERE title = 'System Architecture & Design';

-- Update Leadership module with rich content
UPDATE learning_modules 
SET content_sections = '[
  {
    "id": "leadership_principles",
    "title": "Core Leadership Principles",
    "type": "article",
    "duration_minutes": 12,
    "description": "Fundamental principles that guide effective leadership",
    "is_required": true,
    "order_index": 1,
    "content": {
      "text": "Effective leadership is built on timeless principles that transcend industries and cultures. These principles form the foundation for building trust, inspiring others, and achieving sustainable success.",
      "key_points": [
        "Lead by example - your actions speak louder than words",
        "Integrity builds trust and credibility with your team",
        "Vision provides direction and purpose for your organization",
        "Empathy enables you to connect with and understand others"
      ],
      "objectives": [
        "Understand the fundamental principles of effective leadership",
        "Learn how to build trust and credibility as a leader",
        "Develop your personal leadership philosophy"
      ]
    }
  },
  {
    "id": "communication_skills",
    "title": "Leadership Communication",
    "type": "interactive",
    "duration_minutes": 25,
    "description": "Master the art of leadership communication",
    "is_required": true,
    "order_index": 2,
    "content": {
      "exercise_type": "Communication Workshop",
      "instructions": "Practice different communication scenarios and receive feedback on your approach",
      "text": "Great leaders are great communicators. They can inspire, persuade, and connect with people at all levels of the organization.",
      "key_points": [
        "Active listening builds stronger relationships",
        "Clear, concise messaging prevents misunderstandings",
        "Adapt your communication style to your audience",
        "Feedback should be specific, timely, and constructive"
      ],
      "objectives": [
        "Develop effective communication skills",
        "Learn to adapt your message to different audiences",
        "Master the art of giving and receiving feedback"
      ]
    }
  },
  {
    "id": "decision_making",
    "title": "Strategic Decision Making",
    "type": "article",
    "duration_minutes": 18,
    "description": "Learn frameworks for making better leadership decisions",
    "is_required": true,
    "order_index": 3,
    "content": {
      "text": "Leaders make countless decisions every day. The quality of these decisions determines the success of their teams and organizations. Learn proven frameworks for better decision-making.",
      "key_points": [
        "Gather relevant data before making decisions",
        "Consider multiple perspectives and alternatives",
        "Understand the risks and potential consequences",
        "Communicate decisions clearly and explain the reasoning"
      ],
      "objectives": [
        "Learn structured approaches to decision-making",
        "Understand how to evaluate options and risks",
        "Develop confidence in your decision-making abilities"
      ],
      "reflection_questions": [
        "Think of a difficult decision you made recently. What process did you follow?",
        "How do you handle decisions when you don''t have all the information you need?"
      ]
    }
  }
]'::jsonb
WHERE title = 'Foundations of Leadership';