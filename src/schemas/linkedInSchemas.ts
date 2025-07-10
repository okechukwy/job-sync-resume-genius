import { z } from "zod";

export const linkedInExperienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

export const linkedInEducationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
});

export const linkedInProfileSchema = z.object({
  headline: z.string().min(10, "Headline should be at least 10 characters").max(120, "Headline should not exceed 120 characters"),
  summary: z.string().max(2600, "Summary should not exceed 2600 characters").optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
  experience: z.array(linkedInExperienceSchema).default([]),
  education: z.array(linkedInEducationSchema).default([]),
  skills: z.array(z.string()).max(50, "Maximum 50 skills allowed").default([]),
  photo: z.boolean().default(false),
  background: z.boolean().default(false),
  customUrl: z.string().optional(),
  contactInfo: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
  }).optional(),
});

export const linkedInHeadlineGeneratorSchema = z.object({
  targetRole: z.string().min(1, "Target role is required"),
  industry: z.string().min(1, "Industry is required"),
  keySkills: z.array(z.string()).min(1, "At least one key skill is required"),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]),
  tone: z.enum(["professional", "creative", "technical", "leadership"]),
});

export const linkedInSummaryOptimizerSchema = z.object({
  currentSummary: z.string().optional(),
  targetRole: z.string().min(1, "Target role is required"),
  industry: z.string().min(1, "Industry is required"),
  achievements: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  tone: z.enum(["professional", "conversational", "authoritative", "creative"]),
  includeCallToAction: z.boolean().default(true),
});

export const linkedInKeywordAnalysisSchema = z.object({
  jobDescription: z.string().optional(),
  targetRole: z.string().min(1, "Target role is required"),
  industry: z.string().min(1, "Industry is required"),
  currentProfile: z.string().optional(),
});

export const linkedInContentSuggestionSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]),
  contentType: z.enum(["thought-leadership", "industry-news", "career-tips", "company-updates", "achievements"]),
  frequency: z.enum(["daily", "weekly", "biweekly", "monthly"]),
  topics: z.array(z.string()).default([]),
});

export const linkedInUrlScanSchema = z.object({
  profileUrl: z.string()
    .url("Please enter a valid URL")
    .refine((url) => url.includes("linkedin.com/in/"), "Please enter a valid LinkedIn profile URL"),
  scanDepth: z.enum(["basic", "detailed", "comprehensive"]).default("detailed"),
  analysisType: z.enum(["personal", "competitive", "industry"]).default("personal"),
  compareWithCurrent: z.boolean().default(true),
});

export const scannedProfileSchema = z.object({
  url: z.string(),
  extractedData: linkedInProfileSchema.partial(),
  profileStrength: z.number().min(0).max(100),
  industryAlignment: z.number().min(0).max(100),
  keywordDensity: z.record(z.number()),
  competitiveMetrics: z.object({
    headlineOptimization: z.number(),
    summaryLength: z.number(),
    skillsCount: z.number(),
    experienceDetail: z.number(),
  }),
  scannedAt: z.date().default(() => new Date()),
});

export type LinkedInProfile = z.infer<typeof linkedInProfileSchema>;
export type LinkedInExperience = z.infer<typeof linkedInExperienceSchema>;
export type LinkedInEducation = z.infer<typeof linkedInEducationSchema>;
export type LinkedInHeadlineGenerator = z.infer<typeof linkedInHeadlineGeneratorSchema>;
export type LinkedInSummaryOptimizer = z.infer<typeof linkedInSummaryOptimizerSchema>;
export type LinkedInKeywordAnalysis = z.infer<typeof linkedInKeywordAnalysisSchema>;
export type LinkedInContentSuggestion = z.infer<typeof linkedInContentSuggestionSchema>;
export type LinkedInUrlScan = z.infer<typeof linkedInUrlScanSchema>;
export type ScannedProfile = z.infer<typeof scannedProfileSchema>;