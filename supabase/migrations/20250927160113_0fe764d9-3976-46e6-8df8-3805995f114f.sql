-- Update existing leadership module with enhanced content
UPDATE learning_modules 
SET 
  description = 'A comprehensive professional development program that transforms individual contributors into effective leaders through practical frameworks, real-world applications, and measurable skill development.',
  duration_minutes = 180,
  learning_outcomes = ARRAY[
    'Complete comprehensive leadership competency assessment',
    'Develop personal leadership philosophy and values statement',
    'Apply trust-building frameworks in professional relationships',
    'Navigate difficult conversations with confidence and empathy'
  ],
  target_audience = ARRAY[
    'Senior individual contributors preparing for leadership roles',
    'New managers within their first 12 months',
    'Project leads and team coordinators',
    'High-potential employees identified for leadership development'
  ],
  industry_applications = ARRAY[
    'Technology and software development',
    'Professional services and consulting', 
    'Healthcare and biotechnology',
    'Financial services and fintech',
    'Manufacturing and operations'
  ],
  practical_applications = ARRAY[
    'Use competency framework for performance review discussions',
    'Apply active listening techniques in your next one-on-one meeting',
    'Practice trust-building behaviors in current challenging relationships',
    'Implement psychological safety practices in your team meetings'
  ],
  content_sections = '[
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
            "content": "Leadership and management are often used interchangeably, but they represent fundamentally different approaches to organizational influence. Understanding this distinction is crucial for developing your leadership identity.\\n\\n**Management** focuses on systems, processes, and operational efficiency. Managers plan, organize, coordinate, and control resources to achieve specific objectives. They work within existing structures to optimize performance and maintain stability.\\n\\n**Leadership** focuses on people, vision, and transformational change. Leaders inspire, influence, and enable others to contribute toward organizational success. They challenge the status quo and create new possibilities.\\n\\nThe most effective professionals develop both management and leadership capabilities, knowing when to apply each approach. In today''s dynamic business environment, the emphasis has shifted toward leadership skills as organizations need to adapt rapidly to changing conditions.\\n\\n**Key Characteristics of Effective Leaders:**\\n- **Vision-oriented**: See possibilities beyond current constraints\\n- **People-focused**: Understand that results come through people\\n- **Change-agents**: Comfortable with ambiguity and uncertainty\\n- **Authentic**: Lead from their values and genuine self\\n- **Adaptive**: Adjust their approach based on situation and team needs",
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
            "content": "Trust is the foundation of all effective leadership relationships. Without trust, even the most skilled leaders struggle to influence, motivate, and achieve results through others. The Trust Equation provides a practical framework for understanding and building trust systematically.\\n\\n**The Trust Equation: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation**\\n\\n**Credibility** encompasses your track record, expertise, and reputation. It answers the question: Can I believe what this person says? Credibility is built through:\\n- Demonstrating expertise and competence in your domain\\n- Having a track record of sound judgment and good decisions\\n- Being known for honesty and transparency in communication\\n- Acknowledging what you do not know and seeking input from others",
            "order_index": 1
          }
        ],
        "case_studies": [
          {
            "id": "trust-crisis-turnaround",
            "title": "Rebuilding Trust After a Team Crisis",
            "scenario": "Sarah, a newly promoted engineering manager, inherited a team that had lost confidence in leadership after a failed product launch and subsequent layoffs.",
            "background": "The team had experienced broken promises about job security, lack of transparency about the product struggles, and felt abandoned by previous leadership during the crisis.",
            "challenge": "Team morale was at an all-time low, productivity had declined 40%, and three key team members had already started looking for other jobs. Sarah needed to rebuild trust quickly while also delivering on aggressive recovery timelines.",
            "analysis_points": [
              "How could Sarah use the Trust Equation to diagnose the specific trust deficits?",
              "What balance should she strike between transparency about challenges and maintaining team confidence?",
              "Which trust-building actions would have the highest impact in the shortest time?"
            ],
            "discussion_questions": [
              "What would be Sarahs first three actions to begin rebuilding trust?",
              "How should she address the failed promises made by previous leadership?",
              "What role should the team play in developing the recovery plan?"
            ],
            "key_takeaways": [
              "Trust rebuilding requires consistent action over time, not just words",
              "Transparency about challenges can build credibility when coupled with concrete action plans",
              "Small, consistent wins are more valuable than grand gestures in trust rebuilding"
            ]
          }
        ]
      }
    }
  ]'::jsonb
WHERE title = 'Foundations of Leadership' 
AND id = '783fcafa-1d71-4eae-94ff-cd1e948bbf07';