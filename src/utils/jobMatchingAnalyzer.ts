import { readFileContent } from './fileReader';
import { analyzeJobContext, generateCareerGuidance, EnhancedMatchAnalysis, SkillAnalysis } from './contextualAnalyzer';
import { extractEnhancedKeywords, ExtractedKeyword } from './enhancedKeywordExtractor';
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
}

// Common tech keywords and skills
const COMMON_KEYWORDS = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'PHP',
  'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'GCP', 'Docker',
  'Kubernetes', 'Git', 'API', 'REST', 'GraphQL', 'Microservices', 'Agile', 'Scrum', 'CI/CD',
  'Testing', 'Unit Testing', 'Integration Testing', 'DevOps', 'Linux', 'Windows', 'macOS',
  'Machine Learning', 'AI', 'Data Science', 'Analytics', 'Big Data', 'Blockchain', 'IoT',
  'Mobile Development', 'iOS', 'Android', 'Flutter', 'React Native', 'UI/UX', 'Design',
  'Project Management', 'Leadership', 'Team Management', 'Communication', 'Problem Solving'
];

// Detect industry/role type from job description
const detectIndustryAndRole = (jobDescription: string): { industry: string; level: string; role: string } => {
  const lowerText = jobDescription.toLowerCase();
  
  // Industry detection
  let industry = 'general';
  if (lowerText.includes('software') || lowerText.includes('developer') || lowerText.includes('engineer') || lowerText.includes('tech')) {
    industry = 'technology';
  } else if (lowerText.includes('healthcare') || lowerText.includes('medical') || lowerText.includes('nurse') || lowerText.includes('doctor')) {
    industry = 'healthcare';
  } else if (lowerText.includes('finance') || lowerText.includes('banking') || lowerText.includes('investment') || lowerText.includes('accounting')) {
    industry = 'finance';
  } else if (lowerText.includes('marketing') || lowerText.includes('sales') || lowerText.includes('brand') || lowerText.includes('advertising')) {
    industry = 'marketing';
  } else if (lowerText.includes('design') || lowerText.includes('creative') || lowerText.includes('ux') || lowerText.includes('ui')) {
    industry = 'design';
  }
  
  // Level detection
  let level = 'mid';
  if (lowerText.includes('senior') || lowerText.includes('lead') || lowerText.includes('principal') || lowerText.includes('manager')) {
    level = 'senior';
  } else if (lowerText.includes('junior') || lowerText.includes('entry') || lowerText.includes('graduate') || lowerText.includes('intern')) {
    level = 'entry';
  }
  
  // Role detection
  let role = 'individual contributor';
  if (lowerText.includes('manager') || lowerText.includes('director') || lowerText.includes('lead') || lowerText.includes('supervisor')) {
    role = 'management';
  }
  
  return { industry, level, role };
};

// Generate dynamic pro tips based on analysis results
const generateProTips = (
  jobDescription: string,
  matchScore: number,
  missingKeywords: string[],
  skillsGap: Array<{ skill: string; importance: string; hasSkill: boolean }>
): string[] => {
  const tips: string[] = [];
  const { industry, level, role } = detectIndustryAndRole(jobDescription);
  
  // Score-based tips
  if (matchScore < 50) {
    tips.push('Focus on gaining the fundamental skills listed in the job requirements before applying');
    tips.push('Consider taking online courses or bootcamps to bridge major skill gaps');
  } else if (matchScore < 70) {
    tips.push('You have a good foundation - focus on adding the missing high-priority skills to strengthen your profile');
    tips.push('Highlight transferable skills that relate to the missing requirements');
  } else if (matchScore < 85) {
    tips.push('You\'re a strong candidate - emphasize your matching skills and briefly address any gaps');
    tips.push('Use specific examples and metrics to demonstrate your experience with the skills you have');
  } else {
    tips.push('Excellent match! Focus on crafting a compelling narrative that showcases your expertise');
    tips.push('Quantify your achievements and impact in previous roles to stand out from other qualified candidates');
  }
  
  // Missing keywords specific tips
  const criticalMissing = skillsGap.filter(skill => !skill.hasSkill && skill.importance === 'High');
  if (criticalMissing.length > 0) {
    const topMissing = criticalMissing.slice(0, 3).map(skill => skill.skill);
    tips.push(`Priority focus areas: ${topMissing.join(', ')} - these are critical requirements for this role`);
  }
  
  // Industry-specific tips
  switch (industry) {
    case 'technology':
      if (missingKeywords.some(k => ['GitHub', 'Git', 'API', 'CI/CD'].includes(k))) {
        tips.push('Create a strong GitHub portfolio showcasing your coding projects and contributions');
      }
      if (level === 'senior') {
        tips.push('Emphasize your system design experience and mentoring capabilities');
      }
      break;
    case 'healthcare':
      tips.push('Highlight any patient care experience and relevant certifications or licenses');
      if (missingKeywords.some(k => k.toLowerCase().includes('electronic health record'))) {
        tips.push('Gain familiarity with EHR systems commonly used in healthcare settings');
      }
      break;
    case 'finance':
      tips.push('Emphasize your analytical skills and experience with financial modeling or analysis');
      if (missingKeywords.some(k => ['Excel', 'SQL', 'Python'].includes(k))) {
        tips.push('Strengthen your technical skills in Excel, SQL, or Python for financial analysis');
      }
      break;
    case 'marketing':
      if (missingKeywords.some(k => ['Analytics', 'SEO', 'SEM', 'Social Media'].includes(k))) {
        tips.push('Build experience with digital marketing tools and analytics platforms');
      }
      tips.push('Create a portfolio showcasing successful marketing campaigns and their measurable results');
      break;
    case 'design':
      tips.push('Develop a strong design portfolio that demonstrates your creative process and problem-solving approach');
      if (missingKeywords.some(k => ['Figma', 'Adobe', 'Sketch'].includes(k))) {
        tips.push('Master the design tools mentioned in the job description through practice projects');
      }
      break;
  }
  
  // Role-level tips
  if (role === 'management') {
    tips.push('Highlight your leadership experience, team management skills, and strategic thinking abilities');
    tips.push('Include examples of how you\'ve successfully led teams through challenges or growth');
  }
  
  // General optimization tips
  if (missingKeywords.length > 5) {
    tips.push('Gradually incorporate missing keywords into your resume where truthful and relevant');
  }
  
  tips.push('Tailor your resume summary to mirror the language and priorities mentioned in this job posting');
  tips.push('Use the STAR method (Situation, Task, Action, Result) to describe your achievements with specific metrics');
  
  // Return the most relevant tips (limit to 6)
  return tips.slice(0, 6);
};

// Extract keywords from text using various patterns
const extractKeywords = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const foundKeywords: string[] = [];

  // Check for exact keyword matches
  COMMON_KEYWORDS.forEach(keyword => {
    const lowerKeyword = keyword.toLowerCase();
    if (lowerText.includes(lowerKeyword)) {
      foundKeywords.push(keyword);
    }
  });

  // Extract additional keywords using regex patterns
  const skillPatterns = [
    /(?:experience with|proficient in|skilled in|knowledge of|familiar with)\s+([a-zA-Z0-9\s+#.-]+?)(?:\.|,|;|\n|$)/gi,
    /(?:programming languages?|technologies?|frameworks?|tools?):?\s*([a-zA-Z0-9\s+#,.-]+?)(?:\.|;|\n|$)/gi,
    /\b([A-Z][a-zA-Z]*\.?js)\b/g, // JavaScript frameworks/libraries
    /\b([A-Z]{2,})\b/g // Acronyms
  ];

  skillPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const cleanMatch = match.replace(/[^a-zA-Z0-9\s+#.-]/g, '').trim();
        if (cleanMatch.length > 2 && cleanMatch.length < 30) {
          foundKeywords.push(cleanMatch);
        }
      });
    }
  });

  // Remove duplicates and return
  return [...new Set(foundKeywords)];
};

// Determine importance based on context
const determineImportance = (keyword: string, jobText: string): 'High' | 'Medium' | 'Low' => {
  const lowerJobText = jobText.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  
  // High importance indicators
  if (
    lowerJobText.includes(`required ${lowerKeyword}`) ||
    lowerJobText.includes(`must have ${lowerKeyword}`) ||
    lowerJobText.includes(`essential ${lowerKeyword}`) ||
    lowerJobText.includes(`mandatory ${lowerKeyword}`)
  ) {
    return 'High';
  }
  
  // Medium importance indicators
  if (
    lowerJobText.includes(`preferred ${lowerKeyword}`) ||
    lowerJobText.includes(`desired ${lowerKeyword}`) ||
    lowerJobText.includes(`nice to have ${lowerKeyword}`)
  ) {
    return 'Medium';
  }
  
  // Default to Medium for most skills
  return 'Medium';
};

// Calculate match score based on various factors
const calculateMatchScore = (
  jobKeywords: string[],
  resumeKeywords: string[],
  matchedKeywords: string[],
  missingKeywords: string[]
): number => {
  if (jobKeywords.length === 0) return 0;
  
  const keywordMatchRatio = matchedKeywords.length / jobKeywords.length;
  const resumeKeywordCount = resumeKeywords.length;
  const missingCriticalCount = missingKeywords.length;
  
  // Base score from keyword matching (70% weight)
  let score = keywordMatchRatio * 70;
  
  // Bonus for having many relevant skills (20% weight)
  const skillBonus = Math.min(resumeKeywordCount / 20, 1) * 20;
  score += skillBonus;
  
  // Penalty for missing critical keywords (10% weight)
  const missingPenalty = Math.min(missingCriticalCount / 10, 1) * 10;
  score -= missingPenalty;
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

// Generate recommendations based on analysis
const generateRecommendations = (
  missingKeywords: string[],
  skillsGap: Array<{ skill: string; importance: string; hasSkill: boolean }>
): string[] => {
  const recommendations: string[] = [];
  
  // High priority missing skills
  const highPriorityMissing = skillsGap
    .filter(skill => !skill.hasSkill && skill.importance === 'High')
    .map(skill => skill.skill);
  
  if (highPriorityMissing.length > 0) {
    recommendations.push(
      `Focus on gaining experience with high-priority skills: ${highPriorityMissing.slice(0, 3).join(', ')}`
    );
  }
  
  // Technical skills recommendations
  const techMissing = missingKeywords.filter(keyword => 
    ['JavaScript', 'TypeScript', 'React', 'Python', 'AWS', 'Docker'].includes(keyword)
  );
  
  if (techMissing.length > 0) {
    recommendations.push(
      `Add technical skills to your resume: ${techMissing.slice(0, 3).join(', ')}`
    );
  }
  
  // General recommendations
  if (missingKeywords.length > 5) {
    recommendations.push(
      'Consider taking courses or earning certifications in the missing key areas'
    );
  }
  
  if (skillsGap.some(skill => skill.skill.toLowerCase().includes('leadership'))) {
    recommendations.push(
      'Highlight any leadership experience or team management skills you may have'
    );
  }
  
  recommendations.push(
    'Customize your resume to include more keywords from the job description'
  );
  
  return recommendations.slice(0, 4); // Limit to 4 recommendations
};

// Enhanced analysis function
const performEnhancedAnalysis = (
  jobDescription: string,
  resumeContent: string,
  extractedJobKeywords: ExtractedKeyword[],
  extractedResumeKeywords: ExtractedKeyword[]
): EnhancedMatchAnalysis => {
  const jobContext = analyzeJobContext(jobDescription);
  
  // Create detailed skill analysis
  const skillAnalysis: SkillAnalysis[] = extractedJobKeywords.map(jobKeyword => {
    const hasSkill = extractedResumeKeywords.some(resumeKeyword => 
      resumeKeyword.keyword.toLowerCase() === jobKeyword.keyword.toLowerCase() ||
      jobKeyword.variants.some(variant => 
        resumeKeyword.keyword.toLowerCase().includes(variant.toLowerCase())
      )
    );

    const skillTaxonomy = SKILL_TAXONOMY[jobKeyword.keyword];
    const industryMatrix = INDUSTRY_MATRICES[jobContext.industry];
    
    let marketDemand: SkillAnalysis['marketDemand'] = 'medium';
    let salaryImpact = 10;
    
    if (industryMatrix) {
      if (industryMatrix.criticalSkills.includes(jobKeyword.keyword)) {
        marketDemand = 'very-high';
      } else if (industryMatrix.emergingSkills.includes(jobKeyword.keyword)) {
        marketDemand = 'high';
      }
      
      salaryImpact = industryMatrix.salaryImpact[jobKeyword.keyword] || 10;
    }

    return {
      skill: jobKeyword.keyword,
      category: jobKeyword.category,
      importance: jobKeyword.importance,
      marketDemand,
      hasSkill,
      proficiencyRequired: skillTaxonomy?.proficiencyLevels[2] || 'Intermediate',
      alternativeSkills: skillTaxonomy?.relatedSkills.slice(0, 3) || [],
      learningPath: generateLearningPath(jobKeyword.keyword, jobKeyword.category),
      timeToAcquire: estimateTimeToAcquire(jobKeyword.keyword, jobKeyword.category),
      salaryImpact
    };
  });

  // Calculate category scores
  const categoryScores = {
    technical: calculateCategoryScore(skillAnalysis, 'technical'),
    soft: calculateCategoryScore(skillAnalysis, 'soft'),
    tools: calculateCategoryScore(skillAnalysis, 'tool'),
    methodologies: calculateCategoryScore(skillAnalysis, 'methodology'),
    domain: calculateCategoryScore(skillAnalysis, 'domain')
  };

  // Calculate overall score with enhanced algorithm
  const overallScore = calculateEnhancedMatchScore(skillAnalysis, jobContext);

  // Generate contextual insights
  const contextualInsights = {
    industryFit: calculateIndustryFit(skillAnalysis, jobContext.industry),
    roleLevelMatch: calculateRoleLevelMatch(skillAnalysis, jobContext.roleLevel),
    experienceAlignment: calculateExperienceAlignment(resumeContent, jobContext),
    cultureMatch: calculateCultureMatch(resumeContent, jobContext.cultureIndicators)
  };

  // Generate competitive analysis
  const competitivePosition = generateCompetitiveAnalysis(skillAnalysis, jobContext);

  // Generate career guidance
  const careerGuidance = generateCareerGuidance(jobContext, skillAnalysis, overallScore);

  return {
    overallScore,
    categoryScores,
    skillAnalysis,
    contextualInsights,
    competitivePosition,
    careerGuidance
  };
};

const calculateCategoryScore = (skillAnalysis: SkillAnalysis[], category: string): number => {
  const categorySkills = skillAnalysis.filter(skill => skill.category === category);
  if (categorySkills.length === 0) return 100;
  
  const matchedSkills = categorySkills.filter(skill => skill.hasSkill);
  return Math.round((matchedSkills.length / categorySkills.length) * 100);
};

const calculateEnhancedMatchScore = (skillAnalysis: SkillAnalysis[], jobContext: any): number => {
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
    
    totalWeight += weight;
    if (skill.hasSkill) achievedWeight += weight;
  });
  
  return totalWeight === 0 ? 0 : Math.round((achievedWeight / totalWeight) * 100);
};

const calculateIndustryFit = (skillAnalysis: SkillAnalysis[], industry: string): number => {
  const industryMatrix = INDUSTRY_MATRICES[industry];
  if (!industryMatrix) return 75;
  
  const industrySkills = [...industryMatrix.criticalSkills, ...industryMatrix.preferredSkills];
  const matchedIndustrySkills = skillAnalysis.filter(skill => 
    skill.hasSkill && industrySkills.includes(skill.skill)
  );
  
  return Math.round((matchedIndustrySkills.length / industrySkills.length) * 100);
};

const calculateRoleLevelMatch = (skillAnalysis: SkillAnalysis[], roleLevel: string): number => {
  // Logic to assess if skills align with role level
  const seniorSkills = skillAnalysis.filter(skill => 
    skill.skill.toLowerCase().includes('lead') || 
    skill.skill.toLowerCase().includes('architect') ||
    skill.skill.toLowerCase().includes('senior')
  );
  
  if (roleLevel === 'senior' || roleLevel === 'lead') {
    return seniorSkills.length > 0 ? 85 : 60;
  } else if (roleLevel === 'entry') {
    return seniorSkills.length === 0 ? 90 : 75;
  }
  
  return 80;
};

const calculateExperienceAlignment = (resumeContent: string, jobContext: any): number => {
  // Simple heuristic based on years of experience mentions
  const experienceMatches = resumeContent.match(/(\d+)\+?\s*years?\s*(?:of\s*)?experience/gi);
  if (!experienceMatches) return 70;
  
  const years = Math.max(...experienceMatches.map(match => parseInt(match.match(/\d+/)?.[0] || '0')));
  
  const expectedYears = {
    'entry': 2,
    'mid': 5,
    'senior': 8,
    'lead': 10,
    'executive': 15
  };
  
  const expected = expectedYears[jobContext.roleLevel] || 5;
  const ratio = years / expected;
  
  if (ratio >= 0.8 && ratio <= 1.5) return 90;
  if (ratio >= 0.5 && ratio <= 2) return 75;
  return 60;
};

const calculateCultureMatch = (resumeContent: string, cultureIndicators: string[]): number => {
  if (cultureIndicators.length === 0) return 80;
  
  let matches = 0;
  const lowerResume = resumeContent.toLowerCase();
  
  cultureIndicators.forEach(indicator => {
    const keywords = {
      'collaborative': ['team', 'collaboration', 'cross-functional'],
      'innovative': ['innovation', 'creative', 'new solutions'],
      'fast-paced': ['fast-paced', 'dynamic', 'agile'],
      'growth-focused': ['growth', 'learning', 'development'],
      'data-driven': ['data', 'analytics', 'metrics'],
      'customer-centric': ['customer', 'user', 'client']
    };
    
    const indicatorKeywords = keywords[indicator] || [];
    if (indicatorKeywords.some(keyword => lowerResume.includes(keyword))) {
      matches++;
    }
  });
  
  return Math.round((matches / cultureIndicators.length) * 100);
};

const generateCompetitiveAnalysis = (skillAnalysis: SkillAnalysis[], jobContext: any) => {
  const strongSkills = skillAnalysis.filter(skill => skill.hasSkill && skill.importance !== 'low');
  const weakAreas = skillAnalysis.filter(skill => !skill.hasSkill && skill.importance === 'critical');
  const rareSkills = skillAnalysis.filter(skill => skill.hasSkill && skill.marketDemand === 'very-high');
  
  return {
    strengthsVsMarket: strongSkills.slice(0, 4).map(skill => 
      `Strong ${skill.category} skills in ${skill.skill}`
    ),
    gapsVsMarket: weakAreas.slice(0, 3).map(skill => 
      `Missing critical ${skill.skill} experience`
    ),
    uniqueDifferentiators: rareSkills.slice(0, 3).map(skill => 
      `Valuable expertise in ${skill.skill} (high market demand)`
    )
  };
};

const generateLearningPath = (skill: string, category: string): string[] => {
  const pathMap: { [key: string]: string[] } = {
    'JavaScript': ['Complete JavaScript fundamentals course', 'Build 3 projects with vanilla JS', 'Learn ES6+ features'],
    'React': ['Complete React basics tutorial', 'Build a todo app', 'Learn React hooks and context'],
    'Python': ['Complete Python for beginners', 'Build a web scraper', 'Learn Python frameworks'],
    'AWS': ['Get AWS Cloud Practitioner cert', 'Complete hands-on labs', 'Build a cloud project'],
    'Leadership': ['Take leadership workshop', 'Lead a small project', 'Get mentoring experience']
  };
  
  return pathMap[skill] || [`Learn ${skill} fundamentals`, `Practice ${skill} in projects`, `Get ${skill} certification`];
};

const estimateTimeToAcquire = (skill: string, category: string): string => {
  const timeMap: { [key: string]: string } = {
    'technical': '2-4 months',
    'tool': '1-2 months',
    'soft': '3-6 months',
    'methodology': '1-3 months',
    'certification': '2-6 months',
    'domain': '6-12 months'
  };
  
  return timeMap[category] || '2-4 months';
};

// Enhanced main analysis function
export const analyzeJobMatch = async (
  jobDescription: string,
  resumeFile: File
): Promise<JobMatchingResult> => {
  try {
    const resumeContent = await readFileContent(resumeFile);
    
    // Detect industry for context
    const jobContext = analyzeJobContext(jobDescription);
    
    // Extract enhanced keywords
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
    
    // Generate enhanced analysis
    const enhancedAnalysis = performEnhancedAnalysis(
      jobDescription, 
      resumeContent, 
      jobKeywords, 
      resumeKeywords
    );
    
    // Generate enhanced recommendations
    const recommendations = generateEnhancedRecommendations(enhancedAnalysis, jobContext);
    
    // Generate enhanced pro tips  
    const proTips = generateEnhancedProTips(enhancedAnalysis, jobContext);
    
    return {
      matchScore: enhancedAnalysis.overallScore,
      matchedKeywords: matchedKeywords.slice(0, 10),
      missingKeywords: missingKeywords.slice(0, 10),
      skillsGap: skillsGap.slice(0, 8),
      recommendations,
      proTips,
      enhancedAnalysis
    };
  } catch (error) {
    console.error('Error analyzing job match:', error);
    throw new Error('Failed to analyze job match. Please try again.');
  }
};

const generateEnhancedRecommendations = (analysis: EnhancedMatchAnalysis, jobContext: any): string[] => {
  const recommendations: string[] = [];
  
  // Add career guidance as recommendations
  recommendations.push(...analysis.careerGuidance.immediateActions);
  
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

const generateEnhancedProTips = (analysis: EnhancedMatchAnalysis, jobContext: any): string[] => {
  const tips: string[] = [];
  
  // Score-based tips
  if (analysis.overallScore < 50) {
    tips.push('Consider applying to similar roles with lower requirements to build experience');
    tips.push('Focus on obtaining the top 3 critical missing skills before applying');
  } else if (analysis.overallScore < 70) {
    tips.push('You have a solid foundation - emphasize your transferable skills in your application');
    tips.push('Consider mentioning your learning plan for missing skills in your cover letter');
  } else if (analysis.overallScore < 85) {
    tips.push('Strong candidate profile - highlight specific achievements that demonstrate your matching skills');
    tips.push('Prepare concrete examples of how you\'ve used your key skills to drive results');
  } else {
    tips.push('Excellent match! Focus on showcasing leadership and impact in your previous roles');
    tips.push('You\'re likely competing with other strong candidates - differentiate through unique achievements');
  }
  
  // Industry-specific tips
  if (jobContext.industry === 'technology') {
    tips.push('Include GitHub links and code samples to demonstrate your technical abilities');
    if (analysis.categoryScores.technical < 80) {
      tips.push('Consider contributing to open source projects to strengthen your technical profile');
    }
  } else if (jobContext.industry === 'healthcare') {
    tips.push('Emphasize any patient care experience and regulatory compliance knowledge');
  } else if (jobContext.industry === 'finance') {
    tips.push('Highlight your analytical skills and any financial modeling experience');
  }
  
  // Competitive positioning tips
  if (analysis.competitivePosition.uniqueDifferentiators.length > 0) {
    tips.push(`Leverage your unique strengths: ${analysis.competitivePosition.uniqueDifferentiators[0]}`);
  }
  
  // Role-level specific tips
  if (jobContext.roleLevel === 'senior' && analysis.contextualInsights.roleLevelMatch < 80) {
    tips.push('Emphasize your leadership experience and strategic thinking capabilities');
  }
  
  return tips.slice(0, 6);
};
