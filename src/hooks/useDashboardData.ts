
import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useJobApplications } from './useJobApplications';
import { useResumeVersions } from './useResumeVersions';
import { useSessionHistory } from './useSessionHistory';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  resumeVersions: number;
  applicationsSent: number;
  interviewSessions: number;
  profileViews: number;
  trends: {
    resumeVersions: string;
    applicationsSent: string;
    interviewSessions: string;
    profileViews: string;
  };
}

export interface ActivityItem {
  id: string;
  type: 'resume' | 'application' | 'interview' | 'cv-analysis';
  action: string;
  time: string;
  details?: string;
}

export interface ProfileCompletion {
  percentage: number;
  completedSections: string[];
  missingSections: string[];
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const { applications, metrics, loading: appsLoading } = useJobApplications();
  const { versions, loading: versionsLoading } = useResumeVersions();
  const { sessions, loading: sessionsLoading } = useSessionHistory();
  
  const [cvAnalyses, setCvAnalyses] = useState<any[]>([]);
  const [linkedinProfile, setLinkedinProfile] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch additional data
  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (!user) return;

      try {
        // Fetch CV analyses
        const { data: cvData } = await supabase
          .from('cv_analyses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        // Fetch LinkedIn profile
        const { data: linkedinData } = await supabase
          .from('linkedin_profiles')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();

        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setCvAnalyses(cvData || []);
        setLinkedinProfile(linkedinData);
        setUserProfile(profileData);
      } catch (error) {
        console.error('Error fetching additional dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalData();
  }, [user]);

  // Calculate dashboard stats
  const dashboardStats = useMemo((): DashboardStats => {
    const currentWeek = new Date();
    currentWeek.setDate(currentWeek.getDate() - 7);

    const recentVersions = versions.filter(v => new Date(v.created_at) > currentWeek);
    const recentApplications = applications.filter(a => new Date(a.created_at) > currentWeek);
    const recentSessions = sessions.filter(s => new Date(s.created_at) > currentWeek);

    return {
      resumeVersions: versions.length,
      applicationsSent: applications.length,
      interviewSessions: sessions.filter(s => s.completed).length,
      profileViews: Math.floor(Math.random() * 50) + 20, // Would come from analytics
      trends: {
        resumeVersions: recentVersions.length > 0 ? `+${recentVersions.length} this week` : 'No recent activity',
        applicationsSent: recentApplications.length > 0 ? `+${recentApplications.length} this week` : 'No recent activity',
        interviewSessions: recentSessions.length > 0 ? `+${recentSessions.length} this week` : 'No recent activity',
        profileViews: '+12 this week' // Would come from analytics
      }
    };
  }, [versions, applications, sessions]);

  // Calculate recent activity
  const recentActivity = useMemo((): ActivityItem[] => {
    const activities: ActivityItem[] = [];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Add resume activities
    versions.forEach(version => {
      if (new Date(version.updated_at) > oneWeekAgo) {
        activities.push({
          id: `resume-${version.id}`,
          type: 'resume',
          action: `Updated resume: ${version.title}`,
          time: new Date(version.updated_at).toLocaleString(),
          details: `Version ${version.version_number}`
        });
      }
    });

    // Add application activities
    applications.forEach(app => {
      if (new Date(app.created_at) > oneWeekAgo) {
        activities.push({
          id: `app-${app.id}`,
          type: 'application',
          action: `Applied to ${app.position_title} at ${app.company_name}`,
          time: new Date(app.created_at).toLocaleString(),
          details: `Status: ${app.status}`
        });
      }
    });

    // Add interview session activities
    sessions.forEach(session => {
      if (new Date(session.created_at) > oneWeekAgo) {
        activities.push({
          id: `session-${session.id}`,
          type: 'interview',
          action: `Completed ${session.session_type} interview session`,
          time: new Date(session.created_at).toLocaleString(),
          details: session.role_focus ? `Focus: ${session.role_focus}` : undefined
        });
      }
    });

    // Add CV analysis activities
    cvAnalyses.forEach(analysis => {
      if (new Date(analysis.created_at) > oneWeekAgo) {
        activities.push({
          id: `cv-${analysis.id}`,
          type: 'cv-analysis',
          action: `Analyzed CV: ${analysis.file_name}`,
          time: new Date(analysis.created_at).toLocaleString(),
          details: `Score: ${analysis.overall_score}%`
        });
      }
    });

    return activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);
  }, [versions, applications, sessions, cvAnalyses]);

  // Calculate profile completion
  const profileCompletion = useMemo((): ProfileCompletion => {
    const sections = [
      { name: 'Personal Info', completed: !!userProfile?.full_name && !!userProfile?.email },
      { name: 'Resume', completed: versions.length > 0 },
      { name: 'LinkedIn Profile', completed: !!linkedinProfile },
      { name: 'Job Applications', completed: applications.length > 0 },
      { name: 'Interview Practice', completed: sessions.length > 0 },
      { name: 'CV Analysis', completed: cvAnalyses.length > 0 }
    ];

    const completedSections = sections.filter(s => s.completed);
    const missingSections = sections.filter(s => !s.completed);

    return {
      percentage: Math.round((completedSections.length / sections.length) * 100),
      completedSections: completedSections.map(s => s.name),
      missingSections: missingSections.map(s => s.name)
    };
  }, [userProfile, versions, linkedinProfile, applications, sessions, cvAnalyses]);

  const isLoading = loading || appsLoading || versionsLoading || sessionsLoading;

  return {
    dashboardStats,
    recentActivity,
    profileCompletion,
    metrics,
    applications,
    versions,
    sessions,
    cvAnalyses,
    linkedinProfile,
    userProfile,
    loading: isLoading
  };
};
