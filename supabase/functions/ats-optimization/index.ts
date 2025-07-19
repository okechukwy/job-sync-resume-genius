
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
    console.log('ATS optimization request received:', req.method);
    
    // Add safer JSON parsing with validation
    let requestBody;
    try {
      const rawBody = await req.text();
      console.log('Raw request body received, length:', rawBody?.length || 0);
      
      if (!rawBody || rawBody.trim() === '') {
        throw new Error('Empty request body');
      }
      
      requestBody = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request format',
          details: 'Request body must be valid JSON'
        }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { resumeText, jobDescription, industry = 'Business' } = requestBody;
    
    console.log('Parsed request data:', { 
      hasResumeText: !!resumeText, 
      resumeLength: resumeText?.length || 0,
      hasJobDescription: !!jobDescription,
      industry 
    });
    
    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(
        JSON.stringify({ 
          error: 'Insufficient resume content',
          details: 'Resume text must be at least 50 characters long'
        }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Service configuration error',
          details: 'AI service is not properly configured'
        }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Optimizing resume for ATS compatibility');

    const systemPrompt = `You are an ATS (Applicant Tracking System) optimization expert. Analyze the provided resume comprehensively and return specific recommendations to improve ATS compatibility and keyword matching.

IMPORTANT: You must provide comprehensive analysis with AT LEAST 6-8 content optimizations covering ALL major resume sections. Analyze every section thoroughly and provide specific, actionable improvements.

Return a JSON object with this structure:
{
  "atsScore": number (0-100),
  "keywordMatches": {
    "found": [array of matched keywords],
    "missing": [array of missing important keywords],
    "suggestions": [array of keyword optimization suggestions]
  },
  "formatOptimizations": [
    {
      "issue": "specific formatting issue",
      "recommendation": "how to fix it",
      "priority": "high|medium|low"
    }
  ],
  "contentOptimizations": [
    {
      "section": "which section to improve",
      "current": "current text sample",
      "improved": "optimized version",
      "reasoning": "why this is better for ATS",
      "category": "quantification|keywords|action-verbs|achievement|industry-alignment|formatting"
    }
  ],
  "overallRecommendations": [
    "specific actionable recommendations"
  ]
}

COMPREHENSIVE ANALYSIS REQUIREMENTS:
1. **Professional Summary/Objective**: Analyze for keyword density, industry relevance, and impact
2. **Experience Section**: Look for quantifiable achievements, action verbs, keyword optimization, and industry terminology
3. **Skills Section**: Check for relevant technical and soft skills, ATS-friendly formatting
4. **Education Section**: Verify proper formatting and relevant certifications
5. **Achievement Highlighting**: Identify opportunities to add metrics and quantifiable results
6. **Industry Alignment**: Ensure terminology matches industry standards and job requirements

CONTENT OPTIMIZATION CATEGORIES TO INCLUDE:
- **Quantification**: Add specific numbers, percentages, metrics to achievements
- **Keywords**: Integrate relevant industry and job-specific keywords naturally
- **Action Verbs**: Replace weak verbs with strong, impactful action words
- **Achievement**: Transform responsibilities into achievement-focused statements
- **Industry Alignment**: Use industry-standard terminology and practices
- **Formatting**: Improve ATS readability and structure

Focus on:
- Keyword density and relevance matching job description
- ATS-friendly formatting and structure
- Section organization and hierarchy
- Industry-specific terminology integration
- Quantifiable achievements and impact metrics
- Action verb optimization and variety
- Professional language enhancement
- Skills alignment with job requirements

Provide AT LEAST 6-8 diverse content optimizations covering different sections and categories.`;

    let userPrompt = `Analyze this resume comprehensively for ATS optimization in the ${industry} industry. Provide detailed content optimizations for ALL major sections:\n\n${resumeText}`;
    
    if (jobDescription) {
      userPrompt += `\n\nTarget job description for keyword matching and alignment:\n${jobDescription}`;
    }

    console.log('Calling OpenAI API with comprehensive analysis prompt...');

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
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return new Response(
        JSON.stringify({ 
          error: 'AI service error',
          details: `Failed to process resume analysis (${response.status})`
        }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const optimizationText = data.choices[0].message.content;
    
    console.log('Raw OpenAI optimization response length:', optimizationText?.length || 0);

    // Parse the JSON response with better error handling
    let optimization;
    try {
      const jsonText = optimizationText.replace(/```json\n?|\n?```/g, '').trim();
      optimization = JSON.parse(jsonText);
      
      // Validate the structure and ensure comprehensive content optimizations
      if (!optimization.atsScore || !optimization.keywordMatches || !optimization.overallRecommendations) {
        throw new Error('Invalid response structure from AI');
      }

      // Ensure we have sufficient content optimizations
      if (!optimization.contentOptimizations || optimization.contentOptimizations.length < 4) {
        console.warn('Insufficient content optimizations received, adding fallback suggestions');
        optimization.contentOptimizations = optimization.contentOptimizations || [];
        
        // Add fallback content optimizations if needed
        const fallbackOptimizations = [
          {
            section: "Professional Summary",
            current: "Generic professional summary",
            improved: "Industry-specific summary with quantifiable achievements and relevant keywords",
            reasoning: "Tailored summaries with metrics improve ATS scoring and recruiter engagement",
            category: "keywords"
          },
          {
            section: "Experience Section",
            current: "Managed team responsibilities",
            improved: "Led a team of 8 professionals, increasing productivity by 25% through process optimization",
            reasoning: "Quantified achievements with specific metrics demonstrate measurable impact",
            category: "quantification"
          },
          {
            section: "Skills Section",
            current: "Basic skills listing",
            improved: "Industry-relevant technical and soft skills with proficiency levels",
            reasoning: "Comprehensive skills alignment with job requirements improves keyword matching",
            category: "industry-alignment"
          }
        ];

        // Add fallback optimizations to reach minimum threshold
        while (optimization.contentOptimizations.length < 6 && fallbackOptimizations.length > 0) {
          optimization.contentOptimizations.push(fallbackOptimizations.shift());
        }
      }

    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', optimizationText);
      
      // Return a comprehensive fallback response
      optimization = {
        atsScore: 50,
        keywordMatches: {
          found: [],
          missing: ['industry-specific keywords', 'technical skills', 'soft skills'],
          suggestions: [
            'Add more industry-relevant keywords throughout your resume',
            'Include technical skills mentioned in job descriptions',
            'Incorporate action verbs that demonstrate leadership and achievement'
          ]
        },
        formatOptimizations: [
          {
            issue: 'Analysis parsing error - comprehensive review needed',
            recommendation: 'Please try uploading your resume again for detailed analysis, or contact support if the problem persists.',
            priority: 'high'
          }
        ],
        contentOptimizations: [
          {
            section: 'Professional Summary',
            current: 'Unable to analyze specific content',
            improved: 'Add a compelling 2-3 sentence summary highlighting your key achievements with quantifiable results',
            reasoning: 'A strong professional summary with metrics improves ATS scoring and recruiter engagement',
            category: 'quantification'
          },
          {
            section: 'Experience Section',
            current: 'Unable to analyze specific achievements',
            improved: 'Transform job responsibilities into quantified achievements (e.g., "Increased sales by 30%")',
            reasoning: 'Quantified achievements demonstrate measurable impact and improve keyword matching',
            category: 'quantification'
          },
          {
            section: 'Skills Section',
            current: 'Unable to analyze current skills',
            improved: 'Include both technical and soft skills relevant to your target industry and role',
            reasoning: 'Comprehensive skills section improves keyword matching with job descriptions',
            category: 'keywords'
          },
          {
            section: 'Action Verbs',
            current: 'Unable to analyze current language',
            improved: 'Use strong action verbs like "achieved," "optimized," "implemented," "led"',
            reasoning: 'Powerful action verbs create more impactful statements and improve ATS parsing',
            category: 'action-verbs'
          },
          {
            section: 'Industry Alignment',
            current: 'Unable to analyze industry relevance',
            improved: 'Incorporate industry-standard terminology and practices throughout your resume',
            reasoning: 'Industry-aligned language improves relevance scoring in ATS systems',
            category: 'industry-alignment'
          },
          {
            section: 'Achievement Highlighting',
            current: 'Unable to analyze specific achievements',
            improved: 'Add specific metrics, percentages, and outcomes to demonstrate your impact',
            reasoning: 'Quantified achievements provide concrete evidence of your value to potential employers',
            category: 'achievement'
          }
        ],
        overallRecommendations: [
          'There was an issue with the detailed analysis. Please try again for comprehensive optimization suggestions.',
          'Focus on adding quantifiable achievements throughout your resume.',
          'Ensure your skills section includes both technical and soft skills relevant to your target role.',
          'Use strong action verbs to begin bullet points in your experience section.',
          'Incorporate industry-specific keywords naturally throughout your resume.',
          'Consider adding a professional summary if you don\'t have one already.'
        ]
      };
    }

    console.log('Successfully generated ATS optimization with score:', optimization.atsScore);
    console.log('Content optimizations provided:', optimization.contentOptimizations?.length || 0);

    return new Response(JSON.stringify(optimization), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ats-optimization function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error',
        details: 'Failed to generate ATS optimization. Please try again.'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
