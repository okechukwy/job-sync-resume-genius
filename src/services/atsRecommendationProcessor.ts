import { EnhancedCVResult } from "./cvEnhancement";

export interface ATSRecommendation {
  id: string;
  section: string;
  type: 'keyword' | 'action-verb' | 'quantification' | 'formatting' | 'professional-language';
  priority: 'high' | 'medium' | 'low';
  original: string;
  suggested: string;
  reasoning: string;
  impact: number; // 1-10 scale
  category: string;
}

export interface RecommendationApplication {
  applied: ATSRecommendation[];
  skipped: ATSRecommendation[];
  conflicts: ATSRecommendation[];
}

export interface SmartApplicationOptions {
  autoApplyLowRisk?: boolean;
  preserveFormatting?: boolean;
  priorityThreshold?: 'high' | 'medium' | 'low';
  selectedCategories?: string[];
  maxChangesPerSection?: number;
}

export class ATSRecommendationProcessor {
  private contentSections: Map<string, string> = new Map();
  private recommendations: ATSRecommendation[] = [];

  constructor(private originalContent: string, private isHtml: boolean = false) {
    this.parseContent();
  }

  private parseContent(): void {
    if (this.isHtml) {
      this.parseHtmlContent();
    } else {
      this.parseTextContent();
    }
  }

  private parseHtmlContent(): void {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.originalContent, 'text/html');
    
    // Extract sections based on common resume structures
    const sections = {
      'Summary': this.extractSection(doc, ['summary', 'objective', 'profile']),
      'Experience': this.extractSection(doc, ['experience', 'work', 'employment']),
      'Education': this.extractSection(doc, ['education', 'academic']),
      'Skills': this.extractSection(doc, ['skills', 'competencies', 'technical']),
      'Projects': this.extractSection(doc, ['projects', 'portfolio']),
      'Achievements': this.extractSection(doc, ['achievements', 'awards', 'accomplishments'])
    };

    Object.entries(sections).forEach(([key, value]) => {
      if (value.trim()) {
        this.contentSections.set(key, value);
      }
    });
  }

  private parseTextContent(): void {
    const lines = this.originalContent.split('\n');
    let currentSection = 'General';
    let sectionContent = '';

    const sectionHeaders = [
      'summary', 'objective', 'profile', 'experience', 'work history', 
      'employment', 'education', 'skills', 'competencies', 'projects', 
      'achievements', 'awards', 'certifications', 'languages'
    ];

    for (const line of lines) {
      const trimmedLine = line.trim().toLowerCase();
      
      // Check if this line is a section header
      const matchedHeader = sectionHeaders.find(header => 
        trimmedLine.includes(header) && trimmedLine.length < 50
      );

      if (matchedHeader) {
        // Save previous section
        if (sectionContent.trim()) {
          this.contentSections.set(currentSection, sectionContent.trim());
        }
        
        // Start new section
        currentSection = this.normalizeSectionName(matchedHeader);
        sectionContent = '';
      } else if (line.trim()) {
        sectionContent += line + '\n';
      }
    }

    // Save final section
    if (sectionContent.trim()) {
      this.contentSections.set(currentSection, sectionContent.trim());
    }
  }

  private extractSection(doc: Document, keywords: string[]): string {
    const elements = doc.querySelectorAll('*');
    let sectionContent = '';
    let capturing = false;
    let captureDepth = 0;

    for (const element of elements) {
      const text = element.textContent?.toLowerCase() || '';
      
      // Check if this element starts a section
      if (keywords.some(keyword => text.includes(keyword)) && text.length < 100) {
        capturing = true;
        captureDepth = this.getElementDepth(element);
        continue;
      }

      // If we're capturing and hit a sibling or parent element, stop
      if (capturing) {
        const currentDepth = this.getElementDepth(element);
        if (currentDepth <= captureDepth && element.textContent?.trim()) {
          // Check if this might be another section header
          const isNewSection = keywords.some(k => text.includes(k)) || 
                              text.length < 50 && /^[A-Z\s]+$/.test(element.textContent?.trim() || '');
          if (isNewSection) break;
        }
        
        if (element.textContent?.trim()) {
          sectionContent += element.textContent + '\n';
        }
      }
    }

    return sectionContent;
  }

  private getElementDepth(element: Element): number {
    let depth = 0;
    let parent = element.parentElement;
    while (parent) {
      depth++;
      parent = parent.parentElement;
    }
    return depth;
  }

  private normalizeSectionName(header: string): string {
    const mapping: Record<string, string> = {
      'summary': 'Summary',
      'objective': 'Summary',
      'profile': 'Summary',
      'experience': 'Experience',
      'work history': 'Experience',
      'employment': 'Experience',
      'education': 'Education',
      'skills': 'Skills',
      'competencies': 'Skills',
      'projects': 'Projects',
      'achievements': 'Achievements',
      'awards': 'Achievements',
      'certifications': 'Certifications',
      'languages': 'Languages'
    };
    
    return mapping[header] || 'General';
  }

  public generateRecommendations(analysisData: any): ATSRecommendation[] {
    this.recommendations = [];

    // Handle direct ATSOptimizationResult format
    if (analysisData.contentOptimizations) {
      this.generateFromATSOptimizations(analysisData);
    }
    // Handle transformed analysis data format
    else if (analysisData.keywords?.missingKeywords) {
      this.generateKeywordRecommendations(analysisData.keywords.missingKeywords);
    }

    // Generate content improvement recommendations
    if (analysisData.improvements) {
      this.generateContentRecommendations(analysisData.improvements);
    }

    // Always generate action verb and quantification recommendations
    this.generateActionVerbRecommendations();
    this.generateQuantificationRecommendations();

    return this.recommendations;
  }

  private generateFromATSOptimizations(atsResult: any): void {
    // Generate from content optimizations
    if (atsResult.contentOptimizations) {
      atsResult.contentOptimizations.forEach((opt: any, index: number) => {
        this.recommendations.push({
          id: `ats-content-${index}`,
          section: opt.section || 'summary',
          type: 'professional-language',
          priority: this.determinePriority(opt.reasoning),
          original: opt.current,
          suggested: opt.improved,
          reasoning: opt.reasoning,
          impact: this.calculateImpact(opt.reasoning),
          category: opt.category || 'professional-language'
        });
      });
    }

    // Generate from keyword matches
    if (atsResult.keywordMatches?.missing?.length > 0) {
      atsResult.keywordMatches.missing.slice(0, 8).forEach((keyword: string, index: number) => {
        const sections = Array.from(this.contentSections.keys());
        const targetSection = sections[index % Math.max(sections.length, 1)] || 'summary';
        const sectionContent = this.contentSections.get(targetSection) || '';
        
        const sentences = sectionContent.split(/[.!?]/);
        const bestSentence = sentences.find(s => s.length > 20 && s.length < 200) || sentences[0] || '';
        
        if (bestSentence) {
          this.recommendations.push({
            id: `ats-keyword-${index}`,
            section: targetSection,
            type: 'keyword',
            priority: 'high',
            original: bestSentence.trim(),
            suggested: this.integrateKeyword(bestSentence.trim(), keyword),
            reasoning: `Add missing ATS keyword "${keyword}" to improve searchability`,
            impact: 8,
            category: 'keyword-integration'
          });
        }
      });
    }

    // Generate from format optimizations
    if (atsResult.formatOptimizations) {
      atsResult.formatOptimizations.forEach((opt: any, index: number) => {
        this.recommendations.push({
          id: `ats-format-${index}`,
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
  }

  private determinePriority(reasoning: string): 'high' | 'medium' | 'low' {
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

  private calculateImpact(reasoning: string): number {
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

  private getFormatImpact(priority: 'high' | 'medium' | 'low'): number {
    switch (priority) {
      case 'high': return 7;
      case 'medium': return 5;
      case 'low': return 3;
      default: return 4;
    }
  }

  private generateKeywordRecommendations(missingKeywords: string[]): void {
    missingKeywords.slice(0, 8).forEach((keyword, index) => {
      const sections = Array.from(this.contentSections.keys());
      const targetSection = sections[index % sections.length];
      const sectionContent = this.contentSections.get(targetSection) || '';
      
      // Find a good insertion point
      const sentences = sectionContent.split(/[.!?]/);
      const bestSentence = sentences.find(s => s.length > 20 && s.length < 200) || sentences[0];
      
      if (bestSentence) {
        this.recommendations.push({
          id: `keyword-${index}`,
          section: targetSection,
          type: 'keyword',
          priority: 'high',
          original: bestSentence.trim(),
          suggested: this.integrateKeyword(bestSentence.trim(), keyword),
          reasoning: `Integrate the missing ATS keyword "${keyword}" to improve searchability`,
          impact: 8,
          category: 'keyword-integration'
        });
      }
    });
  }

  private generateContentRecommendations(improvements: any[]): void {
    improvements.forEach((improvement, index) => {
      if (improvement.section && improvement.suggestion) {
        this.recommendations.push({
          id: `content-${index}`,
          section: improvement.section,
          type: 'professional-language',
          priority: improvement.priority || 'medium',
          original: improvement.currentText || '',
          suggested: improvement.suggestion,
          reasoning: improvement.reason || 'Improve professional language and clarity',
          impact: improvement.impact || 6,
          category: 'professional-language'
        });
      }
    });
  }

  private generateActionVerbRecommendations(): void {
    const actionVerbMap: Record<string, string[]> = {
      'managed': ['directed', 'orchestrated', 'supervised'],
      'helped': ['facilitated', 'supported', 'assisted'],
      'worked': ['collaborated', 'partnered', 'contributed'],
      'created': ['developed', 'engineered', 'designed'],
      'improved': ['optimized', 'enhanced', 'streamlined'],
      'led': ['spearheaded', 'directed', 'guided']
    };

    this.contentSections.forEach((content, section) => {
      Object.entries(actionVerbMap).forEach(([weak, strong]) => {
        const regex = new RegExp(`\\b${weak}\\b`, 'gi');
        const matches = content.match(regex);
        
        if (matches) {
          matches.forEach((match, index) => {
            const context = this.getContextAroundWord(content, match);
            const replacement = strong[index % strong.length];
            
            this.recommendations.push({
              id: `action-verb-${section}-${weak}-${index}`,
              section,
              type: 'action-verb',
              priority: 'medium',
              original: context,
              suggested: context.replace(new RegExp(`\\b${match}\\b`, 'i'), replacement),
              reasoning: `Replace weak action verb "${match}" with stronger alternative "${replacement}"`,
              impact: 5,
              category: 'action-verbs'
            });
          });
        }
      });
    });
  }

  private generateQuantificationRecommendations(): void {
    this.contentSections.forEach((content, section) => {
      // Look for accomplishments that could be quantified
      const sentences = content.split(/[.!?]/).filter(s => s.trim().length > 10);
      
      sentences.forEach((sentence, index) => {
        if (this.couldBeQuantified(sentence)) {
          this.recommendations.push({
            id: `quantify-${section}-${index}`,
            section,
            type: 'quantification',
            priority: 'high',
            original: sentence.trim(),
            suggested: this.suggestQuantification(sentence.trim()),
            reasoning: 'Add specific metrics to demonstrate impact and results',
            impact: 9,
            category: 'quantification'
          });
        }
      });
    });
  }

  private integrateKeyword(sentence: string, keyword: string): string {
    // Smart keyword integration
    if (sentence.includes('using') || sentence.includes('with')) {
      return sentence.replace(/(using|with)/i, `$1 ${keyword} and`);
    }
    
    if (sentence.includes('developed') || sentence.includes('created')) {
      return sentence.replace(/(developed|created)/i, `$1 ${keyword}-powered`);
    }
    
    // Fallback: add at the end
    return `${sentence}, leveraging ${keyword}`;
  }

  private getContextAroundWord(content: string, word: string): string {
    const index = content.toLowerCase().indexOf(word.toLowerCase());
    if (index === -1) return word;
    
    const start = Math.max(0, index - 30);
    const end = Math.min(content.length, index + word.length + 30);
    
    return content.substring(start, end).trim();
  }

  private couldBeQuantified(sentence: string): boolean {
    const quantifiablePatterns = [
      /improved/i, /increased/i, /reduced/i, /saved/i, /generated/i,
      /achieved/i, /delivered/i, /completed/i, /managed/i, /led/i
    ];
    
    return quantifiablePatterns.some(pattern => pattern.test(sentence)) &&
           !(/\d+/.test(sentence)); // Doesn't already have numbers
  }

  private suggestQuantification(sentence: string): string {
    if (/improved/i.test(sentence)) {
      return sentence.replace(/improved/i, 'improved by 25%');
    }
    if (/increased/i.test(sentence)) {
      return sentence.replace(/increased/i, 'increased by 30%');
    }
    if (/reduced/i.test(sentence)) {
      return sentence.replace(/reduced/i, 'reduced by 20%');
    }
    if (/managed|led/i.test(sentence)) {
      return sentence.replace(/(managed|led)/i, '$1 a team of 5+');
    }
    
    return `${sentence} (quantify with specific metrics)`;
  }

  public smartApplyRecommendations(
    recommendations: ATSRecommendation[], 
    options: SmartApplicationOptions = {}
  ): RecommendationApplication {
    const {
      autoApplyLowRisk = true,
      priorityThreshold = 'medium',
      selectedCategories = [],
      maxChangesPerSection = 5
    } = options;

    const applied: ATSRecommendation[] = [];
    const skipped: ATSRecommendation[] = [];
    const conflicts: ATSRecommendation[] = [];

    // Group recommendations by section
    const sectionGroups = this.groupRecommendationsBySection(recommendations);

    Object.entries(sectionGroups).forEach(([section, sectionRecs]) => {
      let appliedInSection = 0;
      
      // Sort by priority and impact
      const sortedRecs = this.sortRecommendationsByPriority(sectionRecs);
      
      for (const rec of sortedRecs) {
        // Check if we should apply this recommendation
        if (appliedInSection >= maxChangesPerSection) {
          skipped.push(rec);
          continue;
        }

        if (selectedCategories.length > 0 && !selectedCategories.includes(rec.category)) {
          skipped.push(rec);
          continue;
        }

        if (!this.meetsThreshold(rec.priority, priorityThreshold)) {
          skipped.push(rec);
          continue;
        }

        // Check for conflicts with already applied changes
        const hasConflict = applied.some(appliedRec => 
          this.hasConflict(rec, appliedRec)
        );

        if (hasConflict) {
          conflicts.push(rec);
          continue;
        }

        // Apply the recommendation
        if (this.applyRecommendation(rec)) {
          applied.push(rec);
          appliedInSection++;
        } else {
          skipped.push(rec);
        }
      }
    });

    return { applied, skipped, conflicts };
  }

  private groupRecommendationsBySection(recommendations: ATSRecommendation[]): Record<string, ATSRecommendation[]> {
    return recommendations.reduce((groups, rec) => {
      if (!groups[rec.section]) {
        groups[rec.section] = [];
      }
      groups[rec.section].push(rec);
      return groups;
    }, {} as Record<string, ATSRecommendation[]>);
  }

  private sortRecommendationsByPriority(recommendations: ATSRecommendation[]): ATSRecommendation[] {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    
    return recommendations.sort((a, b) => {
      // First by priority
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by impact
      return b.impact - a.impact;
    });
  }

  private meetsThreshold(priority: string, threshold: string): boolean {
    const levels = { high: 3, medium: 2, low: 1 };
    return levels[priority as keyof typeof levels] >= levels[threshold as keyof typeof levels];
  }

  private hasConflict(rec1: ATSRecommendation, rec2: ATSRecommendation): boolean {
    // Check if recommendations affect overlapping text
    return rec1.section === rec2.section && 
           rec1.original.includes(rec2.original) || 
           rec2.original.includes(rec1.original);
  }

  private applyRecommendation(recommendation: ATSRecommendation): boolean {
    const sectionContent = this.contentSections.get(recommendation.section);
    if (!sectionContent) return false;

    try {
      const updatedContent = sectionContent.replace(
        recommendation.original,
        recommendation.suggested
      );
      
      this.contentSections.set(recommendation.section, updatedContent);
      return true;
    } catch (error) {
      console.error('Failed to apply recommendation:', error);
      return false;
    }
  }

  public getOptimizedContent(): string {
    if (this.isHtml) {
      return this.reconstructHtmlContent();
    } else {
      return this.reconstructTextContent();
    }
  }

  private reconstructHtmlContent(): string {
    // For HTML content, we need to reconstruct while preserving structure
    let content = this.originalContent;
    
    this.contentSections.forEach((sectionContent, sectionName) => {
      // This is a simplified approach - in production, you'd want more sophisticated HTML manipulation
      content = content.replace(
        new RegExp(`(${sectionName}[\\s\\S]*?)(?=<|\n|$)`, 'i'),
        `$1\n${sectionContent}`
      );
    });
    
    return content;
  }

  private reconstructTextContent(): string {
    const sections: string[] = [];
    
    this.contentSections.forEach((content, sectionName) => {
      sections.push(`${sectionName.toUpperCase()}\n${content}\n`);
    });
    
    return sections.join('\n');
  }

  public generateChangesSummary(applied: ATSRecommendation[]): EnhancedCVResult['changesApplied'] {
    return applied.map(rec => ({
      section: rec.section,
      original: rec.original,
      improved: rec.suggested,
      reasoning: rec.reasoning,
      category: rec.category
    }));
  }
}