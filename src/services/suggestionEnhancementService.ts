
import { Improvement } from "@/components/cv-analysis/types/analysisTypes";

export interface SuggestionCategory {
  name: string;
  priority: 'high' | 'medium' | 'low';
  suggestions: Improvement[];
}

export const suggestionCategories: SuggestionCategory[] = [
  {
    name: "Quantification",
    priority: "high",
    suggestions: [
      {
        priority: "high",
        issue: "Add specific metrics to achievements",
        suggestion: "Include numbers, percentages, dollar amounts, or timeframes to quantify your impact. For example: 'Increased sales by 25%' instead of 'Improved sales performance'"
      },
      {
        priority: "high",
        issue: "Quantify team size and scope",
        suggestion: "Specify the size of teams managed, budgets handled, or scale of projects. Example: 'Led team of 8 developers managing $2M budget' rather than 'managed team and budget'"
      },
      {
        priority: "medium",
        issue: "Add timeline context to achievements",
        suggestion: "Include specific timeframes for accomplishments to show efficiency. Example: 'Reduced processing time by 40% within 6 months' instead of 'improved efficiency'"
      }
    ]
  },
  {
    name: "Keywords",
    priority: "high", 
    suggestions: [
      {
        priority: "high",
        issue: "Incorporate industry-specific terminology",
        suggestion: "Add relevant technical skills, software, methodologies, and industry buzzwords that appear in job descriptions for your target role"
      },
      {
        priority: "medium",
        issue: "Include relevant certifications and technologies",
        suggestion: "Mention specific tools, platforms, programming languages, or certifications that are valued in your industry"
      },
      {
        priority: "medium",
        issue: "Optimize skills section with trending keywords",
        suggestion: "Research current job postings to identify high-demand skills and incorporate them naturally throughout your resume"
      }
    ]
  },
  {
    name: "Action Verbs",
    priority: "medium",
    suggestions: [
      {
        priority: "medium",
        issue: "Replace weak verbs with powerful action words",
        suggestion: "Replace 'responsible for' with strong verbs like 'spearheaded', 'optimized', 'implemented', 'delivered', 'orchestrated', or 'transformed'"
      },
      {
        priority: "medium",
        issue: "Diversify action verb usage",
        suggestion: "Use varied action verbs throughout your resume to avoid repetition and maintain reader engagement. Create a dynamic narrative of your career progression"
      }
    ]
  },
  {
    name: "Achievement Focus",
    priority: "high",
    suggestions: [
      {
        priority: "high",
        issue: "Transform responsibilities into achievements",
        suggestion: "Rewrite job duties to focus on results and outcomes rather than daily tasks. Use the CAR method: Challenge, Action, Result"
      },
      {
        priority: "high",
        issue: "Highlight problem-solving impact",
        suggestion: "Describe specific problems you solved, methods used, and measurable outcomes achieved. Show your value to potential employers"
      },
      {
        priority: "medium",
        issue: "Emphasize career progression and growth",
        suggestion: "Highlight promotions, increased responsibilities, and expanding scope of work to demonstrate career advancement and potential"
      }
    ]
  },
  {
    name: "Industry Alignment",
    priority: "medium",
    suggestions: [
      {
        priority: "medium",
        issue: "Tailor content to target industry",
        suggestion: "Adjust language, examples, and emphasis to align with your target industry's priorities, challenges, and terminology"
      },
      {
        priority: "medium",
        issue: "Highlight relevant cross-functional experience",
        suggestion: "Emphasize transferable skills and experiences that apply to your target role, even if from different industries"
      }
    ]
  },
  {
    name: "Formatting",
    priority: "low",
    suggestions: [
      {
        priority: "low",
        issue: "Ensure ATS-friendly formatting",
        suggestion: "Use standard section headings, avoid tables/graphics, use consistent bullet points, and maintain clear hierarchy with appropriate fonts"
      },
      {
        priority: "low",
        issue: "Optimize white space and readability",
        suggestion: "Ensure adequate margins, consistent spacing, and logical flow. Use bold text strategically for section headers and company names"
      }
    ]
  }
];

export const enhanceSuggestions = (
  existingSuggestions: Improvement[], 
  targetCount: number = 20,
  industry?: string
): Improvement[] => {
  if (existingSuggestions.length >= targetCount) {
    return existingSuggestions;
  }

  const enhancedSuggestions = [...existingSuggestions];
  const neededSuggestions = targetCount - existingSuggestions.length;
  
  // Flatten all category suggestions
  const allFallbackSuggestions = suggestionCategories.flatMap(category => 
    category.suggestions.map(suggestion => ({
      ...suggestion,
      category: category.name.toLowerCase()
    }))
  );

  // Add suggestions prioritizing high-impact areas first
  const priorityOrder = ['high', 'medium', 'low'];
  
  for (const priority of priorityOrder) {
    const prioritySuggestions = allFallbackSuggestions.filter(
      s => s.priority === priority && !existingSuggestions.some(
        existing => existing.issue === s.issue
      )
    );
    
    const remainingNeeded = targetCount - enhancedSuggestions.length;
    if (remainingNeeded <= 0) break;
    
    enhancedSuggestions.push(...prioritySuggestions.slice(0, remainingNeeded));
  }

  console.log(`Enhanced suggestions from ${existingSuggestions.length} to ${enhancedSuggestions.length}`);
  
  return enhancedSuggestions.slice(0, targetCount);
};

export const categorizeSuggestions = (suggestions: Improvement[]) => {
  return suggestions.reduce((categories, suggestion) => {
    const priority = suggestion.priority;
    if (!categories[priority]) {
      categories[priority] = [];
    }
    categories[priority].push(suggestion);
    return categories;
  }, {} as Record<string, Improvement[]>);
};

export const getSuggestionStats = (suggestions: Improvement[]) => {
  const categorized = categorizeSuggestions(suggestions);
  return {
    total: suggestions.length,
    high: categorized.high?.length || 0,
    medium: categorized.medium?.length || 0,
    low: categorized.low?.length || 0,
    hasMinimumCoverage: suggestions.length >= 15
  };
};
