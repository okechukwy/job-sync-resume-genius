
export interface ParsedResumeContent {
  workExperience: WorkExperience[];
  skills: SkillProficiency[];
  achievements: Achievement[];
  educationLevel: string;
  experienceLevel: 'entry' | 'junior' | 'mid' | 'senior' | 'executive';
  industryExperience: string[];
  managementExperience: boolean;
  totalYearsExperience: number;
  careerProgression: string;
  quantifiableResults: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  yearsInRole: number;
}

export interface SkillProficiency {
  skill: string;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
  contextOfUse: string[];
}

export interface Achievement {
  description: string;
  impact: string;
  metrics: string[];
  category: 'technical' | 'leadership' | 'business' | 'innovation';
}

export const parseResumeContent = (resumeContent: string): ParsedResumeContent => {
  const lowerContent = resumeContent.toLowerCase();
  
  // Extract years of experience
  const experienceMatches = resumeContent.match(/(\d+)\+?\s*years?\s*(?:of\s*)?(?:experience|exp)/gi) || [];
  const totalYears = experienceMatches.length > 0 
    ? Math.max(...experienceMatches.map(match => parseInt(match.match(/\d+/)?.[0] || '0')))
    : estimateExperienceFromContent(resumeContent);

  // Determine experience level
  const experienceLevel = determineExperienceLevel(totalYears, resumeContent);

  // Extract work experience
  const workExperience = extractWorkExperience(resumeContent);

  // Extract skills with proficiency
  const skills = extractSkillProficiency(resumeContent, workExperience);

  // Extract achievements
  const achievements = extractAchievements(resumeContent);

  // Detect management experience
  const managementExperience = detectManagementExperience(resumeContent);

  // Determine industry experience
  const industryExperience = extractIndustryExperience(resumeContent);

  // Assess career progression
  const careerProgression = assessCareerProgression(workExperience, totalYears);

  // Extract quantifiable results
  const quantifiableResults = extractQuantifiableResults(resumeContent);

  // Determine education level
  const educationLevel = determineEducationLevel(resumeContent);

  return {
    workExperience,
    skills,
    achievements,
    educationLevel,
    experienceLevel,
    industryExperience,
    managementExperience,
    totalYearsExperience: totalYears,
    careerProgression,
    quantifiableResults
  };
};

const estimateExperienceFromContent = (content: string): number => {
  const jobTitlePatterns = [
    /senior|sr\.|lead|principal|staff|architect/gi,
    /manager|director|head|chief|vp|vice\s*president/gi,
    /junior|jr\.|entry|associate|intern/gi
  ];

  let seniorCount = 0;
  let managementCount = 0;
  let juniorCount = 0;

  jobTitlePatterns[0].test(content) && (seniorCount = (content.match(jobTitlePatterns[0]) || []).length);
  jobTitlePatterns[1].test(content) && (managementCount = (content.match(jobTitlePatterns[1]) || []).length);
  jobTitlePatterns[2].test(content) && (juniorCount = (content.match(jobTitlePatterns[2]) || []).length);

  if (managementCount > 0) return Math.max(8, seniorCount * 2);
  if (seniorCount > juniorCount) return Math.max(5, seniorCount * 1.5);
  if (juniorCount > 0) return Math.min(3, juniorCount);
  
  // Count job sections as rough estimate
  const jobSections = (content.match(/\d{4}\s*[-–]\s*(?:\d{4}|present|current)/gi) || []).length;
  return Math.max(1, jobSections * 2);
};

const determineExperienceLevel = (years: number, content: string): ParsedResumeContent['experienceLevel'] => {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('ceo') || lowerContent.includes('founder') || years >= 15) return 'executive';
  if (lowerContent.includes('director') || lowerContent.includes('vp') || years >= 10) return 'senior';
  if (lowerContent.includes('senior') || lowerContent.includes('lead') || years >= 5) return 'senior';
  if (lowerContent.includes('junior') || lowerContent.includes('entry') || years <= 2) return 'entry';
  return 'mid';
};

const extractWorkExperience = (content: string): WorkExperience[] => {
  // Simple extraction - in a real implementation, this would be much more sophisticated
  const experienceSection = content.match(/(?:experience|employment|work history)([\s\S]*?)(?:education|skills|projects|$)/i);
  if (!experienceSection) return [];

  const experiences: WorkExperience[] = [];
  const jobBlocks = experienceSection[1].split(/\n\s*\n/).filter(block => block.trim().length > 50);

  jobBlocks.forEach(block => {
    const titleMatch = block.match(/^([^,\n]+?)(?:,|\s+at\s+|\s+@\s+|\n)/i);
    const companyMatch = block.match(/(?:at\s+|@\s+)([^,\n]+)/i);
    const durationMatch = block.match(/(\d{4}\s*[-–]\s*(?:\d{4}|present|current))/i);
    
    if (titleMatch) {
      const title = titleMatch[1].trim();
      const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company';
      const duration = durationMatch ? durationMatch[1] : '';
      
      // Extract technologies mentioned in this job block
      const technologies = extractTechnologiesFromBlock(block);
      
      // Extract responsibilities and achievements
      const responsibilities = extractResponsibilities(block);
      const achievements = extractAchievementsFromBlock(block);
      
      const yearsInRole = calculateYearsFromDuration(duration);

      experiences.push({
        title,
        company,
        duration,
        responsibilities,
        technologies,
        achievements,
        yearsInRole
      });
    }
  });

  return experiences;
};

const extractSkillProficiency = (content: string, workExperience: WorkExperience[]): SkillProficiency[] => {
  const skillsSection = content.match(/(?:skills|technologies|technical skills)([\s\S]*?)(?:experience|education|projects|$)/i);
  const skills: SkillProficiency[] = [];
  const lowerContent = content.toLowerCase();

  // Common technical skills to look for
  const technicalSkills = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'C#',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'SQL', 'MongoDB', 'PostgreSQL',
    'Machine Learning', 'AI', 'Data Science', 'DevOps', 'CI/CD', 'REST API', 'GraphQL'
  ];

  technicalSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    if (lowerContent.includes(skillLower)) {
      // Determine proficiency based on context
      let proficiencyLevel: SkillProficiency['proficiencyLevel'] = 'intermediate';
      let yearsOfExperience = 0;
      
      // Look for proficiency indicators
      if (lowerContent.includes(`expert ${skillLower}`) || lowerContent.includes(`${skillLower} expert`)) {
        proficiencyLevel = 'expert';
        yearsOfExperience = 5;
      } else if (lowerContent.includes(`advanced ${skillLower}`) || lowerContent.includes(`${skillLower} advanced`)) {
        proficiencyLevel = 'advanced';
        yearsOfExperience = 3;
      } else if (lowerContent.includes(`beginner ${skillLower}`) || lowerContent.includes(`${skillLower} beginner`)) {
        proficiencyLevel = 'beginner';
        yearsOfExperience = 1;
      } else {
        // Estimate based on work experience
        const usageInJobs = workExperience.filter(job => 
          job.technologies.some(tech => tech.toLowerCase().includes(skillLower))
        );
        yearsOfExperience = usageInJobs.reduce((total, job) => total + job.yearsInRole, 0);
        
        if (yearsOfExperience >= 5) proficiencyLevel = 'expert';
        else if (yearsOfExperience >= 3) proficiencyLevel = 'advanced';
        else if (yearsOfExperience >= 1) proficiencyLevel = 'intermediate';
        else proficiencyLevel = 'beginner';
      }

      const contextOfUse = workExperience
        .filter(job => job.technologies.some(tech => tech.toLowerCase().includes(skillLower)))
        .map(job => `${job.title} at ${job.company}`);

      skills.push({
        skill,
        proficiencyLevel,
        yearsOfExperience,
        contextOfUse
      });
    }
  });

  return skills;
};

const extractAchievements = (content: string): Achievement[] => {
  const achievements: Achievement[] = [];
  
  // Look for quantifiable achievements
  const achievementPatterns = [
    /(?:increased|improved|reduced|decreased|achieved|delivered|generated|saved)\s+[^.!?]*?(?:\d+%|\$\d+|[,\d]+\s*users?|[,\d]+\s*customers?)/gi,
    /(?:led|managed|mentored)\s+[^.!?]*?(?:team|people|developers|engineers)/gi,
    /(?:built|developed|created|designed)\s+[^.!?]*?(?:system|platform|application|solution)/gi
  ];

  achievementPatterns.forEach((pattern, index) => {
    const matches = content.match(pattern) || [];
    matches.forEach(match => {
      const category = index === 0 ? 'business' : index === 1 ? 'leadership' : 'technical';
      
      // Extract metrics
      const metrics = match.match(/\d+%|\$[\d,]+|[\d,]+\s*(?:users?|customers?|people)/gi) || [];
      
      achievements.push({
        description: match.trim(),
        impact: estimateImpact(match, category),
        metrics,
        category: category as Achievement['category']
      });
    });
  });

  return achievements;
};

const detectManagementExperience = (content: string): boolean => {
  const managementKeywords = [
    'managed', 'led', 'supervised', 'mentored', 'coached', 'directed',
    'team lead', 'manager', 'director', 'head of', 'chief'
  ];
  
  const lowerContent = content.toLowerCase();
  return managementKeywords.some(keyword => lowerContent.includes(keyword));
};

const extractIndustryExperience = (content: string): string[] => {
  const industries = [
    'fintech', 'healthcare', 'e-commerce', 'edtech', 'gaming', 'media',
    'banking', 'insurance', 'retail', 'manufacturing', 'consulting',
    'startup', 'enterprise', 'saas', 'b2b', 'b2c'
  ];
  
  const lowerContent = content.toLowerCase();
  return industries.filter(industry => lowerContent.includes(industry));
};

const assessCareerProgression = (workExperience: WorkExperience[], totalYears: number): string => {
  if (workExperience.length === 0) return 'insufficient_data';
  
  const titles = workExperience.map(exp => exp.title.toLowerCase());
  const hasProgression = titles.some(title => title.includes('senior') || title.includes('lead')) &&
                        titles.some(title => title.includes('junior') || !title.includes('senior'));
  
  if (hasProgression && totalYears > 5) return 'strong_progression';
  if (totalYears > 3) return 'steady_growth';
  return 'early_career';
};

const extractQuantifiableResults = (content: string): string[] => {
  const quantifiablePatterns = [
    /\d+%\s*(?:increase|improvement|growth|reduction|decrease)/gi,
    /\$[\d,]+(?:\.\d{2})?\s*(?:revenue|cost|savings|budget)/gi,
    /[\d,]+\s*(?:users|customers|clients|downloads|transactions)/gi,
    /\d+x\s*(?:faster|improvement|increase)/gi
  ];
  
  const results: string[] = [];
  quantifiablePatterns.forEach(pattern => {
    const matches = content.match(pattern) || [];
    results.push(...matches);
  });
  
  return [...new Set(results)]; // Remove duplicates
};

const determineEducationLevel = (content: string): string => {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('phd') || lowerContent.includes('doctorate')) return 'doctorate';
  if (lowerContent.includes('master') || lowerContent.includes('mba') || lowerContent.includes('ms ') || lowerContent.includes('ma ')) return 'masters';
  if (lowerContent.includes('bachelor') || lowerContent.includes('bs ') || lowerContent.includes('ba ') || lowerContent.includes('degree')) return 'bachelors';
  if (lowerContent.includes('associate') || lowerContent.includes('diploma')) return 'associates';
  return 'other';
};

// Helper functions
const extractTechnologiesFromBlock = (block: string): string[] => {
  const techKeywords = ['JavaScript', 'React', 'Python', 'Java', 'AWS', 'Docker', 'SQL', 'Git'];
  return techKeywords.filter(tech => block.toLowerCase().includes(tech.toLowerCase()));
};

const extractResponsibilities = (block: string): string[] => {
  return block.split('\n')
    .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*'))
    .map(line => line.replace(/^[•\-*]\s*/, '').trim())
    .filter(line => line.length > 20);
};

const extractAchievementsFromBlock = (block: string): string[] => {
  return block.split('\n')
    .filter(line => /(?:achieved|delivered|increased|improved|reduced|built|led|managed)/i.test(line))
    .map(line => line.trim())
    .filter(line => line.length > 20);
};

const calculateYearsFromDuration = (duration: string): number => {
  const match = duration.match(/(\d{4})\s*[-–]\s*(?:(\d{4})|present|current)/i);
  if (!match) return 1;
  
  const startYear = parseInt(match[1]);
  const endYear = match[2] ? parseInt(match[2]) : new Date().getFullYear();
  
  return Math.max(1, endYear - startYear);
};

const estimateImpact = (achievement: string, category: string): string => {
  const lowerAchievement = achievement.toLowerCase();
  
  if (lowerAchievement.includes('million') || lowerAchievement.includes('100%')) return 'high';
  if (lowerAchievement.includes('thousand') || lowerAchievement.includes('50%')) return 'medium';
  return 'low';
};
