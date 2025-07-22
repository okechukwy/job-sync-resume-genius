
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Linkedin, Target, TrendingUp, Award, Users, Lightbulb, Search } from "lucide-react";
import { toast } from "sonner";
import { LinkedInProfileForm } from "@/components/linkedin/LinkedInProfileForm";
import { LinkedInAnalysis } from "@/components/linkedin/LinkedInAnalysis";
import { LinkedInHeadlineGenerator } from "@/components/linkedin/LinkedInHeadlineGenerator";
import { LinkedInSummaryOptimizer } from "@/components/linkedin/LinkedInSummaryOptimizer";
import { LinkedInKeywordAnalyzer } from "@/components/linkedin/LinkedInKeywordAnalyzer";
import { LinkedInContentSuggestions } from "@/components/linkedin/LinkedInContentSuggestions";
import { LinkedInUrlScanner } from "@/components/linkedin/LinkedInUrlScanner";
import { type ContentSuggestionsResult } from "@/services/openaiServices";
import { PageLayout } from "@/components/common/PageLayout";

const LinkedInOptimization = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [analysisScore, setAnalysisScore] = useState(0);
  
  // Centralized state for all generated content
  const [generatedSummaries, setGeneratedSummaries] = useState<string[]>([]);
  const [generatedHeadlines, setGeneratedHeadlines] = useState<string[] | null>(null);
  const [keywordAnalysisResults, setKeywordAnalysisResults] = useState(null);
  const [contentSuggestions, setContentSuggestions] = useState<ContentSuggestionsResult | null>(null);
  const [scannedProfiles, setScannedProfiles] = useState([]);

  const handleProfileUpdate = (data: any) => {
    setProfileData(data);
    // Calculate analysis score
    const score = calculateProfileScore(data);
    setAnalysisScore(score);
    toast.success("LinkedIn profile updated successfully!");
  };

  const handleScanComplete = (scannedProfile: any) => {
    setScannedProfiles(prev => [...prev, scannedProfile]);
    toast.success("Profile scanned successfully! View results in the Scanner tab.");
  };

  const calculateProfileScore = (data: any) => {
    let score = 0;
    if (data?.headline) score += 20;
    if (data?.summary) score += 25;
    if (data?.experience?.length > 0) score += 20;
    if (data?.skills?.length > 0) score += 15;
    if (data?.photo) score += 10;
    if (data?.background) score += 10;
    return score;
  };

  return (
    <PageLayout>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Linkedin className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">LinkedIn Optimization</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Optimize your LinkedIn profile to attract recruiters, build your network, and advance your career
          </p>
        </div>

        {/* Score Overview */}
        {profileData && (
          <Card className="mb-8 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                LinkedIn Profile Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Progress value={analysisScore} className="flex-1" />
                <Badge variant={analysisScore >= 80 ? "default" : analysisScore >= 60 ? "secondary" : "destructive"}>
                  {analysisScore}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {analysisScore >= 80 
                  ? "Excellent! Your profile is well-optimized." 
                  : analysisScore >= 60 
                  ? "Good start! A few improvements could boost your visibility." 
                  : "Your profile needs optimization to attract more opportunities."
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-7 glass-card">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="headline" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Headline
              {generatedHeadlines && generatedHeadlines.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                  {generatedHeadlines.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Summary
              {generatedSummaries.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                  {generatedSummaries.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Keywords
              {keywordAnalysisResults && (
                <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">✓</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              Content
              {contentSuggestions && (
                <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">✓</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="scanner" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              URL Scanner
              {scannedProfiles.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                  {scannedProfiles.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <LinkedInProfileForm onUpdate={handleProfileUpdate} />
          </TabsContent>

          <TabsContent value="analysis">
            <LinkedInAnalysis profileData={profileData} score={analysisScore} />
          </TabsContent>

          <TabsContent value="headline">
            <LinkedInHeadlineGenerator 
              profileData={profileData} 
              generatedHeadlines={generatedHeadlines}
              onHeadlinesUpdate={setGeneratedHeadlines}
            />
          </TabsContent>

          <TabsContent value="summary">
            <LinkedInSummaryOptimizer 
              profileData={profileData} 
              generatedSummaries={generatedSummaries}
              onSummariesUpdate={setGeneratedSummaries}
            />
          </TabsContent>

          <TabsContent value="keywords">
            <LinkedInKeywordAnalyzer 
              profileData={profileData} 
              keywordAnalysisResults={keywordAnalysisResults}
              onKeywordResultsUpdate={setKeywordAnalysisResults}
            />
          </TabsContent>

          <TabsContent value="content">
            <LinkedInContentSuggestions 
              profileData={profileData} 
              contentSuggestions={contentSuggestions}
              onContentSuggestionsUpdate={setContentSuggestions}
            />
          </TabsContent>

          <TabsContent value="scanner">
            <LinkedInUrlScanner onScanComplete={handleScanComplete} />
          </TabsContent>
        </Tabs>
    </PageLayout>
  );
};

export default LinkedInOptimization;
