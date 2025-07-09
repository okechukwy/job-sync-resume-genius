import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { personalInfoSchema, PersonalInfoFormData } from "@/schemas/resumeFormSchemas";
import { Upload, User, X } from "lucide-react";
import { toast } from "sonner";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  profilePicture?: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
  onValidationChange: (isValid: boolean) => void;
}

const PersonalInfoForm = ({ data, onUpdate, onValidationChange }: PersonalInfoFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicture, setProfilePicture] = useState(data.profilePicture || '');
  
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    // Convert to base64 for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setProfilePicture(base64String);
    };
    reader.readAsDataURL(file);
  };

  const removeProfilePicture = () => {
    setProfilePicture('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      const formData = { ...value, profilePicture } as PersonalInfo;
      onUpdate(formData);
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate, profilePicture]);

  useEffect(() => {
    onValidationChange(form.formState.isValid);
  }, [form.formState.isValid, onValidationChange]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className="text-muted-foreground mb-6">
          Let's start with your basic contact information. This will appear at the top of your resume.
        </p>
      </div>

      <Form {...form}>
        {/* Profile Picture Upload */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-lg overflow-hidden">
              {profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            
            {/* Upload/Remove buttons */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                className="shadow-lg"
              >
                <Upload className="w-3 h-3 mr-1" />
                {profilePicture ? 'Change' : 'Add'}
              </Button>
              {profilePicture && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={removeProfilePicture}
                  className="shadow-lg"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

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
          <p>• Upload a professional headshot for a more personal touch</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoForm;