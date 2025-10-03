import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle2,
  Clock,
  Filter,
  BarChart3,
  Brain,
  Zap,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PersonalizedInsight {
  id: string;
  title: string;
  content: string;
  category: string;
  insight_type: string;
  priority: string;
  is_read: boolean;
  created_at: string;
  expires_at: string | null;
  metadata: any;
}

interface InsightsSectionProps {
  insights: PersonalizedInsight[];
  onMarkAsRead: (insightId: string) => void;
  isMarkingAsRead?: boolean;
}

export const InsightsSection = ({ 
  insights, 
  onMarkAsRead,
  isMarkingAsRead 
}: InsightsSectionProps) => {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [showRead, setShowRead] = useState<boolean>(false);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'strengths':
      case 'achievement':
        return <Award className="h-5 w-5 text-yellow-500" />;
      case 'growth areas':
      case 'development':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'opportunities':
      case 'career':
        return <Lightbulb className="h-5 w-5 text-green-500" />;
      case 'market trends':
      case 'industry':
        return <BarChart3 className="h-5 w-5 text-purple-500" />;
      case 'skills':
        return <Brain className="h-5 w-5 text-indigo-500" />;
      case 'goals':
        return <Target className="h-5 w-5 text-orange-500" />;
      default:
        return <Zap className="h-5 w-5 text-primary" />;
    }
  };

  // Get priority badge variant
  const getPriorityVariant = (priority: string): "default" | "destructive" | "secondary" | "outline" => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Filter insights
  const filteredInsights = insights.filter(insight => {
    const categoryMatch = filterCategory === "all" || insight.category.toLowerCase() === filterCategory.toLowerCase();
    const priorityMatch = filterPriority === "all" || insight.priority.toLowerCase() === filterPriority.toLowerCase();
    const readMatch = showRead || !insight.is_read;
    
    return categoryMatch && priorityMatch && readMatch;
  });

  // Get unique categories and priorities
  const categories = Array.from(new Set(insights.map(i => i.category)));
  const priorities = Array.from(new Set(insights.map(i => i.priority)));

  // Count unread insights
  const unreadCount = insights.filter(i => !i.is_read).length;

  if (!insights || insights.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-4 bg-muted/30 rounded-full w-fit mx-auto mb-4">
          <Lightbulb className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Insights Yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          As you engage with your coaching programs and complete activities, 
          you'll receive personalized insights to help accelerate your career growth.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Personalized Career Insights
          </h3>
          <p className="text-muted-foreground mt-1">
            AI-powered recommendations based on your career journey
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="default" className="text-sm">
              {unreadCount} New
            </Badge>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4" />
              Filters:
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {priorities.map(pri => (
                  <SelectItem key={pri} value={pri.toLowerCase()}>{pri}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={showRead ? "default" : "outline"}
              size="sm"
              onClick={() => setShowRead(!showRead)}
              className="w-full sm:w-auto"
            >
              {showRead ? "Showing All" : "Hide Read"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInsights.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>No insights match your current filters.</p>
          </div>
        ) : (
          filteredInsights.map((insight) => (
            <Card 
              key={insight.id} 
              className={`glass-card transition-all hover:shadow-lg ${
                !insight.is_read ? 'border-primary/50' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {getCategoryIcon(insight.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-lg">{insight.title}</span>
                        {!insight.is_read && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {insight.category}
                        </Badge>
                        <Badge 
                          variant={getPriorityVariant(insight.priority)}
                          className="text-xs"
                        >
                          {insight.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {insight.content}
                </p>

                {/* Metadata section if available */}
                {insight.metadata && typeof insight.metadata === 'object' && (
                  <div className="space-y-2">
                    {insight.metadata.recommended_actions && (
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Recommended Actions:
                        </p>
                        {Array.isArray(insight.metadata.recommended_actions) ? (
                          <ul className="text-sm space-y-1 ml-6 list-disc">
                            {insight.metadata.recommended_actions.map((action: string, idx: number) => (
                              <li key={idx}>{action}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm">{insight.metadata.recommended_actions}</p>
                        )}
                      </div>
                    )}

                    {insight.metadata.impact_score && (
                      <div className="flex items-center gap-2 text-sm">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Impact Score: 
                          <span className="font-semibold ml-1">
                            {insight.metadata.impact_score}/10
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer with timestamp and action */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {format(new Date(insight.created_at), 'MMM dd, yyyy')}
                  </div>
                  
                  {!insight.is_read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onMarkAsRead(insight.id)}
                      disabled={isMarkingAsRead}
                      className="text-xs"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Mark as Read
                    </Button>
                  )}
                  
                  {insight.is_read && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      Read
                    </div>
                  )}
                </div>

                {/* Expiration warning */}
                {insight.expires_at && new Date(insight.expires_at) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                  <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 dark:bg-orange-950/20 p-2 rounded">
                    <AlertCircle className="h-3 w-3" />
                    Expires {format(new Date(insight.expires_at), 'MMM dd, yyyy')}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
