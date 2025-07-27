import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  CheckCircle, 
  PlayCircle, 
  BookOpen, 
  Target, 
  Users, 
  MessageSquare,
  TrendingUp,
  Clock,
  Star
} from "lucide-react";

interface GuideSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  items: string[];
  tips: string[];
  practiceLink?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  completed?: boolean;
}

interface InterviewGuideSectionProps {
  onStartPractice: (sessionType: string, roleFocus: string) => void;
}

const InterviewGuideSection = ({ onStartPractice }: InterviewGuideSectionProps) => {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['behavioral']));

  const guideSections: GuideSection[] = [
    {
      id: 'behavioral',
      title: 'Behavioral Questions & STAR Method',
      icon: MessageSquare,
      description: 'Master the STAR method for behavioral questions',
      difficulty: 'beginner',
      estimatedTime: '15 min',
      items: [
        'Tell me about yourself - craft your elevator pitch',
        'Why do you want to work here? - research and personalize',
        'What are your strengths and weaknesses? - be authentic and strategic',
        'Where do you see yourself in 5 years? - align with company goals',
        'Describe a challenge you overcame - use STAR method'
      ],
      tips: [
        'Use the STAR method: Situation, Task, Action, Result',
        'Prepare 3-5 specific examples from your experience',
        'Focus on your role and specific actions you took',
        'Quantify results when possible'
      ],
      practiceLink: 'behavioral'
    },
    {
      id: 'technical',
      title: 'Technical Interview Preparation',
      icon: Target,
      description: 'Technical skills and problem-solving questions',
      difficulty: 'intermediate',
      estimatedTime: '25 min',
      items: [
        'Review fundamental concepts in your field',
        'Practice coding problems on platforms like LeetCode',
        'Prepare for system design questions (senior roles)',
        'Be ready to walk through your portfolio/projects',
        'Practice explaining complex concepts simply'
      ],
      tips: [
        'Think out loud during problem-solving',
        'Start with clarifying questions',
        'Break down complex problems into smaller parts',
        'Test your solution with examples'
      ],
      practiceLink: 'technical'
    },
    {
      id: 'situational',
      title: 'Situational & Case Study Questions',
      icon: Users,
      description: 'Problem-solving scenarios and hypothetical situations',
      difficulty: 'intermediate',
      estimatedTime: '20 min',
      items: [
        'How would you handle conflict with a teammate?',
        'Describe how you would prioritize competing deadlines',
        'What would you do if you disagreed with your manager?',
        'How would you approach a project with unclear requirements?',
        'Describe your ideal team environment'
      ],
      tips: [
        'Consider multiple perspectives',
        'Show your problem-solving process',
        'Demonstrate leadership and collaboration skills',
        'Reference past experiences when relevant'
      ],
      practiceLink: 'situational'
    },
    {
      id: 'questions',
      title: 'Questions to Ask Your Interviewer',
      icon: BookOpen,
      description: 'Strategic questions that show your interest and preparation',
      difficulty: 'beginner',
      estimatedTime: '10 min',
      items: [
        'What does success look like in this role?',
        'What are the biggest challenges facing the team?',
        'How do you measure performance and provide feedback?',
        'What opportunities are there for growth and development?',
        'What do you enjoy most about working here?'
      ],
      tips: [
        'Prepare 5-7 thoughtful questions',
        'Avoid questions about salary or benefits in first interview',
        'Research the company and role beforehand',
        'Listen for opportunities to ask follow-up questions'
      ]
    },
    {
      id: 'followup',
      title: 'Post-Interview Follow-Up Strategies',
      icon: TrendingUp,
      description: 'Maximize your chances after the interview',
      difficulty: 'advanced',
      estimatedTime: '12 min',
      items: [
        'Send a thank-you email within 24 hours',
        'Reference specific points discussed in the interview',
        'Reiterate your interest and qualifications',
        'Provide any additional information requested',
        'Follow up appropriately if you don\'t hear back'
      ],
      tips: [
        'Personalize each thank-you note for multiple interviewers',
        'Keep the email concise but meaningful',
        'Include any relevant information you forgot to mention',
        'Maintain professional tone throughout follow-up process'
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const markAsCompleted = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  const progressPercentage = Math.round((completedSections.size / guideSections.length) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Complete Interview Preparation Guide
            </CardTitle>
            <CardDescription>
              Everything you need to ace your next interview
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
        <Progress value={progressPercentage} className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-4">
        {guideSections.map((section) => {
          const IconComponent = section.icon;
          const isExpanded = expandedSections.has(section.id);
          const isCompleted = completedSections.has(section.id);

          return (
            <Collapsible
              key={section.id}
              open={isExpanded}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <div>
                          <h3 className="font-semibold">{section.title}</h3>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getDifficultyColor(section.difficulty)}>
                          {section.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {section.estimatedTime}
                        </Badge>
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-2">
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Points:</h4>
                      <div className="space-y-2">
                        {section.items.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Pro Tips:</h4>
                      <div className="space-y-2">
                        {section.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsCompleted(section.id)}
                        disabled={isCompleted}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          'Mark as Complete'
                        )}
                      </Button>
                      
                      {section.practiceLink && (
                        <Button
                          onClick={() => onStartPractice(section.practiceLink!, 'Business')}
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Practice Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default InterviewGuideSection;