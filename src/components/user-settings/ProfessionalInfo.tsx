import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUserSettings } from "@/hooks/useUserSettings";

export const ProfessionalInfo = () => {
  const { professionalInfo, updateProfessionalInfo, loading } = useUserSettings();
  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    industry: "",
    experience_years: "",
    linkedin_url: "",
    professional_summary: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (professionalInfo) {
      setFormData({
        job_title: professionalInfo.job_title || "",
        company: professionalInfo.company || "",
        industry: professionalInfo.industry || "",
        experience_years: professionalInfo.experience_years || "",
        linkedin_url: professionalInfo.linkedin_url || "",
        professional_summary: professionalInfo.professional_summary || "",
      });
    }
  }, [professionalInfo]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProfessionalInfo(formData);
    setSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="jobTitle" className="text-sm font-medium text-foreground">
            Current Job Title
          </Label>
          <Input 
            id="jobTitle"
            value={formData.job_title}
            onChange={(e) => handleInputChange('job_title', e.target.value)}
            className="mt-1"
            placeholder="Enter your current job title"
          />
        </div>

        <div>
          <Label htmlFor="company" className="text-sm font-medium text-foreground">
            Company
          </Label>
          <Input 
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="mt-1"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <Label htmlFor="industry" className="text-sm font-medium text-foreground">
            Industry
          </Label>
          <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="experience" className="text-sm font-medium text-foreground">
            Years of Experience
          </Label>
          <Select value={formData.experience_years} onValueChange={(value) => handleInputChange('experience_years', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="2-5">2-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="11-15">11-15 years</SelectItem>
              <SelectItem value="16+">16+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="linkedin" className="text-sm font-medium text-foreground">
            LinkedIn Profile URL
          </Label>
          <Input 
            id="linkedin"
            type="url"
            value={formData.linkedin_url}
            onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
            className="mt-1"
            placeholder="https://linkedin.com/in/yourname"
          />
        </div>

        <div>
          <Label htmlFor="summary" className="text-sm font-medium text-foreground">
            Professional Summary
          </Label>
          <Textarea 
            id="summary"
            value={formData.professional_summary}
            onChange={(e) => handleInputChange('professional_summary', e.target.value)}
            className="mt-1"
            rows={4}
            placeholder="Brief description of your professional background..."
          />
        </div>

        <Button className="w-full" onClick={handleSave} disabled={loading || saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};