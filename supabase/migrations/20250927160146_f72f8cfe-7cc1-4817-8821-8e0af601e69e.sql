-- Insert enhanced leadership module with proper UUID
INSERT INTO learning_modules (
  id,
  program_id,
  title,
  description,
  content_type,
  duration_minutes,
  learning_objectives,
  prerequisites,
  order_index,
  is_interactive,
  learning_outcomes,
  target_audience,
  industry_applications,
  practical_applications,
  content_sections
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM coaching_programs WHERE title ILIKE '%Leadership%' LIMIT 1),
  'Enhanced Leadership Foundations',
  'A comprehensive professional development program that transforms individual contributors into effective leaders through practical frameworks, real-world applications, and measurable skill development.',
  'framework_guide',
  180,
  ARRAY[
    'Develop authentic leadership presence and communication skills',
    'Master core leadership frameworks and their practical applications', 
    'Build high-performing teams through trust and psychological safety',
    'Navigate complex organizational dynamics and stakeholder relationships'
  ],
  ARRAY[
    '2+ years of professional work experience',
    'Experience working in team environments', 
    'Basic understanding of organizational structures'
  ],
  1,
  true,
  ARRAY[
    'Complete comprehensive leadership competency assessment',
    'Develop personal leadership philosophy and values statement',
    'Apply trust-building frameworks in professional relationships',
    'Navigate difficult conversations with confidence and empathy'
  ],
  ARRAY[
    'Senior individual contributors preparing for leadership roles',
    'New managers within their first 12 months',
    'Project leads and team coordinators'
  ],
  ARRAY[
    'Technology and software development',
    'Professional services and consulting', 
    'Healthcare and biotechnology'
  ],
  ARRAY[
    'Use competency framework for performance review discussions',
    'Apply active listening techniques in meetings',
    'Practice trust-building behaviors in current relationships'
  ],
  '[
    {
      "id": "leadership-foundation-intro",
      "title": "Leadership Foundation & Self-Assessment", 
      "type": "article",
      "duration_minutes": 25,
      "description": "Establish your leadership baseline and develop your authentic leadership philosophy",
      "is_required": true,
      "order_index": 1,
      "content": {
        "content_blocks": [
          {
            "id": "leadership-definition", 
            "type": "text",
            "title": "Leadership vs. Management: Understanding the Distinction",
            "content": "Leadership and management are often used interchangeably, but they represent fundamentally different approaches to organizational influence. Understanding this distinction is crucial for developing your leadership identity.\\n\\n**Management** focuses on systems, processes, and operational efficiency. Managers plan, organize, coordinate, and control resources to achieve specific objectives.\\n\\n**Leadership** focuses on people, vision, and transformational change. Leaders inspire, influence, and enable others to contribute toward organizational success.\\n\\n**Key Characteristics of Effective Leaders:**\\n- Vision-oriented: See possibilities beyond current constraints\\n- People-focused: Understand that results come through people\\n- Change-agents: Comfortable with ambiguity and uncertainty\\n- Authentic: Lead from their values and genuine self",
            "order_index": 1
          }
        ]
      }
    },
    {
      "id": "trust-communication",
      "title": "Building Trust & Communication Excellence",
      "type": "framework_guide", 
      "duration_minutes": 35,
      "description": "Master the fundamental skills of trust-building and communication that form the foundation of all leadership effectiveness",
      "is_required": true,
      "order_index": 2,
      "content": {
        "content_blocks": [
          {
            "id": "trust-foundation",
            "type": "text",
            "title": "The Trust Equation: Building Professional Credibility",
            "content": "Trust is the foundation of all effective leadership relationships. The Trust Equation provides a practical framework for understanding and building trust systematically.\\n\\n**The Trust Equation: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation**\\n\\n**Credibility** encompasses your track record, expertise, and reputation. It is built through demonstrating expertise, having a track record of sound judgment, and being known for honesty and transparency.\\n\\n**Reliability** is about consistency and dependability, demonstrated through following through on commitments and maintaining consistent communication.",
            "order_index": 1
          }
        ],
        "case_studies": [
          {
            "id": "trust-crisis-turnaround",
            "title": "Rebuilding Trust After a Team Crisis",
            "scenario": "Sarah, a newly promoted engineering manager, inherited a team that had lost confidence in leadership after a failed product launch.",
            "background": "The team had experienced broken promises about job security and lack of transparency about product struggles.",
            "challenge": "Team morale was at an all-time low, productivity had declined 40%, and key team members were looking for other jobs.",
            "analysis_points": [
              "How could Sarah use the Trust Equation to diagnose specific trust deficits?",
              "What balance should she strike between transparency and maintaining confidence?",
              "Which trust-building actions would have the highest impact?"
            ],
            "discussion_questions": [
              "What would be Sarah''s first three actions to begin rebuilding trust?",
              "How should she address failed promises made by previous leadership?",
              "What role should the team play in developing the recovery plan?"
            ],
            "key_takeaways": [
              "Trust rebuilding requires consistent action over time, not just words",
              "Transparency about challenges builds credibility when coupled with action plans",
              "Small, consistent wins are more valuable than grand gestures"
            ]
          }
        ]
      }
    }
  ]'::jsonb
);