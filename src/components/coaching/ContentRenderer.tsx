import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, BookOpen, Users, Target, Lightbulb, ExternalLink } from 'lucide-react';
import { useContentEngagement } from '@/hooks/useContentEngagement';

interface ContentRendererProps {
  section: any;
  isActive: boolean;
  isCompleted: boolean;
  isStarted: boolean;
  onComplete: (sectionId: string) => void;
  onSectionStart?: (sectionId: string) => void;
  onReview?: (sectionId: string) => void;
}

export const ContentRenderer = ({ 
  section, 
  isActive, 
  isCompleted, 
  isStarted, 
  onComplete, 
  onSectionStart,
  onReview 
}: ContentRendererProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [engagementState, engagementActions] = useContentEngagement(section.id, section.content);

  // Auto-track text viewing when content is rendered
  useEffect(() => {
    if (isStarted && !engagementState.textContentViewed) {
      const timer = setTimeout(() => {
        engagementActions.markTextViewed();
      }, 3000); // Mark as viewed after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isStarted, engagementState.textContentViewed, engagementActions]);

  const handleExternalResourceClick = () => {
    engagementActions.markExternalResourceOpened();
    if (section.content_url) {
      window.open(section.content_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCaseStudyInteraction = (caseStudyId: string) => {
    engagementActions.markCaseStudyViewed(caseStudyId);
  };

  const handleFrameworkInteraction = (frameworkId: string) => {
    engagementActions.markFrameworkInteracted(frameworkId);
  };

  const handleInteractiveComplete = (elementId: string) => {
    engagementActions.markInteractiveCompleted(elementId);
  };

  const handleReviewClick = () => {
    onReview?.(section.id);
    // Scroll to top of content
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <BookOpen className="w-4 h-4" />;
      case 'key_points':
        return <Target className="w-4 h-4" />;
      case 'interactive':
        return <Users className="w-4 h-4" />;
      case 'assessment':
        return <CheckCircle className="w-4 h-4" />;
      case 'case_study':
        return <BookOpen className="w-4 h-4" />;
      case 'framework_guide':
        return <Target className="w-4 h-4" />;
      case 'framework':
        return <Target className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'bg-blue-100';
      case 'key_points':
        return 'bg-green-100';
      case 'interactive':
        return 'bg-purple-100';
      case 'assessment':
        return 'bg-orange-100';
      case 'case_study':
        return 'bg-indigo-100';
      case 'framework_guide':
        return 'bg-teal-100';
      case 'framework':
        return 'bg-cyan-100';
      default:
        return 'bg-gray-100';
    }
  };

  // Helper function to format text content
  const formatTextContent = (content: string) => {
    if (!content) return '';
    
    // Replace literal \n with actual line breaks
    let formatted = content.replace(/\\n/g, '\n');
    
    // Replace double line breaks with proper spacing
    formatted = formatted.replace(/\n\n/g, '\n\n');
    
    // Parse basic markdown formatting
    formatted = formatted
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code inline
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
    
    return formatted;
  };

  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={index} className="prose prose-sm max-w-none">
            {block.title && <h4 className="font-semibold text-lg mb-2">{block.title}</h4>}
            <div 
              className="whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatTextContent(block.content) }}
            />
          </div>
        );
      
      case 'key_points':
        return (
          <div key={index} className="space-y-2">
            {block.title && (
              <h4 className="font-medium flex items-center gap-2">
                <Target className="w-4 h-4" />
                {block.title}
              </h4>
            )}
            <ul className="space-y-1">
              {(Array.isArray(block.content) ? block.content : []).map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'framework':
        const framework = block.content;
        return (
          <div key={index} className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900">{framework?.name || 'Framework'}</h4>
            <p className="text-sm text-purple-800">{framework?.description}</p>
            
            {framework?.steps && framework.steps.length > 0 && (
              <div className="space-y-2">
                <strong className="text-xs uppercase tracking-wide text-purple-700">Steps:</strong>
                <ol className="list-decimal list-inside text-sm text-purple-800 space-y-1">
                  {framework.steps.map((step: any, stepIdx: number) => (
                    <li key={stepIdx}>
                      <strong>{step.title}:</strong> {step.description}
                    </li>
                  ))}
                </ol>
              </div>
            )}
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
    const text = content.text || content.instructions || (typeof section.content === 'string' ? section.content : '');
    const keyPoints = content.key_points || [];
    const objectives = content.objectives || [];
    const caseStudies = content.case_studies || [];
    const frameworks = content.frameworks || [];

    return (
      <div className="space-y-6">
        {/* External Resource Button */}
        {section.content_url && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900">External Resource</h4>
                <p className="text-sm text-blue-700">This section includes an external resource for additional learning.</p>
              </div>
              <Button 
                onClick={handleExternalResourceClick}
                className="flex items-center gap-2"
                variant={engagementState.externalResourceOpened ? "secondary" : "outline"}
              >
                <ExternalLink className="w-4 h-4" />
                {engagementState.externalResourceOpened ? 'Resource Opened' : 'Open Resource'}
              </Button>
            </div>
          </div>
        )}

        {/* Text content */}
        {text && (
          <div className="prose prose-sm max-w-none">
            <div 
              className="whitespace-pre-line leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatTextContent(text) }}
            />
          </div>
        )}

        {/* Content blocks */}
        {blocks.length > 0 && (
          <div className="space-y-4">
            {blocks
              .sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0))
              .map((block: any, index: number) => renderContentBlock(block, index))}
          </div>
        )}

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Key Points
            </h4>
            <ul className="space-y-1">
              {keyPoints.map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Objectives */}
        {objectives.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learning Objectives
            </h4>
            <ul className="space-y-1">
              {objectives.map((objective: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Case Studies with Engagement Tracking */}
        {caseStudies.length > 0 && (
          <div className="space-y-4 mb-6">
            <h4 className="text-md font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              Case Studies ({engagementState.caseStudiesViewed}/{engagementState.totalCaseStudies} viewed)
            </h4>
            {caseStudies.map((caseStudy: any, idx: number) => {
              const isViewed = engagementState.caseStudiesViewed > idx;
              return (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    isViewed ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                  onClick={() => handleCaseStudyInteraction(caseStudy.id || `case-${idx}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-medium ${isViewed ? 'text-green-900' : 'text-blue-900'}`}>
                      {caseStudy.title}
                    </h5>
                    {isViewed && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <p className={`text-sm mb-3 ${isViewed ? 'text-green-800' : 'text-blue-800'}`}>
                    {caseStudy.scenario}
                  </p>
                  
                  {caseStudy.background && (
                    <div className="mb-3">
                      <strong className={`text-xs uppercase tracking-wide ${isViewed ? 'text-green-700' : 'text-blue-700'}`}>
                        Background:
                      </strong>
                      <p className={`text-sm mt-1 ${isViewed ? 'text-green-800' : 'text-blue-800'}`}>
                        {caseStudy.background}
                      </p>
                    </div>
                  )}
                  
                  {caseStudy.challenge && (
                    <div className="mb-3">
                      <strong className={`text-xs uppercase tracking-wide ${isViewed ? 'text-green-700' : 'text-blue-700'}`}>
                        Challenge:
                      </strong>
                      <p className={`text-sm mt-1 ${isViewed ? 'text-green-800' : 'text-blue-800'}`}>
                        {caseStudy.challenge}
                      </p>
                    </div>
                  )}
                  
                  {caseStudy.analysis_points && caseStudy.analysis_points.length > 0 && (
                    <div className="mb-3">
                      <strong className={`text-xs uppercase tracking-wide ${isViewed ? 'text-green-700' : 'text-blue-700'}`}>
                        Key Analysis Points:
                      </strong>
                      <ul className={`list-disc list-inside text-sm mt-1 space-y-1 ${
                        isViewed ? 'text-green-800' : 'text-blue-800'
                      }`}>
                        {caseStudy.analysis_points.map((point: string, pointIdx: number) => (
                          <li key={pointIdx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {caseStudy.key_takeaways && caseStudy.key_takeaways.length > 0 && (
                    <div>
                      <strong className={`text-xs uppercase tracking-wide ${isViewed ? 'text-green-700' : 'text-blue-700'}`}>
                        Key Takeaways:
                      </strong>
                      <ul className={`list-disc list-inside text-sm mt-1 space-y-1 ${
                        isViewed ? 'text-green-800' : 'text-blue-800'
                      }`}>
                        {caseStudy.key_takeaways.map((takeaway: string, takeawayIdx: number) => (
                          <li key={takeawayIdx}>{takeaway}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Frameworks with Engagement Tracking */}
        {frameworks.length > 0 && (
          <div className="space-y-4 mb-6">
            <h4 className="text-md font-semibold flex items-center gap-2">
              <Target className="w-4 h-4" />
              Frameworks & Models ({engagementState.frameworksInteracted}/{engagementState.totalFrameworks} practiced)
            </h4>
            {frameworks.map((framework: any, idx: number) => {
              const isInteracted = engagementState.frameworksInteracted > idx;
              return (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    isInteracted ? 'bg-green-50 border-green-200' : 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                  }`}
                  onClick={() => handleFrameworkInteraction(framework.id || `framework-${idx}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-medium ${isInteracted ? 'text-green-900' : 'text-purple-900'}`}>
                      {framework.name}
                    </h5>
                    {isInteracted && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <p className={`text-sm mb-3 ${isInteracted ? 'text-green-800' : 'text-purple-800'}`}>
                    {framework.description}
                  </p>
                  
                  {framework.steps && framework.steps.length > 0 && (
                    <div className="mb-3">
                      <strong className={`text-xs uppercase tracking-wide ${isInteracted ? 'text-green-700' : 'text-purple-700'}`}>
                        Steps:
                      </strong>
                      <ol className={`list-decimal list-inside text-sm mt-1 space-y-1 ${
                        isInteracted ? 'text-green-800' : 'text-purple-800'
                      }`}>
                        {framework.steps.map((step: any, stepIdx: number) => (
                          <li key={stepIdx}>
                            <strong>{step.title}:</strong> {step.description}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  
                  {framework.when_to_use && (
                    <div className="mb-3">
                      <strong className={`text-xs uppercase tracking-wide ${isInteracted ? 'text-green-700' : 'text-purple-700'}`}>
                        When to Use:
                      </strong>
                      <p className={`text-sm mt-1 ${isInteracted ? 'text-green-800' : 'text-purple-800'}`}>
                        {framework.when_to_use}
                      </p>
                    </div>
                  )}
                  
                  {framework.benefits && framework.benefits.length > 0 && (
                    <div>
                      <strong className={`text-xs uppercase tracking-wide ${isInteracted ? 'text-green-700' : 'text-purple-700'}`}>
                        Benefits:
                      </strong>
                      <ul className={`list-disc list-inside text-sm mt-1 space-y-1 ${
                        isInteracted ? 'text-green-800' : 'text-purple-800'
                      }`}>
                        {framework.benefits.map((benefit: string, benefitIdx: number) => (
                          <li key={benefitIdx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state fallback */}
        {!text && !keyPoints.length && !objectives.length && !blocks.length && !caseStudies.length && !frameworks.length && (
          <div className="p-4 bg-muted/20 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              {section.content_url 
                ? "Click 'Open Resource' above to access the learning material for this section."
                : "Content is being prepared for this section."}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderInteractiveContent = () => {
    const content = section.content || {};
    const instructions = content.instructions || content.text || '';
    const interactiveElements = content.interactive_elements || [];
    
    return (
      <div className="space-y-6">
        {instructions && (
          <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Instructions
            </h4>
            <p className="text-sm">{instructions}</p>
          </div>
        )}
        
        {/* Interactive Elements with Engagement Tracking */}
        {interactiveElements.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-md font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              Interactive Exercises ({engagementState.interactiveElementsCompleted}/{engagementState.totalInteractiveElements} completed)
            </h4>
            {interactiveElements.map((element: any, idx: number) => {
              const isCompleted = engagementState.interactiveElementsCompleted > idx;
              return (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg border ${
                    isCompleted ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className={`font-semibold ${isCompleted ? 'text-green-900' : 'text-yellow-900'}`}>
                      {element.title}
                    </h5>
                    <Button 
                      size="sm"
                      onClick={() => handleInteractiveComplete(element.id || `interactive-${idx}`)}
                      variant={isCompleted ? "secondary" : "outline"}
                    >
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : 'Complete'}
                    </Button>
                  </div>
                  <p className={`text-sm mb-3 ${isCompleted ? 'text-green-800' : 'text-yellow-800'}`}>
                    {element.instructions}
                  </p>
                  
                  {/* Scenarios for role-play exercises */}
                  {element.scenarios && element.scenarios.length > 0 && (
                    <div className="space-y-3">
                      <h6 className={`font-medium text-sm ${isCompleted ? 'text-green-900' : 'text-yellow-900'}`}>
                        Practice Scenarios:
                      </h6>
                      {element.scenarios.map((scenario: any, scenarioIdx: number) => (
                        <div key={scenarioIdx} className={`p-3 rounded border ${
                          isCompleted ? 'bg-green-100 border-green-300' : 'bg-yellow-100 border-yellow-300'
                        }`}>
                          <p className={`text-sm mb-3 font-medium ${
                            isCompleted ? 'text-green-900' : 'text-yellow-900'
                          }`}>
                            {scenario.situation}
                          </p>
                          <div className="space-y-2">
                            {scenario.options?.map((option: any, optionIdx: number) => (
                              <details key={optionIdx} className="group">
                                <summary className={`cursor-pointer text-sm p-2 rounded transition-colors ${
                                  isCompleted ? 'bg-green-200 hover:bg-green-300' : 'bg-yellow-200 hover:bg-yellow-300'
                                }`}>
                                  {option.text}
                                </summary>
                                <div className={`mt-2 p-2 rounded text-xs space-y-1 ${
                                  isCompleted ? 'bg-green-50' : 'bg-yellow-50'
                                }`}>
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
                      <h6 className={`font-medium text-sm mb-2 ${isCompleted ? 'text-green-900' : 'text-yellow-900'}`}>
                        Reflection Questions:
                      </h6>
                      <ul className="space-y-2">
                        {element.reflection_prompts.map((prompt: string, promptIdx: number) => (
                          <li key={promptIdx} className={`p-2 rounded text-sm ${
                            isCompleted ? 'bg-green-100' : 'bg-yellow-100'
                          }`}>
                            {prompt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderAssessmentContent = () => {
    const content = section.content || {};
    const questions = content.questions || [];
    
    return (
      <div className="space-y-4">
        {questions.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium mb-4">Assessment Questions</h4>
            {questions.map((question: any, idx: number) => (
              <div key={idx} className="p-4 bg-muted/20 rounded-lg border space-y-3">
                <p className="font-medium">{question.question}</p>
                
                {question.type === 'multiple_choice' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option: string, optionIdx: number) => (
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
                
                {question.explanation && (
                  <div className="mt-3 p-3 bg-blue-50 rounded border">
                    <p className="text-sm text-blue-800">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (section.type) {
      case 'case_study':
      case 'framework_guide':
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
    <Card className="w-full">
      <div className="p-6" ref={contentRef}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {getTypeIcon(section.type)}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="text-sm text-muted-foreground">
                {section.duration_minutes} minutes • {section.type?.replace('_', ' ')} 
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
            {isStarted && !isCompleted && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Circle className="w-3 h-3 mr-1" />
                In Progress ({engagementActions.getEngagementLevel()})
              </Badge>
            )}
            {section.is_required && (
              <Badge variant="outline">Required</Badge>
            )}
          </div>
        </div>

        {section.description && (
          <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
        )}

        {/* Not started state */}
        {!isStarted && !isCompleted && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Ready to begin this section?</p>
            <Button onClick={() => onSectionStart?.(section.id)}>
              Start Learning
            </Button>
          </div>
        )}

        {/* Started content */}
        {isStarted && !isCompleted && (
          <div data-content-area className="space-y-6">
            {renderContent()}
            
            {/* Action buttons for started sections */}
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                onClick={() => onComplete(section.id)} 
                className="flex-1"
                disabled={!engagementActions.canComplete()}
              >
                {engagementActions.canComplete() ? 'Mark as Complete' : 'Complete Learning First'}
              </Button>
              <Button 
                onClick={handleReviewClick}
                variant="outline"
                className="flex-1"
              >
                {engagementActions.getNextAction()}
              </Button>
            </div>
          </div>
        )}

        {/* Completed state */}
        {isCompleted && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Section Completed</span>
            </div>
            
            {renderContent()}
            
            <div className="pt-4 border-t">
              <Button 
                onClick={handleReviewClick}
                variant="outline" 
                className="w-full"
              >
                Review Content
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};