export const baseLayoutStyles = {
  'classic-professional': {
    headerBg: 'bg-gradient-to-r from-slate-50 to-gray-100',
    headerText: 'text-slate-900',
    accentColor: 'text-slate-700',
    borderColor: 'border-slate-200',
    sectionBorder: 'border-l-4 border-slate-600 pl-4',
    layout: 'single-column',
    spacing: 'standard'
  },
  'modern-minimalist': {
    headerBg: 'bg-white',
    headerText: 'text-gray-900',
    accentColor: 'text-gray-600',
    borderColor: 'border-gray-100',
    sectionBorder: 'border-l-2 border-gray-300 pl-6',
    layout: 'clean-geometry',
    spacing: 'spacious'
  },
  'creative-showcase': {
    headerBg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
    headerText: 'text-white',
    accentColor: 'text-purple-300',
    borderColor: 'border-purple-200',
    sectionBorder: 'border-l-6 border-purple-400 pl-4',
    layout: 'visual-hierarchy',
    spacing: 'dynamic'
  },
  'executive-premium': {
    headerBg: 'bg-gradient-to-r from-slate-900 to-gray-800',
    headerText: 'text-white',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-200',
    sectionBorder: 'border-l-4 border-amber-500 pl-4',
    layout: 'sophisticated',
    spacing: 'premium'
  },
  'tech-forward': {
    headerBg: 'bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900',
    headerText: 'text-white',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-300',
    sectionBorder: 'border-l-4 border-blue-400 pl-4',
    layout: 'grid-based',
    spacing: 'compact'
  },
  'healthcare': {
    headerBg: 'bg-gradient-to-r from-teal-500 to-blue-600',
    headerText: 'text-white',
    accentColor: 'text-teal-600',
    borderColor: 'border-teal-300',
    sectionBorder: 'border-l-4 border-teal-500 pl-4',
    layout: 'medical-professional',
    spacing: 'clean'
  }
} as const;

export const templateOverrides = {
  // Creative templates
  'art-director': { headerBg: 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500' },
  'brand-manager': { headerBg: 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-500' },
  'content-creator': { headerBg: 'bg-gradient-to-br from-green-500 via-teal-500 to-blue-500' },
  'graphic-designer': { headerBg: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600' },
  'marketing-manager': { headerBg: 'bg-gradient-to-br from-orange-600 via-yellow-500 to-red-500' },
  'social-media-manager': { headerBg: 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' },
  
  // Tech templates
  'software-engineer-pro': { accentColor: 'text-blue-400', headerBg: 'bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900' },
  'frontend-developer': { accentColor: 'text-green-400', headerBg: 'bg-gradient-to-r from-gray-900 via-green-900 to-teal-900' },
  'ai-ml-engineer': { accentColor: 'text-purple-400', headerBg: 'bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900' },
  'cloud-architect': { accentColor: 'text-cyan-400', headerBg: 'bg-gradient-to-r from-gray-900 via-cyan-900 to-blue-900' },
  'cybersecurity-expert': { accentColor: 'text-red-400', headerBg: 'bg-gradient-to-r from-gray-900 via-red-900 to-orange-900' },
  
  // Executive templates
  'corporate-finance': { accentColor: 'text-gold-400', sectionBorder: 'border-l-4 border-yellow-600 pl-4' },
  'investment-banker': { accentColor: 'text-emerald-400', sectionBorder: 'border-l-4 border-emerald-600 pl-4' },
  
  // Healthcare templates - Enhanced styling for medical templates
  'healthcare-specialist': { 
    accentColor: 'text-teal-600', 
    sectionBorder: 'border-l-4 border-teal-500 pl-4',
    headerBg: 'bg-gradient-to-r from-teal-500 to-blue-600',
    headerText: 'text-white'
  },
  'medical-doctor': { 
    accentColor: 'text-teal-600', 
    sectionBorder: 'border-l-4 border-teal-500 pl-4',
    headerBg: 'bg-gradient-to-r from-teal-500 to-blue-600',
    headerText: 'text-white',
    borderColor: 'border-teal-200'
  },
  'registered-nurse': { 
    accentColor: 'text-green-600', 
    sectionBorder: 'border-l-4 border-green-500 pl-4',
    headerBg: 'bg-gradient-to-r from-green-50 to-teal-50' 
  },
  'pharmacist-pro': { 
    accentColor: 'text-purple-600', 
    sectionBorder: 'border-l-4 border-purple-500 pl-4',
    headerBg: 'bg-gradient-to-r from-purple-50 to-blue-50' 
  },
  
  // Other specialized templates
  'recent-graduate': { accentColor: 'text-teal-600', sectionBorder: 'border-l-4 border-teal-500 pl-4' }
} as const;