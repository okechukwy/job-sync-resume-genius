import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Eye, Users, Target } from "lucide-react";
import type { LinkedInProfile } from "@/schemas/linkedInSchemas";

interface LinkedInAnalysisProps {
  profileData: LinkedInProfile | null;
  score: number;
}

export const LinkedInAnalysis = ({ profileData, score }: LinkedInAnalysisProps) => {
  if (!profileData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please fill out your LinkedIn profile information first to see your analysis.
        </AlertDescription>
      </Alert>
    );
  }

  const analysisResults = [
    {
      category: "Profile Completeness",
      score: calculateCompletenessScore(profileData),
      items: [
        { name: "Professional Headline", status: profileData.headline ? "complete" : "missing", weight: 20 },
        { name: "Professional Summary", status: profileData.summary ? "complete" : "missing", weight: 25 },
        { name: "Profile Photo", status: profileData.photo ? "complete" : "missing", weight: 10 },
        { name: "Background Banner", status: profileData.background ? "complete" : "missing", weight: 10 },
        { name: "Contact Information", status: profileData.contactInfo ? "complete" : "missing", weight: 5 },
      ]
    },
    {
      category: "Content Optimization",
      score: calculateContentScore(profileData),
      items: [
        { name: "Keyword Optimization", status: profileData.headline?.length > 50 ? "good" : "needs-work", weight: 20 },
        { name: "Skills Listed", status: profileData.skills?.length >= 5 ? "complete" : "needs-work", weight: 15 },
        { name: "Experience Details", status: profileData.experience?.length > 0 ? "complete" : "missing", weight: 20 },
        { name: "Industry Specified", status: profileData.industry ? "complete" : "missing", weight: 10 },
      ]
    },
    {
      category: "Professional Presence",
      score: calculatePresenceScore(profileData),
      items: [
        { name: "Custom LinkedIn URL", status: profileData.customUrl ? "complete" : "missing", weight: 5 },
        { name: "Location Added", status: profileData.location ? "complete" : "missing", weight: 5 },
        { name: "Education Listed", status: profileData.education?.length > 0 ? "complete" : "missing", weight: 10 },
        { name: "Summary Length", status: profileData.summary && profileData.summary.length > 100 ? "good" : "needs-work", weight: 15 },
      ]
    }
  ];

  const recommendations = generateRecommendations(profileData);

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            LinkedIn Optimization Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Progress value={score} className="flex-1" />
            <div className="text-2xl font-bold">{score}%</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm">Profile Views: {score >= 80 ? "High" : score >= 60 ? "Medium" : "Low"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">Recruiter Interest: {score >= 75 ? "High" : score >= 50 ? "Medium" : "Low"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm">Search Ranking: {score >= 70 ? "Top 10%" : score >= 40 ? "Top 50%" : "Below Average"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {analysisResults.map((category, index) => (
          <Card key={index} className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
              <Progress value={category.score} className="w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-2">
                      {item.status === "complete" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {item.status === "good" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      {item.status === "needs-work" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                      {item.status === "missing" && <XCircle className="h-4 w-4 text-red-500" />}
                      <Badge variant={
                        item.status === "complete" ? "default" : 
                        item.status === "good" ? "secondary" : 
                        item.status === "needs-work" ? "outline" : "destructive"
                      }>
                        {item.status === "complete" ? "✓" : 
                         item.status === "good" ? "Good" : 
                         item.status === "needs-work" ? "Improve" : "Missing"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Improvement Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <Alert key={index}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{rec}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

function calculateCompletenessScore(profile: LinkedInProfile): number {
  let score = 0;
  if (profile.headline) score += 20;
  if (profile.summary) score += 25;
  if (profile.photo) score += 10;
  if (profile.background) score += 10;
  if (profile.contactInfo) score += 5;
  if (profile.location) score += 5;
  if (profile.industry) score += 10;
  if (profile.customUrl) score += 5;
  if (profile.experience?.length > 0) score += 10;
  return Math.min(score, 100);
}

function calculateContentScore(profile: LinkedInProfile): number {
  let score = 0;
  if (profile.headline && profile.headline.length > 50) score += 20;
  if (profile.skills && profile.skills.length >= 5) score += 15;
  if (profile.experience && profile.experience.length > 0) score += 20;
  if (profile.industry) score += 10;
  if (profile.summary && profile.summary.length > 100) score += 20;
  if (profile.education && profile.education.length > 0) score += 15;
  return Math.min(score, 100);
}

function calculatePresenceScore(profile: LinkedInProfile): number {
  let score = 0;
  if (profile.customUrl) score += 20;
  if (profile.location) score += 15;
  if (profile.education && profile.education.length > 0) score += 25;
  if (profile.summary && profile.summary.length > 100) score += 25;
  if (profile.contactInfo) score += 15;
  return Math.min(score, 100);
}

function generateRecommendations(profile: LinkedInProfile): string[] {
  const recommendations = [];

  if (!profile.headline || profile.headline.length < 50) {
    recommendations.push("Create a compelling headline that includes your target role and key skills (aim for 50+ characters).");
  }

  if (!profile.summary || profile.summary.length < 100) {
    recommendations.push("Write a professional summary that tells your story and highlights your value proposition (aim for 200+ words).");
  }

  if (!profile.photo) {
    recommendations.push("Add a professional headshot to increase profile views by up to 14x.");
  }

  if (!profile.skills || profile.skills.length < 5) {
    recommendations.push("Add at least 5-10 relevant skills to improve your searchability by recruiters.");
  }

  if (!profile.experience || profile.experience.length === 0) {
    recommendations.push("Add your work experience with detailed descriptions to showcase your expertise.");
  }

  if (!profile.background) {
    recommendations.push("Add a custom background banner to make your profile more visually appealing.");
  }

  if (!profile.customUrl) {
    recommendations.push("Create a custom LinkedIn URL to make your profile easier to share and more professional.");
  }

  return recommendations;
}