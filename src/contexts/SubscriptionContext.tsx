import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionData {
  id: string;
  user_id: string;
  subscription_status: 'trial' | 'active' | 'expired' | 'cancelled';
  subscription_plan: 'starter' | 'professional' | 'premium';
  trial_start_date?: string;
  trial_end_date?: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  auto_upgrade_enabled: boolean;
}

interface TrialInfo {
  daysRemaining: number;
  isExpired: boolean;
  isActive: boolean;
}

interface SubscriptionContextType {
  subscription: SubscriptionData | null;
  trialInfo: TrialInfo | null;
  loading: boolean;
  hasFeatureAccess: (feature: string) => boolean;
  refreshSubscription: () => Promise<void>;
  enableAutoUpgrade: () => Promise<void>;
  disableAutoUpgrade: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setTrialInfo(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Fetch user subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (subscriptionError && subscriptionError.code !== 'PGRST116') {
        console.error('Error fetching subscription:', subscriptionError);
        return;
      }

      if (subscriptionData) {
        setSubscription(subscriptionData as SubscriptionData);

        // Calculate trial info if on trial
        if (subscriptionData.subscription_status === 'trial' && subscriptionData.trial_end_date) {
          const endDate = new Date(subscriptionData.trial_end_date);
          const now = new Date();
          const diffTime = endDate.getTime() - now.getTime();
          const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
          
          setTrialInfo({
            daysRemaining,
            isExpired: daysRemaining <= 0,
            isActive: daysRemaining > 0
          });
        } else {
          setTrialInfo(null);
        }
      }
    } catch (error) {
      console.error('Error in fetchSubscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasFeatureAccess = (feature: string): boolean => {
    if (!subscription) return false;

    // If user has active subscription, they have access to all features
    if (subscription.subscription_status === 'active') {
      return true;
    }

    // If user is on trial and trial is not expired
    if (subscription.subscription_status === 'trial' && trialInfo?.isActive) {
      // Basic trial features - could be fetched from trial_settings table
      const trialFeatures = ['resume_builder', 'template_access', 'ats_analysis', 'basic_ai_recommendations', 'interview_prep'];
      return trialFeatures.includes(feature);
    }

    return false;
  };

  const enableAutoUpgrade = async () => {
    // Auto-upgrade functionality will be available once payment integration is complete
    console.log('Auto-upgrade will be available with payment integration');
  };

  const disableAutoUpgrade = async () => {
    // Auto-upgrade functionality will be available once payment integration is complete
    console.log('Auto-upgrade will be available with payment integration');
  };

  const refreshSubscription = async () => {
    await fetchSubscription();
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  const value = {
    subscription,
    trialInfo,
    loading,
    hasFeatureAccess,
    refreshSubscription,
    enableAutoUpgrade,
    disableAutoUpgrade,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};