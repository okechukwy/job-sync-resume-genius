import { readFileContentWithMetadata, FileReadResult } from './fileReader';
import { analyzeJobContext, generateCareerGuidance, EnhancedMatchAnalysis, SkillAnalysis } from './contextualAnalyzer';
import { extractEnhancedKeywords, ExtractedKeyword } from './enhancedKeywordExtractor';
import { parseResumeContent, ParsedResumeContent } from './resumeContentParser';
import { generatePersonalizedLearningPath, PersonalizedLearningPath } from './dynamicLearningPaths';
import { analyzeCompetitivePosition, MarketIntelligence, CompetitivePositioning } from './competitiveAnalysis';
import { SKILL_TAXONOMY, INDUSTRY_MATRICES } from './skillTaxonomy';

export interface JobMatchingResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  skillsGap: Array<{
    skill: string;
    importance: 'High' | 'Medium' | 'Low';
    hasSkill: boolean;
  }>;
  recommendations: string[];
  proTips: string[];
  enhancedAnalysis?: EnhancedMatchAnalysis;
  processingResult?: FileReadResult;
  analysisConfidence: 'high' | 'medium' | 'low';
  analysisWarnings: string[];
  personalizedInsights?: PersonalizedInsights;
}

export interface PersonalizedInsights {
  resumeProfile: ParsedResumeContent;
  learningPaths: PersonalizedLearningPath[];
  marketIntelligence: MarketIntelligence;
  competitivePosition: CompetitivePositioning;
  contextualRecommendations: ContextualRecommendation[];
}

export interface ContextualRecommendation {
  category: 'immediate' | 'short-term' | 'long-term';
  priority: 'critical' | 'high' | 'medium' | 'low';
  action: string;
  rationale: string;
  timeframe: string;
  resources: string[];
}

// Enhanced main analysis function with personalized insights
export const analyzeJobMatch = async (
  jobDescription: string,
  resumeFile: File,
  manualResumeContent?: string
): Promise<JobMatchingResult> => {
  try {
    let resumeContent: string;
    let processingResult: FileReadResult;
    
    if (manualResumeContent) {
      resumeContent = manualResumeContent;
      processingResult = {
        content: manualResumeContent,
        confidence: 'high',
        extractedWords: manualResumeContent.trim().split(/\s+/).length,
        warnings: [],
        processingMethod: 'Manual text input'
      };
    } else {
      processingResult = await readFileContentWithMetadata(resumeFile);
      resumeContent = processingResult.content;
    }
    
    if (resumeContent.trim().length < 50) {
      throw new Error('Insufficient resume content for analysis. Please provide a more detailed resume or use manual input.');
    }
    
    // Parse resume content into structured data
    const resumeProfile = parseResumeContent(resumeContent);
    
    const jobContext = analyzeJobContext(jobDescription);
    
    // Extract enhanced keywords with better context
    const jobKeywords = extractEnhancedKeywords(jobDescription, jobContext.industry);
    const resumeKeywords = extractEnhancedKeywords(resumeContent, jobContext.industry);
    
    // Find matches using enhanced logic
    const matchedKeywords = jobKeywords
      .filter(jobKeyword => 
        resumeKeywords.some(resumeKeyword => 
          resumeKeyword.keyword.toLowerCase() === jobKeyword.keyword.toLowerCase() ||
          jobKeyword.variants.some(variant => 
            resumeKeyword.keyword.toLowerCase().includes(variant.toLowerCase())
          )
        )
      )
      .map(k => k.keyword);
    
    const missingKeywords = jobKeywords
      .filter(jobKeyword => !matchedKeywords.includes(jobKeyword.keyword))
      .map(k => k.keyword);
    
    // Create enhanced skills gap analysis
    const skillsGap = jobKeywords.map(keyword => ({
      skill: keyword.keyword,
      importance: keyword.importance === 'critical' ? 'High' as const : 
                 keyword.importance === 'high' ? 'High' as const :
                 keyword.importance === 'medium' ? 'Medium' as const : 'Low' as const,
      hasSkill: matchedKeywords.includes(keyword.keyword)
    }));
    
    // Generate enhanced analysis with confidence tracking
    const { analysis: enhancedAnalysis, confidence: analysisConfidence, warnings: analysisWarnings } = 
      performEnhancedAnalysis(jobDescription, resumeContent, jobKeywords, resumeKeywords, processingResult, resumeProfile);
    
    // Generate personalized insights
    const personalizedInsights = await generatePersonalizedInsights(
      resumeProfile,
      jobKeywords,
      jobContext,
      enhancedAnalysis
    );
    
    // Generate context-aware recommendations
    const recommendations = generateEnhancedRecommendations(enhancedAnalysis, jobContext, analysisConfidence, personalizedInsights);
    const proTips = generateEnhancedProTips(enhancedAnalysis, jobContext, analysisConfidence, personalizedInsights);
    
    return {
      matchScore: enhancedAnalysis.overallScore,
      matchedKeywords: matchedKeywords.slice(0, 10),
      missingKeywords: missingKeywords.slice(0, 10),
      skillsGap: skillsGap.slice(0, 8),
      recommendations,
      proTips,
      enhancedAnalysis,
      processingResult,
      analysisConfidence,
      analysisWarnings: [...processingResult.warnings, ...analysisWarnings],
      personalizedInsights
    };
  } catch (error) {
    console.error('Error analyzing job match:', error);
    throw new Error(`Failed to analyze job match: ${error.message}`);
  }
};

const generatePersonalizedInsights = async (
  resumeProfile: ParsedResumeContent,
  jobKeywords: ExtractedKeyword[],
  jobContext: any,
  enhancedAnalysis: EnhancedMatchAnalysis
): Promise<PersonalizedInsights> => {
  
  // Generate personalized learning paths for missing critical skills
  const criticalMissingSkills = jobKeywords
    .filter(jk => jk.importance === 'critical' && 
      !resumeProfile.skills.some(rs => rs.skill.toLowerCase() === jk.keyword.toLowerCase()))
    .slice(0, 3); // Focus on top 3 critical gaps
  
  const learningPaths = criticalMissingSkills.map(skill => 
    generatePersonalizedLearningPath(
      skill.keyword,
      resumeProfile,
      jobContext.roleTitle,
      'high' // High urgency for critical skills
    )
  );
  
  // Analyze competitive position with market intelligence
  const { marketIntelligence, positioning: competitivePosition } = analyzeCompetitivePosition(
    resumeProfile,
    jobKeywords,
    jobContext.roleTitle,
    jobContext.industry
  );
  
  // Generate contextual recommendations
  const contextualRecommendations = generateContextualRecommendations(
    resumeProfile,
    jobKeywords,
    jobContext,
    competitivePosition,
    learningPaths
  );
  
  return {
    resumeProfile,
    learningPaths,
    marketIntelligence,
    competitivePosition,
    contextualRecommendations
  };
};

const generateContextualRecommendations = (
  resumeProfile: ParsedResumeContent,
  jobKeywords: ExtractedKeyword[],
  jobContext: any,
  competitivePosition: CompetitivePositioning,
  learningPaths: PersonalizedLearningPath[]
): ContextualRecommendation[] => {
  
  const recommendations: ContextualRecommendation[] = [];
  
  // Immediate actions (this week)
  if (competitivePosition.gapsVsMarket.length > 0) {
    recommendations.push({
      category: 'immediate',
      priority: 'critical',
      action: 'Update resume to highlight transferable skills that address your top market gap',
      rationale: `Your main competitive gap is: ${competitivePosition.gapsVsMarket[0]}`,
      timeframe: '1-2 days',
      resources: ['Resume templates', 'STAR method examples', 'Industry-specific keywords list']
    });
  }
  
  if (resumeProfile.quantifiableResults.length < 2) {
    recommendations.push({
      category: 'immediate',
      priority: 'high',
      action: 'Add 2-3 quantifiable achievements to your resume using specific metrics',
      rationale: 'Quantifiable results are missing but critical for standing out in competitive markets',
      timeframe: '2-3 days',
      resources: ['Achievement statement templates', 'Metrics examples by role', 'Impact calculation guides']
    });
  }
  
  // Short-term actions (3-6 months)
  if (learningPaths.length > 0) {
    const topLearningPath = learningPaths[0];
    recommendations.push({
      category: 'short-term',
      priority: 'critical',
      action: `Complete learning path for ${topLearningPath.skill} to close critical skill gap`,
      rationale: `${topLearningPath.skill} is a critical requirement with high market demand and you currently lack this skill`,
      timeframe: `${topLearningPath.estimatedTimeWeeks} weeks`,
      resources: topLearningPath.learningSteps.flatMap(step => step.resources.map(r => r.name))
    });
  }
  
  if (!resumeProfile.managementExperience && resumeProfile.experienceLevel === 'senior') {
    recommendations.push({
      category: 'short-term',
      priority: 'medium',
      action: 'Seek leadership opportunities like mentoring junior developers or leading a project',
      rationale: 'Leadership experience gap limits progression to senior IC or management roles',
      timeframe: '3-6 months',
      resources: ['Internal mentorship programs', 'Project leadership opportunities', 'Cross-functional collaboration']
    });
  }
  
  // Long-term actions (6+ months)
  if (resumeProfile.industryExperience.length === 0) {
    recommendations.push({
      category: 'long-term',
      priority: 'medium',
      action: `Build domain expertise in ${jobContext.industry} through projects, courses, or industry involvement`,
      rationale: `Industry-specific knowledge provides significant competitive advantage in ${jobContext.industry} roles`,
      timeframe: '6-12 months',
      resources: ['Industry conferences', 'Professional associations', 'Domain-specific projects', 'Industry publications']
    });
  }
  
  if (competitivePosition.marketPosition === 'below-average' || competitivePosition.marketPosition === 'bottom-quartile') {
    recommendations.push({
      category: 'long-term',
      priority: 'high',
      action: 'Consider transitional roles or additional education to build foundational competencies',
      rationale: `Current market position suggests need for strategic skill building before targeting competitive roles`,
      timeframe: '6-18 months',
      resources: ['Bootcamps', 'Professional certifications', 'Entry-level role opportunities', 'Skill-building projects']
    });
  }
  
  return recommendations.sort((a, b) => {
    const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

const performEnhancedAnalysis = (
  jobDescription: string,
  resumeContent: string,
  extractedJobKeywords: ExtractedKeyword[],
  extractedResumeKeywords: ExtractedKeyword[],
  processingResult: FileReadResult,
  resumeProfile?: ParsedResumeContent
): { analysis: EnhancedMatchAnalysis; confidence: JobMatchingResult['analysisConfidence']; warnings: string[] } => {
  const jobContext = analyzeJobContext(jobDescription);
  const warnings: string[] = [];
  
  // Determine analysis confidence based on content quality and parsing success
  let analysisConfidence: JobMatchingResult['analysisConfidence'] = 'high';
  
  if (processingResult.confidence === 'low' || processingResult.extractedWords < 100) {
    analysisConfidence = 'low';
    warnings.push('Analysis confidence is low due to limited resume content extraction');
  } else if (processingResult.confidence === 'medium' || processingResult.extractedWords < 200) {
    analysisConfidence = 'medium';
    warnings.push('Analysis confidence is moderate - consider providing more detailed resume content');
  }
  
  // Add warnings for insufficient skill detection
  if (extractedResumeKeywords.length < 5) {
    warnings.push('Few skills were detected in your resume - this may impact match accuracy');
  }
  
  // Enhanced scoring with resume profile context
  const skillAnalysis: SkillAnalysis[] = extractedJobKeywords.map(jobKeyword => {
    const hasSkill = extractedResumeKeywords.some(resumeKeyword => 
      resumeKeyword.keyword.toLowerCase() === jobKeyword.keyword.toLowerCase() ||
      jobKeyword.variants.some(variant => 
        resumeKeyword.keyword.toLowerCase().includes(variant.toLowerCase())
      )
    );

    // Enhanced proficiency assessment using parsed resume data
    let proficiencyRequired = 'Intermediate';
    let alternativeSkills: string[] = [];
    let learningPath: string[] = [];
    let timeToAcquire = '2-4 months';
    let salaryImpact = 10;

    if (resumeProfile) {
      const userSkill = resumeProfile.skills.find(s => 
        s.skill.toLowerCase() === jobKeyword.keyword.toLowerCase()
      );
      
      if (userSkill) {
        proficiencyRequired = `${userSkill.proficiencyLevel} (${userSkill.yearsOfExperience} years)`;
        timeToAcquire = 'Already acquired';
      } else {
        // Generate personalized learning path and time estimate
        const learningPathData = generatePersonalizedLearningPath(
          jobKeyword.keyword,
          resumeProfile,
          jobContext.roleTitle
        );
        
        timeToAcquire = `${learningPathData.estimatedTimeWeeks} weeks`;
        learningPath = learningPathData.learningSteps.map(step => step.title);
        salaryImpact = Math.round(learningPathData.priorityScore / 5); // Convert priority to salary impact
      }
    }

    const skillTaxonomy = SKILL_TAXONOMY[jobKeyword.keyword];
    const industryMatrix = INDUSTRY_MATRICES[jobContext.industry];
    
    let marketDemand: SkillAnalysis['marketDemand'] = 'medium';
    
    if (industryMatrix) {
      if (industryMatrix.criticalSkills.includes(jobKeyword.keyword)) {
        marketDemand = 'very-high';
      } else if (industryMatrix.emergingSkills.includes(jobKeyword.keyword)) {
        marketDemand = 'high';
      }
      
      salaryImpact = industryMatrix.salaryImpact[jobKeyword.keyword] || salaryImpact;
    }

    if (skillTaxonomy) {
      alternativeSkills = skillTaxonomy.relatedSkills.slice(0, 3);
    }

    return {
      skill: jobKeyword.keyword,
      category: jobKeyword.category,
      importance: jobKeyword.importance,
      marketDemand,
      hasSkill,
      proficiencyRequired,
      alternativeSkills,
      learningPath: learningPath.length > 0 ? learningPath : ['Learn fundamentals', 'Build projects', 'Get certification'],
      timeToAcquire,
      salaryImpact
    };
  });

  const confidenceMultiplier = analysisConfidence === 'high' ? 1.0 : 
                              analysisConfidence === 'medium' ? 0.9 : 0.8;

  const categoryScores = {
    technical: Math.round(calculateCategoryScore(skillAnalysis, 'technical') * confidenceMultiplier),
    soft: calculateCategoryScore(skillAnalysis, 'soft'),
    tools: calculateCategoryScore(skillAnalysis, 'tool'),
    methodologies: calculateCategoryScore(skillAnalysis, 'methodology'),
    domain: calculateCategoryScore(skillAnalysis, 'domain')
  };

  const overallScore = Math.round(calculateEnhancedMatchScore(skillAnalysis, jobContext, resumeProfile) * confidenceMultiplier);

  // Enhanced contextual insights with resume profile
  const contextualInsights = {
    industryFit: calculateIndustryFit(skillAnalysis, jobContext.industry, resumeProfile?.industryExperience),
    roleLevelMatch: calculateRoleLevelMatch(skillAnalysis, jobContext.roleLevel, resumeProfile?.experienceLevel),
    experienceAlignment: calculateExperienceAlignment(resumeContent, jobContext, resumeProfile?.totalYearsExperience),
    cultureMatch: calculateCultureMatch(resumeContent, jobContext.cultureIndicators)
  };

  const competitivePosition = generateCompetitiveAnalysis(skillAnalysis, jobContext, resumeProfile);
  const careerGuidance = generateCareerGuidance(jobContext, skillAnalysis, overallScore);

  const analysis: EnhancedMatchAnalysis = {
    overallScore,
    categoryScores,
    skillAnalysis,
    contextualInsights,
    competitivePosition,
    careerGuidance
  };

  return { analysis, confidence: analysisConfidence, warnings };
};

const calculateEnhancedMatchScore = (skillAnalysis: SkillAnalysis[], jobContext: any, resumeProfile?: ParsedResumeContent): number => {
  let totalWeight = 0;
  let achievedWeight = 0;
  
  skillAnalysis.forEach(skill => {
    let weight = 1;
    
    // Weight by importance
    if (skill.importance === 'critical') weight *= 3;
    else if (skill.importance === 'high') weight *= 2;
    else if (skill.importance === 'medium') weight *= 1.5;
    
    // Adjust for market demand
    if (skill.marketDemand === 'very-high') weight *= 1.3;
    else if (skill.marketDemand === 'high') weight *= 1.15;
    
    // Bonus for experience level match
    if (resumeProfile) {
      const userSkill = resumeProfile.skills.find(s => s.skill.toLowerCase() === skill.skill.toLowerCase());
      if (userSkill && userSkill.yearsOfExperience > 3) {
        weight *= 1.1; // Bonus for experienced use of the skill
      }
    }
    
    totalWeight += weight;
    if (skill.hasSkill) achievedWeight += weight;
  });
  
  // Experience level bonus/penalty
  if (resumeProfile) {
    const experienceBonus = {
      'entry': 0.9,
      'junior': 0.95,
      'mid': 1.0,
      'senior': 1.1,
      'executive': 1.15
    };
    achievedWeight *= experienceBonus[resumeProfile.experienceLevel];
  }
  
  return totalWeight === 0 ? 0 : Math.round((achievedWeight / totalWeight) * 100);
};

const calculateIndustryFit = (skillAnalysis: SkillAnalysis[], industry: string, userIndustryExperience?: string[]): number => {
  const industryMatrix = INDUSTRY_MATRICES[industry];
  if (!industryMatrix) return 75;
  
  const industrySkills = [...industryMatrix.criticalSkills, ...industryMatrix.preferredSkills];
  const matchedIndustrySkills = skillAnalysis.filter(skill => 
    skill.hasSkill && industrySkills.includes(skill.skill)
  );
  
  let baseScore = Math.round((matchedIndustrySkills.length / industrySkills.length) * 100);
  
  // Bonus for direct industry experience
  if (userIndustryExperience && userIndustryExperience.includes(industry)) {
    baseScore = Math.min(100, baseScore + 20);
  }
  
  return baseScore;
};

const calculateRoleLevelMatch = (skillAnalysis: SkillAnalysis[], roleLevel: string, userExperienceLevel?: string): number => {
  const levelMapping = {
    'entry': 1,
    'junior': 2,
    'mid': 3,
    'senior': 4,
    'executive': 5
  };
  
  const roleLevelNum = levelMapping[roleLevel] || 3;
  const userLevelNum = userExperienceLevel ? levelMapping[userExperienceLevel] || 3 : 3;
  
  // Calculate match based on level alignment
  const levelDifference = Math.abs(roleLevelNum - userLevelNum);
  
  if (levelDifference === 0) return 95; // Perfect match
  if (levelDifference === 1) return 85; // Close match
  if (levelDifference === 2) return 70; // Moderate gap
  return 50; // Significant gap
};

const calculateExperienceAlignment = (resumeContent: string, jobContext: any, totalYears?: number): number => {
  if (totalYears !== undefined) {
    const expectedYears = {
      'entry': 2,
      'mid': 5,
      'senior': 8,
      'lead': 10,
      'executive': 15
    };
    
    const expected = expectedYears[jobContext.roleLevel] || 5;
    const ratio = totalYears / expected;
    
    if (ratio >= 0.8 && ratio <= 1.5) return 90;
    if (ratio >= 0.5 && ratio <= 2) return 75;
    return 60;
  }
  
  // Fallback to text analysis
  const experienceMatches = resumeContent.match(/(\d+)\+?\s*years?\s*(?:of\s*)?experience/gi);
  if (!experienceMatches) return 70;
  
  const years = Math.max(...experienceMatches.map(match => parseInt(match.match(/\d+/)?.[0] || '0')));
  return calculateExperienceAlignment(resumeContent, jobContext, years);
};

const generateCompetitiveAnalysis = (skillAnalysis: SkillAnalysis[], jobContext: any, resumeProfile?: ParsedResumeContent) => {
  const strongSkills = skillAnalysis.filter(skill => skill.hasSkill && skill.importance !== 'low');
  const weakAreas = skillAnalysis.filter(skill => !skill.hasSkill && skill.importance === 'critical');
  const rareSkills = skillAnalysis.filter(skill => skill.hasSkill && skill.marketDemand === 'very-high');
  
  let strengthsVsMarket = strongSkills.slice(0, 4).map(skill => 
    `Strong ${skill.category} skills in ${skill.skill}`
  );
  
  let gapsVsMarket = weakAreas.slice(0, 3).map(skill => 
    `Missing critical ${skill.skill} experience`
  );
  
  let uniqueDifferentiators = rareSkills.slice(0, 3).map(skill => 
    `Valuable expertise in ${skill.skill} (high market demand)`
  );
  
  // Enhanced analysis with resume profile
  if (resumeProfile) {
    // Add experience-based strengths
    if (resumeProfile.totalYearsExperience > 5) {
      strengthsVsMarket.unshift(`${resumeProfile.totalYearsExperience}+ years experience above market average`);
    }
    
    if (resumeProfile.managementExperience) {
      uniqueDifferentiators.unshift('Leadership experience sets you apart from pure technical candidates');
    }
    
    if (resumeProfile.careerProgression === 'strong_progression') {
      strengthsVsMarket.push('Demonstrated career growth trajectory');
    }
    
    // Industry-specific differentiators
    if (resumeProfile.industryExperience.length > 1) {
      uniqueDifferentiators.push(`Cross-industry experience (${resumeProfile.industryExperience.join(' + ')}) provides unique perspective`);
    }
  }
  
  return {
    strengthsVsMarket: strengthsVsMarket.slice(0, 4),
    gapsVsMarket: gapsVsMarket.slice(0, 3),
    uniqueDifferentiators: uniqueDifferentiators.slice(0, 3)
  };
};

const generateEnhancedRecommendations = (
  analysis: EnhancedMatchAnalysis, 
  jobContext: any, 
  confidence: JobMatchingResult['analysisConfidence'],
  personalizedInsights?: PersonalizedInsights
): string[] => {
  const recommendations: string[] = [];
  
  // Add confidence-specific recommendations
  if (confidence === 'low') {
    recommendations.push('Consider uploading a more detailed resume or using manual text input for better analysis accuracy');
  }
  
  // Add personalized immediate actions
  if (personalizedInsights?.contextualRecommendations) {
    const immediateActions = personalizedInsights.contextualRecommendations
      .filter(rec => rec.category === 'immediate' && rec.priority === 'critical')
      .slice(0, 2);
    
    recommendations.push(...immediateActions.map(action => action.action));
  }
  
  // Add competitive positioning advice
  if (analysis.competitivePosition.gapsVsMarket.length > 0) {
    recommendations.push(`Address critical gaps: ${analysis.competitivePosition.gapsVsMarket[0]}`);
  }
  
  // Add industry-specific advice
  if (analysis.contextualInsights.industryFit < 70) {
    recommendations.push(`Strengthen your ${jobContext.industry} industry knowledge and terminology`);
  }
  
  return recommendations.slice(0, 4);
};

const generateEnhancedProTips = (
  analysis: EnhancedMatchAnalysis, 
  jobContext: any, 
  confidence: JobMatchingResult['analysisConfidence'],
  personalizedInsights?: PersonalizedInsights
): string[] => {
  const tips: string[] = [];
  
  // Confidence-based tips
  if (confidence === 'low') {
    tips.push('For more accurate analysis, ensure your resume contains detailed descriptions of your experience and skills');
  } else if (confidence === 'medium') {
    tips.push('Your analysis could be more precise with additional resume details in key sections');
  }
  
  // Personalized tips based on market position
  if (personalizedInsights?.competitivePosition) {
    const position = personalizedInsights.competitivePosition.marketPosition;
    const strategy = personalizedInsights.competitivePosition.recommendedStrategy;
    
    tips.push(strategy.primaryFocus);
    
    // Add salary negotiation tips
    if (strategy.salaryNegotiation.negotiationPosition === 'strong') {
      tips.push(`You're in a strong position to negotiate - emphasize: ${strategy.salaryNegotiation.keyLeveragePoints[0]}`);
    } else if (strategy.salaryNegotiation.negotiationPosition === 'weak') {
      tips.push(`Focus on building leverage through: ${strategy.salaryNegotiation.improvementActions[0]}`);
    }
  }
  
  // Learning path tips
  if (personalizedInsights?.learningPaths && personalizedInsights.learningPaths.length > 0) {
    const topPath = personalizedInsights.learningPaths[0];
    tips.push(`Priority learning: ${topPath.skill} - estimated ${topPath.estimatedTimeWeeks} weeks with your background`);
  }
  
  // Industry-specific tips
  if (jobContext.industry === 'technology') {
    tips.push('Include GitHub links and code samples to demonstrate your technical abilities');
  }
  
  return tips.slice(0, 6);
};

const calculateCategoryScore = (skillAnalysis: SkillAnalysis[], category: string): number => {
  const categorySkills = skillAnalysis.filter(skill => skill.category === category);
  if (categorySkills.length === 0) return 100;
  
  const matchedSkills = categorySkills.filter(skill => skill.hasSkill);
  return Math.round((matchedSkills.length / categorySkills.length) * 100);
};
