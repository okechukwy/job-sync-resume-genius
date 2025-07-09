import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const TemplateActions = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/get-started">
          <Button variant="hero" size="lg" className="min-w-48">
            <FileText className="w-4 h-4 mr-2" />
            Use This Template
          </Button>
        </Link>
        <Button variant="glass" size="lg" className="min-w-48">
          <Download className="w-4 h-4 mr-2" />
          Download Sample
        </Button>
      </div>
      <p className="text-sm text-contrast-medium">
        Free to use • No credit card required
      </p>
    </div>
  );
};