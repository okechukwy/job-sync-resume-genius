import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SecurityEvent {
  user_id?: string;
  event_type: 'login_attempt' | 'anomaly_detected' | 'brute_force_attempt' | 'device_registration';
  ip_address?: string;
  user_agent?: string;
  location?: {
    country_code?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  metadata?: Record<string, any>;
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

    const { event, email, password }: { event: SecurityEvent; email?: string; password?: string } = await req.json();

    console.log('Security monitor event:', event.event_type, event.user_id);

    // Get geolocation data from IP
    let locationData = {};
    if (event.ip_address) {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${event.ip_address}?fields=status,country,countryCode,region,city,lat,lon`);
        const geoData = await geoResponse.json();
        if (geoData.status === 'success') {
          locationData = {
            country_code: geoData.countryCode,
            city: geoData.city,
            latitude: geoData.lat,
            longitude: geoData.lon
          };
          event.location = { ...event.location, ...locationData };
        }
      } catch (error) {
        console.warn('Geolocation lookup failed:', error);
      }
    }

    switch (event.event_type) {
      case 'login_attempt': {
        if (!email || !event.ip_address) {
          return new Response(JSON.stringify({ error: 'Email and IP address required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Check for brute force protection
        const { data: bruteForceResult } = await supabase.rpc('check_brute_force_protection', {
          p_email: email,
          p_ip_address: event.ip_address
        });

        if (bruteForceResult?.blocked) {
          console.log('Login attempt blocked due to brute force protection');
          return new Response(JSON.stringify({
            blocked: true,
            message: 'Too many failed attempts. Please try again later.',
            block_duration: bruteForceResult.block_duration
          }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // If login is successful and user_id is provided, check for anomalies
        if (event.user_id && event.metadata?.success) {
          const { data: anomalies } = await supabase.rpc('detect_login_anomaly', {
            p_user_id: event.user_id,
            p_ip_address: event.ip_address,
            p_country_code: (locationData as any)?.country_code || 'UNKNOWN',
            p_user_agent: event.user_agent || ''
          });

          // Record login attempt as successful
          await supabase.from('login_attempts').insert({
            user_id: event.user_id,
            email,
            ip_address: event.ip_address,
            user_agent: event.user_agent,
            country_code: (locationData as any)?.country_code,
            city: (locationData as any)?.city,
            latitude: (locationData as any)?.latitude,
            longitude: (locationData as any)?.longitude,
            success: true
          });

          // Process detected anomalies
          if (anomalies && Array.isArray(anomalies) && anomalies.length > 0) {
            for (const anomaly of anomalies) {
              await supabase.from('security_anomalies').insert({
                user_id: event.user_id,
                anomaly_type: anomaly.type === 'new_location' ? 'location_change' : 'login_pattern',
                severity_level: anomaly.severity,
                description: anomaly.description,
                metadata: anomaly.metadata,
                confidence_score: 0.8
              });
            }

            return new Response(JSON.stringify({
              success: true,
              anomalies_detected: anomalies.length,
              anomalies
            }), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
        }

        return new Response(JSON.stringify({ success: true, blocked: false }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'device_registration': {
        if (!event.user_id || !event.metadata?.device_fingerprint) {
          return new Response(JSON.stringify({ error: 'User ID and device fingerprint required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Register or update device
        const { error } = await supabase.from('trusted_devices').upsert({
          user_id: event.user_id,
          device_fingerprint: event.metadata.device_fingerprint,
          device_name: event.metadata.device_name,
          user_agent: event.user_agent,
          ip_address: event.ip_address,
          country_code: (locationData as any)?.country_code,
          city: (locationData as any)?.city,
          trusted: false,
          last_used_at: new Date().toISOString()
        }, { onConflict: 'user_id,device_fingerprint' });

        if (error) {
          console.error('Device registration error:', error);
          return new Response(JSON.stringify({ error: 'Device registration failed' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true, device_registered: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'anomaly_detected': {
        if (!event.user_id) {
          return new Response(JSON.stringify({ error: 'User ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { error } = await supabase.from('security_anomalies').insert({
          user_id: event.user_id,
          anomaly_type: event.metadata?.type || 'unusual_activity',
          severity_level: event.metadata?.severity || 'medium',
          description: event.metadata?.description || 'Unusual activity detected',
          metadata: event.metadata || {},
          confidence_score: event.metadata?.confidence_score || 0.7
        });

        if (error) {
          console.error('Anomaly logging error:', error);
          return new Response(JSON.stringify({ error: 'Failed to log anomaly' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true, anomaly_logged: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Invalid event type' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Security monitor error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});