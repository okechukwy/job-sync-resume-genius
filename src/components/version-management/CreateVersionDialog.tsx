
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResumeVersion } from '@/hooks/useResumeVersions';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { FileText, Copy } from 'lucide-react';

interface CreateVersionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  versions: ResumeVersion[];
  onCreateVersion: (sourceId: string, title?: string, description?: string) => Promise<void>;
  isCreating: boolean;
}

export const CreateVersionDialog: React.FC<CreateVersionDialogProps> = ({
  open,
  onOpenChange,
  versions,
  onCreateVersion,
  isCreating
}) => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');

  const activeVersions = versions.filter(v => v.is_active && !v.archived_at);
  const selectedVersion = activeVersions.find(v => v.id === selectedSourceId);

  const handleCreate = async () => {
    if (!selectedSourceId) return;
    
    await onCreateVersion(selectedSourceId, newTitle || undefined, newDescription || undefined);
    
    // Reset form
    setSelectedSourceId('');
    setNewTitle('');
    setNewDescription('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedSourceId('');
    setNewTitle('');
    setNewDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5" />
            Create New Resume Version
          </DialogTitle>
          <DialogDescription>
            Create a new version by duplicating an existing resume. You can modify the title and description for the new version.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {activeVersions.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No Resume Versions Available</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You need at least one active resume version to create a new version.
                </p>
                <Button onClick={handleCancel} variant="outline">
                  Close
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Source Resume Selection */}
              <div className="space-y-2">
                <Label htmlFor="source-resume">Select Source Resume</Label>
                <Select value={selectedSourceId} onValueChange={setSelectedSourceId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a resume to duplicate" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeVersions.map((version) => (
                      <SelectItem key={version.id} value={version.id}>
                        <div className="flex items-center gap-2">
                          <span>{version.title}</span>
                          <Badge variant="outline" className="text-xs">
                            v{version.version_number}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Source Resume Preview */}
              {selectedVersion && (
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Source Resume Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Title:</span>
                      <span className="font-medium">{selectedVersion.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Template:</span>
                      <Badge variant="outline">{selectedVersion.template_id}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Applications:</span>
                      <span className="font-medium">{selectedVersion.metrics?.total_applications || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Success Rate:</span>
                      <span className="font-medium text-primary">
                        {Math.round(selectedVersion.metrics?.offer_rate || 0)}%
                      </span>
                    </div>
                    {selectedVersion.description && (
                      <div className="text-sm">
                        <span className="block mb-1">Description:</span>
                        <p className="text-muted-foreground">{selectedVersion.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* New Version Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-title">New Version Title (Optional)</Label>
                  <Input
                    id="new-title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={selectedVersion ? `${selectedVersion.title} Copy` : 'Enter title for new version'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-description">Description (Optional)</Label>
                  <Textarea
                    id="new-description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder={selectedVersion ? `Copy of ${selectedVersion.title}` : 'Enter description for new version'}
                    rows={3}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleCancel} 
                  variant="outline" 
                  className="flex-1"
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreate}
                  disabled={!selectedSourceId || isCreating}
                  className="flex-1"
                >
                  {isCreating ? (
                    <>
                      <LoadingSpinner />
                      Creating Version...
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Create Version
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
