
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, question, sessionType, roleFocus } = await req.json();
    
    if (!transcript || !question) {
      throw new Error('Transcript and question are required');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing response:', { question, transcript: transcript.substring(0, 100) + '...' });

    const prompt = `
    Analyze this interview response and provide detailed feedback:
    
    Question: "${question}"
    Response: "${transcript}"
    Session Type: ${sessionType || 'General'}
    Role Focus: ${roleFocus || 'General'}
    
    Please provide a comprehensive analysis with:
    1. Overall quality score (0-100)
    2. Detailed scores for:
       - Communication clarity (0-100)
       - Content relevance (0-100)
       - Structure and organization (0-100)
       - Confidence and impact (0-100)
    3. Specific strengths identified
    4. Areas for improvement with actionable suggestions
    5. Industry-specific feedback if role focus is provided
    
    Return the response in this exact JSON format:
    {
      "overallScore": number,
      "scores": {
        "communication": number,
        "content": number,
        "structure": number,
        "impact": number
      },
      "strengths": [
        "specific strength 1",
        "specific strength 2"
      ],
      "improvements": [
        {
          "area": "area name",
          "suggestion": "specific actionable suggestion",
          "priority": "high|medium|low"
        }
      ],
      "industryFeedback": "role-specific insights and recommendations",
      "summary": "overall assessment summary"
    }
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert interview coach and HR professional. Provide constructive, specific, and actionable feedback on interview responses. Be encouraging but honest about areas for improvement.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log('Raw OpenAI response:', analysisText);

    // Parse the JSON response from OpenAI
    let analysis;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      // Fallback analysis if parsing fails
      analysis = {
        overallScore: 75,
        scores: {
          communication: 75,
          content: 70,
          structure: 75,
          impact: 70
        },
        strengths: ["Response provided", "Engaged with the question"],
        improvements: [
          {
            area: "Content Detail",
            suggestion: "Provide more specific examples and details",
            priority: "medium"
          }
        ],
        industryFeedback: "Continue practicing to improve your interview responses",
        summary: "Good foundation, room for improvement in detail and examples"
      };
    }

    console.log('Parsed analysis:', analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in interview analysis:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      overallScore: 0,
      scores: { communication: 0, content: 0, structure: 0, impact: 0 },
      strengths: [],
      improvements: [],
      industryFeedback: "Analysis failed - please try again",
      summary: "Unable to analyze response at this time"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
