import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Privacy-preserving analytics utilities
class PrivacyAnalytics {
  static hashSession(userId: string, timestamp: number): string {
    // Create a session hash that can't be traced back to the user
    const sessionData = `${userId}-${Math.floor(timestamp / (1000 * 60 * 60 * 24))}`; // Daily sessions
    return this.simpleHash(sessionData);
  }

  static simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }

  static anonymizeUserData(userData: any): any {
    // Remove all personally identifiable information
    const anonymized = {
      user_segment: this.getUserSegment(userData),
      subscription_type: userData.subscription_type || 'free',
      account_age_days: userData.account_age_days || 0,
      feature_usage: userData.feature_usage || {},
      general_location: userData.country_code || 'unknown'
    };

    return anonymized;
  }

  static getUserSegment(userData: any): string {
    // Categorize users into broad segments for analytics
    if (userData.subscription_type === 'premium') return 'premium_user';
    if (userData.account_age_days > 365) return 'long_term_user';
    if (userData.account_age_days > 30) return 'regular_user';
    return 'new_user';
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, event_type, event_data, user_data } = await req.json();

    console.log('Privacy analytics action:', action, 'event:', event_type);

    switch (action) {
      case 'track_event': {
        if (!event_type) {
          return new Response(JSON.stringify({ error: 'Event type required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Create anonymized session hash
        const sessionHash = user_data ? 
          PrivacyAnalytics.hashSession(user_data.user_id, Date.now()) : 
          PrivacyAnalytics.simpleHash(`anonymous-${Date.now()}`);

        // Anonymize user data if provided
        const anonymizedData = user_data ? 
          PrivacyAnalytics.anonymizeUserData(user_data) : 
          { user_segment: 'anonymous' };

        // Sanitize event data to remove any PII
        const sanitizedEventData = {
          action: event_data?.action || 'unknown',
          category: event_data?.category || 'general',
          value: typeof event_data?.value === 'number' ? event_data.value : 1,
          // Remove any potentially identifying information
          ...Object.fromEntries(
            Object.entries(event_data || {})
              .filter(([key, value]) => 
                !['email', 'name', 'phone', 'address', 'ip_address'].includes(key.toLowerCase())
              )
          )
        };

        // Store anonymized analytics
        const { error } = await supabase
          .from('anonymized_analytics')
          .insert({
            session_hash: sessionHash,
            event_type,
            anonymized_data: {
              ...anonymizedData,
              event_details: sanitizedEventData
            },
            user_segment: anonymizedData.user_segment
          });

        if (error) {
          console.error('Analytics storage error:', error);
          return new Response(JSON.stringify({ error: 'Failed to store analytics' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ 
          success: true, 
          session_hash: sessionHash 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'get_aggregated_analytics': {
        const { time_range = '30d', segment = 'all' } = await req.json();

        let dateFilter = new Date();
        if (time_range === '7d') {
          dateFilter.setDate(dateFilter.getDate() - 7);
        } else if (time_range === '30d') {
          dateFilter.setDate(dateFilter.getDate() - 30);
        } else if (time_range === '90d') {
          dateFilter.setDate(dateFilter.getDate() - 90);
        }

        // Build query
        let query = supabase
          .from('anonymized_analytics')
          .select('event_type, user_segment, anonymized_data, created_at')
          .gte('created_at', dateFilter.toISOString());

        if (segment !== 'all') {
          query = query.eq('user_segment', segment);
        }

        const { data: analyticsData, error } = await query;

        if (error) {
          console.error('Analytics retrieval error:', error);
          return new Response(JSON.stringify({ error: 'Failed to retrieve analytics' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Aggregate data for reporting
        const aggregatedResults: {
          total_events: number;
          event_types: Record<string, number>;
          user_segments: Record<string, number>;
          daily_counts: Record<string, number>;
          popular_features: Record<string, number>;
        } = {
          total_events: analyticsData?.length || 0,
          event_types: {},
          user_segments: {},
          daily_counts: {},
          popular_features: {}
        };

        analyticsData?.forEach(record => {
          // Count by event type
          aggregatedResults.event_types[record.event_type] = 
            (aggregatedResults.event_types[record.event_type] || 0) + 1;

          // Count by user segment
          aggregatedResults.user_segments[record.user_segment] = 
            (aggregatedResults.user_segments[record.user_segment] || 0) + 1;

          // Daily counts
          const date = new Date(record.created_at).toISOString().split('T')[0];
          aggregatedResults.daily_counts[date] = 
            (aggregatedResults.daily_counts[date] || 0) + 1;

          // Popular features (from event details)
          if (record.anonymized_data?.event_details?.category) {
            const category = record.anonymized_data.event_details.category;
            aggregatedResults.popular_features[category] = 
              (aggregatedResults.popular_features[category] || 0) + 1;
          }
        });

        return new Response(JSON.stringify({
          success: true,
          time_range,
          segment,
          analytics: aggregatedResults
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'cleanup_old_data': {
        // Clean up analytics data older than specified retention period
        const { retention_days = 365 } = await req.json();
        
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - retention_days);

        const { error } = await supabase
          .from('anonymized_analytics')
          .delete()
          .lt('created_at', cutoffDate.toISOString());

        if (error) {
          console.error('Analytics cleanup error:', error);
          return new Response(JSON.stringify({ error: 'Failed to cleanup analytics' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ 
          success: true, 
          cleanup_completed: true,
          retention_days 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Privacy analytics service error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});