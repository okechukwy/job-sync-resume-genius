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
    
    return {
      matchScore,
      matchedKeywords: matchedKeywords.slice(0, 10), // Limit display
      missingKeywords: missingKeywords.slice(0, 10), // Limit display
      skillsGap: skillsGap
        .filter(skill => skill.importance === 'High' || !skill.hasSkill)
        .slice(0, 8), // Show most relevant skills
      recommendations
    };
  } catch (error) {
    console.error('Error analyzing job match:', error);
    throw new Error('Failed to analyze job match. Please try again.');
  }
};