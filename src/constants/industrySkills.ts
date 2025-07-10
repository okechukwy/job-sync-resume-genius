import { IndustrySkills } from "@/types/skillsTypes";

export const INDUSTRY_SKILLS: Record<string, IndustrySkills> = {
  Technology: {
    technical: ["JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Docker", "Git", "TypeScript", "MongoDB"],
    soft: ["Problem Solving", "Analytical Thinking", "Team Collaboration", "Agile Methodologies", "Communication"]
  },
  Healthcare: {
    technical: ["EMR Systems", "Medical Terminology", "HIPAA Compliance", "Clinical Documentation", "Medical Software"],
    soft: ["Patient Care", "Empathy", "Attention to Detail", "Communication", "Critical Thinking", "Stress Management"]
  },
  Finance: {
    technical: ["Excel", "Financial Modeling", "Bloomberg Terminal", "SQL", "Python", "R", "Tableau", "QuickBooks"],
    soft: ["Analytical Skills", "Risk Assessment", "Attention to Detail", "Client Relations", "Problem Solving"]
  },
  Creative: {
    technical: ["Adobe Creative Suite", "Figma", "Sketch", "HTML/CSS", "Photography", "Video Editing", "Branding"],
    soft: ["Creativity", "Visual Communication", "Project Management", "Client Collaboration", "Adaptability"]
  },
  Business: {
    technical: ["Project Management", "CRM Software", "Data Analysis", "Excel", "PowerPoint", "Salesforce"],
    soft: ["Leadership", "Strategic Planning", "Communication", "Negotiation", "Team Management", "Problem Solving"]
  },
  Research: {
    technical: ["Statistical Analysis", "R", "Python", "SPSS", "Research Methodologies", "Data Visualization"],
    soft: ["Critical Thinking", "Attention to Detail", "Written Communication", "Research Skills", "Analytical Skills"]
  }
};

export const getIndustrySkills = (industry: string): IndustrySkills => {
  return INDUSTRY_SKILLS[industry] || INDUSTRY_SKILLS.Business;
};