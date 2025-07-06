export interface SectionScore {
  score: number;
  status: string;
}

export interface KeywordData {
  found: number;
  missing: number;
  suggestions: string[];
}

export interface Improvement {
  priority: 'high' | 'medium' | 'low';
  issue: string;
  suggestion: string;
}

export interface AnalysisData {
  overallScore: number;
  atsScore: number;
  sections: Record<string, SectionScore>;
  keywords: KeywordData;
  improvements: Improvement[];
}

export interface CVAnalysisProps {
  uploadedFile: File;
  onContinue: () => void;
  onReupload: () => void;
}