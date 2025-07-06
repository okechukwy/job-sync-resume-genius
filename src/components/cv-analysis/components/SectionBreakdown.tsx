import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { SectionScore } from "../types/analysisTypes";
import { getScoreBg } from "../utils/analysisUtils";

interface SectionBreakdownProps {
  sections: Record<string, SectionScore>;
}

const SectionBreakdown = ({ sections }: SectionBreakdownProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Section Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(sections).map(([section, data]) => (
            <div key={section} className={`p-4 rounded-lg border ${getScoreBg(data.score)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium capitalize">{section.replace('_', ' ')}</span>
                <Badge variant="outline" className="text-xs">
                  {data.score}/100
                </Badge>
              </div>
              <Progress value={data.score} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionBreakdown;