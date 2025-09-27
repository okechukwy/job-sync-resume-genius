import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ContentSection } from '@/types/coachingTypes';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Target,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface ContentRendererProps {
  section: ContentSection;
  isActive: boolean;
  isCompleted: boolean;
  isStarted?: boolean;
  onComplete: (sectionId: string) => void;
  onSectionStart?: (sectionId: string) => void;
  onReview?: (sectionId: string) => void;
  progress?: number;
}

export const ContentRenderer = ({ 
  section, 
  isActive, 
  isCompleted, 
  isStarted = false,
  onComplete,
  onSectionStart,
  onReview,
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

  const renderArticleContent = () => {
    // Handle both enhanced content and regular content structures
    const content = section.content || {};
    const blocks = content.content_blocks || [];
    const text = content.text || (typeof section.content === 'string' ? section.content : '');
    const keyPoints = content.key_points || [];
    const objectives = content.objectives || [];
    const caseStudies = content.case_studies || [];

    return (
      <div className="space-y-6">
        {/* External Resource Link */}
        {section.content_url && (
          <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">External Resource</h4>
                <p className="text-xs text-muted-foreground">This section includes an external learning resource</p>
              </div>
              <Button 
                size="sm" 
                onClick={() => window.open(section.content_url, '_blank', 'noopener,noreferrer')}
                className="flex items-center gap-2"
              >
                <FileText className="h-3 w-3" />
                Open Resource
              </Button>
            </div>
          </div>
        )}

        {blocks.length > 0 ? (
          blocks
            .sort((a, b) => a.order_index - b.order_index)
            .map((block, index) => renderContentBlock(block, index))
        ) : (
          <div className="space-y-4">
            {text && (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line">{text}</div>
              </div>
            )}
            
            {keyPoints.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Key Points
                </h4>
                <ul className="space-y-1">
                  {keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {objectives.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Learning Objectives
                </h4>
                <ul className="space-y-1">
                  {objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Empty state fallback */}
            {!text && !keyPoints.length && !objectives.length && !blocks.length && (
              <div className="p-4 bg-muted/20 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  {section.content_url 
                    ? "Click 'Open Resource' above to access the learning material for this section."
                    : "Content is being prepared for this section."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Case Studies from enhanced content */}
        {caseStudies.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Case Studies
            </h4>
            {caseStudies.map((caseStudy: any, idx: number) => (
              <div key={idx} className="p-4 bg-muted/20 rounded-lg border space-y-3">
                <h5 className="font-semibold">{caseStudy.title}</h5>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Scenario: </span>
                    {caseStudy.scenario}
                  </div>
                  <div>
                    <span className="font-medium">Background: </span>
                    {caseStudy.background}
                  </div>
                  <div>
                    <span className="font-medium">Challenge: </span>
                    {caseStudy.challenge}
                  </div>
                </div>
                
                {caseStudy.analysis_points && caseStudy.analysis_points.length > 0 && (
                  <div>
                    <h6 className="font-medium text-sm mb-2">Analysis Points:</h6>
                    <ul className="space-y-1 text-sm">
                      {caseStudy.analysis_points.map((point: string, pointIdx: number) => (
                        <li key={pointIdx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {caseStudy.key_takeaways && caseStudy.key_takeaways.length > 0 && (
                  <div>
                    <h6 className="font-medium text-sm mb-2">Key Takeaways:</h6>
                    <ul className="space-y-1 text-sm">
                      {caseStudy.key_takeaways.map((takeaway: string, takeawayIdx: number) => (
                        <li key={takeawayIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
      

  const renderInteractiveContent = () => (
    <div className="space-y-6">
      {section.content?.instructions && (
        <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Instructions
          </h4>
          <p className="text-sm">{section.content.instructions}</p>
        </div>
      )}
      
      {/* Interactive Elements */}
      {section.content?.interactive_elements && section.content.interactive_elements.length > 0 && (
        <div className="space-y-4">
          {section.content.interactive_elements.map((element: any, idx: number) => (
            <div key={idx} className="p-4 bg-muted/20 rounded-lg border space-y-4">
              <h5 className="font-semibold">{element.title}</h5>
              <p className="text-sm text-muted-foreground">{element.instructions}</p>
              
              {/* Scenarios for role-play exercises */}
              {element.scenarios && element.scenarios.length > 0 && (
                <div className="space-y-3">
                  <h6 className="font-medium text-sm">Practice Scenarios:</h6>
                  {element.scenarios.map((scenario: any, scenarioIdx: number) => (
                    <div key={scenarioIdx} className="p-3 bg-background rounded border">
                      <p className="text-sm mb-3 font-medium">{scenario.situation}</p>
                      <div className="space-y-2">
                        {scenario.options.map((option: any, optionIdx: number) => (
                          <details key={optionIdx} className="group">
                            <summary className="cursor-pointer text-sm p-2 bg-muted/30 rounded hover:bg-muted/50 transition-colors">
                              {option.text}
                            </summary>
                            <div className="mt-2 p-2 bg-muted/10 rounded text-xs space-y-1">
                              <div><span className="font-medium">Outcome:</span> {option.outcome}</div>
                              <div><span className="font-medium">Feedback:</span> {option.feedback}</div>
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reflection Prompts */}
              {element.reflection_prompts && element.reflection_prompts.length > 0 && (
                <div>
                  <h6 className="font-medium text-sm mb-2">Reflection Questions:</h6>
                  <ul className="space-y-2">
                    {element.reflection_prompts.map((prompt: string, promptIdx: number) => (
                      <li key={promptIdx} className="p-2 bg-accent/20 rounded text-sm">
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Success Criteria */}
              {element.success_criteria && element.success_criteria.length > 0 && (
                <div>
                  <h6 className="font-medium text-sm mb-2">Success Criteria:</h6>
                  <ul className="space-y-1">
                    {element.success_criteria.map((criteria: string, criteriaIdx: number) => (
                      <li key={criteriaIdx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Legacy reflection questions */}
      {section.content?.reflection_questions && section.content.reflection_questions.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Reflection Questions</h4>
          <ul className="space-y-2">
            {section.content.reflection_questions.map((question, idx) => (
              <li key={idx} className="p-2 bg-secondary/50 rounded text-sm">
                {question}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderAssessmentContent = () => (
    <div className="space-y-4">
      {section.content?.questions && section.content.questions.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium mb-4">Assessment Questions</h4>
          {section.content.questions.map((question, idx) => (
            <div key={idx} className="p-4 bg-muted/20 rounded-lg border space-y-3">
              <p className="font-medium">{question.question}</p>
              
              {question.type === 'multiple_choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, optionIdx) => (
                    <label key={optionIdx} className="flex items-start gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name={`question-${idx}`} 
                        className="mt-1" 
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {question.type === 'text' && (
                <textarea 
                  className="w-full p-2 border rounded text-sm" 
                  rows={3}
                  placeholder="Enter your answer..."
                />
              )}
              
              {question.explanation && (
                <div className="text-xs text-muted-foreground p-2 bg-muted/10 rounded">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (section.type) {
      case 'interactive':
        return renderInteractiveContent();
      case 'assessment':
        return renderAssessmentContent();
      case 'case_study':
      case 'framework_guide':
        return renderArticleContent(); // These types use the enhanced article renderer
      default:
        return renderArticleContent();
    }
  };

  return (
    <Card className={`transition-all duration-200 ${isActive ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-6">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${getTypeColor(section.type)}`}>
              {getTypeIcon(section.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{section.title}</h3>
                {isCompleted && (
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
                {section.is_required && (
                  <Badge variant="outline" className="text-xs">
                    Required
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {section.duration_minutes} min
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Description */}
        <p className="text-sm text-muted-foreground mb-4">{section.description}</p>

        {/* Progress indicator for active section */}
        {isActive && progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Content */}
        {isActive && (
          <div className="space-y-4" data-content-area>
            {/* Section action buttons */}
            {!isStarted && !isCompleted && onSectionStart && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-primary">Ready to start learning?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Begin this section to access interactive content and track your progress.
                    </p>
                  </div>
                  <Button onClick={() => onSectionStart(section.id)} variant="default">
                    Start Learning
                  </Button>
                </div>
              </div>
            )}
            
            {/* Learning content - only show if started or completed */}
            {(isStarted || isCompleted) && (
              <>
                {renderContent()}
                
                {/* Action buttons for started sections */}
                {isStarted && !isCompleted && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button onClick={() => onComplete(section.id)} className="flex-1">
                      Mark as Complete
                    </Button>
                    {onSectionStart && (
                      <Button 
                        onClick={() => onSectionStart(section.id)} 
                        variant="outline"
                        className="flex-1"
                      >
                        Review Content
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Completed state */}
                {isCompleted && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Section completed successfully
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};