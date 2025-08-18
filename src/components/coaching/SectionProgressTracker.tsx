import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  PlayCircle,
  Target
} from 'lucide-react';

interface ContentSection {
  id: string;
  title: string;
  type: 'video' | 'article' | 'interactive' | 'assessment';
  duration_minutes: number;
  is_required: boolean;
  order_index: number;
}

interface SectionProgressTrackerProps {
  sections: ContentSection[];
  completedSections: Set<string>;
  currentSection: number;
  onSectionSelect: (index: number) => void;
}

export const SectionProgressTracker = ({
  sections,
  completedSections,
  currentSection,
  onSectionSelect
}: SectionProgressTrackerProps) => {
  const totalSections = sections.length;
  const completedCount = sections.filter(s => completedSections.has(s.id)).length;
  const progressPercentage = totalSections > 0 ? (completedCount / totalSections) * 100 : 0;

  const getStatusIcon = (section: ContentSection, index: number) => {
    if (completedSections.has(section.id)) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    if (index === currentSection) {
      return <PlayCircle className="h-4 w-4 text-primary" />;
    }
    return <Target className="h-4 w-4 text-muted-foreground" />;
  };

  const getStatusColor = (section: ContentSection, index: number) => {
    if (completedSections.has(section.id)) {
      return 'border-green-500 bg-green-50 dark:bg-green-950/20';
    }
    if (index === currentSection) {
      return 'border-primary bg-primary/5';
    }
    return 'border-border hover:border-muted-foreground/50';
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Overall Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Learning Progress</h4>
              <span className="text-sm text-muted-foreground">
                {completedCount}/{totalSections} sections
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Section List */}
          <div className="space-y-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => onSectionSelect(index)}
                className={`w-full p-3 rounded-lg border transition-all text-left ${getStatusColor(section, index)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(section, index)}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{section.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className="text-xs h-5"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {section.duration_minutes}m
                        </Badge>
                        <Badge 
                          variant={section.type === 'video' ? 'default' : 'secondary'} 
                          className="text-xs h-5"
                        >
                          {section.type}
                        </Badge>
                        {section.is_required && (
                          <Badge variant="destructive" className="text-xs h-5">
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {index === currentSection && (
                    <div className="text-primary text-sm font-medium">
                      Current
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Completion Status */}
          {progressPercentage === 100 && (
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium text-sm">
                  All sections completed! 🎉
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};