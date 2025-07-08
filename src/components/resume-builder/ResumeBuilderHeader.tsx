import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ResumeBuilderHeaderProps {
  onBack?: () => void;
  backLabel?: string;
  showHomeLink?: boolean;
}

const ResumeBuilderHeader = ({ onBack, backLabel = "Back", showHomeLink = false }: ResumeBuilderHeaderProps) => {
  return (
    <div className="glass-card border-b border-border/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {showHomeLink ? (
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          ) : onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Button>
          ) : null}
          <div className="text-2xl font-bold gradient-text">ResumeAI</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderHeader;