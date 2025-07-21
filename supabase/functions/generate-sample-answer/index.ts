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
    const { question, sessionType, roleFocus } = await req.json();

    if (!question) {
      throw new Error('Question is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create a comprehensive prompt for generating sample answers
    const prompt = `You are an expert interview coach. Generate an exemplary sample answer for the following interview question.

Question: "${question}"
Session Type: ${sessionType || 'General'}
Role Focus: ${roleFocus || 'General'}

Provide a comprehensive response in the following JSON format:
{
  "sampleAnswer": "A detailed, well-structured sample answer that demonstrates best practices for answering this type of question",
  "structure": "Brief explanation of the answer structure used (e.g., STAR method, technical approach)",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "tips": ["Tip 1 for improving answers", "Tip 2 for common mistakes to avoid"],
  "reasoning": "Explanation of why this answer is effective and what makes it strong"
}

Guidelines:
- For behavioral questions, use the STAR method (Situation, Task, Action, Result)
- For technical questions, show problem-solving approach and clear explanation
- Keep answers concise but comprehensive (2-3 minutes when spoken)
- Include specific examples and metrics where relevant
- Tailor the answer to the role focus provided
- Make the answer authentic and professional
- Focus on demonstrating key competencies for the role`;

    console.log('Generating sample answer for question:', question);

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
            content: 'You are an expert interview coach who creates exceptional sample answers for interview preparation. Always respond with valid JSON in the exact format requested.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log('OpenAI response received');

    let analysisResult;
    try {
      analysisResult = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', content);
      // Fallback response
      analysisResult = {
        sampleAnswer: "I would approach this question by first understanding the context and requirements, then providing a structured response with specific examples from my experience.",
        structure: "Structured approach",
        keyPoints: ["Clear communication", "Specific examples", "Results-oriented"],
        tips: ["Be specific", "Use concrete examples", "Show impact"],
        reasoning: "This approach demonstrates clear thinking and relevant experience."
      };
    }

    console.log('Sample answer generated successfully');

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-sample-answer function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate sample answer',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});