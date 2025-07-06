import { AnalysisData } from "../types/analysisTypes";

export const mockAnalysisData: AnalysisData = {
  overallScore: 72,
  atsScore: 68,
  sections: {
    contact: { score: 95, status: 'excellent' },
    summary: { score: 45, status: 'needs_work' },
    experience: { score: 78, status: 'good' },
    education: { score: 85, status: 'good' },
    skills: { score: 60, status: 'fair' },
    formatting: { score: 70, status: 'fair' }
  },
  keywords: {
    found: 12,
    missing: 8,
    suggestions: ['JavaScript', 'React', 'Node.js', 'AWS', 'Agile', 'SQL', 'Git', 'Docker']
  },
  improvements: [
    {
      priority: 'high',
      issue: 'Missing professional summary',
      suggestion: 'Add a compelling 2-3 sentence summary highlighting your key achievements'
    },
    {
      priority: 'high', 
      issue: 'Limited quantifiable achievements',
      suggestion: 'Include specific numbers and metrics in your experience descriptions'
    },
    {
      priority: 'medium',
      issue: 'Skills section needs updating',
      suggestion: 'Add more relevant technical skills and certifications'
    },
    {
      priority: 'medium',
      issue: 'ATS formatting issues',
      suggestion: 'Simplify formatting and avoid complex layouts that ATS systems might miss'
    },
    {
      priority: 'low',
      issue: 'Consider adding volunteer work',
      suggestion: 'Include relevant volunteer experience to show well-roundedness'
    }
  ]
};