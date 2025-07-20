export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_generations: {
        Row: {
          created_at: string | null
          error_message: string | null
          generation_type: string
          id: string
          input_data: Json
          model_used: string | null
          output_data: Json
          success: boolean | null
          tokens_used: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          generation_type: string
          id?: string
          input_data: Json
          model_used?: string | null
          output_data: Json
          success?: boolean | null
          tokens_used?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          generation_type?: string
          id?: string
          input_data?: Json
          model_used?: string | null
          output_data?: Json
          success?: boolean | null
          tokens_used?: number | null
          user_id?: string
        }
        Relationships: []
      }
      application_stages: {
        Row: {
          application_id: string
          created_at: string | null
          date_completed: string | null
          date_entered: string | null
          feedback: string | null
          id: string
          notes: string | null
          stage_name: string
          status: string
        }
        Insert: {
          application_id: string
          created_at?: string | null
          date_completed?: string | null
          date_entered?: string | null
          feedback?: string | null
          id?: string
          notes?: string | null
          stage_name: string
          status: string
        }
        Update: {
          application_id?: string
          created_at?: string | null
          date_completed?: string | null
          date_entered?: string | null
          feedback?: string | null
          id?: string
          notes?: string | null
          stage_name?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_stages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "job_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_analyses: {
        Row: {
          analysis_type: string | null
          ats_score: number
          created_at: string | null
          file_name: string
          file_size: number
          id: string
          improvements: Json
          keywords: Json
          overall_score: number
          sections: Json
          user_id: string
        }
        Insert: {
          analysis_type?: string | null
          ats_score: number
          created_at?: string | null
          file_name: string
          file_size: number
          id?: string
          improvements?: Json
          keywords?: Json
          overall_score: number
          sections?: Json
          user_id: string
        }
        Update: {
          analysis_type?: string | null
          ats_score?: number
          created_at?: string | null
          file_name?: string
          file_size?: number
          id?: string
          improvements?: Json
          keywords?: Json
          overall_score?: number
          sections?: Json
          user_id?: string
        }
        Relationships: []
      }
      interview_sessions: {
        Row: {
          completed: boolean | null
          created_at: string | null
          duration_minutes: number | null
          feedback: Json
          id: string
          questions: Json
          responses: Json
          role_focus: string | null
          scores: Json
          session_type: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          duration_minutes?: number | null
          feedback?: Json
          id?: string
          questions?: Json
          responses?: Json
          role_focus?: string | null
          scores?: Json
          session_type: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          duration_minutes?: number | null
          feedback?: Json
          id?: string
          questions?: Json
          responses?: Json
          role_focus?: string | null
          scores?: Json
          session_type?: string
          user_id?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          application_source: string | null
          ats_score: number | null
          company_name: string
          created_at: string | null
          current_stage: string
          date_applied: string
          follow_up_date: string | null
          id: string
          interview_dates: Json | null
          job_description: string | null
          job_location: string | null
          notes: string | null
          position_title: string
          resume_version: string | null
          salary_range_max: number | null
          salary_range_min: number | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_source?: string | null
          ats_score?: number | null
          company_name: string
          created_at?: string | null
          current_stage?: string
          date_applied?: string
          follow_up_date?: string | null
          id?: string
          interview_dates?: Json | null
          job_description?: string | null
          job_location?: string | null
          notes?: string | null
          position_title: string
          resume_version?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_source?: string | null
          ats_score?: number | null
          company_name?: string
          created_at?: string | null
          current_stage?: string
          date_applied?: string
          follow_up_date?: string | null
          id?: string
          interview_dates?: Json | null
          job_description?: string | null
          job_location?: string | null
          notes?: string | null
          position_title?: string
          resume_version?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      linkedin_profiles: {
        Row: {
          background_uploaded: boolean | null
          contact_info: Json
          created_at: string | null
          custom_url: string | null
          education: Json
          experience: Json
          headline: string | null
          id: string
          industry: string | null
          is_active: boolean | null
          location: string | null
          photo_uploaded: boolean | null
          skills: Json
          summary: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          background_uploaded?: boolean | null
          contact_info?: Json
          created_at?: string | null
          custom_url?: string | null
          education?: Json
          experience?: Json
          headline?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          location?: string | null
          photo_uploaded?: boolean | null
          skills?: Json
          summary?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          background_uploaded?: boolean | null
          contact_info?: Json
          created_at?: string | null
          custom_url?: string | null
          education?: Json
          experience?: Json
          headline?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          location?: string | null
          photo_uploaded?: boolean | null
          skills?: Json
          summary?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          avg_ats_score: number | null
          calculated_at: string | null
          created_at: string | null
          id: string
          interview_rate: number | null
          interviews_scheduled: number | null
          metric_period: string
          most_successful_resume_version: string | null
          offer_rate: number | null
          offers_received: number | null
          response_rate: number | null
          responses_received: number | null
          top_performing_companies: Json | null
          total_applications: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avg_ats_score?: number | null
          calculated_at?: string | null
          created_at?: string | null
          id?: string
          interview_rate?: number | null
          interviews_scheduled?: number | null
          metric_period: string
          most_successful_resume_version?: string | null
          offer_rate?: number | null
          offers_received?: number | null
          response_rate?: number | null
          responses_received?: number | null
          top_performing_companies?: Json | null
          total_applications?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avg_ats_score?: number | null
          calculated_at?: string | null
          created_at?: string | null
          id?: string
          interview_rate?: number | null
          interviews_scheduled?: number | null
          metric_period?: string
          most_successful_resume_version?: string | null
          offer_rate?: number | null
          offers_received?: number | null
          response_rate?: number | null
          responses_received?: number | null
          top_performing_companies?: Json | null
          total_applications?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_files: {
        Row: {
          created_at: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          metadata: Json | null
          purpose: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          metadata?: Json | null
          purpose: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          metadata?: Json | null
          purpose?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: []
      }
      user_resumes: {
        Row: {
          additional_info: Json
          awards: Json
          certificates: Json
          created_at: string | null
          education: Json
          experience: Json
          id: string
          interests: Json
          is_active: boolean | null
          languages: Json
          personal_info: Json
          projects: Json
          publications: Json
          skills: Json
          summary: Json
          template_id: string
          title: string
          updated_at: string | null
          user_id: string
          volunteering: Json
        }
        Insert: {
          additional_info?: Json
          awards?: Json
          certificates?: Json
          created_at?: string | null
          education?: Json
          experience?: Json
          id?: string
          interests?: Json
          is_active?: boolean | null
          languages?: Json
          personal_info?: Json
          projects?: Json
          publications?: Json
          skills?: Json
          summary?: Json
          template_id: string
          title?: string
          updated_at?: string | null
          user_id: string
          volunteering?: Json
        }
        Update: {
          additional_info?: Json
          awards?: Json
          certificates?: Json
          created_at?: string | null
          education?: Json
          experience?: Json
          id?: string
          interests?: Json
          is_active?: boolean | null
          languages?: Json
          personal_info?: Json
          projects?: Json
          publications?: Json
          skills?: Json
          summary?: Json
          template_id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
          volunteering?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_performance_metrics: {
        Args: { user_uuid: string; period?: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
