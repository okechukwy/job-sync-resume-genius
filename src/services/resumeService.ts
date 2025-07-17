import { supabase } from "@/integrations/supabase/client";
import { ResumeData } from "@/types/resumeTypes";

export interface SavedResume {
  id: string;
  title: string;
  template_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const resumeService = {
  // Save resume data to database
  async saveResume(resumeData: ResumeData, title: string = "My Resume", templateId: string = "modern-minimalist"): Promise<string> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("user_resumes")
      .upsert({
        user_id: user.user.id,
        title,
        template_id: templateId,
        personal_info: resumeData.personalInfo,
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        certificates: resumeData.certificates,
        projects: resumeData.projects,
        languages: resumeData.languages,
        volunteering: resumeData.volunteering,
        awards: resumeData.awards,
        publications: resumeData.publications,
        interests: resumeData.interests,
        additional_info: resumeData.additionalInfo,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  },

  // Load resume data from database
  async loadResume(resumeId: string): Promise<ResumeData> {
    const { data, error } = await supabase
      .from("user_resumes")
      .select("*")
      .eq("id", resumeId)
      .single();

    if (error) throw error;

    return {
      personalInfo: data.personal_info as ResumeData['personalInfo'],
      summary: data.summary as ResumeData['summary'],
      experience: data.experience as ResumeData['experience'],
      education: data.education as ResumeData['education'],
      skills: data.skills as ResumeData['skills'],
      certificates: data.certificates as ResumeData['certificates'],
      projects: data.projects as ResumeData['projects'],
      languages: data.languages as ResumeData['languages'],
      volunteering: data.volunteering as ResumeData['volunteering'],
      awards: data.awards as ResumeData['awards'],
      publications: data.publications as ResumeData['publications'],
      interests: data.interests as ResumeData['interests'],
      additionalInfo: data.additional_info as ResumeData['additionalInfo'],
    };
  },

  // Get user's saved resumes
  async getUserResumes(): Promise<SavedResume[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("user_resumes")
      .select("id, title, template_id, is_active, created_at, updated_at")
      .eq("user_id", user.user.id)
      .eq("is_active", true)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Delete resume
  async deleteResume(resumeId: string): Promise<void> {
    const { error } = await supabase
      .from("user_resumes")
      .update({ is_active: false })
      .eq("id", resumeId);

    if (error) throw error;
  },

  // Get active resume for user
  async getActiveResume(): Promise<{ id: string; data: ResumeData } | null> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return null;

    const { data, error } = await supabase
      .from("user_resumes")
      .select("*")
      .eq("user_id", user.user.id)
      .eq("is_active", true)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return {
      id: data.id,
      data: {
        personalInfo: data.personal_info as ResumeData['personalInfo'],
        summary: data.summary as ResumeData['summary'],
        experience: data.experience as ResumeData['experience'],
        education: data.education as ResumeData['education'],
        skills: data.skills as ResumeData['skills'],
        certificates: data.certificates as ResumeData['certificates'],
        projects: data.projects as ResumeData['projects'],
        languages: data.languages as ResumeData['languages'],
        volunteering: data.volunteering as ResumeData['volunteering'],
        awards: data.awards as ResumeData['awards'],
        publications: data.publications as ResumeData['publications'],
        interests: data.interests as ResumeData['interests'],
        additionalInfo: data.additional_info as ResumeData['additionalInfo'],
      }
    };
  }
};