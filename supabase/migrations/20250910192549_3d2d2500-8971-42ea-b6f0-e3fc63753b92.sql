-- Update existing learning modules with enhanced content_sections for better user experience
UPDATE learning_modules 
SET content_sections = '[
  {
    "id": "overview",
    "title": "Module Overview",
    "type": "article",
    "content": {
      "text": "Welcome to this comprehensive learning module. This overview will help you understand what you will learn and how to make the most of your time.",
      "key_points": [
        "Clear learning objectives and outcomes",
        "Structured learning path with practical applications", 
        "Interactive exercises and real-world examples",
        "Assessment to validate your understanding"
      ]
    },
    "description": "Get oriented with the module structure and objectives",
    "duration_minutes": 5,
    "is_required": true,
    "order_index": 1
  },
  {
    "id": "main_content",
    "title": "Core Learning Content",
    "type": "video",
    "content": {
      "text": "This is the main learning content where you will dive deep into the subject matter. Follow along with the video and take notes as needed.",
      "objectives": [
        "Master the fundamental concepts",
        "Understand practical applications",
        "Learn industry best practices",
        "Prepare for hands-on exercises"
      ]
    },
    "description": "Primary educational content with video instruction",
    "duration_minutes": 20,
    "is_required": true,
    "order_index": 2
  },
  {
    "id": "interactive_exercise",
    "title": "Hands-on Practice",
    "type": "interactive",
    "content": {
      "exercise_type": "practical simulation",
      "instructions": "Apply what you have learned in this interactive exercise. Take your time and experiment with different approaches."
    },
    "description": "Practice your skills with guided exercises",
    "duration_minutes": 15,
    "is_required": true,
    "order_index": 3
  },
  {
    "id": "knowledge_check",
    "title": "Knowledge Assessment",
    "type": "assessment", 
    "content": {
      "questions": [
        {
          "question": "What is the most important takeaway from this module?",
          "type": "text"
        },
        {
          "question": "Which approach would you use in your current role?",
          "type": "multiple_choice",
          "options": [
            "Immediate implementation",
            "Gradual rollout with testing",
            "Team consultation first",
            "Additional research needed"
          ],
          "correct_answer": 1
        }
      ]
    },
    "description": "Test your understanding with a quick assessment",
    "duration_minutes": 10,
    "is_required": true,
    "order_index": 4
  },
  {
    "id": "reflection",
    "title": "Reflection & Next Steps",
    "type": "article",
    "content": {
      "text": "Take a moment to reflect on what you have learned and how you can apply it.",
      "reflection_questions": [
        "What was the most valuable insight from this module?",
        "How will you apply this knowledge in your work?",
        "What additional resources or support do you need?",
        "What would you like to explore further?"
      ]
    },
    "description": "Reflect on your learning and plan next steps",
    "duration_minutes": 5,
    "is_required": false,
    "order_index": 5
  }
]'::jsonb
WHERE content_sections IS NULL OR jsonb_array_length(content_sections) = 0;

-- Also ensure all learning modules have proper learning_objectives and prerequisites
UPDATE learning_modules 
SET 
  learning_objectives = ARRAY[
    'Understand core concepts and principles',
    'Apply knowledge in practical scenarios', 
    'Develop actionable implementation strategies',
    'Build confidence in the subject area'
  ],
  prerequisites = ARRAY['Basic understanding of the topic area', 'Commitment to active learning']
WHERE learning_objectives = '{}' OR prerequisites = '{}';