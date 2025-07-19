
import { ParsedResumeContent } from './resumeContentParser';
import { ExtractedKeyword } from './enhancedKeywordExtractor';

export interface MarketIntelligence {
  averageSalary: { min: number; max: number; median: number };
  demandLevel: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  competitionLevel: 'low' | 'medium' | 'high';
  emergingTrends: string[];
  decliningSkills: string[];
  locationFactors: LocationFactor[];
}

export interface LocationFactor {
  location: string;
  salaryMultiplier: number;
  demandLevel: 'low' | 'medium' | 'high';
  topCompanies: string[];
}

export interface CompetitivePositioning {
  strengthsVsMarket: string[];
  gapsVsMarket: string[];
  uniqueDifferentiators: string[];
  marketPosition: 'bottom-quartile' | 'below-average' | 'average' | 'above-average' | 'top-quartile';
  recommendedStrategy: PositioningStrategy;
}

export interface PositioningStrategy {
  primaryFocus: string;
  keyDifferentiators: string[];
  targetCompanies: string[];
  salaryNegotiation: SalaryStrategy;
  careerProgression: string[];
}

export interface SalaryStrategy {
  negotiationPosition: 'weak' | 'moderate' | 'strong';
  expectedRange: { min: number; max: number };
  keyLeveragePoints: string[];
  improvementActions: string[];
}

export const analyzeCompetitivePosition = (
  resumeData: ParsedResumeContent,
  jobKeywords: ExtractedKeyword[],
  targetRole: string,
  industry: string
): { marketIntelligence: MarketIntelligence; positioning: CompetitivePositioning } => {
  
  const marketIntelligence = generateMarketIntelligence(targetRole, industry, resumeData);
  const positioning = assessCompetitivePosition(resumeData, jobKeywords, marketIntelligence, targetRole);
  
  return { marketIntelligence, positioning };
};

const generateMarketIntelligence = (
  targetRole: string,
  industry: string,
  resumeData: ParsedResumeContent
): MarketIntelligence => {
  
  // Market salary data (in a real implementation, this would come from APIs like Glassdoor, PayScale, etc.)
  const salaryData = getSalaryIntelligence(targetRole, industry, resumeData.experienceLevel);
  const demandData = getDemandIntelligence(targetRole, industry);
  const trendData = getTrendIntelligence(industry);
  const locationData = getLocationIntelligence(targetRole, industry);
  
  return {
    averageSalary: salaryData,
    demandLevel: demandData.level,
    competitionLevel: demandData.competition,
    emergingTrends: trendData.emerging,
    decliningSkills: trendData.declining,
    locationFactors: locationData
  };
};

const getSalaryIntelligence = (
  role: string,
  industry: string,
  experienceLevel: string
): { min: number; max: number; median: number } => {
  
  // Base salary ranges by role and experience (simplified - real data would be much more comprehensive)
  const baseSalaries = {
    'software engineer': {
      'entry': { min: 65000, max: 85000, median: 75000 },
      'junior': { min: 75000, max: 95000, median: 85000 },
      'mid': { min: 95000, max: 130000, median: 112000 },
      'senior': { min: 130000, max: 180000, median: 155000 },
      'executive': { min: 180000, max: 300000, median: 240000 }
    },
    'data scientist': {
      'entry': { min: 70000, max: 90000, median: 80000 },
      'junior': { min: 85000, max: 110000, median: 97000 },
      'mid': { min: 110000, max: 150000, median: 130000 },
      'senior': { min: 150000, max: 220000, median: 185000 },
      'executive': { min: 200000, max: 350000, median: 275000 }
    },
    'product manager': {
      'entry': { min: 80000, max: 100000, median: 90000 },
      'junior': { min: 90000, max: 120000, median: 105000 },
      'mid': { min: 120000, max: 160000, median: 140000 },
      'senior': { min: 160000, max: 250000, median: 205000 },
      'executive': { min: 220000, max: 400000, median: 310000 }
    }
  };
  
  // Industry multipliers
  const industryMultipliers = {
    'technology': 1.1,
    'fintech': 1.2,
    'healthcare': 1.0,
    'finance': 1.15,
    'consulting': 1.05,
    'startup': 0.9,
    'enterprise': 1.1
  };
  
  const roleKey = Object.keys(baseSalaries).find(key => role.toLowerCase().includes(key)) || 'software engineer';
  const baseSalary = baseSalaries[roleKey][experienceLevel] || baseSalaries[roleKey]['mid'];
  const multiplier = industryMultipliers[industry] || 1.0;
  
  return {
    min: Math.round(baseSalary.min * multiplier),
    max: Math.round(baseSalary.max * multiplier),
    median: Math.round(baseSalary.median * multiplier)
  };
};

const getDemandIntelligence = (role: string, industry: string): { level: MarketIntelligence['demandLevel']; competition: MarketIntelligence['competitionLevel'] } => {
  // Simplified demand analysis
  const demandMap = {
    'software engineer': { level: 'high' as const, competition: 'high' as const },
    'data scientist': { level: 'very-high' as const, competition: 'medium' as const },
    'product manager': { level: 'high' as const, competition: 'high' as const },
    'devops engineer': { level: 'very-high' as const, competition: 'medium' as const },
    'machine learning engineer': { level: 'very-high' as const, competition: 'low' as const }
  };
  
  const roleKey = Object.keys(demandMap).find(key => role.toLowerCase().includes(key));
  return demandMap[roleKey] || { level: 'medium', competition: 'medium' };
};

const getTrendIntelligence = (industry: string): { emerging: string[]; declining: string[] } => {
  const trendMap = {
    'technology': {
      emerging: ['AI/ML', 'Cloud Native', 'Kubernetes', 'Rust', 'WebAssembly', 'Edge Computing'],
      declining: ['jQuery', 'Flash', 'Legacy Java', 'Monolithic Architecture']
    },
    'fintech': {
      emerging: ['Blockchain', 'Cryptocurrency', 'RegTech', 'Open Banking APIs', 'Quantum Computing'],
      declining: ['COBOL', 'Legacy Banking Systems', 'Traditional Payment Processing']
    },
    'healthcare': {
      emerging: ['Telemedicine Platforms', 'Health Data Analytics', 'IoT Medical Devices', 'FHIR Standards'],
      declining: ['Legacy EHR Systems', 'Paper-based Processes', 'Standalone Medical Software']
    }
  };
  
  return trendMap[industry] || {
    emerging: ['Cloud Computing', 'AI/ML', 'Automation', 'Data Analytics'],
    declining: ['Legacy Systems', 'Manual Processes', 'Outdated Frameworks']
  };
};

const getLocationIntelligence = (role: string, industry: string): LocationFactor[] => {
  // Simplified location data
  return [
    {
      location: 'San Francisco Bay Area',
      salaryMultiplier: 1.4,
      demandLevel: 'high',
      topCompanies: ['Google', 'Apple', 'Meta', 'Salesforce', 'Uber']
    },
    {
      location: 'Seattle',
      salaryMultiplier: 1.25,
      demandLevel: 'high',
      topCompanies: ['Amazon', 'Microsoft', 'Boeing', 'Expedia']
    },
    {
      location: 'New York City',
      salaryMultiplier: 1.3,
      demandLevel: 'medium',
      topCompanies: ['Goldman Sachs', 'JPMorgan', 'IBM', 'Spotify']
    },
    {
      location: 'Austin',
      salaryMultiplier: 1.1,
      demandLevel: 'medium',
      topCompanies: ['Dell', 'IBM', 'Oracle', 'Indeed']
    },
    {
      location: 'Remote',
      salaryMultiplier: 1.0,
      demandLevel: 'high',
      topCompanies: ['GitLab', 'Buffer', 'Zapier', 'Automattic']
    }
  ];
};

const assessCompetitivePosition = (
  resumeData: ParsedResumeContent,
  jobKeywords: ExtractedKeyword[],
  marketIntelligence: MarketIntelligence,
  targetRole: string
): CompetitivePositioning => {
  
  const userSkills = resumeData.skills;
  const matchedSkills = jobKeywords.filter(jk => 
    userSkills.some(us => us.skill.toLowerCase() === jk.keyword.toLowerCase())
  );
  
  const strengthsVsMarket = identifyMarketStrengths(resumeData, marketIntelligence);
  const gapsVsMarket = identifyMarketGaps(resumeData, jobKeywords, marketIntelligence);
  const uniqueDifferentiators = identifyUniqueDifferentiators(resumeData, marketIntelligence);
  
  const marketPosition = calculateMarketPosition(resumeData, jobKeywords, marketIntelligence);
  const recommendedStrategy = generatePositioningStrategy(
    resumeData, 
    marketIntelligence, 
    marketPosition, 
    targetRole
  );
  
  return {
    strengthsVsMarket,
    gapsVsMarket,
    uniqueDifferentiators,
    marketPosition,
    recommendedStrategy
  };
};

const identifyMarketStrengths = (
  resumeData: ParsedResumeContent,
  marketIntelligence: MarketIntelligence
): string[] => {
  const strengths: string[] = [];
  
  // Experience-based strengths
  if (resumeData.totalYearsExperience > 5) {
    strengths.push(`${resumeData.totalYearsExperience}+ years of experience positions you in the top 30% of candidates`);
  }
  
  // Education-based strengths
  if (resumeData.educationLevel === 'masters' || resumeData.educationLevel === 'doctorate') {
    strengths.push('Advanced degree provides competitive advantage in technical roles');
  }
  
  // Management experience strength
  if (resumeData.managementExperience) {
    strengths.push('Leadership experience differentiates you for senior roles and team lead positions');
  }
  
  // Industry experience strengths
  if (resumeData.industryExperience.length > 0) {
    strengths.push(`Domain expertise in ${resumeData.industryExperience.join(', ')} provides industry context advantage`);
  }
  
  // Quantifiable achievements
  if (resumeData.quantifiableResults.length > 2) {
    strengths.push('Strong track record of measurable business impact sets you apart from theoretical candidates');
  }
  
  // Career progression
  if (resumeData.careerProgression === 'strong_progression') {
    strengths.push('Consistent career growth demonstrates ambition and capability for advancement');
  }
  
  // Emerging technology skills
  const emergingSkills = resumeData.skills.filter(skill => 
    marketIntelligence.emergingTrends.some(trend => 
      skill.skill.toLowerCase().includes(trend.toLowerCase())
    )
  );
  
  if (emergingSkills.length > 0) {
    strengths.push(`Early adoption of emerging technologies: ${emergingSkills.map(s => s.skill).join(', ')}`);
  }
  
  return strengths.slice(0, 5); // Limit to top 5 strengths
};

const identifyMarketGaps = (
  resumeData: ParsedResumeContent,
  jobKeywords: ExtractedKeyword[],
  marketIntelligence: MarketIntelligence
): string[] => {
  const gaps: string[] = [];
  
  // Critical skill gaps
  const criticalMissing = jobKeywords.filter(jk => 
    jk.importance === 'critical' && 
    !resumeData.skills.some(us => us.skill.toLowerCase() === jk.keyword.toLowerCase())
  );
  
  criticalMissing.forEach(skill => {
    gaps.push(`Missing critical skill: ${skill.keyword} - essential for 80% of similar roles`);
  });
  
  // Emerging technology gaps
  const emergingGaps = marketIntelligence.emergingTrends.filter(trend => 
    !resumeData.skills.some(skill => skill.skill.toLowerCase().includes(trend.toLowerCase()))
  );
  
  if (emergingGaps.length > 0) {
    gaps.push(`Gap in emerging technologies: ${emergingGaps.slice(0, 3).join(', ')} - increasingly demanded by employers`);
  }
  
  // Experience level gaps
  if (resumeData.experienceLevel === 'entry' || resumeData.experienceLevel === 'junior') {
    gaps.push('Limited experience may require demonstrated learning ability and strong project portfolio');
  }
  
  // Industry experience gaps
  if (resumeData.industryExperience.length === 0) {
    gaps.push('Lack of specific industry experience may require highlighting transferable skills');
  }
  
  // Management experience gap for senior roles
  if (!resumeData.managementExperience && resumeData.experienceLevel === 'senior') {
    gaps.push('Leadership experience gap may limit progression to senior individual contributor or management roles');
  }
  
  return gaps.slice(0, 4); // Limit to top 4 gaps
};

const identifyUniqueDifferentiators = (
  resumeData: ParsedResumeContent,
  marketIntelligence: MarketIntelligence
): string[] => {
  const differentiators: string[] = [];
  
  // Rare skill combinations
  const rareSkillCombos = identifyRareSkillCombinations(resumeData.skills);
  differentiators.push(...rareSkillCombos);
  
  // Cross-industry experience
  if (resumeData.industryExperience.length > 1) {
    differentiators.push(`Cross-industry experience (${resumeData.industryExperience.join(' + ')}) provides unique perspective`);
  }
  
  // Technical + business combination
  const hasTechnicalSkills = resumeData.skills.some(s => 
    ['JavaScript', 'Python', 'React', 'AWS'].some(tech => s.skill.includes(tech))
  );
  const hasBusinessSkills = resumeData.achievements.some(a => a.category === 'business');
  
  if (hasTechnicalSkills && hasBusinessSkills) {
    differentiators.push('Rare combination of deep technical skills with proven business impact');
  }
  
  // Advanced certifications
  const advancedCerts = resumeData.skills.filter(s => 
    s.skill.toLowerCase().includes('certified') || s.skill.toLowerCase().includes('certification')
  );
  
  if (advancedCerts.length > 0) {
    differentiators.push(`Professional certifications demonstrate commitment to continuous learning: ${advancedCerts.map(c => c.skill).join(', ')}`);
  }
  
  return differentiators.slice(0, 3); // Limit to top 3 unique differentiators
};

const identifyRareSkillCombinations = (skills: any[]): string[] => {
  const combos: string[] = [];
  
  // Look for valuable skill combinations
  const skillNames = skills.map(s => s.skill.toLowerCase());
  
  if (skillNames.includes('machine learning') && skillNames.includes('react')) {
    combos.push('ML + Frontend development combination is rare and valuable for AI product companies');
  }
  
  if (skillNames.includes('devops') && skillNames.includes('security')) {
    combos.push('DevSecOps expertise is highly sought after but rarely found in single candidates');
  }
  
  if (skillNames.includes('blockchain') && skillNames.includes('finance')) {
    combos.push('Blockchain + Financial domain expertise positions you for high-growth DeFi sector');
  }
  
  return combos;
};

const calculateMarketPosition = (
  resumeData: ParsedResumeContent,
  jobKeywords: ExtractedKeyword[],
  marketIntelligence: MarketIntelligence
): CompetitivePositioning['marketPosition'] => {
  let score = 50; // Base score
  
  // Skill match scoring
  const matchedSkills = jobKeywords.filter(jk => 
    resumeData.skills.some(us => us.skill.toLowerCase() === jk.keyword.toLowerCase())
  );
  const skillMatchRatio = matchedSkills.length / jobKeywords.length;
  score += skillMatchRatio * 30;
  
  // Experience level scoring
  const experienceBonus = {
    'entry': 5,
    'junior': 10,
    'mid': 15,
    'senior': 20,
    'executive': 25
  };
  score += experienceBonus[resumeData.experienceLevel];
  
  // Education scoring
  const educationBonus = {
    'other': 0,
    'associates': 5,
    'bachelors': 10,
    'masters': 15,
    'doctorate': 20
  };
  score += educationBonus[resumeData.educationLevel] || 0;
  
  // Achievement scoring
  if (resumeData.quantifiableResults.length > 3) score += 10;
  if (resumeData.managementExperience) score += 10;
  if (resumeData.careerProgression === 'strong_progression') score += 10;
  
  // Convert score to position
  if (score >= 85) return 'top-quartile';
  if (score >= 70) return 'above-average';
  if (score >= 50) return 'average';
  if (score >= 35) return 'below-average';
  return 'bottom-quartile';
};

const generatePositioningStrategy = (
  resumeData: ParsedResumeContent,
  marketIntelligence: MarketIntelligence,
  marketPosition: CompetitivePositioning['marketPosition'],
  targetRole: string
): PositioningStrategy => {
  
  const salaryStrategy = generateSalaryStrategy(resumeData, marketIntelligence, marketPosition);
  
  // Primary focus based on market position
  const focusMap = {
    'top-quartile': 'Emphasize leadership and unique achievements to command premium compensation',
    'above-average': 'Highlight specific expertise and quantifiable results to differentiate from competition',
    'average': 'Focus on growth potential and cultural fit while addressing key skill gaps',
    'below-average': 'Demonstrate learning ability and transferable skills while building missing competencies',
    'bottom-quartile': 'Target entry-level or transitional roles while rapidly building foundational skills'
  };
  
  const primaryFocus = focusMap[marketPosition];
  
  // Key differentiators
  const keyDifferentiators = [
    resumeData.managementExperience ? 'Leadership Experience' : 'Individual Contributor Excellence',
    resumeData.industryExperience.length > 0 ? `${resumeData.industryExperience[0]} Domain Expertise` : 'Cross-functional Adaptability',
    resumeData.careerProgression === 'strong_progression' ? 'Proven Growth Trajectory' : 'Hungry for New Challenges'
  ];
  
  // Target companies based on profile
  const targetCompanies = generateTargetCompanies(resumeData, marketIntelligence, targetRole);
  
  // Career progression recommendations
  const careerProgression = generateCareerProgression(resumeData, targetRole, marketPosition);
  
  return {
    primaryFocus,
    keyDifferentiators,
    targetCompanies,
    salaryNegotiation: salaryStrategy,
    careerProgression
  };
};

const generateSalaryStrategy = (
  resumeData: ParsedResumeContent,
  marketIntelligence: MarketIntelligence,
  marketPosition: CompetitivePositioning['marketPosition']
): SalaryStrategy => {
  
  const baseRange = marketIntelligence.averageSalary;
  
  // Adjust range based on market position
  const positionMultipliers = {
    'top-quartile': { min: 1.2, max: 1.4 },
    'above-average': { min: 1.1, max: 1.25 },
    'average': { min: 0.95, max: 1.1 },
    'below-average': { min: 0.85, max: 1.0 },
    'bottom-quartile': { min: 0.7, max: 0.9 }
  };
  
  const multiplier = positionMultipliers[marketPosition];
  const expectedRange = {
    min: Math.round(baseRange.min * multiplier.min),
    max: Math.round(baseRange.max * multiplier.max)
  };
  
  // Negotiation position
  const negotiationPosition = marketPosition === 'top-quartile' || marketPosition === 'above-average' ? 'strong' :
                            marketPosition === 'average' ? 'moderate' : 'weak';
  
  // Key leverage points
  const leveragePoints: string[] = [];
  if (resumeData.quantifiableResults.length > 2) {
    leveragePoints.push('Demonstrated measurable business impact');
  }
  if (resumeData.managementExperience) {
    leveragePoints.push('Leadership and team management experience');
  }
  if (resumeData.industryExperience.length > 0) {
    leveragePoints.push('Relevant industry domain expertise');
  }
  if (resumeData.totalYearsExperience > 5) {
    leveragePoints.push('Extensive experience in similar roles');
  }
  
  // Improvement actions for salary negotiation
  const improvementActions: string[] = [];
  if (negotiationPosition !== 'strong') {
    improvementActions.push('Build portfolio of quantifiable achievements');
    improvementActions.push('Obtain industry-relevant certifications');
    if (!resumeData.managementExperience) {
      improvementActions.push('Gain leadership experience through project management');
    }
  }
  
  return {
    negotiationPosition,
    expectedRange,
    keyLeveragePoints: leveragePoints,
    improvementActions
  };
};

const generateTargetCompanies = (
  resumeData: ParsedResumeContent,
  marketIntelligence: MarketIntelligence,
  targetRole: string
): string[] => {
  const companies: string[] = [];
  
  // Based on experience level
  if (resumeData.experienceLevel === 'entry' || resumeData.experienceLevel === 'junior') {
    companies.push('Growing startups with mentorship programs', 'Mid-size companies with learning opportunities');
  } else if (resumeData.experienceLevel === 'senior' || resumeData.experienceLevel === 'executive') {
    companies.push('Fortune 500 companies', 'Fast-growing unicorns', 'Established tech leaders');
  }
  
  // Based on industry experience
  if (resumeData.industryExperience.includes('fintech')) {
    companies.push('Stripe', 'Square', 'Robinhood', 'Coinbase');
  }
  if (resumeData.industryExperience.includes('e-commerce')) {
    companies.push('Amazon', 'Shopify', 'Etsy', 'eBay');
  }
  if (resumeData.industryExperience.includes('healthcare')) {
    companies.push('Teladoc', 'Veracyte', 'Epic Systems', 'Cerner');
  }
  
  // Location-based recommendations
  marketIntelligence.locationFactors.forEach(location => {
    if (location.demandLevel === 'high') {
      companies.push(...location.topCompanies.slice(0, 2));
    }
  });
  
  return [...new Set(companies)].slice(0, 8); // Remove duplicates and limit
};

const generateCareerProgression = (
  resumeData: ParsedResumeContent,
  targetRole: string,
  marketPosition: CompetitivePositioning['marketPosition']
): string[] => {
  const progression: string[] = [];
  
  const currentLevel = resumeData.experienceLevel;
  
  if (currentLevel === 'entry' || currentLevel === 'junior') {
    progression.push('Focus on building core technical competencies');
    progression.push('Seek mentorship and code review opportunities');
    progression.push('Contribute to open source projects for visibility');
    progression.push('Target mid-level individual contributor roles within 2-3 years');
  } else if (currentLevel === 'mid') {
    if (resumeData.managementExperience) {
      progression.push('Consider technical team lead or engineering manager roles');
      progression.push('Develop strategic thinking and cross-functional collaboration skills');
    } else {
      progression.push('Specialize in high-impact technical areas (architecture, performance, security)');
      progression.push('Build thought leadership through speaking and writing');
    }
    progression.push('Target senior roles with expanded scope within 2-3 years');
  } else if (currentLevel === 'senior') {
    progression.push('Choose between technical leadership (Staff/Principal Engineer) or people management');
    progression.push('Drive major technical initiatives and architectural decisions');
    progression.push('Mentor junior developers and contribute to hiring');
    progression.push('Consider director-level roles or principal engineer positions within 3-5 years');
  }
  
  return progression;
};
