
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionType, roleFocus, difficulty, previousQuestions } = await req.json();
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating questions for:', { sessionType, roleFocus, difficulty });

    const prompt = `
    Generate ${sessionType === 'mock' ? '5' : '3'} interview questions for:
    
    Session Type: ${sessionType || 'behavioral'}
    Role Focus: ${roleFocus || 'General Business'}
    Difficulty: ${difficulty || 'medium'}
    Previous Questions: ${previousQuestions ? JSON.stringify(previousQuestions) : 'None'}
    
    Guidelines:
    - Make questions relevant to the role and current market expectations
    - Avoid repeating previous questions
    - Include a mix of behavioral, situational, and role-specific questions
    - Questions should be challenging but fair for the difficulty level
    - For technical roles, include some technical scenario questions
    
    Return exactly this JSON format:
    {
      "questions": [
        {
          "id": "unique_id_1",
          "text": "question text",
          "category": "behavioral|technical|situational|role-specific",
          "difficulty": "easy|medium|hard",
          "tips": "brief tip for answering this question",
          "expectedElements": ["element1", "element2", "element3"]
        }
      ],
      "sessionInfo": {
        "totalQuestions": number,
        "estimatedDuration": "X minutes",
        "focus": "session focus description"
      }
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
            content: 'You are an expert interview coach who creates relevant, engaging interview questions. Focus on current industry practices and real-world scenarios.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const questionsText = data.choices[0].message.content;
    
    console.log('Raw questions response:', questionsText);

    // Parse the JSON response from OpenAI
    let questionsData;
    try {
      const jsonMatch = questionsText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        questionsData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse questions response:', parseError);
      // Fallback questions if parsing fails
      questionsData = {
        questions: [
          {
            id: "fallback_1",
            text: "Tell me about a challenging project you've worked on and how you overcame obstacles.",
            category: "behavioral",
            difficulty: "medium",
            tips: "Use the STAR method - Situation, Task, Action, Result",
            expectedElements: ["specific situation", "clear actions taken", "measurable results"]
          }
        ],
        sessionInfo: {
          totalQuestions: 1,
          estimatedDuration: "5 minutes",
          focus: "General interview preparation"
        }
      };
    }

    console.log('Generated questions:', questionsData);

    return new Response(JSON.stringify(questionsData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating questions:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      questions: [],
      sessionInfo: {
        totalQuestions: 0,
        estimatedDuration: "0 minutes",
        focus: "Error generating questions"
      }
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
