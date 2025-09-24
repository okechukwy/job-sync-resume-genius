import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface SecurityAnomaly {
  id: string;
  anomaly_type: 'login_pattern' | 'location_change' | 'unusual_activity' | 'suspicious_behavior';
  severity_level: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  metadata: Record<string, any>;
  confidence_score: number;
  resolved: boolean;
  created_at: string;
}

interface TrustedDevice {
  id: string;
  device_fingerprint: string;
  device_name?: string;
  user_agent?: string;
  country_code?: string;
  city?: string;
  trusted: boolean;
  last_used_at: string;
  created_at: string;
}

interface LoginAttempt {
  id: string;
  email: string;
  ip_address: string;
  user_agent?: string;
  country_code?: string;
  city?: string;
  success: boolean;
  failure_reason?: string;
  created_at: string;
}

export const useAdvancedSecurity = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [anomalies, setAnomalies] = useState<SecurityAnomaly[]>([]);
  const [trustedDevices, setTrustedDevices] = useState<TrustedDevice[]>([]);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);

  // Generate device fingerprint
  const generateDeviceFingerprint = (): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('Device fingerprint', 10, 10);
    const canvasFingerprint = canvas.toDataURL();

    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${screen.width}x${screen.height}`,
      canvas: canvasFingerprint.substring(0, 50),
      plugins: Array.from(navigator.plugins).map(p => p.name).join(',')
    };

    return btoa(JSON.stringify(fingerprint)).substring(0, 32);
  };

  // Get user's IP and location
  const getLocationData = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      return await response.json();
    } catch (error) {
      console.warn('Failed to get location data:', error);
      return null;
    }
  };

  // Monitor login attempt
  const monitorLoginAttempt = async (email: string, success: boolean, failureReason?: string) => {
    try {
      const locationData = await getLocationData();
      const deviceFingerprint = generateDeviceFingerprint();

      const eventData = {
        event: {
          event_type: 'login_attempt' as const,
          user_id: success ? user?.id : undefined,
          ip_address: locationData?.ip,
          user_agent: navigator.userAgent,
          location: {
            country_code: locationData?.country_code,
            city: locationData?.city,
            latitude: locationData?.latitude,
            longitude: locationData?.longitude
          },
          metadata: {
            success,
            failure_reason: failureReason,
            device_fingerprint: deviceFingerprint
          }
        },
        email
      };

      const { data, error } = await supabase.functions.invoke('security-monitor', {
        body: eventData
      });

      if (error) {
        console.error('Security monitoring error:', error);
        return null;
      }

      // If login blocked due to brute force
      if (data?.blocked) {
        toast.error(data.message || 'Login temporarily blocked');
        return { blocked: true, message: data.message, duration: data.block_duration };
      }

      // If anomalies detected
      if (data?.anomalies_detected > 0) {
        toast.warning(`${data.anomalies_detected} security anomaly(ies) detected`);
      }

      return data;
    } catch (error) {
      console.error('Login monitoring error:', error);
      return null;
    }
  };

  // Register current device
  const registerCurrentDevice = async () => {
    if (!user) return;

    try {
      const locationData = await getLocationData();
      const deviceFingerprint = generateDeviceFingerprint();

      const eventData = {
        event: {
          event_type: 'device_registration' as const,
          user_id: user.id,
          ip_address: locationData?.ip,
          user_agent: navigator.userAgent,
          metadata: {
            device_fingerprint: deviceFingerprint,
            device_name: navigator.platform
          }
        }
      };

      const { error } = await supabase.functions.invoke('security-monitor', {
        body: eventData
      });

      if (error) {
        console.error('Device registration error:', error);
      } else {
        await fetchTrustedDevices();
      }
    } catch (error) {
      console.error('Device registration error:', error);
    }
  };

  // Fetch security anomalies
  const fetchAnomalies = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('security_anomalies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAnomalies((data || []) as SecurityAnomaly[]);
    } catch (error) {
      console.error('Failed to fetch anomalies:', error);
      toast.error('Failed to load security anomalies');
    }
  };

  // Fetch trusted devices
  const fetchTrustedDevices = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('trusted_devices')
        .select('*')
        .eq('user_id', user.id)
        .order('last_used_at', { ascending: false });

      if (error) throw error;
      setTrustedDevices(data || []);
    } catch (error) {
      console.error('Failed to fetch trusted devices:', error);
      toast.error('Failed to load trusted devices');
    }
  };

  // Fetch login attempts
  const fetchLoginAttempts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('login_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLoginAttempts((data || []).map(item => ({
        ...item,
        ip_address: String(item.ip_address || '')
      })) as LoginAttempt[]);
    } catch (error) {
      console.error('Failed to fetch login attempts:', error);
      toast.error('Failed to load login attempts');
    }
  };

  // Mark anomaly as resolved
  const resolveAnomaly = async (anomalyId: string) => {
    try {
      const { error } = await supabase
        .from('security_anomalies')
        .update({ resolved: true, resolved_at: new Date().toISOString() })
        .eq('id', anomalyId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setAnomalies(prev => 
        prev.map(a => a.id === anomalyId ? { ...a, resolved: true } : a)
      );
      
      toast.success('Anomaly marked as resolved');
    } catch (error) {
      console.error('Failed to resolve anomaly:', error);
      toast.error('Failed to resolve anomaly');
    }
  };

  // Trust a device
  const trustDevice = async (deviceId: string) => {
    try {
      const { error } = await supabase
        .from('trusted_devices')
        .update({ trusted: true })
        .eq('id', deviceId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setTrustedDevices(prev =>
        prev.map(d => d.id === deviceId ? { ...d, trusted: true } : d)
      );

      toast.success('Device marked as trusted');
    } catch (error) {
      console.error('Failed to trust device:', error);
      toast.error('Failed to trust device');
    }
  };

  // Remove a device
  const removeDevice = async (deviceId: string) => {
    try {
      const { error } = await supabase
        .from('trusted_devices')
        .delete()
        .eq('id', deviceId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setTrustedDevices(prev => prev.filter(d => d.id !== deviceId));
      toast.success('Device removed');
    } catch (error) {
      console.error('Failed to remove device:', error);
      toast.error('Failed to remove device');
    }
  };

  // Initialize data fetching
  useEffect(() => {
    const fetchAllData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        await Promise.all([
          fetchAnomalies(),
          fetchTrustedDevices(),
          fetchLoginAttempts(),
          registerCurrentDevice()
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [user]);

  return {
    loading,
    anomalies,
    trustedDevices,
    loginAttempts,
    monitorLoginAttempt,
    registerCurrentDevice,
    resolveAnomaly,
    trustDevice,
    removeDevice,
    refresh: () => {
      fetchAnomalies();
      fetchTrustedDevices();
      fetchLoginAttempts();
    }
  };
};