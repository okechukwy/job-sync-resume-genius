
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

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
    const { resumeText, industry = 'Business' } = await req.json();
    
    if (!resumeText) {
      throw new Error('Resume text is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing CV for industry:', industry);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional resume analyst and career coach specializing in ${industry}. Analyze the provided resume and return a detailed JSON analysis with the following structure:

{
  "overallScore": number (0-100),
  "atsScore": number (0-100),
  "industry": "${industry}",
  "targetRole": "detected or suggested role based on resume content",
  "sections": {
    "contact": {"score": number, "status": "excellent|good|fair|needs_work"},
    "summary": {"score": number, "status": "excellent|good|fair|needs_work"},
    "experience": {"score": number, "status": "excellent|good|fair|needs_work"},
    "education": {"score": number, "status": "excellent|good|fair|needs_work"},
    "skills": {"score": number, "status": "excellent|good|fair|needs_work"},
    "formatting": {"score": number, "status": "excellent|good|fair|needs_work"}
  },
  "keywords": {
    "found": number,
    "missing": number,
    "foundKeywords": [array of keywords found in resume],
    "missingKeywords": [array of missing keywords specific to ${industry}],
    "suggestions": [array of keyword suggestions for improvement]
  },
  "improvements": [
    {
      "priority": "high|medium|low",
      "issue": "brief description",
      "suggestion": "specific actionable advice"
    }
  ]
}

Focus on ${industry}-specific requirements, keywords, and best practices. Be specific and actionable in your recommendations. Make sure to include actual keyword arrays in foundKeywords and missingKeywords.`
          },
          {
            role: 'user',
            content: `Please analyze this resume for the ${industry} industry:\n\n${resumeText}`
          }
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
    const analysisText = data.choices[0].message.content;
    
    console.log('Raw OpenAI response:', analysisText);

    // Parse the JSON response
    let analysis;
    try {
      // Remove any markdown formatting if present
      const jsonText = analysisText.replace(/```json\n?|\n?```/g, '').trim();
      analysis = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', analysisText);
      throw new Error('Failed to parse AI analysis response');
    }

    // Validate and ensure proper structure
    if (!analysis.overallScore || !analysis.sections || !analysis.keywords || !analysis.improvements) {
      console.error('Invalid analysis structure:', analysis);
      throw new Error('Invalid analysis structure from AI');
    }

    // Ensure keywords have proper arrays
    if (!analysis.keywords.foundKeywords) {
      analysis.keywords.foundKeywords = [];
    }
    if (!analysis.keywords.missingKeywords) {
      analysis.keywords.missingKeywords = analysis.keywords.suggestions?.slice(0, analysis.keywords.missing) || [];
    }

    // Ensure industry and targetRole are set
    if (!analysis.industry) {
      analysis.industry = industry;
    }
    if (!analysis.targetRole) {
      analysis.targetRole = `${industry} Professional`;
    }

    console.log('Successfully analyzed CV with score:', analysis.overallScore);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in cv-analysis function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to analyze CV. Please try again.'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
