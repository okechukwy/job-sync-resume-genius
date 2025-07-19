import { readFileContent } from './fileReader';

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

export const analyzeJobMatch = async (
  jobDescription: string,
  resumeFile: File
): Promise<JobMatchingResult> => {
  try {
    // Read resume content
    const resumeContent = await readFileContent(resumeFile);
    
    // Extract keywords from both job description and resume
    const jobKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeContent);
    
    // Find matched and missing keywords
    const matchedKeywords = jobKeywords.filter(keyword =>
      resumeKeywords.some(resumeKeyword =>
        resumeKeyword.toLowerCase().includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(resumeKeyword.toLowerCase())
      )
    );
    
    const missingKeywords = jobKeywords.filter(keyword =>
      !matchedKeywords.some(matched =>
        matched.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    // Create skills gap analysis
    const allSkills = [...new Set([...jobKeywords, ...resumeKeywords])];
    const skillsGap = allSkills.map(skill => ({
      skill,
      importance: determineImportance(skill, jobDescription),
      hasSkill: resumeKeywords.some(resumeSkill =>
        resumeSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(resumeSkill.toLowerCase())
      )
    }));
    
    // Calculate overall match score
    const matchScore = calculateMatchScore(
      jobKeywords,
      resumeKeywords,
      matchedKeywords,
      missingKeywords
    );
    
    // Generate recommendations
    const recommendations = generateRecommendations(missingKeywords, skillsGap);
    
    // Generate dynamic pro tips
    const proTips = generateProTips(jobDescription, matchScore, missingKeywords, skillsGap);
    
    return {
      matchScore,
      matchedKeywords: matchedKeywords.slice(0, 10), // Limit display
      missingKeywords: missingKeywords.slice(0, 10), // Limit display
      skillsGap: skillsGap
        .filter(skill => skill.importance === 'High' || !skill.hasSkill)
        .slice(0, 8), // Show most relevant skills
      recommendations,
      proTips
    };
  } catch (error) {
    console.error('Error analyzing job match:', error);
    throw new Error('Failed to analyze job match. Please try again.');
  }
};
