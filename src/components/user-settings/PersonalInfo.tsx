import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export const PersonalInfo = () => {
  const { user } = useAuth();
  const [profilePicture, setProfilePicture] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profilePicture} />
            <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <Label htmlFor="profile-picture" className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>Change Picture</span>
              </Button>
            </Label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue={user?.user_metadata?.full_name?.split(' ')[0] || ''} />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue={user?.user_metadata?.full_name?.split(' ')[1] || ''} />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={user?.email || ''} />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="New York" />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="United States" />
          </div>
        </div>
        
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
};