
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit2, Trash2 } from 'lucide-react';
import type { JobApplication } from '@/hooks/useJobApplications';
import { QuickStatusUpdate } from './QuickStatusUpdate';

interface ApplicationsTableProps {
  applications: JobApplication[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onEditApplication: (application: JobApplication) => void;
  onDeleteApplication: (id: string) => void;
  onStatusUpdate: (id: string, status: string) => Promise<void>;
  isUpdating?: boolean;
}

export const ApplicationsTable = ({ 
  applications, 
  selectedIds, 
  onSelectionChange, 
  onEditApplication, 
  onDeleteApplication, 
  onStatusUpdate,
  isUpdating = false 
}: ApplicationsTableProps) => {
  const formatStage = (stage: string) => {
    return stage.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleRowSelect = (applicationId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, applicationId]);
    } else {
      onSelectionChange(selectedIds.filter(id => id !== applicationId));
    }
  };

  if (applications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No applications found. Add your first application to start tracking performance.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border/20">
            <TableHead className="w-12">
              <span className="sr-only">Select</span>
            </TableHead>
            <TableHead className="text-left py-3 px-2">Company</TableHead>
            <TableHead className="text-left py-3 px-2">Position</TableHead>
            <TableHead className="text-left py-3 px-2">Date Applied</TableHead>
            <TableHead className="text-left py-3 px-2">Status</TableHead>
            <TableHead className="text-left py-3 px-2">Stage</TableHead>
            <TableHead className="text-left py-3 px-2">Resume Version</TableHead>
            <TableHead className="text-left py-3 px-2">ATS Score</TableHead>
            <TableHead className="text-left py-3 px-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow 
              key={app.id} 
              className="border-b border-border/10 hover:bg-background/50 transition-colors"
            >
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(app.id)}
                  onCheckedChange={(checked) => handleRowSelect(app.id, checked as boolean)}
                />
              </TableCell>
              <TableCell className="py-3 px-2 font-medium">{app.company_name}</TableCell>
              <TableCell className="py-3 px-2">{app.position_title}</TableCell>
              <TableCell className="py-3 px-2 text-muted-foreground">
                {new Date(app.date_applied).toLocaleDateString()}
              </TableCell>
              <TableCell className="py-3 px-2">
                <QuickStatusUpdate
                  application={app}
                  onUpdate={onStatusUpdate}
                  isUpdating={isUpdating}
                />
              </TableCell>
              <TableCell className="py-3 px-2 text-muted-foreground">
                {formatStage(app.current_stage)}
              </TableCell>
              <TableCell className="py-3 px-2">
                {app.resume_version ? (
                  <Badge variant="outline">{app.resume_version}</Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="py-3 px-2">
                {app.ats_score ? (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{app.ats_score}%</span>
                    <Progress value={app.ats_score} className="w-16 h-2" />
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="py-3 px-2">
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onEditApplication(app)}
                    disabled={isUpdating}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onDeleteApplication(app.id)}
                    disabled={isUpdating}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
