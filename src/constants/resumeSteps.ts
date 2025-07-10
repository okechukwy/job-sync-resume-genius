import { ResumeStep } from "@/types/resumeTypes";

export const RESUME_STEPS: ResumeStep[] = [
  { number: 1, title: "Personal Info", description: "Basic contact information", category: "core", required: true },
  { number: 2, title: "Summary", description: "Professional summary", category: "core", required: true },
  { number: 3, title: "Experience", description: "Work history and achievements", category: "core", required: true },
  { number: 4, title: "Education", description: "Academic background", category: "core", required: true },
  { number: 5, title: "Skills", description: "Technical and soft skills", category: "core", required: true },
  { number: 6, title: "Certificates", description: "Professional certifications", category: "additional", required: false },
  { number: 7, title: "Projects", description: "Notable projects and work", category: "additional", required: false },
  { number: 8, title: "Languages", description: "Language proficiencies", category: "additional", required: false },
  { number: 9, title: "Volunteering", description: "Volunteer work and community service", category: "additional", required: false },
  { number: 10, title: "Awards", description: "Awards and honors received", category: "additional", required: false },
  { number: 11, title: "Publications", description: "Published works and research", category: "additional", required: false },
  { number: 12, title: "Interests", description: "Personal interests and hobbies", category: "additional", required: false },
  { number: 13, title: "Additional Info", description: "Other relevant information", category: "additional", required: false },
  { number: 14, title: "Preview", description: "Review and download", category: "final", required: false },
];

export const TOTAL_STEPS = RESUME_STEPS.length;
export const CORE_STEPS = RESUME_STEPS.filter(step => step.category === "core");
export const ADDITIONAL_STEPS = RESUME_STEPS.filter(step => step.category === "additional");