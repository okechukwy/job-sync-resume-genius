
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Clock, Zap, Bot, User } from "lucide-react";
import { Improvement } from "../types/analysisTypes";
import { ImprovementValidationResult, getImprovementStatus } from "../services/improvementValidation";

interface ActionableImprovementsProps {
  improvements: Improvement[];
  manuallyCompletedItems: number[];
  improvementValidation: ImprovementValidationResult | null;
  onToggleComplete: (index: number) => void;
}

const ActionableImprovements = ({ 
  improvements, 
  manuallyCompletedItems, 
  improvementValidation,
  onToggleComplete 
}: ActionableImprovementsProps) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-destructive" />,
          badge: 'destructive' as const,
          bg: 'bg-destructive/5 border-destructive/20',
          label: 'High Impact'
        };
      case 'medium':
        return {
          icon: <Clock className="w-4 h-4 text-warning" />,
          badge: 'secondary' as const,
          bg: 'bg-warning/5 border-warning/20',
          label: 'Medium Impact'
        };
      default:
        return {
          icon: <Zap className="w-4 h-4 text-primary" />,
          badge: 'outline' as const,
          bg: 'bg-primary/5 border-primary/20',
          label: 'Enhancement'
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'ai-applied':
        return {
          icon: <Bot className="w-4 h-4 text-blue-600" />,
          badge: 'secondary' as const,
          label: 'AI Applied',
          bg: 'bg-blue-50 border-blue-200'
        };
      case 'manually-completed':
        return {
          icon: <User className="w-4 h-4 text-green-600" />,
          badge: 'secondary' as const,
          label: 'Manually Done',
          bg: 'bg-green-50 border-green-200'
        };
      case 'partially-applied':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-orange-600" />,
          badge: 'secondary' as const,
          label: 'Partially Applied',
          bg: 'bg-orange-50 border-orange-200'
        };
      default:
        return null;
    }
  };

  const sortedImprovements = [...improvements].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority as keyof typeof priorityOrder] - 
           priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  const highPriorityCount = improvements.filter(i => i.priority === 'high').length;
  const totalCompleted = manuallyCompletedItems.length + 
    (improvementValidation?.addressed.length || 0) + 
    (improvementValidation?.partiallyAddressed.length || 0);

  const aiAddressedCount = improvementValidation?.addressed.length || 0;
  const partiallyAddressedCount = improvementValidation?.partiallyAddressed.length || 0;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Action Plan & Improvements
        </CardTitle>
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Progress:</span>
            <span className="font-medium">{totalCompleted}/{improvements.length}</span>
          </div>
          {aiAddressedCount > 0 && (
            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              <Bot className="w-3 h-3 mr-1" />
              {aiAddressedCount} AI Applied
            </Badge>
          )}
          {partiallyAddressedCount > 0 && (
            <Badge variant="secondary" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
              {partiallyAddressedCount} Partially Applied
            </Badge>
          )}
          {highPriorityCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {highPriorityCount} High Priority
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedImprovements.map((improvement, index) => {
            const priorityConfig = getPriorityConfig(improvement.priority);
            const status = improvementValidation ? 
              getImprovementStatus(index, improvementValidation, manuallyCompletedItems) : 
              (manuallyCompletedItems.includes(index) ? 'manually-completed' : 'not-addressed');
            const statusConfig = getStatusConfig(status);
            const isCompleted = status !== 'not-addressed';
            
            return (
              <div 
                key={index} 
                className={`relative p-4 rounded-lg border transition-all ${
                  statusConfig ? statusConfig.bg : priorityConfig.bg
                } ${isCompleted ? 'opacity-90' : 'hover:shadow-sm'}`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {statusConfig ? statusConfig.icon : priorityConfig.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {improvement.issue}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={statusConfig ? statusConfig.badge : priorityConfig.badge} 
                            className="text-xs"
                          >
                            {statusConfig ? statusConfig.label : priorityConfig.label}
                          </Badge>
                          {status === 'ai-applied' && (
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                              ✨ Automatically improved by AI
                            </span>
                          )}
                          {status === 'partially-applied' && (
                            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                              ⚡ Partially addressed by AI
                            </span>
                          )}
                        </div>
                      </div>
                      {status === 'not-addressed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onToggleComplete(index)}
                          className="flex-shrink-0"
                        >
                          Mark Done
                        </Button>
                      )}
                      {status === 'manually-completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onToggleComplete(index)}
                          className="flex-shrink-0"
                        >
                          Undo
                        </Button>
                      )}
                    </div>
                    
                    <div className={`text-sm leading-relaxed ${
                      isCompleted ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {improvement.suggestion}
                    </div>

                    {!isCompleted && improvement.priority === 'high' && (
                      <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Addressing this can significantly improve your resume's effectiveness</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-blue-900">Optimization Progress</h4>
            <span className="text-sm text-blue-700">
              {Math.round((totalCompleted / improvements.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(totalCompleted / improvements.length) * 100}%` }}
            />
          </div>
          {totalCompleted === improvements.length && (
            <div className="mt-3 text-sm text-blue-800 font-medium">
              🎉 Excellent! You've addressed all optimization recommendations.
            </div>
          )}
          {aiAddressedCount > 0 && (
            <div className="mt-2 text-xs text-blue-700">
              <Bot className="w-3 h-3 inline mr-1" />
              AI automatically handled {aiAddressedCount} improvement{aiAddressedCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionableImprovements;
