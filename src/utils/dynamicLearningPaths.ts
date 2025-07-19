
import { ParsedResumeContent, SkillProficiency } from './resumeContentParser';

export interface PersonalizedLearningPath {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  estimatedTimeWeeks: number;
  learningSteps: LearningStep[];
  prerequisites: string[];
  costEstimate: CostEstimate;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  priorityScore: number;
}

export interface LearningStep {
  stepNumber: number;
  title: string;
  description: string;
  resources: Resource[];
  estimatedHours: number;
  practicalProject: string;
}

export interface Resource {
  type: 'course' | 'book' | 'documentation' | 'tutorial' | 'certification';
  name: string;
  provider: string;
  cost: number;
  rating: number;
  duration: string;
}

export interface CostEstimate {
  free: Resource[];
  paid: Resource[];
  totalCostRange: { min: number; max: number };
}

export const generatePersonalizedLearningPath = (
  skill: string,
  resumeData: ParsedResumeContent,
  targetRole: string,
  urgency: 'low' | 'medium' | 'high' = 'medium'
): PersonalizedLearningPath => {
  const currentSkill = resumeData.skills.find(s => s.skill.toLowerCase() === skill.toLowerCase());
  const currentLevel = currentSkill?.proficiencyLevel || 'beginner';
  const targetLevel = determineTargetLevel(skill, targetRole, resumeData.experienceLevel);
  
  const baseTimeWeeks = calculateBaseTimeEstimate(skill, currentLevel, targetLevel);
  const adjustedTime = adjustTimeForPersonalContext(baseTimeWeeks, resumeData, urgency);
  
  const learningSteps = generateContextualLearningSteps(skill, currentLevel, targetLevel, resumeData);
  const prerequisites = identifyPrerequisites(skill, resumeData.skills);
  const costEstimate = generateCostEstimate(skill, learningSteps);
  const difficultyLevel = assessDifficultyForUser(skill, resumeData);
  const priorityScore = calculatePriorityScore(skill, targetRole, resumeData, urgency);

  return {
    skill,
    currentLevel,
    targetLevel,
    estimatedTimeWeeks: adjustedTime,
    learningSteps,
    prerequisites,
    costEstimate,
    difficultyLevel,
    priorityScore
  };
};

const determineTargetLevel = (skill: string, targetRole: string, experienceLevel: string): string => {
  const roleRequirements = {
    'senior': { 'React': 'advanced', 'JavaScript': 'expert', 'Python': 'advanced' },
    'mid': { 'React': 'intermediate', 'JavaScript': 'advanced', 'Python': 'intermediate' },
    'junior': { 'React': 'intermediate', 'JavaScript': 'intermediate', 'Python': 'beginner' }
  };

  const roleKey = targetRole.toLowerCase().includes('senior') ? 'senior' : 
                 targetRole.toLowerCase().includes('junior') ? 'junior' : 'mid';
  
  return roleRequirements[roleKey][skill] || 'intermediate';
};

const calculateBaseTimeEstimate = (skill: string, currentLevel: string, targetLevel: string): number => {
  const levelProgression = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
  const levelGap = levelProgression[targetLevel] - levelProgression[currentLevel];
  
  const skillComplexity = {
    'React': 8, 'Angular': 10, 'Vue': 6, 'JavaScript': 12, 'TypeScript': 6,
    'Python': 10, 'Java': 14, 'C#': 12, 'Go': 8,
    'AWS': 16, 'Docker': 6, 'Kubernetes': 12, 'DevOps': 20,
    'Machine Learning': 24, 'Data Science': 20, 'AI': 28
  };
  
  const baseWeeks = (skillComplexity[skill] || 8) * Math.max(1, levelGap);
  return Math.min(52, Math.max(2, baseWeeks)); // Cap at 1 year, minimum 2 weeks
};

const adjustTimeForPersonalContext = (
  baseTime: number, 
  resumeData: ParsedResumeContent, 
  urgency: 'low' | 'medium' | 'high'
): number => {
  let adjustedTime = baseTime;
  
  // Adjust for experience level - experienced developers learn faster
  const experienceMultiplier = {
    'entry': 1.3,
    'junior': 1.2,
    'mid': 1.0,
    'senior': 0.8,
    'executive': 0.7
  };
  adjustedTime *= experienceMultiplier[resumeData.experienceLevel];
  
  // Adjust for related skills - having similar skills accelerates learning
  const relatedSkillsCount = resumeData.skills.filter(skill => 
    ['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular'].some(related => 
      skill.skill.includes(related)
    )
  ).length;
  
  if (relatedSkillsCount > 3) adjustedTime *= 0.8;
  else if (relatedSkillsCount > 1) adjustedTime *= 0.9;
  
  // Adjust for urgency
  const urgencyMultiplier = { 'low': 1.2, 'medium': 1.0, 'high': 0.7 };
  adjustedTime *= urgencyMultiplier[urgency];
  
  return Math.round(adjustedTime);
};

const generateContextualLearningSteps = (
  skill: string,
  currentLevel: string,
  targetLevel: string,
  resumeData: ParsedResumeContent
): LearningStep[] => {
  const skillPaths = {
    'React': generateReactLearningPath,
    'Python': generatePythonLearningPath,
    'AWS': generateAWSLearningPath,
    'Machine Learning': generateMLLearningPath
  };
  
  const pathGenerator = skillPaths[skill] || generateGenericLearningPath;
  return pathGenerator(currentLevel, targetLevel, resumeData);
};

const generateReactLearningPath = (currentLevel: string, targetLevel: string, resumeData: ParsedResumeContent): LearningStep[] => {
  const hasJavaScript = resumeData.skills.some(s => s.skill.toLowerCase().includes('javascript'));
  const hasTypeScript = resumeData.skills.some(s => s.skill.toLowerCase().includes('typescript'));
  
  const steps: LearningStep[] = [];
  
  if (currentLevel === 'beginner') {
    steps.push({
      stepNumber: 1,
      title: 'React Fundamentals',
      description: 'Master JSX, components, props, and state management',
      resources: [
        {
          type: 'course',
          name: 'React - The Complete Guide',
          provider: 'Udemy',
          cost: 89.99,
          rating: 4.7,
          duration: '49 hours'
        },
        {
          type: 'documentation',
          name: 'Official React Tutorial',
          provider: 'React.dev',
          cost: 0,
          rating: 4.8,
          duration: '8 hours'
        }
      ],
      estimatedHours: 40,
      practicalProject: 'Build a todo app with CRUD operations'
    });
  }
  
  if (currentLevel === 'beginner' || currentLevel === 'intermediate') {
    steps.push({
      stepNumber: steps.length + 1,
      title: 'React Hooks & Context',
      description: 'Learn useState, useEffect, useContext, and custom hooks',
      resources: [
        {
          type: 'course', 
          name: 'Advanced React Patterns',
          provider: 'Frontend Masters',
          cost: 39,
          rating: 4.9,
          duration: '6 hours'
        }
      ],
      estimatedHours: 25,
      practicalProject: 'Build a weather app with API integration and state management'
    });
  }
  
  if (targetLevel === 'advanced' || targetLevel === 'expert') {
    steps.push({
      stepNumber: steps.length + 1,
      title: 'React Performance & Testing',
      description: 'Optimize performance, learn testing strategies, and advanced patterns',
      resources: [
        {
          type: 'course',
          name: 'Testing React Applications',
          provider: 'Testing Library',
          cost: 0,
          rating: 4.6,
          duration: '12 hours'
        }
      ],
      estimatedHours: 35,
      practicalProject: `Build a ${resumeData.industryExperience.includes('e-commerce') ? 'e-commerce dashboard' : 'social media dashboard'} with advanced features`
    });
  }
  
  return steps;
};

const generatePythonLearningPath = (currentLevel: string, targetLevel: string, resumeData: ParsedResumeContent): LearningStep[] => {
  const steps: LearningStep[] = [];
  const hasDataExperience = resumeData.industryExperience.some(ind => ['analytics', 'data', 'ml'].some(term => ind.includes(term)));
  
  if (currentLevel === 'beginner') {
    steps.push({
      stepNumber: 1,
      title: 'Python Basics',
      description: 'Syntax, data structures, functions, and OOP concepts',
      resources: [
        {
          type: 'course',
          name: 'Python for Everybody',
          provider: 'Coursera',
          cost: 49,
          rating: 4.8,
          duration: '40 hours'
        }
      ],
      estimatedHours: 50,
      practicalProject: 'Build a personal expense tracker CLI application'
    });
  }
  
  if (hasDataExperience && (targetLevel === 'advanced' || targetLevel === 'expert')) {
    steps.push({
      stepNumber: steps.length + 1,
      title: 'Data Science with Python',
      description: 'Pandas, NumPy, Matplotlib, and data analysis techniques',
      resources: [
        {
          type: 'course',
          name: 'Data Analysis with Python',
          provider: 'IBM',
          cost: 79,
          rating: 4.7,
          duration: '25 hours'
        }
      ],
      estimatedHours: 40,
      practicalProject: 'Analyze your industry\'s market trends using public datasets'
    });
  }
  
  return steps;
};

const generateAWSLearningPath = (currentLevel: string, targetLevel: string, resumeData: ParsedResumeContent): LearningStep[] => {
  const steps: LearningStep[] = [];
  
  steps.push({
    stepNumber: 1,
    title: 'AWS Cloud Fundamentals',
    description: 'Core services: EC2, S3, RDS, and basic networking',
    resources: [
      {
        type: 'certification',
        name: 'AWS Cloud Practitioner',
        provider: 'AWS',
        cost: 100,
        rating: 4.5,
        duration: '20 hours prep'
      }
    ],
    estimatedHours: 30,
    practicalProject: 'Deploy a simple web application using EC2 and S3'
  });
  
  if (targetLevel === 'advanced' || targetLevel === 'expert') {
    steps.push({
      stepNumber: 2,
      title: 'AWS Solutions Architecture',
      description: 'Design scalable, resilient cloud architectures',
      resources: [
        {
          type: 'certification',
          name: 'AWS Solutions Architect Associate',
          provider: 'AWS',
          cost: 150,
          rating: 4.6,
          duration: '60 hours prep'
        }
      ],
      estimatedHours: 80,
      practicalProject: 'Build a microservices architecture for your portfolio project'
    });
  }
  
  return steps;
};

const generateMLLearningPath = (currentLevel: string, targetLevel: string, resumeData: ParsedResumeContent): LearningStep[] => {
  const hasMathBackground = resumeData.educationLevel === 'masters' || resumeData.educationLevel === 'doctorate';
  const hasProgrammingExperience = resumeData.skills.some(s => ['Python', 'R', 'JavaScript'].includes(s.skill));
  
  const steps: LearningStep[] = [];
  
  if (!hasMathBackground) {
    steps.push({
      stepNumber: 1,
      title: 'Mathematics for ML',
      description: 'Linear algebra, statistics, and calculus fundamentals',
      resources: [
        {
          type: 'course',
          name: 'Mathematics for Machine Learning',
          provider: 'Coursera',
          cost: 79,
          rating: 4.4,
          duration: '30 hours'
        }
      ],
      estimatedHours: 40,
      practicalProject: 'Implement basic statistical analysis on a dataset'
    });
  }
  
  steps.push({
    stepNumber: steps.length + 1,
    title: 'Machine Learning Fundamentals',
    description: 'Supervised/unsupervised learning, algorithms, and model evaluation',
    resources: [
      {
        type: 'course',
        name: 'Machine Learning Course',
        provider: 'Andrew Ng',
        cost: 79,
        rating: 4.9,
        duration: '60 hours'
      }
    ],
    estimatedHours: 80,
    practicalProject: `Build a predictive model for ${resumeData.industryExperience[0] || 'business'} use case`
  });
  
  return steps;
};

const generateGenericLearningPath = (currentLevel: string, targetLevel: string, resumeData: ParsedResumeContent): LearningStep[] => {
  return [
    {
      stepNumber: 1,
      title: `Learn Core Concepts`,
      description: 'Understand fundamental principles and best practices',
      resources: [
        {
          type: 'documentation',
          name: 'Official Documentation',
          provider: 'Official',
          cost: 0,
          rating: 4.5,
          duration: '10 hours'
        }
      ],
      estimatedHours: 20,
      practicalProject: 'Build a basic project demonstrating core concepts'
    },
    {
      stepNumber: 2,
      title: 'Advanced Applications',
      description: 'Apply knowledge to real-world scenarios and complex problems',
      resources: [
        {
          type: 'course',
          name: 'Advanced Techniques',
          provider: 'Various',
          cost: 50,
          rating: 4.3,
          duration: '15 hours'
        }
      ],
      estimatedHours: 30,
      practicalProject: 'Create a portfolio project showcasing advanced skills'
    }
  ];
};

const identifyPrerequisites = (skill: string, currentSkills: SkillProficiency[]): string[] => {
  const prerequisites: { [key: string]: string[] } = {
    'React': ['JavaScript', 'HTML', 'CSS'],
    'TypeScript': ['JavaScript'],
    'Node.js': ['JavaScript'],
    'AWS': ['Cloud Computing Basics', 'Networking Fundamentals'],
    'Machine Learning': ['Python', 'Statistics', 'Linear Algebra'],
    'Data Science': ['Python', 'Statistics', 'SQL']
  };
  
  const requiredPrereqs = prerequisites[skill] || [];
  const currentSkillNames = currentSkills.map(s => s.skill);
  
  return requiredPrereqs.filter(prereq => 
    !currentSkillNames.some(current => current.toLowerCase().includes(prereq.toLowerCase()))
  );
};

const generateCostEstimate = (skill: string, learningSteps: LearningStep[]): CostEstimate => {
  const allResources = learningSteps.flatMap(step => step.resources);
  const free = allResources.filter(r => r.cost === 0);
  const paid = allResources.filter(r => r.cost > 0);
  
  const totalCostRange = {
    min: Math.min(...paid.map(r => r.cost), 0),
    max: paid.reduce((sum, r) => sum + r.cost, 0)
  };
  
  return { free, paid, totalCostRange };
};

const assessDifficultyForUser = (skill: string, resumeData: ParsedResumeContent): 'beginner' | 'intermediate' | 'advanced' => {
  const relatedSkillsCount = resumeData.skills.filter(s => 
    s.skill.toLowerCase().includes('javascript') || 
    s.skill.toLowerCase().includes('programming') ||
    s.skill.toLowerCase().includes('development')
  ).length;
  
  if (resumeData.experienceLevel === 'senior' || resumeData.experienceLevel === 'executive') return 'intermediate';
  if (relatedSkillsCount > 2) return 'intermediate';
  return 'beginner';
};

const calculatePriorityScore = (
  skill: string,
  targetRole: string,
  resumeData: ParsedResumeContent,
  urgency: 'low' | 'medium' | 'high'
): number => {
  let score = 50; // Base score
  
  // Adjust for role relevance
  const roleKeywords = targetRole.toLowerCase();
  if (roleKeywords.includes(skill.toLowerCase())) score += 30;
  
  // Adjust for current skill gap
  const currentSkill = resumeData.skills.find(s => s.skill.toLowerCase() === skill.toLowerCase());
  if (!currentSkill) score += 20; // Higher priority if completely missing
  
  // Adjust for industry relevance
  const industrySkillMap = {
    'fintech': ['React', 'Node.js', 'Python', 'AWS'],
    'healthcare': ['Python', 'Data Science', 'Machine Learning'],
    'e-commerce': ['React', 'Node.js', 'AWS', 'Analytics']
  };
  
  resumeData.industryExperience.forEach(industry => {
    if (industrySkillMap[industry]?.includes(skill)) score += 15;
  });
  
  // Adjust for urgency
  const urgencyBonus = { 'low': 0, 'medium': 10, 'high': 20 };
  score += urgencyBonus[urgency];
  
  return Math.min(100, Math.max(0, score));
};
