import { z } from "zod";

export const professionalInfoSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  industry: z.string().min(1, "Please select an industry"),
  experience_years: z.string().min(1, "Please select years of experience"),
  linkedin_url: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  professional_summary: z.string().min(10, "Professional summary must be at least 10 characters").optional().or(z.literal("")),
});

export type ProfessionalInfoFormData = z.infer<typeof professionalInfoSchema>;