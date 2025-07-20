
// Enhanced Template Configuration System - 20 Professional Templates
// Replaces generic templates with visually distinct, category-specific designs

export interface StylePreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  headerBg: string;
  headerText: string;
  sectionBorder: string;
  layout: 'professional' | 'creative' | 'technical' | 'traditional' | 'sidebar' | 'academic' | 'executive' | 'portfolio' | 'developer';
  spacing: 'compact' | 'standard' | 'spacious';
  typography: 'serif' | 'sans' | 'modern' | 'technical';
  visualElements: {
    headerStyle: 'banner' | 'centered' | 'split' | 'minimal' | 'sidebar' | 'traditional';
    decorativeElements: boolean;
    gradientHeader: boolean;
    iconAccents: boolean;
  };
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'professional' | 'creative' | 'technical';
  stylePreset: string;
  tags: string[];
  industries: string[];
  features: string[];
  perfectFor: string[];
}

// Enhanced Style Presets - 20 Unique Visual Themes
export const stylePresets: StylePreset[] = [
  // PROFESSIONAL CATEGORY (8 Presets)
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    primary: '222 84% 20%', // Deep Navy
    secondary: '222 20% 30%', // Dark Gray Navy
    accent: '222 100% 85%', // Light Navy
    headerBg: 'linear-gradient(135deg, hsl(222 84% 20%), hsl(222 84% 15%))',
    headerText: '0 0% 100%',
    sectionBorder: '222 84% 20%',
    layout: 'executive',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: false,
      gradientHeader: true,
      iconAccents: false
    }
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    primary: '173 80% 40%', // Teal
    secondary: '173 30% 25%', // Dark Teal
    accent: '173 70% 85%', // Light Teal
    headerBg: 'linear-gradient(135deg, hsl(173 80% 40%), hsl(185 80% 45%))',
    headerText: '0 0% 100%',
    sectionBorder: '173 80% 40%',
    layout: 'sidebar',
    spacing: 'spacious',
    typography: 'modern',
    visualElements: {
      headerStyle: 'split',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    primary: '0 0% 25%', // Charcoal
    secondary: '0 0% 15%', // Very Dark Gray
    accent: '0 0% 80%', // Light Gray
    headerBg: 'hsl(0 0% 25%)',
    headerText: '0 0% 100%',
    sectionBorder: '0 0% 25%',
    layout: 'academic',
    spacing: 'spacious',
    typography: 'serif',
    visualElements: {
      headerStyle: 'traditional',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'business-manager',
    name: 'Business Manager',
    primary: '210 100% 35%', // Professional Blue
    secondary: '210 50% 25%', // Dark Blue
    accent: '210 100% 85%', // Light Blue
    headerBg: 'linear-gradient(135deg, hsl(210 100% 35%), hsl(220 100% 40%))',
    headerText: '0 0% 100%',
    sectionBorder: '210 100% 35%',
    layout: 'professional',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'finance-executive',
    name: 'Finance Executive',
    primary: '140 100% 25%', // Forest Green
    secondary: '140 30% 20%', // Dark Green
    accent: '140 60% 80%', // Light Green
    headerBg: 'linear-gradient(135deg, hsl(140 100% 25%), hsl(150 100% 30%))',
    headerText: '0 0% 100%',
    sectionBorder: '140 100% 25%',
    layout: 'executive',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: false,
      gradientHeader: true,
      iconAccents: false
    }
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    primary: '195 100% 40%', // Medical Blue
    secondary: '195 50% 25%', // Dark Medical Blue
    accent: '195 80% 85%', // Light Medical Blue
    headerBg: 'linear-gradient(135deg, hsl(195 100% 40%), hsl(205 100% 45%))',
    headerText: '0 0% 100%',
    sectionBorder: '195 100% 40%',
    layout: 'professional',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'legal-professional',
    name: 'Legal Professional',
    primary: '345 60% 35%', // Burgundy
    secondary: '345 30% 25%', // Dark Burgundy
    accent: '345 40% 85%', // Light Burgundy
    headerBg: 'linear-gradient(135deg, hsl(345 60% 35%), hsl(345 60% 30%))',
    headerText: '0 0% 100%',
    sectionBorder: '345 60% 35%',
    layout: 'traditional',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'traditional',
      decorativeElements: false,
      gradientHeader: true,
      iconAccents: false
    }
  },
  {
    id: 'consulting-expert',
    name: 'Consulting Expert',
    primary: '200 20% 30%', // Charcoal Blue
    secondary: '200 15% 20%', // Very Dark Charcoal
    accent: '200 30% 80%', // Light Charcoal
    headerBg: 'linear-gradient(135deg, hsl(200 20% 30%), hsl(210 20% 35%))',
    headerText: '0 0% 100%',
    sectionBorder: '200 20% 30%',
    layout: 'sidebar',
    spacing: 'spacious',
    typography: 'modern',
    visualElements: {
      headerStyle: 'split',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },

  // CREATIVE CATEGORY (6 Presets)
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    primary: '280 100% 60%', // Vibrant Purple
    secondary: '280 50% 30%', // Dark Purple
    accent: '280 80% 85%', // Light Purple
    headerBg: 'linear-gradient(135deg, hsl(280 100% 60%), hsl(300 100% 65%))',
    headerText: '0 0% 100%',
    sectionBorder: '280 100% 60%',
    layout: 'portfolio',
    spacing: 'spacious',
    typography: 'modern',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'ux-ui-designer',
    name: 'UX/UI Designer',
    primary: '25 100% 55%', // Creative Orange
    secondary: '25 60% 30%', // Dark Orange
    accent: '25 100% 85%', // Light Orange
    headerBg: 'linear-gradient(135deg, hsl(25 100% 55%), hsl(35 100% 60%))',
    headerText: '0 0% 100%',
    sectionBorder: '25 100% 55%',
    layout: 'creative',
    spacing: 'spacious',
    typography: 'modern',
    visualElements: {
      headerStyle: 'split',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'marketing-creative',
    name: 'Marketing Creative',
    primary: '320 100% 55%', // Pink
    secondary: '320 60% 30%', // Dark Pink
    accent: '320 80% 85%', // Light Pink
    headerBg: 'linear-gradient(135deg, hsl(320 100% 55%), hsl(340 100% 60%))',
    headerText: '0 0% 100%',
    sectionBorder: '320 100% 55%',
    layout: 'creative',
    spacing: 'standard',
    typography: 'modern',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    primary: '180 100% 45%', // Turquoise
    secondary: '180 60% 25%', // Dark Turquoise
    accent: '180 80% 85%', // Light Turquoise
    headerBg: 'linear-gradient(135deg, hsl(180 100% 45%), hsl(190 100% 50%))',
    headerText: '0 0% 100%',
    sectionBorder: '180 100% 45%',
    layout: 'creative',
    spacing: 'spacious',
    typography: 'modern',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'art-director',
    name: 'Art Director',
    primary: '300 100% 50%', // Bold Magenta
    secondary: '300 60% 25%', // Dark Magenta
    accent: '300 80% 85%', // Light Magenta
    headerBg: 'linear-gradient(135deg, hsl(300 100% 50%), hsl(320 100% 55%))',
    headerText: '0 0% 100%',
    sectionBorder: '300 100% 50%',
    layout: 'portfolio',
    spacing: 'spacious',
    typography: 'modern',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'photographer',
    name: 'Photographer',
    primary: '0 0% 10%', // Deep Black
    secondary: '0 0% 20%', // Dark Gray
    accent: '0 0% 85%', // Light Gray
    headerBg: 'linear-gradient(135deg, hsl(0 0% 10%), hsl(0 0% 15%))',
    headerText: '0 0% 100%',
    sectionBorder: '0 0% 10%',
    layout: 'portfolio',
    spacing: 'spacious',
    typography: 'modern',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: true,
      iconAccents: false
    }
  },

  // TECHNICAL CATEGORY (6 Presets)
  {
    id: 'software-engineer-pro',
    name: 'Software Engineer Pro',
    primary: '140 60% 45%', // Tech Green
    secondary: '140 30% 25%', // Dark Green
    accent: '140 80% 80%', // Light Green
    headerBg: 'linear-gradient(135deg, hsl(140 60% 45%), hsl(150 60% 50%))',
    headerText: '0 0% 100%',
    sectionBorder: '140 60% 45%',
    layout: 'developer',
    spacing: 'compact',
    typography: 'technical',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'data-scientist-elite',
    name: 'Data Scientist Elite',
    primary: '200 100% 50%', // Cyber Blue
    secondary: '200 60% 30%', // Dark Cyan
    accent: '200 100% 85%', // Light Cyan
    headerBg: 'linear-gradient(135deg, hsl(200 100% 50%), hsl(210 100% 55%))',
    headerText: '0 0% 100%',
    sectionBorder: '200 100% 50%',
    layout: 'technical',
    spacing: 'compact',
    typography: 'technical',
    visualElements: {
      headerStyle: 'split',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    primary: '240 100% 30%', // Dark Tech Blue
    secondary: '240 60% 20%', // Very Dark Blue
    accent: '240 80% 85%', // Light Blue
    headerBg: 'linear-gradient(135deg, hsl(240 100% 30%), hsl(250 100% 35%))',
    headerText: '0 0% 100%',
    sectionBorder: '240 100% 30%',
    layout: 'developer',
    spacing: 'compact',
    typography: 'technical',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'cybersecurity-expert',
    name: 'Cybersecurity Expert',
    primary: '0 100% 40%', // Security Red
    secondary: '0 60% 25%', // Dark Red
    accent: '0 80% 85%', // Light Red
    headerBg: 'linear-gradient(135deg, hsl(0 100% 40%), hsl(15 100% 45%))',
    headerText: '0 0% 100%',
    sectionBorder: '0 100% 40%',
    layout: 'technical',
    spacing: 'compact',
    typography: 'technical',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI/ML Engineer',
    primary: '270 100% 55%', // AI Purple
    secondary: '270 60% 30%', // Dark Purple
    accent: '270 80% 85%', // Light Purple
    headerBg: 'linear-gradient(135deg, hsl(270 100% 55%), hsl(285 100% 60%))',
    headerText: '0 0% 100%',
    sectionBorder: '270 100% 55%',
    layout: 'developer',
    spacing: 'compact',
    typography: 'technical',
    visualElements: {
      headerStyle: 'split',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  },
  {
    id: 'cloud-architect',
    name: 'Cloud Architect',
    primary: '195 100% 45%', // Sky Blue
    secondary: '195 60% 25%', // Dark Sky Blue
    accent: '195 80% 85%', // Light Sky Blue
    headerBg: 'linear-gradient(135deg, hsl(195 100% 45%), hsl(205 100% 50%))',
    headerText: '0 0% 100%',
    sectionBorder: '195 100% 45%',
    layout: 'technical',
    spacing: 'standard',
    typography: 'technical',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: true,
      gradientHeader: true,
      iconAccents: true
    }
  }
];

// Template Configurations - 20 Professional Templates
export const templateConfigs: TemplateConfig[] = [
  // PROFESSIONAL CATEGORY (8 Templates)
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    description: 'Traditional navy design for C-suite executives and senior leadership roles',
    emoji: '👔',
    category: 'professional',
    stylePreset: 'corporate-executive',
    tags: ['Executive', 'Leadership', 'C-Suite', 'Traditional'],
    industries: ['Finance', 'Banking', 'Insurance', 'Corporate'],
    features: ['Executive Header', 'Achievement Focus', 'Leadership Emphasis', 'ATS Optimized'],
    perfectFor: ['CEOs', 'CFOs', 'COOs', 'VPs', 'Directors', 'Senior Executives']
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Contemporary teal design with sidebar layout for modern professionals',
    emoji: '💼',
    category: 'professional',
    stylePreset: 'modern-professional',
    tags: ['Modern', 'Contemporary', 'Sidebar', 'Professional'],
    industries: ['Technology', 'Consulting', 'Healthcare', 'Startups'],
    features: ['Sidebar Layout', 'Modern Typography', 'Visual Hierarchy', 'Icon Accents'],
    perfectFor: ['Managers', 'Directors', 'Consultants', 'Team Leads', 'Project Managers']
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    description: 'Scholarly charcoal design focused on research and publications',
    emoji: '🎓',
    category: 'professional',
    stylePreset: 'academic-researcher',
    tags: ['Academic', 'Research', 'Publications', 'Scholarly'],
    industries: ['Education', 'Research', 'Academia', 'Think Tanks'],
    features: ['Publication Focus', 'Research Emphasis', 'Traditional Layout', 'Clean Design'],
    perfectFor: ['Professors', 'Researchers', 'PhD Holders', 'Scientists', 'Academics']
  },
  {
    id: 'business-manager',
    name: 'Business Manager',
    description: 'Professional blue design optimized for business and management roles',
    emoji: '📊',
    category: 'professional',
    stylePreset: 'business-manager',
    tags: ['Business', 'Management', 'Results-Driven', 'Professional'],
    industries: ['Business', 'Operations', 'Sales', 'Project Management'],
    features: ['Results Focus', 'Management Emphasis', 'Clean Layout', 'Professional Design'],
    perfectFor: ['Business Managers', 'Operations Managers', 'Sales Managers', 'Team Leaders']
  },
  {
    id: 'finance-executive',
    name: 'Finance Executive',
    description: 'Forest green design tailored for financial professionals and executives',
    emoji: '💰',
    category: 'professional',
    stylePreset: 'finance-executive',
    tags: ['Finance', 'Executive', 'Numbers-Focused', 'Professional'],
    industries: ['Finance', 'Banking', 'Investment', 'Accounting'],
    features: ['Financial Focus', 'Executive Layout', 'Achievement Emphasis', 'Professional Design'],
    perfectFor: ['Finance Directors', 'CFOs', 'Investment Managers', 'Financial Analysts']
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    description: 'Medical blue design for healthcare workers and medical professionals',
    emoji: '⚕️',
    category: 'professional',
    stylePreset: 'healthcare-professional',
    tags: ['Healthcare', 'Medical', 'Clean', 'Professional'],
    industries: ['Healthcare', 'Medical', 'Nursing', 'Pharmaceutical'],
    features: ['Medical Focus', 'Clean Design', 'Professional Layout', 'Healthcare Icons'],
    perfectFor: ['Doctors', 'Nurses', 'Healthcare Managers', 'Medical Professionals']
  },
  {
    id: 'legal-professional',
    name: 'Legal Professional',
    description: 'Burgundy traditional design for legal professionals and law firms',
    emoji: '⚖️',
    category: 'professional',
    stylePreset: 'legal-professional',
    tags: ['Legal', 'Traditional', 'Professional', 'Conservative'],
    industries: ['Legal', 'Law Firms', 'Government', 'Compliance'],
    features: ['Traditional Layout', 'Professional Design', 'Conservative Style', 'Legal Focus'],
    perfectFor: ['Lawyers', 'Paralegals', 'Legal Counsels', 'Judges', 'Legal Professionals']
  },
  {
    id: 'consulting-expert',
    name: 'Consulting Expert',
    description: 'Charcoal modern design for consultants and advisory professionals',
    emoji: '💡',
    category: 'professional',
    stylePreset: 'consulting-expert',
    tags: ['Consulting', 'Advisory', 'Modern', 'Expert'],
    industries: ['Consulting', 'Advisory', 'Strategy', 'Business Services'],
    features: ['Modern Layout', 'Expert Focus', 'Professional Design', 'Consulting Emphasis'],
    perfectFor: ['Consultants', 'Advisors', 'Strategy Experts', 'Business Analysts']
  },

  // CREATIVE CATEGORY (6 Templates)
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    description: 'Vibrant purple design with portfolio showcase for graphic artists',
    emoji: '🎨',
    category: 'creative',
    stylePreset: 'graphic-designer',
    tags: ['Creative', 'Visual', 'Portfolio', 'Artistic'],
    industries: ['Design', 'Creative', 'Advertising', 'Marketing'],
    features: ['Portfolio Showcase', 'Creative Layout', 'Visual Elements', 'Bold Design'],
    perfectFor: ['Graphic Designers', 'Visual Artists', 'Creative Directors', 'Brand Designers']
  },
  {
    id: 'ux-ui-designer',
    name: 'UX/UI Designer',
    description: 'Creative orange design for user experience and interface designers',
    emoji: '📱',
    category: 'creative',
    stylePreset: 'ux-ui-designer',
    tags: ['UX/UI', 'Design', 'User-Focused', 'Modern'],
    industries: ['Technology', 'Design', 'Startups', 'Digital'],
    features: ['Design Process Focus', 'User Research', 'Prototyping', 'Modern Layout'],
    perfectFor: ['UX Designers', 'UI Designers', 'Product Designers', 'Interaction Designers']
  },
  {
    id: 'marketing-creative',
    name: 'Marketing Creative',
    description: 'Pink gradient design for marketing professionals and creatives',
    emoji: '📢',
    category: 'creative',
    stylePreset: 'marketing-creative',
    tags: ['Marketing', 'Creative', 'Campaign', 'Brand'],
    industries: ['Marketing', 'Advertising', 'PR', 'Brand Management'],
    features: ['Campaign Focus', 'Brand Emphasis', 'Creative Layout', 'Marketing Metrics'],
    perfectFor: ['Marketing Managers', 'Brand Managers', 'Marketing Directors', 'Campaign Managers']
  },
  {
    id: 'content-creator',
    name: 'Content Creator',
    description: 'Turquoise design for writers, content specialists, and digital creators',
    emoji: '✍️',
    category: 'creative',
    stylePreset: 'content-creator',
    tags: ['Content', 'Writing', 'Digital', 'Creative'],
    industries: ['Media', 'Publishing', 'Digital Marketing', 'Content'],
    features: ['Content Portfolio', 'Writing Samples', 'Digital Focus', 'Creative Layout'],
    perfectFor: ['Content Writers', 'Copywriters', 'Content Managers', 'Digital Creators']
  },
  {
    id: 'art-director',
    name: 'Art Director',
    description: 'Bold magenta design for creative leadership and art direction roles',
    emoji: '🎭',
    category: 'creative',
    stylePreset: 'art-director',
    tags: ['Art Direction', 'Creative Leadership', 'Vision', 'Bold'],
    industries: ['Creative', 'Advertising', 'Film', 'Entertainment'],
    features: ['Creative Vision', 'Leadership Focus', 'Portfolio Showcase', 'Bold Design'],
    perfectFor: ['Art Directors', 'Creative Directors', 'Visual Directors', 'Creative Leads']
  },
  {
    id: 'photographer',
    name: 'Photographer',
    description: 'Minimalist black design for photographers and visual artists',
    emoji: '📸',
    category: 'creative',
    stylePreset: 'photographer',
    tags: ['Photography', 'Visual', 'Minimalist', 'Artistic'],
    industries: ['Photography', 'Visual Arts', 'Media', 'Creative'],
    features: ['Portfolio Focus', 'Minimalist Design', 'Visual Emphasis', 'Clean Layout'],
    perfectFor: ['Photographers', 'Visual Artists', 'Photo Editors', 'Visual Storytellers']
  },

  // TECHNICAL CATEGORY (6 Templates)
  {
    id: 'software-engineer-pro',
    name: 'Software Engineer Pro',
    description: 'Tech green design optimized for software engineers and developers',
    emoji: '💻',
    category: 'technical',
    stylePreset: 'software-engineer-pro',
    tags: ['Software', 'Engineering', 'Technical', 'Code'],
    industries: ['Technology', 'Software', 'Startups', 'Tech'],
    features: ['Technical Skills', 'Code Projects', 'Engineering Focus', 'Tech Design'],
    perfectFor: ['Software Engineers', 'Developers', 'Full-Stack Engineers', 'Backend Engineers']
  },
  {
    id: 'data-scientist-elite',
    name: 'Data Scientist Elite',
    description: 'Cyber blue design for data scientists and machine learning engineers',
    emoji: '📊',
    category: 'technical',
    stylePreset: 'data-scientist-elite',
    tags: ['Data Science', 'Analytics', 'ML', 'Technical'],
    industries: ['Technology', 'Data', 'Analytics', 'AI'],
    features: ['Data Projects', 'Analytics Focus', 'ML Emphasis', 'Technical Design'],
    perfectFor: ['Data Scientists', 'ML Engineers', 'Data Analysts', 'Research Scientists']
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    description: 'Dark tech blue design for DevOps and infrastructure professionals',
    emoji: '🔧',
    category: 'technical',
    stylePreset: 'devops-engineer',
    tags: ['DevOps', 'Infrastructure', 'Automation', 'Technical'],
    industries: ['Technology', 'Cloud', 'Infrastructure', 'DevOps'],
    features: ['Infrastructure Focus', 'Automation Emphasis', 'Technical Skills', 'DevOps Tools'],
    perfectFor: ['DevOps Engineers', 'Infrastructure Engineers', 'Platform Engineers', 'SREs']
  },
  {
    id: 'cybersecurity-expert',
    name: 'Cybersecurity Expert',
    description: 'Security red design for cybersecurity and information security professionals',
    emoji: '🔐',
    category: 'technical',
    stylePreset: 'cybersecurity-expert',
    tags: ['Security', 'Cybersecurity', 'Protection', 'Technical'],
    industries: ['Security', 'Technology', 'Government', 'Finance'],
    features: ['Security Focus', 'Threat Analysis', 'Technical Skills', 'Security Certifications'],
    perfectFor: ['Security Engineers', 'Security Analysts', 'CISO', 'Security Consultants']
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI/ML Engineer',
    description: 'AI purple design for artificial intelligence and machine learning specialists',
    emoji: '🤖',
    category: 'technical',
    stylePreset: 'ai-ml-engineer',
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'Technical'],
    industries: ['AI', 'Technology', 'Research', 'Innovation'],
    features: ['AI Projects', 'ML Models', 'Research Focus', 'Technical Innovation'],
    perfectFor: ['AI Engineers', 'ML Engineers', 'AI Researchers', 'Deep Learning Engineers']
  },
  {
    id: 'cloud-architect',
    name: 'Cloud Architect',
    description: 'Sky blue design for cloud architects and infrastructure specialists',
    emoji: '☁️',
    category: 'technical',
    stylePreset: 'cloud-architect',
    tags: ['Cloud', 'Architecture', 'Infrastructure', 'Technical'],
    industries: ['Cloud', 'Technology', 'Infrastructure', 'Enterprise'],
    features: ['Cloud Architecture', 'Infrastructure Design', 'Scalability Focus', 'Technical Leadership'],
    perfectFor: ['Cloud Architects', 'Solutions Architects', 'Infrastructure Architects', 'Cloud Engineers']
  }
];

// Helper functions
export const getTemplateById = (id: string): TemplateConfig | undefined => {
  return templateConfigs.find(template => template.id === id);
};

export const getStylePresetById = (id: string): StylePreset | undefined => {
  return stylePresets.find(preset => preset.id === id);
};

export const getTemplatesByCategory = (category: 'professional' | 'creative' | 'technical'): TemplateConfig[] => {
  return templateConfigs.filter(template => template.category === category);
};

export const getAllCategories = (): Array<{ id: string; name: string; templates: TemplateConfig[] }> => {
  return [
    {
      id: 'professional',
      name: 'Professional',
      templates: getTemplatesByCategory('professional')
    },
    {
      id: 'creative',
      name: 'Creative',
      templates: getTemplatesByCategory('creative')
    },
    {
      id: 'technical',
      name: 'Technical',
      templates: getTemplatesByCategory('technical')
    }
  ];
};
