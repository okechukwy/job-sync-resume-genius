import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SecuritySettings {
  two_factor_enabled: boolean;
  login_notifications: boolean;
  suspicious_activity_alerts: boolean;
  password_changed_at?: string;
  last_security_review?: string;
}

interface ConnectedAccount {
  id: string;
  provider: string;
  provider_account_id: string;
  provider_account_email: string;
  connected_at: string;
  is_active: boolean;
}

interface SecurityEvent {
  id: string;
  event_type: string;
  event_description: string;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
}

export const useSecuritySettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<SecuritySettings>({
    two_factor_enabled: false,
    login_notifications: true,
    suspicious_activity_alerts: true
  });
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);

  useEffect(() => {
    if (user) {
      fetchAllSecurityData();
    }
  }, [user]);

  const fetchAllSecurityData = async () => {
    await Promise.all([
      fetchSecuritySettings(),
      fetchConnectedAccounts(),
      fetchSecurityEvents()
    ]);
  };

  const fetchSecuritySettings = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_security_settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching security settings:', error);
      return;
    }

    if (data) {
      setSettings({
        two_factor_enabled: data.two_factor_enabled,
        login_notifications: data.login_notifications,
        suspicious_activity_alerts: data.suspicious_activity_alerts,
        password_changed_at: data.password_changed_at,
        last_security_review: data.last_security_review
      });
    } else {
      await createDefaultSecuritySettings();
    }
  };

  const createDefaultSecuritySettings = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('user_security_settings')
      .insert({
        user_id: user.id,
        two_factor_enabled: false,
        login_notifications: true,
        suspicious_activity_alerts: true
      });

    if (error) {
      console.error('Error creating security settings:', error);
    } else {
      await fetchSecuritySettings();
    }
  };

  const fetchConnectedAccounts = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('connected_at', { ascending: false });

    if (error) {
      console.error('Error fetching connected accounts:', error);
      return;
    }

    setConnectedAccounts(data || []);
  };

  const fetchSecurityEvents = async (limit = 10) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('security_events')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching security events:', error);
      return;
    }

    setSecurityEvents((data || []).map(event => ({
      id: event.id,
      event_type: event.event_type,
      event_description: event.event_description || '',
      ip_address: event.ip_address as string | null,
      user_agent: event.user_agent as string | null,
      created_at: event.created_at
    })));
  };

  const updateSecuritySetting = async (setting: keyof SecuritySettings, value: boolean) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_security_settings')
        .update({ [setting]: value })
        .eq('user_id', user.id);

      if (error) throw error;

      setSettings(prev => ({ ...prev, [setting]: value }));

      // Log security event
      await logSecurityEvent('security_setting_changed', `${setting} ${value ? 'enabled' : 'disabled'}`);

      toast({
        title: "Success",
        description: "Security setting updated"
      });

      return true;
    } catch (error: any) {
      console.error('Error updating security setting:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update security setting",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      // Update password change timestamp
      await supabase
        .from('user_security_settings')
        .update({ password_changed_at: new Date().toISOString() })
        .eq('user_id', user.id);

      // Log security event
      await logSecurityEvent('password_changed', 'User changed their password');

      toast({
        title: "Success",
        description: "Password updated successfully"
      });

      return true;
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logSecurityEvent = async (eventType: string, description: string, metadata?: any) => {
    if (!user) return;

    try {
      await supabase.from('security_events').insert({
        user_id: user.id,
        event_type: eventType,
        event_description: description,
        metadata: metadata || {}
      });

      // Refresh security events
      await fetchSecurityEvents();
    } catch (error) {
      console.error('Error logging security event:', error);
    }
  };

  const requestDataExport = async () => {
    if (!user) return false;

    setLoading(true);
    try {
      await logSecurityEvent('data_export_requested', 'User requested data export');

      toast({
        title: "Export Requested",
        description: "Your data export will be emailed to you within 24 hours"
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request data export",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const disconnectAccount = async (accountId: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('connected_accounts')
        .update({ is_active: false })
        .eq('id', accountId)
        .eq('user_id', user.id);

      if (error) throw error;

      await logSecurityEvent('account_disconnected', 'User disconnected an external account');
      await fetchConnectedAccounts();

      toast({
        title: "Success",
        description: "Account disconnected successfully"
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to disconnect account",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    settings,
    connectedAccounts,
    securityEvents,
    updateSecuritySetting,
    changePassword,
    logSecurityEvent,
    requestDataExport,
    disconnectAccount,
    refresh: fetchAllSecurityData
  };
};