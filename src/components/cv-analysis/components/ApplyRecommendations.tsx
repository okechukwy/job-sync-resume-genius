
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, TrendingUp, Target, Lightbulb } from "lucide-react";
import { useApplyRecommendations } from "../hooks/useApplyRecommendations";
import CVDisplay from "./CVDisplay";
import EnhancementLog from "./EnhancementLog";
import DownloadOptions from "./DownloadOptions";

interface ApplyRecommendationsProps {
  uploadedFile: File;
  onContinue: () => void;
  analysisData?: any;
}

const ApplyRecommendations = ({ uploadedFile, onContinue, analysisData }: ApplyRecommendationsProps) => {
  const {
    recommendationsApplied,
    enhancedResult,
    originalContent,
    isProcessing,
    handleApplyRecommendations
  } = useApplyRecommendations(uploadedFile, analysisData);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'keyword-integration':
        return <Target className="w-4 h-4 text-green-500" />;
      case 'action-verbs':
        return <Lightbulb className="w-4 h-4 text-purple-500" />;
      case 'quantification':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'professional-language':
        return <CheckCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Zap className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      'keyword-integration': 'bg-green-50 text-green-700 border-green-200',
      'action-verbs': 'bg-purple-50 text-purple-700 border-purple-200',
      'quantification': 'bg-blue-50 text-blue-700 border-blue-200',
      'professional-language': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            AI-Powered CV Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Let our advanced AI analyze your CV and apply intelligent optimizations for better ATS performance and professional impact.
          </p>
          {!recommendationsApplied ? (
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={handleApplyRecommendations}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Applying AI Optimization...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Apply AI-Powered Optimization
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <Badge variant="secondary" className="w-full justify-center py-2">
                ✅ AI Optimization Applied Successfully
              </Badge>
              
              {enhancedResult && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {enhancedResult.atsImprovements.keywordsAdded.length}
                    </div>
                    <div className="text-green-700">Keywords Added</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {enhancedResult.atsImprovements.actionVerbsImproved}
                    </div>
                    <div className="text-blue-700">Action Verbs Enhanced</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {enhancedResult.atsImprovements.professionalLanguageEnhanced}
                    </div>
                    <div className="text-purple-700">Language Improved</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      +{enhancedResult.estimatedATSScoreImprovement}
                    </div>
                    <div className="text-orange-700">ATS Score Boost</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {recommendationsApplied && enhancedResult && (
        <>
          {/* Changes Applied Section */}
          {enhancedResult.changesApplied.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  AI Improvements Applied ({enhancedResult.changesApplied.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {enhancedResult.changesApplied.map((change, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(change.category)}
                        <Badge className={getCategoryBadge(change.category)}>
                          {change.category.replace('-', ' ')}
                        </Badge>
                        <span className="text-sm font-medium">{change.section}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Original:</p>
                          <p className="text-sm bg-red-50 p-2 rounded border text-red-800">
                            {change.original}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Improved:</p>
                          <p className="text-sm bg-green-50 p-2 rounded border text-green-800">
                            {change.improved}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-2 rounded border border-blue-200">
                        <p className="text-xs text-blue-800">
                          <strong>Why this helps:</strong> {change.reasoning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <CVDisplay enhancedResult={enhancedResult} />
          <EnhancementLog enhancedResult={enhancedResult} />
          <DownloadOptions 
            enhancedResult={enhancedResult}
            originalContent={originalContent}
            uploadedFile={uploadedFile}
          />
        </>
      )}
    </div>
  );
};

export default ApplyRecommendations;
