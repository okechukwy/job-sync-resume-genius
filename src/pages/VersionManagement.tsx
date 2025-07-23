
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Copy, MoreHorizontal, Plus, Lightbulb, RotateCcw, Archive } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { useResumeVersions } from "@/hooks/useResumeVersions";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreateVersionDialog } from "@/components/version-management/CreateVersionDialog";
import { getTemplateDisplayName, getTemplateIcon } from "@/utils/templateUtils";

const VersionManagement = () => {
  const {
    versions,
    insights,
    loading,
    insightsLoading,
    generateInsights,
    duplicateVersion,
    archiveVersion,
    restoreVersion,
  } = useResumeVersions();

  const [createVersionDialogOpen, setCreateVersionDialogOpen] = useState(false);
  const [isCreatingVersion, setIsCreatingVersion] = useState(false);

  const getStatusColor = (isActive: boolean, archivedAt?: string) => {
    if (archivedAt) return 'bg-secondary text-secondary-foreground';
    if (isActive) return 'bg-success text-success-foreground';
    return 'bg-muted text-muted-foreground';
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 70) return 'text-success';
    if (rate >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const formatMetricValue = (value: number | undefined | null, isPercentage = false) => {
    if (value === undefined || value === null || value === 0) {
      return isPercentage ? "0%" : "0";
    }
    return isPercentage ? `${Math.round(value)}%` : value.toString();
  };

  const getMetricDisplay = (value: number | undefined | null, isPercentage = false) => {
    if (value === undefined || value === null || value === 0) {
      return {
        value: isPercentage ? "0%" : "0",
        className: "text-muted-foreground"
      };
    }
    return {
      value: isPercentage ? `${Math.round(value)}%` : value.toString(),
      className: isPercentage ? getSuccessRateColor(value) : "font-medium"
    };
  };

  const handleDownload = (version: any) => {
    toast.success(`Downloaded ${version.title}`);
  };

  const handleDuplicate = async (version: any) => {
    await duplicateVersion(version.id, `${version.title} Copy`);
  };

  const handleArchive = async (version: any) => {
    await archiveVersion(version.id);
  };

  const handleRestore = async (version: any) => {
    await restoreVersion(version.id);
  };

  const handleCreateNewVersion = async (sourceId: string, title?: string, description?: string) => {
    setIsCreatingVersion(true);
    try {
      await duplicateVersion(sourceId, title, description);
    } finally {
      setIsCreatingVersion(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const activeVersions = versions.filter(v => v.is_active && !v.archived_at);
  const archivedVersions = versions.filter(v => v.archived_at);
  
  // Calculate statistics
  const totalVersions = versions.length;
  const totalActiveVersions = activeVersions.length;
  const totalApplications = versions.reduce((sum, v) => sum + (v.metrics?.total_applications || 0), 0);
  const avgSuccessRate = activeVersions.length > 0 
    ? activeVersions.reduce((sum, v) => sum + (v.metrics?.offer_rate || 0), 0) / activeVersions.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Manage Your Resume{" "}
            <span className="gradient-text">Versions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Keep track of different resume versions and easily switch between them for different applications.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              onClick={generateInsights} 
              disabled={insightsLoading || versions.length === 0}
              variant="outline"
              className="glass-card"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {insightsLoading ? "Generating AI Insights..." : "Get AI Insights"}
            </Button>
          </div>
        </div>

        {/* AI Insights Section */}
        {insights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">AI-Powered Insights</h2>
            <div className="grid gap-4">
              {insights.map((insight) => {
                const version = versions.find(v => v.id === insight.id);
                return (
                  <Card key={insight.id} className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{version?.title || 'Unknown Version'}</CardTitle>
                      <p className="text-muted-foreground">{insight.analysis}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {insight.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">Recommendations:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {insight.recommendations.map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {insight.strengths.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">Strengths:</h4>
                          <div className="flex flex-wrap gap-2">
                            {insight.strengths.map((strength, idx) => (
                              <Badge key={idx} variant="outline" className="bg-success/10 text-success border-success/20">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{totalVersions}</div>
              <div className="text-sm text-muted-foreground">Total Versions</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-success">{totalActiveVersions}</div>
              <div className="text-sm text-muted-foreground">Active Versions</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{totalApplications}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className={`text-3xl font-bold ${getSuccessRateColor(avgSuccessRate)}`}>
                {formatMetricValue(avgSuccessRate, true)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Versions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Versions</h2>
            <Button onClick={() => setCreateVersionDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Version
            </Button>
          </div>
          
          {activeVersions.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No Active Resume Versions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {versions.length === 0 
                    ? "Create your first resume to get started with version management."
                    : "All your resumes are archived. Restore a version or create a new one to get started."
                  }
                </p>
                <Button onClick={() => setCreateVersionDialogOpen(true)} disabled={versions.length === 0}>
                  <Plus className="w-4 h-4 mr-2" />
                  {versions.length === 0 ? "Create First Resume" : "Create New Version"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeVersions.map((version) => (
                <Card key={version.id} className="glass-card hover:shadow-glow transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{version.title}</CardTitle>
                        <Badge className={getStatusColor(version.is_active, version.archived_at)} variant="secondary">
                          v{version.version_number}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card">
                          <DropdownMenuItem onClick={() => handleDownload(version)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(version)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleArchive(version)}>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {version.description || "No description provided"}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Template:</span>
                        <Badge variant="outline" className="max-w-[150px] truncate">
                          <span className="mr-1">{getTemplateIcon(version.template_id)}</span>
                          {getTemplateDisplayName(version.template_id)}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Applications:</span>
                        <span className={getMetricDisplay(version.metrics?.total_applications).className}>
                          {getMetricDisplay(version.metrics?.total_applications).value}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className={getMetricDisplay(version.metrics?.offer_rate, true).className}>
                          {getMetricDisplay(version.metrics?.offer_rate, true).value}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ATS Score:</span>
                        <span className={getMetricDisplay(version.metrics?.avg_ats_score).className}>
                          {getMetricDisplay(version.metrics?.avg_ats_score).value}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Modified:</span>
                        <span className="text-muted-foreground">
                          {new Date(version.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="hero" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Use
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Version History */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Version History</h2>
          
          <Card className="glass-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left py-4 px-6">Version Name</th>
                      <th className="text-left py-4 px-6">Industry</th>
                      <th className="text-left py-4 px-6">Created</th>
                      <th className="text-left py-4 px-6">Applications</th>
                      <th className="text-left py-4 px-6">Success Rate</th>
                      <th className="text-left py-4 px-6">Status</th>
                      <th className="text-left py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {versions.map((version) => (
                      <tr key={version.id} className="border-b border-border/10 hover:bg-background/50">
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium">{version.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {version.description || "No description provided"}
                            </div>
                            <div className="text-xs text-muted-foreground">v{version.version_number}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge variant="outline" className="max-w-[120px] truncate">
                            <span className="mr-1">{getTemplateIcon(version.template_id)}</span>
                            {getTemplateDisplayName(version.template_id)}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">
                          {new Date(version.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <span className={getMetricDisplay(version.metrics?.total_applications).className}>
                            {getMetricDisplay(version.metrics?.total_applications).value}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={getMetricDisplay(version.metrics?.offer_rate, true).className}>
                            {getMetricDisplay(version.metrics?.offer_rate, true).value}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={getStatusColor(version.is_active, version.archived_at)}>
                            {version.archived_at ? 'archived' : 'active'}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDownload(version)}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDuplicate(version)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            {version.archived_at ? (
                              <Button variant="ghost" size="sm" onClick={() => handleRestore(version)}>
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" onClick={() => handleArchive(version)}>
                                <Archive className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold mb-2">Version History</h3>
              <p className="text-sm text-muted-foreground">
                Keep track of all your resume versions with detailed history
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold mb-2">Easy Rollback</h3>
              <p className="text-sm text-muted-foreground">
                Quickly revert to previous versions when needed
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="pt-6">
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-semibold mb-2">Bulk Export Options</h3>
              <p className="text-sm text-muted-foreground">
                Export multiple versions at once in different formats
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Version Dialog */}
      <CreateVersionDialog
        open={createVersionDialogOpen}
        onOpenChange={setCreateVersionDialogOpen}
        versions={versions}
        onCreateVersion={handleCreateNewVersion}
        isCreating={isCreatingVersion}
      />
    </div>
  );
};

export default VersionManagement;
