import { ProfessionalModule } from '@/types/enhancedContentTypes';

export const executivePresenceModule: ProfessionalModule = {
  id: 'e1b6c2a5-7f4d-4e0b-2b1c-4567890123de',
  title: 'Executive Presence & Influence',
  description: 'Develop commanding executive presence and master advanced influence strategies. Learn to communicate with impact, build strategic relationships, and lead with authority.',
  duration_minutes: 190,
  difficulty_level: 'advanced',
  learning_objectives: [
    'Project authentic executive presence in all interactions',
    'Master advanced influence and persuasion techniques',
    'Build and leverage strategic stakeholder relationships',
    'Communicate with clarity and impact at executive levels',
    'Navigate complex political dynamics with skill'
  ],
  prerequisites: ['Senior management experience', 'Advanced communication skills', 'Leadership experience'],
  target_audience: ['Senior executives', 'C-suite leaders', 'Board members', 'Executive coaches'],
  industry_applications: ['All industries', 'Multinational corporations', 'Board governance', 'Public sector'],
  competency_level: {
    entry_level: 'Established leadership credibility and executive role',
    target_level: 'Commanding executive presence and influence mastery',
    mastery_indicators: [
      'Consistently influences at highest organizational levels',
      'Coaches other executives in presence and influence',
      'Shapes industry and market conversations'
    ]
  },
  content_sections: [
    {
      id: 'presence-foundations',
      title: 'Foundations of Executive Presence',
      type: 'framework_guide',
      duration_minutes: 70,
      description: 'Master the core elements of executive presence including gravitas, communication, and appearance that create lasting impact.',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Understand the three pillars of executive presence',
        'Develop authentic gravitas and confidence',
        'Master executive-level communication skills'
      ],
      content_blocks: [
        {
          id: 'presence-model',
          type: 'framework',
          title: 'Executive Presence Model',
          content: {
            id: 'presence-framework',
            name: 'Three Pillars of Executive Presence',
            description: 'Comprehensive framework for developing commanding executive presence',
            steps: [
              {
                step_number: 1,
                title: 'Gravitas',
                description: 'The substance and weight of your leadership presence',
                key_actions: [
                  'Demonstrate deep knowledge and expertise',
                  'Show confidence under pressure',
                  'Make tough decisions with conviction',
                  'Maintain composure in challenging situations',
                  'Display emotional intelligence and maturity'
                ],
                examples: [
                  'Leading through crisis with calm authority',
                  'Making unpopular but necessary decisions',
                  'Handling difficult stakeholder conversations'
                ]
              },
              {
                step_number: 2,
                title: 'Communication',
                description: 'Ability to connect and influence through powerful communication',
                key_actions: [
                  'Speak with clarity and concision',
                  'Tell compelling stories and narratives',
                  'Listen actively and ask insightful questions',
                  'Adapt style to audience and context',
                  'Use silence and pacing effectively'
                ],
                examples: [
                  'Board presentation delivery',
                  'Town hall leadership communication',
                  'Media interviews and public speaking'
                ]
              },
              {
                step_number: 3,
                title: 'Appearance',
                description: 'Professional image that reinforces your leadership brand',
                key_actions: [
                  'Dress appropriately for role and context',
                  'Maintain strong posture and body language',
                  'Project energy and vitality',
                  'Use gestures and movement purposefully',
                  'Create consistent professional image'
                ],
                examples: [
                  'Executive wardrobe and grooming',
                  'Confident body language in meetings',
                  'Professional digital presence'
                ]
              }
            ],
            when_to_use: 'In all executive leadership interactions and public representations',
            benefits: [
              'Increased leadership credibility',
              'Greater influence and persuasion',
              'Enhanced career advancement opportunities',
              'Stronger stakeholder confidence'
            ],
            common_pitfalls: [
              'Overemphasis on appearance over substance',
              'Inauthentic or forced presence',
              'Inconsistent presence across contexts',
              'Neglecting emotional intelligence aspects'
            ]
          },
          order_index: 1
        },
        {
          id: 'gravitas-development',
          type: 'key_points',
          title: 'Building Executive Gravitas',
          content: [
            'Develop deep expertise in your domain and industry',
            'Demonstrate resilience and grace under pressure',
            'Show conviction in your decisions and vision',
            'Display emotional regulation and maturity',
            'Maintain authenticity while projecting strength',
            'Balance confidence with humility and learning'
          ],
          order_index: 2
        }
      ],
      interactive_elements: [
        {
          id: 'presence-assessment',
          title: 'Executive Presence Self-Assessment',
          type: 'self_assessment',
          instructions: 'Evaluate your current executive presence across the three pillars and identify development priorities.',
          reflection_prompts: [
            'How do others perceive your gravitas and authority?',
            'What communication patterns enhance or diminish your presence?',
            'How does your professional image support your leadership goals?'
          ],
          success_criteria: [
            'Honestly assesses presence strengths and gaps',
            'Identifies specific development opportunities',
            'Creates action plan for presence enhancement'
          ]
        }
      ],
      practical_applications: [
        'Board meeting leadership',
        'Investor presentations',
        'Media interviews',
        'Industry conference speaking'
      ],
      additional_resources: [
        {
          title: 'Executive Presence Development Plan',
          type: 'template',
          description: 'Structured plan for developing executive presence',
          internal: true
        }
      ]
    },
    {
      id: 'influence-strategies',
      title: 'Advanced Influence and Persuasion',
      type: 'case_study',
      duration_minutes: 80,
      description: 'Master sophisticated influence strategies including Cialdini\'s principles and stakeholder mapping for complex organizational dynamics.',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Apply Cialdini\'s principles of influence in executive contexts',
        'Map and influence complex stakeholder networks',
        'Navigate organizational politics with integrity'
      ],
      content_blocks: [
        {
          id: 'cialdini-principles',
          type: 'framework',
          title: 'Cialdini\'s Principles of Influence',
          content: {
            id: 'influence-principles',
            name: 'Six Principles of Influence (Cialdini)',
            description: 'Scientifically proven principles for ethical influence and persuasion',
            steps: [
              {
                step_number: 1,
                title: 'Reciprocity',
                description: 'People feel obligated to return favors and kindness',
                key_actions: [
                  'Provide value before asking for something',
                  'Make the first move in building relationships',
                  'Offer help and support to others',
                  'Remember and acknowledge others\' contributions'
                ],
                examples: [
                  'Sharing valuable insights or connections',
                  'Supporting colleagues\' initiatives',
                  'Providing helpful introductions'
                ]
              },
              {
                step_number: 2,
                title: 'Commitment/Consistency',
                description: 'People align actions with their commitments and values',
                key_actions: [
                  'Get people to make verbal or written commitments',
                  'Appeal to existing values and beliefs',
                  'Start with small agreements and build',
                  'Use their own words and arguments'
                ],
                examples: [
                  'Getting team members to commit to goals',
                  'Referencing past successful decisions',
                  'Building on stated organizational values'
                ]
              },
              {
                step_number: 3,
                title: 'Social Proof',
                description: 'People follow the lead of similar others',
                key_actions: [
                  'Share examples of peer organizations',
                  'Highlight testimonials and success stories',
                  'Show momentum and adoption trends',
                  'Use industry benchmarks and best practices'
                ],
                examples: [
                  'Referencing competitor successes',
                  'Sharing customer testimonials',
                  'Highlighting industry trend adoption'
                ]
              },
              {
                step_number: 4,
                title: 'Authority',
                description: 'People defer to experts and authority figures',
                key_actions: [
                  'Establish your credentials and expertise',
                  'Reference authoritative sources',
                  'Show track record of success',
                  'Use expert endorsements'
                ],
                examples: [
                  'Sharing relevant experience and achievements',
                  'Citing respected industry experts',
                  'Referencing successful past initiatives'
                ]
              },
              {
                step_number: 5,
                title: 'Liking',
                description: 'People are more easily influenced by those they like',
                key_actions: [
                  'Find genuine common ground',
                  'Give sincere compliments',
                  'Show interest in others',
                  'Build personal connections'
                ],
                examples: [
                  'Discovering shared interests or values',
                  'Acknowledging others\' expertise',
                  'Building rapport through conversation'
                ]
              },
              {
                step_number: 6,
                title: 'Scarcity',
                description: 'People value things more when they are rare or limited',
                key_actions: [
                  'Highlight unique opportunities',
                  'Emphasize time-sensitive situations',
                  'Show exclusive benefits',
                  'Focus on potential losses'
                ],
                examples: [
                  'Limited-time strategic opportunities',
                  'Exclusive partnership possibilities',
                  'First-mover advantages'
                ]
              }
            ],
            when_to_use: 'In all influence situations while maintaining ethical standards',
            benefits: [
              'More effective persuasion and influence',
              'Ethical approach to influence',
              'Better stakeholder buy-in',
              'Increased leadership effectiveness'
            ],
            common_pitfalls: [
              'Using principles manipulatively',
              'Over-reliance on single principles',
              'Ignoring cultural context',
              'Sacrificing authenticity for influence'
            ]
          },
          order_index: 1
        }
      ],
      case_studies: [
        {
          id: 'merger-integration',
          title: 'Leading Through Complex Merger Integration',
          scenario: 'CEO must integrate two companies with different cultures, systems, and stakeholder interests while maintaining performance.',
          background: 'Technology company acquiring a traditional manufacturing firm - significant cultural differences, overlapping roles, and concerned stakeholders.',
          challenge: 'Successfully integrate operations while retaining key talent, maintaining customer relationships, and achieving synergy targets.',
          context: {
            industry: 'Technology/Manufacturing',
            company_size: 'Large multinational',
            timeline: '18-month integration period'
          },
          analysis_points: [
            'Stakeholder mapping and influence strategy',
            'Cultural integration and change management',
            'Communication strategy for different audiences',
            'Coalition building across organizations',
            'Resistance management and conflict resolution'
          ],
          discussion_questions: [
            'How do you balance competing stakeholder interests?',
            'What influence strategies work best in merger situations?',
            'How do you maintain momentum while managing resistance?'
          ],
          key_takeaways: [
            'Multiple influence strategies needed for complex stakeholder landscape',
            'Cultural sensitivity crucial for successful integration',
            'Early wins and clear communication build confidence'
          ],
          related_concepts: ['Stakeholder management', 'Change leadership', 'Corporate strategy']
        }
      ],
      practical_applications: [
        'Board influence and governance',
        'Investor relations and fundraising',
        'Strategic partnership negotiations',
        'Crisis leadership and communication'
      ],
      additional_resources: [
        {
          title: 'Stakeholder Influence Mapping Tool',
          type: 'tool',
          description: 'Framework for mapping and influencing complex stakeholder networks',
          internal: true
        }
      ]
    },
    {
      id: 'strategic-communication',
      title: 'Strategic Communication and Relationship Building',
      type: 'interactive',
      duration_minutes: 40,
      description: 'Master executive-level communication skills and build powerful strategic relationships that drive business results.',
      is_required: true,
      order_index: 3,
      learning_outcomes: [
        'Communicate complex strategies with clarity and impact',
        'Build and maintain strategic executive relationships',
        'Navigate difficult conversations with confidence'
      ],
      content_blocks: [
        {
          id: 'strategic-messaging',
          type: 'key_points',
          title: 'Strategic Message Construction',
          content: [
            'Lead with the bottom line and key message',
            'Use the pyramid principle for logical structure',
            'Tailor complexity and detail to audience needs',
            'Include compelling data and evidence',
            'End with clear call to action or next steps',
            'Anticipate and address likely questions or concerns'
          ],
          order_index: 1
        }
      ],
      interactive_elements: [
        {
          id: 'executive-communication',
          title: 'Executive Communication Simulation',
          type: 'role_play',
          instructions: 'Practice delivering complex strategic messages to different executive audiences with varying interests and expertise.',
          reflection_prompts: [
            'How did you adapt your message for different audiences?',
            'What techniques helped you maintain executive attention?',
            'How did you handle challenging questions or pushback?'
          ],
          success_criteria: [
            'Delivers clear, compelling strategic messages',
            'Adapts communication style to audience',
            'Handles questions and objections professionally'
          ]
        }
      ],
      practical_applications: [
        'Board strategy presentations',
        'Executive team alignment',
        'Investor and analyst communications',
        'Strategic partnership discussions'
      ],
      additional_resources: [
        {
          title: 'Executive Communication Templates',
          type: 'template',
          description: 'Templates for various executive communication scenarios',
          internal: true
        }
      ]
    }
  ]
};