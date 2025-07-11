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
  layout: 'professional' | 'creative' | 'technical';
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
  // Professional Presets
  {
    id: 'classic-blue',
    name: 'Classic Blue',
    primary: '220 60% 50%', // Blue
    secondary: '220 15% 25%', // Dark blue-gray
    accent: '220 100% 70%', // Light blue
    headerBg: '220 60% 50%',
    headerText: '0 0% 100%',
    sectionBorder: '220 60% 50%',
    layout: 'professional',
    spacing: 'standard'
  },
  {
    id: 'medical-teal',
    name: 'Medical Teal',
    primary: '180 60% 45%', // Teal
    secondary: '180 20% 30%', // Dark teal
    accent: '180 80% 70%', // Light teal
    headerBg: '180 60% 45%',
    headerText: '0 0% 100%',
    sectionBorder: '180 60% 45%',
    layout: 'professional',
    spacing: 'spacious'
  },
  {
    id: 'executive-navy',
    name: 'Executive Navy',
    primary: '220 80% 25%', // Navy
    secondary: '220 40% 20%', // Dark navy
    accent: '220 60% 60%', // Light navy
    headerBg: '220 80% 25%',
    headerText: '0 0% 100%',
    sectionBorder: '220 80% 25%',
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
  // Healthcare Templates
  {
    id: 'medical-doctor',
    name: 'Medical Doctor',
    description: 'Sophisticated template for physicians and specialists',
    emoji: '👨‍⚕️',
    category: 'professional',
    stylePreset: 'medical-teal',
    tags: ['Medical', 'Professional', 'Prestigious'],
    industries: ['Healthcare'],
    features: ['Medical Credentials', 'Clinical Experience', 'Research & Publications'],
    perfectFor: ['Medical Doctors', 'Specialists', 'Surgeons', 'Department Heads']
  },
  {
    id: 'registered-nurse',
    name: 'Registered Nurse',
    description: 'Caring design for nursing professionals',
    emoji: '👩‍⚕️',
    category: 'professional',
    stylePreset: 'medical-teal',
    tags: ['Compassionate', 'Professional', 'Detailed'],
    industries: ['Healthcare'],
    features: ['Clinical Skills', 'Patient Care', 'Certifications'],
    perfectFor: ['Registered Nurses', 'Nurse Practitioners', 'Clinical Nurses']
  },
  {
    id: 'mental-health-professional',
    name: 'Mental Health Professional',
    description: 'Psychologists, counselors, and therapists',
    emoji: '🧠',
    category: 'professional',
    stylePreset: 'medical-teal',
    tags: ['Empathetic', 'Professional', 'Trustworthy'],
    industries: ['Healthcare'],
    features: ['Therapeutic Approach', 'Specializations', 'Client Outcomes'],
    perfectFor: ['Psychologists', 'Counselors', 'Therapists', 'Social Workers']
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