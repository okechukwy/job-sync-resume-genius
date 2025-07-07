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

export const skillsSchema = z.object({
  technical: z.array(z.string()).min(1, "At least one technical skill is required"),
  soft: z.array(z.string()).min(1, "At least one soft skill is required"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type SkillsFormData = z.infer<typeof skillsSchema>;