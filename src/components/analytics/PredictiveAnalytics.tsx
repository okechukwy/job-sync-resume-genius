import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, Target, Zap, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { PredictiveData, AdvancedAnalyticsData } from '@/hooks/useAdvancedAnalytics';

interface PredictiveAnalyticsProps {
  predictions: PredictiveData | null;
  historicalData: AdvancedAnalyticsData | null;
  period: string;
}

export const PredictiveAnalytics = ({ predictions, historicalData, period }: PredictiveAnalyticsProps) => {
  if (!predictions) return null;

  const forecastData = [
    { month: 'Jul', actual: 8, predicted: null },
    { month: 'Aug', actual: 10, predicted: null },
    { month: 'Sep', actual: 12, predicted: null },
    { month: 'Oct', actual: 9, predicted: null },
    { month: 'Nov', actual: 11, predicted: null },
    { month: 'Dec', actual: 13, predicted: null },
    { month: 'Jan', actual: null, predicted: predictions.nextMonthPredictions.expectedApplications },
    { month: 'Feb', actual: null, predicted: 15 },
    { month: 'Mar', actual: null, predicted: 16 },
    { month: 'Apr', actual: null, predicted: 14 },
    { month: 'May', actual: null, predicted: 17 },
    { month: 'Jun', actual: null, predicted: 18 },
  ];

  const successProbabilityData = [
    { scenario: 'Conservative', applications: 8, interviews: 2, offers: 1, probability: 85 },
    { scenario: 'Realistic', applications: 12, interviews: 3, offers: 1, probability: 75 },
    { scenario: 'Optimistic', applications: 16, interviews: 5, offers: 2, probability: 60 },
  ];

  const marketOpportunityTrends = [
    { month: 'Jan', demand: 85, competition: 70, salary: 95000 },
    { month: 'Feb', demand: 88, competition: 72, salary: 96000 },
    { month: 'Mar', demand: 92, competition: 68, salary: 98000 },
    { month: 'Apr', demand: 95, competition: 65, salary: 100000 },
    { month: 'May', demand: 90, competition: 70, salary: 99000 },
    { month: 'Jun', demand: 93, competition: 67, salary: 101000 },
  ];

  const aiInsights = [
    {
      insight: "Your application response rate is likely to increase by 15% in the next quarter",
      confidence: 87,
      reasoning: "Based on skill development trends and market demand patterns",
      impact: "high"
    },
    {
      insight: "Remote positions show 23% higher success rate for your profile",
      confidence: 92,
      reasoning: "Analysis of similar profiles and current market trends",
      impact: "medium"
    },
    {
      insight: "Best application timing: Tuesday 10-11 AM for 18% higher response rate",
      confidence: 79,
      reasoning: "Historical data analysis of recruiter activity patterns",
      impact: "medium"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Prediction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Month Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictions.nextMonthPredictions.expectedApplications}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Briefcase className="mr-1 h-3 w-3" />
              <span>{predictions.nextMonthPredictions.confidenceLevel}% confidence</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expected Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictions.nextMonthPredictions.expectedResponses}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+20% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Predicted Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictions.nextMonthPredictions.expectedInterviews}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span>Schedule slots</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time to Next Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictions.careerTrajectory.timeToNextLevel}mo</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Target className="mr-1 h-3 w-3" />
              <span>To {predictions.careerTrajectory.nextLevel}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Application & Response Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Historical"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#82ca9d" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Success Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Success Probability Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={successProbabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#8884d8" name="Applications" />
              <Bar dataKey="interviews" fill="#82ca9d" name="Interviews" />
              <Bar dataKey="offers" fill="#ffc658" name="Offers" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Opportunity Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Market Opportunity Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketOpportunityTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="demand" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Area type="monotone" dataKey="competition" stackId="2" stroke="#ff7c7c" fill="#ff7c7c" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Predicted Market Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.marketOpportunities.map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{opportunity.role}</div>
                  <div className="text-sm text-muted-foreground">{opportunity.company}</div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">
                      {opportunity.matchScore}% match
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      ${opportunity.salaryRange.min.toLocaleString()} - ${opportunity.salaryRange.max.toLocaleString()}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-chart-3 bg-gradient-to-r from-chart-3/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-chart-3" />
            AI-Powered Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{insight.insight}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {insight.reasoning}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={insight.impact === 'high' ? 'default' : 'secondary'}>
                      {insight.impact} impact
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {insight.confidence}% confidence
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Immediate Actions (This Week)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Apply to 3-4 remote positions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Update LinkedIn with recent project</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Schedule applications for Tuesday mornings</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Strategic Actions (This Month)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Complete AWS certification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Expand network in target companies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Prepare for system design interviews</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};