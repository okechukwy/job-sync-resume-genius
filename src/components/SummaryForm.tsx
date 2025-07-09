import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { summarySchema, SummaryFormData } from "@/schemas/resumeFormSchemas";

interface Summary {
  content: string;
}

interface SummaryFormProps {
  data: Summary;
  onUpdate: (data: Summary) => void;
  onValidationChange: (isValid: boolean) => void;
  industry?: string;
}

const SummaryForm = ({ data, onUpdate, onValidationChange, industry }: SummaryFormProps) => {
  const form = useForm<SummaryFormData>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      content: data.content || '',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const formData = value as Summary;
      onUpdate(formData);
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdate]);

  useEffect(() => {
    onValidationChange(form.formState.isValid);
  }, [form.formState.isValid, onValidationChange]);

  const getIndustryTips = () => {
    const commonTips = [
      "• Start with your job title and years of experience",
      "• Highlight your most relevant skills and achievements",
      "• Keep it concise but compelling (2-4 sentences)",
      "• Use action words and quantify results when possible"
    ];

    const industrySpecificTips: Record<string, string[]> = {
      "Technology": [
        "• Mention specific programming languages or technologies",
        "• Highlight problem-solving and innovation capabilities",
        "• Include experience with development methodologies"
      ],
      "Healthcare": [
        "• Emphasize patient care and clinical experience",
        "• Mention certifications and specializations",
        "• Highlight communication and empathy skills"
      ],
      "Finance": [
        "• Quantify financial achievements with numbers",
        "• Mention analytical and risk management skills",
        "• Include relevant certifications (CPA, CFA, etc.)"
      ],
      "Marketing": [
        "• Highlight campaign successes and ROI improvements",
        "• Mention digital marketing and analytics experience",
        "• Showcase creative and strategic thinking"
      ],
      "Education": [
        "• Emphasize teaching philosophy and student outcomes",
        "• Mention curriculum development experience",
        "• Highlight communication and mentoring skills"
      ]
    };

    return industry && industrySpecificTips[industry] 
      ? [...commonTips, ...industrySpecificTips[industry]]
      : commonTips;
  };

  const characterCount = form.watch("content")?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
        <p className="text-muted-foreground mb-6">
          Write a compelling summary that highlights your key qualifications and career goals. 
          This appears at the top of your resume and is often the first thing employers read.
        </p>
      </div>

      <Form {...form}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Results-driven professional with [X] years of experience in [your field]. Proven track record of [key achievement] and expertise in [relevant skills]. Seeking to leverage [your strengths] to drive success at [target company type]."
                  className="glass-card min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormMessage />
                <span className={`text-xs ${
                  characterCount < 50 ? 'text-destructive' : 
                  characterCount > 500 ? 'text-destructive' : 
                  'text-muted-foreground'
                }`}>
                  {characterCount}/500 characters (minimum 50)
                </span>
              </div>
            </FormItem>
          )}
        />
      </Form>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">💡 Summary Writing Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {getIndustryTips().map((tip, index) => (
            <p key={index}>{tip}</p>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-primary">✨ Example Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p className="italic">
            "Experienced Software Engineer with 5+ years developing scalable web applications. 
            Led cross-functional teams to deliver projects 20% ahead of schedule while reducing bugs by 40%. 
            Expertise in React, Node.js, and cloud technologies. Seeking to leverage technical leadership skills 
            to drive innovation at a growth-stage technology company."
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryForm;