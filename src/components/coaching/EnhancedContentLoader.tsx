import React, { useMemo } from 'react';
import { leadershipFoundationsModule } from '@/data/professionalContent/leadershipModule';
import { strategicDecisionMakingModule } from '@/data/professionalContent/strategicDecisionMakingModule';
import { teamDevelopmentModule } from '@/data/professionalContent/teamDevelopmentModule';
import { changeLeadershipModule } from '@/data/professionalContent/changeLeadershipModule';
import { executivePresenceModule } from '@/data/professionalContent/executivePresenceModule';
import { marketResearchModule } from '@/data/professionalContent/marketResearchModule';
import { communicationInfluenceModule } from '@/data/professionalContent/communicationInfluenceModule';
import { devOpsFundamentalsModule } from '@/data/professionalContent/devOpsFundamentalsModule';
import { javaScriptCSSFoundationsModule } from '@/data/professionalContent/javaScriptCSSFoundationsModule';
import { systemArchitectureModule } from '@/data/professionalContent/systemArchitectureModule';

interface ContentLoaderProps {
  moduleId: string;
  children: (enhancedContent: any) => React.ReactNode;
}

export const EnhancedContentLoader = ({ moduleId, children }: ContentLoaderProps) => {
  const enhancedContent = useMemo(() => {
    // Map of enhanced content modules
    const enhancedModules: Record<string, any> = {
      // Leadership Excellence Program modules
      '783fcafa-1d71-4eae-94ff-cd1e948bbf07': leadershipFoundationsModule, // Original Foundations of Leadership
      '24f320e8-308a-4e08-b483-0e17f9bba7fc': leadershipFoundationsModule, // Foundations of Leadership
      'b8e3f9d2-4c1a-4b7e-9e8f-1234567890ab': strategicDecisionMakingModule, // Strategic Decision Making
      'c9f4a0e3-5d2b-4c8f-0f9a-2345678901bc': teamDevelopmentModule, // Team Development & Performance  
      'd0a5b1f4-6e3c-4d9a-1a0b-3456789012cd': changeLeadershipModule, // Change Leadership & Innovation
      'e1b6c2a5-7f4d-4e0b-2b1c-4567890123de': executivePresenceModule, // Executive Presence & Influence
      'e0ef2b42-5ed7-422a-ba73-60b0da7240be': marketResearchModule, // Market Research Fundamentals
      // Technical Skills Acceleration Program modules
      '25450a66-2711-4593-9620-cac4922d5293': devOpsFundamentalsModule, // DevOps Fundamentals: CI/CD, Docker & Kubernetes
      '8abda41a-643e-4ed3-bd86-64fa1449ef0e': javaScriptCSSFoundationsModule, // JavaScript & CSS Foundations (Database UUID)
      '07f8ac81-e3c1-48d2-931c-75d17adeacc6': systemArchitectureModule, // System Architecture & Design (Database UUID)
      'devops-fundamentals-cicd-docker-kubernetes': devOpsFundamentalsModule, // DevOps Fundamentals
      'javascript-css-foundations': javaScriptCSSFoundationsModule, // JavaScript & CSS Foundations
      'system-architecture-design': systemArchitectureModule, // System Architecture & Design
      'leadership-foundations-enhanced': leadershipFoundationsModule,
    };

    return enhancedModules[moduleId] || null;
  }, [moduleId]);

  return children(enhancedContent);
};

export const useEnhancedContent = (moduleId: string, moduleTitle?: string) => {
  return useMemo(() => {
    const enhancedModules: Record<string, any> = {
      // Original and current Leadership Excellence Program modules
      '783fcafa-1d71-4eae-94ff-cd1e948bbf07': leadershipFoundationsModule, // Original Foundations of Leadership
      '24f320e8-308a-4e08-b483-0e17f9bba7fc': leadershipFoundationsModule, // Foundations of Leadership
      'b8e3f9d2-4c1a-4b7e-9e8f-1234567890ab': strategicDecisionMakingModule, // Strategic Decision Making
      'c9f4a0e3-5d2b-4c8f-0f9a-2345678901bc': teamDevelopmentModule, // Team Development & Performance  
      'd0a5b1f4-6e3c-4d9a-1a0b-3456789012cd': changeLeadershipModule, // Change Leadership & Innovation
      'e1b6c2a5-7f4d-4e0b-2b1c-4567890123de': executivePresenceModule, // Executive Presence & Influence
      'e0ef2b42-5ed7-422a-ba73-60b0da7240be': marketResearchModule, // Market Research Fundamentals
      // Technical Skills Acceleration Program modules
      '25450a66-2711-4593-9620-cac4922d5293': devOpsFundamentalsModule, // DevOps Fundamentals: CI/CD, Docker & Kubernetes
      '8abda41a-643e-4ed3-bd86-64fa1449ef0e': javaScriptCSSFoundationsModule, // JavaScript & CSS Foundations (Database UUID)
      '07f8ac81-e3c1-48d2-931c-75d17adeacc6': systemArchitectureModule, // System Architecture & Design (Database UUID)
      'devops-fundamentals-cicd-docker-kubernetes': devOpsFundamentalsModule, // DevOps Fundamentals
      'javascript-css-foundations': javaScriptCSSFoundationsModule, // JavaScript & CSS Foundations
      'system-architecture-design': systemArchitectureModule, // System Architecture & Design
      'leadership-foundations-enhanced': leadershipFoundationsModule,
    };

    // Communication & Influence modules by title matching
    const communicationModules: Record<string, any> = {
      'Effective Communication Foundations': communicationInfluenceModule.content_sections[0],
      'Public Speaking & Presentation Skills': communicationInfluenceModule.content_sections[1],
      'Stakeholder Management & Influence': communicationInfluenceModule.content_sections[2],
      'Conflict Resolution & Negotiation': communicationInfluenceModule.content_sections[3],
      'Advanced Persuasion Techniques': communicationInfluenceModule.content_sections[4],
    };

    console.log('🔍 Enhanced content lookup for moduleId:', moduleId);
    console.log('🔍 Module title:', moduleTitle);
    
    // First try by module ID
    let content = enhancedModules[moduleId] || null;
    
    if (content) {
      console.log('✅ Found enhanced content by module ID:', moduleId);
      console.log('📋 Content sections:', content.content_sections?.length || 0);
    }
    
    // If not found and we have a title, try by title for Communication & Influence modules
    if (!content && moduleTitle && communicationModules[moduleTitle]) {
      console.log('✅ Found Communication & Influence module by title:', moduleTitle);
      content = {
        content_sections: [communicationModules[moduleTitle]]
      };
    }
    
    if (!content) {
      console.log('⚠️ No enhanced content found for:', { moduleId, moduleTitle });
    }
    
    return content;
  }, [moduleId, moduleTitle]);
};