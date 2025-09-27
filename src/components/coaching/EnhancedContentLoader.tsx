import React, { useMemo } from 'react';
import { leadershipFoundationsModule } from '@/data/professionalContent/leadershipModule';

interface ContentLoaderProps {
  moduleId: string;
  children: (enhancedContent: any) => React.ReactNode;
}

export const EnhancedContentLoader = ({ moduleId, children }: ContentLoaderProps) => {
  const enhancedContent = useMemo(() => {
    // Map of enhanced content modules
    const enhancedModules: Record<string, any> = {
      'leadership-foundations-enhanced': leadershipFoundationsModule,
      // Add more enhanced modules here as they're created
    };

    return enhancedModules[moduleId] || null;
  }, [moduleId]);

  return children(enhancedContent);
};

// Hook to get enhanced content for a module
export const useEnhancedContent = (moduleId: string) => {
  return useMemo(() => {
    const enhancedModules: Record<string, any> = {
      'leadership-foundations-enhanced': leadershipFoundationsModule,
    };

    return enhancedModules[moduleId] || null;
  }, [moduleId]);
};