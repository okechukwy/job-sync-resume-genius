
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to extract JSON from markdown-wrapped responses
const extractJsonFromResponse = (content: string): any => {
  try {
    // First, try parsing as-is
    return JSON.parse(content);
  } catch (e) {
    // If that fails, try to extract JSON from markdown code blocks
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (e) {
        console.error('Failed to parse extracted JSON:', e);
      }
    }
    
    // Try to find JSON object pattern
    const objectMatch = content.match(/\{[\s\S]*\}/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[0]);
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
      return JSON.parse(cleaned);
    } catch (e) {
      console.error('All JSON parsing attempts failed:', e);
      throw new Error('Unable to parse JSON response from OpenAI');
    }
  }
};

// Helper function to validate and transform content suggestions data
const validateContentSuggestions = (data: any): any => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid content suggestions data structure');
  }

  // Ensure ideas array exists and has proper structure
  const ideas = Array.isArray(data.ideas) ? data.ideas : [];
  const validatedIdeas = ideas.map((idea: any, index: number) => ({
    title: idea.title || `Content Idea ${index + 1}`,
    content: idea.content || 'Sample content description',
    contentType: idea.contentType || 'Thought Leadership',
    hashtags: Array.isArray(idea.hashtags) ? idea.hashtags : ['#LinkedIn', '#Professional'],
    engagementStrategy: idea.engagementStrategy || 'Encourage engagement through questions',
    difficulty: ['easy', 'medium', 'hard'].includes(idea.difficulty) ? idea.difficulty : 'medium',
    engagement: ['high', 'medium', 'low'].includes(idea.engagement) ? idea.engagement : 'medium',
    type: idea.type || 'insight'
  }));

  // Ensure calendar array exists and has proper structure
  const calendar = Array.isArray(data.calendar) ? data.calendar : [];
  const validatedCalendar = calendar.map((item: any, index: number) => ({
    week: typeof item.week === 'number' ? item.week : index + 1,
    contentType: item.contentType || item.type || 'Thought Leadership',
    topic: item.topic || item.post || item.title || `Week ${index + 1} Content`,
    status: item.status || 'planned',
    optimalTiming: item.optimalTiming || item.time || 'Tuesday 10:00 AM',
    expectedEngagement: item.expectedEngagement || 'medium'
  }));

  // Ensure strategy object exists and has proper structure
  const strategy = data.strategy || {};
  const validatedStrategy = {
    postingFrequency: strategy.postingFrequency || strategy.contentStrategyRecommendations?.[0] || 'Weekly posting recommended',
    bestTimes: Array.isArray(strategy.bestTimes) 
      ? strategy.bestTimes 
      : Array.isArray(strategy.bestPostingTimes?.times) 
      ? strategy.bestPostingTimes.times 
      : ['Tuesday 10:00 AM', 'Wednesday 11:00 AM', 'Thursday 10:30 AM'],
    contentMix: strategy.contentMix || strategy.contentMixRecommendations || {
      'thought-leadership': 30,
      'industry-insights': 25,
      'career-tips': 20,
      'personal-stories': 15,
      'polls-questions': 10
    },
    trendingTopics: Array.isArray(strategy.trendingTopics) 
      ? strategy.trendingTopics 
      : ['AI and Automation', 'Remote Work', 'Digital Transformation', 'Sustainability', 'Career Development']
  };

  return {
    ideas: validatedIdeas,
    calendar: validatedCalendar,
    strategy: validatedStrategy
  };
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
        systemPrompt = `You are a LinkedIn content strategist who creates viral, engaging content. Generate EXACTLY this JSON structure with NO markdown formatting or code blocks:

{
  "ideas": [
    {
      "title": "Content title here",
      "content": "Content description here",
      "contentType": "Thought Leadership",
      "hashtags": ["#hashtag1", "#hashtag2"],
      "engagementStrategy": "Strategy description",
      "difficulty": "easy|medium|hard",
      "engagement": "high|medium|low",
      "type": "insight|tips|story|question"
    }
  ],
  "calendar": [
    {
      "week": 1,
      "contentType": "Thought Leadership",
      "topic": "Topic description",
      "status": "planned",
      "optimalTiming": "Tuesday 10:00 AM",
      "expectedEngagement": "high|medium|low"
    }
  ],
  "strategy": {
    "postingFrequency": "Frequency recommendation",
    "bestTimes": ["Tuesday 10:00 AM", "Wednesday 11:00 AM"],
    "contentMix": {
      "thought-leadership": 30,
      "industry-insights": 25,
      "career-tips": 20,
      "personal-stories": 15,
      "polls-questions": 10
    },
    "trendingTopics": ["Topic 1", "Topic 2", "Topic 3"]
  }
}

Generate 8-10 content ideas that are highly relevant to current industry trends and encourage maximum engagement. Include a 4-week content calendar and comprehensive strategy recommendations.`;
        
        userPrompt = `Generate comprehensive LinkedIn content strategy for: ${JSON.stringify(data)}.
        Industry: ${data.industry || 'business'}
        Role focus: ${data.targetRole || data.currentRole || 'professional'}
        Experience level: ${data.experienceLevel || 'mid-level'}
        Content type preference: ${data.contentType || 'thought-leadership'}
        Posting frequency: ${data.frequency || 'weekly'}
        Expertise areas: ${data.skills?.join(', ') || 'professional skills'}
        Achievements to leverage: ${data.achievements?.join(', ') || 'career accomplishments'}
        Target audience: ${data.industry} professionals, recruiters, potential clients, industry leaders
        Current trends to leverage: AI transformation, remote work, sustainability, digital innovation, economic changes`;
        maxTokens = 2500;
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
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const responseData = await response.json();
    const generatedContent = responseData.choices[0].message.content;
    
    console.log('Generated LinkedIn content:', generatedContent);

    // For JSON responses, parse and return structured data
    if (['headline', 'content-suggestions', 'skills-analysis', 'profile-analysis', 'keyword-trends'].includes(type)) {
      try {
        const parsedContent = extractJsonFromResponse(generatedContent);
        
        // Special handling for content-suggestions to ensure proper structure
        if (type === 'content-suggestions') {
          const validatedContent = validateContentSuggestions(parsedContent);
          console.log('Validated content suggestions:', JSON.stringify(validatedContent, null, 2));
          return new Response(JSON.stringify({ content: validatedContent }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        return new Response(JSON.stringify({ content: parsedContent }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        console.error('Raw content:', generatedContent);
        
        // Return error with details for debugging
        return new Response(JSON.stringify({ 
          error: 'Failed to parse AI response',
          details: parseError.message,
          rawContent: generatedContent.substring(0, 500) + '...' // Truncate for logging
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
        details: 'Failed to generate LinkedIn content. Please try again.'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
