import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { personalInfoSchema, PersonalInfoFormData } from "@/schemas/resumeFormSchemas";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
  onValidationChange: (isValid: boolean) => void;
}

const PersonalInfoForm = ({ data, onUpdate, onValidationChange }: PersonalInfoFormProps) => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone || '',
      location: data.location || '',
      website: data.website || '',
      linkedin: data.linkedin || '',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const formData = value as PersonalInfo;
      onUpdate(formData);
      onValidationChange(form.formState.isValid);
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate, onValidationChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className="text-muted-foreground mb-6">
          Let's start with your basic contact information. This will appear at the top of your resume.
        </p>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="glass-card"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="glass-card"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    className="glass-card"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New York, NY"
                    className="glass-card"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://johndoe.com"
                    className="glass-card"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/johndoe"
                    className="glass-card"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use a professional email address (avoid nicknames or numbers)</p>
          <p>• Include your city and state, but you can omit your full address</p>
          <p>• Make sure your LinkedIn profile is up-to-date before including it</p>
          <p>• Only include a personal website if it's professional and relevant</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoForm;