import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Copy, MoreHorizontal, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";

const VersionManagement = () => {
  const [versions] = useState([
    {
      id: 1,
      name: "Tech_v2.1",
      description: "Latest version for software engineering roles",
      createdDate: "2024-01-15",
      lastModified: "2024-01-20",
      industry: "Technology",
      applications: 8,
      successRate: 75,
      status: "active"
    },
    {
      id: 2,
      name: "PM_v1.3",
      description: "Product management focused resume",
      createdDate: "2024-01-10",
      lastModified: "2024-01-18",
      industry: "Product Management",
      applications: 5,
      successRate: 60,
      status: "active"
    },
    {
      id: 3,
      name: "Frontend_v1.1",
      description: "Frontend developer specialization",
      createdDate: "2024-01-05",
      lastModified: "2024-01-12",
      industry: "Technology",
      applications: 3,
      successRate: 33,
      status: "archived"
    },
    {
      id: 4,
      name: "Tech_v2.0",
      description: "Previous tech version - high success rate",
      createdDate: "2024-01-01",
      lastModified: "2024-01-15",
      industry: "Technology",
      applications: 12,
      successRate: 83,
      status: "archived"
    },
    {
      id: 5,
      name: "General_v1.0",
      description: "General purpose resume template",
      createdDate: "2023-12-15",
      lastModified: "2024-01-01",
      industry: "General",
      applications: 2,
      successRate: 50,
      status: "archived"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'archived':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 70) return 'text-success';
    if (rate >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const handleDownload = (version: any) => {
    toast.success(`Downloaded ${version.name}`);
  };

  const handleDuplicate = (version: any) => {
    toast.success(`Created copy of ${version.name}`);
  };

  const handleArchive = (version: any) => {
    toast.success(`Archived ${version.name}`);
  };

  const activeVersions = versions.filter(v => v.status === 'active');
  const archivedVersions = versions.filter(v => v.status === 'archived');

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
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{versions.length}</div>
              <div className="text-sm text-muted-foreground">Total Versions</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-success">{activeVersions.length}</div>
              <div className="text-sm text-muted-foreground">Active Versions</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">{versions.reduce((acc, v) => acc + v.applications, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-primary">
                {Math.round(versions.reduce((acc, v) => acc + v.successRate, 0) / versions.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Versions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Versions</h2>
            <Link to="/get-started">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Version
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeVersions.map((version) => (
              <Card key={version.id} className="glass-card hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{version.name}</CardTitle>
                      <Badge className={getStatusColor(version.status)} variant="secondary">
                        {version.status}
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
                          <FileText className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{version.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Industry:</span>
                      <Badge variant="outline">{version.industry}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Applications:</span>
                      <span className="font-medium">{version.applications}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Success Rate:</span>
                      <span className={`font-medium ${getSuccessRateColor(version.successRate)}`}>
                        {version.successRate}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Modified:</span>
                      <span className="text-muted-foreground">
                        {new Date(version.lastModified).toLocaleDateString()}
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
                            <div className="font-medium">{version.name}</div>
                            <div className="text-sm text-muted-foreground">{version.description}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge variant="outline">{version.industry}</Badge>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">
                          {new Date(version.createdDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 font-medium">{version.applications}</td>
                        <td className="py-4 px-6">
                          <span className={`font-medium ${getSuccessRateColor(version.successRate)}`}>
                            {version.successRate}%
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={getStatusColor(version.status)}>
                            {version.status}
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
    </div>
  );
};

export default VersionManagement;