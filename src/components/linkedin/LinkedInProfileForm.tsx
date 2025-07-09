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
import { Plus, X, Upload } from "lucide-react";
import { linkedInProfileSchema, type LinkedInProfile } from "@/schemas/linkedInSchemas";
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

  const onSubmit = (data: LinkedInProfile) => {
    onUpdate({ ...data, skills });
    toast.success("LinkedIn profile saved!");
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>LinkedIn Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Skills Section */}
            <div className="space-y-4">
              <FormLabel>Skills & Expertise</FormLabel>
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
            </div>

            {/* Profile Assets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormLabel>Profile Assets</FormLabel>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg glass-card">
                    <span className="text-sm">Professional Profile Photo</span>
                    <Badge variant={form.watch("photo") ? "default" : "secondary"}>
                      {form.watch("photo") ? "Added" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg glass-card">
                    <span className="text-sm">Background Banner</span>
                    <Badge variant={form.watch("background") ? "default" : "secondary"}>
                      {form.watch("background") ? "Added" : "Missing"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Save LinkedIn Profile
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};