import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, Trash2, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const ExperienceForm = ({ data, onUpdate, onValidationChange }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(
    data.length > 0 ? data : [{
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }]
  );

  const validateExperiences = () => {
    return experiences.every(exp => {
      const basicValidation = exp.company.trim() !== '' && 
        exp.position.trim() !== '' && 
        exp.startDate.trim() !== '' && 
        exp.description.trim() !== '';
      
      // Check date validation if both dates are provided
      if (basicValidation && exp.startDate && exp.endDate && !exp.current) {
        const startDate = new Date(exp.startDate);
        const endDate = new Date(exp.endDate);
        return endDate >= startDate;
      }
      
      return basicValidation;
    });
  };

  useEffect(() => {
    onUpdate(experiences);
    onValidationChange?.(validateExperiences());
  }, [experiences, onUpdate, onValidationChange]);

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setExperiences([...experiences, newExperience]);
    toast.success("New experience added!");
  };

  const handleRemoveExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
      toast.success("Experience removed!");
    }
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperiences(experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleDateChange = (id: string, field: 'startDate' | 'endDate', date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM');
      handleExperienceChange(id, field, formattedDate);
    } else {
      handleExperienceChange(id, field, '');
    }
  };

  const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    // Parse YYYY-MM format to a Date object (first day of the month)
    const [year, month] = dateString.split('-').map(Number);
    if (year && month) {
      return new Date(year, month - 1, 1);
    }
    return undefined;
  };

  const getDateValidationError = (experience: Experience) => {
    if (experience.startDate && experience.endDate && !experience.current) {
      const startDate = new Date(experience.startDate);
      const endDate = new Date(experience.endDate);
      if (endDate < startDate) {
        return "End date cannot be earlier than start date";
      }
    }
    return null;
  };

  const getIndustryTips = () => {
    const tips = {
      Technology: [
        "Focus on technical achievements and measurable outcomes",
        "Include programming languages, frameworks, and tools used",
        "Highlight scalability, performance improvements, and problem-solving",
      ],
      Healthcare: [
        "Emphasize patient care outcomes and safety improvements",
        "Include certifications, specializations, and continuing education",
        "Highlight compliance with healthcare regulations and protocols",
      ],
      Finance: [
        "Focus on quantifiable results (ROI, cost savings, revenue growth)",
        "Highlight analytical skills and attention to detail",
        "Include relevant certifications (CFA, CPA, etc.)",
      ],
      Creative: [
        "Showcase creative projects and campaigns with measurable results",
        "Include client names and brands you've worked with",
        "Highlight awards, recognition, and creative problem-solving",
      ],
      Business: [
        "Focus on leadership achievements and team management",
        "Include metrics like revenue growth, market expansion, efficiency gains",
        "Highlight strategic planning and business development successes",
      ],
      Research: [
        "Emphasize publications, grants, and research methodologies",
        "Include collaboration with institutions and peer-reviewed work",
        "Highlight data analysis skills and research impact",
      ],
    };
    return tips.Business;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
        <p className="text-muted-foreground mb-6">
          Add your work experience starting with your most recent position. Use action verbs and quantify your achievements.
        </p>
      </div>

      {experiences.map((experience, index) => (
        <Card key={experience.id} className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {index === 0 ? "Current/Most Recent Position" : `Previous Position ${index}`}
            </CardTitle>
            {experiences.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveExperience(experience.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${experience.id}`}>Company Name *</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                  placeholder="Google"
                  className="glass-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`position-${experience.id}`}>Job Title *</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => handleExperienceChange(experience.id, 'position', e.target.value)}
                  placeholder="Senior Software Engineer"
                  className="glass-card"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal glass-card",
                        !experience.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {experience.startDate ? (
                        format(parseDate(experience.startDate)!, "MMM yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseDate(experience.startDate)}
                      onSelect={(date) => handleDateChange(experience.id, 'startDate', date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={experience.current}
                      className={cn(
                        "w-full justify-start text-left font-normal glass-card",
                        !experience.endDate && "text-muted-foreground",
                        getDateValidationError(experience) && "border-destructive",
                        experience.current && "opacity-50"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {experience.endDate ? (
                        format(parseDate(experience.endDate)!, "MMM yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseDate(experience.endDate)}
                      onSelect={(date) => handleDateChange(experience.id, 'endDate', date)}
                      disabled={experience.current}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {getDateValidationError(experience) && (
                  <p className="text-sm font-medium text-destructive">
                    {getDateValidationError(experience)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${experience.id}`}
                checked={experience.current}
                onCheckedChange={(checked) => 
                  handleExperienceChange(experience.id, 'current', checked as boolean)
                }
              />
              <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${experience.id}`}>Job Description *</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                placeholder="• Led a team of 5 engineers to develop and launch 3 major features that increased user engagement by 25%
• Architected and implemented microservices infrastructure that improved system performance by 40%
• Collaborated with product managers and designers to deliver high-quality user experiences"
                rows={6}
                className="glass-card"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleAddExperience} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Another Experience
      </Button>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">💡 Professional Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {getIndustryTips().map((tip, index) => (
            <p key={index}>• {tip}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceForm;