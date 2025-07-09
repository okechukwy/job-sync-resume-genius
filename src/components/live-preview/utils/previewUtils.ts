export const getLayoutVariant = (template: string) => {
  const templateName = template.toLowerCase().replace(/\s+/g, '-');
  
  if (templateName.includes('minimalist') || templateName.includes('elegant')) {
    return 'modern-minimalist';
  } else if (templateName.includes('creative') || templateName.includes('colorful')) {
    return 'creative-showcase';
  } else if (templateName.includes('executive') || templateName.includes('finance')) {
    return 'executive-premium';
  } else if (templateName.includes('tech') || templateName.includes('software') || templateName.includes('developer')) {
    return 'tech-forward';
  } else {
    return 'classic-professional';
  }
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};