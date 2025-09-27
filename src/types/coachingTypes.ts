// Shared types for coaching/learning modules

export interface ContentSection {
  id: string;
  title: string;
  type: 'article' | 'interactive' | 'assessment' | 'case_study' | 'framework_guide';
  content_url?: string;
  content?: {
    text?: string;
    key_points?: string[];
    objectives?: string[];
    questions?: Array<{
      question: string;
      type: 'multiple_choice' | 'text' | 'scenario_based';
      options?: string[];
      correct_answer?: number;
      explanation?: string;
      scenario?: string;
    }>;
    reflection_questions?: string[];
    exercise_type?: string;
    instructions?: string;
    content_blocks?: Array<{
      id: string;
      type: 'text' | 'key_points' | 'framework' | 'case_study' | 'interactive' | 'checklist';
      title?: string;
      content: any;
      order_index: number;
    }>;
    case_studies?: Array<{
      id: string;
      title: string;
      scenario: string;
      background: string;
      challenge: string;
      analysis_points: string[];
      discussion_questions: string[];
      key_takeaways: string[];
    }>;
    frameworks?: Array<{
      id: string;
      name: string;
      description: string;
      steps: Array<{
        step_number: number;
        title: string;
        description: string;
        key_actions: string[];
        examples: string[];
      }>;
      when_to_use: string;
      benefits: string[];
      common_pitfalls: string[];
    }>;
    interactive_elements?: Array<{
      id: string;
      title: string;
      type: 'role_play' | 'decision_making' | 'skill_practice' | 'self_assessment';
      instructions: string;
      scenarios?: Array<{
        id: string;
        situation: string;
        options: Array<{
          text: string;
          outcome: string;
          feedback: string;
        }>;
      }>;
      reflection_prompts: string[];
      success_criteria: string[];
    }>;
  };
  duration_minutes: number;
  description: string;
  is_required: boolean;
  order_index: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  content_type: string;
  duration_minutes: number;
  learning_objectives: string[];
  prerequisites: string[];
  difficulty_level?: string;
  order_index: number;
  content_sections?: ContentSection[];
}

export interface ModuleProgress {
  id: string;
  progress_percentage: number;
  status: string;
  time_spent_minutes: number;
  started_at: string | null;
  completed_at: string | null;
}