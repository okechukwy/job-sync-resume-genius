import { ProfessionalModule } from '@/types/enhancedContentTypes';

export const changeLeadershipModule: ProfessionalModule = {
  id: 'd0a5b1f4-6e3c-4d9a-1a0b-3456789012cd',
  title: 'Change Leadership & Innovation',
  description: 'Lead organizational transformation and drive innovation through systematic change management. Master the psychology of change, stakeholder engagement, and innovation processes.',
  duration_minutes: 220,
  difficulty_level: 'advanced',
  learning_objectives: [
    'Design and execute comprehensive change management strategies',
    'Navigate resistance and build coalition for change',
    'Foster innovation culture and creative problem-solving',
    'Measure and sustain change initiatives',
    'Lead digital and cultural transformations'
  ],
  prerequisites: ['Leadership experience', 'Project management basics', 'Understanding of organizational behavior'],
  target_audience: ['Senior managers', 'Change agents', 'Innovation leaders', 'Transformation specialists'],
  industry_applications: ['Technology', 'Healthcare', 'Financial services', 'Manufacturing', 'Government'],
  competency_level: {
    entry_level: 'Experience with leading change initiatives',
    target_level: 'Expert change leadership and innovation facilitation',
    mastery_indicators: [
      'Successfully leads large-scale transformations',
      'Builds sustainable innovation capabilities',
      'Coaches others in change leadership'
    ]
  },
  content_sections: [
    {
      id: 'change-psychology',
      title: 'Psychology of Change and Resistance',
      type: 'framework_guide',
      duration_minutes: 80,
      description: 'Understand the human dynamics of change and master techniques for addressing resistance and building buy-in.',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Analyze sources and types of resistance to change',
        'Apply change psychology frameworks',
        'Design interventions for different stakeholder groups'
      ],
      content_blocks: [
        {
          id: 'kotter-change-model',
          type: 'framework',
          title: 'Kotter\'s 8-Step Change Process',
          content: {
            id: 'kotter-8-steps',
            name: 'Kotter\'s 8-Step Process for Leading Change',
            description: 'A comprehensive framework for managing large-scale organizational change',
            steps: [
              {
                step_number: 1,
                title: 'Create Urgency',
                description: 'Build compelling case for change and motivate action',
                key_actions: [
                  'Identify and communicate market threats and opportunities',
                  'Present compelling data and evidence',
                  'Engage stakeholders in honest discussions',
                  'Create dissatisfaction with status quo'
                ],
                examples: [
                  'Market disruption analysis',
                  'Competitive threat assessment',
                  'Performance gap identification'
                ]
              },
              {
                step_number: 2,
                title: 'Form a Powerful Coalition',
                description: 'Assemble a group with power to lead change',
                key_actions: [
                  'Identify key influencers and decision makers',
                  'Build diverse coalition across functions',
                  'Ensure coalition commitment and alignment',
                  'Establish clear roles and responsibilities'
                ],
                examples: [
                  'Executive steering committee',
                  'Cross-functional change team',
                  'Influential champion network'
                ]
              },
              {
                step_number: 3,
                title: 'Create Vision for Change',
                description: 'Develop clear vision and strategy for change',
                key_actions: [
                  'Articulate compelling future state',
                  'Connect vision to stakeholder values',
                  'Ensure vision is clear and memorable',
                  'Develop supporting strategies'
                ],
                examples: [
                  'Vision statement development',
                  'Strategic roadmap creation',
                  'Success criteria definition'
                ]
              },
              {
                step_number: 4,
                title: 'Communicate Vision',
                description: 'Communicate vision consistently and frequently',
                key_actions: [
                  'Use multiple communication channels',
                  'Address concerns and questions',
                  'Model new behaviors',
                  'Celebrate progress and wins'
                ],
                examples: [
                  'Town hall presentations',
                  'Department briefings',
                  'Success story sharing'
                ]
              },
              {
                step_number: 5,
                title: 'Empower Broad-Based Action',
                description: 'Remove barriers and enable action at all levels',
                key_actions: [
                  'Identify and remove structural barriers',
                  'Provide necessary resources and training',
                  'Delegate authority for change actions',
                  'Encourage risk-taking and innovation'
                ],
                examples: [
                  'Process simplification',
                  'Authority delegation',
                  'Resource reallocation'
                ]
              },
              {
                step_number: 6,
                title: 'Generate Short-Term Wins',
                description: 'Plan for and create visible performance improvements',
                key_actions: [
                  'Identify early win opportunities',
                  'Set short-term targets',
                  'Recognize and reward success',
                  'Communicate achievements widely'
                ],
                examples: [
                  'Quick improvement projects',
                  'Pilot program successes',
                  'Early adopter recognition'
                ]
              },
              {
                step_number: 7,
                title: 'Sustain Acceleration',
                description: 'Use credibility from wins to tackle bigger challenges',
                key_actions: [
                  'Avoid declaring victory too early',
                  'Continue innovation and improvement',
                  'Bring in additional supporters',
                  'Maintain momentum and urgency'
                ],
                examples: [
                  'Phase 2 initiative launch',
                  'Additional capability building',
                  'Expanded change scope'
                ]
              },
              {
                step_number: 8,
                title: 'Institute Change',
                description: 'Anchor new approaches in organizational culture',
                key_actions: [
                  'Reinforce changes through culture',
                  'Update systems and processes',
                  'Develop new leadership',
                  'Create succession plans'
                ],
                examples: [
                  'Culture change initiatives',
                  'New performance metrics',
                  'Leadership development programs'
                ]
              }
            ],
            when_to_use: 'For large-scale organizational transformations',
            benefits: [
              'Systematic approach to change',
              'Addresses both rational and emotional aspects',
              'Builds sustainable change capability',
              'Proven track record of success'
            ],
            common_pitfalls: [
              'Skipping steps or rushing process',
              'Insufficient coalition building',
              'Poor communication of vision',
              'Declaring victory too early'
            ]
          },
          order_index: 1
        },
        {
          id: 'resistance-sources',
          type: 'key_points',
          title: 'Common Sources of Resistance',
          content: [
            'Fear of job security or role changes',
            'Lack of understanding about change rationale',
            'Previous negative change experiences',
            'Comfort with current processes and systems',
            'Insufficient involvement in change planning',
            'Conflicting priorities and resource constraints'
          ],
          order_index: 2
        }
      ],
      interactive_elements: [
        {
          id: 'resistance-analysis',
          title: 'Stakeholder Resistance Analysis',
          type: 'decision_making',
          instructions: 'Analyze stakeholder groups and develop targeted strategies for addressing resistance.',
          scenarios: [
            {
              id: 'digital-transformation',
              situation: 'Company implementing new digital platform requiring significant workflow changes across departments.',
              options: [
                {
                  text: 'Focus on training and skill development',
                  outcome: 'Addresses competency concerns but may not address emotional resistance',
                  feedback: 'Good start - also consider change champions and communication'
                },
                {
                  text: 'Implement gradual rollout with pilot groups',
                  outcome: 'Reduces risk and builds confidence through early wins',
                  feedback: 'Smart approach - allows for learning and refinement'
                },
                {
                  text: 'Mandate immediate adoption across all departments',
                  outcome: 'Fast implementation but high resistance and potential failure',
                  feedback: 'Risky - consider more stakeholder engagement'
                }
              ]
            }
          ],
          reflection_prompts: [
            'What are the root causes of resistance in this situation?',
            'How would you tailor your approach for different stakeholder groups?',
            'What early wins could build momentum for change?'
          ],
          success_criteria: [
            'Identifies multiple sources of resistance',
            'Develops targeted intervention strategies',
            'Plans for stakeholder engagement and communication'
          ]
        }
      ],
      practical_applications: [
        'Digital transformation initiatives',
        'Organizational restructuring',
        'Process improvement projects',
        'Cultural change programs'
      ],
      additional_resources: [
        {
          title: 'Change Readiness Assessment',
          type: 'tool',
          description: 'Tool for evaluating organizational readiness for change',
          internal: true
        }
      ]
    },
    {
      id: 'innovation-processes',
      title: 'Innovation Management and Creative Problem-Solving',
      type: 'case_study',
      duration_minutes: 90,
      description: 'Master systematic approaches to innovation and creative problem-solving that drive breakthrough results.',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Apply design thinking methodology to innovation challenges',
        'Facilitate creative problem-solving sessions',
        'Build innovation pipeline and portfolio management'
      ],
      content_blocks: [
        {
          id: 'design-thinking',
          type: 'framework',
          title: 'Design Thinking for Innovation',
          content: {
            id: 'design-thinking-process',
            name: 'Design Thinking Innovation Process',
            description: 'Human-centered approach to innovation and problem-solving',
            steps: [
              {
                step_number: 1,
                title: 'Empathize',
                description: 'Understand the human needs and experiences',
                key_actions: [
                  'Conduct user research and interviews',
                  'Observe behaviors and pain points',
                  'Map user journeys and experiences',
                  'Build empathy maps and personas'
                ],
                examples: [
                  'Customer interview sessions',
                  'Ethnographic observation',
                  'Journey mapping workshops'
                ]
              },
              {
                step_number: 2,
                title: 'Define',
                description: 'Frame the problem based on user insights',
                key_actions: [
                  'Synthesize research findings',
                  'Define point of view statements',
                  'Identify key insights and opportunities',
                  'Create problem statements'
                ],
                examples: [
                  'How might we... statements',
                  'Problem definition workshops',
                  'Insight synthesis sessions'
                ]
              },
              {
                step_number: 3,
                title: 'Ideate',
                description: 'Generate creative solutions to the problem',
                key_actions: [
                  'Facilitate brainstorming sessions',
                  'Use creative thinking techniques',
                  'Encourage wild ideas and build on others',
                  'Defer judgment and criticism'
                ],
                examples: [
                  'Brainstorming workshops',
                  'SCAMPER technique application',
                  'Idea generation sessions'
                ]
              },
              {
                step_number: 4,
                title: 'Prototype',
                description: 'Build quick, low-cost representations of ideas',
                key_actions: [
                  'Create rapid prototypes',
                  'Test key assumptions',
                  'Make ideas tangible',
                  'Enable early feedback'
                ],
                examples: [
                  'Paper prototypes',
                  'Digital mockups',
                  'Service blueprints'
                ]
              },
              {
                step_number: 5,
                title: 'Test',
                description: 'Get feedback and learn from users',
                key_actions: [
                  'Test prototypes with users',
                  'Gather feedback and insights',
                  'Iterate based on learning',
                  'Refine solutions'
                ],
                examples: [
                  'User testing sessions',
                  'Feedback collection',
                  'Iteration workshops'
                ]
              }
            ],
            when_to_use: 'For human-centered innovation and complex problem-solving',
            benefits: [
              'User-centered solutions',
              'Reduced risk through early testing',
              'Creative breakthrough thinking',
              'Collaborative innovation process'
            ],
            common_pitfalls: [
              'Insufficient user research',
              'Jumping to solutions too quickly',
              'Over-designing prototypes',
              'Ignoring user feedback'
            ]
          },
          order_index: 1
        }
      ],
      case_studies: [
        {
          id: 'healthcare-innovation',
          title: 'Digital Health Innovation Challenge',
          scenario: 'Healthcare organization needs to improve patient experience while reducing costs and maintaining quality.',
          background: 'Regional healthcare system facing patient satisfaction challenges, rising costs, and competitive pressure from new digital health providers.',
          challenge: 'Develop innovative solutions that improve patient experience, reduce operational costs, and differentiate from competitors.',
          context: {
            industry: 'Healthcare',
            company_size: 'Large health system',
            timeline: '12-month innovation program'
          },
          analysis_points: [
            'Patient journey mapping and pain point identification',
            'Technology opportunity assessment',
            'Stakeholder impact analysis including providers and staff',
            'Business model and financial implications',
            'Implementation and change management requirements'
          ],
          discussion_questions: [
            'How do you balance innovation with regulatory compliance?',
            'What role should patients play in the innovation process?',
            'How do you measure success in healthcare innovation?'
          ],
          key_takeaways: [
            'Healthcare innovation requires deep understanding of all stakeholders',
            'Regulatory constraints must be considered early in innovation process',
            'Pilot testing is critical for complex healthcare solutions'
          ],
          related_concepts: ['Design thinking', 'Healthcare transformation', 'Digital innovation']
        }
      ],
      practical_applications: [
        'Product innovation projects',
        'Service design initiatives',
        'Business model innovation',
        'Digital transformation'
      ],
      additional_resources: [
        {
          title: 'Innovation Toolkit and Templates',
          type: 'template',
          description: 'Complete toolkit for innovation facilitation',
          internal: true
        }
      ]
    },
    {
      id: 'change-sustainability',
      title: 'Sustaining Change and Continuous Improvement',
      type: 'interactive',
      duration_minutes: 50,
      description: 'Ensure change initiatives deliver lasting impact through measurement, reinforcement, and continuous improvement.',
      is_required: true,
      order_index: 3,
      learning_outcomes: [
        'Design measurement systems for change initiatives',
        'Create reinforcement mechanisms for new behaviors',
        'Build continuous improvement capabilities'
      ],
      content_blocks: [
        {
          id: 'change-metrics',
          type: 'key_points',
          title: 'Key Change Success Metrics',
          content: [
            'Adoption rates and usage statistics',
            'Performance improvement indicators',
            'Employee engagement and satisfaction',
            'Customer impact and feedback',
            'Financial and operational outcomes',
            'Culture and behavior change indicators'
          ],
          order_index: 1
        }
      ],
      interactive_elements: [
        {
          id: 'sustainability-planning',
          title: 'Change Sustainability Workshop',
          type: 'skill_practice',
          instructions: 'Design a comprehensive plan for sustaining a major change initiative in your organization.',
          reflection_prompts: [
            'What reinforcement mechanisms will support the change?',
            'How will you measure and track success over time?',
            'What continuous improvement processes will you establish?'
          ],
          success_criteria: [
            'Identifies key sustainability challenges',
            'Designs comprehensive measurement approach',
            'Creates plan for continuous reinforcement and improvement'
          ]
        }
      ],
      practical_applications: [
        'Post-implementation support',
        'Change adoption tracking',
        'Continuous improvement programs',
        'Culture transformation sustaining'
      ],
      additional_resources: [
        {
          title: 'Change Sustainability Checklist',
          type: 'template',
          description: 'Comprehensive checklist for sustaining change initiatives',
          internal: true
        }
      ]
    }
  ]
};