import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContentRenderer } from './ContentRenderer';
import { SectionProgressTracker } from './SectionProgressTracker';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  BookOpen,
  Target,
  ArrowRight,
  X
} from 'lucide-react';

interface ContentSection {
  id: string;
  title: string;
  type: 'article' | 'interactive' | 'assessment';
  content_url?: string;
  content?: any;
  duration_minutes: number;
  description: string;
  is_required: boolean;
  order_index: number;
}

interface LearningModule {
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

interface ModuleProgress {
  id: string;
  progress_percentage: number;
  status: string;
  time_spent_minutes: number;
  started_at: string | null;
  completed_at: string | null;
}

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

  if (!module) return null;

  // A module is truly "started" if user has meaningful progress, has been started, or has completed sections
  const progressPercentage = progress?.progress_percentage || 0;
  const hasCompletedSections = completedSections.size > 0;
  const hasMeaningfulProgress = progressPercentage >= 10; // Include 10% as started
  const hasStartedAt = progress?.started_at !== null;
  const isInProgress = progress?.status === 'in_progress';
  const isStarted = progress?.status === 'completed' || hasMeaningfulProgress || hasCompletedSections || hasStartedAt || isInProgress;
  const isCompleted = progress?.status === 'completed';
  
  // Normalize content_sections to handle both camelCase and snake_case data
  const normalizeContentSections = (sections: any): ContentSection[] => {
    if (!sections) return [];
    
    let parsedSections = sections;
    
    // If it's a JSON string, parse it first
    if (typeof sections === 'string') {
      try {
        parsedSections = JSON.parse(sections);
      } catch (error) {
        console.error('Failed to parse content_sections:', error);
        return [];
      }
    }
    
    // If it's not an array, return empty
    if (!Array.isArray(parsedSections)) return [];
    
    // Normalize each section to ensure consistent structure
    return parsedSections.map((section: any) => ({
      id: section.id || `section-${Date.now()}-${Math.random()}`,
      title: section.title || 'Untitled Section',
      type: section.type || 'article',
      content_url: section.content_url || section.contentUrl,
      content: section.content || {},
      duration_minutes: section.duration_minutes || section.durationMinutes || 5,
      description: section.description || '',
      is_required: section.is_required ?? section.isRequired ?? true,
      order_index: section.order_index ?? section.orderIndex ?? 0,
    })).sort((a, b) => a.order_index - b.order_index);
  };

  // Create fallback content sections if none exist
  const createFallbackContentSections = (module: LearningModule): ContentSection[] => {
    return [
      {
        id: 'module-overview',
        title: 'Module Overview',
        type: 'article',
        content: {
          text: module.description || 'Welcome to this learning module. This module will help you develop key skills and knowledge in your career development journey.',
          key_points: [
            'Understand the core concepts',
            'Apply practical strategies',
            'Develop new skills',
            'Track your progress'
          ],
          objectives: module.learning_objectives || ['Complete the module successfully'],
          reflection_questions: [
            'What do you hope to learn from this module?',
            'How will you apply these concepts in your career?'
          ]
        },
        duration_minutes: 5,
        description: 'Understanding the module goals',
        is_required: true,
        order_index: 1
      },
      {
        id: 'main-content',
        title: 'Main Content',
        type: 'article',
        content: {
          text: 'This section contains the main learning content for this module. Take your time to read through the material and understand the key concepts. Focus on the practical applications and how you can implement these strategies in your career development.',
          key_points: [
            'Understand the core concepts and principles',
            'Learn practical strategies and techniques',
            'Apply knowledge to real-world scenarios',
            'Develop skills through hands-on practice'
          ],
          instructions: 'Read through the content carefully and make notes of important concepts. Consider how you can apply these ideas in your current role or future career goals.',
          exercise_type: 'Learning Exercise'
        },
        duration_minutes: Math.max(module.duration_minutes - 10, 15),
        description: 'Core learning content',
        is_required: true,
        order_index: 2
      },
      {
        id: 'knowledge-check',
        title: 'Knowledge Check',
        type: 'assessment',
        content: {
          questions: [
            {
              question: 'What are the key concepts covered in this module?',
              type: 'multiple_choice',
              options: ['Basic concepts', 'Advanced strategies', 'Practical applications', 'All of the above'],
              correct_answer: 3
            },
            {
              question: 'How will you apply what you learned in your career?',
              type: 'text'
            }
          ]
        },
        duration_minutes: 5,
        description: 'Test your understanding',
        is_required: true,
        order_index: 3
      }
    ];
  };

  const parsedContentSections = normalizeContentSections(module.content_sections);
  const contentSections = parsedContentSections.length > 0 
    ? parsedContentSections 
    : createFallbackContentSections(module);
  const currentSectionData = contentSections[currentSection];

  // Debug logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('ModuleContentModal Debug:', {
      moduleId: module.id,
      moduleTitle: module.title,
      progressPercentage,
      hasCompletedSections,
      hasMeaningfulProgress,
      hasStartedAt,
      isInProgress,
      isStarted,
      progressStatus: progress?.status,
      hasContentSections: !!module.content_sections,
      contentSectionsLength: parsedContentSections.length,
      finalContentSectionsLength: contentSections.length,
      currentSection,
      currentSectionData: currentSectionData?.title
    });
  }

  const getContentIcon = (contentType: string) => {
    if (!contentType) return <FileText className="h-5 w-5" />;
    
    switch (contentType.toLowerCase()) {
      case 'interactive':
        return <Target className="h-5 w-5" />;
      case 'assessment':
        return <CheckCircle2 className="h-5 w-5" />;
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

  const handleStart = () => {
    onStartModule(module.id, enrollmentId);
    
    // Auto-select first section and scroll to content after starting
    setCurrentSection(0);
    
    // Scroll to module content section after a brief delay
    setTimeout(() => {
      const contentArea = document.querySelector('[data-content-area]');
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  };

  const handleComplete = () => {
    onCompleteModule(module.id, enrollmentId);
  };

  const handleSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
    
    // Check if all required sections are completed
    const requiredSections = contentSections.filter(s => s.is_required);
    const completedRequiredSections = requiredSections.filter(s => 
      completedSections.has(s.id) || s.id === sectionId
    );
    
    if (completedRequiredSections.length === requiredSections.length) {
      // Auto-complete the module if all required sections are done
      setTimeout(() => handleComplete(), 1000);
    }
  };

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
            {isStarted && (
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
                {isStarted && !isCompleted && (
                  <Badge variant="outline" className="text-xs">
                    Click sections to explore content
                  </Badge>
                )}
              </div>
              
              <div className="grid lg:grid-cols-[20rem,1fr] gap-6 min-h-0">
                {/* Progress Tracker Sidebar */}
                <div className="lg:sticky lg:top-2 lg:h-fit">
                  <SectionProgressTracker
                    sections={contentSections}
                    completedSections={completedSections}
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
                </div>

                {/* Current Section Content */}
                <div className="min-w-0" data-content-area>
                  {isStarted ? (
                    currentSectionData && (
                      <ContentRenderer
                        section={currentSectionData}
                        isActive={true}
                        isCompleted={completedSections.has(currentSectionData.id)}
                        onComplete={handleSectionComplete}
                        progress={currentSection === 0 ? progressPercentage : 0}
                      />
                    )
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="p-8 text-center">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h4 className="font-medium mb-2">Ready to Learn?</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Start this module to unlock the learning content and begin your journey.
                        </p>
                        <Button onClick={handleStart} disabled={isUpdating}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Learning
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex gap-3 pt-4 border-t mt-6">
          {!isStarted ? (
            <Button 
              onClick={handleStart} 
              disabled={isUpdating}
              className="flex-1"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Start Module
            </Button>
          ) : !isCompleted ? (
            <Button 
              onClick={handleComplete} 
              disabled={isUpdating}
              className="flex-1"
              variant="outline"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
          ) : (
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};