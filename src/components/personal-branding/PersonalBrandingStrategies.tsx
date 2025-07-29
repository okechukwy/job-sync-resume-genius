import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, Target, CheckCircle2, Clock, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

interface BrandingStrategy {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  recommended_actions: Array<{
    action: string;
    timeline: string;
    difficulty: string;
    success_metrics?: string[];
  }>;
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
}

interface PersonalBrandingStrategiesProps {
  strategies: BrandingStrategy[];
  isLoading: boolean;
  onStartStrategy: (strategyId: string) => void;
  onDismissStrategy: (strategyId: string) => void;
}

export const PersonalBrandingStrategies = ({ 
  strategies, 
  isLoading, 
  onStartStrategy, 
  onDismissStrategy 
}: PersonalBrandingStrategiesProps) => {
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

  const handleStartStrategy = (strategyId: string, strategyTitle: string) => {
    onStartStrategy(strategyId);
    toast.success(`Started strategy: ${strategyTitle}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Personal Branding Strategies</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-card animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-16 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!strategies || strategies.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Personal Branding Strategies</h3>
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            Complete your brand builder form and submit it to generate personalized branding strategies based on your unique profile and career goals.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Personal Branding Strategies</h3>
        <Badge variant="outline">{strategies.length} Strategies Generated</Badge>
      </div>
      
      <div className="space-y-6">
        {strategies.map((strategy) => (
          <Card key={strategy.id} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{strategy.title}</CardTitle>
                    <Badge variant={getPriorityColor(strategy.priority)}>
                      {strategy.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{strategy.description}</p>
                  {strategy.reasoning && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">
                        <strong>Why this strategy:</strong> {strategy.reasoning}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right ml-4">
                  <div className="flex items-center gap-1 mb-1">
                    {getDifficultyIcon(strategy.metadata?.difficulty)}
                    <span className="text-xs text-muted-foreground">
                      {strategy.metadata?.difficulty || 'Medium'}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {strategy.metadata?.timeline || '3-6 months'}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {Math.round(strategy.confidence_score * 100)}% confidence
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Recommended Actions */}
              <div>
                <span className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4" />
                  Action Plan
                </span>
                <div className="space-y-2">
                  {strategy.recommended_actions?.map((action, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{action.action}</p>
                        <div className="flex items-center gap-2">
                          {getDifficultyIcon(action.difficulty)}
                          <Badge variant="outline" className="text-xs">
                            {action.timeline}
                          </Badge>
                        </div>
                      </div>
                      {action.success_metrics && action.success_metrics.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs text-muted-foreground">
                            Success metrics: {action.success_metrics.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Strategy Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strategy.metadata?.networking_opportunities && (
                  <div>
                    <span className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      Networking
                    </span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {strategy.metadata.networking_opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {strategy.metadata?.content_ideas && (
                  <div>
                    <span className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4" />
                      Content Ideas
                    </span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {strategy.metadata.content_ideas.map((idea, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {strategy.metadata?.platforms && (
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

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1" 
                  onClick={() => handleStartStrategy(strategy.id, strategy.title)}
                >
                  Start This Strategy
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
        ))}
      </div>
    </div>
  );
};