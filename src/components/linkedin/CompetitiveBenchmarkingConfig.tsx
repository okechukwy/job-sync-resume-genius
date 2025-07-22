
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LinkedInUrlScan } from "@/schemas/linkedInSchemas";

interface CompetitiveBenchmarkingConfigProps {
  control: Control<LinkedInUrlScan>;
}

export const CompetitiveBenchmarkingConfig = ({ control }: CompetitiveBenchmarkingConfigProps) => {
  const [competitorInput, setCompetitorInput] = useState("");

  const industries = [
    "Technology", "Finance", "Healthcare", "Consulting", 
    "Manufacturing", "Retail", "Education", "Real Estate",
    "Marketing", "Legal", "Non-profit", "Government"
  ];

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
      <h4 className="font-medium text-sm">Competitive Benchmarking Configuration</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="competitiveBenchmarking.targetIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Industry</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="glass-card">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="competitiveBenchmarking.experienceLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience Level</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="glass-card">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="executive">Executive Level</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="competitiveBenchmarking.geographicMarket"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Geographic Market</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="glass-card">
                    <SelectValue placeholder="Select market" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="global">Global Market</SelectItem>
                  <SelectItem value="regional">Regional Market</SelectItem>
                  <SelectItem value="local">Local Market</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="competitiveBenchmarking.competitorCompanies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Competitor Companies (Optional)</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter company name"
                    value={competitorInput}
                    onChange={(e) => setCompetitorInput(e.target.value)}
                    className="glass-card"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (competitorInput.trim()) {
                          const current = field.value || [];
                          field.onChange([...current, competitorInput.trim()]);
                          setCompetitorInput("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (competitorInput.trim()) {
                        const current = field.value || [];
                        field.onChange([...current, competitorInput.trim()]);
                        setCompetitorInput("");
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {field.value && field.value.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((company, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {company}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const current = field.value || [];
                            field.onChange(current.filter((_, i) => i !== index));
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
