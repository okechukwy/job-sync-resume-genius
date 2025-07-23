import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

export const JobSearchSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Search Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="jobTypes">Preferred job types</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="fullTime" />
              <Label htmlFor="fullTime">Full-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="partTime" />
              <Label htmlFor="partTime">Part-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="contract" />
              <Label htmlFor="contract">Contract</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="freelance" />
              <Label htmlFor="freelance">Freelance</Label>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minSalary">Minimum salary</Label>
            <Input id="minSalary" type="number" placeholder="50000" />
          </div>
          <div>
            <Label htmlFor="maxSalary">Maximum salary</Label>
            <Input id="maxSalary" type="number" placeholder="150000" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="workLocation">Work location preference</Label>
          <Select>
            <SelectTrigger>
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
          <Label htmlFor="preferredLocations">Preferred locations</Label>
          <Input id="preferredLocations" placeholder="New York, San Francisco, Remote" />
        </div>
        
        <div>
          <Label htmlFor="commutDistance">Maximum commute distance (miles)</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 miles</SelectItem>
              <SelectItem value="25">25 miles</SelectItem>
              <SelectItem value="50">50 miles</SelectItem>
              <SelectItem value="unlimited">No limit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="openToRelocate">Open to relocating</Label>
            <p className="text-sm text-muted-foreground">Consider opportunities that require relocation</p>
          </div>
          <Switch id="openToRelocate" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="activelySearching">Actively searching</Label>
            <p className="text-sm text-muted-foreground">Show recruiters that you're actively looking for opportunities</p>
          </div>
          <Switch id="activelySearching" />
        </div>
        
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
};