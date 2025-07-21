
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react";
import { Improvement } from "../types/analysisTypes";
import { useState } from "react";

interface ActionableImprovementsProps {
  improvements: Improvement[];
}

const ActionableImprovements = ({ improvements }: ActionableImprovementsProps) => {
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  const toggleCompleted = (index: number) => {
    setCompletedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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

  const sortedImprovements = [...improvements].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority as keyof typeof priorityOrder] - 
           priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  const highPriorityCount = improvements.filter(i => i.priority === 'high').length;
  const completedCount = completedItems.length;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Action Plan & Improvements
        </CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Progress:</span>
            <span className="font-medium">{completedCount}/{improvements.length}</span>
          </div>
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
            const config = getPriorityConfig(improvement.priority);
            const isCompleted = completedItems.includes(index);
            
            return (
              <div 
                key={index} 
                className={`relative p-4 rounded-lg border transition-all ${
                  isCompleted ? 'opacity-60 bg-success/5 border-success/20' : config.bg
                } ${isCompleted ? '' : 'hover:shadow-sm'}`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      config.icon
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className={`font-semibold ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {improvement.issue}
                        </h4>
                        <Badge 
                          variant={isCompleted ? 'outline' : config.badge} 
                          className="text-xs mt-1"
                        >
                          {isCompleted ? 'Completed' : config.label}
                        </Badge>
                      </div>
                      <Button
                        variant={isCompleted ? "outline" : "ghost"}
                        size="sm"
                        onClick={() => toggleCompleted(index)}
                        className="flex-shrink-0"
                      >
                        {isCompleted ? 'Undo' : 'Mark Done'}
                      </Button>
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
              {Math.round((completedCount / improvements.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / improvements.length) * 100}%` }}
            />
          </div>
          {completedCount === improvements.length && (
            <div className="mt-3 text-sm text-blue-800 font-medium">
              🎉 Great job! You've addressed all optimization recommendations.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionableImprovements;
