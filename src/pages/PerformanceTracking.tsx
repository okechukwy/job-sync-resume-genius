import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Calendar, TrendingUp, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const PerformanceTracking = () => {
  const [applications] = useState([
    {
      id: 1,
      company: "Google",
      position: "Senior Software Engineer",
      dateApplied: "2024-01-15",
      status: "Interview Scheduled",
      stage: "Technical Interview",
      resumeVersion: "Tech_v2.1",
      atsScore: 92
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Product Manager",
      dateApplied: "2024-01-12",
      status: "Under Review",
      stage: "HR Screening",
      resumeVersion: "PM_v1.3",
      atsScore: 88
    },
    {
      id: 3,
      company: "Meta",
      position: "Frontend Developer",
      dateApplied: "2024-01-10",
      status: "Rejected",
      stage: "Resume Review",
      resumeVersion: "Frontend_v1.1",
      atsScore: 65
    },
    {
      id: 4,
      company: "Amazon",
      position: "Software Engineer",
      dateApplied: "2024-01-08",
      status: "Offer Received",
      stage: "Negotiation",
      resumeVersion: "Tech_v2.0",
      atsScore: 94
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'offer received':
        return 'bg-success text-success-foreground';
      case 'interview scheduled':
        return 'bg-primary text-primary-foreground';
      case 'under review':
        return 'bg-warning text-warning-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const stats = {
    totalApplications: applications.length,
    responseRate: 75,
    interviewRate: 50,
    offerRate: 25,
    avgAtsScore: 85
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="text-2xl font-bold gradient-text">Performance Tracking</div>
            <Badge variant="secondary" className="glass-card">Analytics</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
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

        {/* Applications Table */}
        <Card className="glass-card mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Application Tracking</CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left py-3 px-2">Company</th>
                    <th className="text-left py-3 px-2">Position</th>
                    <th className="text-left py-3 px-2">Date Applied</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Stage</th>
                    <th className="text-left py-3 px-2">Resume Version</th>
                    <th className="text-left py-3 px-2">ATS Score</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-border/10 hover:bg-background/50">
                      <td className="py-3 px-2 font-medium">{app.company}</td>
                      <td className="py-3 px-2">{app.position}</td>
                      <td className="py-3 px-2 text-muted-foreground">
                        {new Date(app.dateApplied).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{app.stage}</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">{app.resumeVersion}</Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{app.atsScore}%</span>
                          <Progress value={app.atsScore} className="w-16 h-2" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Success Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Applications Sent</span>
                <span className="font-semibold">{stats.totalApplications}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Responses Received</span>
                <span className="font-semibold text-success">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Interviews Scheduled</span>
                <span className="font-semibold text-primary">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Offers Received</span>
                <span className="font-semibold text-warning">1</span>
              </div>
              <div className="pt-4 border-t border-border/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Success Rate</span>
                  <span className="font-bold text-lg text-primary">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Improvement Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 glass-card rounded-lg">
                  <h4 className="font-medium text-success mb-2">✅ What's Working</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High ATS scores (85+ average)</li>
                    <li>• Strong response rate from tech companies</li>
                    <li>• Resume version 2.x performing better</li>
                  </ul>
                </div>
                
                <div className="p-4 glass-card rounded-lg">
                  <h4 className="font-medium text-warning mb-2">⚠️ Areas for Improvement</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Applications with ATS score &lt;70 get rejected</li>
                    <li>• Consider updating older resume versions</li>
                    <li>• Focus on companies with better cultural fit</li>
                  </ul>
                </div>

                <div className="p-4 glass-card rounded-lg">
                  <h4 className="font-medium text-primary mb-2">💡 Recommendations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use Tech_v2.1 template for all applications</li>
                    <li>• Target companies with 85%+ ATS compatibility</li>
                    <li>• Follow up on pending applications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTracking;