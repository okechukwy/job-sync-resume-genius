/**
 * Formats a template name from slug format to readable format
 * Example: "tech-professional" -> "Tech Professional"
 */
export const formatTemplateName = (templateName: string): string => {
  return templateName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};