import { useState, useCallback } from 'react';

export interface EngagementState {
  textContentViewed: boolean;
  caseStudiesViewed: number;
  totalCaseStudies: number;
  frameworksInteracted: number;
  totalFrameworks: number;
  interactiveElementsCompleted: number;
  totalInteractiveElements: number;
  externalResourceOpened: boolean;
  readingProgress: number; // 0-100
  lastActivity: Date | null;
}

export interface ContentEngagementActions {
  markTextViewed: () => void;
  markCaseStudyViewed: (caseStudyId: string) => void;
  markFrameworkInteracted: (frameworkId: string) => void;
  markInteractiveCompleted: (elementId: string) => void;
  markExternalResourceOpened: () => void;
  updateReadingProgress: (progress: number) => void;
  getEngagementLevel: () => 'minimal' | 'partial' | 'substantial' | 'complete';
  getNextAction: () => string;
  canComplete: () => boolean;
}

export const useContentEngagement = (sectionId: string, sectionContent: any): [EngagementState, ContentEngagementActions] => {
  const [viewedCaseStudies, setViewedCaseStudies] = useState<Set<string>>(new Set());
  const [interactedFrameworks, setInteractedFrameworks] = useState<Set<string>>(new Set());
  const [completedInteractives, setCompletedInteractives] = useState<Set<string>>(new Set());
  const [textContentViewed, setTextContentViewed] = useState(false);
  const [externalResourceOpened, setExternalResourceOpened] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [lastActivity, setLastActivity] = useState<Date | null>(null);

  // Count total content elements
  const totalCaseStudies = sectionContent?.case_studies?.length || 0;
  const totalFrameworks = sectionContent?.frameworks?.length || 0;
  const totalInteractiveElements = sectionContent?.interactive_elements?.length || 0;

  const engagementState: EngagementState = {
    textContentViewed,
    caseStudiesViewed: viewedCaseStudies.size,
    totalCaseStudies,
    frameworksInteracted: interactedFrameworks.size,
    totalFrameworks,
    interactiveElementsCompleted: completedInteractives.size,
    totalInteractiveElements,
    externalResourceOpened,
    readingProgress,
    lastActivity
  };

  const updateActivity = useCallback(() => {
    setLastActivity(new Date());
  }, []);

  const markTextViewed = useCallback(() => {
    setTextContentViewed(true);
    updateActivity();
  }, [updateActivity]);

  const markCaseStudyViewed = useCallback((caseStudyId: string) => {
    setViewedCaseStudies(prev => new Set([...prev, caseStudyId]));
    updateActivity();
  }, [updateActivity]);

  const markFrameworkInteracted = useCallback((frameworkId: string) => {
    setInteractedFrameworks(prev => new Set([...prev, frameworkId]));
    updateActivity();
  }, [updateActivity]);

  const markInteractiveCompleted = useCallback((elementId: string) => {
    setCompletedInteractives(prev => new Set([...prev, elementId]));
    updateActivity();
  }, [updateActivity]);

  const markExternalResourceOpened = useCallback(() => {
    setExternalResourceOpened(true);
    updateActivity();
  }, [updateActivity]);

  const updateReadingProgress = useCallback((progress: number) => {
    setReadingProgress(Math.max(readingProgress, progress));
    updateActivity();
  }, [readingProgress, updateActivity]);

  const getEngagementLevel = useCallback((): 'minimal' | 'partial' | 'substantial' | 'complete' => {
    const hasMinimalText = textContentViewed || readingProgress > 20;
    const hasCaseStudyProgress = totalCaseStudies === 0 || viewedCaseStudies.size > 0;
    const hasFrameworkProgress = totalFrameworks === 0 || interactedFrameworks.size > 0;
    const hasInteractiveProgress = totalInteractiveElements === 0 || completedInteractives.size > 0;
    
    // Calculate completion rate for existing elements
    const caseStudyCompletionRate = totalCaseStudies === 0 ? 1 : viewedCaseStudies.size / totalCaseStudies;
    const frameworkCompletionRate = totalFrameworks === 0 ? 1 : interactedFrameworks.size / totalFrameworks;
    const interactiveCompletionRate = totalInteractiveElements === 0 ? 1 : completedInteractives.size / totalInteractiveElements;
    
    if (!hasMinimalText) return 'minimal';
    
    // More lenient partial progress - just need text viewing + any interaction
    if (hasMinimalText && (hasCaseStudyProgress || hasFrameworkProgress || hasInteractiveProgress)) return 'partial';
    
    // Substantial - 50% reading + some progress on interactive elements  
    if (readingProgress > 50 && (caseStudyCompletionRate > 0.5 || frameworkCompletionRate > 0.5 || interactiveCompletionRate > 0.5)) return 'substantial';
    
    // Complete - 80% reading + most interactive elements done
    if (readingProgress > 80 && caseStudyCompletionRate >= 0.8 && frameworkCompletionRate >= 0.8 && interactiveCompletionRate >= 0.8) return 'complete';
    
    return 'partial';
  }, [textContentViewed, readingProgress, viewedCaseStudies.size, totalCaseStudies, 
      interactedFrameworks.size, totalFrameworks, completedInteractives.size, totalInteractiveElements]);

  const getNextAction = useCallback((): string => {
    const level = getEngagementLevel();
    
    if (level === 'minimal') {
      return 'Start Reading';
    }
    
    if (totalCaseStudies > 0 && viewedCaseStudies.size < totalCaseStudies) {
      return `Explore Case Studies (${viewedCaseStudies.size}/${totalCaseStudies})`;
    }
    
    if (totalFrameworks > 0 && interactedFrameworks.size < totalFrameworks) {
      return `Practice Frameworks (${interactedFrameworks.size}/${totalFrameworks})`;
    }
    
    if (totalInteractiveElements > 0 && completedInteractives.size < totalInteractiveElements) {
      return `Complete Exercises (${completedInteractives.size}/${totalInteractiveElements})`;
    }
    
    if (level === 'substantial') {
      return 'Review & Complete';
    }
    
    return 'Continue Learning';
  }, [getEngagementLevel, totalCaseStudies, viewedCaseStudies.size, totalFrameworks, 
      interactedFrameworks.size, totalInteractiveElements, completedInteractives.size]);

  const canComplete = useCallback((): boolean => {
    const level = getEngagementLevel();
    // More lenient completion - allow completion at partial level if substantial engagement
    return level === 'substantial' || level === 'complete' || 
           (level === 'partial' && readingProgress > 50 && textContentViewed);
  }, [getEngagementLevel, readingProgress, textContentViewed]);

  const actions: ContentEngagementActions = {
    markTextViewed,
    markCaseStudyViewed,
    markFrameworkInteracted,
    markInteractiveCompleted,
    markExternalResourceOpened,
    updateReadingProgress,
    getEngagementLevel,
    getNextAction,
    canComplete
  };

  return [engagementState, actions];
};