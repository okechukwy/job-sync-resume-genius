import { Clock, Crown, AlertTriangle } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const TrialStatusBanner = () => {
  const { subscription, trialInfo, loading } = useSubscription();
  const navigate = useNavigate();

  if (loading || !subscription) return null;

  // Don't show banner for active paid subscribers
  if (subscription.subscription_status === 'active') return null;

  const handleUpgrade = () => {
    navigate('/checkout?plan=starter&type=upgrade');
  };

  if (subscription.subscription_status === 'trial' && trialInfo?.isActive) {
    return (
      <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">Free Trial Active</h3>
                <Badge variant="secondary" className="text-xs">
                  {trialInfo.daysRemaining} days left
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Enjoying ResumeAI? Upgrade to continue accessing all features.
              </p>
            </div>
          </div>
          <Button onClick={handleUpgrade} size="sm" className="ml-4">
            Upgrade Now
          </Button>
        </div>
      </Card>
    );
  }

  if (subscription.subscription_status === 'trial' && trialInfo?.isExpired) {
    return (
      <Card className="border-destructive/20 bg-gradient-to-r from-destructive/10 to-orange-500/10 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Trial Expired</h3>
              <p className="text-sm text-muted-foreground">
                Your free trial has ended. Upgrade to continue using all features.
              </p>
            </div>
          </div>
          <Button onClick={handleUpgrade} size="sm" variant="destructive" className="ml-4">
            Upgrade to Continue
          </Button>
        </div>
      </Card>
    );
  }

  if (subscription.subscription_status === 'expired') {
    return (
      <Card className="border-destructive/20 bg-gradient-to-r from-destructive/10 to-orange-500/10 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Access Limited</h3>
              <p className="text-sm text-muted-foreground">
                Your subscription has expired. Upgrade to restore full access.
              </p>
            </div>
          </div>
          <Button onClick={handleUpgrade} size="sm" variant="destructive" className="ml-4">
            Reactivate Account
          </Button>
        </div>
      </Card>
    );
  }

  return null;
};