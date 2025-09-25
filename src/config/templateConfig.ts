

// ATS-Optimized Template Configuration System - Comprehensive Template Library
// Designed for maximum ATS compatibility with clean, readable layouts

export interface StylePreset {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  headerBg: string;
  headerText: string;
  sectionBorder: string;
  layout: 'professional' | 'traditional' | 'sidebar' | 'academic' | 'executive' | 'minimal' | 'modern' | 'creative' | 'technical';
  spacing: 'compact' | 'standard' | 'spacious';
  typography: 'serif' | 'sans' | 'modern';
  visualElements: {
    headerStyle: 'banner' | 'centered' | 'minimal' | 'traditional';
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
  category: 'professional' | 'creative' | 'technical' | 'student' | 'executive' | 'minimalist';
  stylePreset: string;
  tags: string[];
  industries: string[];
  features: string[];
  perfectFor: string[];
}

// Comprehensive Style Presets - Multiple Categories
export const stylePresets: StylePreset[] = [
  // PROFESSIONAL CATEGORY (6 Templates)
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    primary: '0 0% 20%', // Black
    secondary: '0 0% 40%', // Dark Gray
    accent: '0 0% 70%', // Light Gray
    headerBg: 'hsl(0 0% 98%)',
    headerText: '0 0% 20%',
    sectionBorder: '0 0% 20%',
    layout: 'professional',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'traditional',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    primary: '0 0% 15%', // Very Dark Gray
    secondary: '0 0% 35%', // Medium Gray
    accent: '0 0% 75%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 15%',
    sectionBorder: '0 0% 15%',
    layout: 'professional',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'timeless-professional',
    name: 'Timeless Professional',
    primary: '0 0% 25%', // Charcoal
    secondary: '0 0% 45%', // Medium Gray
    accent: '0 0% 80%', // Light Gray
    headerBg: 'hsl(0 0% 97%)',
    headerText: '0 0% 25%',
    sectionBorder: '0 0% 25%',
    layout: 'traditional',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'traditional',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'executive-blue',
    name: 'Executive Blue',
    primary: '220 100% 25%', // Professional Blue
    secondary: '220 20% 30%', // Dark Gray Blue
    accent: '220 100% 85%', // Light Blue
    headerBg: 'hsl(220 100% 25%)',
    headerText: '0 0% 100%',
    sectionBorder: '220 100% 25%',
    layout: 'executive',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'business-classic',
    name: 'Business Classic',
    primary: '0 0% 18%', // Dark Gray
    secondary: '0 0% 38%', // Medium Gray
    accent: '0 0% 72%', // Light Gray
    headerBg: 'hsl(0 0% 99%)',
    headerText: '0 0% 18%',
    sectionBorder: '0 0% 18%',
    layout: 'professional',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'corporate-traditional',
    name: 'Corporate Traditional',
    primary: '0 0% 22%', // Dark Gray
    secondary: '0 0% 42%', // Medium Gray
    accent: '0 0% 68%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 22%',
    sectionBorder: '0 0% 22%',
    layout: 'traditional',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'traditional',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },

  // STUDENT CATEGORY (4 Templates)
  {
    id: 'modern-student',
    name: 'Modern Student',
    primary: '0 0% 16%', // Very Dark Gray
    secondary: '0 0% 36%', // Medium Gray
    accent: '0 0% 74%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 16%',
    sectionBorder: '0 0% 16%',
    layout: 'modern',
    spacing: 'spacious',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'academic-clean',
    name: 'Academic Clean',
    primary: '0 0% 20%', // Dark Gray
    secondary: '0 0% 40%', // Medium Gray
    accent: '0 0% 70%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 20%',
    sectionBorder: '0 0% 20%',
    layout: 'academic',
    spacing: 'spacious',
    typography: 'serif',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'graduate-fresh',
    name: 'Graduate Fresh',
    primary: '0 0% 19%', // Dark Gray
    secondary: '0 0% 39%', // Medium Gray
    accent: '0 0% 71%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 19%',
    sectionBorder: '0 0% 19%',
    layout: 'modern',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'internship-ready',
    name: 'Internship Ready',
    primary: '0 0% 17%', // Dark Gray
    secondary: '0 0% 37%', // Medium Gray
    accent: '0 0% 73%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 17%',
    sectionBorder: '0 0% 17%',
    layout: 'professional',
    spacing: 'compact',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },

  // MINIMALIST CATEGORY (4 Templates)
  {
    id: 'minimalist-expert',
    name: 'Minimalist Expert',
    primary: '0 0% 15%', // Very Dark Gray
    secondary: '0 0% 35%', // Medium Gray
    accent: '0 0% 75%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 15%',
    sectionBorder: '0 0% 15%',
    layout: 'minimal',
    spacing: 'spacious',
    typography: 'sans',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'clean-minimal',
    name: 'Clean Minimal',
    primary: '0 0% 18%', // Dark Gray
    secondary: '0 0% 38%', // Medium Gray
    accent: '0 0% 72%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 18%',
    sectionBorder: '0 0% 18%',
    layout: 'minimal',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'simple-elegant',
    name: 'Simple Elegant',
    primary: '0 0% 20%', // Dark Gray
    secondary: '0 0% 40%', // Medium Gray
    accent: '0 0% 70%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 20%',
    sectionBorder: '0 0% 20%',
    layout: 'minimal',
    spacing: 'spacious',
    typography: 'serif',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'bare-essentials',
    name: 'Bare Essentials',
    primary: '0 0% 16%', // Very Dark Gray
    secondary: '0 0% 36%', // Medium Gray
    accent: '0 0% 74%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 16%',
    sectionBorder: '0 0% 16%',
    layout: 'minimal',
    spacing: 'compact',
    typography: 'sans',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },

  // CREATIVE CATEGORY (4 Templates)
  {
    id: 'creative-modern',
    name: 'Creative Modern',
    primary: '0 0% 19%', // Dark Gray
    secondary: '0 0% 39%', // Medium Gray
    accent: '0 0% 71%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 19%',
    sectionBorder: '0 0% 19%',
    layout: 'creative',
    spacing: 'spacious',
    typography: 'modern',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'design-focused',
    name: 'Design Focused',
    primary: '0 0% 17%', // Dark Gray
    secondary: '0 0% 37%', // Medium Gray
    accent: '0 0% 73%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 17%',
    sectionBorder: '0 0% 17%',
    layout: 'creative',
    spacing: 'standard',
    typography: 'modern',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'portfolio-ready',
    name: 'Portfolio Ready',
    primary: '0 0% 18%', // Dark Gray
    secondary: '0 0% 38%', // Medium Gray
    accent: '0 0% 72%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 18%',
    sectionBorder: '0 0% 18%',
    layout: 'creative',
    spacing: 'spacious',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'artistic-clean',
    name: 'Artistic Clean',
    primary: '0 0% 20%', // Dark Gray
    secondary: '0 0% 40%', // Medium Gray
    accent: '0 0% 70%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 20%',
    sectionBorder: '0 0% 20%',
    layout: 'creative',
    spacing: 'standard',
    typography: 'modern',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },

  // TECHNICAL CATEGORY (4 Templates)
  {
    id: 'tech-professional',
    name: 'Tech Professional',
    primary: '0 0% 16%', // Very Dark Gray
    secondary: '0 0% 36%', // Medium Gray
    accent: '0 0% 74%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 16%',
    sectionBorder: '0 0% 16%',
    layout: 'technical',
    spacing: 'compact',
    typography: 'sans',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'developer-clean',
    name: 'Developer Clean',
    primary: '0 0% 18%', // Dark Gray
    secondary: '0 0% 38%', // Medium Gray
    accent: '0 0% 72%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 18%',
    sectionBorder: '0 0% 18%',
    layout: 'technical',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'engineering-focused',
    name: 'Engineering Focused',
    primary: '0 0% 19%', // Dark Gray
    secondary: '0 0% 39%', // Medium Gray
    accent: '0 0% 71%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 19%',
    sectionBorder: '0 0% 19%',
    layout: 'technical',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'traditional',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    primary: '0 0% 17%', // Dark Gray
    secondary: '0 0% 37%', // Medium Gray
    accent: '0 0% 73%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 17%',
    sectionBorder: '0 0% 17%',
    layout: 'technical',
    spacing: 'compact',
    typography: 'sans',
    visualElements: {
      headerStyle: 'minimal',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },

  // EXECUTIVE CATEGORY (4 Templates)
  {
    id: 'executive-traditional',
    name: 'Executive Traditional',
    primary: '0 0% 25%', // Charcoal
    secondary: '0 0% 45%', // Medium Gray
    accent: '0 0% 80%', // Light Gray
    headerBg: 'hsl(0 0% 97%)',
    headerText: '0 0% 25%',
    sectionBorder: '0 0% 25%',
    layout: 'executive',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'leadership-focused',
    name: 'Leadership Focused',
    primary: '0 0% 22%', // Dark Gray
    secondary: '0 0% 42%', // Medium Gray
    accent: '0 0% 68%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 22%',
    sectionBorder: '0 0% 22%',
    layout: 'executive',
    spacing: 'standard',
    typography: 'serif',
    visualElements: {
      headerStyle: 'traditional',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'c-suite-ready',
    name: 'C-Suite Ready',
    primary: '0 0% 20%', // Dark Gray
    secondary: '0 0% 40%', // Medium Gray
    accent: '0 0% 70%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 20%',
    sectionBorder: '0 0% 20%',
    layout: 'executive',
    spacing: 'spacious',
    typography: 'serif',
    visualElements: {
      headerStyle: 'banner',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  },
  {
    id: 'senior-management',
    name: 'Senior Management',
    primary: '0 0% 18%', // Dark Gray
    secondary: '0 0% 38%', // Medium Gray
    accent: '0 0% 72%', // Light Gray
    headerBg: 'hsl(0 0% 100%)',
    headerText: '0 0% 18%',
    sectionBorder: '0 0% 18%',
    layout: 'executive',
    spacing: 'standard',
    typography: 'sans',
    visualElements: {
      headerStyle: 'centered',
      decorativeElements: false,
      gradientHeader: false,
      iconAccents: false
    }
  }
];

// Comprehensive Template Configurations - Multiple Categories
export const templateConfigs: TemplateConfig[] = [
  // PROFESSIONAL CATEGORY (6 Templates)
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    description: 'Traditional black and white design for maximum ATS compatibility',
    emoji: '📄',
    category: 'professional',
    stylePreset: 'classic-professional',
    tags: ['Traditional', 'Professional', 'ATS Optimized', 'Classic'],
    industries: ['All Industries'],
    features: ['Traditional Layout', 'Clean Design', 'Maximum ATS Compatibility', 'Professional'],
    perfectFor: ['All Professionals', 'Traditional Industries', 'Government', 'Corporate']
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Contemporary professional design with clean typography',
    emoji: '💼',
    category: 'professional',
    stylePreset: 'modern-professional',
    tags: ['Modern', 'Professional', 'Clean', 'ATS Optimized'],
    industries: ['Technology', 'Consulting', 'Finance', 'Healthcare'],
    features: ['Modern Typography', 'Clean Layout', 'Professional Design', 'ATS Optimized'],
    perfectFor: ['Managers', 'Directors', 'Consultants', 'Team Leads']
  },
  {
    id: 'timeless-professional',
    name: 'Timeless Professional',
    description: 'Elegant and enduring professional design',
    emoji: '🎯',
    category: 'professional',
    stylePreset: 'timeless-professional',
    tags: ['Timeless', 'Elegant', 'Professional', 'ATS Optimized'],
    industries: ['Finance', 'Legal', 'Corporate', 'Government'],
    features: ['Timeless Design', 'Elegant Typography', 'Professional Appeal', 'ATS Optimized'],
    perfectFor: ['Senior Professionals', 'Traditional Industries', 'Government Officials']
  },
  {
    id: 'executive-blue',
    name: 'Executive Blue',
    description: 'Professional blue design for executives and senior leadership',
    emoji: '👔',
    category: 'professional',
    stylePreset: 'executive-blue',
    tags: ['Executive', 'Leadership', 'Professional', 'Colored'],
    industries: ['Finance', 'Banking', 'Insurance', 'Corporate'],
    features: ['Executive Header', 'Professional Blue', 'Leadership Focus', 'ATS Optimized'],
    perfectFor: ['CEOs', 'CFOs', 'COOs', 'VPs', 'Directors']
  },
  {
    id: 'business-classic',
    name: 'Business Classic',
    description: 'Classic business design for corporate professionals',
    emoji: '🏢',
    category: 'professional',
    stylePreset: 'business-classic',
    tags: ['Business', 'Classic', 'Corporate', 'ATS Optimized'],
    industries: ['Corporate', 'Business', 'Consulting', 'Sales'],
    features: ['Business Focus', 'Classic Design', 'Corporate Appeal', 'ATS Optimized'],
    perfectFor: ['Business Professionals', 'Corporate Roles', 'Sales Managers']
  },
  {
    id: 'corporate-traditional',
    name: 'Corporate Traditional',
    description: 'Traditional corporate design for established companies',
    emoji: '📋',
    category: 'professional',
    stylePreset: 'corporate-traditional',
    tags: ['Corporate', 'Traditional', 'Established', 'ATS Optimized'],
    industries: ['Corporate', 'Finance', 'Legal', 'Government'],
    features: ['Corporate Design', 'Traditional Layout', 'Established Appeal', 'ATS Optimized'],
    perfectFor: ['Corporate Professionals', 'Finance Roles', 'Legal Professionals']
  },

  // STUDENT CATEGORY (4 Templates)
  {
    id: 'modern-student',
    name: 'Modern Student',
    description: 'Contemporary design perfect for students and recent graduates',
    emoji: '🎓',
    category: 'student',
    stylePreset: 'modern-student',
    tags: ['Student', 'Modern', 'Graduate', 'ATS Optimized'],
    industries: ['All Industries'],
    features: ['Student Focus', 'Modern Design', 'Graduate Ready', 'ATS Optimized'],
    perfectFor: ['Students', 'Recent Graduates', 'Interns', 'Entry Level']
  },
  {
    id: 'academic-clean',
    name: 'Academic Clean',
    description: 'Clean academic design for research and education professionals',
    emoji: '📚',
    category: 'student',
    stylePreset: 'academic-clean',
    tags: ['Academic', 'Research', 'Clean', 'ATS Optimized'],
    industries: ['Education', 'Research', 'Academia', 'Think Tanks'],
    features: ['Academic Layout', 'Research Focus', 'Clean Design', 'ATS Optimized'],
    perfectFor: ['Students', 'Researchers', 'Academic Professionals']
  },
  {
    id: 'graduate-fresh',
    name: 'Graduate Fresh',
    description: 'Fresh design for new graduates entering the workforce',
    emoji: '🎉',
    category: 'student',
    stylePreset: 'graduate-fresh',
    tags: ['Graduate', 'Fresh', 'Entry Level', 'ATS Optimized'],
    industries: ['All Industries'],
    features: ['Graduate Focus', 'Fresh Design', 'Entry Level Ready', 'ATS Optimized'],
    perfectFor: ['Recent Graduates', 'Entry Level Positions', 'Career Changers']
  },
  {
    id: 'internship-ready',
    name: 'Internship Ready',
    description: 'Compact design perfect for internship applications',
    emoji: '🔍',
    category: 'student',
    stylePreset: 'internship-ready',
    tags: ['Internship', 'Compact', 'Student', 'ATS Optimized'],
    industries: ['All Industries'],
    features: ['Internship Focus', 'Compact Layout', 'Student Ready', 'ATS Optimized'],
    perfectFor: ['Interns', 'Students', 'Part-time Workers']
  },

  // MINIMALIST CATEGORY (4 Templates)
  {
    id: 'minimalist-expert',
    name: 'Minimalist Expert',
    description: 'Clean minimal design with maximum readability',
    emoji: '✨',
    category: 'minimalist',
    stylePreset: 'minimalist-expert',
    tags: ['Minimalist', 'Clean', 'Expert', 'ATS Optimized'],
    industries: ['Technology', 'Design', 'Creative', 'Consulting'],
    features: ['Minimal Design', 'Clean Typography', 'Maximum Readability', 'ATS Optimized'],
    perfectFor: ['Designers', 'Developers', 'Consultants', 'Creative Professionals']
  },
  {
    id: 'clean-minimal',
    name: 'Clean Minimal',
    description: 'Ultra-clean minimal design for modern professionals',
    emoji: '🧹',
    category: 'minimalist',
    stylePreset: 'clean-minimal',
    tags: ['Clean', 'Minimal', 'Modern', 'ATS Optimized'],
    industries: ['Technology', 'Startups', 'Creative', 'Modern Companies'],
    features: ['Ultra Clean', 'Minimal Design', 'Modern Appeal', 'ATS Optimized'],
    perfectFor: ['Tech Professionals', 'Startup Employees', 'Modern Companies']
  },
  {
    id: 'simple-elegant',
    name: 'Simple Elegant',
    description: 'Simple yet elegant design for sophisticated professionals',
    emoji: '💎',
    category: 'minimalist',
    stylePreset: 'simple-elegant',
    tags: ['Simple', 'Elegant', 'Sophisticated', 'ATS Optimized'],
    industries: ['Luxury', 'Consulting', 'Finance', 'Professional Services'],
    features: ['Simple Design', 'Elegant Typography', 'Sophisticated Appeal', 'ATS Optimized'],
    perfectFor: ['Consultants', 'Finance Professionals', 'Luxury Brands']
  },
  {
    id: 'bare-essentials',
    name: 'Bare Essentials',
    description: 'Essential-only design for maximum impact',
    emoji: '⚡',
    category: 'minimalist',
    stylePreset: 'bare-essentials',
    tags: ['Essential', 'Bare', 'Impact', 'ATS Optimized'],
    industries: ['Technology', 'Creative', 'Startups', 'Modern Companies'],
    features: ['Essential Only', 'Bare Design', 'Maximum Impact', 'ATS Optimized'],
    perfectFor: ['Tech Leaders', 'Creative Directors', 'Startup Founders']
  },

  // CREATIVE CATEGORY (4 Templates)
  {
    id: 'creative-modern',
    name: 'Creative Modern',
    description: 'Modern design for creative professionals',
    emoji: '🎨',
    category: 'creative',
    stylePreset: 'creative-modern',
    tags: ['Creative', 'Modern', 'Artistic', 'ATS Optimized'],
    industries: ['Design', 'Marketing', 'Creative', 'Entertainment'],
    features: ['Creative Design', 'Modern Layout', 'Artistic Appeal', 'ATS Optimized'],
    perfectFor: ['Designers', 'Artists', 'Creative Directors', 'Marketing Professionals']
  },
  {
    id: 'design-focused',
    name: 'Design Focused',
    description: 'Design-centric layout for visual professionals',
    emoji: '🎯',
    category: 'creative',
    stylePreset: 'design-focused',
    tags: ['Design', 'Visual', 'Creative', 'ATS Optimized'],
    industries: ['Design', 'Creative', 'Marketing', 'Entertainment'],
    features: ['Design Focus', 'Visual Layout', 'Creative Appeal', 'ATS Optimized'],
    perfectFor: ['UX/UI Designers', 'Graphic Designers', 'Visual Artists']
  },
  {
    id: 'portfolio-ready',
    name: 'Portfolio Ready',
    description: 'Portfolio-style design for showcasing work',
    emoji: '📁',
    category: 'creative',
    stylePreset: 'portfolio-ready',
    tags: ['Portfolio', 'Showcase', 'Creative', 'ATS Optimized'],
    industries: ['Design', 'Creative', 'Freelance', 'Entertainment'],
    features: ['Portfolio Style', 'Work Showcase', 'Creative Layout', 'ATS Optimized'],
    perfectFor: ['Freelancers', 'Portfolio Builders', 'Creative Professionals']
  },
  {
    id: 'artistic-clean',
    name: 'Artistic Clean',
    description: 'Clean artistic design for creative professionals',
    emoji: '🖼️',
    category: 'creative',
    stylePreset: 'artistic-clean',
    tags: ['Artistic', 'Clean', 'Creative', 'ATS Optimized'],
    industries: ['Art', 'Design', 'Creative', 'Entertainment'],
    features: ['Artistic Design', 'Clean Layout', 'Creative Appeal', 'ATS Optimized'],
    perfectFor: ['Artists', 'Creative Professionals', 'Designers']
  },

  // TECHNICAL CATEGORY (4 Templates)
  {
    id: 'tech-professional',
    name: 'Tech Professional',
    description: 'Professional design for technology professionals',
    emoji: '💻',
    category: 'technical',
    stylePreset: 'tech-professional',
    tags: ['Tech', 'Professional', 'Technical', 'ATS Optimized'],
    industries: ['Technology', 'Software', 'IT', 'Engineering'],
    features: ['Tech Focus', 'Professional Design', 'Technical Layout', 'ATS Optimized'],
    perfectFor: ['Software Engineers', 'IT Professionals', 'Tech Leaders']
  },
  {
    id: 'developer-clean',
    name: 'Developer Clean',
    description: 'Clean design for software developers',
    emoji: '👨‍💻',
    category: 'technical',
    stylePreset: 'developer-clean',
    tags: ['Developer', 'Clean', 'Technical', 'ATS Optimized'],
    industries: ['Software', 'Technology', 'IT', 'Startups'],
    features: ['Developer Focus', 'Clean Design', 'Technical Appeal', 'ATS Optimized'],
    perfectFor: ['Software Developers', 'Programmers', 'Tech Professionals']
  },
  {
    id: 'engineering-focused',
    name: 'Engineering Focused',
    description: 'Engineering-focused design for technical professionals',
    emoji: '⚙️',
    category: 'technical',
    stylePreset: 'engineering-focused',
    tags: ['Engineering', 'Technical', 'Professional', 'ATS Optimized'],
    industries: ['Engineering', 'Manufacturing', 'Technology', 'Construction'],
    features: ['Engineering Focus', 'Technical Design', 'Professional Layout', 'ATS Optimized'],
    perfectFor: ['Engineers', 'Technical Professionals', 'Project Managers']
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Data-focused design for analytics professionals',
    emoji: '📊',
    category: 'technical',
    stylePreset: 'data-scientist',
    tags: ['Data', 'Analytics', 'Technical', 'ATS Optimized'],
    industries: ['Data Science', 'Analytics', 'Technology', 'Finance'],
    features: ['Data Focus', 'Analytics Design', 'Technical Layout', 'ATS Optimized'],
    perfectFor: ['Data Scientists', 'Analysts', 'Research Professionals']
  },

  // EXECUTIVE CATEGORY (4 Templates)
  {
    id: 'executive-traditional',
    name: 'Executive Traditional',
    description: 'Traditional executive layout with professional styling',
    emoji: '👑',
    category: 'executive',
    stylePreset: 'executive-traditional',
    tags: ['Executive', 'Traditional', 'Leadership', 'ATS Optimized'],
    industries: ['Finance', 'Banking', 'Corporate', 'Government'],
    features: ['Executive Layout', 'Traditional Design', 'Leadership Focus', 'ATS Optimized'],
    perfectFor: ['Executives', 'Senior Managers', 'C-Suite', 'Directors']
  },
  {
    id: 'leadership-focused',
    name: 'Leadership Focused',
    description: 'Leadership-focused design for senior professionals',
    emoji: '🎖️',
    category: 'executive',
    stylePreset: 'leadership-focused',
    tags: ['Leadership', 'Executive', 'Senior', 'ATS Optimized'],
    industries: ['Corporate', 'Finance', 'Consulting', 'Government'],
    features: ['Leadership Focus', 'Executive Design', 'Senior Appeal', 'ATS Optimized'],
    perfectFor: ['Leaders', 'Senior Executives', 'Directors', 'Managers']
  },
  {
    id: 'c-suite-ready',
    name: 'C-Suite Ready',
    description: 'C-Suite ready design for top executives',
    emoji: '🏆',
    category: 'executive',
    stylePreset: 'c-suite-ready',
    tags: ['C-Suite', 'Executive', 'Top Level', 'ATS Optimized'],
    industries: ['Corporate', 'Finance', 'Consulting', 'Government'],
    features: ['C-Suite Ready', 'Executive Design', 'Top Level Appeal', 'ATS Optimized'],
    perfectFor: ['CEOs', 'CFOs', 'COOs', 'C-Suite Executives']
  },
  {
    id: 'senior-management',
    name: 'Senior Management',
    description: 'Senior management design for experienced leaders',
    emoji: '🎯',
    category: 'executive',
    stylePreset: 'senior-management',
    tags: ['Senior', 'Management', 'Leadership', 'ATS Optimized'],
    industries: ['Corporate', 'Finance', 'Consulting', 'Government'],
    features: ['Senior Focus', 'Management Design', 'Leadership Appeal', 'ATS Optimized'],
    perfectFor: ['Senior Managers', 'Directors', 'VPs', 'Executives']
  }
];

// Helper functions
export const getTemplateById = (id: string): TemplateConfig | undefined => {
  return templateConfigs.find(template => template.id === id);
};

export const getStylePresetById = (id: string): StylePreset | undefined => {
  return stylePresets.find(preset => preset.id === id);
};

export const getTemplatesByCategory = (category: string): TemplateConfig[] => {
  return templateConfigs.filter(template => template.category === category);
};

export const getAllCategories = (): Array<{ id: string; name: string; templates: TemplateConfig[] }> => {
  const categories = [
    { id: 'professional', name: 'Professional' },
    { id: 'student', name: 'Student & Graduate' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'creative', name: 'Creative' },
    { id: 'technical', name: 'Technical' },
    { id: 'executive', name: 'Executive' }
  ];

  return categories.map(category => ({
    ...category,
    templates: getTemplatesByCategory(category.id)
  }));
};

