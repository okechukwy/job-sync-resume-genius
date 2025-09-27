import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Target,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface ContentSection {
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

interface ContentRendererProps {
  section: ContentSection;
  isActive: boolean;
  isCompleted: boolean;
  onComplete: (sectionId: string) => void;
  progress?: number;
}

export const ContentRenderer = ({ 
  section, 
  isActive, 
  isCompleted, 
  onComplete,
  progress = 0 
}: ContentRendererProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interactive':
        return <Target className="h-5 w-5" />;
      case 'assessment':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'case_study':
        return <BookOpen className="h-5 w-5" />;
      case 'framework_guide':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interactive':
        return 'bg-accent';
      case 'assessment':
        return 'bg-secondary';
      case 'case_study':
        return 'bg-primary';
      case 'framework_guide':
        return 'bg-muted';
      default:
        return 'bg-muted-foreground';
    }
  };


  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={block.id} className="space-y-4">
            {block.title && (
              <h4 className="font-semibold text-lg">{block.title}</h4>
            )}
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line">{block.content}</div>
            </div>
          </div>
        );
      
      case 'key_points':
        return (
          <div key={block.id} className="space-y-3">
            {block.title && (
              <h4 className="font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                {block.title}
              </h4>
            )}
            <ul className="space-y-2">
              {(block.content as string[]).map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'framework':
        return (
          <div key={block.id} className="space-y-4 p-4 bg-muted/30 rounded-lg border">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                {block.content.name}
              </h4>
              <p className="text-sm text-muted-foreground">{block.content.description}</p>
            </div>
            
            <div className="space-y-4">
              {block.content.steps.map((step: any, stepIdx: number) => (
                <div key={stepIdx} className="space-y-2 p-3 bg-background rounded border-l-4 border-primary">
                  <h5 className="font-medium">
                    Step {step.step_number}: {step.title}
                  </h5>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  
                  {step.key_actions.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-1">Key Actions:</p>
                      <ul className="text-xs space-y-1">
                        {step.key_actions.map((action: string, actionIdx: number) => (
                          <li key={actionIdx} className="flex items-start gap-1">
                            <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {step.examples.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-1">Examples:</p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        {step.examples.map((example: string, exampleIdx: number) => (
                          <li key={exampleIdx} className="flex items-start gap-1">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mt-1.5 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <h6 className="font-medium">When to Use:</h6>
                <p className="text-muted-foreground">{block.content.when_to_use}</p>
              </div>
              <div className="space-y-2">
                <h6 className="font-medium">Benefits:</h6>
                <ul className="space-y-1">
                  {block.content.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1 text-muted-foreground">
                      <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderArticleContent = () => (
    <div className="space-y-6">
      {section.content?.content_blocks && section.content.content_blocks.length > 0 ? (
        section.content.content_blocks
          .sort((a, b) => a.order_index - b.order_index)
          .map((block, index) => renderContentBlock(block, index))
      ) : (
        <>
          {section.content?.text && (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line">{section.content.text}</div>
            </div>
          )}
          
          {section.content?.key_points && section.content.key_points.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Key Points
              </h4>
              <ul className="space-y-1">
                {section.content.key_points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
      )}

      {section.content?.objectives && section.content.objectives.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Objectives
          </h4>
          <ul className="space-y-1">
            {section.content.objectives.map((objective, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                {objective}
              </li>
            ))}
          </ul>
        </div>
      )}

      {section.content?.reflection_questions && section.content.reflection_questions.length > 0 && (
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Reflection Questions
          </h4>
          <div className="space-y-2">
            {section.content.reflection_questions.map((question, idx) => (
              <div key={idx} className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{question}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );

  const renderInteractiveContent = () => (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="font-medium">Interactive Exercise</h4>
            <p className="text-sm text-muted-foreground">
              {section.content?.exercise_type || 'Hands-on practice'}
            </p>
          </div>
        </div>
        
        {section.content?.instructions && (
          <p className="text-sm mb-4">{section.content.instructions}</p>
        )}

        <div className="space-y-3">
          {section.content?.instructions ? (
            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm mb-4">{section.content.instructions}</p>
              <div className="text-center">
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Start Exercise
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Interactive exercise coming soon</p>
              <p className="text-xs mt-1">Continue with other sections for now</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAssessmentContent = () => (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Knowledge Assessment
        </h4>
        
        {section.content?.questions && section.content.questions.length > 0 ? (
          <div className="space-y-4">
            {section.content.questions.map((question, idx) => (
              <div key={idx} className="p-3 bg-background rounded-lg border">
                <p className="font-medium mb-3">{question.question}</p>
                
                {question.type === 'multiple_choice' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, optIdx) => (
                      <label key={optIdx} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name={`question-${idx}`} 
                          value={optIdx}
                          className="text-primary"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {question.type === 'text' && (
                  <textarea 
                    placeholder="Enter your answer..."
                    className="w-full p-2 border rounded-md text-sm"
                    rows={3}
                  />
                )}
              </div>
            ))}
            
            <Button size="sm" className="w-full">
              Submit Assessment
            </Button>
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Assessment content coming soon</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (section.type) {
      case 'article':
        return renderArticleContent();
      case 'interactive':
        return renderInteractiveContent();
      case 'assessment':
        return renderAssessmentContent();
      default:
        return renderArticleContent();
    }
  };

  return (
    <Card className={`${isActive ? 'border-primary shadow-md' : ''}`}>
      <CardContent className="p-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getTypeColor(section.type)} text-white`}>
              {getTypeIcon(section.type)}
            </div>
            <div>
              <h3 className="font-semibold">{section.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {section.duration_minutes} min
                </Badge>
                {section.is_required && (
                  <Badge variant="secondary" className="text-xs">
                    Required
                  </Badge>
                )}
                {isCompleted && (
                  <Badge variant="default" className="text-xs bg-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section Description */}
        <p className="text-sm text-muted-foreground mb-4">{section.description}</p>

        {/* Section Content */}
        {isActive && (
          <div className="space-y-4">
            {renderContent()}
            
            {!isCompleted && (
              <div className="pt-4 border-t">
                <Button 
                  onClick={() => onComplete(section.id)}
                  className="w-full"
                  size="sm"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};