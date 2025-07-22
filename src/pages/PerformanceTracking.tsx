
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Plus, Calendar, TrendingUp, Target, Users, RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useJobApplications } from "@/hooks/useJobApplications";
import { ApplicationForm } from "@/components/ApplicationForm";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BulkActions } from "@/components/performance/BulkActions";
import { MetricsLegend } from "@/components/performance/MetricsLegend";
import { ApplicationsTable } from "@/components/performance/ApplicationsTable";
import { SuccessMetrics } from "@/components/performance/SuccessMetrics";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PageLayout } from "@/components/common/PageLayout";

interface AIInsights {
  working_well: string[];
  improvements: string[];
  recommendations: string[];
}

interface InsightsResponse {
  insights: AIInsights;
  success: boolean;
  generated_at: string;
  source: 'ai_generated' | 'fallback_generated';
  error?: string;
}

const PerformanceTracking = () => {
  const { user } = useAuth();
  const { applications, metrics, loading, addApplication, updateApplication, deleteApplication, refreshMetrics } = useJobApplications();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState<string | null>(null);
  const [insightsSource, setInsightsSource] = useState<'ai_generated' | 'fallback_generated' | null>(null);
  const [insightsTimestamp, setInsightsTimestamp] = useState<string | null>(null);
  const [selectedApplicationIds, setSelectedApplicationIds] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);

  const handleAddApplication = async (data: any) => {
    await addApplication(data);
    setShowApplicationForm(false);
  };

  const handleEditApplication = (application: any) => {
    setEditingApplication(application);
    setShowApplicationForm(true);
  };

  const handleUpdateApplication = async (data: any) => {
    if (editingApplication) {
      await updateApplication(editingApplication.id, data);
      setEditingApplication(null);
      setShowApplicationForm(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    setApplicationToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (applicationToDelete) {
      try {
        await deleteApplication(applicationToDelete);
        toast.success('Application deleted successfully');
      } catch (error) {
        toast.error('Failed to delete application');
      } finally {
        setDeleteConfirmationOpen(false);
        setApplicationToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setApplicationToDelete(null);
  };

  const handleQuickStatusUpdate = async (id: string, status: string) => {
    setIsUpdating(true);
    try {
      await updateApplication(id, { status });
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBulkStatusUpdate = async (ids: string[], status: string) => {
    setIsUpdating(true);
    try {
      await Promise.all(ids.map(id => updateApplication(id, { status })));
      toast.success(`${ids.length} applications updated successfully`);
    } catch (error) {
      toast.error('Failed to update applications');
    } finally {
      setIsUpdating(false);
    }
  };

  const generateAIInsights = async () => {
    if (!user || applications.length === 0) {
      toast.error('No applications data available for insights generation');
      return;
    }
    
    setInsightsLoading(true);
    setInsightsError(null);
    
    try {
      console.log('Generating AI insights for', applications.length, 'applications');
      
      const { data, error } = await supabase.functions.invoke('performance-insights', {
        body: { userId: user.id }
      });

      if (error) {
        console.error('Insights generation error:', error);
        throw error;
      }

      const response = data as InsightsResponse;
      
      setAiInsights(response.insights);
      setInsightsSource(response.source);
      setInsightsTimestamp(response.generated_at);
      
      if (response.source === 'fallback_generated') {
        setInsightsError('AI generation failed - showing general recommendations');
        toast.warning('Using general insights due to AI service issue');
      } else {
        toast.success('AI insights generated successfully');
      }
      
    } catch (error) {
      console.error('Error generating AI insights:', error);
      setInsightsError(error.message || 'Failed to generate AI insights');
      toast.error('Failed to generate AI insights');
    } finally {
      setInsightsLoading(false);
    }
  };

  useEffect(() => {
    if (applications.length > 0 && !aiInsights && !insightsLoading) {
      generateAIInsights();
    }
  }, [applications.length, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const stats = {
    totalApplications: metrics?.total_applications || 0,
    responseRate: metrics?.response_rate || 0,
    interviewRate: metrics?.interview_rate || 0,
    offerRate: metrics?.offer_rate || 0,
    avgAtsScore: metrics?.avg_ats_score || 0
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <PageLayout>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Track Your Job Search{" "}
            <span className="gradient-text">Performance</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Monitor your application success rates and optimize your documents based on real performance data.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold">{stats.totalApplications}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-success" />
              </div>
              <div className="text-3xl font-bold text-success">{stats.responseRate}%</div>
              <div className="text-sm text-muted-foreground">Response Rate</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">{stats.interviewRate}%</div>
              <div className="text-sm text-muted-foreground">Interview Rate</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
              <div className="text-3xl font-bold text-warning">{stats.offerRate}%</div>
              <div className="text-sm text-muted-foreground">Offer Rate</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{stats.avgAtsScore}</div>
              <div className="text-sm text-muted-foreground">Avg ATS Score</div>
              <Progress value={stats.avgAtsScore} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Metrics Legend */}
        <div className="mb-8">
          <MetricsLegend />
        </div>

        {/* Applications Table */}
        <Card className="glass-card mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Application Tracking</CardTitle>
            <Button onClick={() => setShowApplicationForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Button>
          </CardHeader>
          <CardContent>
            <BulkActions
              applications={applications}
              selectedIds={selectedApplicationIds}
              onSelectionChange={setSelectedApplicationIds}
              onBulkUpdate={handleBulkStatusUpdate}
              isUpdating={isUpdating}
            />
            
            <ApplicationsTable
              applications={applications}
              selectedIds={selectedApplicationIds}
              onSelectionChange={setSelectedApplicationIds}
              onEditApplication={handleEditApplication}
              onDeleteApplication={handleDeleteApplication}
              onStatusUpdate={handleQuickStatusUpdate}
              isUpdating={isUpdating}
            />
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SuccessMetrics 
            metrics={metrics}
            applications={applications}
            onRefreshMetrics={refreshMetrics}
          />

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                AI-Powered Insights
                {insightsSource && (
                  <Badge variant={insightsSource === 'ai_generated' ? 'default' : 'secondary'} className="text-xs">
                    {insightsSource === 'ai_generated' ? (
                      <><CheckCircle className="w-3 h-3 mr-1" />AI Generated</>
                    ) : (
                      <><AlertCircle className="w-3 h-3 mr-1" />Fallback</>
                    )}
                  </Badge>
                )}
              </CardTitle>
              {applications.length > 0 && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={generateAIInsights}
                  disabled={insightsLoading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${insightsLoading ? 'animate-spin' : ''}`} />
                  {insightsLoading ? 'Analyzing...' : 'Refresh Insights'}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {insightsError && (
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{insightsError}</AlertDescription>
                </Alert>
              )}

              {insightsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner />
                  <span className="ml-2 text-muted-foreground">Generating AI insights...</span>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Add some job applications to get AI-powered insights and recommendations.
                </div>
              ) : aiInsights ? (
                <div className="space-y-4">
                  {insightsTimestamp && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Clock className="w-3 h-3" />
                      <span>Generated: {formatTimestamp(insightsTimestamp)}</span>
                    </div>
                  )}

                  <div className="p-4 glass-card rounded-lg">
                    <h4 className="font-medium text-success mb-2">✅ What's Working</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {aiInsights.working_well.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 glass-card rounded-lg">
                    <h4 className="font-medium text-warning mb-2">⚠️ Areas for Improvement</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {aiInsights.improvements.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 glass-card rounded-lg">
                    <h4 className="font-medium text-primary mb-2">💡 Recommendations</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {aiInsights.recommendations.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Button onClick={generateAIInsights}>
                    Generate AI Insights
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      <ApplicationForm
        open={showApplicationForm}
        onOpenChange={(open) => {
          setShowApplicationForm(open);
          if (!open) {
            setEditingApplication(null);
          }
        }}
        onSubmit={editingApplication ? handleUpdateApplication : handleAddApplication}
        initialData={editingApplication}
        mode={editingApplication ? 'edit' : 'create'}
      />

      <AlertDialog open={deleteConfirmationOpen} onOpenChange={setDeleteConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default PerformanceTracking;
