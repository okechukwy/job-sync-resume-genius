
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced fallback questions database with more questions per category
const FALLBACK_QUESTIONS = {
  behavioral: {
    Business: [
      {
        id: "behavioral_bus_1",
        text: "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
        category: "behavioral",
        difficulty: "medium",
        tips: "Use the STAR method - describe the Situation, Task, Action, and Result",
        expectedElements: ["specific situation", "conflict resolution approach", "positive outcome"]
      },
      {
        id: "behavioral_bus_2",
        text: "Describe a situation where you had to meet a tight deadline with limited resources.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Focus on your problem-solving skills and time management abilities",
        expectedElements: ["resource constraints", "prioritization strategy", "successful delivery"]
      },
      {
        id: "behavioral_bus_3",
        text: "Give me an example of a time when you had to adapt to a significant change at work.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Highlight your flexibility and positive attitude toward change",
        expectedElements: ["change description", "adaptation process", "lessons learned"]
      },
      {
        id: "behavioral_bus_4",
        text: "Tell me about a time when you had to convince others to accept your idea or proposal.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Show your communication and persuasion skills",
        expectedElements: ["idea presentation", "stakeholder concerns", "successful outcome"]
      },
      {
        id: "behavioral_bus_5",
        text: "Describe a situation where you made a mistake and how you handled it.",
        category: "behavioral",
        difficulty: "easy",
        tips: "Show accountability and learning from failures",
        expectedElements: ["mistake acknowledgment", "corrective actions", "lessons learned"]
      },
      {
        id: "behavioral_bus_6",
        text: "Tell me about a time when you had to work under pressure to achieve a goal.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Demonstrate stress management and performance under pressure",
        expectedElements: ["pressure situation", "coping strategies", "successful completion"]
      },
      {
        id: "behavioral_bus_7",
        text: "Give an example of when you had to learn something new quickly for a project.",
        category: "behavioral",
        difficulty: "easy",
        tips: "Show your learning agility and adaptability",
        expectedElements: ["learning challenge", "approach taken", "application success"]
      },
      {
        id: "behavioral_bus_8",
        text: "Describe a time when you had to give constructive feedback to a colleague.",
        category: "behavioral",
        difficulty: "hard",
        tips: "Show emotional intelligence and communication skills",
        expectedElements: ["feedback situation", "delivery approach", "positive outcome"]
      },
      {
        id: "behavioral_bus_9",
        text: "Tell me about a project where you had to collaborate with multiple departments.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Highlight cross-functional collaboration skills",
        expectedElements: ["project scope", "collaboration challenges", "coordination strategies"]
      },
      {
        id: "behavioral_bus_10",
        text: "Describe a time when you identified and solved a problem proactively.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Show initiative and problem-solving abilities",
        expectedElements: ["problem identification", "solution development", "impact measurement"]
      },
      {
        id: "behavioral_bus_11",
        text: "Give me an example of when you had to prioritize multiple competing tasks.",
        category: "behavioral",
        difficulty: "easy",
        tips: "Demonstrate time management and decision-making skills",
        expectedElements: ["competing priorities", "decision criteria", "execution strategy"]
      },
      {
        id: "behavioral_bus_12",
        text: "Tell me about a time when you exceeded expectations on a project.",
        category: "behavioral",
        difficulty: "easy",
        tips: "Highlight achievements and value delivery",
        expectedElements: ["initial expectations", "additional value", "recognition received"]
      }
    ],
    Technology: [
      {
        id: "behavioral_tech_1",
        text: "Describe a complex technical problem you solved and walk me through your debugging process.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Break down your systematic approach to problem-solving",
        expectedElements: ["problem identification", "debugging methodology", "solution implementation"]
      },
      {
        id: "behavioral_tech_2",
        text: "Tell me about a time when you had to learn a new technology quickly for a project.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Emphasize your learning agility and resourcefulness",
        expectedElements: ["learning approach", "application of new knowledge", "project success"]
      },
      {
        id: "behavioral_tech_3",
        text: "Describe a situation where you had to optimize system performance under tight constraints.",
        category: "behavioral",
        difficulty: "hard",
        tips: "Show technical depth and performance optimization skills",
        expectedElements: ["performance bottlenecks", "optimization strategies", "measurable improvements"]
      },
      {
        id: "behavioral_tech_4",
        text: "Tell me about a time when you had to refactor legacy code while maintaining functionality.",
        category: "behavioral",
        difficulty: "hard",
        tips: "Demonstrate code quality awareness and risk management",
        expectedElements: ["legacy code challenges", "refactoring approach", "testing strategy"]
      },
      {
        id: "behavioral_tech_5",
        text: "Describe how you approach code reviews and giving technical feedback to teammates.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Show collaboration and mentoring abilities",
        expectedElements: ["review process", "feedback delivery", "team improvement"]
      },
      {
        id: "behavioral_tech_6",
        text: "Tell me about a time when you had to make a critical technical decision with limited information.",
        category: "behavioral",
        difficulty: "hard",
        tips: "Show decision-making under uncertainty",
        expectedElements: ["decision context", "evaluation criteria", "outcome validation"]
      },
      {
        id: "behavioral_tech_7",
        text: "Describe a project where you had to integrate multiple systems or APIs.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Highlight integration skills and system thinking",
        expectedElements: ["integration challenges", "technical approach", "reliability measures"]
      },
      {
        id: "behavioral_tech_8",
        text: "Tell me about a time when you identified and prevented a potential security vulnerability.",
        category: "behavioral",
        difficulty: "hard",
        tips: "Show security awareness and proactive thinking",
        expectedElements: ["vulnerability identification", "risk assessment", "mitigation strategy"]
      },
      {
        id: "behavioral_tech_9",
        text: "Describe how you stay current with technology trends and apply new knowledge.",
        category: "behavioral",
        difficulty: "easy",
        tips: "Show continuous learning mindset",
        expectedElements: ["learning resources", "knowledge application", "impact on work"]
      },
      {
        id: "behavioral_tech_10",
        text: "Tell me about a time when you had to troubleshoot a production issue under pressure.",
        category: "behavioral",
        difficulty: "hard",
        tips: "Demonstrate incident response and stress management",
        expectedElements: ["incident response", "troubleshooting process", "resolution and prevention"]
      }
    ]
  },
  technical: {
    Technology: [
      {
        id: "technical_tech_1",
        text: "How would you design a system to handle 1 million concurrent users?",
        category: "technical",
        difficulty: "hard",
        tips: "Consider scalability, load balancing, and database optimization",
        expectedElements: ["architecture design", "scalability solutions", "performance considerations"]
      },
      {
        id: "technical_tech_2",
        text: "Explain the difference between SQL and NoSQL databases and when you would use each.",
        category: "technical",
        difficulty: "medium",
        tips: "Provide specific use cases and trade-offs for each type",
        expectedElements: ["database types comparison", "use case scenarios", "performance trade-offs"]
      },
      {
        id: "technical_tech_3",
        text: "How would you implement caching in a web application to improve performance?",
        category: "technical",
        difficulty: "medium",
        tips: "Discuss different caching strategies and their applications",
        expectedElements: ["caching layers", "cache invalidation", "performance impact"]
      },
      {
        id: "technical_tech_4",
        text: "Describe how you would implement authentication and authorization in a microservices architecture.",
        category: "technical",
        difficulty: "hard",
        tips: "Consider security, scalability, and service communication",
        expectedElements: ["auth strategies", "token management", "service security"]
      },
      {
        id: "technical_tech_5",
        text: "How would you approach database migration with zero downtime?",
        category: "technical",
        difficulty: "hard",
        tips: "Consider data consistency and rollback strategies",
        expectedElements: ["migration strategy", "data consistency", "rollback plan"]
      },
      {
        id: "technical_tech_6",
        text: "Explain how you would implement real-time features in a web application.",
        category: "technical",
        difficulty: "medium",
        tips: "Discuss WebSockets, Server-Sent Events, and other approaches",
        expectedElements: ["real-time technologies", "scalability considerations", "fallback mechanisms"]
      },
      {
        id: "technical_tech_7",
        text: "How would you design a CI/CD pipeline for a large-scale application?",
        category: "technical",
        difficulty: "medium",
        tips: "Consider testing, deployment strategies, and monitoring",
        expectedElements: ["pipeline stages", "testing strategy", "deployment automation"]
      },
      {
        id: "technical_tech_8",
        text: "Describe how you would implement search functionality for a large dataset.",
        category: "technical",
        difficulty: "hard",
        tips: "Consider indexing, search algorithms, and performance",
        expectedElements: ["search algorithms", "indexing strategy", "performance optimization"]
      },
      {
        id: "technical_tech_9",
        text: "How would you handle API rate limiting and throttling?",
        category: "technical",
        difficulty: "medium",
        tips: "Discuss different algorithms and implementation strategies",
        expectedElements: ["rate limiting algorithms", "implementation approach", "user experience"]
      },
      {
        id: "technical_tech_10",
        text: "Explain how you would implement data backup and disaster recovery.",
        category: "technical",
        difficulty: "hard",
        tips: "Consider RTO, RPO, and different backup strategies",
        expectedElements: ["backup strategies", "recovery procedures", "testing approach"]
      }
    ],
    Business: [
      {
        id: "technical_bus_1",
        text: "How would you explain a complex technical concept to a non-technical stakeholder?",
        category: "technical",
        difficulty: "medium",
        tips: "Show your communication skills and ability to simplify complex ideas",
        expectedElements: ["simplification techniques", "audience consideration", "effective communication"]
      },
      {
        id: "technical_bus_2",
        text: "How would you approach estimating the timeline and resources for a new technical project?",
        category: "technical",
        difficulty: "medium",
        tips: "Discuss estimation techniques and risk factors",
        expectedElements: ["estimation methods", "risk assessment", "resource planning"]
      },
      {
        id: "technical_bus_3",
        text: "How would you present the technical risks and benefits of a new technology adoption?",
        category: "technical",
        difficulty: "medium",
        tips: "Balance technical details with business impact",
        expectedElements: ["risk analysis", "benefit quantification", "decision framework"]
      }
    ]
  },
  situational: {
    Business: [
      {
        id: "situational_bus_1",
        text: "You're leading a project and discover that a key team member has been providing inaccurate information. How do you handle this?",
        category: "situational",
        difficulty: "medium",
        tips: "Focus on professional communication and problem resolution",
        expectedElements: ["investigation approach", "team management", "solution implementation"]
      },
      {
        id: "situational_bus_2",
        text: "Your team is falling behind on a critical deadline due to scope creep. What's your approach?",
        category: "situational",
        difficulty: "medium",
        tips: "Show project management and stakeholder communication skills",
        expectedElements: ["scope management", "stakeholder communication", "recovery plan"]
      },
      {
        id: "situational_bus_3",
        text: "You disagree with your manager's decision on a project approach. How do you handle this?",
        category: "situational",
        difficulty: "hard",
        tips: "Demonstrate diplomatic communication and professional judgment",
        expectedElements: ["respectful disagreement", "alternative proposal", "collaborative resolution"]
      },
      {
        id: "situational_bus_4",
        text: "A client is demanding features that aren't technically feasible within the timeline. How do you respond?",
        category: "situational",
        difficulty: "medium",
        tips: "Balance client satisfaction with realistic expectations",
        expectedElements: ["expectation management", "alternative solutions", "client communication"]
      },
      {
        id: "situational_bus_5",
        text: "Your team member consistently misses deadlines and it's affecting the project. What do you do?",
        category: "situational",
        difficulty: "hard",
        tips: "Show leadership and performance management skills",
        expectedElements: ["performance analysis", "supportive intervention", "accountability measures"]
      }
    ],
    Technology: [
      {
        id: "situational_tech_1",
        text: "You discover a critical security vulnerability in production. Walk me through your response process.",
        category: "situational",
        difficulty: "hard",
        tips: "Show incident response and security awareness",
        expectedElements: ["immediate response", "impact assessment", "remediation plan"]
      },
      {
        id: "situational_tech_2",
        text: "Your application is experiencing performance issues during peak traffic. How do you approach this?",
        category: "situational",
        difficulty: "hard",
        tips: "Demonstrate performance troubleshooting and scaling strategies",
        expectedElements: ["performance analysis", "scaling solutions", "monitoring approach"]
      },
      {
        id: "situational_tech_3",
        text: "A new team member suggests using a cutting-edge technology that you're unfamiliar with. How do you evaluate this?",
        category: "situational",
        difficulty: "medium",
        tips: "Show technology evaluation and decision-making skills",
        expectedElements: ["technology assessment", "risk evaluation", "team collaboration"]
      },
      {
        id: "situational_tech_4",
        text: "You're asked to take over a project with poor code quality and no documentation. What's your approach?",
        category: "situational",
        difficulty: "hard",
        tips: "Show project rescue and code improvement strategies",
        expectedElements: ["code assessment", "improvement plan", "knowledge transfer"]
      }
    ]
  },
  mock: {
    Business: [
      {
        id: "mock_bus_1",
        text: "Walk me through your resume and highlight your most significant achievement.",
        category: "behavioral",
        difficulty: "easy",
        tips: "Structure your response chronologically and quantify achievements",
        expectedElements: ["career progression", "quantified achievements", "relevance to role"]
      },
      {
        id: "mock_bus_2",
        text: "Why are you interested in this position and our company?",
        category: "behavioral",
        difficulty: "easy",
        tips: "Show research about the company and align with their values",
        expectedElements: ["company research", "role alignment", "career goals"]
      },
      {
        id: "mock_bus_3",
        text: "Describe a time when you had to make a difficult decision with incomplete information.",
        category: "behavioral",
        difficulty: "medium",
        tips: "Emphasize your decision-making process and risk assessment",
        expectedElements: ["decision framework", "risk evaluation", "outcome analysis"]
      },
      {
        id: "mock_bus_4",
        text: "What are your greatest strengths and how do they apply to this role?",
        category: "behavioral",
        difficulty: "easy",
        tips: "Choose strengths relevant to the position with specific examples",
        expectedElements: ["relevant strengths", "concrete examples", "role application"]
      },
      {
        id: "mock_bus_5",
        text: "Where do you see yourself in 5 years?",
        category: "behavioral",
        difficulty: "easy",
        tips: "Show ambition while aligning with company growth opportunities",
        expectedElements: ["career vision", "growth goals", "company alignment"]
      },
      {
        id: "mock_bus_6",
        text: "What is your biggest weakness and how are you working to improve it?",
        category: "behavioral",
        difficulty: "medium",
        tips: "Show self-awareness and commitment to improvement",
        expectedElements: ["honest weakness", "improvement efforts", "progress made"]
      },
      {
        id: "mock_bus_7",
        text: "Why are you leaving your current position?",
        category: "behavioral",
        difficulty: "medium",
        tips: "Stay positive and focus on growth opportunities",
        expectedElements: ["professional reasons", "growth motivation", "positive framing"]
      },
      {
        id: "mock_bus_8",
        text: "Describe your ideal work environment and management style.",
        category: "behavioral",
        difficulty: "easy",
        tips: "Align with the company culture and role requirements",
        expectedElements: ["work preferences", "collaboration style", "adaptability"]
      },
      {
        id: "mock_bus_9",
        text: "How do you handle stress and pressure in the workplace?",
        category: "behavioral",
        difficulty: "medium",
        tips: "Provide specific strategies and examples",
        expectedElements: ["stress management", "coping strategies", "performance maintenance"]
      },
      {
        id: "mock_bus_10",
        text: "What questions do you have for me about the role or company?",
        category: "behavioral",
        difficulty: "easy",
        tips: "Ask thoughtful questions that show genuine interest",
        expectedElements: ["role clarification", "company culture", "growth opportunities"]
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
  let lastError: Error = new Error('No attempts made');
  
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

// Smart question selection with deduplication and difficulty progression
function selectQuestions(
  allQuestions: any[],
  count: number,
  difficulty: string = 'medium',
  previousQuestions: string[] = []
): any[] {
  // Filter out previously asked questions
  const availableQuestions = allQuestions.filter(q => 
    !previousQuestions.includes(q.id) && !previousQuestions.includes(q.text)
  );
  
  if (availableQuestions.length === 0) {
    return allQuestions.slice(0, count); // Fallback if all questions were used
  }
  
  // Sort by difficulty for progression (easy -> medium -> hard)
  const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
  const sortedQuestions = availableQuestions.sort((a: any, b: any) => 
    (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0) - (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0)
  );
  
  // Select questions with progressive difficulty
  const selected = [];
  const easyQuestions = sortedQuestions.filter(q => q.difficulty === 'easy');
  const mediumQuestions = sortedQuestions.filter(q => q.difficulty === 'medium');
  const hardQuestions = sortedQuestions.filter(q => q.difficulty === 'hard');
  
  // Distribution based on count
  if (count <= 5) {
    // For short sessions: mostly easy and medium
    selected.push(...easyQuestions.slice(0, Math.ceil(count * 0.4)));
    selected.push(...mediumQuestions.slice(0, Math.ceil(count * 0.6)));
  } else if (count <= 10) {
    // For medium sessions: balanced distribution
    selected.push(...easyQuestions.slice(0, Math.ceil(count * 0.3)));
    selected.push(...mediumQuestions.slice(0, Math.ceil(count * 0.5)));
    selected.push(...hardQuestions.slice(0, Math.ceil(count * 0.2)));
  } else {
    // For long sessions: include more variety
    selected.push(...easyQuestions.slice(0, Math.ceil(count * 0.25)));
    selected.push(...mediumQuestions.slice(0, Math.ceil(count * 0.5)));
    selected.push(...hardQuestions.slice(0, Math.ceil(count * 0.25)));
  }
  
  // Shuffle the selected questions and take the requested count
  const shuffled = selected.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get fallback questions with smart selection
function getFallbackQuestions(
  sessionType: string, 
  roleFocus: string, 
  count: number = 5,
  previousQuestions: string[] = []
) {
  const questions = (FALLBACK_QUESTIONS as any)[sessionType]?.[roleFocus] || 
                   (FALLBACK_QUESTIONS as any)[sessionType]?.['Business'] || 
                   (FALLBACK_QUESTIONS as any)['behavioral']['Business'];
  
  const selectedQuestions = selectQuestions(questions, count, 'medium', previousQuestions);
  
  return {
    questions: selectedQuestions,
    sessionInfo: {
      totalQuestions: selectedQuestions.length,
      estimatedDuration: `${selectedQuestions.length * 3-4} minutes`,
      focus: `${sessionType} interview preparation for ${roleFocus} (${selectedQuestions.length} questions - offline mode)`
    }
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionType, roleFocus, difficulty, previousQuestions, questionCount } = await req.json();
    
    // Default question count based on session type, but allow override
    const defaultCount = sessionType === 'mock' ? 8 : 5;
    const requestedCount = questionCount || defaultCount;
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.log('OpenAI API key not configured, using fallback questions');
      const fallbackData = getFallbackQuestions(sessionType, roleFocus, requestedCount, previousQuestions);
      return new Response(JSON.stringify(fallbackData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating questions for:', { sessionType, roleFocus, difficulty, questionCount: requestedCount });

    const prompt = `
    Generate ${requestedCount} interview questions for:
    
    Session Type: ${sessionType || 'behavioral'}
    Role Focus: ${roleFocus || 'General Business'}
    Difficulty: ${difficulty || 'medium'}
    Previous Questions: ${previousQuestions ? JSON.stringify(previousQuestions) : 'None'}
    
    Guidelines:
    - Make questions relevant to the role and current market expectations
    - Avoid repeating previous questions
    - Include a mix of behavioral, situational, and role-specific questions
    - Questions should progress in difficulty: start easier and gradually increase complexity
    - For technical roles, include both technical scenario and behavioral questions
    - For ${requestedCount} questions, create a good variety to comprehensively assess the candidate
    - Each question should be unique and test different aspects of the role
    
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
        "totalQuestions": ${requestedCount},
        "estimatedDuration": "${requestedCount * 3}-${requestedCount * 4} minutes",
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
              content: 'You are an expert interview coach who creates relevant, engaging interview questions. Focus on current industry practices and real-world scenarios. Generate comprehensive question sets that thoroughly assess candidates.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000,
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
    let questionCount = 5;
    let previousQuestions = [];
    
    try {
      const body = await req.clone().json();
      sessionType = body.sessionType || 'behavioral';
      roleFocus = body.roleFocus || 'Business';
      questionCount = body.questionCount || (body.sessionType === 'mock' ? 8 : 5);
      previousQuestions = body.previousQuestions || [];
    } catch (parseError) {
      console.log('Could not parse request body for fallback, using defaults');
    }
    
    // Use fallback questions with smart selection
    const fallbackData = getFallbackQuestions(sessionType, roleFocus, questionCount, previousQuestions);
    
    return new Response(JSON.stringify(fallbackData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
