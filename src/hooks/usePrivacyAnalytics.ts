import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AnalyticsData {
  total_events: number;
  event_types: Record<string, number>;
  user_segments: Record<string, number>;
  daily_counts: Record<string, number>;
  popular_features: Record<string, number>;
}

export const usePrivacyAnalytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Track an event with privacy preservation
  const trackEvent = async (eventType: string, eventData?: Record<string, any>) => {
    try {
      const userData = user ? {
        user_id: user.id,
        subscription_type: 'free', // This would come from user subscription data
        account_age_days: Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)),
        country_code: 'US' // This would come from user location data
      } : null;

      const { data, error } = await supabase.functions.invoke('privacy-analytics', {
        body: {
          action: 'track_event',
          event_type: eventType,
          event_data: eventData || {},
          user_data: userData
        }
      });

      if (error) {
        console.error('Analytics tracking error:', error);
        return false;
      }

      return data?.success || false;
    } catch (error) {
      console.error('Analytics tracking error:', error);
      return false;
    }
  };

  // Get aggregated analytics (admin only)
  const getAggregatedAnalytics = async (timeRange: string = '30d', segment: string = 'all') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('privacy-analytics', {
        body: {
          action: 'get_aggregated_analytics',
          time_range: timeRange,
          segment
        }
      });

      if (error) throw error;

      if (data?.success) {
        return data.analytics as AnalyticsData;
      } else {
        throw new Error(data?.error || 'Failed to get analytics');
      }
    } catch (error) {
      console.error('Get analytics error:', error);
      toast.error('Failed to load analytics');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Clean up old analytics data
  const cleanupOldData = async (retentionDays: number = 365) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('privacy-analytics', {
        body: {
          action: 'cleanup_old_data',
          retention_days: retentionDays
        }
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(`Analytics data older than ${retentionDays} days has been cleaned up`);
        return true;
      } else {
        throw new Error(data?.error || 'Failed to cleanup data');
      }
    } catch (error) {
      console.error('Cleanup error:', error);
      toast.error('Failed to cleanup old data');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Convenience methods for common events
  const trackPageView = (pageName: string) => {
    return trackEvent('page_view', { page: pageName });
  };

  const trackFeatureUsage = (feature: string, action?: string) => {
    return trackEvent('feature_usage', { 
      category: feature,
      action: action || 'used'
    });
  };

  const trackUserAction = (action: string, details?: Record<string, any>) => {
    return trackEvent('user_action', {
      action,
      ...details
    });
  };

  return {
    loading,
    trackEvent,
    trackPageView,
    trackFeatureUsage,
    trackUserAction,
    getAggregatedAnalytics,
    cleanupOldData
  };
};