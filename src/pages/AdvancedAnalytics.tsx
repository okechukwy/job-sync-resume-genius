import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Target, BarChart3, PieChart, Users, Calendar, Download } from "lucide-react";
import { PerformanceAnalytics } from "@/components/analytics/PerformanceAnalytics";
import { CareerProgressAnalytics } from "@/components/analytics/CareerProgressAnalytics";
import { CompetitiveAnalytics } from "@/components/analytics/CompetitiveAnalytics";
import { PredictiveAnalytics } from "@/components/analytics/PredictiveAnalytics";
import { SkillAnalytics } from "@/components/analytics/SkillAnalytics";
import { MarketInsights } from "@/components/analytics/MarketInsights";
import { useAdvancedAnalytics } from "@/hooks/useAdvancedAnalytics";
import { Skeleton } from "@/components/ui/skeleton";

const AdvancedAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('6_months');
  const [selectedMetric, setSelectedMetric] = useState<string>('performance');
  
  const { 
    analytics, 
    insights, 
    trends, 
    predictions,
    loading,
    exportAnalytics 
  } = useAdvancedAnalytics(selectedPeriod);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Deep insights into your career journey and job search performance
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1_month">Last Month</SelectItem>
              <SelectItem value="3_months">Last 3 Months</SelectItem>
              <SelectItem value="6_months">Last 6 Months</SelectItem>
              <SelectItem value="1_year">Last Year</SelectItem>
              <SelectItem value="all_time">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={exportAnalytics}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">
              {analytics?.successRate || 0}%
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>{trends?.successRate || '+0%'} vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              {analytics?.responseRate || 0}%
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>{trends?.responseRate || '+0%'} vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. ATS Score</CardTitle>
            <PieChart className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">
              {analytics?.avgAtsScore || 0}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>{trends?.atsScore || '+0'} vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Velocity</CardTitle>
            <Users className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">
              {analytics?.careerVelocity || 0}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Applications per week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Banner */}
      {insights && insights.length > 0 && (
        <Card className="border-chart-1 bg-gradient-to-r from-chart-1/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.slice(0, 3).map((insight, index) => (
                <div key={index} className="space-y-2">
                  <Badge variant="secondary">{insight.category}</Badge>
                  <p className="text-sm">{insight.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Tabs */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="competitive">Competitive</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceAnalytics 
            data={analytics} 
            period={selectedPeriod}
            trends={trends}
          />
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <CareerProgressAnalytics 
            data={analytics}
            predictions={predictions}
            period={selectedPeriod}
          />
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <CompetitiveAnalytics 
            data={analytics}
            marketData={analytics?.marketComparison}
            period={selectedPeriod}
          />
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <PredictiveAnalytics 
            predictions={predictions}
            historicalData={analytics}
            period={selectedPeriod}
          />
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <SkillAnalytics 
            skillsData={analytics?.skillsAnalysis}
            gapAnalysis={analytics?.skillGaps}
            period={selectedPeriod}
          />
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <MarketInsights 
            marketData={analytics?.marketInsights}
            trends={analytics?.industryTrends}
            period={selectedPeriod}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;