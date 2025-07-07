import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, History } from "lucide-react";
import { EnhancedCVResult } from "@/services/cvEnhancement";

interface EnhancementLogProps {
  enhancedResult: EnhancedCVResult;
}

const EnhancementLog = ({ enhancedResult }: EnhancementLogProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Applied Enhancements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {enhancedResult.enhancementLog.map((enhancement, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span>{enhancement}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancementLog;