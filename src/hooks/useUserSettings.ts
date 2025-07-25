import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserSettings {
  theme: string;
  language: string;
  timezone: string;
  date_format: string;
  auto_save: boolean;
  keyboard_shortcuts: boolean;
  email_notifications: boolean;
  marketing_emails: boolean;
  job_match_alerts: boolean;
  application_status_updates: boolean;
  resume_view_notifications: boolean;
  notification_frequency: string;
  weekly_progress_reports: boolean;
}

export interface UserProfessionalInfo {
  job_title?: string;
  company?: string;
  industry?: string;
  experience_years?: string;
  linkedin_url?: string;
  professional_summary?: string;
}

export interface UserJobPreferences {
  job_types: string[];
  min_salary?: number;
  max_salary?: number;
  work_location: string;
  preferred_locations: string[];
  max_commute_distance?: number;
  open_to_relocate: boolean;
  actively_searching: boolean;
}

export interface UserPrivacySettings {
  profile_visibility: string;
  profile_searchable: boolean;
  activity_status_visible: boolean;
  data_collection: boolean;
  analytics_tracking: boolean;
}

export const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [professionalInfo, setProfessionalInfo] = useState<UserProfessionalInfo | null>(null);
  const [jobPreferences, setJobPreferences] = useState<UserJobPreferences | null>(null);
  const [privacySettings, setPrivacySettings] = useState<UserPrivacySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllSettings();
  }, []);

  const fetchAllSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [settingsRes, professionalRes, jobPrefRes, privacyRes] = await Promise.all([
        supabase.from('user_settings').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('user_professional_info').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('user_job_preferences').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('user_privacy_settings').select('*').eq('user_id', user.id).order('updated_at', { ascending: false }).maybeSingle(),
      ]);

      console.log('🔒 Fetched privacy settings from DB:', privacyRes.data);
      
      setSettings(settingsRes.data);
      setProfessionalInfo(professionalRes.data);
      setJobPreferences(jobPrefRes.data);
      setPrivacySettings(privacyRes.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_settings')
        .upsert({ user_id: user.id, ...newSettings });

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const updateProfessionalInfo = async (newInfo: Partial<UserProfessionalInfo>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_professional_info')
        .upsert({ user_id: user.id, ...newInfo });

      if (error) throw error;

      setProfessionalInfo(prev => prev ? { ...prev, ...newInfo } : null);
      toast({
        title: "Success",
        description: "Professional information updated successfully",
      });
    } catch (error) {
      console.error('Error updating professional info:', error);
      toast({
        title: "Error",
        description: "Failed to update professional information",
        variant: "destructive",
      });
    }
  };

  const updateJobPreferences = async (newPrefs: Partial<UserJobPreferences>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_job_preferences')
        .upsert({ user_id: user.id, ...newPrefs });

      if (error) throw error;

      setJobPreferences(prev => prev ? { ...prev, ...newPrefs } : null);
      toast({
        title: "Success",
        description: "Job preferences updated successfully",
      });
    } catch (error) {
      console.error('Error updating job preferences:', error);
      toast({
        title: "Error",
        description: "Failed to update job preferences",
        variant: "destructive",
      });
    }
  };

  const updatePrivacySettings = async (newSettings: Partial<UserPrivacySettings>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      console.log('🔒 Saving privacy settings:', newSettings);
      
      const { data, error } = await supabase
        .from('user_privacy_settings')
        .upsert({
          user_id: user.id,
          ...newSettings,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) throw error;
      
      console.log('🔒 Privacy settings saved successfully:', data);

      // Update local state with the exact data from the database
      setPrivacySettings(data);
      
      toast({
        title: "Success",
        description: "Privacy settings updated successfully",
      });
    } catch (error) {
      console.error('❌ Error updating privacy settings:', error);
      toast({
        title: "Error",
        description: "Failed to update privacy settings",
        variant: "destructive",
      });
    }
  };

  return {
    settings,
    professionalInfo,
    jobPreferences,
    privacySettings,
    loading,
    updateSettings,
    updateProfessionalInfo,
    updateJobPreferences,
    updatePrivacySettings,
    refresh: fetchAllSettings,
  };
};