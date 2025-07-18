
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback questions database
const FALLBACK_QUESTIONS = {
  behavioral: {
    Business: [
      {
        id: "fallback_behavioral_1",
        text: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
        category: "behavioral",
        difficulty: "medium",
        tips: "Use the STAR method - describe the Situation, Task, Action, and Result",
        expectedElements: ["specific situation", "conflict resolution approach", "positive outcome"]
      },
      {
        id: "fallback_behavioral_2",
        text: "Describe a situation where you had to meet a tight deadline with limited resources.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Focus on your problem-solving skills and time management abilities",
        expectedElements: ["resource constraints", "prioritization strategy", "successful delivery"]
      },
      {
        id: "fallback_behavioral_3",
        text: "Give me an example of a time when you had to adapt to a significant change at work.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Highlight your flexibility and positive attitude toward change",
        expectedElements: ["change description", "adaptation process", "lessons learned"]
      }
    ],
    Technology: [
      {
        id: "fallback_tech_1",
        text: "Describe a complex technical problem you solved and walk me through your debugging process.",
        category: "technical",
        difficulty: "medium",
        tips: "Break down your systematic approach to problem-solving",
        expectedElements: ["problem identification", "debugging methodology", "solution implementation"]
      },
      {
        id: "fallback_tech_2",
        text: "Tell me about a time when you had to learn a new technology quickly for a project.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Emphasize your learning agility and resourcefulness",
        expectedElements: ["learning approach", "application of new knowledge", "project success"]
      },
      {
        id: "fallback_tech_3",
        text: "How do you stay current with technology trends, and give an example of how you applied new knowledge.",
        category: "role-specific",
        difficulty: "medium",
        tips: "Show continuous learning mindset and practical application",
        expectedElements: ["learning resources", "knowledge application", "impact on work"]
      }
    ]
  },
  technical: {
    Technology: [
      {
        id: "fallback_technical_1",
        text: "How would you design a system to handle 1 million concurrent users?",
        category: "technical",
        difficulty: "hard",
        tips: "Consider scalability, load balancing, and database optimization",
        expectedElements: ["architecture design", "scalability solutions", "performance considerations"]
      },
      {
        id: "fallback_technical_2",
        text: "Explain the difference between SQL and NoSQL databases and when you would use each.",
        category: "technical",
        difficulty: "medium",
        tips: "Provide specific use cases and trade-offs for each type",
        expectedElements: ["database types comparison", "use case scenarios", "performance trade-offs"]
      }
    ],
    Business: [
      {
        id: "fallback_business_tech_1",
        text: "How would you explain a complex technical concept to a non-technical stakeholder?",
        category: "technical",
        difficulty: "medium",
        tips: "Show your communication skills and ability to simplify complex ideas",
        expectedElements: ["simplification techniques", "audience consideration", "effective communication"]
      }
    ]
  },
  situational: {
    Business: [
      {
        id: "fallback_situational_1",
        text: "You're leading a project and discover that a key team member has been providing inaccurate information. How do you handle this?",
        category: "situational",
        difficulty: "medium",
        tips: "Focus on professional communication and problem resolution",
        expectedElements: ["investigation approach", "team management", "solution implementation"]
      }
    ]
  },
  mock: {
    Business: [
      {
        id: "fallback_mock_1",
        text: "Walk me through your resume and highlight your most significant achievement.",
        category: "behavioral",
        difficulty: "easy",
        tips: "Structure your response chronologically and quantify achievements",
        expectedElements: ["career progression", "quantified achievements", "relevance to role"]
      },
      {
        id: "fallback_mock_2",
        text: "Why are you interested in this position and our company?",
        category: "behavioral",
        difficulty: "easy",
        tips: "Show research about the company and align with their values",
        expectedElements: ["company research", "role alignment", "career goals"]
      },
      {
        id: "fallback_mock_3",
        text: "Describe a time when you had to make a difficult decision with incomplete information.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Emphasize your decision-making process and risk assessment",
        expectedElements: ["decision framework", "risk evaluation", "outcome analysis"]
      },
      {
        id: "fallback_mock_4",
        text: "What are your greatest strengths and how do they apply to this role?",
        category: "behavioral",
        difficulty: "easy",
        tips: "Choose strengths relevant to the position with specific examples",
        expectedElements: ["relevant strengths", "concrete examples", "role application"]
      },
      {
        id: "fallback_mock_5",
        text: "Where do you see yourself in 5 years?",
        category: "behavioral",
        difficulty: "easy",
        tips: "Show ambition while aligning with company growth opportunities",
        expectedElements: ["career vision", "growth goals", "company alignment"]
      }
    ]
  }
};

// Exponential backoff retry function
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on non-retryable errors
      if (error instanceof Error && !error.message.includes('429') && !error.message.includes('503')) {
        throw error;
      }
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Calculate delay: baseDelay * 2^attempt + random jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      console.log(`Retry attempt ${attempt + 1} after ${delay}ms delay`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

// Get fallback questions
function getFallbackQuestions(sessionType: string, roleFocus: string, count: number = 3) {
  const questions = FALLBACK_QUESTIONS[sessionType]?.[roleFocus] || 
                   FALLBACK_QUESTIONS[sessionType]?.['Business'] || 
                   FALLBACK_QUESTIONS['behavioral']['Business'];
  
  // Shuffle and take the requested count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  return {
    questions: selected,
    sessionInfo: {
      totalQuestions: selected.length,
      estimatedDuration: `${selected.length * 3} minutes`,
      focus: `${sessionType} interview preparation for ${roleFocus} (offline mode)`
    }
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionType, roleFocus, difficulty, previousQuestions } = await req.json();
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.log('OpenAI API key not configured, using fallback questions');
      const fallbackData = getFallbackQuestions(sessionType, roleFocus, sessionType === 'mock' ? 5 : 3);
      return new Response(JSON.stringify(fallbackData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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

    // Try OpenAI with retry logic
    const questionsData = await retryWithBackoff(async () => {
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
        const errorText = await response.text();
        console.error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const questionsText = data.choices[0].message.content;
      
      console.log('Raw questions response:', questionsText);

      // Parse the JSON response from OpenAI
      const jsonMatch = questionsText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    }, 3, 2000); // 3 retries, starting with 2 second delay

    console.log('Generated questions successfully:', questionsData);

    return new Response(JSON.stringify(questionsData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating questions with OpenAI, falling back to offline questions:', error);
    
    // Extract request parameters for fallback
    let sessionType = 'behavioral';
    let roleFocus = 'Business';
    
    try {
      const body = await req.clone().json();
      sessionType = body.sessionType || 'behavioral';
      roleFocus = body.roleFocus || 'Business';
    } catch (parseError) {
      console.log('Could not parse request body for fallback, using defaults');
    }
    
    // Use fallback questions
    const fallbackData = getFallbackQuestions(sessionType, roleFocus, sessionType === 'mock' ? 5 : 3);
    
    return new Response(JSON.stringify(fallbackData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
