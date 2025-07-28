import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Bookmark, 
  BookmarkCheck,
  PlayCircle, 
  Filter,
  TrendingUp,
  Star,
  MessageSquare,
  Brain,
  Target,
  Users,
  Briefcase
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  category: 'behavioral' | 'technical' | 'situational' | 'leadership' | 'industry-specific';
  difficulty: 'easy' | 'medium' | 'hard';
  industry: string[];
  role: string[];
  tags: string[];
  tips: string;
  sampleAnswer?: string;
  trending?: boolean;
  bookmarked?: boolean;
}

interface QuestionBankSectionProps {
  onStartPractice: (sessionType: string, roleFocus: string, specificQuestion?: Question) => void;
  onStartBookmarkedPractice: (bookmarkedQuestions: Question[]) => void;
}

const QuestionBankSection = ({ onStartPractice, onStartBookmarkedPractice }: QuestionBankSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(new Set());
  const [activeView, setActiveView] = useState("browse");

  const questionBank: Question[] = [
    // Essential Interview Questions
    {
      id: 'essential-1',
      text: 'Tell me about yourself.',
      category: 'behavioral',
      difficulty: 'easy',
      industry: ['Technology', 'Business', 'Healthcare', 'Finance', 'Marketing', 'Operations'],
      role: ['All Roles'],
      tags: ['introduction', 'personal pitch', 'elevator pitch', 'essential'],
      tips: 'Create a 2-3 minute elevator pitch covering your background, current situation, and career goals. Use the Present-Past-Future structure: where you are now, relevant experience, and what you\'re looking for next.',
      trending: true
    },
    {
      id: 'essential-2',
      text: 'Why do you want to work here?',
      category: 'behavioral',
      difficulty: 'easy',
      industry: ['Technology', 'Business', 'Healthcare', 'Finance', 'Marketing', 'Operations'],
      role: ['All Roles'],
      tags: ['company research', 'motivation', 'cultural fit', 'essential'],
      tips: 'Research the company thoroughly. Connect your values and career goals to the company\'s mission, values, and opportunities. Be specific about what excites you about this role and organization.',
      trending: true
    },
    {
      id: 'essential-3',
      text: 'What are your strengths and weaknesses?',
      category: 'behavioral',
      difficulty: 'medium',
      industry: ['Technology', 'Business', 'Healthcare', 'Finance', 'Marketing', 'Operations'],
      role: ['All Roles'],
      tags: ['self-awareness', 'personal development', 'honest reflection', 'essential'],
      tips: 'For strengths: Choose 2-3 relevant to the role with specific examples. For weaknesses: Pick a real weakness you\'re actively working to improve and explain your development plan.',
      trending: true
    },
    {
      id: 'essential-4',
      text: 'Where do you see yourself in 5 years?',
      category: 'behavioral',
      difficulty: 'medium',
      industry: ['Technology', 'Business', 'Healthcare', 'Finance', 'Marketing', 'Operations'],
      role: ['All Roles'],
      tags: ['career goals', 'ambition', 'growth mindset', 'essential'],
      tips: 'Show ambition but be realistic. Align your goals with potential growth paths at the company. Focus on skills you want to develop and impact you want to make rather than specific titles.',
      trending: true
    },
    {
      id: 'essential-5',
      text: 'Describe a challenge you overcame.',
      category: 'behavioral',
      difficulty: 'medium',
      industry: ['Technology', 'Business', 'Healthcare', 'Finance', 'Marketing', 'Operations'],
      role: ['All Roles'],
      tags: ['problem solving', 'resilience', 'STAR method', 'essential'],
      tips: 'Use the STAR method: Situation, Task, Action, Result. Choose a meaningful challenge that demonstrates problem-solving skills, resilience, and learning. Focus on your specific actions and measurable outcomes.',
      trending: true
    },
    {
      id: '1',
      text: 'Tell me about a time when you had to work with a difficult team member.',
      category: 'behavioral',
      difficulty: 'medium',
      industry: ['Technology', 'Business', 'Healthcare'],
      role: ['Manager', 'Team Lead', 'Individual Contributor'],
      tags: ['teamwork', 'conflict resolution', 'communication'],
      tips: 'Use the STAR method and focus on your actions to resolve the situation professionally.',
      trending: true
    },
    {
      id: '2',
      text: 'How would you design a URL shortening service like bit.ly?',
      category: 'technical',
      difficulty: 'hard',
      industry: ['Technology'],
      role: ['Software Engineer', 'System Architect'],
      tags: ['system design', 'scalability', 'databases'],
      tips: 'Start with requirements, discuss high-level architecture, then dive into details.',
      trending: true
    },
    {
      id: '3',
      text: 'Describe your approach to prioritizing tasks when everything seems urgent.',
      category: 'situational',
      difficulty: 'medium',
      industry: ['Business', 'Marketing', 'Operations'],
      role: ['Manager', 'Project Manager', 'Analyst'],
      tags: ['time management', 'prioritization', 'decision making'],
      tips: 'Mention specific frameworks like Eisenhower Matrix or MoSCoW method.'
    },
    {
      id: '4',
      text: 'How do you handle giving feedback to underperforming team members?',
      category: 'leadership',
      difficulty: 'hard',
      industry: ['Business', 'Technology', 'Healthcare'],
      role: ['Manager', 'Team Lead', 'Director'],
      tags: ['leadership', 'feedback', 'performance management'],
      tips: 'Focus on constructive feedback, specific examples, and development plans.'
    },
    {
      id: '5',
      text: 'What strategies do you use to stay current with industry trends?',
      category: 'industry-specific',
      difficulty: 'easy',
      industry: ['Technology', 'Marketing', 'Finance'],
      role: ['All Roles'],
      tags: ['continuous learning', 'industry knowledge', 'professional development'],
      tips: 'Mention specific resources, communities, and how you apply learnings.'
    },
    {
      id: '6',
      text: 'Explain a complex technical concept to a non-technical stakeholder.',
      category: 'technical',
      difficulty: 'medium',
      industry: ['Technology'],
      role: ['Software Engineer', 'Technical Lead', 'Product Manager'],
      tags: ['communication', 'technical explanation', 'stakeholder management'],
      tips: 'Use analogies and avoid jargon. Focus on business impact.'
    },
    {
      id: '7',
      text: 'Describe a time when you had to adapt to a significant change at work.',
      category: 'behavioral',
      difficulty: 'medium',
      industry: ['Business', 'Technology', 'Healthcare', 'Finance'],
      role: ['All Roles'],
      tags: ['adaptability', 'change management', 'resilience'],
      tips: 'Show flexibility and positive attitude. Highlight learning outcomes.'
    },
    {
      id: '8',
      text: 'If you discovered a critical bug in production, how would you handle it?',
      category: 'situational',
      difficulty: 'hard',
      industry: ['Technology'],
      role: ['Software Engineer', 'DevOps', 'QA Engineer'],
      tags: ['crisis management', 'problem solving', 'communication'],
      tips: 'Emphasize immediate containment, communication, and post-incident review.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Filter },
    { id: 'behavioral', name: 'Behavioral', icon: MessageSquare },
    { id: 'technical', name: 'Technical', icon: Brain },
    { id: 'situational', name: 'Situational', icon: Target },
    { id: 'leadership', name: 'Leadership', icon: Users },
    { id: 'industry-specific', name: 'Industry Specific', icon: Briefcase }
  ];

  const difficulties = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];

  const industries = [
    'all', 'Technology', 'Business', 'Healthcare', 'Finance', 'Marketing', 'Operations'
  ];

  const filteredQuestions = useMemo(() => {
    return questionBank.filter(question => {
      const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
      const matchesIndustry = selectedIndustry === 'all' || question.industry.includes(selectedIndustry);
      const matchesBookmarked = activeView !== 'bookmarked' || bookmarkedQuestions.has(question.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesIndustry && matchesBookmarked;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedIndustry, activeView, bookmarkedQuestions]);

  const trendingQuestions = questionBank.filter(q => q.trending);

  const toggleBookmark = (questionId: string) => {
    setBookmarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'behavioral': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'technical': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'situational': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'leadership': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'industry-specific': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Question Bank
        </CardTitle>
        <CardDescription>
          Comprehensive collection of interview questions with tips and insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse All</TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="bookmarked" className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4" />
              Bookmarked ({bookmarkedQuestions.size})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>
                      {industry === 'all' ? 'All Industries' : industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map(question => (
                <Card key={question.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start gap-3">
                          <h3 className="font-medium text-sm leading-relaxed">{question.text}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(question.id)}
                            className="flex-shrink-0"
                          >
                            {bookmarkedQuestions.has(question.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-primary" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={getCategoryColor(question.category)}>
                            {question.category}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          {question.trending && (
                            <Badge variant="outline" className="text-orange-600">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {question.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{question.tips}</p>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => onStartPractice(question.category, 'Business', question)}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">No questions match your filters</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="space-y-4">
              {trendingQuestions.map(question => (
                <Card key={question.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                          <h3 className="font-medium text-sm leading-relaxed">{question.text}</h3>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={getCategoryColor(question.category)}>
                            {question.category}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                        </div>

                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{question.tips}</p>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => onStartPractice(question.category, 'Business', question)}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-4">
            {bookmarkedQuestions.size > 0 ? (
              <div className="space-y-4">
                {/* Practice All Bookmarked Button */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">Practice All Bookmarked Questions</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Start a comprehensive session with all {bookmarkedQuestions.size} bookmarked questions
                        </p>
                      </div>
                      <Button
                        size="default"
                        onClick={() => {
                          const bookmarked = questionBank.filter(q => bookmarkedQuestions.has(q.id));
                          onStartBookmarkedPractice(bookmarked);
                        }}
                        className="ml-4"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Practice All ({bookmarkedQuestions.size})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {questionBank.filter(q => bookmarkedQuestions.has(q.id)).map(question => (
                  <Card key={question.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            <BookmarkCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <h3 className="font-medium text-sm leading-relaxed">{question.text}</h3>
                          </div>
                          
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className={getCategoryColor(question.category)}>
                              {question.category}
                            </Badge>
                            <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                          </div>
                        </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onStartPractice(question.category, 'Business', question)}
                          >
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Practice This Question
                          </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">No bookmarked questions yet</p>
                <p className="text-sm text-muted-foreground">Bookmark questions while browsing to save them here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuestionBankSection;