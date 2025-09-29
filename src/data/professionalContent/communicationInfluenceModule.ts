import { ProfessionalModule } from '@/types/enhancedContentTypes';

export const communicationInfluenceModule: ProfessionalModule = {
  id: 'communication-influence-enhanced',
  title: 'Communication & Influence Mastery',
  description: 'Develop advanced communication and influence skills through comprehensive training modules.',
  duration_minutes: 230,
  difficulty_level: 'intermediate',
  learning_objectives: [
    'Master effective professional communication',
    'Deliver compelling presentations',
    'Build influence and manage stakeholders',
    'Resolve conflicts professionally',
    'Apply ethical persuasion principles'
  ],
  prerequisites: [
    'Basic professional communication experience',
    'Understanding of workplace dynamics'
  ],
  target_audience: [
    'Mid-level managers and team leads',
    'Individual contributors seeking leadership roles'
  ],
  industry_applications: [
    'Corporate communication and leadership',
    'Sales and business development',
    'Consulting and client management'
  ],
  competency_level: {
    entry_level: 'Basic professional communication skills',
    target_level: 'Advanced communicator capable of influencing at all organizational levels',
    mastery_indicators: [
      'Delivers impactful presentations to senior leadership',
      'Successfully manages complex stakeholder relationships',
      'Resolves conflicts professionally and builds consensus'
    ]
  },
  content_sections: [
    {
      id: 'communication-foundations',
      title: 'Effective Communication Foundations',
      type: 'article',
      duration_minutes: 40,
      description: 'Learn fundamental elements of effective communication and develop active listening skills.',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Understand fundamental elements of effective communication',
        'Identify personal communication style',
        'Practice active listening skills'
      ],
      practical_applications: [
        'Improve daily communications',
        'Enhance meeting participation',
        'Build stronger relationships'
      ],
      content_blocks: [
        {
          id: 'intro-communication',
          type: 'text',
          title: 'Introduction to Professional Communication',
          content: 'Professional communication is the foundation of business success. It involves not just what you say, but how you say it, when you say it, and to whom you say it.',
          order_index: 1
        }
      ],
      additional_resources: [
        {
          title: 'Communication Assessment Tool',
          type: 'tool',
          description: 'Interactive assessment to identify communication preferences',
          internal: true
        }
      ]
    }
  ]
};

export default communicationInfluenceModule;