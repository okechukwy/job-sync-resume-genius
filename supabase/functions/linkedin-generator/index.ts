
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to extract JSON from markdown-wrapped responses
const extractJsonFromResponse = (content: string): any => {
  console.log('Raw AI response content:', content.substring(0, 500) + '...');
  
  try {
    // First, try parsing as-is
    return JSON.parse(content);
  } catch (e) {
    console.log('Direct JSON parsing failed, trying extraction methods...');
    
    // Try to extract JSON from markdown code blocks
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        const extracted = JSON.parse(jsonMatch[1]);
        console.log('Successfully extracted JSON from markdown blocks');
        return extracted;
      } catch (e) {
        console.error('Failed to parse extracted JSON from markdown:', e);
      }
    }
    
    // Try to find JSON object pattern
    const objectMatch = content.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        const extracted = JSON.parse(objectMatch[0]);
        console.log('Successfully extracted JSON from object pattern');
        return extracted;
      } catch (e) {
        console.error('Failed to parse object pattern:', e);
      }
    }
    
    // Last resort: clean the content and try again
    const cleaned = content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/^\s+|\s+$/g, '')
      .trim();
    
    try {
      const extracted = JSON.parse(cleaned);
      console.log('Successfully parsed cleaned content');
      return extracted;
    } catch (e) {
      console.error('All JSON parsing attempts failed:', e);
      throw new Error(`Unable to parse JSON response from OpenAI. Raw content: ${content.substring(0, 200)}...`);
    }
  }
};

// Enhanced function to validate and transform content suggestions data
const validateContentSuggestions = (data: any): any => {
  console.log('Validating content suggestions data:', JSON.stringify(data, null, 2));
  
  if (!data || typeof data !== 'object') {
    console.error('Invalid content suggestions data structure');
    throw new Error('Invalid content suggestions data structure');
  }

  // Enhanced ideas validation and transformation
  const ideas = Array.isArray(data.ideas) ? data.ideas : [];
  const validatedIdeas = ideas.map((idea: any, index: number) => {
    const validatedIdea = {
      title: idea.title || `Thought Leadership Post ${index + 1}`,
      content: idea.content || idea.description || `Share insights about ${idea.topic || 'industry trends'} based on your professional experience.`,
      contentType: idea.contentType || idea.type || 'Thought Leadership',
      hashtags: Array.isArray(idea.hashtags) ? idea.hashtags : ['#LinkedIn', '#Professional', '#Leadership'],
      engagementStrategy: idea.engagementStrategy || idea.strategy || 'Ask a thought-provoking question to encourage discussion and comments',
      difficulty: ['easy', 'medium', 'hard'].includes(idea.difficulty) ? idea.difficulty : 'medium',
      engagement: ['high', 'medium', 'low'].includes(idea.engagement) ? idea.engagement : 'medium',
      type: idea.type || 'insight'
    };
    console.log(`Validated idea ${index + 1}:`, validatedIdea);
    return validatedIdea;
  });

  // Enhanced calendar validation with more detailed data
  const calendar = Array.isArray(data.calendar) ? data.calendar : [];
  const validatedCalendar = calendar.map((item: any, index: number) => {
    const validatedItem = {
      week: typeof item.week === 'number' ? item.week : index + 1,
      contentType: item.contentType || item.type || 'Thought Leadership',
      topic: item.topic || item.post || item.title || item.content || `Week ${index + 1}: Industry insights and professional development`,
      status: item.status || 'planned',
      optimalTiming: item.optimalTiming || item.timing || item.time || item.bestTime || 'Tuesday 10:00 AM',
      expectedEngagement: item.expectedEngagement || item.engagement || 'medium'
    };
    console.log(`Validated calendar item ${index + 1}:`, validatedItem);
    return validatedItem;
  });

  // Enhanced strategy validation with comprehensive data
  const strategy = data.strategy || {};
  const validatedStrategy = {
    postingFrequency: strategy.postingFrequency || strategy.frequency || strategy.contentStrategyRecommendations?.[0] || 'Post 2-3 times per week for optimal engagement',
    bestTimes: Array.isArray(strategy.bestTimes) 
      ? strategy.bestTimes 
      : Array.isArray(strategy.bestPostingTimes?.times) 
      ? strategy.bestPostingTimes.times 
      : strategy.optimalTimes || ['Tuesday 10:00 AM', 'Wednesday 11:00 AM', 'Thursday 2:00 PM'],
    contentMix: strategy.contentMix || strategy.contentMixRecommendations || strategy.recommendedMix || {
      'thought-leadership': 35,
      'industry-insights': 25,
      'career-tips': 20,
      'personal-stories': 12,
      'polls-questions': 8
    },
    trendingTopics: Array.isArray(strategy.trendingTopics) 
      ? strategy.trendingTopics 
      : strategy.trending || strategy.topics || ['AI and Automation', 'Remote Work Best Practices', 'Digital Transformation', 'Professional Development', 'Industry Innovation']
  };

  const result = {
    ideas: validatedIdeas,
    calendar: validatedCalendar,
    strategy: validatedStrategy
  };

  console.log('Final validated content suggestions:', JSON.stringify(result, null, 2));
  return result;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    
    if (!type || !data) {
      throw new Error('Type and data are required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating LinkedIn content for type:', type);
    console.log('Input data:', JSON.stringify(data, null, 2));

    let systemPrompt = '';
    let userPrompt = '';
    let maxTokens = 800;

    switch (type) {
      case 'headline':
        systemPrompt = `You are a LinkedIn optimization expert with deep knowledge of recruiter behavior and LinkedIn's algorithm. Generate 5 compelling, professional LinkedIn headlines that are:
- Under 220 characters
- Industry-specific and role-focused
- Achievement-oriented with quantifiable impact
- Keyword-rich for maximum searchability
- ATS-optimized for recruiter searches
- Designed to increase profile views by 300%+

Analyze current LinkedIn trends and top-performing profiles in the user's industry. Each headline should target different aspects (leadership, technical skills, results, innovation, growth).

Return only a JSON array of strings, no additional text.`;
        
        userPrompt = `Generate LinkedIn headlines for: ${JSON.stringify(data)}. 
        Current industry trends to consider: ${new Date().getFullYear()} professional landscape, remote work prevalence, AI/digital transformation focus.
        Target: ${data.targetRole || 'professional'} in ${data.industry || 'business'} industry.
        Experience level: ${data.experienceLevel || 'mid-level'}.
        Key skills to highlight: ${data.keySkills?.join(', ') || 'relevant skills'}.
        Tone preference: ${data.tone || 'professional'}.`;
        break;

      case 'summary':
        systemPrompt = `You are a LinkedIn optimization expert who creates compelling summaries that drive results. Create a LinkedIn summary that:
- Is 3-5 paragraphs (200-500 words) optimized for readability
- Opens with a powerful hook that captures attention in first 2 lines
- Showcases quantifiable achievements with specific metrics and impact
- Incorporates industry-relevant keywords naturally for SEO
- Tells a compelling professional story with clear value proposition
- Includes a strong call-to-action that encourages networking
- Uses psychological triggers that resonate with target audience
- Is optimized for LinkedIn's algorithm and recruiter searches

Analyze successful profiles in the user's industry for best practices and trending language patterns.

Return only the summary text, no additional formatting or quotes.`;
        
        userPrompt = `Create a LinkedIn summary for: ${JSON.stringify(data)}.
        Target role: ${data.targetRole || 'professional role'}
        Industry: ${data.industry || 'business'}
        Key achievements: ${data.achievements?.join('; ') || 'professional accomplishments'}
        Skills to highlight: ${data.skills?.join(', ') || 'relevant skills'}
        Tone: ${data.tone || 'professional'}
        Include CTA: ${data.includeCallToAction ? 'yes' : 'no'}
        Current summary to improve: ${data.currentSummary || 'none provided'}`;
        maxTokens = 1200;
        break;

      case 'content-suggestions':
        systemPrompt = `You are a LinkedIn content strategist who creates viral, engaging content. You MUST generate EXACTLY this JSON structure with NO markdown formatting, NO code blocks, NO additional text - ONLY the raw JSON:

{
  "ideas": [
    {
      "title": "Specific, engaging content title",
      "content": "Detailed content description with specific examples and actionable insights",
      "contentType": "Thought Leadership",
      "hashtags": ["#RelevantHashtag1", "#RelevantHashtag2", "#RelevantHashtag3"],
      "engagementStrategy": "Specific strategy to drive comments, likes, and shares",
      "difficulty": "easy|medium|hard",
      "engagement": "high|medium|low",
      "type": "insight|tips|story|question"
    }
  ],
  "calendar": [
    {
      "week": 1,
      "contentType": "Thought Leadership",
      "topic": "Detailed, specific topic with actionable advice or insights",
      "status": "planned",
      "optimalTiming": "Tuesday 10:00 AM",
      "expectedEngagement": "high|medium|low"
    }
  ],
  "strategy": {
    "postingFrequency": "Specific frequency recommendation with reasoning",
    "bestTimes": ["Tuesday 10:00 AM", "Wednesday 11:00 AM", "Thursday 2:00 PM"],
    "contentMix": {
      "thought-leadership": 35,
      "industry-insights": 25,
      "career-tips": 20,
      "personal-stories": 12,
      "polls-questions": 8
    },
    "trendingTopics": ["Specific Topic 1", "Specific Topic 2", "Specific Topic 3", "Specific Topic 4", "Specific Topic 5"]
  }
}

CRITICAL REQUIREMENTS:
- Generate 8-10 detailed content ideas with specific, actionable topics
- Create a comprehensive 4-week content calendar with meaningful, detailed topics
- Each calendar entry must have a specific, descriptive topic (not generic)
- Include specific timing recommendations based on industry best practices
- Provide trending topics that are current and relevant to the user's industry
- All content must be highly relevant to current industry trends and encourage maximum engagement
- Topics should be specific enough to be immediately actionable

RETURN ONLY THE JSON OBJECT - NO MARKDOWN, NO EXPLANATIONS, NO CODE BLOCKS.`;
        
        userPrompt = `Generate comprehensive LinkedIn content strategy for professional in ${data.industry || 'business'} industry.

Profile Context:
- Role: ${data.targetRole || data.currentRole || 'Professional'}
- Industry: ${data.industry || 'Business'}
- Experience Level: ${data.experienceLevel || 'Mid-level'}
- Content Preference: ${data.contentType || 'Thought Leadership'}
- Posting Frequency: ${data.frequency || 'Weekly'}
- Key Skills: ${data.skills?.join(', ') || 'Professional skills'}
- Achievements: ${data.achievements?.join(', ') || 'Career accomplishments'}
- Experience Background: ${data.experience?.join('; ') || 'Professional background'}

Requirements:
- Generate 8-10 specific, actionable content ideas
- Create 4-week calendar with detailed topics for each week
- Focus on ${data.industry} industry trends and challenges
- Include current topics like AI impact, remote work, digital transformation
- Provide specific timing recommendations
- Target audience: ${data.industry} professionals, recruiters, industry leaders
- Make each calendar topic specific and immediately actionable
- Include trending topics relevant to ${data.industry} in ${new Date().getFullYear()}

Return ONLY the JSON object with no additional formatting.`;
        maxTokens = 3000;
        break;

      case 'keyword-trends':
        systemPrompt = `You are a LinkedIn SEO expert and job market analyst who provides comprehensive keyword analysis with real-time market insights. Provide detailed keyword analysis that includes:

**CURRENT KEYWORDS PERFORMANCE**: Analyze existing profile keywords with strength scores, context, and improvement recommendations.

**MISSING HIGH-IMPACT KEYWORDS**: Identify crucial missing keywords with priority levels, impact scores, specific reasons why they're important, and actionable suggestions for implementation.

**TRENDING INDUSTRY KEYWORDS**: Current trending keywords in the industry with growth data, search volumes, and strategic context for why they're trending.

**OPTIMIZATION STRATEGY**: Comprehensive strategy including headline optimization, summary enhancement, skills section improvement, and content strategy recommendations.

Return a detailed JSON object with this exact structure:
{
  "currentKeywords": {
    "keyword": {
      "strength": number (0-100),
      "context": "detailed explanation of current usage and performance"
    }
  },
  "missingKeywords": [
    {
      "keyword": "specific keyword",
      "priority": "high/medium/low",
      "impact": number (percentage),
      "reason": "why this keyword is crucial",
      "suggestion": "specific implementation advice"
    }
  ],
  "trendingKeywords": [
    {
      "keyword": "trending term",
      "growth": "percentage growth",
      "searchVolume": "search volume data",
      "context": "why it's trending and how to leverage it"
    }
  ],
  "optimizationStrategy": {
    "headline": "specific headline optimization advice",
    "summary": "summary enhancement recommendations",
    "skills": "skills section improvement strategy",
    "content": "content strategy for keyword integration"
  }
}

Focus on ${new Date().getFullYear()} market trends, AI/digital transformation, remote work impact, and industry-specific opportunities.`;
        
        userPrompt = `Analyze keywords and provide comprehensive market insights for: ${JSON.stringify(data)}.
        
        Target Role: ${data.targetRole || 'professional'}
        Industry: ${data.industry || 'business'}
        Current Profile Summary: ${data.currentProfile || 'not provided'}
        Current Skills: ${data.skills?.join(', ') || 'not specified'}
        Experience Level: ${data.experienceLevel || 'mid-level'}
        Job Description Context: ${data.jobDescription || 'general role requirements'}
        
        Provide real-time analysis of:
        1. Current keyword performance in their profile
        2. High-impact missing keywords based on ${new Date().getFullYear()} job market
        3. Trending keywords in ${data.industry} industry
        4. ATS optimization recommendations
        5. Competitive analysis insights
        6. Seasonal trends and timing strategies
        
        Include specific, actionable recommendations with measurable impact predictions.`;
        maxTokens = 1500;
        break;

      case 'skills-analysis':
        systemPrompt = `You are a career development expert who analyzes skill gaps and market trends. Provide a comprehensive skills analysis that includes:
- Current market demand for the user's skills
- Trending skills in their industry for ${new Date().getFullYear()}
- Skill gap analysis with specific recommendations
- Certification and learning path suggestions
- Salary impact of acquiring missing skills
- Future-proofing recommendations for AI/automation trends

Analyze job market data, industry reports, and skill demand trends.

Return a JSON object with "currentSkillsAssessment", "trendingSkills", "skillGaps", "recommendations", and "learningPaths".`;
        
        userPrompt = `Analyze skills for: ${JSON.stringify(data)}.
        Current skills: ${data.skills?.join(', ') || 'none provided'}
        Industry: ${data.industry || 'business'}
        Target role: ${data.targetRole || 'current role'}
        Experience level: ${data.experienceLevel || 'mid-level'}`;
        maxTokens = 1000;
        break;

      case 'profile-analysis':
        systemPrompt = `You are a LinkedIn optimization consultant who provides comprehensive profile audits. Analyze the user's profile data and provide:
- Profile completeness score with specific improvement areas
- Keyword optimization analysis for better search visibility
- Industry benchmarking against top performers
- Recruiter appeal assessment with actionable insights
- Algorithm optimization recommendations
- Personal branding strengths and gaps
- Competitive positioning analysis
- ROI-focused improvement roadmap

Use industry best practices and current LinkedIn algorithm preferences.

Return a JSON object with "overallScore", "strengths", "improvementAreas", "keywordOptimization", "benchmarkAnalysis", and "actionPlan".`;
        
        userPrompt = `Analyze LinkedIn profile: ${JSON.stringify(data)}.
        Headline: ${data.headline || 'none'}
        Summary: ${data.summary || 'none'}
        Skills: ${data.skills?.join(', ') || 'none'}
        Industry: ${data.industry || 'not specified'}
        Experience: ${data.experience?.length || 0} positions listed
        Education: ${data.education?.length || 0} entries`;
        maxTokens = 1200;
        break;

      default:
        throw new Error('Invalid type specified');
    }

    console.log('Sending request to OpenAI with system prompt length:', systemPrompt.length);
    console.log('User prompt:', userPrompt.substring(0, 200) + '...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const responseData = await response.json();
    const generatedContent = responseData.choices[0].message.content;
    
    console.log('Generated LinkedIn content (first 500 chars):', generatedContent.substring(0, 500));

    // For JSON responses, parse and return structured data
    if (['headline', 'content-suggestions', 'skills-analysis', 'profile-analysis', 'keyword-trends'].includes(type)) {
      try {
        const parsedContent = extractJsonFromResponse(generatedContent);
        
        // Special handling for content-suggestions to ensure proper structure
        if (type === 'content-suggestions') {
          const validatedContent = validateContentSuggestions(parsedContent);
          console.log('Final validated content suggestions being returned:', JSON.stringify(validatedContent, null, 2));
          return new Response(JSON.stringify({ content: validatedContent }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        return new Response(JSON.stringify({ content: parsedContent }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        console.error('Raw content that failed to parse:', generatedContent);
        
        // Return error with details for debugging
        return new Response(JSON.stringify({ 
          error: 'Failed to parse AI response',
          details: parseError.message,
          rawContent: generatedContent.substring(0, 1000),
          type: type
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // For summary, return as plain text
    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in linkedin-generator function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to generate LinkedIn content. Please try again.',
        timestamp: new Date().toISOString()
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
