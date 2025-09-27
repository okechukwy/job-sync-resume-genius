import { ProfessionalModule, CaseStudy, InteractiveExercise, Framework } from '@/types/enhancedContentTypes';

// Comprehensive Leadership Module Content
export const leadershipFoundationsModule: ProfessionalModule = {
  id: 'leadership-foundations-professional',
  title: 'Leadership Foundations: From Individual Contributor to Leader',
  description: 'A comprehensive professional development program that transforms individual contributors into effective leaders through practical frameworks, real-world applications, and measurable skill development.',
  duration_minutes: 180,
  difficulty_level: 'intermediate',
  learning_objectives: [
    'Develop authentic leadership presence and communication skills',
    'Master core leadership frameworks and their practical applications',
    'Build high-performing teams through trust and psychological safety',
    'Navigate complex organizational dynamics and stakeholder relationships',
    'Create and execute strategic initiatives with measurable outcomes',
    'Develop emotional intelligence and adaptive leadership capabilities'
  ],
  prerequisites: [
    '2+ years of professional work experience',
    'Experience working in team environments',
    'Basic understanding of organizational structures',
    'Willingness to engage in self-reflection and feedback'
  ],
  target_audience: [
    'Senior individual contributors preparing for leadership roles',
    'New managers within their first 12 months',
    'Project leads and team coordinators',
    'High-potential employees identified for leadership development'
  ],
  industry_applications: [
    'Technology and software development',
    'Professional services and consulting',
    'Healthcare and biotechnology',
    'Financial services and fintech',
    'Manufacturing and operations'
  ],
  competency_level: {
    entry_level: 'Individual contributor with informal leadership experience',
    target_level: 'Confident first-line manager capable of leading 5-15 team members',
    mastery_indicators: [
      'Successfully builds trust and psychological safety within teams',
      'Consistently delivers results through others rather than individual execution',
      'Demonstrates adaptive leadership style based on situation and team needs',
      'Effectively manages up and across organizational boundaries',
      'Creates development opportunities for team members'
    ]
  },
  content_sections: [
    {
      id: 'leadership-foundation-intro',
      title: 'Leadership Foundation & Self-Assessment',
      type: 'article',
      duration_minutes: 25,
      description: 'Establish your leadership baseline and develop your authentic leadership philosophy',
      is_required: true,
      order_index: 1,
      learning_outcomes: [
        'Complete comprehensive leadership competency assessment',
        'Develop personal leadership philosophy and values statement',
        'Identify key strengths and development areas',
        'Create initial leadership development plan'
      ],
      content_blocks: [
        {
          id: 'leadership-definition',
          type: 'text',
          title: 'Leadership vs. Management: Understanding the Distinction',
          content: `Leadership and management are often used interchangeably, but they represent fundamentally different approaches to organizational influence. Understanding this distinction is crucial for developing your leadership identity.

**Management** focuses on systems, processes, and operational efficiency. Managers plan, organize, coordinate, and control resources to achieve specific objectives. They work within existing structures to optimize performance and maintain stability.

**Leadership** focuses on people, vision, and transformational change. Leaders inspire, influence, and enable others to contribute toward organizational success. They challenge the status quo and create new possibilities.

The most effective professionals develop both management and leadership capabilities, knowing when to apply each approach. In today's dynamic business environment, the emphasis has shifted toward leadership skills as organizations need to adapt rapidly to changing conditions.

**Key Characteristics of Effective Leaders:**
- **Vision-oriented**: See possibilities beyond current constraints
- **People-focused**: Understand that results come through people
- **Change-agents**: Comfortable with ambiguity and uncertainty  
- **Authentic**: Lead from their values and genuine self
- **Adaptive**: Adjust their approach based on situation and team needs`,
          order_index: 1
        },
        {
          id: 'leadership-competencies',
          type: 'framework',
          title: 'Core Leadership Competency Framework',
          content: {
            id: 'leadership-competency-framework',
            name: 'Integrated Leadership Competency Model',
            description: 'A comprehensive framework covering the essential competencies for effective leadership across industries and organizational levels.',
            steps: [
              {
                step_number: 1,
                title: 'Self-Leadership',
                description: 'Master yourself before leading others',
                key_actions: [
                  'Develop deep self-awareness of strengths, blindspots, and values',
                  'Practice emotional regulation and stress management',
                  'Maintain personal accountability and follow-through',
                  'Continuously invest in personal and professional development'
                ],
                examples: [
                  'Regular 360-degree feedback and reflection',
                  'Mindfulness and stress management practices',
                  'Personal mission and values clarification',
                  'Professional development and learning plans'
                ]
              },
              {
                step_number: 2,
                title: 'Interpersonal Excellence',
                description: 'Build strong relationships and communication skills',
                key_actions: [
                  'Practice active listening and empathetic communication',
                  'Build trust through consistency and reliability',
                  'Navigate difficult conversations with courage and compassion',
                  'Adapt communication style to different audiences and situations'
                ],
                examples: [
                  'One-on-one meetings focused on employee development',
                  'Transparent communication during organizational changes',
                  'Cross-functional collaboration on complex projects',
                  'Conflict resolution and mediation skills'
                ]
              },
              {
                step_number: 3,
                title: 'Team Leadership',
                description: 'Create and sustain high-performing teams',
                key_actions: [
                  'Establish clear vision, goals, and expectations',
                  'Foster psychological safety and inclusive team culture',
                  'Develop individual team members and their capabilities',
                  'Facilitate effective team processes and decision-making'
                ],
                examples: [
                  'Team charter and goal-setting processes',
                  'Regular team retrospectives and improvement initiatives',
                  'Individual development planning and coaching',
                  'Cross-training and knowledge sharing programs'
                ]
              },
              {
                step_number: 4,
                title: 'Organizational Impact',
                description: 'Drive results and influence across the broader organization',
                key_actions: [
                  'Align team goals with organizational strategy',
                  'Build stakeholder relationships and influence networks',
                  'Champion change initiatives and innovation',
                  'Measure and communicate team and organizational impact'
                ],
                examples: [
                  'Strategic planning and OKR cascade processes',
                  'Cross-departmental project leadership',
                  'Change management and transformation initiatives',
                  'Data-driven performance measurement and reporting'
                ]
              }
            ],
            when_to_use: 'Use this framework for leadership development planning, performance reviews, and succession planning. It provides a roadmap for progressive leadership skill development.',
            benefits: [
              'Comprehensive coverage of essential leadership skills',
              'Clear progression pathway from individual contributor to senior leader',
              'Applicable across industries and organizational contexts',
              'Provides structure for development planning and measurement'
            ],
            common_pitfalls: [
              'Trying to develop all competencies simultaneously',
              'Focusing on competencies without considering organizational context',
              'Neglecting the foundational self-leadership component',
              'Using the framework as a checklist rather than a development guide'
            ]
          },
          order_index: 2
        },
        {
          id: 'self-assessment-tool',
          type: 'interactive',
          title: 'Leadership Competency Self-Assessment',
          content: 'Complete this comprehensive self-assessment to identify your current leadership strengths and development opportunities.',
          order_index: 3
        }
      ],
      interactive_elements: [
        {
          id: 'leadership-self-assessment',
          title: '360-Degree Leadership Assessment',
          type: 'self_assessment',
          instructions: 'Rate yourself on each competency using a 1-5 scale, then consider how others (manager, peers, direct reports) might rate you in the same areas.',
          reflection_prompts: [
            'Which competencies do you consider your greatest strengths? What evidence supports this?',
            'Where do you see the biggest gaps between your self-perception and how others might perceive you?',
            'Which 2-3 competencies would have the greatest impact on your effectiveness if improved?',
            'What patterns do you notice in your leadership approach and preferences?'
          ],
          success_criteria: [
            'Completed honest self-assessment across all competency areas',
            'Identified 2-3 priority development areas with specific rationale',
            'Created initial action plan with concrete next steps',
            'Scheduled follow-up assessment and feedback conversations'
          ]
        }
      ],
      practical_applications: [
        'Use competency framework for performance review discussions',
        'Create personal leadership development plan with specific goals',
        'Seek feedback from colleagues using competency language',
        'Apply self-assessment insights to current work challenges'
      ],
      additional_resources: [
        {
          title: 'Leadership Philosophy Worksheet',
          type: 'template',
          description: 'Structured template for developing your personal leadership philosophy and values statement',
          internal: true
        },
        {
          title: 'Competency Development Planning Guide',
          type: 'tool',
          description: 'Step-by-step guide for creating targeted development plans for each competency area',
          internal: true
        }
      ]
    },
    {
      id: 'trust-communication',
      title: 'Building Trust & Communication Excellence',
      type: 'framework_guide',
      duration_minutes: 35,
      description: 'Master the fundamental skills of trust-building and communication that form the foundation of all leadership effectiveness',
      is_required: true,
      order_index: 2,
      learning_outcomes: [
        'Apply trust-building frameworks in professional relationships',
        'Demonstrate advanced active listening and communication skills',
        'Navigate difficult conversations with confidence and empathy',
        'Build psychological safety within your team or work group'
      ],
      content_blocks: [
        {
          id: 'trust-foundation',
          type: 'text',
          title: 'The Trust Equation: Building Professional Credibility',
          content: `Trust is the foundation of all effective leadership relationships. Without trust, even the most skilled leaders struggle to influence, motivate, and achieve results through others. The Trust Equation provides a practical framework for understanding and building trust systematically.

**The Trust Equation: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation**

**Credibility** encompasses your track record, expertise, and reputation. It answers the question: "Can I believe what this person says?" Credibility is built through:
- Demonstrating expertise and competence in your domain
- Having a track record of sound judgment and good decisions  
- Being known for honesty and transparency in communication
- Acknowledging what you don't know and seeking input from others

**Reliability** is about consistency and dependability. It answers: "Can I depend on this person?" Reliability is demonstrated through:
- Following through on commitments consistently
- Being punctual and prepared for meetings and interactions
- Maintaining consistent communication and responsiveness
- Being predictable in your reactions and decision-making approach

**Intimacy** refers to the emotional safety people feel with you. It answers: "Do I feel safe being vulnerable with this person?" Intimacy is built through:
- Maintaining confidentiality and discretion with sensitive information
- Showing genuine interest in others as individuals, not just their work output
- Being approachable and open to feedback and different perspectives
- Sharing appropriate vulnerability and authenticity

**Self-Orientation** is about whose interests you prioritize. High self-orientation destroys trust, while low self-orientation builds it. Reduce self-orientation by:
- Focusing conversations on others' needs and interests, not just your own agenda
- Asking questions to understand before seeking to be understood
- Giving credit generously and taking responsibility for failures
- Making decisions based on what's best for the team/organization, not just personal advancement

**Practical Trust-Building Strategies:**
- Start new relationships by focusing on understanding others' perspectives and priorities
- Share relevant personal experiences and challenges to demonstrate authenticity
- Follow up consistently on commitments, even small ones
- Admit mistakes quickly and focus on solutions rather than excuses
- Invest time in informal relationship-building, not just task-focused interactions`,
          order_index: 1
        },
        {
          id: 'active-listening-framework',
          type: 'framework',
          title: 'Advanced Active Listening Framework',
          content: {
            id: 'active-listening-framework',
            name: 'SOLER + HEAR Active Listening Model',
            description: 'A comprehensive framework for developing advanced listening skills that build trust and understanding in professional relationships.',
            steps: [
              {
                step_number: 1,
                title: 'SOLER - Physical Presence',
                description: 'Create the physical and mental space for effective listening',
                key_actions: [
                  'Square your shoulders and face the speaker directly',
                  'Open posture - avoid crossing arms or creating barriers',
                  'Lean in slightly to show engagement and interest',
                  'Eye contact - maintain appropriate visual connection',
                  'Relax - manage your own anxiety and distractions'
                ],
                examples: [
                  'Put away devices and eliminate distractions during conversations',
                  'Schedule adequate time for important conversations',
                  'Choose appropriate environment - private space for sensitive topics',
                  'Use mirroring to match the speaker\'s energy level appropriately'
                ]
              },
              {
                step_number: 2,
                title: 'HEAR - Content Processing',
                description: 'Systematically process and respond to what you\'re hearing',
                key_actions: [
                  'Halt your internal dialogue and judgment',
                  'Engage with curiosity rather than trying to solve or fix',
                  'Affirm what you\'re hearing without necessarily agreeing',
                  'Respond with questions and reflections that deepen understanding'
                ],
                examples: [
                  '"Help me understand..." questions to gather more information',
                  '"What I\'m hearing is..." reflections to confirm understanding',
                  '"Tell me more about..." invitations to go deeper',
                  'Paraphrasing key points to ensure accurate comprehension'
                ]
              }
            ],
            when_to_use: 'Apply this framework in one-on-one meetings, conflict resolution, performance discussions, and any situation where understanding is more important than being understood.',
            benefits: [
              'Builds trust and psychological safety rapidly',
              'Uncovers root causes rather than just surface symptoms',
              'Reduces misunderstandings and conflict',
              'Demonstrates respect and value for others\' perspectives'
            ],
            common_pitfalls: [
              'Listening to respond rather than to understand',
              'Interrupting or finishing others\' sentences',
              'Making assumptions about what people mean',
              'Trying to solve problems before fully understanding them'
            ]
          },
          order_index: 2
        }
      ],
      case_studies: [
        {
          id: 'trust-crisis-turnaround',
          title: 'Rebuilding Trust After a Team Crisis',
          scenario: 'Sarah, a newly promoted engineering manager, inherited a team that had lost confidence in leadership after a failed product launch and subsequent layoffs.',
          background: 'The team had experienced broken promises about job security, lack of transparency about the product\'s struggles, and felt abandoned by previous leadership during the crisis.',
          challenge: 'Team morale was at an all-time low, productivity had declined 40%, and three key team members had already started looking for other jobs. Sarah needed to rebuild trust quickly while also delivering on aggressive recovery timelines.',
          context: {
            industry: 'Software Technology',
            company_size: '500-person startup',
            timeline: '90-day turnaround expectation'
          },
          analysis_points: [
            'How could Sarah use the Trust Equation to diagnose the specific trust deficits?',
            'What balance should she strike between transparency about challenges and maintaining team confidence?',
            'Which trust-building actions would have the highest impact in the shortest time?',
            'How should she handle team members who remain skeptical despite her efforts?'
          ],
          discussion_questions: [
            'What would be Sarah\'s first three actions to begin rebuilding trust?',
            'How should she address the failed promises made by previous leadership?',
            'What role should the team play in developing the recovery plan?',
            'How can she demonstrate reliability when the situation is still uncertain?'
          ],
          key_takeaways: [
            'Trust rebuilding requires consistent action over time, not just words',
            'Transparency about challenges can build credibility when coupled with concrete action plans',
            'Small, consistent wins are more valuable than grand gestures in trust rebuilding',
            'Team involvement in solution development increases buy-in and ownership'
          ],
          related_concepts: [
            'Crisis leadership and communication',
            'Change management and team resilience',
            'Stakeholder management under pressure',
            'Performance improvement in low-trust environments'
          ]
        }
      ],
      interactive_elements: [
        {
          id: 'difficult-conversation-practice',
          title: 'Difficult Conversation Navigation',
          type: 'role_play',
          instructions: 'Practice handling challenging conversations using the SOLER + HEAR framework and trust-building principles.',
          scenarios: [
            {
              id: 'performance-discussion',
              situation: 'A high-performing team member has been missing deadlines and seems disengaged over the past month.',
              options: [
                {
                  text: 'Schedule a formal performance improvement discussion focused on the missed deadlines',
                  outcome: 'Team member becomes defensive and shuts down',
                  feedback: 'Starting with problem-focused language can trigger defensiveness. Consider leading with curiosity and understanding.'
                },
                {
                  text: 'Begin by asking about their overall experience and any challenges they\'re facing',
                  outcome: 'Team member opens up about feeling overwhelmed by personal issues',
                  feedback: 'Excellent use of curiosity-based approach. This creates safety for honest conversation.'
                },
                {
                  text: 'Address the behavior directly but also express genuine concern for their wellbeing',
                  outcome: 'Mixed response - some defensiveness but also appreciation for the concern',
                  feedback: 'Good balance of accountability and care. Could be enhanced by starting with more understanding-focused questions.'
                }
              ]
            }
          ],
          reflection_prompts: [
            'What did you notice about your instinctive response to conflict or difficult topics?',
            'How did leading with curiosity change the dynamic of the conversation?',
            'What trust-building behaviors felt most natural and which were more challenging?',
            'How might you apply these skills in your current work relationships?'
          ],
          success_criteria: [
            'Demonstrated active listening techniques in practice scenarios',
            'Successfully navigated at least one difficult conversation with positive outcome',
            'Identified personal patterns and areas for improvement',
            'Created action plan for applying skills in real work situations'
          ]
        }
      ],
      practical_applications: [
        'Apply SOLER + HEAR in your next one-on-one meeting',
        'Practice trust-building behaviors in current challenging relationships',
        'Use the Trust Equation to diagnose and improve a specific professional relationship',
        'Implement psychological safety practices in your team meetings'
      ],
      additional_resources: [
        {
          title: 'Difficult Conversation Planning Template',
          type: 'template',
          description: 'Structured approach for preparing and conducting challenging professional conversations',
          internal: true
        },
        {
          title: 'Trust Assessment and Action Planning Tool',
          type: 'tool',
          description: 'Diagnostic tool for assessing trust levels and creating targeted improvement plans',
          internal: true
        }
      ]
    }
  ]
};