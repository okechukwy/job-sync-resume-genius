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
      // Original and current Leadership Excellence Program modules
      '783fcafa-1d71-4eae-94ff-cd1e948bbf07': leadershipFoundationsModule, // Original Foundations of Leadership
      '24f320e8-308a-4e08-b483-0e17f9bba7fc': leadershipFoundationsModule, // Foundations of Leadership
      'b8e3f9d2-4c1a-4b7e-9e8f-1234567890ab': leadershipFoundationsModule, // Strategic Decision Making
      'c9f4a0e3-5d2b-4c8f-0f9a-2345678901bc': leadershipFoundationsModule, // Team Development & Performance  
      'd0a5b1f4-6e3c-4d9a-1a0b-3456789012cd': leadershipFoundationsModule, // Change Leadership & Innovation
      'e1b6c2a5-7f4d-4e0b-2b1c-4567890123de': leadershipFoundationsModule, // Executive Presence & Influence
      'leadership-foundations-enhanced': leadershipFoundationsModule,
    };

    console.log('🔍 Enhanced content lookup for moduleId:', moduleId);
    console.log('🔍 Available enhanced modules:', Object.keys(enhancedModules));
    
    const content = enhancedModules[moduleId] || null;
    console.log('🔍 Enhanced content found:', !!content);
    
    return content;
  }, [moduleId]);
};