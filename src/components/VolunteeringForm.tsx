import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface VolunteeringEntry {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface VolunteeringFormProps {
  data: VolunteeringEntry[];
  onUpdate: (data: VolunteeringEntry[]) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const VolunteeringForm = ({ data, onUpdate, onValidationChange }: VolunteeringFormProps) => {
  const [volunteering, setVolunteering] = useState<VolunteeringEntry[]>(data);

  const validateVolunteering = useCallback(() => {
    return true; // Optional section - always valid
  }, []);

  useEffect(() => {
    onUpdate(volunteering);
  }, [volunteering, onUpdate]);

  useEffect(() => {
    onValidationChange?.(validateVolunteering());
  }, [validateVolunteering, onValidationChange]);

  const addVolunteering = () => {
    const newEntry: VolunteeringEntry = {
      id: Date.now().toString(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setVolunteering([...volunteering, newEntry]);
    toast.success("Volunteering entry added!");
  };

  const removeVolunteering = (id: string) => {
    setVolunteering(volunteering.filter(entry => entry.id !== id));
    toast.success("Volunteering entry removed!");
  };

  const updateVolunteering = (id: string, field: keyof VolunteeringEntry, value: any) => {
    setVolunteering(volunteering.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Volunteering</h2>
        <p className="text-muted-foreground mb-6">
          Add your volunteer work and community involvement. This section is optional but shows your character and values.
        </p>
      </div>

      {volunteering.map((entry, index) => (
        <Card key={entry.id} className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Volunteer Experience #{index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeVolunteering(entry.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`organization-${entry.id}`}>Organization *</Label>
                <Input
                  id={`organization-${entry.id}`}
                  value={entry.organization}
                  onChange={(e) => updateVolunteering(entry.id, 'organization', e.target.value)}
                  placeholder="Red Cross"
                  className="glass-card"
                />
              </div>
              <div>
                <Label htmlFor={`role-${entry.id}`}>Role *</Label>
                <Input
                  id={`role-${entry.id}`}
                  value={entry.role}
                  onChange={(e) => updateVolunteering(entry.id, 'role', e.target.value)}
                  placeholder="Event Coordinator"
                  className="glass-card"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`startDate-${entry.id}`}>Start Date *</Label>
                <Input
                  id={`startDate-${entry.id}`}
                  type="date"
                  value={entry.startDate}
                  onChange={(e) => updateVolunteering(entry.id, 'startDate', e.target.value)}
                  className="glass-card"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${entry.id}`}>End Date</Label>
                <Input
                  id={`endDate-${entry.id}`}
                  type="date"
                  value={entry.endDate || ''}
                  onChange={(e) => updateVolunteering(entry.id, 'endDate', e.target.value)}
                  disabled={entry.current}
                  className="glass-card"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${entry.id}`}
                checked={entry.current}
                onCheckedChange={(checked) => {
                  updateVolunteering(entry.id, 'current', checked);
                  if (checked) {
                    updateVolunteering(entry.id, 'endDate', '');
                  }
                }}
              />
              <Label htmlFor={`current-${entry.id}`}>I currently volunteer here</Label>
            </div>

            <div>
              <Label htmlFor={`description-${entry.id}`}>Description *</Label>
              <Textarea
                id={`description-${entry.id}`}
                value={entry.description}
                onChange={(e) => updateVolunteering(entry.id, 'description', e.target.value)}
                placeholder="Describe your volunteer activities and achievements..."
                rows={3}
                className="glass-card"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addVolunteering} variant="outline" className="w-full glass-card">
        <Plus className="w-4 h-4 mr-2" />
        Add Volunteer Experience
      </Button>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">💡 Volunteering Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Include relevant volunteer work that shows leadership or skills</p>
          <p>• Quantify your impact when possible (e.g., "helped 200+ families")</p>
          <p>• Focus on roles that demonstrate responsibility and commitment</p>
          <p>• Show progression in volunteer roles if applicable</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteeringForm;