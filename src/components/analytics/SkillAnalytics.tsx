import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from 'recharts';
import { Brain, TrendingUp, Target, AlertCircle, BookOpen, Award } from 'lucide-react';

interface SkillAnalyticsProps {
  skillsData: any;
  gapAnalysis: any;
  period: string;
}

export const SkillAnalytics = ({ skillsData, gapAnalysis, period }: SkillAnalyticsProps) => {
  const skillProficiencyData = [
    { skill: 'React', current: 90, market: 85, demand: 95, gap: 5 },
    { skill: 'TypeScript', current: 85, market: 80, demand: 90, gap: 5 },
    { skill: 'Node.js', current: 80, market: 75, demand: 85, gap: 5 },
    { skill: 'Python', current: 75, market: 85, demand: 90, gap: 15 },
    { skill: 'AWS', current: 60, market: 70, demand: 95, gap: 35 },
    { skill: 'Docker', current: 70, market: 75, demand: 85, gap: 15 },
    { skill: 'GraphQL', current: 65, market: 60, demand: 75, gap: 10 },
    { skill: 'System Design', current: 60, market: 75, demand: 90, gap: 30 },
  ];

  const skillTrendsData = [
    { month: 'Jan', technical: 75, soft: 70, leadership: 60 },
    { month: 'Feb', technical: 78, soft: 72, leadership: 62 },
    { month: 'Mar', technical: 80, soft: 75, leadership: 65 },
    { month: 'Apr', technical: 82, soft: 77, leadership: 68 },
    { month: 'May', technical: 85, soft: 80, leadership: 70 },
    { month: 'Jun', technical: 85, soft: 80, leadership: 70 },
  ];

  const emergingSkillsData = [
    { skill: 'AI/ML', demand: 95, growth: 45, currentLevel: 30, priority: 'high' },
    { skill: 'Blockchain', demand: 70, growth: 35, currentLevel: 20, priority: 'medium' },
    { skill: 'Edge Computing', demand: 80, growth: 40, currentLevel: 25, priority: 'high' },
    { skill: 'WebAssembly', demand: 60, growth: 25, currentLevel: 15, priority: 'low' },
    { skill: 'Quantum Computing', demand: 50, growth: 30, currentLevel: 10, priority: 'low' },
  ];

  const competencyMatrix = [
    { subject: 'Frontend', A: 90, B: 85, fullMark: 100 },
    { subject: 'Backend', A: 80, B: 90, fullMark: 100 },
    { subject: 'DevOps', A: 65, B: 85, fullMark: 100 },
    { subject: 'Mobile', A: 45, B: 70, fullMark: 100 },
    { subject: 'Data Science', A: 40, B: 80, fullMark: 100 },
    { subject: 'Security', A: 55, B: 75, fullMark: 100 },
  ];

  const learningRecommendations = [
    {
      skill: 'AWS Cloud Architecture',
      priority: 'High',
      timeInvestment: '40 hours',
      expectedROI: '25% salary increase',
      courses: ['AWS Solutions Architect', 'Cloud Practitioner'],
      difficulty: 'Intermediate',
    },
    {
      skill: 'System Design',
      priority: 'High',
      timeInvestment: '60 hours',
      expectedROI: 'Senior role eligibility',
      courses: ['Grokking System Design', 'Database Fundamentals'],
      difficulty: 'Advanced',
    },
    {
      skill: 'Machine Learning',
      priority: 'Medium',
      timeInvestment: '80 hours',
      expectedROI: 'New career opportunities',
      courses: ['ML Fundamentals', 'TensorFlow Basics'],
      difficulty: 'Intermediate',
    },
  ];

  const skillMarketValue = [
    { skill: 'React', salary: 95000, demand: 95, supply: 80 },
    { skill: 'Python', salary: 105000, demand: 90, supply: 70 },
    { skill: 'AWS', salary: 115000, demand: 95, supply: 60 },
    { skill: 'ML/AI', salary: 125000, demand: 98, supply: 40 },
    { skill: 'DevOps', salary: 110000, demand: 85, supply: 65 },
    { skill: 'System Design', salary: 120000, demand: 90, supply: 45 },
  ];

  return (
    <div className="space-y-6">
      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">Above market level</div>
            <Badge variant="default">Strong</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Skill Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Critical areas</div>
            <Badge variant="destructive">Needs Attention</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <div className="text-sm text-muted-foreground">This quarter</div>
            <Badge variant="default">On Track</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Relevance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <div className="text-sm text-muted-foreground">Skills alignment</div>
            <Badge variant="default">Excellent</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Skills vs Market Demand */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Proficiency vs Market Demand</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={skillProficiencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current" fill="#8884d8" name="Your Level" />
              <Bar dataKey="market" fill="#82ca9d" name="Market Average" />
              <Bar dataKey="demand" fill="#ffc658" name="Market Demand" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competency Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Competency Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={competencyMatrix}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Your Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Radar name="Market Leaders" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Market Value</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={skillMarketValue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="demand" name="Market Demand" />
                <YAxis dataKey="salary" name="Average Salary" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Skills" data={skillMarketValue} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Emerging Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-chart-1" />
            Emerging Skills to Watch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergingSkillsData.map((skill, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{skill.skill}</div>
                  <Badge variant={skill.priority === 'high' ? 'default' : skill.priority === 'medium' ? 'secondary' : 'outline'}>
                    {skill.priority}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Demand:</span>
                    <span>{skill.demand}%</span>
                  </div>
                  <Progress value={skill.demand} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Growth Rate:</span>
                    <span className="text-green-600">+{skill.growth}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Your Level:</span>
                    <span>{skill.currentLevel}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-chart-2" />
            Personalized Learning Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-lg">{rec.skill}</div>
                    <div className="text-sm text-muted-foreground">Expected ROI: {rec.expectedROI}</div>
                  </div>
                  <Badge variant={rec.priority === 'High' ? 'default' : 'secondary'}>
                    {rec.priority} Priority
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Time Investment</div>
                    <div className="text-muted-foreground">{rec.timeInvestment}</div>
                  </div>
                  <div>
                    <div className="font-medium">Difficulty</div>
                    <div className="text-muted-foreground">{rec.difficulty}</div>
                  </div>
                  <div>
                    <div className="font-medium">Recommended Courses</div>
                    <div className="space-y-1">
                      {rec.courses.map((course, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    Start Learning Path
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Development Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Development Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="technical" fill="#8884d8" name="Technical Skills" />
              <Bar dataKey="soft" fill="#82ca9d" name="Soft Skills" />
              <Bar dataKey="leadership" fill="#ffc658" name="Leadership" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skills Action Plan */}
      <Card className="border-chart-3 bg-gradient-to-r from-chart-3/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-chart-3" />
            90-Day Skills Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Month 1: Foundation</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>Complete AWS Cloud Practitioner</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>Start System Design course</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>Practice coding problems</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Month 2: Intermediate</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>AWS Solutions Architect prep</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>Build scalable system project</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>ML fundamentals course</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Month 3: Advanced</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>Take AWS certification exam</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>Complete ML project</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full" />
                  <span>Prepare portfolio showcase</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};