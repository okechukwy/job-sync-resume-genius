
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests - fix the typo here
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('ATS optimization request received:', req.method);
    
    // Add safer JSON parsing with validation
    let requestBody;
    try {
      const rawBody = await req.text();
      console.log('Raw request body:', rawBody);
      
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

    const systemPrompt = `You are an ATS (Applicant Tracking System) optimization expert. Analyze the provided resume and return specific recommendations to improve ATS compatibility and keyword matching.

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
      "reasoning": "why this is better for ATS"
    }
  ],
  "overallRecommendations": [
    "specific actionable recommendations"
  ]
}

Focus on:
- Keyword density and relevance
- ATS-friendly formatting
- Section organization
- Industry-specific terminology
- Quantifiable achievements
- Action verbs optimization`;

    let userPrompt = `Analyze this resume for ATS optimization in the ${industry} industry:\n\n${resumeText}`;
    
    if (jobDescription) {
      userPrompt += `\n\nTarget job description:\n${jobDescription}`;
    }

    console.log('Calling OpenAI API...');

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
        max_tokens: 2000,
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
    
    console.log('Raw OpenAI optimization response:', optimizationText);

    // Parse the JSON response with better error handling
    let optimization;
    try {
      const jsonText = optimizationText.replace(/```json\n?|\n?```/g, '').trim();
      optimization = JSON.parse(jsonText);
      
      // Validate the structure
      if (!optimization.atsScore || !optimization.keywordMatches || !optimization.overallRecommendations) {
        throw new Error('Invalid response structure from AI');
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', optimizationText);
      
      // Return a fallback response instead of failing
      optimization = {
        atsScore: 50,
        keywordMatches: {
          found: [],
          missing: [],
          suggestions: ['Unable to parse detailed keyword analysis. Please try again.']
        },
        formatOptimizations: [
          {
            issue: 'Analysis parsing error',
            recommendation: 'Please try uploading your resume again for detailed analysis.',
            priority: 'high'
          }
        ],
        contentOptimizations: [],
        overallRecommendations: [
          'There was an issue analyzing your resume. Please try again or contact support if the problem persists.'
        ]
      };
    }

    console.log('Successfully generated ATS optimization with score:', optimization.atsScore);

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
