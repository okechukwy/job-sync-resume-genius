
import { z } from "zod";

// Optional schemas for steps 6-14 - these allow empty submissions but validate when data is provided
export const optionalCertificateSchema = z.object({
  name: z.string().optional(),
  issuer: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
});

export const optionalProjectSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),
});

export const optionalLanguageSchema = z.object({
  language: z.string().optional(),
  proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Native"]).optional(),
});

export const optionalVolunteeringSchema = z.object({
  organization: z.string().optional(),
  role: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const optionalAwardSchema = z.object({
  title: z.string().optional(),
  issuer: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
});

export const optionalPublicationSchema = z.object({
  title: z.string().optional(),
  publisher: z.string().optional(),
  date: z.string().optional(),
  url: z.string().optional(),
  description: z.string().optional(),
});

export const optionalInterestsSchema = z.object({
  interests: z.array(z.string()).optional(),
});

export const optionalAdditionalInfoSchema = z.object({
  content: z.string().optional(),
});

export const optionalSkillsSchema = z.object({
  technical: z.array(z.string()).optional(),
  soft: z.array(z.string()).optional(),
});

export type OptionalCertificateFormData = z.infer<typeof optionalCertificateSchema>;
export type OptionalProjectFormData = z.infer<typeof optionalProjectSchema>;
export type OptionalLanguageFormData = z.infer<typeof optionalLanguageSchema>;
export type OptionalVolunteeringFormData = z.infer<typeof optionalVolunteeringSchema>;
export type OptionalAwardFormData = z.infer<typeof optionalAwardSchema>;
export type OptionalPublicationFormData = z.infer<typeof optionalPublicationSchema>;
export type OptionalInterestsFormData = z.infer<typeof optionalInterestsSchema>;
export type OptionalAdditionalInfoFormData = z.infer<typeof optionalAdditionalInfoSchema>;
export type OptionalSkillsFormData = z.infer<typeof optionalSkillsSchema>;
