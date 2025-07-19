
import { SKILL_TAXONOMY, INDUSTRY_MATRICES } from './skillTaxonomy';

export interface JobContext {
  industry: string;
  companySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  roleLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  roleType: 'individual-contributor' | 'team-lead' | 'manager' | 'director';
  remotePolicy: 'remote' | 'hybrid' | 'onsite' | 'flexible';
  urgency: 'urgent' | 'normal' | 'flexible';
  cultureIndicators: string[];
}

export interface SkillAnalysis {
  skill: string;
  category: 'technical' | 'soft' | 'tool' | 'methodology' | 'certification' | 'domain';
  importance: 'critical' | 'high' | 'medium' | 'low';
  marketDemand: 'very-high' | 'high' | 'medium' | 'low';
  hasSkill: boolean;
  proficiencyRequired: string;
  alternativeSkills: string[];
  learningPath: string[];
  timeToAcquire: string;
  salaryImpact: number;
}

export interface EnhancedMatchAnalysis {
  overallScore: number;
  categoryScores: {
    technical: number;
    soft: number;
    tools: number;
    methodologies: number;
    domain: number;
  };
  skillAnalysis: SkillAnalysis[];
  contextualInsights: {
    industryFit: number;
    roleLevelMatch: number;
    experienceAlignment: number;
    cultureMatch: number;
  };
  competitivePosition: {
    strengthsVsMarket: string[];
    gapsVsMarket: string[];
    uniqueDifferentiators: string[];
  };
  careerGuidance: {
    immediateActions: string[];
    shortTermGoals: string[];
    longTermGrowth: string[];
    alternativeRoles: string[];
  };
}

export const analyzeJobContext = (jobDescription: string): JobContext => {
  const lowerText = jobDescription.toLowerCase();
  
  // Industry detection (enhanced)
  let industry = 'general';
  const industryKeywords = {
    'technology': ['software', 'developer', 'engineer', 'tech', 'programming', 'coding', 'saas', 'api'],
    'healthcare': ['healthcare', 'health', 'medical', 'patient', 'clinical', 'hospital', 'nurse', 'doctor'],
    'finance': ['finance', 'financial', 'banking', 'investment', 'trading', 'fintech', 'accounting'],
    'marketing': ['marketing', 'digital marketing', 'seo', 'sem', 'brand', 'advertising', 'campaign'],
    'consulting': ['consulting', 'consultant', 'advisory', 'strategy', 'transformation'],
    'education': ['education', 'teaching', 'academic', 'university', 'school', 'learning'],
    'retail': ['retail', 'e-commerce', 'sales', 'customer service', 'merchandising'],
    'manufacturing': ['manufacturing', 'production', 'supply chain', 'operations', 'quality']
  };

  for (const [key, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      industry = key;
      break;
    }
  }

  // Company size detection
  let companySize: JobContext['companySize'] = 'medium';
  if (lowerText.includes('startup') || lowerText.includes('early stage')) {
    companySize = 'startup';
  } else if (lowerText.includes('fortune 500') || lowerText.includes('enterprise') || lowerText.includes('multinational')) {
    companySize = 'enterprise';
  } else if (lowerText.includes('small team') || lowerText.includes('boutique')) {
    companySize = 'small';
  } else if (lowerText.includes('large company') || lowerText.includes('established')) {
    companySize = 'large';
  }

  // Role level detection (enhanced)
  let roleLevel: JobContext['roleLevel'] = 'mid';
  if (lowerText.includes('junior') || lowerText.includes('entry') || lowerText.includes('graduate') || lowerText.includes('associate')) {
    roleLevel = 'entry';
  } else if (lowerText.includes('senior') || lowerText.includes('sr.') || lowerText.includes('lead') || lowerText.includes('principal')) {
    roleLevel = 'senior';
  } else if (lowerText.includes('director') || lowerText.includes('vp') || lowerText.includes('head of') || lowerText.includes('chief')) {
    roleLevel = 'executive';
  } else if (lowerText.includes('team lead') || lowerText.includes('tech lead')) {
    roleLevel = 'lead';
  }

  // Role type detection
  let roleType: JobContext['roleType'] = 'individual-contributor';
  if (lowerText.includes('manager') || lowerText.includes('managing')) {
    roleType = 'manager';
  } else if (lowerText.includes('director') || lowerText.includes('head of')) {
    roleType = 'director';
  } else if (lowerText.includes('lead') || lowerText.includes('team lead')) {
    roleType = 'team-lead';
  }

  // Remote policy detection
  let remotePolicy: JobContext['remotePolicy'] = 'onsite';
  if (lowerText.includes('remote') && !lowerText.includes('no remote')) {
    if (lowerText.includes('hybrid') || lowerText.includes('flexible')) {
      remotePolicy = 'hybrid';
    } else {
      remotePolicy = 'remote';
    }
  } else if (lowerText.includes('hybrid') || lowerText.includes('flexible work')) {
    remotePolicy = 'hybrid';
  }

  // Urgency detection
  let urgency: JobContext['urgency'] = 'normal';
  if (lowerText.includes('urgent') || lowerText.includes('immediate') || lowerText.includes('asap')) {
    urgency = 'urgent';
  } else if (lowerText.includes('flexible timeline') || lowerText.includes('no rush')) {
    urgency = 'flexible';
  }

  // Culture indicators
  const cultureIndicators: string[] = [];
  const cultureKeywords = {
    'collaborative': ['collaborative', 'teamwork', 'cross-functional'],
    'innovative': ['innovative', 'cutting-edge', 'disruptive', 'creative'],
    'fast-paced': ['fast-paced', 'dynamic', 'agile environment'],
    'growth-focused': ['growth', 'learning', 'development', 'career advancement'],
    'work-life-balance': ['work-life balance', 'flexible', 'wellness', 'benefits'],
    'data-driven': ['data-driven', 'analytics', 'metrics', 'evidence-based'],
    'customer-centric': ['customer-focused', 'client-centered', 'user experience']
  };

  for (const [culture, keywords] of Object.entries(cultureKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      cultureIndicators.push(culture);
    }
  }

  return {
    industry,
    companySize,
    roleLevel,
    roleType,
    remotePolicy,
    urgency,
    cultureIndicators
  };
};

export const generateCareerGuidance = (
  jobContext: JobContext,
  skillAnalysis: SkillAnalysis[],
  matchScore: number
): EnhancedMatchAnalysis['careerGuidance'] => {
  const immediateActions: string[] = [];
  const shortTermGoals: string[] = [];
  const longTermGrowth: string[] = [];
  const alternativeRoles: string[] = [];

  const criticalMissingSkills = skillAnalysis
    .filter(skill => !skill.hasSkill && skill.importance === 'critical')
    .slice(0, 3);

  const highValueSkills = skillAnalysis
    .filter(skill => !skill.hasSkill && skill.salaryImpact > 15)
    .slice(0, 2);

  // Immediate actions based on match score
  if (matchScore < 50) {
    immediateActions.push('Focus on building foundational skills before applying to similar roles');
    immediateActions.push(`Consider entry-level positions in ${jobContext.industry} to gain experience`);
  } else if (matchScore < 70) {
    immediateActions.push('Tailor your resume to highlight transferable skills more prominently');
    immediateActions.push('Apply for this role while addressing the top 2-3 skill gaps');
  } else {
    immediateActions.push('You\'re well-qualified - focus on showcasing achievements and impact');
    immediateActions.push('Prepare specific examples that demonstrate your matching skills');
  }

  // Add critical skill actions
  if (criticalMissingSkills.length > 0) {
    const topSkill = criticalMissingSkills[0];
    immediateActions.push(`Priority: Gain experience with ${topSkill.skill} (${topSkill.timeToAcquire})`);
  }

  // Short-term goals (3-6 months)
  criticalMissingSkills.forEach(skill => {
    if (skill.learningPath.length > 0) {
      shortTermGoals.push(`Complete ${skill.learningPath[0]} for ${skill.skill}`);
    }
  });

  if (jobContext.roleLevel === 'senior' || jobContext.roleLevel === 'lead') {
    shortTermGoals.push('Develop leadership and mentoring examples for your portfolio');
  }

  if (highValueSkills.length > 0) {
    shortTermGoals.push(`Invest in high-value skills: ${highValueSkills.map(s => s.skill).join(', ')}`);
  }

  // Long-term growth (6+ months)
  const industryMatrix = INDUSTRY_MATRICES[jobContext.industry];
  if (industryMatrix) {
    const emergingSkill = industryMatrix.emergingSkills[0];
    if (emergingSkill) {
      longTermGrowth.push(`Stay ahead of trends by learning ${emergingSkill}`);
    }
  }

  if (jobContext.roleType === 'individual-contributor' && jobContext.roleLevel !== 'entry') {
    longTermGrowth.push('Consider developing leadership skills for career progression');
  }

  longTermGrowth.push(`Build expertise in ${jobContext.industry}-specific best practices and standards`);

  // Alternative roles based on current skills
  const strongSkills = skillAnalysis
    .filter(skill => skill.hasSkill && skill.importance !== 'low')
    .map(skill => skill.skill);

  if (strongSkills.includes('JavaScript') && strongSkills.includes('React')) {
    alternativeRoles.push('Frontend Developer', 'Full Stack Developer');
  }
  if (strongSkills.includes('Python') && strongSkills.includes('Data Science')) {
    alternativeRoles.push('Data Scientist', 'ML Engineer');
  }
  if (strongSkills.includes('Leadership') && strongSkills.includes('Project Management')) {
    alternativeRoles.push('Technical Lead', 'Engineering Manager');
  }

  return {
    immediateActions: immediateActions.slice(0, 3),
    shortTermGoals: shortTermGoals.slice(0, 4),
    longTermGrowth: longTermGrowth.slice(0, 3),
    alternativeRoles: alternativeRoles.slice(0, 3)
  };
};
