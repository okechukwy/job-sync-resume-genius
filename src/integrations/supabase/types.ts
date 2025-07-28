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
      action_items: {
        Row: {
          category: string
          completed_at: string | null
          completion_notes: string | null
          created_at: string
          description: string | null
          due_date: string | null
          estimated_time_minutes: number | null
          id: string
          priority: string
          related_goal_id: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_time_minutes?: number | null
          id?: string
          priority?: string
          related_goal_id?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_time_minutes?: number | null
          id?: string
          priority?: string
          related_goal_id?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_items_related_goal_id_fkey"
            columns: ["related_goal_id"]
            isOneToOne: false
            referencedRelation: "career_goals"
            referencedColumns: ["id"]
          },
        ]
      }
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
      career_certifications: {
        Row: {
          badge_image_url: string | null
          certification_name: string
          created_at: string
          description: string | null
          earned_at: string
          expires_at: string | null
          id: string
          is_featured: boolean
          issuing_organization: string
          skills_validated: string[]
          updated_at: string
          user_id: string
          verification_url: string | null
        }
        Insert: {
          badge_image_url?: string | null
          certification_name: string
          created_at?: string
          description?: string | null
          earned_at?: string
          expires_at?: string | null
          id?: string
          is_featured?: boolean
          issuing_organization: string
          skills_validated?: string[]
          updated_at?: string
          user_id: string
          verification_url?: string | null
        }
        Update: {
          badge_image_url?: string | null
          certification_name?: string
          created_at?: string
          description?: string | null
          earned_at?: string
          expires_at?: string | null
          id?: string
          is_featured?: boolean
          issuing_organization?: string
          skills_validated?: string[]
          updated_at?: string
          user_id?: string
          verification_url?: string | null
        }
        Relationships: []
      }
      career_goals: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          milestones: Json
          priority: string
          progress_percentage: number
          status: string
          success_metrics: Json
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          milestones?: Json
          priority?: string
          progress_percentage?: number
          status?: string
          success_metrics?: Json
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          milestones?: Json
          priority?: string
          progress_percentage?: number
          status?: string
          success_metrics?: Json
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      coaching_programs: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty_level: string
          estimated_duration_weeks: number
          id: string
          is_active: boolean
          is_premium: boolean
          prerequisites: string[]
          skills_covered: string[]
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty_level?: string
          estimated_duration_weeks?: number
          id?: string
          is_active?: boolean
          is_premium?: boolean
          prerequisites?: string[]
          skills_covered?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty_level?: string
          estimated_duration_weeks?: number
          id?: string
          is_active?: boolean
          is_premium?: boolean
          prerequisites?: string[]
          skills_covered?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      coaching_sessions: {
        Row: {
          action_items: Json
          coach_notes: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          feedback_comments: string | null
          feedback_score: number | null
          id: string
          scheduled_at: string
          session_type: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_items?: Json
          coach_notes?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          feedback_comments?: string | null
          feedback_score?: number | null
          id?: string
          scheduled_at: string
          session_type: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_items?: Json
          coach_notes?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          feedback_comments?: string | null
          feedback_score?: number | null
          id?: string
          scheduled_at?: string
          session_type?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      connected_accounts: {
        Row: {
          connected_at: string
          created_at: string
          id: string
          is_active: boolean
          last_used_at: string | null
          metadata: Json | null
          provider: string
          provider_account_email: string | null
          provider_account_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          connected_at?: string
          created_at?: string
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          metadata?: Json | null
          provider: string
          provider_account_email?: string | null
          provider_account_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          connected_at?: string
          created_at?: string
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          metadata?: Json | null
          provider?: string
          provider_account_email?: string | null
          provider_account_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
          industry: string | null
          keywords: Json
          overall_score: number
          sections: Json
          target_role: string | null
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
          industry?: string | null
          keywords?: Json
          overall_score: number
          sections?: Json
          target_role?: string | null
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
          industry?: string | null
          keywords?: Json
          overall_score?: number
          sections?: Json
          target_role?: string | null
          user_id?: string
        }
        Relationships: []
      }
      export_history: {
        Row: {
          client_name: string | null
          created_at: string
          download_count: number | null
          export_type: string
          file_size: number | null
          format: string
          id: string
          job_id: string | null
          last_downloaded_at: string | null
          user_id: string
        }
        Insert: {
          client_name?: string | null
          created_at?: string
          download_count?: number | null
          export_type: string
          file_size?: number | null
          format: string
          id?: string
          job_id?: string | null
          last_downloaded_at?: string | null
          user_id: string
        }
        Update: {
          client_name?: string | null
          created_at?: string
          download_count?: number | null
          export_type?: string
          file_size?: number | null
          format?: string
          id?: string
          job_id?: string | null
          last_downloaded_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "export_history_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "export_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      export_jobs: {
        Row: {
          client_name: string | null
          completed_at: string | null
          config_id: string | null
          created_at: string
          error_message: string | null
          export_format: string
          file_url: string | null
          id: string
          metadata: Json | null
          resume_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          client_name?: string | null
          completed_at?: string | null
          config_id?: string | null
          created_at?: string
          error_message?: string | null
          export_format: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          resume_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          client_name?: string | null
          completed_at?: string | null
          config_id?: string | null
          created_at?: string
          error_message?: string | null
          export_format?: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          resume_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "export_jobs_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "white_label_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_benchmarks: {
        Row: {
          benchmark_level: number
          created_at: string
          data_source: string | null
          growth_projection: number | null
          id: string
          industry: string
          job_role: string
          last_updated: string
          market_demand: string | null
          salary_range_max: number | null
          salary_range_min: number | null
          skill_name: string
        }
        Insert: {
          benchmark_level: number
          created_at?: string
          data_source?: string | null
          growth_projection?: number | null
          id?: string
          industry: string
          job_role: string
          last_updated?: string
          market_demand?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          skill_name: string
        }
        Update: {
          benchmark_level?: number
          created_at?: string
          data_source?: string | null
          growth_projection?: number | null
          id?: string
          industry?: string
          job_role?: string
          last_updated?: string
          market_demand?: string | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          skill_name?: string
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
          sample_answers: Json | null
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
          sample_answers?: Json | null
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
          sample_answers?: Json | null
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
      learning_modules: {
        Row: {
          content_type: string
          content_url: string | null
          created_at: string
          description: string
          duration_minutes: number
          id: string
          is_interactive: boolean
          learning_objectives: string[]
          order_index: number
          prerequisites: string[]
          program_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content_type?: string
          content_url?: string | null
          created_at?: string
          description: string
          duration_minutes?: number
          id?: string
          is_interactive?: boolean
          learning_objectives?: string[]
          order_index?: number
          prerequisites?: string[]
          program_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content_type?: string
          content_url?: string | null
          created_at?: string
          description?: string
          duration_minutes?: number
          id?: string
          is_interactive?: boolean
          learning_objectives?: string[]
          order_index?: number
          prerequisites?: string[]
          program_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "coaching_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_resources: {
        Row: {
          cost_type: string
          created_at: string
          description: string
          difficulty_level: string
          estimated_time_minutes: number | null
          id: string
          is_recommended: boolean
          provider: string | null
          rating: number | null
          resource_type: string
          resource_url: string | null
          skill_areas: string[]
          title: string
          updated_at: string
        }
        Insert: {
          cost_type?: string
          created_at?: string
          description: string
          difficulty_level?: string
          estimated_time_minutes?: number | null
          id?: string
          is_recommended?: boolean
          provider?: string | null
          rating?: number | null
          resource_type: string
          resource_url?: string | null
          skill_areas?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          cost_type?: string
          created_at?: string
          description?: string
          difficulty_level?: string
          estimated_time_minutes?: number | null
          id?: string
          is_recommended?: boolean
          provider?: string | null
          rating?: number | null
          resource_type?: string
          resource_url?: string | null
          skill_areas?: string[]
          title?: string
          updated_at?: string
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
      personalized_insights: {
        Row: {
          category: string
          content: string
          created_at: string
          expires_at: string | null
          id: string
          insight_type: string
          is_read: boolean
          metadata: Json
          priority: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          expires_at?: string | null
          id?: string
          insight_type: string
          is_read?: boolean
          metadata?: Json
          priority?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          insight_type?: string
          is_read?: boolean
          metadata?: Json
          priority?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          profile_picture: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          profile_picture?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          profile_picture?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string
          event_description: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_description?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_description?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      skills_assessments: {
        Row: {
          assessment_date: string
          category: string
          created_at: string
          current_level: number
          id: string
          improvement_recommendations: string[] | null
          learning_resources: string[] | null
          next_assessment_date: string | null
          skill_name: string
          target_level: number
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_date?: string
          category: string
          created_at?: string
          current_level: number
          id?: string
          improvement_recommendations?: string[] | null
          learning_resources?: string[] | null
          next_assessment_date?: string | null
          skill_name: string
          target_level: number
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_date?: string
          category?: string
          created_at?: string
          current_level?: number
          id?: string
          improvement_recommendations?: string[] | null
          learning_resources?: string[] | null
          next_assessment_date?: string | null
          skill_name?: string
          target_level?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_coaching_enrollments: {
        Row: {
          completed_at: string | null
          created_at: string
          enrolled_at: string
          id: string
          last_accessed_at: string | null
          program_id: string
          progress_percentage: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          program_id: string
          progress_percentage?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          program_id?: string
          progress_percentage?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_coaching_enrollments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "coaching_programs"
            referencedColumns: ["id"]
          },
        ]
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
      user_job_preferences: {
        Row: {
          actively_searching: boolean
          created_at: string
          id: string
          job_types: string[] | null
          max_commute_distance: number | null
          max_salary: number | null
          min_salary: number | null
          open_to_relocate: boolean
          preferred_locations: string[] | null
          updated_at: string
          user_id: string
          work_location: string | null
        }
        Insert: {
          actively_searching?: boolean
          created_at?: string
          id?: string
          job_types?: string[] | null
          max_commute_distance?: number | null
          max_salary?: number | null
          min_salary?: number | null
          open_to_relocate?: boolean
          preferred_locations?: string[] | null
          updated_at?: string
          user_id: string
          work_location?: string | null
        }
        Update: {
          actively_searching?: boolean
          created_at?: string
          id?: string
          job_types?: string[] | null
          max_commute_distance?: number | null
          max_salary?: number | null
          min_salary?: number | null
          open_to_relocate?: boolean
          preferred_locations?: string[] | null
          updated_at?: string
          user_id?: string
          work_location?: string | null
        }
        Relationships: []
      }
      user_module_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          enrollment_id: string
          id: string
          last_accessed_at: string | null
          module_id: string
          progress_percentage: number
          started_at: string | null
          status: string
          time_spent_minutes: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          enrollment_id: string
          id?: string
          last_accessed_at?: string | null
          module_id: string
          progress_percentage?: number
          started_at?: string | null
          status?: string
          time_spent_minutes?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          enrollment_id?: string
          id?: string
          last_accessed_at?: string | null
          module_id?: string
          progress_percentage?: number
          started_at?: string | null
          status?: string
          time_spent_minutes?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_module_progress_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "user_coaching_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "learning_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_privacy_settings: {
        Row: {
          activity_status_visible: boolean
          analytics_tracking: boolean
          created_at: string
          data_collection: boolean
          id: string
          profile_searchable: boolean
          profile_visibility: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_status_visible?: boolean
          analytics_tracking?: boolean
          created_at?: string
          data_collection?: boolean
          id?: string
          profile_searchable?: boolean
          profile_visibility?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_status_visible?: boolean
          analytics_tracking?: boolean
          created_at?: string
          data_collection?: boolean
          id?: string
          profile_searchable?: boolean
          profile_visibility?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_professional_info: {
        Row: {
          company: string | null
          created_at: string
          experience_years: string | null
          id: string
          industry: string | null
          job_title: string | null
          linkedin_url: string | null
          professional_summary: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          experience_years?: string | null
          id?: string
          industry?: string | null
          job_title?: string | null
          linkedin_url?: string | null
          professional_summary?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          experience_years?: string | null
          id?: string
          industry?: string | null
          job_title?: string | null
          linkedin_url?: string | null
          professional_summary?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_resumes: {
        Row: {
          additional_info: Json
          archived_at: string | null
          awards: Json
          certificates: Json
          created_at: string | null
          description: string | null
          education: Json
          experience: Json
          id: string
          interests: Json
          is_active: boolean | null
          languages: Json
          parent_resume_id: string | null
          personal_info: Json
          projects: Json
          publications: Json
          skills: Json
          summary: Json
          template_id: string
          title: string
          updated_at: string | null
          user_id: string
          version_number: number
          volunteering: Json
        }
        Insert: {
          additional_info?: Json
          archived_at?: string | null
          awards?: Json
          certificates?: Json
          created_at?: string | null
          description?: string | null
          education?: Json
          experience?: Json
          id?: string
          interests?: Json
          is_active?: boolean | null
          languages?: Json
          parent_resume_id?: string | null
          personal_info?: Json
          projects?: Json
          publications?: Json
          skills?: Json
          summary?: Json
          template_id: string
          title?: string
          updated_at?: string | null
          user_id: string
          version_number?: number
          volunteering?: Json
        }
        Update: {
          additional_info?: Json
          archived_at?: string | null
          awards?: Json
          certificates?: Json
          created_at?: string | null
          description?: string | null
          education?: Json
          experience?: Json
          id?: string
          interests?: Json
          is_active?: boolean | null
          languages?: Json
          parent_resume_id?: string | null
          personal_info?: Json
          projects?: Json
          publications?: Json
          skills?: Json
          summary?: Json
          template_id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
          version_number?: number
          volunteering?: Json
        }
        Relationships: [
          {
            foreignKeyName: "user_resumes_parent_resume_id_fkey"
            columns: ["parent_resume_id"]
            isOneToOne: false
            referencedRelation: "user_resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_security_settings: {
        Row: {
          backup_codes: Json | null
          created_at: string
          id: string
          last_security_review: string | null
          login_notifications: boolean
          password_changed_at: string | null
          security_questions: Json | null
          suspicious_activity_alerts: boolean
          two_factor_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          backup_codes?: Json | null
          created_at?: string
          id?: string
          last_security_review?: string | null
          login_notifications?: boolean
          password_changed_at?: string | null
          security_questions?: Json | null
          suspicious_activity_alerts?: boolean
          two_factor_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          backup_codes?: Json | null
          created_at?: string
          id?: string
          last_security_review?: string | null
          login_notifications?: boolean
          password_changed_at?: string | null
          security_questions?: Json | null
          suspicious_activity_alerts?: boolean
          two_factor_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          application_status_updates: boolean
          auto_save: boolean
          created_at: string
          date_format: string
          email_notifications: boolean
          id: string
          job_match_alerts: boolean
          keyboard_shortcuts: boolean
          language: string
          marketing_emails: boolean
          notification_frequency: string
          resume_view_notifications: boolean
          theme: string
          timezone: string
          updated_at: string
          user_id: string
          weekly_progress_reports: boolean
        }
        Insert: {
          application_status_updates?: boolean
          auto_save?: boolean
          created_at?: string
          date_format?: string
          email_notifications?: boolean
          id?: string
          job_match_alerts?: boolean
          keyboard_shortcuts?: boolean
          language?: string
          marketing_emails?: boolean
          notification_frequency?: string
          resume_view_notifications?: boolean
          theme?: string
          timezone?: string
          updated_at?: string
          user_id: string
          weekly_progress_reports?: boolean
        }
        Update: {
          application_status_updates?: boolean
          auto_save?: boolean
          created_at?: string
          date_format?: string
          email_notifications?: boolean
          id?: string
          job_match_alerts?: boolean
          keyboard_shortcuts?: boolean
          language?: string
          marketing_emails?: boolean
          notification_frequency?: string
          resume_view_notifications?: boolean
          theme?: string
          timezone?: string
          updated_at?: string
          user_id?: string
          weekly_progress_reports?: boolean
        }
        Relationships: []
      }
      white_label_configs: {
        Row: {
          accent_color: string | null
          company_logo_url: string | null
          company_name: string | null
          config_name: string
          created_at: string
          email_signature: string | null
          font_family: string | null
          footer_text: string | null
          id: string
          is_active: boolean | null
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
          user_id: string
          watermark_enabled: boolean | null
          watermark_text: string | null
        }
        Insert: {
          accent_color?: string | null
          company_logo_url?: string | null
          company_name?: string | null
          config_name?: string
          created_at?: string
          email_signature?: string | null
          font_family?: string | null
          footer_text?: string | null
          id?: string
          is_active?: boolean | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id: string
          watermark_enabled?: boolean | null
          watermark_text?: string | null
        }
        Update: {
          accent_color?: string | null
          company_logo_url?: string | null
          company_name?: string | null
          config_name?: string
          created_at?: string
          email_signature?: string | null
          font_family?: string | null
          footer_text?: string | null
          id?: string
          is_active?: boolean | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id?: string
          watermark_enabled?: boolean | null
          watermark_text?: string | null
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
      get_resume_version_metrics: {
        Args: { resume_id: string }
        Returns: {
          total_applications: number
          responses_received: number
          interviews_scheduled: number
          offers_received: number
          avg_ats_score: number
          response_rate: number
          interview_rate: number
          offer_rate: number
        }[]
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
