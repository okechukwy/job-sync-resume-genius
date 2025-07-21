
import { AnalysisData, KeywordData, SectionScore, Improvement } from "../types/analysisTypes";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  correctedData?: AnalysisData;
}

export const validateAnalysisData = (data: any): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  let correctedData: AnalysisData = { ...data };

  // Validate overall structure
  if (!data || typeof data !== 'object') {
    errors.push('Analysis data is not a valid object');
    return { isValid: false, errors, warnings };
  }

  // Validate scores
  if (typeof data.overallScore !== 'number' || data.overallScore < 0 || data.overallScore > 100) {
    errors.push('Overall score must be a number between 0 and 100');
    if (typeof data.overallScore === 'number') {
      correctedData.overallScore = Math.max(0, Math.min(100, data.overallScore));
      warnings.push('Overall score was clamped to valid range');
    }
  }

  if (typeof data.atsScore !== 'number' || data.atsScore < 0 || data.atsScore > 100) {
    errors.push('ATS score must be a number between 0 and 100');
    if (typeof data.atsScore === 'number') {
      correctedData.atsScore = Math.max(0, Math.min(100, data.atsScore));
      warnings.push('ATS score was clamped to valid range');
    }
  }

  // Validate sections
  if (!data.sections || typeof data.sections !== 'object') {
    errors.push('Sections data is missing or invalid');
  } else {
    const requiredSections = ['contact', 'summary', 'experience', 'education', 'skills', 'formatting'];
    const validStatuses = ['excellent', 'good', 'fair', 'needs_work'];
    
    requiredSections.forEach(section => {
      const sectionData = data.sections[section];
      if (!sectionData) {
        warnings.push(`Missing section: ${section}`);
        correctedData.sections[section] = { score: 0, status: 'needs_work' };
      } else {
        if (typeof sectionData.score !== 'number' || sectionData.score < 0 || sectionData.score > 100) {
          warnings.push(`Invalid score for section ${section}`);
          correctedData.sections[section].score = Math.max(0, Math.min(100, sectionData.score || 0));
        }
        
        if (!validStatuses.includes(sectionData.status)) {
          warnings.push(`Invalid status for section ${section}`);
          correctedData.sections[section].status = 'needs_work';
        }
      }
    });
  }

  // Validate keywords
  if (!data.keywords || typeof data.keywords !== 'object') {
    errors.push('Keywords data is missing or invalid');
    correctedData.keywords = {
      found: 0,
      missing: 0,
      foundKeywords: [],
      missingKeywords: [],
      suggestions: []
    };
  } else {
    const keywords = data.keywords;
    
    // Ensure arrays exist
    if (!Array.isArray(keywords.foundKeywords)) {
      warnings.push('Found keywords is not an array');
      correctedData.keywords.foundKeywords = [];
    }
    
    if (!Array.isArray(keywords.missingKeywords)) {
      warnings.push('Missing keywords is not an array');
      correctedData.keywords.missingKeywords = [];
    }
    
    if (!Array.isArray(keywords.suggestions)) {
      warnings.push('Keyword suggestions is not an array');
      correctedData.keywords.suggestions = [];
    }
    
    // Correct counts to match arrays
    const actualFoundCount = correctedData.keywords.foundKeywords.length;
    const actualMissingCount = correctedData.keywords.missingKeywords.length;
    
    if (keywords.found !== actualFoundCount) {
      warnings.push(`Found keywords count mismatch: expected ${keywords.found}, actual ${actualFoundCount}`);
      correctedData.keywords.found = actualFoundCount;
    }
    
    if (keywords.missing !== actualMissingCount) {
      warnings.push(`Missing keywords count mismatch: expected ${keywords.missing}, actual ${actualMissingCount}`);
      correctedData.keywords.missing = actualMissingCount;
    }
  }

  // Validate improvements
  if (!Array.isArray(data.improvements)) {
    warnings.push('Improvements is not an array');
    correctedData.improvements = [];
  } else {
    const validPriorities = ['high', 'medium', 'low'];
    correctedData.improvements = data.improvements.map((improvement: any, index: number) => {
      if (!improvement || typeof improvement !== 'object') {
        warnings.push(`Invalid improvement at index ${index}`);
        return {
          priority: 'medium' as const,
          issue: 'Invalid improvement data',
          suggestion: 'Please review this improvement'
        };
      }
      
      const correctedImprovement = { ...improvement };
      
      if (!validPriorities.includes(improvement.priority)) {
        warnings.push(`Invalid priority for improvement ${index}`);
        correctedImprovement.priority = 'medium';
      }
      
      if (!improvement.issue || typeof improvement.issue !== 'string') {
        warnings.push(`Invalid issue for improvement ${index}`);
        correctedImprovement.issue = 'Issue description missing';
      }
      
      if (!improvement.suggestion || typeof improvement.suggestion !== 'string') {
        warnings.push(`Invalid suggestion for improvement ${index}`);
        correctedImprovement.suggestion = 'Suggestion missing';
      }
      
      return correctedImprovement;
    });
  }

  // Validate industry and targetRole
  if (!data.industry || typeof data.industry !== 'string') {
    warnings.push('Industry is missing or invalid');
    correctedData.industry = 'Business';
  }
  
  if (!data.targetRole || typeof data.targetRole !== 'string') {
    warnings.push('Target role is missing or invalid');
    correctedData.targetRole = 'Professional';
  }

  const isValid = errors.length === 0;
  
  return {
    isValid,
    errors,
    warnings,
    correctedData: isValid || warnings.length > 0 ? correctedData : undefined
  };
};

export const logValidationResult = (result: ValidationResult, context: string = 'Analysis validation') => {
  if (result.errors.length > 0) {
    console.error(`${context} - Validation errors:`, result.errors);
  }
  
  if (result.warnings.length > 0) {
    console.warn(`${context} - Validation warnings:`, result.warnings);
  }
  
  if (result.isValid) {
    console.log(`${context} - Validation passed`);
  }
};
