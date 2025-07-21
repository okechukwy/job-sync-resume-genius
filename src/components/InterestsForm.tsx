
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Heart, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { optionalInterestsSchema, OptionalInterestsFormData } from "@/schemas/optionalResumeSchemas";

interface InterestsFormProps {
  data: {
    interests: string[];
  };
  onUpdate: (data: { interests: string[] }) => void;
  onValidationChange: (isValid: boolean) => void;
  industry?: string;
}

const InterestsForm = ({ data, onUpdate, onValidationChange, industry }: InterestsFormProps) => {
  const [interests, setInterests] = useState(data?.interests || []);
  const [interestInput, setInterestInput] = useState("");

  const {
    setValue,
  } = useForm<OptionalInterestsFormData>({
    resolver: zodResolver(optionalInterestsSchema),
    mode: "onChange"
  });

  // Always mark as valid since this is an optional section
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  useEffect(() => {
    setValue("interests", interests);
  }, [interests, setValue]);

  useEffect(() => {
    onUpdate({ interests });
  }, [interests, onUpdate]);

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const getSuggestedInterests = () => {
    const suggestions = {
      tech: [
        "Open Source", "Machine Learning", "Blockchain", "Gaming", "Robotics", 
        "AI Research", "Cybersecurity", "Web Development", "Mobile Apps", "IoT"
      ],
      marketing: [
        "Digital Innovation", "Brand Strategy", "Content Creation", "Social Media", 
        "Analytics", "Consumer Psychology", "Design Thinking", "Growth Hacking"
      ],
      healthcare: [
        "Medical Research", "Digital Health", "Global Health", "Wellness", 
        "Public Health", "Telemedicine", "Healthcare Innovation", "Patient Care"
      ],
      finance: [
        "Financial Markets", "Investment Research", "Economics", "Fintech", 
        "Cryptocurrency", "Risk Management", "Portfolio Analysis", "Trading"
      ],
      creative: [
        "Modern Art", "Photography", "Design Trends", "Typography", "Digital Art", 
        "Motion Graphics", "UI/UX Design", "Brand Identity", "Visual Storytelling"
      ],
      business: [
        "Business Strategy", "Leadership", "Entrepreneurship", "Innovation", 
        "Market Research", "Networking", "Mentoring", "Strategic Planning"
      ]
    };
    
    const general = [
      "Travel", "Reading", "Fitness", "Cooking", "Music", "Sports", "Volunteering",
      "Learning Languages", "Public Speaking", "Mentoring", "Writing", "Podcasts"
    ];
    
    const industrySpecific = suggestions[industry as keyof typeof suggestions] || [];
    return [...industrySpecific, ...general];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Interests & Hobbies</h2>
        <p className="text-muted-foreground">
          Share your personal interests. This section is optional.
        </p>
      </div>

      {/* Add Interest Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Add Interests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="e.g., Photography, Travel, Reading..."
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={addInterest} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Suggested Interests */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                {industry ? `Suggested for ${industry}` : "Popular interests"}:
              </Label>
              <div className="flex flex-wrap gap-2">
                {getSuggestedInterests()
                  .filter(interest => !interests.includes(interest))
                  .slice(0, 12)
                  .map((interest) => (
                  <Button
                    key={interest}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setInterests([...interests, interest])}
                    className="text-xs h-8"
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>

            {/* Current Interests */}
            {interests.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Your interests ({interests.length}):</Label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                      {interest}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeInterest(interest)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">💡 Tips for choosing interests:</p>
              <ul className="text-blue-700 space-y-1 text-xs">
                <li>• Include interests that show your personality and character</li>
                <li>• Choose interests that demonstrate skills relevant to your field</li>
                <li>• Avoid controversial topics unless directly relevant</li>
                <li>• Be genuine - only include interests you actually pursue</li>
                <li>• Limit to 4-8 interests to keep it concise</li>
                <li>• This section is optional - you can skip it if you prefer</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {interests.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No interests added yet. This section is optional - you can skip it or add interests above.</p>
        </div>
      )}
    </div>
  );
};

export default InterestsForm;
