import { ResumeData } from "@/hooks/useResumeSteps";

export interface ATSScoreResult {
  overallScore: number;
  checks: {
    contactInfo: { score: number; status: 'complete' | 'incomplete' | 'partial'; message: string };
    experience: { score: number; status: 'excellent' | 'good' | 'needs-improvement'; message: string };
    skills: { score: number; status: 'excellent' | 'good' | 'needs-improvement'; message: string };
    education: { score: number; status: 'complete' | 'incomplete'; message: string };
    keywords: { score: number; status: 'excellent' | 'good' | 'needs-improvement'; message: string };
    metrics: { score: number; status: 'excellent' | 'good' | 'needs-improvement'; message: string };
  };
  suggestions: string[];
}

const industryKeywords: Record<string, string[]> = {
  Technology: ['software', 'development', 'programming', 'engineering', 'coding', 'technical', 'system', 'database', 'api', 'framework', 'algorithm', 'testing', 'debugging', 'agile', 'scrum'],
  Healthcare: ['patient', 'medical', 'clinical', 'healthcare', 'treatment', 'diagnosis', 'therapy', 'care', 'health', 'medical records', 'compliance', 'safety', 'protocol'],
  Finance: ['financial', 'analysis', 'investment', 'portfolio', 'risk', 'compliance', 'audit', 'accounting', 'budget', 'revenue', 'profit', 'cost', 'roi', 'market'],
  Creative: ['design', 'creative', 'visual', 'brand', 'marketing', 'campaign', 'content', 'creative direction', 'art', 'graphic', 'user experience', 'interface'],
  Business: ['management', 'leadership', 'strategy', 'operations', 'business development', 'sales', 'client', 'team', 'project', 'growth', 'efficiency', 'process'],
  Research: ['research', 'analysis', 'data', 'study', 'methodology', 'publication', 'peer review', 'grant', 'experiment', 'hypothesis', 'findings', 'academic']
};

const actionVerbs = ['led', 'managed', 'developed', 'created', 'implemented', 'improved', 'increased', 'decreased', 'optimized', 'achieved', 'delivered', 'designed', 'built', 'launched', 'coordinated', 'supervised', 'analyzed', 'established', 'streamlined'];

const metricPatterns = [/\d+%/, /\$[\d,]+/, /\d+[km]?\+?/, /\d+x/, /\d+:\d+/];

export const calculateATSScore = (data: ResumeData, industry: string = 'Business'): ATSScoreResult => {
  const checks = {
    contactInfo: calculateContactInfoScore(data.personalInfo),
    experience: calculateExperienceScore(data.experience),
    skills: calculateSkillsScore(data.skills),
    education: calculateEducationScore(data.education),
    keywords: calculateKeywordScore(data, industry),
    metrics: calculateMetricsScore(data.experience)
  };

  const overallScore = Math.round(
    (checks.contactInfo.score * 0.15) +
    (checks.experience.score * 0.25) +
    (checks.skills.score * 0.15) +
    (checks.education.score * 0.10) +
    (checks.keywords.score * 0.20) +
    (checks.metrics.score * 0.15)
  );

  const suggestions = generateSuggestions(checks, data);

  return {
    overallScore,
    checks,
    suggestions
  };
};

const calculateContactInfoScore = (personalInfo: any) => {
  let score = 0;
  let missing = [];

  if (personalInfo.fullName?.trim()) score += 25;
  else missing.push('full name');

  if (personalInfo.email?.trim() && personalInfo.email.includes('@')) score += 25;
  else missing.push('professional email');

  if (personalInfo.phone?.trim()) score += 20;
  else missing.push('phone number');

  if (personalInfo.location?.trim()) score += 15;
  else missing.push('location');

  if (personalInfo.linkedin?.trim()) score += 10;
  if (personalInfo.website?.trim()) score += 5;

  let status: 'complete' | 'incomplete' | 'partial';
  let message: string;

  if (score >= 85) {
    status = 'complete';
    message = 'Contact information is complete';
  } else if (score >= 50) {
    status = 'partial';
    message = `Missing: ${missing.join(', ')}`;
  } else {
    status = 'incomplete';
    message = `Incomplete contact info: ${missing.join(', ')}`;
  }

  return { score, status, message };
};

const calculateExperienceScore = (experience: any[]) => {
  if (experience.length === 0) {
    return { score: 0, status: 'needs-improvement' as const, message: 'No work experience added' };
  }

  let totalScore = 0;
  let hasActionVerbs = false;
  let hasBulletPoints = false;
  let hasQuantifiableAchievements = false;

  experience.forEach(exp => {
    let expScore = 0;

    // Basic info completion
    if (exp.company?.trim() && exp.position?.trim() && exp.startDate?.trim() && exp.description?.trim()) {
      expScore += 40;
    }

    // Check for action verbs
    const description = exp.description?.toLowerCase() || '';
    if (actionVerbs.some(verb => description.includes(verb))) {
      hasActionVerbs = true;
      expScore += 20;
    }

    // Check for bullet points
    if (description.includes('•') || description.includes('-') || description.includes('*')) {
      hasBulletPoints = true;
      expScore += 20;
    }

    // Check for metrics
    if (metricPatterns.some(pattern => pattern.test(description))) {
      hasQuantifiableAchievements = true;
      expScore += 20;
    }

    totalScore += expScore;
  });

  const avgScore = Math.min(100, totalScore / experience.length);

  let status: 'excellent' | 'good' | 'needs-improvement';
  let message: string;

  if (avgScore >= 80) {
    status = 'excellent';
    message = 'Experience section is well-optimized';
  } else if (avgScore >= 60) {
    status = 'good';
    message = 'Good experience details, room for improvement';
  } else {
    status = 'needs-improvement';
    message = 'Experience needs more detail and metrics';
  }

  return { score: avgScore, status, message };
};

const calculateSkillsScore = (skills: any) => {
  const technicalCount = skills.technical?.length || 0;
  const softCount = skills.soft?.length || 0;
  const totalSkills = technicalCount + softCount;

  let score = 0;
  if (totalSkills >= 8) score = 100;
  else if (totalSkills >= 5) score = 80;
  else if (totalSkills >= 3) score = 60;
  else if (totalSkills >= 1) score = 40;

  let status: 'excellent' | 'good' | 'needs-improvement';
  let message: string;

  if (score >= 80) {
    status = 'excellent';
    message = 'Strong skills section';
  } else if (score >= 60) {
    status = 'good';
    message = 'Good skills, consider adding more';
  } else {
    status = 'needs-improvement';
    message = 'Add more relevant skills';
  }

  return { score, status, message };
};

const calculateEducationScore = (education: any[]) => {
  if (education.length === 0) {
    return { score: 40, status: 'incomplete' as const, message: 'Education section empty' };
  }

  const hasCompleteEducation = education.some(edu => 
    edu.school?.trim() && edu.degree?.trim() && edu.field?.trim() && edu.startDate?.trim() && edu.endDate?.trim()
  );

  if (hasCompleteEducation) {
    return { score: 100, status: 'complete' as const, message: 'Education information complete' };
  } else {
    return { score: 60, status: 'incomplete' as const, message: 'Education missing some details' };
  }
};

const calculateKeywordScore = (data: ResumeData, industry: string) => {
  const relevantKeywords = industryKeywords[industry] || industryKeywords.Business;
  const allText = [
    ...data.experience.map(exp => exp.description || ''),
    ...data.skills.technical,
    ...data.skills.soft
  ].join(' ').toLowerCase();

  const foundKeywords = relevantKeywords.filter(keyword => 
    allText.includes(keyword.toLowerCase())
  );

  const keywordPercentage = (foundKeywords.length / relevantKeywords.length) * 100;
  const score = Math.min(100, keywordPercentage * 1.2); // Slight boost

  let status: 'excellent' | 'good' | 'needs-improvement';
  let message: string;

  if (score >= 60) {
    status = 'excellent';
    message = `Strong ${industry.toLowerCase()} keyword presence`;
  } else if (score >= 30) {
    status = 'good';
    message = `Good keyword usage, add more ${industry.toLowerCase()} terms`;
  } else {
    status = 'needs-improvement';
    message = `Add more ${industry.toLowerCase()} industry keywords`;
  }

  return { score, status, message };
};

const calculateMetricsScore = (experience: any[]) => {
  if (experience.length === 0) {
    return { score: 0, status: 'needs-improvement' as const, message: 'No experience to analyze' };
  }

  let totalMetrics = 0;
  experience.forEach(exp => {
    const description = exp.description || '';
    metricPatterns.forEach(pattern => {
      const matches = description.match(new RegExp(pattern, 'g'));
      if (matches) totalMetrics += matches.length;
    });
  });

  const avgMetricsPerExp = totalMetrics / experience.length;
  const score = Math.min(100, avgMetricsPerExp * 30);

  let status: 'excellent' | 'good' | 'needs-improvement';
  let message: string;

  if (avgMetricsPerExp >= 2) {
    status = 'excellent';
    message = 'Strong use of quantifiable achievements';
  } else if (avgMetricsPerExp >= 1) {
    status = 'good';
    message = 'Some metrics present, add more numbers';
  } else {
    status = 'needs-improvement';
    message = 'Add quantifiable achievements and metrics';
  }

  return { score, status, message };
};

const generateSuggestions = (checks: any, data: ResumeData): string[] => {
  const suggestions = [];

  if (checks.contactInfo.score < 85) {
    suggestions.push('Complete all contact information fields');
  }

  if (checks.experience.score < 80) {
    suggestions.push('Use more action verbs and bullet points in experience descriptions');
  }

  if (checks.metrics.score < 70) {
    suggestions.push('Add quantifiable achievements with specific numbers and percentages');
  }

  if (checks.skills.score < 80) {
    suggestions.push('Include more relevant technical and soft skills');
  }

  if (checks.keywords.score < 60) {
    suggestions.push('Incorporate more industry-specific keywords throughout your resume');
  }

  if (data.experience.length === 0) {
    suggestions.push('Add work experience with detailed descriptions');
  }

  return suggestions;
};