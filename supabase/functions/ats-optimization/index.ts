import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'Options') {
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
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const optimizationText = data.choices[0].message.content;
    
    console.log('Raw OpenAI optimization response:', optimizationText);

    // Parse the JSON response
    let optimization;
    try {
      const jsonText = optimizationText.replace(/```json\n?|\n?```/g, '').trim();
      optimization = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', optimizationText);
      throw new Error('Failed to parse AI optimization response');
    }

    console.log('Successfully generated ATS optimization with score:', optimization.atsScore);

    return new Response(JSON.stringify(optimization), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ats-optimization function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to generate ATS optimization. Please try again.'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});