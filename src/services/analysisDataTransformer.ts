import { ATSOptimizationResult } from "@/services/openaiServices";
import { ATSRecommendation } from "@/services/atsRecommendationProcessor";
import { AnalysisData } from "@/components/cv-analysis/types/analysisTypes";

export interface TransformedAnalysisData {
  recommendations: ATSRecommendation[];
  analysisData: AnalysisData;
}

export class AnalysisDataTransformer {
  static transformATSResultToRecommendations(
    atsResult: ATSOptimizationResult,
    originalContent: string
  ): ATSRecommendation[] {
    const recommendations: ATSRecommendation[] = [];
    
    // Sanitize input content to remove any binary artifacts
    const cleanContent = this.sanitizeContent(originalContent);

    // Transform content optimizations
    if (atsResult.contentOptimizations) {
      atsResult.contentOptimizations.forEach((opt, index) => {
        // Sanitize recommendation content
        const cleanOriginal = this.sanitizeContent(opt.current);
        const cleanImproved = this.sanitizeContent(opt.improved);
        
        // Skip recommendations with binary artifacts
        if (this.containsBinaryArtifacts(cleanOriginal) || this.containsBinaryArtifacts(cleanImproved)) {
          return;
        }
        
        recommendations.push({
          id: `content-${index}`,
          section: opt.section || 'summary',
          type: 'professional-language',
          priority: this.determinePriority(opt.reasoning),
          original: cleanOriginal,
          suggested: cleanImproved,
          reasoning: opt.reasoning,
          impact: this.calculateImpact(opt.reasoning),
          category: opt.category || 'professional-language'
        });
      });
    }

    // Transform keyword recommendations
    if (atsResult.keywordMatches?.missing?.length > 0) {
      atsResult.keywordMatches.missing.slice(0, 8).forEach((keyword, index) => {
        const targetSection = this.selectBestSection(keyword, cleanContent);
        const contextSnippet = this.extractContext(targetSection, cleanContent);
        
        // Skip if context contains binary artifacts
        if (this.containsBinaryArtifacts(contextSnippet.original)) {
          return;
        }
        
        recommendations.push({
          id: `keyword-${index}`,
          section: targetSection,
          type: 'keyword',
          priority: 'high',
          original: contextSnippet.original,
          suggested: this.integrateKeyword(contextSnippet.original, keyword),
          reasoning: `Add missing ATS keyword "${keyword}" to improve searchability`,
          impact: 8,
          category: 'keyword-integration'
        });
      });
    }

    // Transform format optimizations
    if (atsResult.formatOptimizations) {
      atsResult.formatOptimizations.forEach((opt, index) => {
        recommendations.push({
          id: `format-${index}`,
          section: 'formatting',
          type: 'formatting',
          priority: opt.priority,
          original: opt.issue,
          suggested: opt.recommendation,
          reasoning: `Format optimization: ${opt.recommendation}`,
          impact: this.getFormatImpact(opt.priority),
          category: 'formatting'
        });
      });
    }

    return recommendations;
  }

  static transformATSResultToAnalysisData(
    atsResult: ATSOptimizationResult,
    industry: string = 'Business'
  ): AnalysisData {
    return {
      overallScore: Math.round((atsResult.atsScore / 100) * 100),
      atsScore: atsResult.atsScore,
      sections: this.generateSectionScores(atsResult),
      keywords: {
        found: atsResult.keywordMatches?.found?.length || 0,
        missing: atsResult.keywordMatches?.missing?.length || 0,
        suggestions: atsResult.keywordMatches?.suggestions || [],
        foundKeywords: atsResult.keywordMatches?.found || [],
        missingKeywords: atsResult.keywordMatches?.missing || []
      },
      improvements: this.transformToImprovements(atsResult),
      industry,
      targetRole: 'Professional'
    };
  }

  private static determinePriority(reasoning: string): 'high' | 'medium' | 'low' {
    const highPriorityKeywords = ['critical', 'essential', 'important', 'must', 'required'];
    const lowPriorityKeywords = ['optional', 'minor', 'slight', 'consider'];
    
    const lowerReasoning = reasoning.toLowerCase();
    
    if (highPriorityKeywords.some(keyword => lowerReasoning.includes(keyword))) {
      return 'high';
    }
    if (lowPriorityKeywords.some(keyword => lowerReasoning.includes(keyword))) {
      return 'low';
    }
    return 'medium';
  }

  private static calculateImpact(reasoning: string): number {
    const impactKeywords = {
      high: ['significantly', 'greatly', 'substantial', 'major'],
      medium: ['moderately', 'improve', 'enhance', 'better'],
      low: ['slightly', 'minor', 'small']
    };

    const lowerReasoning = reasoning.toLowerCase();
    
    if (impactKeywords.high.some(keyword => lowerReasoning.includes(keyword))) {
      return 8;
    }
    if (impactKeywords.medium.some(keyword => lowerReasoning.includes(keyword))) {
      return 6;
    }
    return 4;
  }

  private static selectBestSection(keyword: string, content: string): string {
    const sections = ['summary', 'experience', 'skills', 'education'];
    const keywordLower = keyword.toLowerCase();
    
    // Smart section selection based on keyword type
    if (keywordLower.includes('skill') || keywordLower.includes('technology')) {
      return 'skills';
    }
    if (keywordLower.includes('education') || keywordLower.includes('degree')) {
      return 'education';
    }
    if (keywordLower.includes('manage') || keywordLower.includes('lead')) {
      return 'experience';
    }
    
    return 'summary'; // Default fallback
  }

  private static extractContext(section: string, content: string): { original: string; section: string } {
    const lines = content.split('\n').filter(line => line.trim());
    
    // Find section headers and extract relevant content
    const sectionIndex = lines.findIndex(line => 
      line.toLowerCase().includes(section.toLowerCase())
    );
    
    if (sectionIndex !== -1 && sectionIndex + 1 < lines.length) {
      const nextLine = lines[sectionIndex + 1];
      if (nextLine && nextLine.length > 20) {
        return { original: nextLine, section };
      }
    }
    
    // Fallback: find a good sentence
    const goodSentence = lines.find(line => 
      line.length > 30 && line.length < 150 && line.includes('.')
    );
    
    return { 
      original: goodSentence || lines[0] || '', 
      section 
    };
  }

  private static integrateKeyword(original: string, keyword: string): string {
    // Smart keyword integration
    const words = original.split(' ');
    const insertIndex = Math.min(words.length - 1, 3); // Insert near the beginning
    
    words.splice(insertIndex, 0, keyword);
    return words.join(' ');
  }

  private static getFormatImpact(priority: 'high' | 'medium' | 'low'): number {
    switch (priority) {
      case 'high': return 7;
      case 'medium': return 5;
      case 'low': return 3;
      default: return 4;
    }
  }

  private static generateSectionScores(atsResult: ATSOptimizationResult): Record<string, { score: number; status: string }> {
    const baseScore = atsResult.atsScore;
    
    return {
      summary: { score: Math.max(60, baseScore - 10), status: baseScore > 70 ? 'good' : 'needs-improvement' },
      experience: { score: Math.max(65, baseScore - 5), status: baseScore > 75 ? 'good' : 'needs-improvement' },
      skills: { score: Math.max(70, baseScore), status: baseScore > 80 ? 'good' : 'needs-improvement' },
      education: { score: Math.max(75, baseScore + 5), status: baseScore > 85 ? 'good' : 'needs-improvement' },
      keywords: { score: Math.max(50, baseScore - 20), status: baseScore > 60 ? 'good' : 'needs-improvement' }
    };
  }

  private static transformToImprovements(atsResult: ATSOptimizationResult) {
    const improvements = [];
    
    // Add format optimizations as improvements
    if (atsResult.formatOptimizations) {
      improvements.push(...atsResult.formatOptimizations.map(opt => ({
        priority: opt.priority,
        issue: opt.issue,
        suggestion: opt.recommendation
      })));
    }
    
    // Add keyword improvements
    if (atsResult.keywordMatches?.missing?.length > 0) {
      improvements.push({
        priority: 'high' as const,
        issue: 'Missing critical ATS keywords',
        suggestion: `Add these keywords: ${atsResult.keywordMatches.missing.slice(0, 5).join(', ')}`
      });
    }
    
    return improvements;
  }

  // Content sanitization methods
  private static sanitizeContent(content: string): string {
    if (!content) return '';
    
    return content
      .replace(/bjbj[^\s]*/gi, '') // Remove bjbj artifacts
      .replace(/\x00+/g, ' ') // Replace null bytes
      .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Remove non-printable characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  private static containsBinaryArtifacts(text: string): boolean {
    if (!text) return false;
    
    return text.toLowerCase().includes('bjbj') ||
           text.includes('\x00') ||
           text.toLowerCase().includes('ole2') ||
           text.toLowerCase().includes('compound') ||
           /^[A-Z]{8,}/.test(text); // Long uppercase sequences often indicate metadata
  }
}