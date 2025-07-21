import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { JobApplication } from '@/hooks/useJobApplications';

const applicationSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  position_title: z.string().min(1, 'Position title is required'),
  job_description: z.string().optional(),
  date_applied: z.string().min(1, 'Application date is required'),
  status: z.enum(['applied', 'under_review', 'interview_scheduled', 'interview_in_progress', 'interview_completed', 'offer_received', 'rejected', 'withdrawn']),
  current_stage: z.enum(['application_submitted', 'hr_screening', 'technical_interview', 'final_interview', 'background_check', 'negotiation', 'completed']),
  resume_version: z.string().optional(),
  ats_score: z.number().min(0).max(100).optional(),
  salary_range_min: z.number().optional(),
  salary_range_max: z.number().optional(),
  job_location: z.string().optional(),
  application_source: z.string().optional(),
  notes: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<JobApplication>) => Promise<void>;
  initialData?: Partial<JobApplication>;
  mode?: 'create' | 'edit';
}

const statusOptions = [
  { value: 'applied', label: 'Applied' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'interview_scheduled', label: 'Interview Scheduled' },
  { value: 'interview_in_progress', label: 'Interview In Progress' },
  { value: 'interview_completed', label: 'Interview Completed' },
  { value: 'offer_received', label: 'Offer Received' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' },
];

const stageOptions = [
  { value: 'application_submitted', label: 'Application Submitted' },
  { value: 'hr_screening', label: 'HR Screening' },
  { value: 'technical_interview', label: 'Technical Interview' },
  { value: 'final_interview', label: 'Final Interview' },
  { value: 'background_check', label: 'Background Check' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'completed', label: 'Completed' },
];

export const ApplicationForm = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  initialData, 
  mode = 'create' 
}: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company_name: initialData?.company_name || '',
      position_title: initialData?.position_title || '',
      job_description: initialData?.job_description || '',
      date_applied: initialData?.date_applied ? new Date(initialData.date_applied).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: (initialData?.status as any) || 'applied',
      current_stage: (initialData?.current_stage as any) || 'application_submitted',
      resume_version: initialData?.resume_version || '',
      ats_score: initialData?.ats_score || undefined,
      salary_range_min: initialData?.salary_range_min || undefined,
      salary_range_max: initialData?.salary_range_max || undefined,
      job_location: initialData?.job_location || '',
      application_source: initialData?.application_source || '',
      notes: initialData?.notes || '',
    },
  });

  const handleSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Application' : 'Edit Application'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter position title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_applied"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Applied *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="current_stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Stage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resume_version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume Version</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tech_v2.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ats_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ATS Score</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        placeholder="0-100"
                        value={field.value || ''}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="job_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="application_source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Source</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., LinkedIn, Indeed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary_range_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Min</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Minimum salary"
                        value={field.value || ''}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary_range_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Max</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Maximum salary"
                        value={field.value || ''}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="job_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Paste job description here..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any notes about this application..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Add Application' : 'Update Application'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
