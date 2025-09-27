import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      cvContent, 
      originalAnalysis, 
      improvementHistory 
    } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }

    // Extract previously addressed areas from history
    const previouslyAddressed = improvementHistory?.flatMap((h: any) => 
      Array.isArray(h.applied_improvements) ? h.applied_improvements : []
    ) || [];

    // Create enhanced prompt with progressive context
    const progressivePrompt = `
You are an expert resume analyzer performing a PROGRESSIVE analysis. This is analysis round ${(improvementHistory?.length || 0) + 1}.

CRITICAL INSTRUCTION: The following improvements have ALREADY been addressed in previous rounds:
${previouslyAddressed.length > 0 ? previouslyAddressed.map((item: string) => `- ${item}`).join('\n') : 'None'}

DO NOT suggest improvements for areas that have already been addressed. Instead, focus on:
1. NEW optimization opportunities not previously identified
2. ADVANCED improvements for areas that have been partially optimized
3. DEEPER, more strategic enhancements for sophisticated users
4. INDUSTRY-SPECIFIC optimizations not covered in basic analysis

Resume Content:
${cvContent}

Previous Analysis Data:
${JSON.stringify(originalAnalysis, null, 2)}

Provide a JSON response with this structure:
{
  "overallScore": number (0-100),
  "atsScore": number (0-100),
  "sections": {
    "contact": {"score": number, "status": "string"},
    "summary": {"score": number, "status": "string"},
    "experience": {"score": number, "status": "string"},
    "education": {"score": number, "status": "string"},
    "skills": {"score": number, "status": "string"}
  },
  "keywords": {
    "found": number,
    "missing": number,
    "suggestions": ["array of new keyword suggestions"],
    "foundKeywords": ["array"],
    "missingKeywords": ["array of advanced/strategic keywords"]
  },
  "improvements": [
    {
      "priority": "high|medium|low",
      "issue": "specific new issue not previously addressed",
      "suggestion": "detailed progressive enhancement suggestion"
    }
  ],
  "industry": "string",
  "targetRole": "string"
}

Focus on providing NEW, PROGRESSIVE insights that build upon previous optimizations.
`;

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
            content: 'You are a progressive resume analysis expert. Provide new, non-repetitive optimization suggestions that build upon previous improvements.'
          },
          {
            role: 'user',
            content: progressivePrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    // Parse the JSON response
    let analysisResult;
    try {
      // Extract JSON from the response if it's wrapped in markdown
      const jsonMatch = analysisText.match(/```json\n?([\s\S]*?)\n?```/) || analysisText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : analysisText;
      analysisResult = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      throw new Error('Invalid response format from AI analysis');
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in progressive-cv-analysis function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: 'Failed to perform progressive CV analysis'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});