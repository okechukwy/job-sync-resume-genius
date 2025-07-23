import { allTemplates } from '@/data/templateData';

/**
 * Formats a template name from slug format to readable format
 * Example: "tech-professional" -> "Tech Professional"
 */
export const formatTemplateName = (templateName: string): string => {
  return templateName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

/**
 * Gets the display name for a template ID
 * Returns the actual template name from template data or formatted version of the ID
 */
export const getTemplateDisplayName = (templateId: string): string => {
  // First try to find the template in the data
  const template = allTemplates.find(t => 
    t.route === `/templates/${templateId}` || 
    t.name.toLowerCase().replace(/\s+/g, '-') === templateId
  );
  
  if (template) {
    return template.name;
  }
  
  // Fallback to formatted template ID
  return formatTemplateName(templateId);
};

/**
 * Gets the template emoji/icon for a template ID
 */
export const getTemplateIcon = (templateId: string): string => {
  const template = allTemplates.find(t => 
    t.route === `/templates/${templateId}` || 
    t.name.toLowerCase().replace(/\s+/g, '-') === templateId
  );
  
  return template?.image || '📄';
};

/**
 * Gets template tags for a template ID
 */
export const getTemplateTags = (templateId: string): string[] => {
  const template = allTemplates.find(t => 
    t.route === `/templates/${templateId}` || 
    t.name.toLowerCase().replace(/\s+/g, '-') === templateId
  );
  
  return template?.tags || [];
};