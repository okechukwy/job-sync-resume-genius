import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, Target, TrendingUp, CheckCircle, AlertTriangle, 
  Settings, Play, Eye, Download, Lightbulb, Award,
  BarChart3, Filter, RefreshCw
} from "lucide-react";
import { ATSRecommendationProcessor, ATSRecommendation, SmartApplicationOptions } from "@/services/atsRecommendationProcessor";
import { EnhancedCVResult } from "@/services/cvEnhancement";
import { toast } from "sonner";

interface SmartRecommendationEngineProps {
  originalContent: string;
  analysisData: any;
  isHtml?: boolean;
  onOptimizationComplete: (result: EnhancedCVResult) => void;
}

const SmartRecommendationEngine = ({
  originalContent,
  analysisData,
  isHtml = false,
  onOptimizationComplete
}: SmartRecommendationEngineProps) => {
  const [processor] = useState(() => new ATSRecommendationProcessor(originalContent, isHtml));
  const [recommendations, setRecommendations] = useState<ATSRecommendation[]>([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());
  const [applicationOptions, setApplicationOptions] = useState<SmartApplicationOptions>({
    autoApplyLowRisk: true,
    priorityThreshold: 'medium',
    selectedCategories: [],
    maxChangesPerSection: 5
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [appliedRecommendations, setAppliedRecommendations] = useState<ATSRecommendation[]>([]);

  useEffect(() => {
    const recs = processor.generateRecommendations(analysisData);
    setRecommendations(recs);
    // Auto-select high-priority recommendations
    const autoSelected = new Set(
      recs.filter(r => r.priority === 'high').map(r => r.id)
    );
    setSelectedRecommendations(autoSelected);
  }, [processor, analysisData]);

  const categories = Array.from(new Set(recommendations.map(r => r.category)));
  const sections = Array.from(new Set(recommendations.map(r => r.section)));

  const getRecommendationsByCategory = (category: string) => 
    recommendations.filter(r => r.category === category);

  const getRecommendationsBySection = (section: string) => 
    recommendations.filter(r => r.section === section);

  const getCategoryStats = () => {
    return categories.map(category => ({
      category,
      total: getRecommendationsByCategory(category).length,
      selected: getRecommendationsByCategory(category).filter(r => 
        selectedRecommendations.has(r.id)
      ).length,
      priority: getRecommendationsByCategory(category).reduce((acc, r) => ({
        high: acc.high + (r.priority === 'high' ? 1 : 0),
        medium: acc.medium + (r.priority === 'medium' ? 1 : 0),
        low: acc.low + (r.priority === 'low' ? 1 : 0)
      }), { high: 0, medium: 0, low: 0 })
    }));
  };

  const handleSelectAll = (category?: string) => {
    const targetRecs = category ? 
      getRecommendationsByCategory(category) : 
      recommendations;
    
    const newSelected = new Set(selectedRecommendations);
    targetRecs.forEach(r => newSelected.add(r.id));
    setSelectedRecommendations(newSelected);
  };

  const handleDeselectAll = (category?: string) => {
    const targetRecs = category ? 
      getRecommendationsByCategory(category) : 
      recommendations;
    
    const newSelected = new Set(selectedRecommendations);
    targetRecs.forEach(r => newSelected.delete(r.id));
    setSelectedRecommendations(newSelected);
  };

  const handleRecommendationToggle = (recId: string) => {
    const newSelected = new Set(selectedRecommendations);
    if (newSelected.has(recId)) {
      newSelected.delete(recId);
    } else {
      newSelected.add(recId);
    }
    setSelectedRecommendations(newSelected);
  };

  const handleSmartApply = async () => {
    setIsProcessing(true);
    
    try {
      const selectedRecs = recommendations.filter(r => selectedRecommendations.has(r.id));
      const result = processor.smartApplyRecommendations(selectedRecs, applicationOptions);
      
      if (result.conflicts.length > 0) {
        toast.warning(`${result.conflicts.length} recommendations had conflicts and were skipped`);
      }

      const optimizedContent = processor.getOptimizedContent();
      const changesApplied = processor.generateChangesSummary(result.applied);
      
      const enhancedResult: EnhancedCVResult = {
        resumeContent: optimizedContent,
        enhancementLog: [
          `Applied ${result.applied.length} AI-powered optimizations`,
          `Skipped ${result.skipped.length} recommendations due to settings`,
          `Detected ${result.conflicts.length} conflicts`,
          'Smart optimization complete with advanced conflict resolution'
        ],
        isHtmlContent: isHtml,
        changesApplied,
        atsImprovements: {
          keywordsAdded: result.applied.filter(r => r.type === 'keyword').map(r => 
            r.suggested.match(/\b\w+(?:\s+\w+)*\b/g)?.[0] || ''
          ).filter(Boolean),
          actionVerbsImproved: result.applied.filter(r => r.type === 'action-verb').length,
          professionalLanguageEnhanced: result.applied.filter(r => r.type === 'professional-language').length,
          metricsAdded: result.applied.filter(r => r.type === 'quantification').length
        },
        estimatedATSScoreImprovement: Math.min(result.applied.reduce((sum, r) => sum + r.impact, 0), 25)
      };

      setAppliedRecommendations(result.applied);
      onOptimizationComplete(enhancedResult);
      
      toast.success(`Successfully applied ${result.applied.length} optimizations!`);
    } catch (error) {
      console.error('Smart application failed:', error);
      toast.error('Failed to apply recommendations. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'keyword-integration': <Target className="w-4 h-4 text-green-500" />,
      'action-verbs': <Lightbulb className="w-4 h-4 text-purple-500" />,
      'quantification': <TrendingUp className="w-4 h-4 text-blue-500" />,
      'professional-language': <Award className="w-4 h-4 text-orange-500" />,
      'formatting': <Settings className="w-4 h-4 text-gray-500" />
    };
    return icons[category as keyof typeof icons] || <CheckCircle className="w-4 h-4" />;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600 bg-red-50 border-red-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      low: 'text-blue-600 bg-blue-50 border-blue-200'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Smart ATS Optimization Engine
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm">
                {selectedRecommendations.size}/{recommendations.length} Selected
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {categories.length} Categories
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {getCategoryStats().map(stat => (
              <div key={stat.category} className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {getCategoryIcon(stat.category)}
                </div>
                <div className="text-lg font-semibold">{stat.selected}/{stat.total}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {stat.category.replace('-', ' ')}
                </div>
                <div className="text-xs mt-1">
                  <span className="text-red-600">{stat.priority.high}H</span>
                  {" "}
                  <span className="text-yellow-600">{stat.priority.medium}M</span>
                  {" "}
                  <span className="text-blue-600">{stat.priority.low}L</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectAll()}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeselectAll()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectAll('keyword-integration')}
            >
              <Target className="w-4 h-4 mr-2" />
              All Keywords
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectAll('quantification')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              All Metrics
            </Button>
          </div>

          {/* Application Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority Threshold</label>
              <Select
                value={applicationOptions.priorityThreshold}
                onValueChange={(value: any) => 
                  setApplicationOptions(prev => ({ ...prev, priorityThreshold: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority Only</SelectItem>
                  <SelectItem value="medium">Medium & High</SelectItem>
                  <SelectItem value="low">All Priorities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Max Changes per Section</label>
              <Select
                value={applicationOptions.maxChangesPerSection?.toString()}
                onValueChange={(value) => 
                  setApplicationOptions(prev => ({ ...prev, maxChangesPerSection: parseInt(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Changes</SelectItem>
                  <SelectItem value="5">5 Changes</SelectItem>
                  <SelectItem value="10">10 Changes</SelectItem>
                  <SelectItem value="999">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-apply"
                  checked={applicationOptions.autoApplyLowRisk}
                  onCheckedChange={(checked) =>
                    setApplicationOptions(prev => ({ ...prev, autoApplyLowRisk: checked as boolean }))
                  }
                />
                <label htmlFor="auto-apply" className="text-sm font-medium">
                  Auto-apply low-risk changes
                </label>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <Button
            variant="gradient"
            size="lg"
            className="w-full mt-4"
            onClick={handleSmartApply}
            disabled={isProcessing || selectedRecommendations.size === 0}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Applying Smart Optimizations...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Apply {selectedRecommendations.size} Smart Optimizations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations Tabs */}
      <Tabs defaultValue="category" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="section">By Section</TabsTrigger>
          <TabsTrigger value="priority">By Priority</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="space-y-4">
          {categories.map(category => (
            <Card key={category} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <CardTitle className="capitalize text-lg">
                      {category.replace('-', ' ')}
                    </CardTitle>
                    <Badge variant="outline">
                      {getRecommendationsByCategory(category).length}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSelectAll(category)}
                    >
                      Select All
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeselectAll(category)}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getRecommendationsByCategory(category).map(rec => (
                    <div key={rec.id} className="border rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedRecommendations.has(rec.id)}
                          onCheckedChange={() => handleRecommendationToggle(rec.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {rec.section}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(rec.priority)}`}
                            >
                              {rec.priority}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <BarChart3 className="w-3 h-3" />
                              Impact: {rec.impact}/10
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">
                                Original:
                              </div>
                              <div className="p-2 bg-red-50 border border-red-200 rounded text-red-800">
                                {rec.original}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">
                                Suggested:
                              </div>
                              <div className="p-2 bg-green-50 border border-green-200 rounded text-green-800">
                                {rec.suggested}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded border border-blue-200">
                            <strong>Why:</strong> {rec.reasoning}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="section" className="space-y-4">
          {sections.map(section => (
            <Card key={section} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{section}</CardTitle>
                  <Badge variant="outline">
                    {getRecommendationsBySection(section).length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getRecommendationsBySection(section).map(rec => (
                    <div key={rec.id} className="border rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedRecommendations.has(rec.id)}
                          onCheckedChange={() => handleRecommendationToggle(rec.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(rec.category)}
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(rec.priority)}`}
                            >
                              {rec.priority}
                            </Badge>
                            <span className="text-xs capitalize text-muted-foreground">
                              {rec.category.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {rec.reasoning}
                          </div>
                          <div className="text-xs">
                            <span className="text-red-600">{rec.original}</span>
                            {" → "}
                            <span className="text-green-600">{rec.suggested}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="priority" className="space-y-4">
          {['high', 'medium', 'low'].map(priority => {
            const priorityRecs = recommendations.filter(r => r.priority === priority);
            if (priorityRecs.length === 0) return null;
            
            return (
              <Card key={priority} className="glass-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-lg capitalize ${
                      priority === 'high' ? 'text-red-600' :
                      priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      {priority} Priority
                    </CardTitle>
                    <Badge variant="outline">
                      {priorityRecs.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {priorityRecs.map(rec => (
                      <div key={rec.id} className="border rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedRecommendations.has(rec.id)}
                            onCheckedChange={() => handleRecommendationToggle(rec.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getCategoryIcon(rec.category)}
                              <Badge variant="outline" className="text-xs">
                                {rec.section}
                              </Badge>
                              <span className="text-xs capitalize text-muted-foreground">
                                {rec.category.replace('-', ' ')}
                              </span>
                            </div>
                            <div className="text-sm">{rec.reasoning}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartRecommendationEngine;