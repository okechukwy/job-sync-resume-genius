export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    profilePicture?: string;
  };
  summary: {
    content: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  certificates: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
    current: boolean;
    projectUrl?: string;
    githubUrl?: string;
  }>;
  languages: Array<{
    id: string;
    language: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Native";
  }>;
  volunteering: Array<{
    id: string;
    organization: string;
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
  awards: Array<{
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
  }>;
  publications: Array<{
    id: string;
    title: string;
    publisher: string;
    date: string;
    url?: string;
    description?: string;
  }>;
  interests: {
    interests: string[];
  };
  additionalInfo: {
    content: string;
  };
}

export interface ResumeStep {
  number: number;
  title: string;
  description: string;
  category: "core" | "additional" | "final";
  required: boolean;
}

export type FormValidationState = {
  personalInfo: boolean;
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  certificates: boolean;
  projects: boolean;
  languages: boolean;
  volunteering: boolean;
  awards: boolean;
  publications: boolean;
  interests: boolean;
  additionalInfo: boolean;
};