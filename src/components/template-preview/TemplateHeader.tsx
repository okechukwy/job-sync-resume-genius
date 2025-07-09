import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/common/PageHeader";

interface TemplateHeaderProps {
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  badgeText: string;
}

export const TemplateHeader = ({ emoji, title, description, tags, badgeText }: TemplateHeaderProps) => {
  return (
    <>
      <PageHeader />

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