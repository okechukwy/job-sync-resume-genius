// Enhanced content types for professional learning modules

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  background: string;
  challenge: string;
  context: {
    industry: string;
    company_size: string;
    timeline: string;
  };
  analysis_points: string[];
  discussion_questions: string[];
  key_takeaways: string[];
  related_concepts: string[];
}

export interface InteractiveExercise {
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
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'key_points' | 'case_study' | 'interactive' | 'framework' | 'checklist' | 'template';
  title?: string;
  content: string | string[] | CaseStudy | InteractiveExercise | any;
  order_index: number;
}

export interface Framework {
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
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'scenario_based' | 'reflection' | 'skill_rating';
  question: string;
  options?: string[];
  correct_answer?: number;
  explanation?: string;
  scenario?: string;
  evaluation_criteria?: string[];
}

export interface EnhancedContentSection {
  id: string;
  title: string;
  type: 'article' | 'interactive' | 'assessment' | 'case_study' | 'framework_guide';
  duration_minutes: number;
  description: string;
  is_required: boolean;
  order_index: number;
  learning_outcomes: string[];
  content_blocks: ContentBlock[];
  interactive_elements?: InteractiveExercise[];
  case_studies?: CaseStudy[];
  frameworks?: Framework[];
  assessment_questions?: AssessmentQuestion[];
  practical_applications: string[];
  additional_resources: Array<{
    title: string;
    type: 'article' | 'video' | 'tool' | 'template';
    description: string;
    internal: boolean;
  }>;
}

export interface ProfessionalModule {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  learning_objectives: string[];
  prerequisites: string[];
  target_audience: string[];
  industry_applications: string[];
  competency_level: {
    entry_level: string;
    target_level: string;
    mastery_indicators: string[];
  };
  content_sections: EnhancedContentSection[];
  capstone_project?: {
    title: string;
    description: string;
    deliverables: string[];
    evaluation_criteria: string[];
  };
}