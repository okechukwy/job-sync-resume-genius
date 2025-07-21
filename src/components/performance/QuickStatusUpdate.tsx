
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, Clock, Users, Trophy, X, Pause, Activity } from 'lucide-react';
import type { JobApplication } from '@/hooks/useJobApplications';

interface QuickStatusUpdateProps {
  application: JobApplication;
  onUpdate: (id: string, status: string) => Promise<void>;
  isUpdating?: boolean;
}

const statusOptions = [
  { value: 'applied', label: 'Applied', icon: Clock, color: 'bg-secondary text-secondary-foreground', metric: 'Applications' },
  { value: 'under_review', label: 'Under Review', icon: Users, color: 'bg-warning text-warning-foreground', metric: 'Responses' },
  { value: 'interview_scheduled', label: 'Interview Scheduled', icon: Users, color: 'bg-primary text-primary-foreground', metric: 'Interviews' },
  { value: 'interview_in_progress', label: 'Interview In Progress', icon: Activity, color: 'bg-blue-500 text-white', metric: 'Interviews' },
  { value: 'interview_completed', label: 'Interview Completed', icon: Check, color: 'bg-primary text-primary-foreground', metric: 'Interviews' },
  { value: 'offer_received', label: 'Offer Received', icon: Trophy, color: 'bg-success text-success-foreground', metric: 'Offers' },
  { value: 'rejected', label: 'Rejected', icon: X, color: 'bg-destructive text-destructive-foreground', metric: 'None' },
  { value: 'withdrawn', label: 'Withdrawn', icon: Pause, color: 'bg-muted text-muted-foreground', metric: 'None' },
];

export const QuickStatusUpdate = ({ application, onUpdate, isUpdating = false }: QuickStatusUpdateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentStatus = statusOptions.find(option => option.value === application.status);
  const CurrentIcon = currentStatus?.icon || Clock;

  const handleStatusChange = async (newStatus: string) => {
    await onUpdate(application.id, newStatus);
    setIsOpen(false);
  };

  const getMetricImpact = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    switch (option?.metric) {
      case 'Responses':
        return 'Will increase Response Rate';
      case 'Interviews':
        return 'Will increase Interview Rate';
      case 'Offers':
        return 'Will increase Offer Rate';
      default:
        return 'No direct metric impact';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Badge className={`${currentStatus?.color} cursor-pointer transition-colors hover:opacity-80`}>
              <CurrentIcon className="w-3 h-3 mr-1" />
              {currentStatus?.label || 'Unknown'}
            </Badge>
            
            <Select 
              value={application.status} 
              onValueChange={handleStatusChange}
              disabled={isUpdating}
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3 h-3" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <p className="font-medium">Current: {currentStatus?.label}</p>
            <p className="text-muted-foreground">Click to change status</p>
            <p className="text-primary">{getMetricImpact(application.status)}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
