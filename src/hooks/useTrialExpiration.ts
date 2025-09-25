import { useEffect } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';

export const useTrialExpiration = () => {
  const { subscription, trialInfo, refreshSubscription } = useSubscription();

  useEffect(() => {
    const checkTrialExpiration = async () => {
      if (!subscription || subscription.subscription_status !== 'trial') return;

      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) {
          console.error('Error checking subscription:', error);
          return;
        }

        if (data?.subscription?.isExpired && trialInfo?.isActive) {
          // Trial just expired, refresh subscription data
          await refreshSubscription();
        }
      } catch (error) {
        console.error('Trial expiration check failed:', error);
      }
    };

    // Check trial expiration on mount and every hour
    checkTrialExpiration();
    const interval = setInterval(checkTrialExpiration, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, [subscription?.id, trialInfo?.isActive, refreshSubscription]);

  return {
    isTrialExpired: trialInfo?.isExpired ?? false,
    daysRemaining: trialInfo?.daysRemaining ?? 0,
    isOnTrial: subscription?.subscription_status === 'trial'
  };
};