export const getLayoutVariant = (template: string) => {
  const templateName = template.toLowerCase().replace(/\s+/g, '-');
  
  // Debug logging to track template selection
  console.log('Template received:', template);
  console.log('Normalized template name:', templateName);
  
  // Creative and colorful templates
  if (templateName.includes('creative') || templateName.includes('colorful') || 
      templateName.includes('fresh') || templateName.includes('gradient') ||
      templateName.includes('art-director') || templateName.includes('brand-manager') ||
      templateName.includes('content-creator') || templateName.includes('copywriter') ||
      templateName.includes('graphic-designer') || templateName.includes('marketing-manager') ||
      templateName.includes('motion-graphics') || templateName.includes('photographer') ||
      templateName.includes('social-media') || templateName.includes('video-editor') ||
      templateName.includes('web-designer') || templateName.includes('ux-ui')) {
    return 'creative-showcase';
  }
  
  // Executive and premium templates
  if (templateName.includes('executive') || templateName.includes('finance') ||
      templateName.includes('corporate') || templateName.includes('investment') ||
      templateName.includes('portfolio-manager') || templateName.includes('risk-manager') ||
      templateName.includes('operations-manager') || templateName.includes('accountant')) {
    return 'executive-premium';
  }
  
  // Tech and developer templates
  if (templateName.includes('tech') || templateName.includes('software') || 
      templateName.includes('developer') || templateName.includes('engineer') ||
      templateName.includes('frontend') || templateName.includes('mobile') ||
      templateName.includes('devops') || templateName.includes('cloud') ||
      templateName.includes('cybersecurity') || templateName.includes('data-scientist') ||
      templateName.includes('ai-ml') || templateName.includes('qa-engineer') ||
      templateName.includes('it-support') || templateName.includes('product-manager')) {
    return 'tech-forward';
  }
  
  // Healthcare templates - specifically check for exact matches first
  if (template === 'Medical Doctor' || 
      templateName.includes('medical-doctor') || 
      templateName.includes('healthcare') || 
      templateName.includes('medical') || 
      templateName.includes('nurse') || 
      templateName.includes('pharmacist') || 
      templateName.includes('clinical') || 
      templateName.includes('lab-technician') || 
      templateName.includes('doctor')) {
    console.log('Healthcare template detected, using healthcare layout for:', template);
    return 'healthcare';
  }
  
  // Minimalist and elegant templates
  if (templateName.includes('minimalist') || templateName.includes('elegant')) {
    return 'modern-minimalist';
  }
  
  // Default to classic professional
  console.log('Using default classic-professional layout for template:', templateName);
  return 'classic-professional';
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};