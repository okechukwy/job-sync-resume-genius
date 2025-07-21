
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, HelpCircle, Target, Users, Calendar, Trophy } from 'lucide-react';
import { useState } from 'react';

export const MetricsLegend = () => {
  const [isOpen, setIsOpen] = useState(false);

  const statusFlow = [
    { status: 'applied', label: 'Applied', description: 'Initial application submitted', metric: 'Counts toward Total Applications' },
    { status: 'under_review', label: 'Under Review', description: 'Employer is reviewing your application', metric: 'Increases Response Rate' },
    { status: 'interview_scheduled', label: 'Interview Scheduled', description: 'Interview has been scheduled', metric: 'Increases Interview Rate' },
    { status: 'interview_completed', label: 'Interview Completed', description: 'Interview process completed', metric: 'Maintains Interview Rate' },
    { status: 'offer_received', label: 'Offer Received', description: 'Job offer has been received', metric: 'Increases Offer Rate' },
  ];

  const metricExplanations = [
    { 
      icon: Target, 
      name: 'Total Applications', 
      description: 'All job applications you\'ve submitted, regardless of status' 
    },
    { 
      icon: Users, 
      name: 'Response Rate', 
      description: 'Percentage of applications that received any response (under review, interview, or offer)' 
    },
    { 
      icon: Calendar, 
      name: 'Interview Rate', 
      description: 'Percentage of applications that led to interviews (scheduled or completed)' 
    },
    { 
      icon: Trophy, 
      name: 'Offer Rate', 
      description: 'Percentage of applications that resulted in job offers' 
    },
  ];

  return (
    <Card className="glass-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                How Performance Tracking Works
              </CardTitle>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Status Progression Flow</h4>
              <div className="space-y-2">
                {statusFlow.map((item, index) => (
                  <div key={item.status} className="flex items-center gap-3 p-2 rounded-lg bg-muted/20">
                    <Badge variant="outline" className="min-w-fit">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    <div className="text-xs text-primary font-medium">{item.metric}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Metric Calculations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {metricExplanations.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.name} className="flex items-start gap-3 p-3 rounded-lg bg-muted/10">
                      <Icon className="w-4 h-4 mt-0.5 text-primary" />
                      <div>
                        <div className="font-medium text-sm">{metric.name}</div>
                        <div className="text-xs text-muted-foreground">{metric.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-primary/10 rounded-lg">
              <div className="text-sm font-medium text-primary mb-1">💡 Pro Tip</div>
              <div className="text-xs text-muted-foreground">
                Updating your application status as you progress through the hiring process will automatically 
                recalculate your performance metrics in real-time. This helps you track your job search effectiveness.
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
