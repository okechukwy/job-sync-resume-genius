import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "react-router-dom";

interface ResumeBuilderHeaderProps {
  onBack?: () => void;
  backLabel?: string;
  showHomeLink?: boolean;
}

const ResumeBuilderHeader = ({ onBack, backLabel = "Back", showHomeLink = false }: ResumeBuilderHeaderProps) => {
  const customBack = showHomeLink ? () => window.location.href = "/" : onBack;
  
  return (
    <PageHeader 
      backLabel={showHomeLink ? "Back to Home" : backLabel}
      onCustomBack={customBack}
    />
  );
};

export default ResumeBuilderHeader;