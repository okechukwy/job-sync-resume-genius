import React from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-success';
  if (score >= 60) return 'text-warning';
  return 'text-destructive';
};

export const getScoreBg = (score: number): string => {
  if (score >= 80) return 'bg-success/10';
  if (score >= 60) return 'bg-warning/10';
  return 'bg-destructive/10';
};

export const getPriorityIcon = (priority: string): React.ReactElement | null => {
  switch (priority) {
    case 'high': return <XCircle className="w-4 h-4 text-destructive" />;
    case 'medium': return <AlertTriangle className="w-4 h-4 text-warning" />;
    case 'low': return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
    default: return null;
  }
};