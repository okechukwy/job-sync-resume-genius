
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Users, Trophy, Check, MoreHorizontal } from 'lucide-react';
import type { JobApplication } from '@/hooks/useJobApplications';

interface BulkActionsProps {
  applications: JobApplication[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onBulkUpdate: (ids: string[], status: string) => Promise<void>;
  isUpdating?: boolean;
}

const bulkActions = [
  { status: 'under_review', label: 'Mark as Under Review', icon: Users, description: 'These applications will be marked as under review' },
  { status: 'interview_scheduled', label: 'Schedule Interview', icon: Users, description: 'These applications will be marked as interview scheduled' },
  { status: 'interview_completed', label: 'Complete Interview', icon: Check, description: 'These applications will be marked as interview completed' },
  { status: 'offer_received', label: 'Mark Offer Received', icon: Trophy, description: 'These applications will be marked as offer received' },
];

export const BulkActions = ({ 
  applications, 
  selectedIds, 
  onSelectionChange, 
  onBulkUpdate, 
  isUpdating = false 
}: BulkActionsProps) => {
  const [confirmAction, setConfirmAction] = useState<{ status: string; label: string; description: string } | null>(null);

  const isAllSelected = applications.length > 0 && selectedIds.length === applications.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < applications.length;

  const handleSelectAll = (checked: boolean) => {
    onSelectionChange(checked ? applications.map(app => app.id) : []);
  };

  const handleBulkAction = async (status: string) => {
    if (selectedIds.length === 0) return;
    
    await onBulkUpdate(selectedIds, status);
    onSelectionChange([]);
    setConfirmAction(null);
  };

  const getMetricImpact = (status: string, count: number) => {
    switch (status) {
      case 'under_review':
        return `+${count} to Responses Received`;
      case 'interview_scheduled':
      case 'interview_completed':
        return `+${count} to Interviews Scheduled`;
      case 'offer_received':
        return `+${count} to Offers Received`;
      default:
        return 'No metric impact';
    }
  };

  if (applications.length === 0) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isAllSelected}
            ref={(el: HTMLButtonElement | null) => {
              if (el) {
                const input = el.querySelector('input') as HTMLInputElement;
                if (input) input.indeterminate = isIndeterminate;
              }
            }}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">
            {selectedIds.length === 0 
              ? `Select applications for bulk actions` 
              : `${selectedIds.length} selected`}
          </span>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selectedIds.length} selected</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isUpdating}>
                  <MoreHorizontal className="w-4 h-4" />
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {bulkActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <DropdownMenuItem 
                      key={action.status}
                      onClick={() => setConfirmAction(action)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {action.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Action</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.description}
              <div className="mt-2 p-2 bg-muted rounded text-sm">
                <strong>Metric Impact:</strong> {confirmAction && getMetricImpact(confirmAction.status, selectedIds.length)}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => confirmAction && handleBulkAction(confirmAction.status)}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
