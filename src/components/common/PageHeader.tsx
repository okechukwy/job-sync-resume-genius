import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface PageHeaderProps {
  backLabel?: string;
  onCustomBack?: () => void;
  showBackButton?: boolean;
}

export const PageHeader = ({ 
  backLabel = "Back", 
  onCustomBack, 
  showBackButton = true 
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (onCustomBack) {
      onCustomBack();
    } else {
      // Check if we have history to go back to
      if (window.history.length > 1 && location.key !== "default") {
        navigate(-1);
      } else {
        // Fallback to home if no history
        navigate("/");
      }
    }
  };

  return (
    <div className="glass-card border-b border-border/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Button>
          )}
          <div className="text-2xl font-bold gradient-text">ResumeAI</div>
        </div>
      </div>
    </div>
  );
};