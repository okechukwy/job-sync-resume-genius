import { ProfessionalModule } from '@/types/enhancedContentTypes';

export const communicationInfluenceModule: ProfessionalModule = {
  id: 'communication-influence-module',
  title: 'Communication & Influence Mastery',
  description: 'Comprehensive training program for developing advanced communication skills and influence capabilities in professional settings.',
  duration_hours: 4.5,
  difficulty_level: 'intermediate',
  category: 'Communication & Influence',
  learning_objectives: [
    'Master fundamental communication principles and styles',
    'Develop advanced presentation and public speaking skills',
    'Build stakeholder management and influence strategies',
    'Learn conflict resolution and negotiation techniques',
    'Apply persuasion principles for professional success'
  ],
  prerequisites: [
    'Basic professional experience',
    'Willingness to practice communication skills',
    'Openness to feedback and improvement'
  ],
  content_sections: [
    {
      id: 'effective-communication-foundations',
      title: 'Effective Communication Foundations',
      type: 'video',
      duration_minutes: 40,
      is_required: true,
      order_index: 1,
      content: {
        video_url: '/videos/communication-foundations.mp4',
        transcript: 'Welcome to Effective Communication Foundations. In this module, you will learn the core principles that underpin all successful professional communication.',
        key_concepts: [
          'The Communication Process Model',
          'Verbal vs Non-verbal Communication',
          'Active Listening Techniques',
          'Communication Styles Assessment'
        ],
        learning_objectives: [
          'Understand the fundamental elements of effective communication',
          'Identify your personal communication style',
          'Practice active listening skills',
          'Develop clarity in verbal and written communication'
        ],
        content_blocks: [
          {
            id: 'intro-communication',
            type: 'text',
            title: 'Introduction to Professional Communication',
            content: 'Professional communication is the foundation of all business success. It involves not just what you say, but how you say it, when you say it, and to whom you say it. Effective communication can build relationships, resolve conflicts, and drive organizational success.',
            order_index: 1
          },
          {
            id: 'communication-model',
            type: 'interactive',
            title: 'The Communication Process Model',
            content: 'The communication process involves a sender, message, channel, receiver, and feedback. Understanding this model helps you identify where communication breakdowns occur and how to prevent them.',
            interactive_elements: [
              {
                type: 'drag_drop',
                title: 'Match Communication Elements',
                description: 'Drag each element to its correct position in the communication model',
                options: ['Sender', 'Message', 'Channel', 'Receiver', 'Feedback'],
                correct_sequence: [0, 1, 2, 3, 4]
              }
            ],
            order_index: 2
          },
          {
            id: 'active-listening',
            type: 'video',
            title: 'Mastering Active Listening',
            content: 'Active listening is more than just hearing words. It involves full attention, understanding, responding, and remembering. This skill is crucial for building trust and resolving conflicts.',
            video_url: '/videos/active-listening-demo.mp4',
            practice_exercises: [
              {
                title: 'Listening Assessment',
                description: 'Rate your current listening skills and identify areas for improvement',
                questions: [
                  'How often do you interrupt others while they are speaking?',
                  'Do you maintain eye contact during conversations?',
                  'Do you ask clarifying questions to ensure understanding?'
                ]
              }
            ],
            order_index: 3
          },
          {
            id: 'communication-styles',
            type: 'assessment',
            title: 'Understanding Communication Styles',
            content: 'Different people have different communication preferences. Understanding these styles helps you adapt your approach for maximum effectiveness.',
            assessment: {
              title: 'Communication Style Assessment',
              questions: [
                {
                  question: 'In meetings, you prefer to:',
                  options: [
                    'Speak up early and often',
                    'Listen first, then contribute',
                    'Take detailed notes and follow up later',
                    'Focus on building consensus'
                  ],
                  correct_answer: null // No single correct answer
                },
                {
                  question: 'When giving feedback, you:',
                  options: [
                    'Be direct and straightforward',
                    'Use examples and stories',
                    'Provide written documentation',
                    'Focus on positive reinforcement first'
                  ],
                  correct_answer: null
                }
              ]
            },
            order_index: 4
          }
        ],
        case_studies: [
          {
            title: 'Cross-Cultural Communication Challenge',
            scenario: 'A project manager needs to communicate with team members from different cultural backgrounds about a deadline change.',
            challenge: 'How to ensure the message is understood and accepted by all team members despite cultural differences in communication styles.',
            solution: 'Use multiple communication channels, provide context for the change, and allow for questions and clarification.',
            key_learnings: [
              'Cultural awareness in communication',
              'Importance of multiple communication channels',
              'Value of providing context and rationale'
            ]
          }
        ],
        frameworks: [
          {
            name: 'The 7 Cs of Communication',
            description: 'A framework for ensuring clear and effective communication',
            elements: [
              'Clear: Use simple, direct language',
              'Concise: Get to the point quickly',
              'Concrete: Use specific examples and data',
              'Correct: Ensure accuracy in facts and grammar',
              'Coherent: Organize thoughts logically',
              'Complete: Include all necessary information',
              'Courteous: Be respectful and considerate'
            ]
          }
        ]
      }
    },
    {
      id: 'public-speaking-presentation',
      title: 'Public Speaking & Presentation Skills',
      type: 'interactive',
      duration_minutes: 55,
      is_required: true,
      order_index: 2,
      content: {
        learning_objectives: [
          'Overcome presentation anxiety and build confidence',
          'Structure presentations for maximum impact',
          'Use visual aids effectively',
          'Engage and connect with diverse audiences'
        ],
        content_blocks: [
          {
            id: 'overcoming-anxiety',
            type: 'text',
            title: 'Overcoming Presentation Anxiety',
            content: 'Presentation anxiety is common and normal. The key is to channel that energy into enthusiasm and preparation. Techniques include deep breathing, visualization, and thorough preparation.',
            order_index: 1
          },
          {
            id: 'presentation-structure',
            type: 'interactive',
            title: 'The Perfect Presentation Structure',
            content: 'Every effective presentation follows a clear structure: Opening (hook the audience), Body (deliver your key messages), and Closing (call to action).',
            interactive_elements: [
              {
                type: 'template_builder',
                title: 'Build Your Presentation Outline',
                description: 'Create a presentation outline using the recommended structure',
                template: {
                  opening: 'Hook: Start with a compelling question, statistic, or story',
                  body: 'Main points: Organize 3-5 key messages with supporting evidence',
                  closing: 'Call to action: What do you want the audience to do next?'
                }
              }
            ],
            order_index: 2
          },
          {
            id: 'visual-aids',
            type: 'video',
            title: 'Creating Effective Visual Aids',
            content: 'Visual aids should support your message, not distract from it. Follow the rule of 6x6: maximum 6 words per line, 6 lines per slide.',
            video_url: '/videos/visual-aids-best-practices.mp4',
            best_practices: [
              'Use high contrast colors for readability',
              'Keep text minimal and use bullet points',
              'Include relevant images and graphics',
              'Practice with your visual aids beforehand'
            ],
            order_index: 3
          },
          {
            id: 'audience-engagement',
            type: 'interactive',
            title: 'Engaging Your Audience',
            content: 'Audience engagement is crucial for presentation success. Use questions, stories, and interactive elements to keep your audience involved.',
            interactive_elements: [
              {
                type: 'role_play',
                title: 'Practice Audience Engagement',
                description: 'Practice different techniques for engaging different types of audiences',
                scenarios: [
                  'Presenting to executives (focus on results and ROI)',
                  'Training new employees (focus on learning and application)',
                  'Selling to clients (focus on benefits and value)'
                ]
              }
            ],
            order_index: 4
          }
        ],
        practice_exercises: [
          {
            title: 'Impromptu Speaking Practice',
            description: 'Practice speaking on random topics for 2-3 minutes to build confidence and adaptability',
            topics: [
              'The future of remote work',
              'The importance of work-life balance',
              'How technology is changing our industry'
            ]
          },
          {
            title: 'Presentation Recording',
            description: 'Record yourself giving a 5-minute presentation and review for improvement areas',
            evaluation_criteria: [
              'Clarity of speech and pace',
              'Body language and eye contact',
              'Structure and organization',
              'Engagement techniques used'
            ]
          }
        ],
        case_studies: [
          {
            title: 'The Failed Product Launch Presentation',
            scenario: 'A product manager presents a new product to the board but fails to get approval due to poor presentation skills.',
            challenge: 'The presentation was too technical, lacked clear benefits, and didn't address board concerns about market viability.',
            solution: 'Restructure the presentation to focus on business impact, use simple language, and address potential concerns upfront.',
            key_learnings: [
              'Know your audience and their priorities',
              'Focus on benefits, not just features',
              'Anticipate and address concerns'
            ]
          }
        ]
      }
    },
    {
      id: 'stakeholder-management',
      title: 'Stakeholder Management & Influence',
      type: 'article',
      duration_minutes: 50,
      is_required: true,
      order_index: 3,
      content: {
        learning_objectives: [
          'Map and analyze stakeholder relationships',
          'Develop influence strategies for different stakeholders',
          'Manage competing interests and priorities',
          'Build long-term stakeholder relationships'
        ],
        content_blocks: [
          {
            id: 'stakeholder-mapping',
            type: 'interactive',
            title: 'Stakeholder Mapping and Analysis',
            content: 'Effective stakeholder management begins with understanding who your stakeholders are, what they care about, and how much influence they have over your success.',
            interactive_elements: [
              {
                type: 'stakeholder_matrix',
                title: 'Create Your Stakeholder Matrix',
                description: 'Plot your stakeholders on a matrix of influence vs. interest to prioritize your engagement efforts',
                quadrants: [
                  'High Influence, High Interest: Manage Closely',
                  'High Influence, Low Interest: Keep Satisfied',
                  'Low Influence, High Interest: Keep Informed',
                  'Low Influence, Low Interest: Monitor'
                ]
              }
            ],
            order_index: 1
          },
          {
            id: 'influence-strategies',
            type: 'text',
            title: 'Building Influence Without Authority',
            content: 'Influence is the ability to affect others\' behavior, decisions, or opinions. You can build influence through expertise, relationships, and consistent delivery of value.',
            order_index: 2
          },
          {
            id: 'relationship-building',
            type: 'interactive',
            title: 'Strategic Relationship Building',
            content: 'Strong professional relationships are built on trust, mutual respect, and shared value. Focus on understanding others\' needs and finding ways to help them succeed.',
            interactive_elements: [
              {
                type: 'relationship_audit',
                title: 'Conduct a Relationship Audit',
                description: 'Evaluate your current professional relationships and identify opportunities for improvement',
                questions: [
                  'Who are your most important stakeholders?',
                  'How well do you understand their priorities?',
                  'What value do you provide to them?',
                  'How can you strengthen these relationships?'
                ]
              }
            ],
            order_index: 3
          },
          {
            id: 'managing-conflicts',
            type: 'text',
            title: 'Managing Competing Stakeholder Interests',
            content: 'When stakeholders have conflicting interests, focus on finding common ground and win-win solutions. Use data and objective criteria to support your recommendations.',
            order_index: 4
          }
        ],
        frameworks: [
          {
            name: 'The Influence Model',
            description: 'A systematic approach to building influence in professional settings',
            elements: [
              'Expertise: Develop deep knowledge in your area',
              'Relationships: Build strong professional connections',
              'Communication: Master the art of persuasion',
              'Consistency: Deliver reliable results over time'
            ]
          },
          {
            name: 'Stakeholder Engagement Strategy',
            description: 'A framework for engaging different types of stakeholders',
            elements: [
              'Identify: Who are all the relevant stakeholders?',
              'Analyze: What are their interests and influence levels?',
              'Engage: How will you communicate with each group?',
              'Monitor: How will you track relationship health?'
            ]
          }
        ],
        case_studies: [
          {
            title: 'The Cross-Functional Project Challenge',
            scenario: 'A project manager needs to get buy-in from multiple departments for a new initiative that will require resources from each.',
            challenge: 'Each department has different priorities and concerns about the project\'s impact on their operations.',
            solution: 'Hold individual meetings with each stakeholder to understand their concerns, then develop a comprehensive communication plan that addresses each group\'s specific needs.',
            key_learnings: [
              'One-size-fits-all communication doesn\'t work',
              'Understanding stakeholder concerns is crucial',
              'Tailored communication increases buy-in'
            ]
          }
        ]
      }
    },
    {
      id: 'conflict-resolution',
      title: 'Conflict Resolution & Negotiation',
      type: 'video',
      duration_minutes: 45,
      is_required: true,
      order_index: 4,
      content: {
        learning_objectives: [
          'Identify the root causes of workplace conflicts',
          'Apply proven conflict resolution techniques',
          'Master negotiation strategies for win-win outcomes',
          'Develop mediation skills for team conflicts'
        ],
        content_blocks: [
          {
            id: 'understanding-conflict',
            type: 'text',
            title: 'Understanding Workplace Conflict',
            content: 'Conflict in the workplace is inevitable and not always negative. When managed properly, conflict can lead to innovation, better solutions, and stronger relationships.',
            order_index: 1
          },
          {
            id: 'conflict-resolution-process',
            type: 'interactive',
            title: 'The Conflict Resolution Process',
            content: 'Effective conflict resolution follows a structured process: Identify the issue, understand all perspectives, find common ground, and develop solutions.',
            interactive_elements: [
              {
                type: 'conflict_scenario',
                title: 'Practice Conflict Resolution',
                description: 'Work through different conflict scenarios to practice resolution techniques',
                scenarios: [
                  'Team members disagreeing on project approach',
                  'Resource allocation conflicts between departments',
                  'Personality clashes affecting team dynamics'
                ]
              }
            ],
            order_index: 2
          },
          {
            id: 'negotiation-techniques',
            type: 'video',
            title: 'Mastering Negotiation Techniques',
            content: 'Successful negotiation is about finding mutually beneficial solutions. Focus on interests rather than positions, and look for creative options that satisfy all parties.',
            video_url: '/videos/negotiation-techniques.mp4',
            techniques: [
              'Separate people from the problem',
              'Focus on interests, not positions',
              'Generate multiple options before deciding',
              'Insist on objective criteria'
            ],
            order_index: 3
          },
          {
            id: 'mediation-skills',
            type: 'interactive',
            title: 'Developing Mediation Skills',
            content: 'As a leader, you may need to mediate conflicts between team members. Mediation requires neutrality, active listening, and helping parties find their own solutions.',
            interactive_elements: [
              {
                type: 'mediation_roleplay',
                title: 'Practice Mediation',
                description: 'Practice mediating conflicts between team members',
                steps: [
                  'Set ground rules for the discussion',
                  'Allow each party to explain their perspective',
                  'Identify common interests and concerns',
                  'Help parties develop their own solutions'
                ]
              }
            ],
            order_index: 4
          }
        ],
        frameworks: [
          {
            name: 'The Thomas-Kilmann Conflict Mode Instrument',
            description: 'Five approaches to handling conflict',
            elements: [
              'Competing: Assertive and uncooperative',
              'Collaborating: Assertive and cooperative',
              'Compromising: Moderate assertiveness and cooperation',
              'Avoiding: Unassertive and uncooperative',
              'Accommodating: Unassertive and cooperative'
            ]
          }
        ],
        case_studies: [
          {
            title: 'The Budget Allocation Dispute',
            scenario: 'Two department heads are competing for the same budget allocation, and the conflict is affecting team morale and productivity.',
            challenge: 'Both departments have legitimate needs, but resources are limited. The conflict has become personal and is affecting the broader organization.',
            solution: 'Facilitate a structured discussion to identify shared goals, explore creative funding options, and develop a phased approach that addresses both departments\' needs over time.',
            key_learnings: [
              'Focus on shared interests and goals',
              'Look for creative solutions beyond traditional options',
              'Sometimes compromise is better than continued conflict'
            ]
          }
        ]
      }
    },
    {
      id: 'advanced-persuasion',
      title: 'Advanced Persuasion Techniques',
      type: 'assessment',
      duration_minutes: 40,
      is_required: true,
      order_index: 5,
      content: {
        learning_objectives: [
          'Apply psychological principles of persuasion',
          'Develop influence without formal authority',
          'Build consensus across diverse groups',
          'Master ethical persuasion techniques'
        ],
        content_blocks: [
          {
            id: 'psychology-of-persuasion',
            type: 'text',
            title: 'The Psychology of Persuasion',
            content: 'Understanding the psychological principles that drive human decision-making can help you become more persuasive while maintaining ethical standards.',
            order_index: 1
          },
          {
            id: 'persuasion-principles',
            type: 'interactive',
            title: 'Cialdini\'s Six Principles of Persuasion',
            content: 'Robert Cialdini identified six key principles of persuasion: reciprocity, commitment, social proof, authority, liking, and scarcity.',
            interactive_elements: [
              {
                type: 'principle_application',
                title: 'Apply Persuasion Principles',
                description: 'Practice applying each principle in different professional scenarios',
                principles: [
                  'Reciprocity: People feel obliged to return favors',
                  'Commitment: People like to be consistent with their commitments',
                  'Social Proof: People follow the lead of similar others',
                  'Authority: People defer to credible experts',
                  'Liking: People are more easily persuaded by people they like',
                  'Scarcity: People want more of what they can have less of'
                ]
              }
            ],
            order_index: 2
          },
          {
            id: 'influence-without-authority',
            type: 'text',
            title: 'Influencing Without Authority',
            content: 'You don\'t need formal authority to be influential. Build influence through expertise, relationships, and consistent value delivery.',
            order_index: 3
          },
          {
            id: 'consensus-building',
            type: 'interactive',
            title: 'Building Consensus Across Groups',
            content: 'Consensus building requires patience, active listening, and the ability to find common ground among diverse perspectives.',
            interactive_elements: [
              {
                type: 'consensus_simulation',
                title: 'Practice Consensus Building',
                description: 'Work through scenarios requiring consensus among diverse stakeholders',
                techniques: [
                  'Identify shared interests and goals',
                  'Address concerns and objections directly',
                  'Find creative solutions that satisfy multiple needs',
                  'Build momentum through small wins'
                ]
              }
            ],
            order_index: 4
          }
        ],
        assessment: {
          title: 'Persuasion Skills Assessment',
          description: 'Test your understanding of persuasion principles and techniques',
          questions: [
            {
              question: 'Which principle of persuasion involves showing that others like you are already doing something?',
              options: [
                'Reciprocity',
                'Social Proof',
                'Authority',
                'Scarcity'
              ],
              correct_answer: 1,
              explanation: 'Social proof involves showing that others, especially similar others, are already engaging in the desired behavior.'
            },
            {
              question: 'When building consensus, what is the most important first step?',
              options: [
                'Present your solution immediately',
                'Identify shared interests and goals',
                'Address all objections upfront',
                'Use authority to push through decisions'
              ],
              correct_answer: 1,
              explanation: 'Finding common ground and shared interests is crucial for building consensus among diverse stakeholders.'
            }
          ]
        },
        frameworks: [
          {
            name: 'The Persuasion Process',
            description: 'A systematic approach to ethical persuasion',
            elements: [
              'Establish credibility and trust',
              'Understand your audience\'s needs and concerns',
              'Present your case clearly and logically',
              'Address objections and concerns',
              'Call for specific action'
            ]
          }
        ],
        case_studies: [
          {
            title: 'The Change Initiative Challenge',
            scenario: 'A manager needs to persuade a resistant team to adopt a new process that will improve efficiency but requires significant learning and adaptation.',
            challenge: 'The team is comfortable with the current process and concerned about the time investment required for the new system.',
            solution: 'Use social proof by sharing success stories from other teams, address concerns directly, provide comprehensive training and support, and start with a pilot program to demonstrate benefits.',
            key_learnings: [
              'Address concerns directly and honestly',
              'Use social proof to reduce perceived risk',
              'Provide support to ease the transition',
              'Start small to build confidence'
            ]
          }
        ]
      }
    }
  ],
  assessments: [
    {
      id: 'communication-skills-assessment',
      title: 'Communication Skills Self-Assessment',
      description: 'Evaluate your current communication skills and identify areas for improvement',
      questions: [
        {
          question: 'How would you rate your active listening skills?',
          type: 'scale',
          scale: { min: 1, max: 5, labels: ['Poor', 'Excellent'] }
        },
        {
          question: 'How comfortable are you with public speaking?',
          type: 'scale',
          scale: { min: 1, max: 5, labels: ['Very Uncomfortable', 'Very Comfortable'] }
        },
        {
          question: 'How well do you handle workplace conflicts?',
          type: 'scale',
          scale: { min: 1, max: 5, labels: ['Poorly', 'Very Well'] }
        }
      ]
    }
  ],
  resources: [
    {
      title: 'Communication Styles Assessment Tool',
      type: 'tool',
      url: '/tools/communication-styles-assessment',
      description: 'Interactive assessment to identify your communication style and preferences'
    },
    {
      title: 'Presentation Skills Checklist',
      type: 'checklist',
      url: '/resources/presentation-skills-checklist',
      description: 'Comprehensive checklist for preparing and delivering effective presentations'
    },
    {
      title: 'Conflict Resolution Templates',
      type: 'template',
      url: '/resources/conflict-resolution-templates',
      description: 'Templates and frameworks for resolving workplace conflicts'
    }
  ]
};

export default communicationInfluenceModule;
