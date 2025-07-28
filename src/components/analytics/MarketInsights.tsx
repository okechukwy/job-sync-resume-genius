import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, MapPin, Building, Globe, Briefcase } from 'lucide-react';

interface MarketInsightsProps {
  marketData: any;
  trends: any;
  period: string;
}

export const MarketInsights = ({ marketData, trends, period }: MarketInsightsProps) => {
  const salaryTrends = [
    { month: 'Jan', junior: 75000, mid: 95000, senior: 125000 },
    { month: 'Feb', junior: 76000, mid: 96000, senior: 127000 },
    { month: 'Mar', junior: 77000, mid: 97000, senior: 129000 },
    { month: 'Apr', junior: 78000, mid: 98000, senior: 131000 },
    { month: 'May', junior: 79000, mid: 99000, senior: 133000 },
    { month: 'Jun', junior: 80000, mid: 100000, senior: 135000 },
  ];

  const demandByLocation = [
    { location: 'San Francisco', demand: 95, avg_salary: 145000, cost_of_living: 180 },
    { location: 'New York', demand: 88, avg_salary: 135000, cost_of_living: 170 },
    { location: 'Seattle', demand: 92, avg_salary: 130000, cost_of_living: 140 },
    { location: 'Austin', demand: 85, avg_salary: 115000, cost_of_living: 110 },
    { location: 'Denver', demand: 80, avg_salary: 110000, cost_of_living: 105 },
    { location: 'Remote', demand: 90, avg_salary: 120000, cost_of_living: 100 },
  ];

  const industryGrowth = [
    { industry: 'Tech/Software', growth: 15, openings: 12500, competition: 'High' },
    { industry: 'FinTech', growth: 22, openings: 8500, competition: 'Very High' },
    { industry: 'Healthcare Tech', growth: 28, openings: 6200, competition: 'Medium' },
    { industry: 'E-commerce', growth: 18, openings: 9800, competition: 'High' },
    { industry: 'Gaming', growth: 12, openings: 4200, competition: 'Very High' },
    { industry: 'EdTech', growth: 25, openings: 3800, competition: 'Medium' },
  ];

  const skillDemandTrends = [
    { name: 'React', Q1: 85, Q2: 88, Q3: 92, Q4: 95 },
    { name: 'Python', Q1: 90, Q2: 92, Q3: 94, Q4: 96 },
    { name: 'AWS', Q1: 78, Q2: 82, Q3: 87, Q4: 92 },
    { name: 'TypeScript', Q1: 70, Q2: 75, Q3: 82, Q4: 88 },
    { name: 'Kubernetes', Q1: 65, Q2: 70, Q3: 76, Q4: 82 },
  ];

  const companyTypeDistribution = [
    { name: 'Startup', value: 35, color: '#8884d8' },
    { name: 'Mid-size', value: 30, color: '#82ca9d' },
    { name: 'Enterprise', value: 25, color: '#ffc658' },
    { name: 'Big Tech', value: 10, color: '#ff7c7c' },
  ];

  const marketTrends = [
    {
      trend: 'Remote-First Hiring',
      impact: '+35% in remote job postings',
      opportunity: 'High',
      recommendation: 'Highlight remote work experience and setup'
    },
    {
      trend: 'AI/ML Integration',
      impact: '+40% demand for AI skills',
      opportunity: 'Very High',
      recommendation: 'Invest in machine learning fundamentals'
    },
    {
      trend: 'Cloud Migration',
      impact: '+25% cloud architecture roles',
      opportunity: 'High',
      recommendation: 'Pursue cloud certifications'
    },
    {
      trend: 'Security Focus',
      impact: '+30% cybersecurity positions',
      opportunity: 'Medium',
      recommendation: 'Learn security best practices'
    },
  ];

  const competitiveLandscape = [
    { metric: 'Job Seekers', value: 250000, change: '+12%' },
    { metric: 'Open Positions', value: 95000, change: '+8%' },
    { metric: 'Avg Time to Hire', value: 42, change: '-5 days' },
    { metric: 'Competition Ratio', value: 2.6, change: '+0.3' },
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {competitiveLandscape.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof metric.value === 'number' && metric.value > 1000 
                  ? (metric.value / 1000).toFixed(0) + 'K'
                  : metric.value}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>{metric.change} vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Salary Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-chart-1" />
            Salary Trends by Experience Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="junior" stroke="#8884d8" strokeWidth={2} name="Junior (0-2 years)" />
              <Line type="monotone" dataKey="mid" stroke="#82ca9d" strokeWidth={2} name="Mid-level (3-5 years)" />
              <Line type="monotone" dataKey="senior" stroke="#ffc658" strokeWidth={2} name="Senior (5+ years)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Demand by Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-chart-2" />
            Market Demand by Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demandByLocation.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{location.location}</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Salary: ${location.avg_salary.toLocaleString()} | 
                    Cost of Living: {location.cost_of_living}% of SF
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">{location.demand}%</div>
                    <div className="text-xs text-muted-foreground">Demand</div>
                  </div>
                  <div className="w-20">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-chart-2 rounded-full" 
                        style={{ width: `${location.demand}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Growth and Company Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-chart-3" />
              Industry Growth Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {industryGrowth.map((industry, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{industry.industry}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={industry.competition === 'Very High' ? 'destructive' : industry.competition === 'High' ? 'default' : 'secondary'}>
                        {industry.competition}
                      </Badge>
                      <span className="text-sm text-green-600">+{industry.growth}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {industry.openings.toLocaleString()} open positions
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hiring by Company Size</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={companyTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {companyTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {companyTypeDistribution.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Demand Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Skill Demand Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillDemandTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Q1" fill="#8884d8" name="Q1" />
              <Bar dataKey="Q2" fill="#82ca9d" name="Q2" />
              <Bar dataKey="Q3" fill="#ffc658" name="Q3" />
              <Bar dataKey="Q4" fill="#ff7c7c" name="Q4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Trends Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-chart-4" />
            Key Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketTrends.map((trend, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{trend.trend}</div>
                  <Badge variant={trend.opportunity === 'Very High' ? 'default' : trend.opportunity === 'High' ? 'secondary' : 'outline'}>
                    {trend.opportunity} Opportunity
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {trend.impact}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Recommendation: </span>
                  {trend.recommendation}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Opportunities */}
      <Card className="border-chart-1 bg-gradient-to-r from-chart-1/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-chart-1" />
            Market Opportunities for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">High-Opportunity Segments</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Remote-first companies (90% match)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>FinTech startups (85% match)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Healthcare technology (80% match)</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Emerging Opportunities</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>AI/ML engineering roles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Cloud architecture positions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Developer experience roles</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Based on your skills, experience, and market analysis
              </div>
              <Button variant="outline" size="sm">
                Get Personalized Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};