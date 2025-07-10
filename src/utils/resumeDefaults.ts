import { ResumeData } from "@/types/resumeTypes";

export const getInitialResumeData = (): ResumeData => ({
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    profilePicture: '',
  },
  summary: {
    content: '',
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
  },
  certificates: [],
  projects: [],
  languages: [],
  volunteering: [],
  awards: [],
  publications: [],
  interests: {
    interests: [],
  },
  additionalInfo: {
    content: '',
  },
});