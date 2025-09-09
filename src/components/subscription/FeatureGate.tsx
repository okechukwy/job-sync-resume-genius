import React from 'react';
import { Lock, Crown } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgrade?: boolean;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  children, 
  fallback,
  showUpgrade = true 
}) => {
  const { hasFeatureAccess, subscription, trialInfo, loading } = useSubscription();
  const navigate = useNavigate();

  if (loading) {
    return <div className="animate-pulse h-32 bg-muted rounded-lg" />;
  }

  const hasAccess = hasFeatureAccess(feature);

  if (hasAccess) {
    return <>{children}</>;
  }

  // If custom fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default upgrade prompt
  if (showUpgrade) {
    const handleUpgrade = () => {
      navigate('/checkout?plan=starter&type=upgrade');
    };

    return (
      <Card className="p-6 text-center border-dashed border-2 border-muted-foreground/20">
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 rounded-full bg-muted">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Premium Feature</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {subscription?.subscription_status === 'trial' && trialInfo?.isExpired
                ? 'Your free trial has ended. Upgrade to access this feature.'
                : subscription?.subscription_status === 'expired'
                ? 'Your subscription has expired. Reactivate to access this feature.'
                : 'Upgrade your plan to unlock this feature.'}
            </p>
            <Button onClick={handleUpgrade} className="inline-flex items-center space-x-2">
              <Crown className="h-4 w-4" />
              <span>
                {subscription?.subscription_status === 'expired' ? 'Reactivate Account' : 'Upgrade Now'}
              </span>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return null;
};