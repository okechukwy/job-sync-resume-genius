import { useState, useMemo } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { StrategyDashboard } from "./StrategyDashboard";
import { StrategyCard } from "./StrategyCard";
import { StrategyFilters } from "./StrategyFilters";

interface BrandingStrategy {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  recommended_actions: Array<{
    action: string;
    timeline: string;
    difficulty: string;
    success_metrics?: string[];
  }>;
  priority: 'high' | 'medium' | 'low';
  confidence_score: number;
  metadata: {
    timeline?: string;
    difficulty?: string;
    industry_specific?: boolean;
    networking_opportunities?: string[];
    content_ideas?: string[];
    platforms?: string[];
  };
}

interface PersonalBrandingStrategiesProps {
  strategies: BrandingStrategy[];
  isLoading: boolean;
  onStartStrategy: (strategyId: string) => void;
  onDismissStrategy: (strategyId: string) => void;
}

export const PersonalBrandingStrategies = ({ 
  strategies, 
  isLoading, 
  onStartStrategy, 
  onDismissStrategy 
}: PersonalBrandingStrategiesProps) => {
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  
  // Action completion tracking
  const [actionCompletions, setActionCompletions] = useState<Record<string, Set<number>>>({});

  // Filter and sort strategies
  const filteredAndSortedStrategies = useMemo(() => {
    let filtered = strategies.filter(strategy => {
      const matchesSearch = strategy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           strategy.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === "all" || strategy.priority === priorityFilter;
      const matchesDifficulty = difficultyFilter === "all" || strategy.metadata?.difficulty === difficultyFilter;
      
      return matchesSearch && matchesPriority && matchesDifficulty;
    });

    // Sort strategies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
        case "confidence":
          return b.confidence_score - a.confidence_score;
        case "timeline":
          return (a.metadata?.timeline || "").localeCompare(b.metadata?.timeline || "");
        case "difficulty":
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          const aDiff = difficultyOrder[a.metadata?.difficulty as keyof typeof difficultyOrder] || 2;
          const bDiff = difficultyOrder[b.metadata?.difficulty as keyof typeof difficultyOrder] || 2;
          return aDiff - bDiff;
        default:
          return 0;
      }
    });

    return filtered;
  }, [strategies, searchQuery, priorityFilter, difficultyFilter, sortBy]);

  // Calculate metrics
  const totalActions = strategies.reduce((sum, strategy) => sum + (strategy.recommended_actions?.length || 0), 0);
  const completedActions = Object.values(actionCompletions).reduce((sum, set) => sum + set.size, 0);
  const overallProgress = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  const hasActiveFilters = searchQuery !== "" || priorityFilter !== "all" || difficultyFilter !== "all";

  const handleActionComplete = (strategyId: string, actionIndex: number, completed: boolean) => {
    setActionCompletions(prev => {
      const newCompletions = { ...prev };
      if (!newCompletions[strategyId]) {
        newCompletions[strategyId] = new Set();
      }
      
      if (completed) {
        newCompletions[strategyId].add(actionIndex);
      } else {
        newCompletions[strategyId].delete(actionIndex);
      }
      
      return newCompletions;
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriorityFilter("all");
    setDifficultyFilter("all");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Personal Branding Strategies</h3>
        </div>
        
        {/* Loading dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
        
        {/* Loading strategies */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-2 w-48" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 mb-2" />
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!strategies || strategies.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Personal Branding Strategies</h3>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-8 w-8 text-primary" />
          </div>
          <h4 className="text-lg font-semibold mb-2">No Strategies Generated Yet</h4>
          <Alert className="max-w-md mx-auto">
            <AlertDescription>
              Complete your brand builder form and submit it to generate personalized branding strategies based on your unique profile and career goals.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Personal Branding Strategies</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {strategies.length} Strategies Generated
          </Badge>
          {overallProgress > 0 && (
            <Badge variant="secondary">
              {overallProgress}% Complete
            </Badge>
          )}
        </div>
      </div>

      {/* Dashboard Overview */}
      <StrategyDashboard
        strategies={strategies}
        completedActions={completedActions}
        totalActions={totalActions}
        overallProgress={overallProgress}
      />

      {/* Filters */}
      <StrategyFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        difficultyFilter={difficultyFilter}
        onDifficultyChange={setDifficultyFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Strategy Cards */}
      {filteredAndSortedStrategies.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="text-lg font-semibold mb-2">No strategies match your filters</h4>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          {hasActiveFilters && (
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-muted"
              onClick={clearFilters}
            >
              Clear all filters
            </Badge>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAndSortedStrategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              onStartStrategy={onStartStrategy}
              onDismissStrategy={onDismissStrategy}
              onActionComplete={handleActionComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};