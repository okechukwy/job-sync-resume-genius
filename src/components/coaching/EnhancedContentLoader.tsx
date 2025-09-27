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

export const useEnhancedContent = (moduleId: string) => {
  return useMemo(() => {
    const enhancedModules: Record<string, any> = {
      '783fcafa-1d71-4eae-94ff-cd1e948bbf07': leadershipFoundationsModule, // Original Foundations of Leadership
      '24f320e8-308a-4e08-b483-0e17f9bba7fc': leadershipFoundationsModule, // Current Foundations of Leadership
      'leadership-foundations-enhanced': leadershipFoundationsModule,
    };

    console.log('🔍 Enhanced content lookup for moduleId:', moduleId);
    console.log('🔍 Available enhanced modules:', Object.keys(enhancedModules));
    
    const content = enhancedModules[moduleId] || null;
    console.log('🔍 Enhanced content found:', !!content);
    
    return content;
  }, [moduleId]);
};