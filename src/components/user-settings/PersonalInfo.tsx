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
    <Card className="glass-card border-white/10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <CardTitle className="typography-heading text-xl">Personal Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-white/10">
          <Avatar className="w-24 h-24 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
            <AvatarImage src={profilePicture} />
            <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary/20 to-accent/20">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label htmlFor="profile-picture" className="cursor-pointer">
              <Button variant="outline" asChild className="bg-gradient-to-r from-primary to-accent text-white border-none hover:shadow-lg hover:scale-105 transition-all duration-300">
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
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF up to 10MB</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground/80">First Name</Label>
            <Input 
              id="firstName" 
              defaultValue={user?.user_metadata?.full_name?.split(' ')[0] || ''} 
              className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground/80">Last Name</Label>
            <Input 
              id="lastName" 
              defaultValue={user?.user_metadata?.full_name?.split(' ')[1] || ''} 
              className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground/80">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            defaultValue={user?.email || ''} 
            className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground/80">Phone Number</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+1 (555) 123-4567" 
            className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-foreground/80">City</Label>
            <Input 
              id="city" 
              placeholder="New York" 
              className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-foreground/80">Country</Label>
            <Input 
              id="country" 
              placeholder="United States" 
              className="glass-card border-white/20 bg-white/5 focus:bg-white/10 transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button className="px-8 py-3 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};