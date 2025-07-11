// Unified Template Configuration System
// This replaces 56+ individual template files with a single configuration

export interface StylePreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  headerBg: string;
  headerText: string;
  sectionBorder: string;
  layout: 'professional' | 'creative' | 'technical' | 'traditional' | 'sidebar' | 'academic';
  spacing: 'compact' | 'standard' | 'spacious';
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

// Style Presets - Define visual themes that can be reused
export const stylePresets: StylePreset[] = [
  // Professional Presets - Enhanced with variety
  {
    id: 'corporate-traditional',
    name: 'Corporate Traditional',
    primary: '220 80% 30%', // Navy blue
    secondary: '220 20% 20%', // Dark gray
    accent: '220 50% 85%', // Light blue
    headerBg: '220 80% 30%',
    headerText: '0 0% 100%',
    sectionBorder: '220 80% 30%',
    layout: 'traditional',
    spacing: 'standard'
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    primary: '180 65% 45%', // Teal
    secondary: '180 25% 25%', // Dark teal
    accent: '180 60% 90%', // Light teal
    headerBg: 'linear-gradient(135deg, hsl(180 65% 45%), hsl(200 65% 50%))',
    headerText: '0 0% 100%',
    sectionBorder: '180 65% 45%',
    layout: 'sidebar',
    spacing: 'spacious'
  },
  {
    id: 'academic-research',
    name: 'Academic Research',
    primary: '0 0% 25%', // Dark gray
    secondary: '0 0% 15%', // Very dark gray
    accent: '0 0% 85%', // Light gray
    headerBg: '0 0% 25%',
    headerText: '0 0% 100%',
    sectionBorder: '0 0% 25%',
    layout: 'academic',
    spacing: 'spacious'
  },
  {
    id: 'two-column-pro',
    name: 'Two Column Professional',
    primary: '210 100% 40%', // Blue
    secondary: '210 30% 25%', // Dark blue
    accent: '210 70% 90%', // Light blue
    headerBg: 'linear-gradient(135deg, hsl(210 100% 40%), hsl(230 100% 45%))',
    headerText: '0 0% 100%',
    sectionBorder: '210 100% 40%',
    layout: 'sidebar',
    spacing: 'standard'
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    primary: '45 80% 45%', // Gold/amber
    secondary: '45 40% 25%', // Dark gold
    accent: '45 90% 85%', // Light gold
    headerBg: 'linear-gradient(135deg, hsl(220 25% 20%), hsl(220 30% 25%))',
    headerText: 'hsl(45 80% 45%)',
    sectionBorder: '45 80% 45%',
    layout: 'professional',
    spacing: 'spacious'
  },
  
  // Creative Presets
  {
    id: 'vibrant-purple',
    name: 'Vibrant Purple',
    primary: '270 70% 55%', // Purple
    secondary: '270 30% 35%', // Dark purple
    accent: '270 80% 75%', // Light purple
    headerBg: 'linear-gradient(135deg, hsl(270 70% 55%), hsl(300 70% 55%))',
    headerText: '0 0% 100%',
    sectionBorder: '270 70% 55%',
    layout: 'creative',
    spacing: 'standard'
  },
  {
    id: 'creative-orange',
    name: 'Creative Orange',
    primary: '25 85% 55%', // Orange
    secondary: '25 40% 35%', // Dark orange
    accent: '25 95% 75%', // Light orange
    headerBg: 'linear-gradient(135deg, hsl(25 85% 55%), hsl(45 85% 55%))',
    headerText: '0 0% 100%',
    sectionBorder: '25 85% 55%',
    layout: 'creative',
    spacing: 'compact'
  },
  
  // Technical Presets
  {
    id: 'tech-green',
    name: 'Tech Green',
    primary: '140 60% 45%', // Green
    secondary: '140 30% 25%', // Dark green
    accent: '140 80% 70%', // Light green
    headerBg: '140 60% 45%',
    headerText: '0 0% 100%',
    sectionBorder: '140 60% 45%',
    layout: 'technical',
    spacing: 'compact'
  },
  {
    id: 'cyber-blue',
    name: 'Cyber Blue',
    primary: '200 100% 50%', // Cyan
    secondary: '200 50% 30%', // Dark cyan
    accent: '200 100% 80%', // Light cyan
    headerBg: 'linear-gradient(135deg, hsl(200 100% 50%), hsl(220 100% 50%))',
    headerText: '0 0% 100%',
    sectionBorder: '200 100% 50%',
    layout: 'technical',
    spacing: 'compact'
  }
];

// Template Configurations - All templates in one place
export const templateConfigs: TemplateConfig[] = [
  // Professional Templates - 5 distinct layouts with Word document options
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    description: 'Traditional corporate style for senior executives',
    emoji: '👔',
    category: 'professional',
    stylePreset: 'corporate-traditional',
    tags: ['Executive', 'Traditional', 'Corporate'],
    industries: ['Finance', 'Consulting', 'Legal', 'Insurance'],
    features: ['Leadership Focus', 'Traditional Layout', 'Conservative Design'],
    perfectFor: ['CEOs', 'CFOs', 'Partners', 'Senior Directors']
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean, contemporary design with sidebar layout',
    emoji: '💼',
    category: 'professional',
    stylePreset: 'modern-professional',
    tags: ['Modern', 'Clean', 'Sidebar'],
    industries: ['Technology', 'Startups', 'Consulting', 'Healthcare'],
    features: ['Sidebar Layout', 'Modern Typography', 'Visual Hierarchy'],
    perfectFor: ['Managers', 'Directors', 'Consultants', 'Team Leads']
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    description: 'Structured layout for academics and researchers',
    emoji: '🎓',
    category: 'professional',
    stylePreset: 'academic-research',
    tags: ['Academic', 'Research', 'Publications'],
    industries: ['Education', 'Research', 'Academia', 'Think Tanks'],
    features: ['Publication Focus', 'Research Emphasis', 'Academic Structure'],
    perfectFor: ['Professors', 'Researchers', 'PhD Holders', 'Scientists']
  },
  {
    id: 'business-manager',
    name: 'Business Manager',
    description: 'Two-column layout for business professionals',
    emoji: '📊',
    category: 'professional',
    stylePreset: 'two-column-pro',
    tags: ['Business', 'Management', 'Two-Column'],
    industries: ['Business', 'Operations', 'Project Management', 'Sales'],
    features: ['Two-Column Design', 'Business Focus', 'Results-Driven'],
    perfectFor: ['Project Managers', 'Operations Managers', 'Business Analysts', 'Sales Managers']
  },
  {
    id: 'executive-leader',
    name: 'Executive Leader',
    description: 'Premium design for C-level executives',
    emoji: '⭐',
    category: 'professional',
    stylePreset: 'executive-premium',
    tags: ['Premium', 'Executive', 'Luxury'],
    industries: ['Fortune 500', 'Investment Banking', 'Private Equity', 'Luxury'],
    features: ['Premium Design', 'Gold Accents', 'Executive Focus'],
    perfectFor: ['C-Suite Executives', 'Board Members', 'Investment Bankers', 'VPs']
  },
  
  // Word Document Templates
  {
    id: 'corporate-word-template',
    name: 'Corporate Word Template',
    description: 'Traditional RTF format optimized for Microsoft Word',
    emoji: '📄',
    category: 'professional',
    stylePreset: 'corporate-traditional',
    tags: ['Word Compatible', 'RTF', 'Editable'],
    industries: ['All Industries'],
    features: ['Word Compatible', 'Easy Editing', 'Professional Format'],
    perfectFor: ['Users who prefer Word', 'Corporate Environments', 'Easy Customization']
  },
  {
    id: 'modern-word-template',
    name: 'Modern Word Template',
    description: 'Contemporary RTF design for Microsoft Word',
    emoji: '📝',
    category: 'professional',
    stylePreset: 'modern-professional',
    tags: ['Word Compatible', 'Modern', 'RTF'],
    industries: ['All Industries'],
    features: ['Word Compatible', 'Modern Design', 'Easy Formatting'],
    perfectFor: ['Modern Professionals', 'Tech Workers', 'Consultants']
  },
  
  // Technology Templates
  {
    id: 'software-engineer',
    name: 'Software Engineer Pro',
    description: 'Specialized for full-stack and backend developers',
    emoji: '⚡',
    category: 'technical',
    stylePreset: 'tech-green',
    tags: ['Code-Focused', 'Technical', 'ATS-Ready'],
    industries: ['Technology'],
    features: ['Technical Skills', 'Project Portfolio', 'Code Samples'],
    perfectFor: ['Software Engineers', 'Full-Stack Developers', 'Backend Engineers']
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist Elite',
    description: 'Perfect for data scientists and machine learning engineers',
    emoji: '📊',
    category: 'technical',
    stylePreset: 'cyber-blue',
    tags: ['Analytics', 'Research', 'Modern'],
    industries: ['Technology'],
    features: ['Statistical Analysis', 'ML Projects', 'Research Papers'],
    perfectFor: ['Data Scientists', 'ML Engineers', 'Research Scientists']
  },
  
  // Creative Templates
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    description: 'Visual-focused design for graphic artists',
    emoji: '🖌️',
    category: 'creative',
    stylePreset: 'vibrant-purple',
    tags: ['Visual', 'Artistic', 'Portfolio-Ready'],
    industries: ['Creative'],
    features: ['Portfolio Showcase', 'Design Skills', 'Creative Projects'],
    perfectFor: ['Graphic Designers', 'Visual Artists', 'Brand Designers']
  },
  {
    id: 'ux-ui-designer',
    name: 'UX/UI Designer',
    description: 'User experience and interface design roles',
    emoji: '📐',
    category: 'creative',
    stylePreset: 'creative-orange',
    tags: ['UX/UI', 'User-Centered', 'Modern'],
    industries: ['Creative', 'Technology'],
    features: ['Design Process', 'User Research', 'Prototyping'],
    perfectFor: ['UX Designers', 'UI Designers', 'Product Designers']
  },
  {
    id: 'copywriter',
    name: 'Copywriter',
    description: 'Creative writing and copywriting specialists',
    emoji: '✍️',
    category: 'creative',
    stylePreset: 'vibrant-purple',
    tags: ['Writing', 'Creative', 'Persuasive'],
    industries: ['Creative'],
    features: ['Writing Portfolio', 'Campaign Results', 'Brand Voice'],
    perfectFor: ['Copywriters', 'Content Writers', 'Marketing Writers']
  },
  
  // Business Templates
  {
    id: 'executive-leader',
    name: 'Executive Leader',
    description: 'For senior management and C-level executives',
    emoji: '👔',
    category: 'professional',
    stylePreset: 'executive-navy',
    tags: ['Executive', 'Leadership', 'Premium'],
    industries: ['Business'],
    features: ['Leadership Experience', 'Strategic Vision', 'Board Experience'],
    perfectFor: ['CEOs', 'Directors', 'VPs', 'Senior Managers']
  },
  {
    id: 'business-professional',
    name: 'Business Professional',
    description: 'Management, sales, and operations professionals',
    emoji: '📊',
    category: 'professional',
    stylePreset: 'classic-blue',
    tags: ['Professional', 'Leadership', 'Results-Driven'],
    industries: ['Business'],
    features: ['Management Experience', 'Team Leadership', 'Business Results'],
    perfectFor: ['Managers', 'Sales Professionals', 'Business Analysts']
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

export const getWordTemplates = (): TemplateConfig[] => {
  return templateConfigs.filter(template => 
    template.id.includes('word-template') || 
    template.tags.includes('RTF') || 
    template.tags.includes('Word Compatible')
  );
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