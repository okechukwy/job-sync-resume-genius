-- Enhance Communication & Influence modules with comprehensive content sections
-- This migration adds detailed, industry-standard content to existing Communication & Influence modules

-- Update Effective Communication Foundations module with enhanced content
UPDATE public.learning_modules 
SET content_sections = '[
  {
    "id": "introduction",
    "title": "Introduction to Professional Communication",
    "type": "article",
    "content": {
      "text": "Professional communication is the foundation of all business success. It involves not just what you say, but how you say it, when you say it, and to whom you say it. Effective communication can build relationships, resolve conflicts, and drive organizational success.",
      "key_points": [
        "Communication is a two-way process involving sender, message, channel, and receiver",
        "Non-verbal communication often carries more weight than words",
        "Active listening is crucial for understanding and building trust",
        "Different communication styles require different approaches"
      ]
    },
    "description": "Welcome and module overview",
    "duration_minutes": 5,
    "is_required": true,
    "order_index": 1
  },
  {
    "id": "communication_model",
    "title": "The Communication Process Model",
    "type": "interactive",
    "content": {
      "text": "The communication process involves a sender, message, channel, receiver, and feedback. Understanding this model helps you identify where communication breakdowns occur and how to prevent them.",
      "interactive_elements": [
        {
          "type": "drag_drop",
          "title": "Match Communication Elements",
          "description": "Drag each element to its correct position in the communication model",
          "options": ["Sender", "Message", "Channel", "Receiver", "Feedback"],
          "correct_sequence": [0, 1, 2, 3, 4]
        }
      ]
    },
    "description": "Learn the fundamental elements of communication",
    "duration_minutes": 10,
    "is_required": true,
    "order_index": 2
  },
  {
    "id": "active_listening",
    "title": "Mastering Active Listening",
    "type": "video",
    "content": {
      "text": "Active listening is more than just hearing words. It involves full attention, understanding, responding, and remembering. This skill is crucial for building trust and resolving conflicts.",
      "objectives": [
        "Maintain eye contact and show engagement",
        "Ask clarifying questions to ensure understanding",
        "Paraphrase to confirm comprehension",
        "Avoid interrupting and jumping to conclusions"
      ],
      "practice_exercises": [
        {
          "title": "Listening Assessment",
          "description": "Rate your current listening skills and identify areas for improvement",
          "questions": [
            "How often do you interrupt others while they are speaking?",
            "Do you maintain eye contact during conversations?",
            "Do you ask clarifying questions to ensure understanding?"
          ]
        }
      ]
    },
    "description": "Develop essential active listening skills",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 3
  },
  {
    "id": "communication_styles",
    "title": "Understanding Communication Styles",
    "type": "assessment",
    "content": {
      "text": "Different people have different communication preferences. Understanding these styles helps you adapt your approach for maximum effectiveness.",
      "assessment": {
        "title": "Communication Style Assessment",
        "questions": [
          {
            "question": "In meetings, you prefer to:",
            "options": [
              "Speak up early and often",
              "Listen first, then contribute",
              "Take detailed notes and follow up later",
              "Focus on building consensus"
            ],
            "correct_answer": null
          },
          {
            "question": "When giving feedback, you:",
            "options": [
              "Be direct and straightforward",
              "Use examples and stories",
              "Provide written documentation",
              "Focus on positive reinforcement first"
            ],
            "correct_answer": null
          }
        ]
      }
    },
    "description": "Identify and adapt to different communication styles",
    "duration_minutes": 10,
    "is_required": true,
    "order_index": 4
  }
]'::jsonb
WHERE program_id = 'e5761964-d5fa-4a40-9722-37eb5bbabaa6' 
AND title = 'Effective Communication Foundations';

-- Update Public Speaking & Presentation Skills module
UPDATE public.learning_modules 
SET content_sections = '[
  {
    "id": "overcoming_anxiety",
    "title": "Overcoming Presentation Anxiety",
    "type": "article",
    "content": {
      "text": "Presentation anxiety is common and normal. The key is to channel that energy into enthusiasm and preparation. Techniques include deep breathing, visualization, and thorough preparation.",
      "techniques": [
        "Deep breathing exercises before speaking",
        "Positive visualization of successful presentations",
        "Thorough preparation and practice",
        "Focusing on the audience\'s needs rather than your own fears"
      ]
    },
    "description": "Build confidence and manage presentation anxiety",
    "duration_minutes": 10,
    "is_required": true,
    "order_index": 1
  },
  {
    "id": "presentation_structure",
    "title": "The Perfect Presentation Structure",
    "type": "interactive",
    "content": {
      "text": "Every effective presentation follows a clear structure: Opening (hook the audience), Body (deliver your key messages), and Closing (call to action).",
      "interactive_elements": [
        {
          "type": "template_builder",
          "title": "Build Your Presentation Outline",
          "description": "Create a presentation outline using the recommended structure",
          "template": {
            "opening": "Hook: Start with a compelling question, statistic, or story",
            "body": "Main points: Organize 3-5 key messages with supporting evidence",
            "closing": "Call to action: What do you want the audience to do next?"
          }
        }
      ]
    },
    "description": "Learn to structure presentations for maximum impact",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 2
  },
  {
    "id": "visual_aids",
    "title": "Creating Effective Visual Aids",
    "type": "video",
    "content": {
      "text": "Visual aids should support your message, not distract from it. Follow the rule of 6x6: maximum 6 words per line, 6 lines per slide.",
      "best_practices": [
        "Use high contrast colors for readability",
        "Keep text minimal and use bullet points",
        "Include relevant images and graphics",
        "Practice with your visual aids beforehand"
      ]
    },
    "description": "Master the use of visual aids in presentations",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 3
  },
  {
    "id": "audience_engagement",
    "title": "Engaging Your Audience",
    "type": "interactive",
    "content": {
      "text": "Audience engagement is crucial for presentation success. Use questions, stories, and interactive elements to keep your audience involved.",
      "interactive_elements": [
        {
          "type": "role_play",
          "title": "Practice Audience Engagement",
          "description": "Practice different techniques for engaging different types of audiences",
          "scenarios": [
            "Presenting to executives (focus on results and ROI)",
            "Training new employees (focus on learning and application)",
            "Selling to clients (focus on benefits and value)"
          ]
        }
      ]
    },
    "description": "Learn techniques to engage and connect with audiences",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 4
  }
]'::jsonb
WHERE program_id = 'e5761964-d5fa-4a40-9722-37eb5bbabaa6' 
AND title = 'Public Speaking & Presentation Skills';

-- Update Stakeholder Management & Influence module
UPDATE public.learning_modules 
SET content_sections = '[
  {
    "id": "stakeholder_mapping",
    "title": "Stakeholder Mapping and Analysis",
    "type": "interactive",
    "content": {
      "text": "Effective stakeholder management begins with understanding who your stakeholders are, what they care about, and how much influence they have over your success.",
      "interactive_elements": [
        {
          "type": "stakeholder_matrix",
          "title": "Create Your Stakeholder Matrix",
          "description": "Plot your stakeholders on a matrix of influence vs. interest to prioritize your engagement efforts",
          "quadrants": [
            "High Influence, High Interest: Manage Closely",
            "High Influence, Low Interest: Keep Satisfied",
            "Low Influence, High Interest: Keep Informed",
            "Low Influence, Low Interest: Monitor"
          ]
        }
      ]
    },
    "description": "Learn to identify and analyze stakeholders",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 1
  },
  {
    "id": "influence_strategies",
    "title": "Building Influence Without Authority",
    "type": "article",
    "content": {
      "text": "Influence is the ability to affect others\' behavior, decisions, or opinions. You can build influence through expertise, relationships, and consistent delivery of value.",
      "strategies": [
        "Develop deep expertise in your area",
        "Build strong professional relationships",
        "Consistently deliver value and results",
        "Communicate your ideas clearly and persuasively"
      ]
    },
    "description": "Develop influence without formal authority",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 2
  },
  {
    "id": "relationship_building",
    "title": "Strategic Relationship Building",
    "type": "interactive",
    "content": {
      "text": "Strong professional relationships are built on trust, mutual respect, and shared value. Focus on understanding others\' needs and finding ways to help them succeed.",
      "interactive_elements": [
        {
          "type": "relationship_audit",
          "title": "Conduct a Relationship Audit",
          "description": "Evaluate your current professional relationships and identify opportunities for improvement",
          "questions": [
            "Who are your most important stakeholders?",
            "How well do you understand their priorities?",
            "What value do you provide to them?",
            "How can you strengthen these relationships?"
          ]
        }
      ]
    },
    "description": "Build and maintain strategic professional relationships",
    "duration_minutes": 20,
    "is_required": true,
    "order_index": 3
  }
]'::jsonb
WHERE program_id = 'e5761964-d5fa-4a40-9722-37eb5bbabaa6' 
AND title = 'Stakeholder Management & Influence';

-- Update Conflict Resolution & Negotiation module
UPDATE public.learning_modules 
SET content_sections = '[
  {
    "id": "understanding_conflict",
    "title": "Understanding Workplace Conflict",
    "type": "article",
    "content": {
      "text": "Conflict in the workplace is inevitable and not always negative. When managed properly, conflict can lead to innovation, better solutions, and stronger relationships.",
      "key_concepts": [
        "Conflict is natural when people have different perspectives",
        "Unresolved conflict can damage relationships and productivity",
        "Well-managed conflict can lead to better solutions",
        "Different conflict styles require different approaches"
      ]
    },
    "description": "Understand the nature and benefits of workplace conflict",
    "duration_minutes": 10,
    "is_required": true,
    "order_index": 1
  },
  {
    "id": "conflict_resolution_process",
    "title": "The Conflict Resolution Process",
    "type": "interactive",
    "content": {
      "text": "Effective conflict resolution follows a structured process: Identify the issue, understand all perspectives, find common ground, and develop solutions.",
      "interactive_elements": [
        {
          "type": "conflict_scenario",
          "title": "Practice Conflict Resolution",
          "description": "Work through different conflict scenarios to practice resolution techniques",
          "scenarios": [
            "Team members disagreeing on project approach",
            "Resource allocation conflicts between departments",
            "Personality clashes affecting team dynamics"
          ]
        }
      ]
    },
    "description": "Learn a systematic approach to resolving conflicts",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 2
  },
  {
    "id": "negotiation_techniques",
    "title": "Mastering Negotiation Techniques",
    "type": "video",
    "content": {
      "text": "Successful negotiation is about finding mutually beneficial solutions. Focus on interests rather than positions, and look for creative options that satisfy all parties.",
      "techniques": [
        "Separate people from the problem",
        "Focus on interests, not positions",
        "Generate multiple options before deciding",
        "Insist on objective criteria"
      ]
    },
    "description": "Develop effective negotiation skills",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 3
  },
  {
    "id": "mediation_skills",
    "title": "Developing Mediation Skills",
    "type": "interactive",
    "content": {
      "text": "As a leader, you may need to mediate conflicts between team members. Mediation requires neutrality, active listening, and helping parties find their own solutions.",
      "interactive_elements": [
        {
          "type": "mediation_roleplay",
          "title": "Practice Mediation",
          "description": "Practice mediating conflicts between team members",
          "steps": [
            "Set ground rules for the discussion",
            "Allow each party to explain their perspective",
            "Identify common interests and concerns",
            "Help parties develop their own solutions"
          ]
        }
      ]
    },
    "description": "Learn to mediate conflicts between team members",
    "duration_minutes": 5,
    "is_required": true,
    "order_index": 4
  }
]'::jsonb
WHERE program_id = 'e5761964-d5fa-4a40-9722-37eb5bbabaa6' 
AND title = 'Conflict Resolution & Negotiation';

-- Update Advanced Persuasion Techniques module
UPDATE public.learning_modules 
SET content_sections = '[
  {
    "id": "psychology_persuasion",
    "title": "The Psychology of Persuasion",
    "type": "article",
    "content": {
      "text": "Understanding the psychological principles that drive human decision-making can help you become more persuasive while maintaining ethical standards.",
      "key_concepts": [
        "People make decisions based on emotions and then justify with logic",
        "Social proof is one of the most powerful persuasion tools",
        "Reciprocity creates a sense of obligation to return favors",
        "Authority and expertise increase persuasiveness"
      ]
    },
    "description": "Understand the psychological foundations of persuasion",
    "duration_minutes": 10,
    "is_required": true,
    "order_index": 1
  },
  {
    "id": "persuasion_principles",
    "title": "Cialdini\'s Six Principles of Persuasion",
    "type": "interactive",
    "content": {
      "text": "Robert Cialdini identified six key principles of persuasion: reciprocity, commitment, social proof, authority, liking, and scarcity.",
      "interactive_elements": [
        {
          "type": "principle_application",
          "title": "Apply Persuasion Principles",
          "description": "Practice applying each principle in different professional scenarios",
          "principles": [
            "Reciprocity: People feel obliged to return favors",
            "Commitment: People like to be consistent with their commitments",
            "Social Proof: People follow the lead of similar others",
            "Authority: People defer to credible experts",
            "Liking: People are more easily persuaded by people they like",
            "Scarcity: People want more of what they can have less of"
          ]
        }
      ]
    },
    "description": "Learn and apply the six principles of persuasion",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 2
  },
  {
    "id": "influence_without_authority",
    "title": "Influencing Without Authority",
    "type": "article",
    "content": {
      "text": "You don\'t need formal authority to be influential. Build influence through expertise, relationships, and consistent value delivery.",
      "strategies": [
        "Develop deep expertise in your area",
        "Build strong professional relationships",
        "Consistently deliver value and results",
        "Communicate your ideas clearly and persuasively"
      ]
    },
    "description": "Build influence without formal authority",
    "duration_minutes": 10,
    "is_required": true,
    "order_index": 3
  },
  {
    "id": "consensus_building",
    "title": "Building Consensus Across Groups",
    "type": "interactive",
    "content": {
      "text": "Consensus building requires patience, active listening, and the ability to find common ground among diverse perspectives.",
      "interactive_elements": [
        {
          "type": "consensus_simulation",
          "title": "Practice Consensus Building",
          "description": "Work through scenarios requiring consensus among diverse stakeholders",
          "techniques": [
            "Identify shared interests and goals",
            "Address concerns and objections directly",
            "Find creative solutions that satisfy multiple needs",
            "Build momentum through small wins"
          ]
        }
      ]
    },
    "description": "Learn to build consensus across diverse groups",
    "duration_minutes": 5,
    "is_required": true,
    "order_index": 4
  }
]'::jsonb
WHERE program_id = 'e5761964-d5fa-4a40-9722-37eb5bbabaa6' 
AND title = 'Advanced Persuasion Techniques';

-- Add case studies and frameworks to all Communication & Influence modules
UPDATE public.learning_modules 
SET content_sections = jsonb_set(
  content_sections,
  '{0,content,case_studies}',
  '[
    {
      "title": "Cross-Cultural Communication Challenge",
      "scenario": "A project manager needs to communicate with team members from different cultural backgrounds about a deadline change.",
      "challenge": "How to ensure the message is understood and accepted by all team members despite cultural differences in communication styles.",
      "solution": "Use multiple communication channels, provide context for the change, and allow for questions and clarification.",
      "key_learnings": [
        "Cultural awareness in communication",
        "Importance of multiple communication channels",
        "Value of providing context and rationale"
      ]
    }
  ]'::jsonb
)
WHERE program_id = 'e5761964-d5fa-4a40-9722-37eb5bbabaa6' 
AND title = 'Effective Communication Foundations';

-- Add frameworks to the modules
UPDATE public.learning_modules 
SET content_sections = jsonb_set(
  content_sections,
  '{0,content,frameworks}',
  '[
    {
      "name": "The 7 Cs of Communication",
      "description": "A framework for ensuring clear and effective communication",
      "elements": [
        "Clear: Use simple, direct language",
        "Concise: Get to the point quickly",
        "Concrete: Use specific examples and data",
        "Correct: Ensure accuracy in facts and grammar",
        "Coherent: Organize thoughts logically",
        "Complete: Include all necessary information",
        "Courteous: Be respectful and considerate"
      ]
    }
  ]'::jsonb
)
WHERE program_id = 'e5761964-d5fa-4a40-9722-37eb5bbabaa6' 
AND title = 'Effective Communication Foundations';
