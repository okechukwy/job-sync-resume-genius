import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface AwardEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

interface AwardsFormProps {
  data: AwardEntry[];
  onUpdate: (data: AwardEntry[]) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const AwardsForm = ({ data, onUpdate, onValidationChange }: AwardsFormProps) => {
  const [awards, setAwards] = useState<AwardEntry[]>(data);

  const validateAwards = useCallback(() => {
    return true; // Optional section - always valid
  }, []);

  useEffect(() => {
    onUpdate(awards);
  }, [awards, onUpdate]);

  useEffect(() => {
    onValidationChange?.(validateAwards());
  }, [validateAwards, onValidationChange]);

  const addAward = () => {
    const newAward: AwardEntry = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
      description: '',
    };
    setAwards([...awards, newAward]);
    toast.success("Award added!");
  };

  const removeAward = (id: string) => {
    setAwards(awards.filter(award => award.id !== id));
    toast.success("Award removed!");
  };

  const updateAward = (id: string, field: keyof AwardEntry, value: string) => {
    setAwards(awards.map(award => 
      award.id === id ? { ...award, [field]: value } : award
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Awards & Honors</h2>
        <p className="text-muted-foreground mb-6">
          Showcase your achievements, awards, and recognition. This section is optional but helps highlight your excellence.
        </p>
      </div>

      {awards.map((award, index) => (
        <Card key={award.id} className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Award #{index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAward(award.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`title-${award.id}`}>Award Title *</Label>
              <Input
                id={`title-${award.id}`}
                value={award.title}
                onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                placeholder="Employee of the Year"
                className="glass-card"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`issuer-${award.id}`}>Issuing Organization *</Label>
                <Input
                  id={`issuer-${award.id}`}
                  value={award.issuer}
                  onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                  placeholder="XYZ Corporation"
                  className="glass-card"
                />
              </div>
              <div>
                <Label htmlFor={`date-${award.id}`}>Date Received *</Label>
                <Input
                  id={`date-${award.id}`}
                  type="date"
                  value={award.date}
                  onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                  className="glass-card"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${award.id}`}>Description (Optional)</Label>
              <Textarea
                id={`description-${award.id}`}
                value={award.description || ''}
                onChange={(e) => updateAward(award.id, 'description', e.target.value)}
                placeholder="Brief description of the award and why you received it..."
                rows={2}
                className="glass-card"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addAward} variant="outline" className="w-full glass-card">
        <Plus className="w-4 h-4 mr-2" />
        Add Award or Honor
      </Button>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">🏆 Awards Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Include professional awards, academic honors, and notable recognition</p>
          <p>• List awards in reverse chronological order (most recent first)</p>
          <p>• Include both formal awards and informal recognition</p>
          <p>• Mention the scope of competition (company-wide, regional, national, etc.)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AwardsForm;