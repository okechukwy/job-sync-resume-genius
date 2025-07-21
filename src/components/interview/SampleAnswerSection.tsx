import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Lightbulb, Target, BookOpen } from 'lucide-react';
import { SampleAnswer } from '@/hooks/useAIInterview';

interface SampleAnswerSectionProps {
  sampleAnswer: SampleAnswer;
  isLoading?: boolean;
}

const SampleAnswerSection: React.FC<SampleAnswerSectionProps> = ({ 
  sampleAnswer, 
  isLoading = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Sample Answer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-muted">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Sample Answer
                <Badge variant="secondary" className="ml-2">
                  AI Generated
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Main Sample Answer */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm leading-relaxed">{sampleAnswer.sampleAnswer}</p>
              </div>

              {/* Answer Structure */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Answer Structure</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {sampleAnswer.structure}
                </p>
              </div>

              {/* Key Points */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Key Points</span>
                </div>
                <ul className="ml-6 space-y-1">
                  {sampleAnswer.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Tips</span>
                </div>
                <ul className="ml-6 space-y-1">
                  {sampleAnswer.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reasoning */}
              <div className="space-y-2">
                <span className="font-medium text-sm">Why This Answer Works</span>
                <p className="text-sm text-muted-foreground">
                  {sampleAnswer.reasoning}
                </p>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default SampleAnswerSection;