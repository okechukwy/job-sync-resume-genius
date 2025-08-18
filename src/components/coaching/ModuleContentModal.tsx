import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

interface LearningModule {
  id: string;
  title: string;
  description: string;
  content_type: string;
  estimated_duration_minutes: number;
  learning_objectives: string[];
  prerequisites: string[];
  difficulty_level: string;
  order_index: number;
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

  if (!module) return null;

  const isStarted = progress?.status === 'in_progress' || progress?.status === 'completed';
  const isCompleted = progress?.status === 'completed';
  const progressPercentage = progress?.progress_percentage || 0;

  const getContentIcon = (contentType: string) => {
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

  const sections = [
    { title: 'Overview', content: 'Module Introduction' },
    { title: 'Learning Content', content: 'Main Content' },
    { title: 'Practice', content: 'Exercises' },
    { title: 'Assessment', content: 'Knowledge Check' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="flex items-center gap-3 text-xl">
                {getContentIcon(module.content_type)}
                {module.title}
              </DialogTitle>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {module.estimated_duration_minutes} min
                </Badge>
                <Badge variant="outline">
                  <div className={`w-2 h-2 rounded-full ${getDifficultyColor(module.difficulty_level)} mr-1`} />
                  {module.difficulty_level}
                </Badge>
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

        <div className="space-y-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all border-2 ${
                    currentSection === index ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setCurrentSection(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentSection === index ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{section.title}</h4>
                          <p className="text-xs text-muted-foreground">{section.content}</p>
                        </div>
                      </div>
                      {currentSection === index && (
                        <ArrowRight className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};