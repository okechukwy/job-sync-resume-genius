import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContentRenderer } from './ContentRenderer';
import { SectionProgressTracker } from './SectionProgressTracker';
import { useEnhancedContent } from './EnhancedContentLoader';
import { ContentSection, LearningModule, ModuleProgress } from '@/types/coachingTypes';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  BookOpen,
  Target,
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';

interface ModuleContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: LearningModule | null;
  progress?: ModuleProgress;
  enrollmentId: string;
  onStartModule: (moduleId: string, enrollmentId: string) => void;
  onCompleteModule: (moduleId: string, enrollmentId: string) => void;
  isUpdating: boolean;
}

export const ModuleContentModal = ({
  isOpen,
  onClose,
  module,
  progress,
  enrollmentId,
  onStartModule,
  onCompleteModule,
  isUpdating
}: ModuleContentModalProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [startedSections, setStartedSections] = useState<Set<string>>(new Set());
  
  // Try to load enhanced content if available - SINGLE hook call at top level
  const enhancedContent = useEnhancedContent(module?.id || '');

  // Define all hooks at the top before any early returns or conditional logic
  const handleStart = useCallback(() => {
    if (!module) return;
    onStartModule(module.id, enrollmentId);
    
    // Auto-select first section
    setCurrentSection(0);
    
    // Auto-start the first section
    const contentSections = enhancedContent?.content_sections || normalizeContentSections(module.content_sections);
    if (contentSections.length > 0) {
      setStartedSections(prev => new Set([...prev, contentSections[0].id]));
    }
    
    // Scroll to content area after a brief delay
    setTimeout(() => {
      const contentArea = document.querySelector('[data-content-area]');
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  }, [module, enrollmentId, onStartModule, enhancedContent]);

  const handleComplete = useCallback(() => {
    if (!module) return;
    onCompleteModule(module.id, enrollmentId);
  }, [module, enrollmentId, onCompleteModule]);

  const handleSectionComplete = useCallback((sectionId: string) => {
    if (!module) return;
    setCompletedSections(prev => new Set([...prev, sectionId]));
  }, [module]);

  // Auto-completion logic for sections
  const checkAutoCompletion = useCallback((sectionId: string, contentSections: any[], completedSections: Set<string>) => {
    if (!module || !contentSections) return;
    const requiredSections = contentSections.filter(s => s.is_required);
    const completedRequiredSections = requiredSections.filter(s => 
      completedSections.has(s.id) || s.id === sectionId
    );
    
    if (completedRequiredSections.length === requiredSections.length) {
      // Auto-complete the module if all required sections are done
      setTimeout(() => onCompleteModule(module.id, enrollmentId), 1000);
    }
  }, [module, enrollmentId, onCompleteModule]);

  // Update section complete handler to use the auto-completion logic
  const handleSectionCompleteWithAutoCompletion = useCallback((sectionId: string, contentSections: any[]) => {
    handleSectionComplete(sectionId);
    checkAutoCompletion(sectionId, contentSections, completedSections);
  }, [handleSectionComplete, checkAutoCompletion, completedSections]);

  const handleSectionStart = useCallback((sectionId: string) => {
    setStartedSections(prev => new Set([...prev, sectionId]));
    console.log('🎯 Section started:', sectionId);
  }, []);

  const handleReview = useCallback((sectionId: string) => {
    // Scroll to content area
    const contentArea = document.querySelector('[data-content-area]');
    if (contentArea) {
      contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);


  // Early return after all hooks are defined
  if (!module) return null;

  // Process content sections early so they can be used in callbacks
  const normalizeContentSections = (sections: any) => {
    try {
      console.log('🔍 normalizeContentSections input:', sections);
      
      if (!sections) {
        console.log('🔍 No sections provided, returning empty array');
        return [];
      }
      
      let parsedSections = sections;
      
      // If it's a JSON string, parse it first
      if (typeof sections === 'string') {
        try {
          parsedSections = JSON.parse(sections);
          console.log('🔍 Parsed JSON string:', parsedSections);
        } catch (error) {
          console.error('⚠️ Failed to parse content_sections JSON:', error);
          return [];
        }
      }
      
      // If it's not an array, return empty
      if (!Array.isArray(parsedSections)) {
        console.log('🔍 Sections is not an array:', typeof parsedSections);
        return [];
      }
      
      // Normalize each section to ensure consistent structure
      const normalized = parsedSections.map((section: any, index: number) => {
        try {
          return {
            id: section.id || `section-${Date.now()}-${index}`,
            title: section.title || 'Untitled Section',
            type: section.type || 'article',
            content_url: section.content_url || section.contentUrl,
            content: section.content || {},
            duration_minutes: section.duration_minutes || section.durationMinutes || 5,
            description: section.description || '',
            is_required: section.is_required ?? section.isRequired ?? true,
            order_index: section.order_index ?? section.orderIndex ?? index,
          };
        } catch (sectionError) {
          console.error('⚠️ Error processing section at index', index, ':', sectionError);
          return {
            id: `fallback-section-${index}`,
            title: 'Section Content Error',
            type: 'article' as const,
            content: { text: 'This section could not be loaded properly.' },
            duration_minutes: 5,
            description: 'Error loading section content',
            is_required: false,
            order_index: index,
          };
        }
      }).sort((a, b) => a.order_index - b.order_index);
      
      console.log('🔍 Normalized sections:', normalized);
      return normalized;
      
    } catch (error) {
      console.error('⚠️ Critical error in normalizeContentSections:', error);
      return [];
    }
  };

  // Create fallback content sections if none exist
  const createFallbackContentSections = (module: LearningModule) => {
    try {
      console.log('🔍 Creating fallback content sections for module:', module.title);
      const moduleTitle = module.title || 'Learning Module';
      const totalDuration = module.duration_minutes || 45; // Default to 45 minutes
      const baseDuration = Math.max(20, totalDuration); // Ensure we have at least 20 minutes
    
    return [
      {
        id: 'module-introduction',
        title: 'Introduction',
        type: 'article',
        content: {
          text: `Welcome to "${moduleTitle}". ${module.description || 'This comprehensive module will guide you through essential concepts and practical strategies to advance your career and develop leadership capabilities.'} \n\nThroughout this module, you'll engage with interactive content, real-world scenarios, and practical exercises designed to enhance your understanding and application of key concepts.`,
          key_points: [
            'Gain deep understanding of core principles',
            'Learn from practical case studies and examples',
            'Apply concepts through hands-on exercises',
            'Develop actionable strategies for your career',
            'Build confidence in your professional abilities'
          ],
          objectives: module.learning_objectives || [
            'Understand fundamental concepts and their applications',
            'Develop practical skills through guided exercises',
            'Create a personal action plan for implementation'
          ],
          reflection_questions: [
            'What specific outcomes do you hope to achieve from this module?',
            'How do these learning objectives align with your current career goals?',
            'What challenges might you face in applying these concepts?'
          ]
        },
        duration_minutes: 8,
        description: 'Module overview and learning objectives',
        is_required: true,
        order_index: 1
      },
      {
        id: 'core-concepts',
        title: 'Core Concepts & Theory',
        type: 'article',
        content: {
          text: 'In this section, we explore the foundational concepts that underpin effective professional practice. Understanding these principles will provide you with a solid framework for making informed decisions and taking strategic actions in your career.',
          key_points: [
            'Master the fundamental principles and their interconnections',
            'Understand how theory translates into practical applications',
            'Recognize patterns and frameworks used by successful professionals',
            'Learn to adapt concepts to different contexts and situations',
            'Build a mental model for continuous improvement and growth'
          ],
          instructions: 'As you read through this content, take notes on concepts that resonate with your experience. Consider how these ideas might apply to specific situations in your work environment.',
          reflection_questions: [
            'Which concepts are most relevant to your current role?',
            'How might these principles change your approach to challenges?',
            'What examples from your experience illustrate these concepts?'
          ]
        },
        duration_minutes: Math.floor((baseDuration - 20) * 0.6),
        description: 'Essential concepts and theoretical foundations',
        is_required: true,
        order_index: 2
      },
      {
        id: 'practical-application',
        title: 'Practical Application',
        type: 'interactive',
        content: {
          text: 'Now that you understand the core concepts, let\'s explore how to apply them in real-world scenarios. This interactive section will guide you through practical exercises and case studies.',
          instructions: 'Work through the following scenarios and exercises. Take time to think critically about each situation and consider multiple approaches before deciding on your response.',
          exercise_type: 'Case Study Analysis',
          key_points: [
            'Practice applying concepts to realistic scenarios',
            'Develop decision-making frameworks',
            'Learn from both successful and challenging situations',
            'Build confidence in your problem-solving abilities'
          ]
        },
        duration_minutes: Math.floor((baseDuration - 20) * 0.3),
        description: 'Hands-on practice with real-world scenarios',
        is_required: true,
        order_index: 3
      },
      {
        id: 'knowledge-assessment',
        title: 'Knowledge Check',
        type: 'assessment',
        content: {
          questions: [
            {
              question: 'What are the most important factors to consider when applying these concepts in your workplace?',
              type: 'multiple_choice',
              options: [
                'Organizational culture and context',
                'Available resources and constraints', 
                'Stakeholder needs and expectations',
                'All of the above factors are important'
              ],
              correct_answer: 3
            },
            {
              question: 'Describe a specific situation where you could apply the concepts learned in this module. What would be your approach?',
              type: 'text'
            },
            {
              question: 'What is the key benefit of understanding these foundational concepts?',
              type: 'multiple_choice',
              options: [
                'Following established procedures',
                'Making informed decisions based on proven principles',
                'Avoiding all workplace challenges',
                'Eliminating the need for further learning'
              ],
              correct_answer: 1
            }
          ]
        },
        duration_minutes: 8,
        description: 'Assess your understanding and application readiness',
        is_required: true,
        order_index: 4
      },
      {
        id: 'action-planning',
        title: 'Action Planning',
        type: 'interactive',
        content: {
          text: 'The final step is creating your personal action plan. This will help you translate what you\'ve learned into concrete steps you can take in your professional life.',
          instructions: 'Complete the action planning exercise below. Be specific about your goals, timelines, and success metrics. Consider both immediate actions and longer-term strategies.',
          exercise_type: 'Action Plan Development',
          key_points: [
            'Set specific, measurable goals based on your learning',
            'Identify resources and support needed for success',
            'Create realistic timelines for implementation',
            'Define success metrics and checkpoints',
            'Plan for potential obstacles and solutions'
          ],
          reflection_questions: [
            'What are your top 3 priorities for applying this knowledge?',
            'Who can support you in implementing these changes?',
            'How will you measure your progress and success?',
            'What potential barriers might you encounter, and how will you address them?'
          ]
        },
        duration_minutes: 6,
        description: 'Create your personal implementation strategy',
        is_required: false,
        order_index: 5
      }
    ];
  } catch (error) {
    console.error('⚠️ Error creating fallback content sections:', error);
    // Return minimal fallback on error
    return [{
      id: 'minimal-fallback',
      title: 'Module Content',
      type: 'article' as const,
      content: { text: 'Module content is being loaded...' },
      duration_minutes: 10,
      description: 'Module content',
      is_required: true,
      order_index: 1
    }];
  }
};

  // Normalize enhanced content to match expected structure
  const normalizeEnhancedContent = (enhancedSections: any[]) => {
    return enhancedSections.map((section: any) => ({
      ...section,
      content: {
        content_blocks: section.content_blocks || [],
        text: section.content?.text || (typeof section.content === 'string' ? section.content : ''),
        key_points: section.content?.key_points || [],
        objectives: section.content?.objectives || section.learning_outcomes || [],
        instructions: section.content?.instructions || '',
        questions: section.content?.questions || [],
        reflection_questions: section.content?.reflection_questions || [],
        interactive_elements: section.interactive_elements || [],
        case_studies: section.case_studies || [],
        frameworks: section.frameworks || []
      },
      content_url: section.content_url || null
    }));
  };

  // Process content sections
  let contentSections = [];
  try {
    console.log('🔍 Starting content sections processing for module:', module.id);
    console.log('🔍 Enhanced content available:', !!enhancedContent);
    
    // Use enhanced content if available
    if (enhancedContent?.content_sections) {
      console.log('✨ Using enhanced content for module:', module.title);
      contentSections = normalizeEnhancedContent(enhancedContent.content_sections);
    } else {
      const parsedContentSections = normalizeContentSections(module.content_sections);
      console.log('🔍 Parsed content sections:', parsedContentSections);
      
      contentSections = parsedContentSections.length > 0 
        ? parsedContentSections 
        : createFallbackContentSections(module);
    }
    
    console.log('🔍 Final content sections:', contentSections);
  } catch (error) {
    console.error('Error processing content sections:', error);
    contentSections = createFallbackContentSections(module);
  }

  // Create navigation handlers that work with the processed contentSections
  const navigateToNextSection = () => {
    if (currentSection < contentSections.length - 1) {
      const newSection = currentSection + 1;
      setCurrentSection(newSection);
      
      // Auto-complete current section when moving to next
      if (contentSections[currentSection]) {
        handleSectionComplete(contentSections[currentSection].id);
      }
      
      // Scroll to content area
      setTimeout(() => {
        const contentArea = document.querySelector('[data-content-area]');
        if (contentArea) {
          contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const navigateToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      
      // Scroll to content area
      setTimeout(() => {
        const contentArea = document.querySelector('[data-content-area]');
        if (contentArea) {
          contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Define module states more clearly
  const progressPercentage = progress?.progress_percentage || 0;
  const hasCompletedSections = completedSections.size > 0;
  
  // Clear state detection logic
  const isCompleted = progress?.status === 'completed';
  const isInProgress = progress?.status === 'in_progress' || (progressPercentage > 0 && progressPercentage < 100) || hasCompletedSections;
  const isNotStarted = !progress || (progress.status !== 'completed' && progress.status !== 'in_progress' && progressPercentage === 0 && !hasCompletedSections);

  // Add error boundary for modal content
  try {
  
  // Normalize content_sections to handle both camelCase and snake_case data

  const getContentIcon = (contentType: string) => {
    if (!contentType) return <FileText className="h-5 w-5" />;
    
    switch (contentType.toLowerCase()) {
      case 'interactive':
        return <Target className="h-5 w-5" />;
      case 'assessment':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'case_study':
      case 'framework_guide':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (level: string) => {
    if (!level) return 'bg-gray-500';
    
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Helper functions (not hooks, so they can be defined here)

  // Get current section data
  const currentSectionData = contentSections[currentSection];

  // Error boundary for rendering issues
  if (!contentSections || contentSections.length === 0) {
    console.error('🚨 No content sections available for module:', module.id);
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Content Unavailable</DialogTitle>
            <DialogDescription>
              This learning module's content could not be loaded properly.
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer">Debug Info (Dev Only)</summary>
                  <pre className="mt-1 p-2 bg-muted rounded text-left overflow-auto">
                    Module ID: {module.id}\nModule Title: {module.title}\nRaw content_sections: {JSON.stringify(module.content_sections, null, 2)}
                  </pre>
                </details>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="flex items-center gap-3 text-xl">
                {getContentIcon(module.content_type)}
                {module.title}
              </DialogTitle>
              <DialogDescription className="mt-1">
                {module.description}
              </DialogDescription>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {module.duration_minutes} min
                </Badge>
                {module.difficulty_level && (
                  <Badge variant="outline">
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(module.difficulty_level)} mr-1`} />
                    {module.difficulty_level}
                  </Badge>
                )}
                {isCompleted && (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="space-y-6 pr-2">
            {/* Progress Section */}
            {isNotStarted ? (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Ready to Start</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Not Started
                    </Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Click "Start Module" to begin your learning journey
                  </div>
                </CardContent>
              </Card>
            ) : (isInProgress || isCompleted) && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Your Progress</span>
                    <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  {progress?.time_spent_minutes && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Time spent: {Math.round(progress.time_spent_minutes)} minutes
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Module Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About this module</h3>
              <p className="text-muted-foreground">{module.description}</p>
            </div>

            {/* Learning Objectives */}
            {module.learning_objectives && module.learning_objectives.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Learning Objectives</h3>
                <ul className="space-y-2">
                  {module.learning_objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {module.prerequisites && module.prerequisites.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
                <ul className="space-y-2">
                  {module.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Learning Content Sections */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Module Content</h3>
                {!isCompleted && (
                  <Badge variant="outline" className="text-xs">
                    Click sections to explore content
                  </Badge>
                )}
              </div>
              
              <div className="grid lg:grid-cols-[20rem,1fr] gap-6 min-h-0">
                {/* Progress Tracker Sidebar */}
                <div className="lg:sticky lg:top-2 lg:h-fit">
                  {(() => {
                    try {
                      return (
                        <SectionProgressTracker
                          sections={contentSections}
                          completedSections={completedSections}
                          startedSections={startedSections}
                          currentSection={currentSection}
                          onSectionSelect={(index) => {
                            setCurrentSection(index);
                            // Scroll content to top when switching sections
                            const contentArea = document.querySelector('[data-content-area]');
                            if (contentArea) {
                              contentArea.scrollTop = 0;
                            }
                          }}
                        />
                      );
                    } catch (error) {
                      console.error('Error rendering progress tracker:', error);
                      return (
                        <div className="p-4 border border-dashed border-muted-foreground/50 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">Progress tracker unavailable</p>
                        </div>
                      );
                    }
                  })()}
                </div>

                {/* Current Section Content */}
                <div className="min-w-0" data-content-area>
                  {(() => {
                    try {
                      if (!currentSectionData) {
                        return (
                          <div className="p-6 text-center text-muted-foreground">
                            <FileText className="h-8 w-8 mx-auto mb-2" />
                            <p>No content available for this section.</p>
                          </div>
                        );
                      }
                      
                      return (
                        <ContentRenderer
                          section={currentSectionData}
                          isActive={true}
                          isCompleted={completedSections.has(currentSectionData.id)}
                          isStarted={startedSections.has(currentSectionData.id)}
                          onComplete={(sectionId: string) => handleSectionCompleteWithAutoCompletion(sectionId, contentSections)}
                          onSectionStart={handleSectionStart}
                          onReview={handleReview}
                        />
                      );
                    } catch (error) {
                      console.error('Error rendering content section:', error);
                      return (
                        <div className="p-6 text-center">
                          <div className="text-red-500 mb-4">
                            <h4 className="font-semibold mb-2">Content Loading Error</h4>
                            <p className="text-sm">Unable to display this section content.</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setCurrentSection(0)}
                          >
                            Return to First Section
                          </Button>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 pt-4 border-t mt-6">
          {isNotStarted ? (
            // Not Started - Show Start Module button
            <div className="flex gap-3">
              <Button 
                onClick={handleStart} 
                disabled={isUpdating}
                className="flex-1"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Start Module
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          ) : isInProgress ? (
            // In Progress - Show navigation and completion options
            <div className="space-y-3">
              {/* Section Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={navigateToPreviousSection}
                    disabled={currentSection === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={navigateToNextSection}
                    disabled={currentSection >= contentSections.length - 1}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Section {currentSection + 1} of {contentSections.length}
                </div>
              </div>

              {/* Module Actions */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleComplete} 
                  disabled={isUpdating}
                  variant="outline"
                  className="flex-1"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            // Completed - Show Review Content option
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Review Content
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
  
  } catch (error) {
    console.error('🚨 Critical error in ModuleContentModal component:', error);
    console.error('🚨 Error stack:', (error as Error).stack);
    console.error('🚨 Module data that caused error:', module);
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Module Loading Error</DialogTitle>
            <DialogDescription>
              There was an error loading this learning module. Please try again later.
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer">Error Details (Dev Only)</summary>
                  <pre className="mt-1 p-2 bg-muted rounded text-left overflow-auto">
                    {(error as Error).message}\n{(error as Error).stack}
                  </pre>
                </details>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};
