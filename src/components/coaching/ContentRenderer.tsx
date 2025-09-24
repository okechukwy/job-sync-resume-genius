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
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface ContentSection {
  id: string;
  title: string;
  type: 'article' | 'interactive' | 'assessment';
  content_url?: string;
  content?: {
    text?: string;
    key_points?: string[];
    objectives?: string[];
    questions?: Array<{
      question: string;
      type: 'multiple_choice' | 'text';
      options?: string[];
      correct_answer?: number;
    }>;
    reflection_questions?: string[];
    exercise_type?: string;
    instructions?: string;
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
      default:
        return 'bg-muted-foreground';
    }
  };


  const renderArticleContent = () => (
    <div className="space-y-4">
      {section.content?.text && (
        <div className="prose prose-sm max-w-none">
          <p>{section.content.text}</p>
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

      {section.content_url && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(section.content_url, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View External Resource
        </Button>
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
          {section.content_url ? (
            <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">Ready to Practice</h5>
                  <p className="text-sm text-muted-foreground">Interactive exercise available</p>
                </div>
                <Button 
                  onClick={() => window.open(section.content_url, '_blank')}
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Launch
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