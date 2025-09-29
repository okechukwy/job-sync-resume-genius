import { ProfessionalModule } from '@/types/enhancedContentTypes';

export const teamDevelopmentModule: ProfessionalModule = {
  id: 'c9f4a0e3-5d2b-4c8f-0f9a-2345678901bc',
  title: 'Team Development & Performance',
  description: 'Build and lead high-performing teams through systematic development approaches. Master team dynamics, performance management, and coaching strategies that drive exceptional results.',
  duration_minutes: 200,
  difficulty_level: 'intermediate',
  learning_objectives: [
    'Design and implement team development strategies',
    'Apply performance management frameworks for team optimization',
    'Master coaching techniques for individual team members',
    'Build psychological safety and team cohesion',
    'Measure and improve team performance metrics'
  ],
  prerequisites: ['Basic leadership experience', 'Understanding of team dynamics'],
  target_audience: ['Team leaders', 'Middle managers', 'HR professionals', 'Project managers'],
  industry_applications: ['Technology', 'Professional services', 'Healthcare', 'Financial services'],
  competency_level: {
    entry_level: 'Basic team leadership and people management skills',
    target_level: 'Advanced team development and performance optimization',
    mastery_indicators: [
      'Consistently builds high-performing teams',
      'Develops other team leaders effectively',
      'Creates sustainable team performance systems'
    ]
  },
  content_sections: [
    {
      id: 'team-formation',
      title: 'Team Formation and Development Stages',
      type: 'framework_guide',
      duration_minutes: 70,
      description: 'Understand the stages of team development and how to guide teams through each phase for optimal performance.',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Recognize and navigate team development stages',
        'Apply interventions appropriate to each stage',
        'Accelerate team formation and norming processes'
      ],
      content_blocks: [
        {
          id: 'tuckman-model',
          type: 'framework',
          title: 'Tuckman Team Development Model',
          content: {
            id: 'tuckman-stages',
            name: 'Tuckman\'s Stages of Team Development',
            description: 'A framework for understanding how teams evolve from formation to high performance',
            steps: [
              {
                step_number: 1,
                title: 'Forming',
                description: 'Team members come together and begin to understand their purpose',
                key_actions: [
                  'Establish clear team charter and objectives',
                  'Define roles and responsibilities',
                  'Set ground rules and expectations',
                  'Build initial relationships and trust'
                ],
                examples: [
                  'Team kickoff meetings',
                  'Role clarification workshops',
                  'Team building activities'
                ]
              },
              {
                step_number: 2,
                title: 'Storming',
                description: 'Conflicts and challenges emerge as team members assert themselves',
                key_actions: [
                  'Facilitate open discussion of conflicts',
                  'Mediate disagreements constructively',
                  'Reinforce team goals and values',
                  'Support individual growth and adaptation'
                ],
                examples: [
                  'Conflict resolution sessions',
                  'Values alignment discussions',
                  'Individual coaching conversations'
                ]
              },
              {
                step_number: 3,
                title: 'Norming',
                description: 'Team establishes working patterns and mutual respect',
                key_actions: [
                  'Reinforce positive team behaviors',
                  'Establish sustainable work processes',
                  'Celebrate early wins and progress',
                  'Strengthen team identity and culture'
                ],
                examples: [
                  'Process optimization sessions',
                  'Team celebration events',
                  'Culture-building activities'
                ]
              },
              {
                step_number: 4,
                title: 'Performing',
                description: 'Team operates at high effectiveness with minimal supervision',
                key_actions: [
                  'Focus on continuous improvement',
                  'Delegate authority and autonomy',
                  'Challenge team with stretch goals',
                  'Share leadership responsibilities'
                ],
                examples: [
                  'Self-organizing work structures',
                  'Innovation and improvement projects',
                  'Leadership rotation opportunities'
                ]
              }
            ],
            when_to_use: 'When forming new teams or when existing teams face major changes',
            benefits: [
              'Predictable framework for team evolution',
              'Targeted interventions for each stage',
              'Faster progression to high performance',
              'Better conflict management'
            ],
            common_pitfalls: [
              'Rushing through early stages',
              'Avoiding necessary conflict in storming',
              'Lack of structure in norming phase',
              'Complacency in performing stage'
            ]
          },
          order_index: 1
        }
      ],
      interactive_elements: [
        {
          id: 'team-stage-assessment',
          title: 'Team Development Stage Assessment',
          type: 'self_assessment',
          instructions: 'Evaluate your current team\'s development stage and identify appropriate interventions.',
          reflection_prompts: [
            'What behaviors indicate your team\'s current stage?',
            'What interventions would help your team progress?',
            'How can you prevent regression to earlier stages?'
          ],
          success_criteria: [
            'Accurately identifies team development stage',
            'Selects appropriate interventions',
            'Plans for stage progression'
          ]
        }
      ],
      practical_applications: [
        'New team launches',
        'Team reorganizations',
        'Cross-functional project teams',
        'Remote team formation'
      ],
      additional_resources: [
        {
          title: 'Team Development Assessment Tool',
          type: 'tool',
          description: 'Diagnostic tool for evaluating team development stage',
          internal: true
        }
      ]
    },
    {
      id: 'performance-coaching',
      title: 'Performance Coaching and Development',
      type: 'case_study',
      duration_minutes: 80,
      description: 'Master individual and team coaching techniques that drive performance improvement and professional growth.',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Apply the GROW coaching model effectively',
        'Provide developmental feedback that motivates',
        'Create individual development plans aligned with team goals'
      ],
      content_blocks: [
        {
          id: 'grow-model',
          type: 'framework',
          title: 'GROW Coaching Framework',
          content: {
            id: 'grow-coaching',
            name: 'GROW Model for Performance Coaching',
            description: 'A structured approach to coaching conversations that drives goal achievement',
            steps: [
              {
                step_number: 1,
                title: 'Goal',
                description: 'Establish clear, specific objectives for the coaching conversation',
                key_actions: [
                  'Define specific, measurable outcomes',
                  'Ensure alignment with broader objectives',
                  'Confirm coachee ownership of goals',
                  'Set realistic timelines'
                ],
                examples: [
                  'Improve presentation skills for client meetings',
                  'Increase team collaboration effectiveness',
                  'Develop strategic thinking capabilities'
                ]
              },
              {
                step_number: 2,
                title: 'Reality',
                description: 'Explore the current situation and understand existing conditions',
                key_actions: [
                  'Gather facts about current performance',
                  'Explore underlying factors and constraints',
                  'Identify strengths and development areas',
                  'Understand impact on others'
                ],
                examples: [
                  'Performance data analysis',
                  '360-degree feedback review',
                  'Skills assessment results'
                ]
              },
              {
                step_number: 3,
                title: 'Options',
                description: 'Generate and explore possible approaches and solutions',
                key_actions: [
                  'Brainstorm multiple alternatives',
                  'Evaluate pros and cons of each option',
                  'Consider resource requirements',
                  'Assess feasibility and impact'
                ],
                examples: [
                  'Training and development programs',
                  'Stretch assignments and projects',
                  'Mentoring and peer learning'
                ]
              },
              {
                step_number: 4,
                title: 'Will/Way Forward',
                description: 'Commit to specific actions and establish accountability',
                key_actions: [
                  'Select specific actions to implement',
                  'Create detailed action plans',
                  'Establish success metrics',
                  'Schedule follow-up and review'
                ],
                examples: [
                  'Development plan with milestones',
                  'Regular check-in schedules',
                  'Success measurement criteria'
                ]
              }
            ],
            when_to_use: 'In formal and informal coaching conversations with team members',
            benefits: [
              'Structured approach to development',
              'Increased coachee ownership',
              'Clear action orientation',
              'Measurable outcomes'
            ],
            common_pitfalls: [
              'Jumping to solutions too quickly',
              'Insufficient exploration of reality',
              'Overwhelming with too many options',
              'Lack of specific commitment'
            ]
          },
          order_index: 1
        }
      ],
      case_studies: [
        {
          id: 'underperforming-team-member',
          title: 'Coaching an Underperforming Team Member',
          scenario: 'A technically skilled team member is struggling with collaboration and communication, affecting team dynamics.',
          background: 'Sarah is a highly technical software developer with excellent coding skills but difficulty in team meetings and collaborative work.',
          challenge: 'Her reluctance to participate in discussions and share knowledge is creating silos and frustrating other team members.',
          context: {
            industry: 'Technology',
            company_size: 'Mid-size startup',
            timeline: '3-month improvement plan'
          },
          analysis_points: [
            'Root cause analysis of collaboration challenges',
            'Individual strengths and development opportunities',
            'Team impact and relationship dynamics',
            'Coaching approach and intervention strategies',
            'Success metrics and measurement approach'
          ],
          discussion_questions: [
            'How do you balance individual strengths with team needs?',
            'What coaching techniques work best for introverted team members?',
            'How do you measure improvement in soft skills?'
          ],
          key_takeaways: [
            'Individual coaching must consider personality and work style',
            'Small wins build confidence for larger improvements',
            'Team integration requires both individual and group interventions'
          ],
          related_concepts: ['Performance management', 'Team dynamics', 'Individual development']
        }
      ],
      practical_applications: [
        'Performance improvement plans',
        'Career development discussions',
        'Skill building initiatives',
        'Succession planning'
      ],
      additional_resources: [
        {
          title: 'Coaching Conversation Templates',
          type: 'template',
          description: 'Structured templates for different types of coaching conversations',
          internal: true
        }
      ]
    },
    {
      id: 'psychological-safety',
      title: 'Building Psychological Safety and Team Culture',
      type: 'interactive',
      duration_minutes: 50,
      description: 'Create an environment where team members feel safe to take risks, make mistakes, and contribute their best thinking.',
      is_required: true,
      order_index: 3,
      learning_outcomes: [
        'Assess and improve team psychological safety',
        'Create culture of learning from failure',
        'Foster inclusive team environments'
      ],
      content_blocks: [
        {
          id: 'safety-indicators',
          type: 'key_points',
          title: 'Indicators of Psychological Safety',
          content: [
            'Team members openly admit mistakes without fear',
            'Difficult topics are discussed constructively',
            'Questions and challenges are welcomed',
            'Risk-taking and experimentation are encouraged',
            'Diverse perspectives are actively sought',
            'Learning from failure is prioritized over blame'
          ],
          order_index: 1
        }
      ],
      interactive_elements: [
        {
          id: 'safety-building-exercise',
          title: 'Psychological Safety Team Assessment',
          type: 'skill_practice',
          instructions: 'Evaluate your team\'s psychological safety level and design interventions to improve it.',
          reflection_prompts: [
            'What behaviors indicate high or low psychological safety?',
            'How do you model vulnerability and learning as a leader?',
            'What practices would improve safety in your team?'
          ],
          success_criteria: [
            'Accurately assesses current psychological safety level',
            'Identifies specific improvement opportunities',
            'Designs actionable safety-building interventions'
          ]
        }
      ],
      practical_applications: [
        'Team culture transformation',
        'Innovation and creativity initiatives',
        'Change management support',
        'Diversity and inclusion efforts'
      ],
      additional_resources: [
        {
          title: 'Psychological Safety Assessment Survey',
          type: 'tool',
          description: 'Team survey tool for measuring psychological safety',
          internal: true
        }
      ]
    }
  ]
};