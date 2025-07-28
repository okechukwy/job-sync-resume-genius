import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Clock } from 'lucide-react';
import { AdvancedAnalyticsData, AnalyticsTrends } from '@/hooks/useAdvancedAnalytics';

interface PerformanceAnalyticsProps {
  data: AdvancedAnalyticsData | null;
  period: string;
  trends: AnalyticsTrends | null;
}

export const PerformanceAnalytics = ({ data, period, trends }: PerformanceAnalyticsProps) => {
  if (!data) return null;

  const funnel = [
    { stage: 'Applications', value: data.performanceMetrics.totalApplications, color: '#8884d8' },
    { stage: 'Responses', value: data.performanceMetrics.responsesReceived, color: '#82ca9d' },
    { stage: 'Interviews', value: data.performanceMetrics.interviewsScheduled, color: '#ffc658' },
    { stage: 'Offers', value: data.performanceMetrics.offersReceived, color: '#ff7c7c' },
  ];

  const timelineData = [
    { name: 'Week 1', applications: 5, responses: 1, interviews: 0 },
    { name: 'Week 2', applications: 8, responses: 2, interviews: 1 },
    { name: 'Week 3', applications: 6, responses: 3, interviews: 2 },
    { name: 'Week 4', applications: 10, responses: 4, interviews: 1 },
    { name: 'Week 5', applications: 7, responses: 2, interviews: 3 },
    { name: 'Week 6', applications: 9, responses: 5, interviews: 2 },
  ];

  const conversionRates = [
    { name: 'Application to Response', rate: data.responseRate },
    { name: 'Response to Interview', rate: (data.performanceMetrics.interviewsScheduled / Math.max(data.performanceMetrics.responsesReceived, 1)) * 100 },
    { name: 'Interview to Offer', rate: (data.performanceMetrics.offersReceived / Math.max(data.performanceMetrics.interviewsScheduled, 1)) * 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.performanceMetrics.totalApplications}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>{trends?.careerVelocity} applications/week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.performanceMetrics.avgTimeToResponse}d</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>Industry avg: 10d</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Interview Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((data.performanceMetrics.interviewsScheduled / Math.max(data.performanceMetrics.responsesReceived, 1)) * 100)}%
            </div>
            <Progress 
              value={(data.performanceMetrics.interviewsScheduled / Math.max(data.performanceMetrics.responsesReceived, 1)) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.successRate}%</div>
            <Badge variant={data.successRate > 15 ? "default" : "secondary"}>
              {data.successRate > 15 ? "Above Average" : "Improving"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Application Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnel}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Timeline Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="responses" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="interviews" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rates Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionRates.map((conversion, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{conversion.name}</span>
                  <span className="text-sm text-muted-foreground">{Math.round(conversion.rate)}%</span>
                </div>
                <Progress value={conversion.rate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">Strengths</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Response rate above industry average</li>
                <li>• Consistent application velocity</li>
                <li>• Good ATS optimization</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-amber-600">Opportunities</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Improve interview preparation</li>
                <li>• Focus on higher-converting companies</li>
                <li>• Optimize application timing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};