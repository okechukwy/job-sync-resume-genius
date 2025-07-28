import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';
import { TrendingUp, Target, Award, Calendar, ArrowRight } from 'lucide-react';
import { AdvancedAnalyticsData, PredictiveData } from '@/hooks/useAdvancedAnalytics';

interface CareerProgressAnalyticsProps {
  data: AdvancedAnalyticsData | null;
  predictions: PredictiveData | null;
  period: string;
}

export const CareerProgressAnalytics = ({ data, predictions, period }: CareerProgressAnalyticsProps) => {
  if (!data || !predictions) return null;

  const progressData = [
    { name: 'Technical Skills', current: 85, target: 95, fill: '#8884d8' },
    { name: 'Leadership', current: 70, target: 90, fill: '#82ca9d' },
    { name: 'Communication', current: 80, target: 88, fill: '#ffc658' },
    { name: 'Domain Knowledge', current: 75, target: 85, fill: '#ff7c7c' },
  ];

  const careerMilestones = [
    { milestone: 'First Interview', completed: true, date: '2024-01-15' },
    { milestone: 'Tech Assessment Pass', completed: true, date: '2024-02-03' },
    { milestone: 'Final Round Interview', completed: true, date: '2024-02-20' },
    { milestone: 'Job Offer', completed: false, date: null },
    { milestone: 'Salary Negotiation', completed: false, date: null },
  ];

  const skillEvolution = [
    { month: 'Jan', technical: 75, leadership: 60, communication: 70 },
    { month: 'Feb', technical: 78, leadership: 63, communication: 72 },
    { month: 'Mar', technical: 80, leadership: 65, communication: 75 },
    { month: 'Apr', technical: 82, leadership: 68, communication: 77 },
    { month: 'May', technical: 85, leadership: 70, communication: 80 },
    { month: 'Jun', technical: 85, leadership: 70, communication: 80 },
  ];

  const nextLevelRequirements = [
    { requirement: 'Lead a cross-functional project', progress: 60, status: 'In Progress' },
    { requirement: 'Complete advanced certification', progress: 80, status: 'Almost Done' },
    { requirement: 'Mentor junior developers', progress: 40, status: 'Started' },
    { requirement: 'Present at tech conference', progress: 20, status: 'Planning' },
  ];

  return (
    <div className="space-y-6">
      {/* Career Level Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Level</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="text-2xl font-bold">{predictions.careerTrajectory.currentLevel}</div>
              <Badge variant="secondary">Software Engineer</Badge>
            </div>
            <Award className="h-8 w-8 text-chart-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Level</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="text-2xl font-bold">{predictions.careerTrajectory.nextLevel}</div>
              <div className="text-sm text-muted-foreground">
                {predictions.careerTrajectory.timeToNextLevel} months to go
              </div>
            </div>
            <Target className="h-8 w-8 text-chart-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
            <div className="text-sm text-muted-foreground mt-1">
              On track for promotion
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Development Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart data={progressData} innerRadius="30%" outerRadius="80%">
              <RadialBar dataKey="current" cornerRadius={10} fill="#8884d8" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skill Evolution Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Evolution Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={skillEvolution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="technical" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Area type="monotone" dataKey="leadership" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Area type="monotone" dataKey="communication" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Career Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Career Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerMilestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <div className="flex-1">
                    <div className="font-medium">{milestone.milestone}</div>
                    {milestone.date && (
                      <div className="text-sm text-muted-foreground">{milestone.date}</div>
                    )}
                  </div>
                  {milestone.completed && <Badge variant="secondary">Completed</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Level Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextLevelRequirements.map((req, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{req.requirement}</span>
                    <Badge variant={req.status === 'Almost Done' ? 'default' : 'secondary'}>
                      {req.status}
                    </Badge>
                  </div>
                  <Progress value={req.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">{req.progress}% complete</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.careerTrajectory.requiredActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-chart-1" />
                  <span>{action}</span>
                </div>
                <Button variant="outline" size="sm">
                  Start
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="border-chart-1 bg-gradient-to-r from-chart-1/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            Progress Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-1">3</div>
              <div className="text-sm text-muted-foreground">Milestones Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-2">65%</div>
              <div className="text-sm text-muted-foreground">Skills Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-3">8mo</div>
              <div className="text-sm text-muted-foreground">Est. Time to Next Level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};