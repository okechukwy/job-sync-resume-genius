import { useMemo } from 'react';
import { baseLayoutStyles, templateOverrides } from '../config/templateStyleConfig';
import { getLayoutVariant } from '../utils/previewUtils';

export const useTemplateStyles = (template: string) => {
  return useMemo(() => {
    const templateName = template.toLowerCase().replace(/\s+/g, '-');
    const layoutVariant = getLayoutVariant(template);
    
    // Debug logging
    console.log('useTemplateStyles - Template:', template);
    console.log('useTemplateStyles - Layout variant:', layoutVariant);
    console.log('useTemplateStyles - Template name:', templateName);
    
    const variant = baseLayoutStyles[layoutVariant];
    const overrides = templateOverrides[templateName as keyof typeof templateOverrides] || {};
    
    const finalStyles = {
      ...variant,
      ...overrides,
      skillsGrid: layoutVariant !== 'modern-minimalist' && layoutVariant !== 'executive-premium'
    };
    
    console.log('useTemplateStyles - Final styles:', finalStyles);
    return finalStyles;
  }, [template]);
};