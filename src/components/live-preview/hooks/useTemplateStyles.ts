import { useMemo } from 'react';
import { baseLayoutStyles, templateOverrides } from '../config/templateStyleConfig';
import { getLayoutVariant } from '../utils/previewUtils';

export const useTemplateStyles = (template: string) => {
  return useMemo(() => {
    const templateName = template.toLowerCase().replace(/\s+/g, '-');
    const layoutVariant = getLayoutVariant(template);
    
    const variant = baseLayoutStyles[layoutVariant];
    const overrides = templateOverrides[templateName as keyof typeof templateOverrides] || {};
    
    return {
      ...variant,
      ...overrides,
      skillsGrid: layoutVariant !== 'modern-minimalist' && layoutVariant !== 'executive-premium'
    };
  }, [template]);
};