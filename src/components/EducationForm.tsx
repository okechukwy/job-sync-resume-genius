import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Trash2, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const EducationForm = ({ data, onUpdate, onValidationChange }: EducationFormProps) => {
  const [educations, setEducations] = useState<Education[]>(
    data.length > 0 ? data : [{
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    }]
  );

  const validateEducations = () => {
    return educations.every(edu => {
      const basicValidation = edu.school.trim() !== '' && 
        edu.degree.trim() !== '' && 
        edu.field.trim() !== '' && 
        edu.startDate.trim() !== '' && 
        edu.endDate.trim() !== '';
      
      // Check date validation if both dates are provided
      if (basicValidation && edu.startDate && edu.endDate) {
        const startDate = new Date(edu.startDate);
        const endDate = new Date(edu.endDate);
        return endDate >= startDate;
      }
      
      return basicValidation;
    });
  };

  useEffect(() => {
    onUpdate(educations);
    onValidationChange?.(validateEducations());
  }, [educations, onUpdate, onValidationChange]);

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    setEducations([...educations, newEducation]);
    toast.success("New education added!");
  };

  const handleRemoveEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
      toast.success("Education removed!");
    }
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleDateChange = (id: string, field: 'startDate' | 'endDate', date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM');
      handleEducationChange(id, field, formattedDate);
    } else {
      handleEducationChange(id, field, '');
    }
  };

  const getDateValidationError = (education: Education) => {
    if (education.startDate && education.endDate) {
      const startDate = new Date(education.startDate);
      const endDate = new Date(education.endDate);
      if (endDate < startDate) {
        return "End date cannot be earlier than start date";
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <p className="text-muted-foreground mb-6">
          Add your educational background, starting with your highest degree or most recent education.
        </p>
      </div>

      {educations.map((education, index) => (
        <Card key={education.id} className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {index === 0 ? "Highest/Most Recent Degree" : `Education ${index + 1}`}
            </CardTitle>
            {educations.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveEducation(education.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`school-${education.id}`}>School/University *</Label>
                <Input
                  id={`school-${education.id}`}
                  value={education.school}
                  onChange={(e) => handleEducationChange(education.id, 'school', e.target.value)}
                  placeholder="Stanford University"
                  className="glass-card"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => handleEducationChange(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                  className="glass-card"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`field-${education.id}`}>Field of Study *</Label>
              <Input
                id={`field-${education.id}`}
                value={education.field}
                onChange={(e) => handleEducationChange(education.id, 'field', e.target.value)}
                placeholder="Computer Science"
                className="glass-card"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal glass-card",
                        !education.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {education.startDate ? format(new Date(education.startDate + '-01'), "MMM yyyy") : "Pick start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      fromYear={1950}
                      toYear={2030}
                      selected={education.startDate ? new Date(education.startDate + '-01') : undefined}
                      onSelect={(date) => handleDateChange(education.id, 'startDate', date)}
                      className="pointer-events-auto"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal glass-card",
                        !education.endDate && "text-muted-foreground",
                        getDateValidationError(education) && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {education.endDate ? format(new Date(education.endDate + '-01'), "MMM yyyy") : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      fromYear={1950}
                      toYear={2030}
                      selected={education.endDate ? new Date(education.endDate + '-01') : undefined}
                      onSelect={(date) => handleDateChange(education.id, 'endDate', date)}
                      className="pointer-events-auto"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {getDateValidationError(education) && (
                  <p className="text-sm font-medium text-destructive">
                    {getDateValidationError(education)}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${education.id}`}
                  value={education.gpa || ''}
                  onChange={(e) => handleEducationChange(education.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                  className="glass-card"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleAddEducation} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Another Education
      </Button>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">💡 Education Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• List education in reverse chronological order (most recent first)</p>
          <p>• Include GPA only if it's 3.5 or higher, or if you're a recent graduate</p>
          <p>• You can include relevant coursework, honors, or academic achievements</p>
          <p>• For professionals with 5+ years experience, education can be brief</p>
          <p>• Include certifications, bootcamps, or relevant online courses</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationForm;