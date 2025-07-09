import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TemplateHeaderProps {
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  badgeText: string;
}

export const TemplateHeader = ({ emoji, title, description, tags, badgeText }: TemplateHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="glass-card border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-2xl font-bold gradient-text">ResumeAI</div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <div className="text-6xl mb-4 animate-bounce-subtle">{emoji}</div>
        <Badge variant="secondary" className="mb-4 glass-card hover-lift animate-fade-in">
          {badgeText}
        </Badge>
        <h1 className="typography-display mb-6 animate-fade-in">
          {title}{" "}
          <span className="gradient-text">Resume</span>
        </h1>
        <p className="typography-body max-w-2xl mx-auto animate-fade-in text-contrast-medium">
          {description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="hover-scale">{tag}</Badge>
          ))}
        </div>
      </div>
    </>
  );
};