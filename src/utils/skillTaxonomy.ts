
export interface SkillCategory {
  name: string;
  type: 'technical' | 'soft' | 'tool' | 'methodology' | 'certification' | 'domain';
  weight: number;
  synonyms: string[];
  relatedSkills: string[];
  proficiencyLevels: string[];
}

export interface IndustrySkillMatrix {
  industry: string;
  criticalSkills: string[];
  preferredSkills: string[];
  emergingSkills: string[];
  obsoleteSkills: string[];
  salaryImpact: { [skill: string]: number };
}

export const SKILL_TAXONOMY: { [key: string]: SkillCategory } = {
  'JavaScript': {
    name: 'JavaScript',
    type: 'technical',
    weight: 0.9,
    synonyms: ['JS', 'ECMAScript', 'ES6', 'ES2015+'],
    relatedSkills: ['TypeScript', 'Node.js', 'React', 'Vue.js', 'Angular'],
    proficiencyLevels: ['Basic', 'Intermediate', 'Advanced', 'Expert']
  },
  'Python': {
    name: 'Python',
    type: 'technical',
    weight: 0.9,
    synonyms: ['Python3', 'Python 3', 'Py'],
    relatedSkills: ['Django', 'Flask', 'FastAPI', 'Data Science', 'Machine Learning'],
    proficiencyLevels: ['Basic', 'Intermediate', 'Advanced', 'Expert']
  },
  'React': {
    name: 'React',
    type: 'technical',
    weight: 0.8,
    synonyms: ['React.js', 'ReactJS'],
    relatedSkills: ['JavaScript', 'JSX', 'Redux', 'Next.js', 'TypeScript'],
    proficiencyLevels: ['Basic', 'Intermediate', 'Advanced', 'Expert']
  },
  'Leadership': {
    name: 'Leadership',
    type: 'soft',
    weight: 0.7,
    synonyms: ['Team Leadership', 'Management', 'Team Management'],
    relatedSkills: ['Communication', 'Project Management', 'Mentoring'],
    proficiencyLevels: ['Emerging', 'Developing', 'Proficient', 'Expert']
  },
  'AWS': {
    name: 'AWS',
    type: 'tool',
    weight: 0.8,
    synonyms: ['Amazon Web Services', 'Amazon AWS'],
    relatedSkills: ['Cloud Computing', 'DevOps', 'Docker', 'Kubernetes'],
    proficiencyLevels: ['Basic', 'Associate', 'Professional', 'Expert']
  },
  'Agile': {
    name: 'Agile',
    type: 'methodology',
    weight: 0.6,
    synonyms: ['Agile Development', 'Agile Methodology'],
    relatedSkills: ['Scrum', 'Kanban', 'Sprint Planning', 'User Stories'],
    proficiencyLevels: ['Familiar', 'Practicing', 'Experienced', 'Coach']
  }
};

export const INDUSTRY_MATRICES: { [key: string]: IndustrySkillMatrix } = {
  'technology': {
    industry: 'Technology',
    criticalSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Git'],
    preferredSkills: ['TypeScript', 'Docker', 'Kubernetes', 'CI/CD', 'Testing'],
    emergingSkills: ['AI/ML', 'Blockchain', 'WebAssembly', 'Edge Computing'],
    obsoleteSkills: ['Flash', 'Silverlight', 'Internet Explorer'],
    salaryImpact: {
      'JavaScript': 15,
      'Python': 18,
      'AWS': 20,
      'Machine Learning': 25,
      'Blockchain': 22
    }
  },
  'healthcare': {
    industry: 'Healthcare',
    criticalSkills: ['HIPAA', 'Electronic Health Records', 'Patient Care', 'Medical Terminology'],
    preferredSkills: ['Epic', 'Cerner', 'Healthcare Analytics', 'Telemedicine'],
    emergingSkills: ['AI in Healthcare', 'Digital Health', 'Precision Medicine'],
    obsoleteSkills: ['Paper Records', 'Fax Systems'],
    salaryImpact: {
      'HIPAA': 12,
      'Epic': 15,
      'Healthcare Analytics': 18,
      'AI in Healthcare': 25
    }
  },
  'finance': {
    industry: 'Finance',
    criticalSkills: ['Financial Analysis', 'Excel', 'SQL', 'Risk Management'],
    preferredSkills: ['Python', 'R', 'Bloomberg Terminal', 'Financial Modeling'],
    emergingSkills: ['FinTech', 'Cryptocurrency', 'Algorithmic Trading', 'RegTech'],
    obsoleteSkills: ['Manual Calculations', 'Legacy Banking Systems'],
    salaryImpact: {
      'Python': 20,
      'Financial Modeling': 18,
      'Risk Management': 15,
      'FinTech': 22
    }
  }
};
