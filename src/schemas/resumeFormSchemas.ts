import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().optional(),
  linkedin: z.string().optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Job title is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(1, "Job description is required"),
});

export const educationSchema = z.object({
  school: z.string().min(1, "School/University is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  gpa: z.string().optional(),
});

export const summarySchema = z.object({
  content: z.string().min(50, "Summary must be at least 50 characters long").max(500, "Summary must be less than 500 characters"),
});

export const skillsSchema = z.object({
  technical: z.array(z.string()).min(1, "At least one technical skill is required"),
  soft: z.array(z.string()).min(1, "At least one soft skill is required"),
});

export const certificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  issuer: z.string().min(1, "Issuing organization is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),
});

export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Native"]),
});

export const volunteeringSchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(1, "Description is required"),
});

export const awardSchema = z.object({
  title: z.string().min(1, "Award title is required"),
  issuer: z.string().min(1, "Issuing organization is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
});

export const publicationSchema = z.object({
  title: z.string().min(1, "Publication title is required"),
  publisher: z.string().min(1, "Publisher is required"),
  date: z.string().min(1, "Publication date is required"),
  url: z.string().optional(),
  description: z.string().optional(),
});

export const interestsSchema = z.object({
  interests: z.array(z.string()).min(1, "At least one interest is required"),
});

export const additionalInfoSchema = z.object({
  content: z.string().min(10, "Additional information must be at least 10 characters long"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type SummaryFormData = z.infer<typeof summarySchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type SkillsFormData = z.infer<typeof skillsSchema>;
export type CertificateFormData = z.infer<typeof certificateSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type LanguageFormData = z.infer<typeof languageSchema>;
export type VolunteeringFormData = z.infer<typeof volunteeringSchema>;
export type AwardFormData = z.infer<typeof awardSchema>;
export type PublicationFormData = z.infer<typeof publicationSchema>;
export type InterestsFormData = z.infer<typeof interestsSchema>;
export type AdditionalInfoFormData = z.infer<typeof additionalInfoSchema>;