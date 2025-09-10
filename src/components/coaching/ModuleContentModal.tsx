import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContentRenderer } from './ContentRenderer';
import { SectionProgressTracker } from './SectionProgressTracker';
import { 
  PlayCircle, 
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
  type: 'video' | 'article' | 'interactive' | 'assessment';
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

  const isStarted = progress?.status === 'in_progress' || progress?.status === 'completed';
  const isCompleted = progress?.status === 'completed';
  const progressPercentage = progress?.progress_percentage || 0;
  
  const contentSections = module.content_sections || [];
  const currentSectionData = contentSections[currentSection];

  const getContentIcon = (contentType: string) => {
    if (!contentType) return <FileText className="h-5 w-5" />;
    
    switch (contentType.toLowerCase()) {
      case 'video':
        return <PlayCircle className="h-5 w-5" />;
      case 'interactive':
        return <Target className="h-5 w-5" />;
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
              <h3 className="text-lg font-semibold mb-4">Module Content</h3>
              
              {contentSections.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-6 min-h-0">
                  {/* Progress Tracker Sidebar */}
                  <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="sticky top-0">
                      <SectionProgressTracker
                        sections={contentSections}
                        completedSections={completedSections}
                        currentSection={currentSection}
                        onSectionSelect={setCurrentSection}
                      />
                    </div>
                  </div>

                  {/* Current Section Content */}
                  <div className="flex-1 min-w-0">
                    {currentSectionData && (
                      <ContentRenderer
                        section={currentSectionData}
                        isActive={true}
                        isCompleted={completedSections.has(currentSectionData.id)}
                        onComplete={handleSectionComplete}
                        progress={currentSection === 0 ? progressPercentage : 0}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3" />
                  <p>No content sections available yet.</p>
                  <p className="text-sm">Content will be added soon.</p>
                </div>
              )}
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
              <PlayCircle className="h-4 w-4 mr-2" />
              Start Module
            </Button>
          ) : !isCompleted ? (
            <Button 
              onClick={handleComplete} 
              disabled={isUpdating}
              className="flex-1"
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