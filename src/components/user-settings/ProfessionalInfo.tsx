import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ProfessionalInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="jobTitle">Current Job Title</Label>
          <Input id="jobTitle" placeholder="Senior Software Engineer" />
        </div>
        
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Tech Corp Inc." />
        </div>
        
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="experience">Years of Experience</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="2-5">2-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="11+">11+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
          <Input id="linkedinUrl" placeholder="https://linkedin.com/in/yourprofile" />
        </div>
        
        <div>
          <Label htmlFor="professionalSummary">Professional Summary</Label>
          <Textarea 
            id="professionalSummary" 
            placeholder="Brief description of your professional background..." 
            rows={3} 
          />
        </div>
        
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
};