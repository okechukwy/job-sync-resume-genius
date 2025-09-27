
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, jobDescription, industry = 'Business' } = await req.json();
    
    if (!resumeText) {
      throw new Error('Resume text is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Starting comprehensive ATS optimization for industry:', industry);

    // Enhanced prompt for comprehensive optimization
    const systemPrompt = `You are an expert ATS optimization specialist and career coach. Provide comprehensive resume optimization with MINIMUM 15-25 content improvements across ALL sections.

CRITICAL REQUIREMENTS:
1. MINIMUM 15-25 content optimizations (target 20-30 for thorough analysis)
2. Systematic coverage of ALL improvement categories:
   - Quantification improvements (4-6 suggestions)
   - Keyword optimization (4-5 suggestions)
   - Action verb enhancement (3-4 suggestions)
   - Achievement focus (4-5 suggestions)
   - Industry alignment (3-4 suggestions)
   - Formatting/structure improvements (2-3 suggestions)

3. Analyze EVERY resume section independently:
   - Professional Summary (2-3 improvements)
   - Experience section (3-4 improvements per job)
   - Skills section (2-3 improvements)
   - Education section (1-2 improvements)
   - Additional sections (certifications, projects, etc.)

4. Each contentOptimization must include:
   - Specific section identification
   - Current text example
   - Improved version with concrete enhancements
   - Detailed reasoning for the change
   - Category classification

5. Provide comprehensive keyword analysis
6. Include format optimizations for ATS compatibility

Return ONLY valid JSON with this structure:

{
  "atsScore": number (0-100),
  "keywordMatches": {
    "found": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "missing": ["missing1", "missing2", "missing3", "missing4", "missing5"],
    "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
  },
  "formatOptimizations": [
    {
      "issue": "format issue description",
      "recommendation": "specific format improvement",
      "priority": "high|medium|low"
    }
  ],
  "contentOptimizations": [
    {
      "section": "specific section name",
      "current": "current text example",
      "improved": "enhanced version with specific improvements",
      "reasoning": "detailed explanation of why this improvement helps",
      "category": "quantification|keywords|action-verbs|achievement|industry-alignment|formatting"
    }
  ],
  "overallRecommendations": [
    "comprehensive recommendation 1",
    "comprehensive recommendation 2",
    "comprehensive recommendation 3"
  ]
}

MANDATORY: Your contentOptimizations array MUST contain at least 15-25 items covering all sections and categories.`;

    const userPrompt = jobDescription 
      ? `Optimize this resume for ATS compatibility and the following job description. Provide MINIMUM 15-25 comprehensive content improvements:\n\nJob Description:\n${jobDescription}\n\nResume:\n${resumeText}`
      : `Optimize this resume for ATS compatibility in the ${industry} industry. Provide MINIMUM 15-25 comprehensive content improvements:\n\nResume:\n${resumeText}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 8000, // Increased for comprehensive responses
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    console.log('Raw OpenAI optimization response length:', analysisText.length);

    // Parse JSON response
    let optimization;
    try {
      const jsonText = analysisText.replace(/```json\n?|\n?```/g, '').trim();
      optimization = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          optimization = JSON.parse(jsonMatch[0]);
        } catch (secondParseError) {
          throw new Error('Failed to parse AI optimization response');
        }
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    }

    // Validate and enhance if insufficient content optimizations
    if (!optimization.contentOptimizations || optimization.contentOptimizations.length < 15) {
      console.warn(`Insufficient content optimizations (${optimization.contentOptimizations?.length || 0}), enhancing...`);
      
      // Add comprehensive fallback optimizations
      const fallbackOptimizations = [
        {
          section: "Professional Summary",
          current: "Experienced professional with skills",
          improved: "Results-driven [Industry] professional with [X] years of experience delivering measurable improvements in [specific area], specializing in [key competencies]",
          reasoning: "Quantifies experience and specifies value proposition with industry keywords",
          category: "quantification"
        },
        {
          section: "Experience",
          current: "Responsible for managing team",
          improved: "Led cross-functional team of 12 members, implementing process improvements that increased productivity by 30% and reduced operational costs by $50K annually",
          reasoning: "Transforms responsibility into quantified achievement with specific metrics and financial impact",
          category: "achievement"
        },
        {
          section: "Experience",
          current: "Worked on projects",
          improved: "Spearheaded 5 high-priority projects simultaneously, delivering all initiatives on time and 15% under budget while maintaining 98% stakeholder satisfaction",
          reasoning: "Replaces weak language with strong action verbs and adds specific quantifiable results",
          category: "action-verbs"
        },
        {
          section: "Skills",
          current: "Microsoft Office, Communication",
          improved: "Advanced proficiency in Microsoft Office Suite (Excel, PowerPoint, Word), stakeholder communication, cross-functional collaboration, project management",
          reasoning: "Expands generic skills with specific tools and adds industry-relevant competencies",
          category: "keywords"
        },
        {
          section: "Experience",
          current: "Helped improve processes",
          improved: "Optimized workflow processes through data analysis and stakeholder feedback, resulting in 25% reduction in processing time and improved team efficiency",
          reasoning: "Demonstrates proactive problem-solving with measurable outcomes and methodology",
          category: "quantification"
        }
      ];

      if (!optimization.contentOptimizations) {
        optimization.contentOptimizations = [];
      }
      
      const neededOptimizations = 15 - optimization.contentOptimizations.length;
      optimization.contentOptimizations = [
        ...optimization.contentOptimizations,
        ...fallbackOptimizations.slice(0, neededOptimizations)
      ];
    }

    // Ensure all required fields exist
    if (!optimization.formatOptimizations) {
      optimization.formatOptimizations = [];
    }
    if (!optimization.overallRecommendations) {
      optimization.overallRecommendations = [
        "Focus on quantifying achievements with specific metrics and percentages",
        "Incorporate industry-specific keywords throughout all sections",
        "Use strong action verbs to begin each bullet point",
        "Ensure consistent formatting and ATS-friendly structure"
      ];
    }

    console.log('Successfully completed comprehensive ATS optimization:', {
      atsScore: optimization.atsScore,
      contentOptimizations: optimization.contentOptimizations.length,
      formatOptimizations: optimization.formatOptimizations.length,
      keywordsFound: optimization.keywordMatches?.found?.length || 0,
      keywordsMissing: optimization.keywordMatches?.missing?.length || 0
    });

    return new Response(JSON.stringify(optimization), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ats-optimization function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: 'Failed to optimize resume for ATS. Please try again.'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
