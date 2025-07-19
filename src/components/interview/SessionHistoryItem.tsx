
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  MessageSquare, 
  Brain,
  Target,
  Zap,
  ChevronDown,
  ChevronRight,
  Trash2
} from "lucide-react";

interface SessionHistoryItemProps {
  session: any;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onDelete?: () => void;
  compact?: boolean;
}

export const SessionHistoryItem: React.FC<SessionHistoryItemProps> = ({
  session,
  isExpanded,
  onToggleExpand,
  onDelete,
  compact = false
}) => {
  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'behavioral': return MessageSquare;
      case 'technical': return Brain;
      case 'situational': return Target;
      case 'mock': return Zap;
      default: return MessageSquare;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const SessionIcon = getSessionIcon(session.session_type);

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3">
          <SessionIcon className="w-4 h-4 text-muted-foreground" />
          <div>
            <span className="font-medium">
              {session.session_type?.charAt(0).toUpperCase() + session.session_type?.slice(1)} Interview
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              {session.role_focus}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {formatDate(session.created_at)}
          </div>
          <div className={`font-semibold ${getScoreColor(session.scores?.overall || 0)}`}>
            {session.scores?.overall || 0}%
          </div>
          <Badge variant={session.completed ? "default" : "secondary"}>
            {session.completed ? "Completed" : "In Progress"}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <Card className="border transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <SessionIcon className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold">
                  {session.session_type?.charAt(0).toUpperCase() + session.session_type?.slice(1) || 'Unknown'} Interview
                </h4>
                <Badge variant={session.completed ? "default" : "secondary"}>
                  {session.completed ? "Completed" : "In Progress"}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {session.role_focus || 'General'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {session.responses?.length || 0} questions answered
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(session.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`text-xl font-bold ${getScoreColor(session.scores?.overall || 0)}`}>
                {session.scores?.overall || 0}%
              </div>
              <div className="text-xs text-muted-foreground">Overall Score</div>
            </div>
            
            <div className="flex items-center gap-1">
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExpand}
                className="text-muted-foreground"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isExpanded && session.completed && session.scores && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold">{session.scores.communication || 0}%</div>
                <div className="text-xs text-muted-foreground">Communication</div>
                <Progress value={session.scores.communication || 0} className="h-1 mt-1" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{session.scores.content || 0}%</div>
                <div className="text-xs text-muted-foreground">Content</div>
                <Progress value={session.scores.content || 0} className="h-1 mt-1" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{session.scores.structure || 0}%</div>
                <div className="text-xs text-muted-foreground">Structure</div>
                <Progress value={session.scores.structure || 0} className="h-1 mt-1" />
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{session.scores.impact || 0}%</div>
                <div className="text-xs text-muted-foreground">Impact</div>
                <Progress value={session.scores.impact || 0} className="h-1 mt-1" />
              </div>
            </div>

            {session.feedback?.summary && (
              <div className="bg-muted/30 p-3 rounded-lg">
                <h5 className="font-medium mb-1">Session Summary</h5>
                <p className="text-sm text-muted-foreground">{session.feedback.summary}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
