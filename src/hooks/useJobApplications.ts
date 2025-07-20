import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type JobApplicationRow = Database['public']['Tables']['job_applications']['Row'];
type JobApplicationInsert = Database['public']['Tables']['job_applications']['Insert'];
type JobApplicationUpdate = Database['public']['Tables']['job_applications']['Update'];
type PerformanceMetricsRow = Database['public']['Tables']['performance_metrics']['Row'];

export interface JobApplication extends JobApplicationRow {
  interview_dates: any[];
}

export interface PerformanceMetrics extends PerformanceMetricsRow {
  top_performing_companies: any[];
}

export const useJobApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications((data || []).map(app => ({
        ...app,
        interview_dates: Array.isArray(app.interview_dates) ? app.interview_dates : []
      })));
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications');
    }
  };

  const fetchMetrics = async (period: string = 'all_time') => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('performance_metrics')
        .select('*')
        .eq('user_id', user.id)
        .eq('metric_period', period)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setMetrics(data ? {
        ...data,
        top_performing_companies: Array.isArray(data.top_performing_companies) ? data.top_performing_companies : []
      } : null);
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError('Failed to fetch metrics');
    }
  };

  const addApplication = async (applicationData: any) => {
    if (!user) return;

    try {
      const insertData = {
        user_id: user.id,
        company_name: applicationData.company_name,
        position_title: applicationData.position_title,
        job_description: applicationData.job_description,
        date_applied: applicationData.date_applied,
        status: applicationData.status || 'applied',
        current_stage: applicationData.current_stage || 'application_submitted',
        resume_version: applicationData.resume_version,
        ats_score: applicationData.ats_score,
        salary_range_min: applicationData.salary_range_min,
        salary_range_max: applicationData.salary_range_max,
        job_location: applicationData.job_location,
        application_source: applicationData.application_source,
        notes: applicationData.notes,
        follow_up_date: applicationData.follow_up_date,
      };

      const { data, error } = await supabase
        .from('job_applications')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      
      const newApp = {
        ...data,
        interview_dates: Array.isArray(data.interview_dates) ? data.interview_dates : []
      };
      setApplications(prev => [newApp, ...prev]);
      toast.success('Application added successfully');
      return newApp;
    } catch (err) {
      console.error('Error adding application:', err);
      toast.error('Failed to add application');
      throw err;
    }
  };

  const updateApplication = async (id: string, updates: Partial<JobApplicationUpdate>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('job_applications')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      const updatedApp = {
        ...data,
        interview_dates: Array.isArray(data.interview_dates) ? data.interview_dates : []
      };
      setApplications(prev => 
        prev.map(app => app.id === id ? { ...app, ...updatedApp } : app)
      );
      toast.success('Application updated successfully');
      return updatedApp;
    } catch (err) {
      console.error('Error updating application:', err);
      toast.error('Failed to update application');
      throw err;
    }
  };

  const deleteApplication = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setApplications(prev => prev.filter(app => app.id !== id));
      toast.success('Application deleted successfully');
    } catch (err) {
      console.error('Error deleting application:', err);
      toast.error('Failed to delete application');
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        setLoading(true);
        await Promise.all([fetchApplications(), fetchMetrics()]);
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const applicationsChannel = supabase
      .channel('job_applications_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_applications',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchApplications();
        }
      )
      .subscribe();

    const metricsChannel = supabase
      .channel('performance_metrics_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'performance_metrics',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchMetrics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(applicationsChannel);
      supabase.removeChannel(metricsChannel);
    };
  }, [user]);

  return {
    applications,
    metrics,
    loading,
    error,
    addApplication,
    updateApplication,
    deleteApplication,
    refetch: () => Promise.all([fetchApplications(), fetchMetrics()]),
  };
};