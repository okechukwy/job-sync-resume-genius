
export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'executive' | 'modern';
  headerStyle: 'centered' | 'left-aligned' | 'creative' | 'executive';
  bodyFormat: 'paragraph' | 'bullet-points' | 'mixed' | 'skills-focused';
  features: string[];
  preview: string;
  atsScore: number;
  perfectFor: string[];
  industry?: string[];
}

export const coverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    description: 'Traditional business letter format with centered header and formal structure',
    category: 'professional',
    headerStyle: 'centered',
    bodyFormat: 'paragraph',
    features: ['Centered header', 'Traditional format', 'ATS-friendly', 'Professional spacing'],
    preview: '📄',
    atsScore: 95,
    perfectFor: ['Corporate roles', 'Finance', 'Legal', 'Government', 'Traditional industries'],
    industry: ['finance', 'legal', 'government', 'corporate']
  },
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Clean, contemporary design with left-aligned header and sleek formatting',
    category: 'modern',
    headerStyle: 'left-aligned',
    bodyFormat: 'paragraph',
    features: ['Left-aligned header', 'Clean lines', 'Modern spacing', 'Minimalist design'],
    preview: '🎯',
    atsScore: 92,
    perfectFor: ['Tech companies', 'Startups', 'Design roles', 'Modern businesses'],
    industry: ['technology', 'design', 'startup']
  },
  {
    id: 'creative-professional',
    name: 'Creative Professional',
    description: 'Balanced creative design suitable for creative roles while maintaining professionalism',
    category: 'creative',
    headerStyle: 'creative',
    bodyFormat: 'mixed',
    features: ['Creative header', 'Mixed content format', 'Portfolio integration', 'Skills highlight'],
    preview: '🎨',
    atsScore: 88,
    perfectFor: ['Creative roles', 'Marketing', 'Design', 'Media', 'Advertising'],
    industry: ['creative', 'marketing', 'media', 'advertising']
  },
  {
    id: 'executive-format',
    name: 'Executive Format',
    description: 'Sophisticated format designed for senior-level positions and leadership roles',
    category: 'executive',
    headerStyle: 'executive',
    bodyFormat: 'paragraph',
    features: ['Executive header', 'Leadership focus', 'Achievement-oriented', 'Premium spacing'],
    preview: '👔',
    atsScore: 94,
    perfectFor: ['Executive roles', 'Senior management', 'Director positions', 'C-suite'],
    industry: ['executive', 'management', 'consulting']
  },
  {
    id: 'achievement-bullet',
    name: 'Achievement Focused',
    description: 'Bullet-point format highlighting key achievements and quantifiable results',
    category: 'professional',
    headerStyle: 'left-aligned',
    bodyFormat: 'bullet-points',
    features: ['Bullet-point achievements', 'Metrics focus', 'Results-driven', 'Scannable format'],
    preview: '📊',
    atsScore: 90,
    perfectFor: ['Sales roles', 'Project management', 'Operations', 'Results-driven positions'],
    industry: ['sales', 'operations', 'project-management']
  },
  {
    id: 'skills-showcase',
    name: 'Skills Showcase',
    description: 'Skills-focused format perfect for technical and specialized roles',
    category: 'modern',
    headerStyle: 'left-aligned',
    bodyFormat: 'skills-focused',
    features: ['Skills integration', 'Technical focus', 'Competency highlight', 'Modern layout'],
    preview: '⚡',
    atsScore: 91,
    perfectFor: ['Technical roles', 'Engineering', 'IT', 'Specialized positions'],
    industry: ['technology', 'engineering', 'it']
  },
  {
    id: 'healthcare-formal',
    name: 'Healthcare Professional',
    description: 'Formal template optimized for healthcare and medical professionals',
    category: 'professional',
    headerStyle: 'centered',
    bodyFormat: 'paragraph',
    features: ['Credential emphasis', 'Professional format', 'Healthcare optimized', 'Formal structure'],
    preview: '🏥',
    atsScore: 93,
    perfectFor: ['Healthcare', 'Medical', 'Nursing', 'Clinical roles'],
    industry: ['healthcare', 'medical', 'clinical']
  },
  {
    id: 'startup-dynamic',
    name: 'Startup Dynamic',
    description: 'Energetic format perfect for startup environments and innovative companies',
    category: 'creative',
    headerStyle: 'creative',
    bodyFormat: 'mixed',
    features: ['Dynamic design', 'Innovation focus', 'Startup culture fit', 'Flexible format'],
    preview: '🚀',
    atsScore: 87,
    perfectFor: ['Startups', 'Innovation roles', 'Product management', 'Growth positions'],
    industry: ['startup', 'product', 'innovation']
  }
];

export const getTemplatesByCategory = (category: string) => {
  return coverLetterTemplates.filter(template => template.category === category);
};

export const getTemplateById = (id: string) => {
  return coverLetterTemplates.find(template => template.id === id);
};

export const getRecommendedTemplate = (industry: string, role: string) => {
  // Smart template matching based on industry and role
  const industryMatch = coverLetterTemplates.filter(template => 
    template.industry?.some(ind => industry.toLowerCase().includes(ind))
  );
  
  if (industryMatch.length > 0) {
    return industryMatch[0];
  }
  
  // Default fallback
  return coverLetterTemplates[0];
};
