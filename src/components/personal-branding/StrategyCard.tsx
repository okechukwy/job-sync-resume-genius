import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Target, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp,
  Star,
  Calendar,
  Award
} from "lucide-react";
import { toast } from "sonner";

interface ActionItem {
  action: string;
  description?: string;
  timeline: string;
  difficulty: string;
  priority?: string;
  success_metrics?: string[];
  completed?: boolean;
}

interface StrategyCardProps {
  strategy: {
    id: string;
    title: string;
    description: string;
    reasoning: string;
    recommended_actions: ActionItem[];
    priority: 'high' | 'medium' | 'low';
    confidence_score: number;
    metadata: {
      timeline?: string;
      difficulty?: string;
      industry_specific?: boolean;
      networking_opportunities?: string[];
      content_ideas?: string[];
      platforms?: string[];
    };
  };
  onStartStrategy: (strategyId: string) => void;
  onDismissStrategy: (strategyId: string) => void;
  onActionComplete?: (strategyId: string, actionIndex: number, completed: boolean) => void;
}

export const StrategyCard = ({ 
  strategy, 
  onStartStrategy, 
  onDismissStrategy,
  onActionComplete 
}: StrategyCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [completedActions, setCompletedActions] = useState<Set<number>>(new Set());

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'hard': return <TrendingUp className="h-4 w-4 text-red-500" />;
      default: return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <TrendingUp className="h-3 w-3" />;
      case 'medium': return <Clock className="h-3 w-3" />;
      case 'low': return <CheckCircle2 className="h-3 w-3" />;
      default: return <Target className="h-3 w-3" />;
    }
  };

  const handleActionToggle = (actionIndex: number, completed: boolean) => {
    const newCompleted = new Set(completedActions);
    if (completed) {
      newCompleted.add(actionIndex);
      toast.success("Action completed! 🎉");
    } else {
      newCompleted.delete(actionIndex);
    }
    setCompletedActions(newCompleted);
    onActionComplete?.(strategy.id, actionIndex, completed);
  };

  const completionRate = strategy.recommended_actions.length > 0 
    ? (completedActions.size / strategy.recommended_actions.length) * 100 
    : 0;

  return (
    <Card className="glass-card border-l-4 border-l-primary/30 hover:border-l-primary transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                {getPriorityIcon(strategy.priority)}
                <CardTitle className="text-lg">{strategy.title}</CardTitle>
              </div>
              <Badge variant={getPriorityColor(strategy.priority)} className="text-xs">
                {strategy.priority}
              </Badge>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Star className="h-3 w-3" />
                {Math.round(strategy.confidence_score * 100)}%
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{strategy.description}</p>
            
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">Progress</span>
                <span className="text-xs text-muted-foreground">
                  {completedActions.size}/{strategy.recommended_actions.length} actions
                </span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
          </div>
          
          <div className="text-right ml-4 space-y-2">
            <div className="flex items-center gap-2">
              {getDifficultyIcon(strategy.metadata?.difficulty)}
              <span className="text-xs text-muted-foreground capitalize">
                {strategy.metadata?.difficulty || 'Medium'}
              </span>
            </div>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {strategy.metadata?.timeline || '2-4 weeks'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Why this strategy */}
        {strategy.reasoning && (
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-3 rounded-lg border border-primary/20">
            <p className="text-sm">
              <span className="font-medium text-primary">Why this strategy: </span>
              {strategy.reasoning}
            </p>
          </div>
        )}

        {/* Action checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Action Plan ({strategy.recommended_actions.length} steps)
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-xs"
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {expanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
          
          <div className="space-y-3">
            {strategy.recommended_actions.slice(0, expanded ? undefined : 2).map((action, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
                  completedActions.has(index) 
                    ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' 
                    : 'bg-muted/30 border-border hover:bg-muted/50'
                }`}
              >
                <Checkbox
                  checked={completedActions.has(index)}
                  onCheckedChange={(checked) => handleActionToggle(index, checked as boolean)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-medium ${completedActions.has(index) ? 'line-through text-muted-foreground' : ''}`}>
                      {action.action}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {getDifficultyIcon(action.difficulty)}
                      <Badge variant="outline" className="text-xs">
                        {action.timeline}
                      </Badge>
                    </div>
                  </div>
                  {action.description && (
                    <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                  )}
                  {action.success_metrics && action.success_metrics.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Success metrics:</span> {action.success_metrics.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {!expanded && strategy.recommended_actions.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(true)}
                className="w-full text-xs text-muted-foreground"
              >
                Show {strategy.recommended_actions.length - 2} more actions...
              </Button>
            )}
          </div>
        </div>

        {/* Additional details (only when expanded) */}
        {expanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
            {strategy.metadata?.networking_opportunities && strategy.metadata.networking_opportunities.length > 0 && (
              <div>
                <span className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  Networking Opportunities
                </span>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {strategy.metadata.networking_opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary text-xs mt-1">•</span>
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {strategy.metadata?.content_ideas && strategy.metadata.content_ideas.length > 0 && (
              <div>
                <span className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Content Ideas
                </span>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {strategy.metadata.content_ideas.map((idea, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary text-xs mt-1">•</span>
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Platforms */}
        {strategy.metadata?.platforms && strategy.metadata.platforms.length > 0 && (
          <div>
            <span className="text-sm font-medium mb-2 block">Recommended Platforms:</span>
            <div className="flex flex-wrap gap-2">
              {strategy.metadata.platforms.map((platform, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={() => {
              onStartStrategy(strategy.id);
              toast.success(`Started strategy: ${strategy.title}`);
            }}
            disabled={completionRate === 100}
          >
            {completionRate === 100 ? (
              <>
                <Award className="h-4 w-4 mr-2" />
                Completed!
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Start Strategy
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDismissStrategy(strategy.id)}
          >
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};