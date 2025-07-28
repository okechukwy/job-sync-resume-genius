import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Users, Award, Target, AlertTriangle } from 'lucide-react';

interface CompetitiveAnalyticsProps {
  data: any;
  marketData: any;
  period: string;
}

export const CompetitiveAnalytics = ({ data, marketData, period }: CompetitiveAnalyticsProps) => {
  const competitiveMetrics = [
    { metric: 'Response Rate', you: data?.responseRate || 0, market: 12, industry: 15, peer: 18 },
    { metric: 'ATS Score', you: data?.avgAtsScore || 0, market: 75, industry: 80, peer: 85 },
    { metric: 'Interview Rate', you: 25, market: 20, industry: 22, peer: 28 },
    { metric: 'Success Rate', you: data?.successRate || 0, market: 8, industry: 12, peer: 15 },
  ];

  const radarData = [
    { subject: 'Technical Skills', A: 85, B: 80, fullMark: 100 },
    { subject: 'Experience', A: 75, B: 85, fullMark: 100 },
    { subject: 'Education', A: 90, B: 75, fullMark: 100 },
    { subject: 'Certifications', A: 70, B: 90, fullMark: 100 },
    { subject: 'Network', A: 60, B: 85, fullMark: 100 },
    { subject: 'Portfolio', A: 95, B: 70, fullMark: 100 },
  ];

  const marketPositionData = [
    { experience: 2, salary: 65000, applications: 50 },
    { experience: 3, salary: 75000, applications: 35 },
    { experience: 4, salary: 85000, applications: 28 },
    { experience: 5, salary: 95000, applications: 22 },
    { experience: 6, salary: 105000, applications: 18 },
    { experience: 7, salary: 115000, applications: 15 },
    { experience: 8, salary: 125000, applications: 12 },
  ];

  const strengthsWeaknesses = {
    strengths: [
      { area: 'Technical Portfolio', score: 95, description: 'Strong GitHub presence and project diversity' },
      { area: 'Application Quality', score: 88, description: 'Well-tailored applications and cover letters' },
      { area: 'Response Time', score: 85, description: 'Quick to respond to recruiter outreach' },
    ],
    weaknesses: [
      { area: 'Network Size', score: 45, description: 'Limited professional connections' },
      { area: 'Industry Presence', score: 55, description: 'Low visibility in tech community' },
      { area: 'Negotiation Skills', score: 60, description: 'Room for improvement in salary discussions' },
    ],
  };

  const competitorProfiles = [
    {
      name: 'Similar Profile A',
      successRate: 18,
      avgSalary: 95000,
      timeToHire: 45,
      keyAdvantages: ['Strong network', 'Industry certifications'],
    },
    {
      name: 'Similar Profile B',
      successRate: 22,
      avgSalary: 105000,
      timeToHire: 35,
      keyAdvantages: ['Leadership experience', 'Top-tier education'],
    },
    {
      name: 'Similar Profile C',
      successRate: 15,
      avgSalary: 88000,
      timeToHire: 60,
      keyAdvantages: ['Specialized skills', 'Remote work experience'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Competitive Position Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75th</div>
            <div className="text-sm text-muted-foreground">Percentile</div>
            <Badge variant="default">Above Average</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Peer Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <div className="text-sm text-muted-foreground">vs Similar Profiles</div>
            <Badge variant="default">Outperforming</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">High</div>
            <div className="text-sm text-muted-foreground">For Your Skills</div>
            <Badge variant="default">Growing</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Competition Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Moderate</div>
            <div className="text-sm text-muted-foreground">In Your Area</div>
            <Badge variant="secondary">Manageable</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Metrics Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Performance vs Market</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={competitiveMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="you" fill="#8884d8" name="You" />
              <Bar dataKey="market" fill="#82ca9d" name="Market Avg" />
              <Bar dataKey="industry" fill="#ffc658" name="Industry Avg" />
              <Bar dataKey="peer" fill="#ff7c7c" name="Peer Avg" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skills Radar Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills Profile Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="You" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Radar name="Top Performers" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Position by Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={marketPositionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experience" name="Years of Experience" />
                <YAxis dataKey="salary" name="Salary" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Market Data" data={marketPositionData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              Competitive Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strengthsWeaknesses.strengths.map((strength, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{strength.area}</span>
                    <Badge variant="default">{strength.score}%</Badge>
                  </div>
                  <Progress value={strength.score} className="h-2" />
                  <p className="text-sm text-muted-foreground">{strength.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strengthsWeaknesses.weaknesses.map((weakness, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{weakness.area}</span>
                    <Badge variant="secondary">{weakness.score}%</Badge>
                  </div>
                  <Progress value={weakness.score} className="h-2" />
                  <p className="text-sm text-muted-foreground">{weakness.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Profile Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {competitorProfiles.map((competitor, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="font-medium">{competitor.name}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate:</span>
                    <span className="font-medium">{competitor.successRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Salary:</span>
                    <span className="font-medium">${competitor.avgSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time to Hire:</span>
                    <span className="font-medium">{competitor.timeToHire} days</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Key Advantages:</div>
                  <div className="space-y-1">
                    {competitor.keyAdvantages.map((advantage, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {advantage}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Recommendations */}
      <Card className="border-chart-2 bg-gradient-to-r from-chart-2/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-chart-2" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-chart-2 rounded-full mt-2" />
              <div>
                <div className="font-medium">Expand Professional Network</div>
                <div className="text-sm text-muted-foreground">
                  Focus on LinkedIn connections and industry events to improve visibility
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-chart-2 rounded-full mt-2" />
              <div>
                <div className="font-medium">Pursue Industry Certifications</div>
                <div className="text-sm text-muted-foreground">
                  Target certifications that are valued by top-performing peers
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-chart-2 rounded-full mt-2" />
              <div>
                <div className="font-medium">Optimize Application Strategy</div>
                <div className="text-sm text-muted-foreground">
                  Focus on companies where your profile has the highest success rate
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};