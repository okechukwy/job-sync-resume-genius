
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";
import { ProfileCompletion } from "@/hooks/useDashboardData";

interface ProfileCompletionCardProps {
  profileCompletion: ProfileCompletion;
}

export const ProfileCompletionCard = ({ profileCompletion }: ProfileCompletionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Profile Completion
        </CardTitle>
        <CardDescription>
          Complete your profile to unlock more personalized features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{profileCompletion.percentage}%</span>
          </div>
          <Progress value={profileCompletion.percentage} className="w-full" />
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Completed Sections</div>
          <div className="flex flex-wrap gap-1">
            {profileCompletion.completedSections.map((section) => (
              <Badge key={section} variant="secondary" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                {section}
              </Badge>
            ))}
          </div>
        </div>

        {profileCompletion.missingSections.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Missing Sections</div>
            <div className="flex flex-wrap gap-1">
              {profileCompletion.missingSections.map((section) => (
                <Badge key={section} variant="outline" className="text-xs">
                  <Circle className="h-3 w-3 mr-1 text-muted-foreground" />
                  {section}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
