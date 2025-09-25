import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { isFeatureEnabled } from '@/utils/featureFlags';

export interface WhiteLabelConfig {
  id?: string;
  user_id?: string;
  config_name: string;
  company_name?: string;
  company_logo_url?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
  footer_text?: string;
  watermark_enabled: boolean;
  watermark_text?: string;
  email_signature?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ExportJob {
  id?: string;
  user_id?: string;
  config_id?: string;
  resume_id?: string;
  client_name?: string;
  export_format: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  file_url?: string;
  error_message?: string;
  metadata?: Record<string, any>;
  created_at?: string;
  completed_at?: string;
}

export interface ExportHistory {
  id?: string;
  user_id?: string;
  job_id?: string;
  export_type: string;
  client_name?: string;
  format: string;
  file_size?: number;
  download_count: number;
  last_downloaded_at?: string;
  created_at?: string;
}

export interface WhiteLabelStats {
  total_exports: number;
  active_clients: number;
  success_rate: number;
  pending_exports: number;
}

export const whiteLabelService = {
  // Configuration management
  async getConfigs(): Promise<WhiteLabelConfig[]> {
    if (!isFeatureEnabled('enableWhiteLabel')) {
      console.warn('White-label feature is disabled');
      return [];
    }
    const { data, error } = await supabase
      .from('white_label_configs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching white label configs:', error);
      toast.error('Failed to load configurations');
      return [];
    }

    return data || [];
  },

  async getActiveConfig(): Promise<WhiteLabelConfig | null> {
    if (!isFeatureEnabled('enableWhiteLabel')) {
      return null;
    }
    const { data, error } = await supabase
      .from('white_label_configs')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching active config:', error);
      return null;
    }

    return data;
  },

  async saveConfig(config: Partial<WhiteLabelConfig>): Promise<WhiteLabelConfig | null> {
    if (!isFeatureEnabled('enableWhiteLabel')) {
      toast.error('White-label exports are currently disabled');
      return null;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const configData = {
      ...config,
      user_id: user.id,
    };

    if (config.id) {
      const { data, error } = await supabase
        .from('white_label_configs')
        .update(configData)
        .eq('id', config.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating config:', error);
        toast.error('Failed to update configuration');
        return null;
      }

      toast.success('Configuration updated successfully');
      return data;
    } else {
      const { data, error } = await supabase
        .from('white_label_configs')
        .insert(configData)
        .select()
        .single();

      if (error) {
        console.error('Error creating config:', error);
        toast.error('Failed to create configuration');
        return null;
      }

      toast.success('Configuration created successfully');
      return data;
    }
  },

  async setActiveConfig(configId: string): Promise<boolean> {
    // First, deactivate all configs
    const { error: deactivateError } = await supabase
      .from('white_label_configs')
      .update({ is_active: false })
      .neq('id', 'none');

    if (deactivateError) {
      console.error('Error deactivating configs:', deactivateError);
      return false;
    }

    // Then activate the selected config
    const { error: activateError } = await supabase
      .from('white_label_configs')
      .update({ is_active: true })
      .eq('id', configId);

    if (activateError) {
      console.error('Error activating config:', activateError);
      toast.error('Failed to set active configuration');
      return false;
    }

    toast.success('Active configuration updated');
    return true;
  },

  // Export job management
  async createExportJob(job: Partial<ExportJob>): Promise<ExportJob | null> {
    if (!isFeatureEnabled('enableWhiteLabel')) {
      toast.error('White-label exports are currently disabled');
      return null;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('export_jobs')
      .insert({
        user_id: user.id,
        config_id: job.config_id,
        resume_id: job.resume_id,
        client_name: job.client_name,
        export_format: job.export_format || 'pdf',
        status: job.status || 'pending',
        metadata: job.metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating export job:', error);
      toast.error('Failed to create export job');
      return null;
    }

    return data as ExportJob;
  },

  async getExportJobs(): Promise<ExportJob[]> {
    const { data, error } = await supabase
      .from('export_jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching export jobs:', error);
      return [];
    }

    return (data || []) as ExportJob[];
  },

  async updateExportJob(jobId: string, updates: Partial<ExportJob>): Promise<boolean> {
    const { error } = await supabase
      .from('export_jobs')
      .update(updates)
      .eq('id', jobId);

    if (error) {
      console.error('Error updating export job:', error);
      return false;
    }

    return true;
  },

  // Export history
  async getExportHistory(): Promise<ExportHistory[]> {
    const { data, error } = await supabase
      .from('export_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching export history:', error);
      return [];
    }

    return data || [];
  },

  async addToHistory(history: Partial<ExportHistory>): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('export_history')
      .insert({
        user_id: user.id,
        job_id: history.job_id,
        export_type: history.export_type || 'resume',
        client_name: history.client_name,
        format: history.format || 'pdf',
        file_size: history.file_size,
        download_count: history.download_count || 0,
        last_downloaded_at: history.last_downloaded_at,
      });

    if (error) {
      console.error('Error adding to history:', error);
      return false;
    }

    return true;
  },

  // Statistics
  async getStats(): Promise<WhiteLabelStats> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return {
        total_exports: 0,
        active_clients: 0,
        success_rate: 0,
        pending_exports: 0,
      };
    }

    // Get total exports from history
    const { count: totalExports } = await supabase
      .from('export_history')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get unique clients from history
    const { data: clientData } = await supabase
      .from('export_history')
      .select('client_name')
      .eq('user_id', user.id)
      .not('client_name', 'is', null);

    const uniqueClients = new Set(clientData?.map(item => item.client_name) || []);

    // Get success rate from jobs
    const { data: jobStats } = await supabase
      .from('export_jobs')
      .select('status')
      .eq('user_id', user.id);

    const completedJobs = jobStats?.filter(job => job.status === 'completed').length || 0;
    const totalJobs = jobStats?.length || 0;
    const successRate = totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0;

    // Get pending exports
    const { count: pendingExports } = await supabase
      .from('export_jobs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .in('status', ['pending', 'processing']);

    return {
      total_exports: totalExports || 0,
      active_clients: uniqueClients.size,
      success_rate: Math.round(successRate),
      pending_exports: pendingExports || 0,
    };
  },
};