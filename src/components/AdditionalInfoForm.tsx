import { useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdditionalInfo {
  content: string;
}

interface AdditionalInfoFormProps {
  data: AdditionalInfo;
  onUpdate: (data: AdditionalInfo) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const AdditionalInfoForm = ({ data, onUpdate, onValidationChange }: AdditionalInfoFormProps) => {
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>(data);

  const validateAdditionalInfo = useCallback(() => {
    return true; // Optional section - always valid
  }, []);

  useEffect(() => {
    onUpdate(additionalInfo);
  }, [additionalInfo, onUpdate]);

  useEffect(() => {
    onValidationChange?.(validateAdditionalInfo());
  }, [validateAdditionalInfo, onValidationChange]);

  const handleContentChange = (content: string) => {
    setAdditionalInfo({ content });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
        <p className="text-muted-foreground mb-6">
          Add any other relevant information that doesn't fit in other sections. This could include security clearances, visa status, or other relevant details.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Additional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="additional-content">Additional Information</Label>
            <Textarea
              id="additional-content"
              value={additionalInfo.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Add any other relevant information such as security clearances, visa status, availability to travel, willingness to relocate, etc."
              rows={6}
              className="glass-card"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">💡 Additional Info Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Include security clearances if relevant to your field</p>
          <p>• Mention visa status or work authorization if applicable</p>
          <p>• Add availability for travel or relocation if relevant</p>
          <p>• Include professional memberships or affiliations</p>
          <p>• Mention any unique qualifications or circumstances</p>
          <p>• Keep it professional and job-relevant</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalInfoForm;