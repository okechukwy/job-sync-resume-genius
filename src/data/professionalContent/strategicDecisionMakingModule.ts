import { ProfessionalModule } from '@/types/enhancedContentTypes';

export const strategicDecisionMakingModule: ProfessionalModule = {
  id: 'b8e3f9d2-4c1a-4b7e-9e8f-1234567890ab',
  title: 'Strategic Decision Making',
  description: 'Master the art of strategic thinking and decision-making in complex business environments. Learn frameworks for analyzing options, managing uncertainty, and making decisions that drive organizational success.',
  duration_minutes: 180,
  difficulty_level: 'intermediate',
  learning_objectives: [
    'Apply structured decision-making frameworks to complex business challenges',
    'Analyze risks and uncertainties in strategic decisions',
    'Evaluate decision outcomes and learn from results',
    'Facilitate group decision-making processes',
    'Balance analytical rigor with intuitive judgment'
  ],
  prerequisites: ['Basic business acumen', 'Understanding of organizational dynamics'],
  target_audience: ['Mid-level managers', 'Senior managers', 'Strategic planning teams'],
  industry_applications: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Consulting'],
  competency_level: {
    entry_level: 'Basic problem-solving and analytical skills',
    target_level: 'Advanced strategic thinking and decision architecture',
    mastery_indicators: [
      'Consistently makes high-quality strategic decisions',
      'Designs decision processes for complex situations',
      'Coaches others in strategic thinking'
    ]
  },
  content_sections: [
    {
      id: 'decision-frameworks',
      title: 'Strategic Decision Frameworks',
      type: 'framework_guide',
      duration_minutes: 60,
      description: 'Learn proven frameworks for strategic decision-making including OODA loops, decision trees, and scenario planning.',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Master the OODA (Observe, Orient, Decide, Act) decision cycle',
        'Build and analyze decision trees for complex choices',
        'Apply scenario planning to strategic decisions'
      ],
      content_blocks: [
        {
          id: 'ooda-framework',
          type: 'framework',
          title: 'OODA Loop for Strategic Decisions',
          content: {
            id: 'ooda-loop',
            name: 'OODA Loop (Observe, Orient, Decide, Act)',
            description: 'A decision-making framework that emphasizes rapid, iterative cycles for strategic advantage.',
            steps: [
              {
                step_number: 1,
                title: 'Observe',
                description: 'Gather information about the current situation and environment',
                key_actions: [
                  'Collect market intelligence and competitive data',
                  'Monitor internal organizational metrics',
                  'Identify emerging trends and signals',
                  'Listen to stakeholder feedback'
                ],
                examples: [
                  'Quarterly market analysis review',
                  'Customer satisfaction surveys',
                  'Competitor strategic moves analysis'
                ]
              },
              {
                step_number: 2,
                title: 'Orient',
                description: 'Process and synthesize information to understand the strategic landscape',
                key_actions: [
                  'Analyze data patterns and implications',
                  'Challenge existing assumptions',
                  'Consider multiple perspectives',
                  'Update mental models and frameworks'
                ],
                examples: [
                  'SWOT analysis refinement',
                  'Assumption testing workshops',
                  'Cross-functional strategy sessions'
                ]
              },
              {
                step_number: 3,
                title: 'Decide',
                description: 'Make strategic choices based on oriented understanding',
                key_actions: [
                  'Generate strategic options',
                  'Evaluate alternatives against criteria',
                  'Consider resource implications',
                  'Make commitment to course of action'
                ],
                examples: [
                  'Strategic option evaluation matrix',
                  'Resource allocation decisions',
                  'Go/no-go decisions on initiatives'
                ]
              },
              {
                step_number: 4,
                title: 'Act',
                description: 'Implement decisions and monitor results',
                key_actions: [
                  'Execute strategic initiatives',
                  'Monitor implementation progress',
                  'Gather feedback on outcomes',
                  'Prepare for next OODA cycle'
                ],
                examples: [
                  'Strategic initiative launch',
                  'Performance dashboard monitoring',
                  'After-action reviews'
                ]
              }
            ],
            when_to_use: 'In dynamic, competitive environments where rapid adaptation is crucial',
            benefits: [
              'Faster decision-making cycles',
              'Better adaptation to changing conditions',
              'Improved strategic agility',
              'Enhanced competitive advantage'
            ],
            common_pitfalls: [
              'Rushing through observation phase',
              'Inadequate orientation and synthesis',
              'Decision paralysis in complex situations',
              'Poor execution tracking'
            ]
          },
          order_index: 1
        }
      ],
      interactive_elements: [
        {
          id: 'decision-tree-exercise',
          title: 'Strategic Decision Tree Construction',
          type: 'decision_making',
          instructions: 'Build a decision tree for a strategic business challenge using probability estimates and expected value calculations.',
          scenarios: [
            {
              id: 'market-entry',
              situation: 'Your company is considering entering a new geographic market. There are uncertainties about market size, competition, and regulatory environment.',
              options: [
                {
                  text: 'Enter immediately with full investment',
                  outcome: 'High potential returns but significant risk exposure',
                  feedback: 'Bold move - ensure you have adequate risk mitigation strategies'
                },
                {
                  text: 'Start with pilot program and gradual expansion',
                  outcome: 'Lower risk but slower market capture',
                  feedback: 'Prudent approach - allows for learning and adaptation'
                },
                {
                  text: 'Wait for more market intelligence',
                  outcome: 'Reduced uncertainty but potential opportunity cost',
                  feedback: 'Conservative - consider the cost of delayed entry'
                }
              ]
            }
          ],
          reflection_prompts: [
            'How did probability estimates affect your decision?',
            'What additional information would have been most valuable?',
            'How would you structure the decision process for your team?'
          ],
          success_criteria: [
            'Identifies key decision points and uncertainties',
            'Applies probability and value estimates',
            'Considers multiple decision paths'
          ]
        }
      ],
      practical_applications: [
        'New product launch decisions',
        'Market entry strategies',
        'Resource allocation choices',
        'Acquisition and partnership decisions'
      ],
      additional_resources: [
        {
          title: 'Decision Science for Strategic Advantage',
          type: 'article',
          description: 'Academic research on decision-making effectiveness',
          internal: false
        },
        {
          title: 'Strategic Decision Tracker Template',
          type: 'template',
          description: 'Tool for tracking decision outcomes and learning',
          internal: true
        }
      ]
    },
    {
      id: 'uncertainty-management',
      title: 'Managing Uncertainty and Risk',
      type: 'case_study',
      duration_minutes: 75,
      description: 'Explore how successful leaders navigate uncertainty and manage strategic risks in complex decision environments.',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Identify and categorize different types of uncertainty',
        'Apply risk assessment frameworks to strategic decisions',
        'Develop contingency planning capabilities'
      ],
      content_blocks: [
        {
          id: 'uncertainty-types',
          type: 'key_points',
          title: 'Types of Strategic Uncertainty',
          content: [
            'Aleatory uncertainty: Natural randomness and variability',
            'Epistemic uncertainty: Lack of knowledge or information',
            'Ambiguity uncertainty: Multiple interpretations possible',
            'Interaction uncertainty: Complex system behaviors'
          ],
          order_index: 1
        }
      ],
      case_studies: [
        {
          id: 'tech-disruption',
          title: 'Navigating Technology Disruption',
          scenario: 'A traditional retail company facing e-commerce disruption must decide on digital transformation strategy.',
          background: 'Established brick-and-mortar retailer with 50-year history and strong brand recognition but declining foot traffic and market share.',
          challenge: 'Leadership must decide between gradual digital integration, rapid transformation, or strategic partnerships with digital platforms.',
          context: {
            industry: 'Retail',
            company_size: '5,000+ employees',
            timeline: '18-month decision window'
          },
          analysis_points: [
            'Market trend analysis and speed of change',
            'Internal capability assessment',
            'Customer behavior evolution',
            'Competitive response strategies',
            'Financial implications of each option'
          ],
          discussion_questions: [
            'How do you balance preservation of existing strengths with need for transformation?',
            'What role should customer data play in the decision process?',
            'How do you manage stakeholder expectations during uncertainty?'
          ],
          key_takeaways: [
            'Uncertainty requires multiple scenario planning',
            'Stakeholder alignment is crucial during transformation',
            'Real options thinking helps manage downside risk'
          ],
          related_concepts: ['Digital transformation', 'Strategic agility', 'Change management']
        }
      ],
      practical_applications: [
        'Crisis decision-making',
        'Technology adoption strategies',
        'Market uncertainty navigation',
        'Regulatory change adaptation'
      ],
      additional_resources: [
        {
          title: 'Uncertainty Analysis Toolkit',
          type: 'tool',
          description: 'Frameworks for analyzing and categorizing uncertainty',
          internal: true
        }
      ]
    },
    {
      id: 'decision-implementation',
      title: 'Decision Implementation and Learning',
      type: 'interactive',
      duration_minutes: 45,
      description: 'Master the critical phase of decision implementation and create feedback loops for continuous improvement.',
      is_required: true,
      order_index: 3,
      learning_outcomes: [
        'Design effective implementation plans for strategic decisions',
        'Create monitoring and feedback systems',
        'Apply decision learning frameworks'
      ],
      content_blocks: [
        {
          id: 'implementation-checklist',
          type: 'checklist',
          title: 'Strategic Decision Implementation Checklist',
          content: [
            'Clear communication of decision rationale to all stakeholders',
            'Resource allocation and timeline establishment',
            'Key performance indicators and success metrics defined',
            'Risk monitoring and contingency plans activated',
            'Regular review and adjustment mechanisms established',
            'Learning capture process implemented'
          ],
          order_index: 1
        }
      ],
      interactive_elements: [
        {
          id: 'implementation-planning',
          title: 'Implementation Planning Workshop',
          type: 'skill_practice',
          instructions: 'Create a comprehensive implementation plan for a strategic decision, including stakeholder management and success metrics.',
          reflection_prompts: [
            'What are the critical success factors for this decision?',
            'How will you know if the decision needs to be adjusted?',
            'What stakeholder concerns need to be addressed?'
          ],
          success_criteria: [
            'Identifies key implementation steps and dependencies',
            'Defines clear success metrics and monitoring approach',
            'Addresses stakeholder management requirements'
          ]
        }
      ],
      practical_applications: [
        'Strategic initiative rollouts',
        'Organizational restructuring',
        'Product launch execution',
        'Partnership implementation'
      ],
      additional_resources: [
        {
          title: 'Decision Learning Framework',
          type: 'template',
          description: 'Structured approach to capturing decision insights',
          internal: true
        }
      ]
    }
  ]
};