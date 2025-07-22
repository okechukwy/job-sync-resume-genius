
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, User } from "lucide-react";
import { linkedInProfileSchema, type LinkedInProfile } from "@/schemas/linkedInSchemas";
import { ProfileAssetUpload } from "./ProfileAssetUpload";
import { ContactInfoSection } from "./ContactInfoSection";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { toast } from "sonner";

interface LinkedInProfileFormProps {
  onUpdate: (data: LinkedInProfile) => void;
}

export const LinkedInProfileForm = ({ onUpdate }: LinkedInProfileFormProps) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<LinkedInProfile>({
    resolver: zodResolver(linkedInProfileSchema),
    defaultValues: {
      headline: "",
      summary: "",
      location: "",
      industry: "",
      experience: [],
      education: [],
      skills: [],
      photo: false,
      background: false,
      photoUrl: "",
      backgroundUrl: "",
      customUrl: "",
      contactInfo: {
        email: "",
        phone: "",
        website: "",
      },
    },
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      form.setValue("skills", updatedSkills);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    form.setValue("skills", updatedSkills);
  };

  const handlePhotoUpload = (url: string) => {
    form.setValue("photo", true);
    form.setValue("photoUrl", url);
  };

  const handlePhotoRemove = () => {
    form.setValue("photo", false);
    form.setValue("photoUrl", "");
  };

  const handleBackgroundUpload = (url: string) => {
    form.setValue("background", true);
    form.setValue("backgroundUrl", url);
  };

  const handleBackgroundRemove = () => {
    form.setValue("background", false);
    form.setValue("backgroundUrl", "");
  };

  const onSubmit = (data: LinkedInProfile) => {
    onUpdate({ ...data, skills });
    toast.success("LinkedIn profile saved!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            LinkedIn Profile Information
          </CardTitle>
        </CardHeader>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Basic Information Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Headline *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Senior Software Engineer | React Expert | Building Scalable Solutions"
                          {...field} 
                          className="glass-card"
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
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., San Francisco, CA"
                          {...field} 
                          className="glass-card"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass-card">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Contact Information Section */}
          <ContactInfoSection />

          {/* Professional Summary Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Summary</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write a compelling professional summary that highlights your expertise, achievements, and value proposition..."
                        className="min-h-32 glass-card"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Experience Section */}
          <ExperienceSection />

          {/* Education Section */}
          <EducationSection />

          {/* Skills Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="glass-card"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Assets Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Profile Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileAssetUpload
                  type="photo"
                  currentUrl={form.watch("photoUrl")}
                  isUploaded={form.watch("photo")}
                  onUploadSuccess={handlePhotoUpload}
                  onRemove={handlePhotoRemove}
                />
                <ProfileAssetUpload
                  type="background"
                  currentUrl={form.watch("backgroundUrl")}
                  isUploaded={form.watch("background")}
                  onUploadSuccess={handleBackgroundUpload}
                  onRemove={handleBackgroundRemove}
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            Save LinkedIn Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};
