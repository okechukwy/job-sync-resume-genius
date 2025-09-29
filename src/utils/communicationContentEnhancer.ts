// Utility to enhance Communication & Influence modules with comprehensive content
import { communicationInfluenceModule } from '@/data/professionalContent/communicationInfluenceModule';

export const enhanceCommunicationModule = (module: any) => {
  if (!module) return module;

  // Map module titles to their enhanced content
  const contentMap: Record<string, any> = {
    'Effective Communication Foundations': communicationInfluenceModule.content_sections[0],
    'Public Speaking & Presentation Skills': communicationInfluenceModule.content_sections[1],
    'Stakeholder Management & Influence': communicationInfluenceModule.content_sections[2],
    'Conflict Resolution & Negotiation': communicationInfluenceModule.content_sections[3],
    'Advanced Persuasion Techniques': communicationInfluenceModule.content_sections[4],
  };

  const enhancedContent = contentMap[module.title];
  
  if (enhancedContent) {
    console.log('🔧 Enhancing Communication module:', module.title);
    
    // Return enhanced module with content sections
    return {
      ...module,
      content_sections: [enhancedContent]
    };
  }

  return module;
};

export const isCommunicationModule = (module: any): boolean => {
  if (!module) return false;
  
  const communicationTitles = [
    'Effective Communication Foundations',
    'Public Speaking & Presentation Skills', 
    'Stakeholder Management & Influence',
    'Conflict Resolution & Negotiation',
    'Advanced Persuasion Techniques'
  ];
  
  return communicationTitles.includes(module.title);
};
