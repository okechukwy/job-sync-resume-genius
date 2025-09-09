import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AutoUpgradeSettings = () => {
  const { subscription, trialInfo } = useSubscription();
  const { toast } = useToast();

  // Only show for trial users
  if (!subscription || subscription.subscription_status !== 'trial') {
    return null;
  }

  const handleToggle = (enabled: boolean) => {
    // Auto-upgrade will be available once payment integration is complete
    toast({
      title: "Coming Soon",
      description: "Auto-upgrade will be available once payment integration is complete.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Auto-Upgrade</span>
            </CardTitle>
            <CardDescription>
              Automatically upgrade to the Starter plan when your trial expires
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            ${5}/month
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Enable Auto-Upgrade</p>
            <p className="text-xs text-muted-foreground">
              {trialInfo?.daysRemaining ? `${trialInfo.daysRemaining} days remaining` : 'Trial expired'}
            </p>
          </div>
          <Switch
            checked={subscription.auto_upgrade_enabled}
            onCheckedChange={handleToggle}
          />
        </div>
        
        <div className="flex items-start space-x-2 p-3 rounded-md bg-muted/50">
          <InfoIcon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="mb-1">
              <strong>Auto-upgrade includes:</strong>
            </p>
            <ul className="space-y-0.5 ml-2">
              <li>• Unlimited resume downloads</li>
              <li>• Advanced ATS optimization</li>
              <li>• AI-powered recommendations</li>
              <li>• Priority support</li>
            </ul>
            <p className="mt-2 text-xs">
              You can cancel anytime. No commitment required.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};