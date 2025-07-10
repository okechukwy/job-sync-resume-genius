import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SkillsTips = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg">💡 Skills Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>• Include 8-12 technical skills and 5-8 soft skills maximum</p>
        <p>• Prioritize skills mentioned in job descriptions you're targeting</p>
        <p>• Be honest about your skill level - you may be asked about them in interviews</p>
        <p>• Include both hard skills (measurable) and soft skills (interpersonal)</p>
        <p>• Update skills regularly as you learn new technologies or improve existing ones</p>
      </CardContent>
    </Card>
  );
};

export default SkillsTips;