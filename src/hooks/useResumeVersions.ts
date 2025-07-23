import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ResumeVersion {
  id: string;
  title: string;
  description?: string;
  version_number: number;
  parent_resume_id?: string;
  template_id: string;
  created_at: string;
  updated_at: string;
  archived_at?: string;
  is_active: boolean;
  metrics?: {
    total_applications: number;
    responses_received: number;
    interviews_scheduled: number;
    offers_received: number;
    avg_ats_score: number;
    response_rate: number;
    interview_rate: number;
    offer_rate: number;
  };
}

export interface VersionInsight {
  id: string;
  analysis: string;
  recommendations: string[];
  strengths: string[];
  improvements: string[];
  industry_performance: Record<string, number>;
}

export const useResumeVersions = () => {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [insights, setInsights] = useState<VersionInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const { toast } = useToast();

  const fetchVersions = async () => {
    try {
      setLoading(true);
      
      // Fetch ALL user resume versions (both active and archived)
      const { data: resumeData, error: resumeError } = await supabase
        .from('user_resumes')
        .select('*')
        .order('created_at', { ascending: false });

      if (resumeError) throw resumeError;

      // Fetch metrics for each version with proper error handling
      const versionsWithMetrics = await Promise.all(
        (resumeData || []).map(async (resume) => {
          try {
            const { data: metricsData, error: metricsError } = await supabase
              .rpc('get_resume_version_metrics', { resume_id: resume.id });

            if (metricsError) {
              console.warn('Error fetching metrics for resume', resume.id, metricsError);
              throw metricsError;
            }

            return {
              ...resume,
              metrics: metricsData?.[0] || {
                total_applications: 0,
                responses_received: 0,
                interviews_scheduled: 0,
                offers_received: 0,
                avg_ats_score: 0,
                response_rate: 0,
                interview_rate: 0,
                offer_rate: 0,
              }
            };
          } catch (error) {
            console.warn('Failed to fetch metrics for resume', resume.id, error);
            // Return resume with default metrics if fetching fails
            return {
              ...resume,
              metrics: {
                total_applications: 0,
                responses_received: 0,
                interviews_scheduled: 0,
                offers_received: 0,
                avg_ats_score: 0,
                response_rate: 0,
                interview_rate: 0,
                offer_rate: 0,
              }
            };
          }
        })
      );

      setVersions(versionsWithMetrics);
    } catch (error) {
      console.error('Error fetching resume versions:', error);
      toast({
        title: "Error",
        description: "Failed to load resume versions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async () => {
    try {
      setInsightsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('version-insights', {
        body: { versions }
      });

      if (error) throw error;
      
      setInsights(data?.insights || []);
      
      toast({
        title: "Success",
        description: "AI insights generated successfully",
      });
    } catch (error) {
      console.error('Error generating insights:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI insights",
        variant: "destructive",
      });
    } finally {
      setInsightsLoading(false);
    }
  };

  const duplicateVersion = async (versionId: string, newTitle?: string, newDescription?: string) => {
    try {
      // Get the source resume
      const sourceVersion = versions.find(v => v.id === versionId);
      if (!sourceVersion) throw new Error('Source version not found');

      // Get the full resume data
      const { data: sourceData, error: fetchError } = await supabase
        .from('user_resumes')
        .select('*')
        .eq('id', versionId)
        .single();

      if (fetchError) throw fetchError;

      // Get the highest version number for this user
      const { data: maxVersionData, error: maxVersionError } = await supabase
        .from('user_resumes')
        .select('version_number')
        .eq('user_id', sourceData.user_id)
        .order('version_number', { ascending: false })
        .limit(1);

      if (maxVersionError) throw maxVersionError;

      const nextVersionNumber = (maxVersionData?.[0]?.version_number || 0) + 1;

      // Create new version
      const { data: newVersion, error: createError } = await supabase
        .from('user_resumes')
        .insert({
          ...sourceData,
          id: undefined, // Let Supabase generate new ID
          title: newTitle || `${sourceData.title} v${nextVersionNumber}`,
          description: newDescription || `Copy of ${sourceData.title}`,
          version_number: nextVersionNumber,
          parent_resume_id: versionId,
          created_at: undefined, // Let Supabase set timestamp
          updated_at: undefined, // Let Supabase set timestamp
        })
        .select()
        .single();

      if (createError) throw createError;

      toast({
        title: "Success",
        description: "Resume version duplicated successfully",
      });

      await fetchVersions();
      return newVersion;
    } catch (error) {
      console.error('Error duplicating version:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate resume version",
        variant: "destructive",
      });
    }
  };

  const archiveVersion = async (versionId: string) => {
    try {
      const { error } = await supabase
        .from('user_resumes')
        .update({ 
          archived_at: new Date().toISOString(),
          is_active: false 
        })
        .eq('id', versionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resume version archived successfully",
      });

      await fetchVersions();
    } catch (error) {
      console.error('Error archiving version:', error);
      toast({
        title: "Error",
        description: "Failed to archive resume version",
        variant: "destructive",
      });
    }
  };

  const restoreVersion = async (versionId: string) => {
    try {
      const { error } = await supabase
        .from('user_resumes')
        .update({ 
          archived_at: null,
          is_active: true 
        })
        .eq('id', versionId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Resume version restored successfully",
      });

      await fetchVersions();
    } catch (error) {
      console.error('Error restoring version:', error);
      toast({
        title: "Error",
        description: "Failed to restore resume version",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  return {
    versions,
    insights,
    loading,
    insightsLoading,
    fetchVersions,
    generateInsights,
    duplicateVersion,
    archiveVersion,
    restoreVersion,
  };
};