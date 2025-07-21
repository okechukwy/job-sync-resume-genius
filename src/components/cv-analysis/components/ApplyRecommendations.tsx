
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, TrendingUp, Target, Lightbulb, AlertTriangle } from "lucide-react";
import { useApplyRecommendations } from "../hooks/useApplyRecommendations";
import CVDisplay from "./CVDisplay";
import EnhancementLog from "./EnhancementLog";
import DownloadOptions from "./DownloadOptions";
import { EnhancedCVResult } from "@/services/cvEnhancement";

interface ApplyRecommendationsProps {
  uploadedFile: File;
  onContinue: () => void;
  analysisData?: any;
  onOptimizationComplete: (result: EnhancedCVResult) => void;
}

const ApplyRecommendations = ({ 
  uploadedFile, 
  onContinue, 
  analysisData,
  onOptimizationComplete 
}: ApplyRecommendationsProps) => {
  const {
    recommendationsApplied,
    enhancedResult,
    originalContent,
    isProcessing,
    handleApplyRecommendations
  } = useApplyRecommendations(uploadedFile, analysisData, onOptimizationComplete);

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

  const getCategoryLabel = (category: string) => {
    const labels = {
      'keyword-integration': 'ATS Keywords',
      'action-verbs': 'Action Verbs',
      'quantification': 'Metrics Added',
      'professional-language': 'Professional Language'
    };
    return labels[category as keyof typeof labels] || category.replace('-', ' ');
  };

  const getOptimizationSummary = () => {
    if (!enhancedResult) return null;

    const changesCount = enhancedResult.changesApplied.length;
    const estimatedImprovement = enhancedResult.estimatedATSScoreImprovement;
    
    if (changesCount === 0) {
      return {
        type: 'no-changes',
        title: 'Resume Already Optimized',
        description: 'Your resume is already well-optimized for ATS systems and professional standards.'
      };
    }
    
    if (estimatedImprovement >= 10) {
      return {
        type: 'significant',
        title: 'Significant Improvements Applied',
        description: `Applied ${changesCount} optimization${changesCount !== 1 ? 's' : ''} with an estimated ATS score boost of +${estimatedImprovement} points.`
      };
    }
    
    if (estimatedImprovement >= 5) {
      return {
        type: 'moderate',
        title: 'Moderate Improvements Applied',
        description: `Applied ${changesCount} enhancement${changesCount !== 1 ? 's' : ''} to improve your resume's effectiveness.`
      };
    }
    
    return {
      type: 'minor',
      title: 'Minor Improvements Applied',
      description: `Applied ${changesCount} formatting and language improvement${changesCount !== 1 ? 's' : ''}.`
    };
  };

  const optimizationSummary = getOptimizationSummary();

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
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Our advanced AI will analyze your CV and apply intelligent optimizations to improve ATS compatibility and professional impact.
            </p>
            
            {analysisData && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-3">
                  🎯 Optimization Targets:
                </p>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>Industry: <strong>{analysisData.industry || 'Business'}</strong></span>
                  </div>
                  {analysisData.targetRole && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Target Role: <strong>{analysisData.targetRole}</strong></span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Current ATS Score: <strong>{analysisData.atsScore || 'Unknown'}/100</strong></span>
                  </div>
                  {analysisData.keywords?.missingKeywords?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      <span>Missing Keywords: <strong>{analysisData.keywords.missingKeywords.length}</strong> to integrate</span>
                    </div>
                  )}
                  {analysisData.improvements?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Improvement Areas: <strong>{analysisData.improvements.length}</strong> identified</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
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
                {optimizationSummary && (
                  <div className={`p-4 rounded-lg border ${
                    optimizationSummary.type === 'significant' ? 'bg-green-50 border-green-200' :
                    optimizationSummary.type === 'moderate' ? 'bg-blue-50 border-blue-200' :
                    optimizationSummary.type === 'minor' ? 'bg-orange-50 border-orange-200' :
                    'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {optimizationSummary.type === 'no-changes' ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      <h4 className={`font-semibold ${
                        optimizationSummary.type === 'no-changes' ? 'text-yellow-800' : 'text-green-800'
                      }`}>
                        {optimizationSummary.title}
                      </h4>
                    </div>
                    <p className={`text-sm ${
                      optimizationSummary.type === 'no-changes' ? 'text-yellow-700' : 'text-green-700'
                    }`}>
                      {optimizationSummary.description}
                    </p>
                  </div>
                )}
                
                {enhancedResult && enhancedResult.changesApplied.length > 0 && (
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
          </div>
        </CardContent>
      </Card>

      {recommendationsApplied && enhancedResult && enhancedResult.changesApplied.length > 0 && (
        <>
          {/* Changes Applied Section */}
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
                        {getCategoryLabel(change.category)}
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
