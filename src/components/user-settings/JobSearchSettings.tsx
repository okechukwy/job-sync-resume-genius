import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUserSettings } from "@/hooks/useUserSettings";

export const JobSearchSettings = () => {
  const { jobPreferences, updateJobPreferences, loading } = useUserSettings();
  const [formData, setFormData] = useState({
    job_types: [] as string[],
    min_salary: "",
    max_salary: "",
    work_location: "any",
    preferred_locations: [] as string[],
    max_commute_distance: "",
    open_to_relocate: false,
    actively_searching: true,
  });
  const [locationInput, setLocationInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (jobPreferences) {
      setFormData({
        job_types: jobPreferences.job_types || [],
        min_salary: jobPreferences.min_salary?.toString() || "",
        max_salary: jobPreferences.max_salary?.toString() || "",
        work_location: jobPreferences.work_location || "any",
        preferred_locations: jobPreferences.preferred_locations || [],
        max_commute_distance: jobPreferences.max_commute_distance?.toString() || "",
        open_to_relocate: jobPreferences.open_to_relocate,
        actively_searching: jobPreferences.actively_searching,
      });
    }
  }, [jobPreferences]);

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      job_types: checked 
        ? [...prev.job_types, jobType]
        : prev.job_types.filter(type => type !== jobType)
    }));
  };

  const handleLocationAdd = () => {
    if (locationInput.trim() && !formData.preferred_locations.includes(locationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        preferred_locations: [...prev.preferred_locations, locationInput.trim()]
      }));
      setLocationInput("");
    }
  };

  const handleLocationRemove = (location: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_locations: prev.preferred_locations.filter(loc => loc !== location)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...formData,
      min_salary: formData.min_salary ? parseInt(formData.min_salary) : undefined,
      max_salary: formData.max_salary ? parseInt(formData.max_salary) : undefined,
      max_commute_distance: formData.max_commute_distance ? parseInt(formData.max_commute_distance) : undefined,
    };
    await updateJobPreferences(data);
    setSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Search Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-foreground">
            Preferred Job Types
          </Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="fulltime" 
                checked={formData.job_types.includes('full-time')}
                onCheckedChange={(checked) => handleJobTypeChange('full-time', !!checked)}
              />
              <Label htmlFor="fulltime" className="text-sm">Full-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="parttime" 
                checked={formData.job_types.includes('part-time')}
                onCheckedChange={(checked) => handleJobTypeChange('part-time', !!checked)}
              />
              <Label htmlFor="parttime" className="text-sm">Part-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="contract" 
                checked={formData.job_types.includes('contract')}
                onCheckedChange={(checked) => handleJobTypeChange('contract', !!checked)}
              />
              <Label htmlFor="contract" className="text-sm">Contract</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="freelance" 
                checked={formData.job_types.includes('freelance')}
                onCheckedChange={(checked) => handleJobTypeChange('freelance', !!checked)}
              />
              <Label htmlFor="freelance" className="text-sm">Freelance</Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minSalary" className="text-sm font-medium text-foreground">
              Minimum Salary
            </Label>
            <Input 
              id="minSalary"
              type="number"
              placeholder="50000"
              value={formData.min_salary}
              onChange={(e) => setFormData(prev => ({ ...prev, min_salary: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="maxSalary" className="text-sm font-medium text-foreground">
              Maximum Salary
            </Label>
            <Input 
              id="maxSalary"
              type="number"
              placeholder="100000"
              value={formData.max_salary}
              onChange={(e) => setFormData(prev => ({ ...prev, max_salary: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="workLocation" className="text-sm font-medium text-foreground">
            Work Location Preference
          </Label>
          <Select value={formData.work_location} onValueChange={(value) => setFormData(prev => ({ ...prev, work_location: value }))}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="any">Any</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="locations" className="text-sm font-medium text-foreground">
            Preferred Locations
          </Label>
          <div className="flex gap-2 mt-1">
            <Input 
              id="locations"
              placeholder="Enter city, state, or country"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLocationAdd()}
            />
            <Button type="button" variant="outline" onClick={handleLocationAdd}>
              Add
            </Button>
          </div>
          {formData.preferred_locations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.preferred_locations.map((location, index) => (
                <div key={index} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-sm">
                  {location}
                  <button 
                    type="button"
                    onClick={() => handleLocationRemove(location)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="commute" className="text-sm font-medium text-foreground">
            Maximum Commute Distance (miles)
          </Label>
          <Input 
            id="commute"
            type="number"
            placeholder="25"
            value={formData.max_commute_distance}
            onChange={(e) => setFormData(prev => ({ ...prev, max_commute_distance: e.target.value }))}
            className="mt-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Open to relocating</Label>
            <p className="text-sm text-muted-foreground">
              Would you consider relocating for the right opportunity?
            </p>
          </div>
          <Switch 
            checked={formData.open_to_relocate}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, open_to_relocate: checked }))}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium text-foreground">Actively searching</Label>
            <p className="text-sm text-muted-foreground">
              Are you currently looking for new opportunities?
            </p>
          </div>
          <Switch 
            checked={formData.actively_searching}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, actively_searching: checked }))}
          />
        </div>

        <Button className="w-full" onClick={handleSave} disabled={loading || saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};