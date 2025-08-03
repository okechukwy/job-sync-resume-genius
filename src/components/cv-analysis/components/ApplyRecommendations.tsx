import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Zap, TrendingUp, Target, Lightbulb, AlertTriangle, Settings, Sparkles } from "lucide-react";
import { useApplyRecommendations } from "../hooks/useApplyRecommendations";
import CVDisplay from "./CVDisplay";
import EnhancementLog from "./EnhancementLog";
import DownloadOptions from "./DownloadOptions";
import SmartRecommendationEngine from "./SmartRecommendationEngine";
import ATSOptimizedTemplates from "./ATSOptimizedTemplates";
import { EnhancedCVResult } from "@/services/cvEnhancement";
import { OptimizationCompleteness } from "../utils/optimizationUtils";

interface ApplyRecommendationsProps {
  uploadedFile: File;
  onContinue: () => void;
  analysisData?: any;
  optimizationCompleteness?: OptimizationCompleteness | null;
  onOptimizationComplete: (result: EnhancedCVResult) => void;
}

const ApplyRecommendations = ({ 
  uploadedFile, 
  onContinue, 
  analysisData,
  optimizationCompleteness,
  onOptimizationComplete 
}: ApplyRecommendationsProps) => {
  const [optimizationMode, setOptimizationMode] = useState<'legacy' | 'smart'>('smart');
  const [smartOptimizationComplete, setSmartOptimizationComplete] = useState(false);
  
  const {
    recommendationsApplied,
    enhancedResult,
    originalContent,
    isProcessing,
    handleApplyRecommendations
  } = useApplyRecommendations(uploadedFile, analysisData, onOptimizationComplete);

  const handleSmartOptimizationComplete = (result: EnhancedCVResult) => {
    setSmartOptimizationComplete(true);
    onOptimizationComplete(result);
  };

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
    
    // Check if all improvements are truly completed before showing "already optimized"
    const isFullyOptimized = optimizationCompleteness?.isFullyOptimized || false;
    const hasImprovements = optimizationCompleteness?.totalImprovements > 0;
    
    // Only show "Resume Already Optimized" if ALL suggestions are completed
    if (changesCount === 0 && isFullyOptimized && hasImprovements) {
      return {
        type: 'no-changes',
        title: 'Resume Already Optimized',
        description: 'Your resume is already well-optimized for ATS systems and professional standards.'
      };
    }
    
    // If no changes were made but improvements still exist, show different message
    if (changesCount === 0 && !isFullyOptimized && hasImprovements) {
      const remainingCount = optimizationCompleteness?.totalImprovements - optimizationCompleteness?.completedCount || 0;
      return {
        type: 'minimal-changes',
        title: 'Basic Optimization Applied',
        description: `Your resume content is solid, but ${remainingCount} suggestion${remainingCount !== 1 ? 's' : ''} in the Action Plan still need${remainingCount === 1 ? 's' : ''} attention for full optimization.`
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
      {/* Optimization Mode Selector */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              ATS Optimization Engine
            </div>
            <div className="flex gap-2">
              <Button
                variant={optimizationMode === 'smart' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOptimizationMode('smart')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Smart Engine
              </Button>
              <Button
                variant={optimizationMode === 'legacy' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOptimizationMode('legacy')}
              >
                <Zap className="w-4 h-4 mr-2" />
                One-Click
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${optimizationMode === 'smart' ? 'border-primary bg-primary/5' : 'border-border'}`}>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Smart Optimization Engine
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Select specific recommendations to apply</li>
                <li>• Preview changes before applying</li>
                <li>• Category-based optimization control</li>
                <li>• Conflict detection and resolution</li>
                <li>• Industry-specific templates</li>
              </ul>
            </div>
            <div className={`p-4 rounded-lg border ${optimizationMode === 'legacy' ? 'border-primary bg-primary/5' : 'border-border'}`}>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                One-Click Optimization
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automatic application of all improvements</li>
                <li>• AI-powered content enhancement</li>
                <li>• Quick and simple optimization</li>
                <li>• Best for basic optimization needs</li>
                <li>• Standard export options</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Optimization Mode */}
      {optimizationMode === 'smart' && !smartOptimizationComplete && (
        <SmartRecommendationEngine
          originalContent={originalContent}
          analysisData={analysisData}
          isHtml={enhancedResult?.isHtmlContent || false}
          onOptimizationComplete={handleSmartOptimizationComplete}
        />
      )}

      {/* Legacy One-Click Mode */}
      {optimizationMode === 'legacy' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              One-Click AI Optimization
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
                    optimizationSummary.type === 'minimal-changes' ? 'bg-blue-50 border-blue-200' :
                    'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {optimizationSummary.type === 'no-changes' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : optimizationSummary.type === 'minimal-changes' ? (
                        <AlertTriangle className="w-5 h-5 text-blue-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      <h4 className={`font-semibold ${
                        optimizationSummary.type === 'no-changes' ? 'text-green-800' :
                        optimizationSummary.type === 'minimal-changes' ? 'text-blue-800' :
                        'text-green-800'
                      }`}>
                        {optimizationSummary.title}
                      </h4>
                    </div>
                    <p className={`text-sm ${
                      optimizationSummary.type === 'no-changes' ? 'text-green-700' :
                      optimizationSummary.type === 'minimal-changes' ? 'text-blue-700' :
                      'text-green-700'
                    }`}>
                      {optimizationSummary.description}
                    </p>
                    
                    {/* Show progress indicator when not fully optimized */}
                    {optimizationSummary.type === 'minimal-changes' && optimizationCompleteness && (
                      <div className="mt-3 text-xs text-blue-600">
                        <div className="flex items-center gap-2">
                          <span>Overall Progress: {optimizationCompleteness.completionPercentage}% ({optimizationCompleteness.completedCount}/{optimizationCompleteness.totalImprovements})</span>
                        </div>
                      </div>
                    )}
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
      )}

      {/* Results Display - Show for both modes */}
      {((optimizationMode === 'legacy' && recommendationsApplied && enhancedResult) || 
        (optimizationMode === 'smart' && smartOptimizationComplete && enhancedResult)) && (
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="changes">Changes ({enhancedResult.changesApplied.length})</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="templates">ATS Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <CVDisplay enhancedResult={enhancedResult} />
          </TabsContent>

          <TabsContent value="changes" className="space-y-4">
            {enhancedResult.changesApplied.length > 0 ? (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Applied Optimizations ({enhancedResult.changesApplied.length})
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
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Changes Applied</h3>
                  <p className="text-muted-foreground">
                    Your resume appears to be already well-optimized, or no recommendations were selected.
                  </p>
                </CardContent>
              </Card>
            )}
            <EnhancementLog enhancedResult={enhancedResult} />
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <DownloadOptions 
              enhancedResult={enhancedResult}
              originalContent={originalContent}
              uploadedFile={uploadedFile}
            />
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <ATSOptimizedTemplates
              enhancedResult={enhancedResult}
              originalContent={originalContent}
              uploadedFile={uploadedFile}
              targetIndustry={analysisData?.industry || 'Business'}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ApplyRecommendations;
