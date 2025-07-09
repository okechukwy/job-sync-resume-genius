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
    headerBg: 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50',
    headerText: 'text-gray-900',
    accentColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    sectionBorder: 'border-l-6 border-gradient-to-b from-purple-400 to-pink-400 pl-4',
    layout: 'visual-hierarchy',
    spacing: 'dynamic'
  },
  'executive-premium': {
    headerBg: 'bg-gradient-to-r from-slate-900 to-gray-800',
    headerText: 'text-white',
    accentColor: 'text-amber-600',
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
  }
} as const;

export const templateOverrides = {
  'tech-professional': { accentColor: 'text-blue-600', sectionBorder: 'border-l-4 border-blue-600 pl-4' },
  'creative-professional': { accentColor: 'text-purple-600', sectionBorder: 'border-l-4 border-purple-400 pl-4' },
  'healthcare-specialist': { accentColor: 'text-green-600', sectionBorder: 'border-l-4 border-green-500 pl-4' },
  'finance-expert': { accentColor: 'text-slate-700', sectionBorder: 'border-l-4 border-slate-600 pl-4' },
  'executive-leader': { accentColor: 'text-amber-700', sectionBorder: 'border-l-4 border-amber-600 pl-4' },
  'recent-graduate': { accentColor: 'text-teal-600', sectionBorder: 'border-l-4 border-teal-500 pl-4' }
} as const;