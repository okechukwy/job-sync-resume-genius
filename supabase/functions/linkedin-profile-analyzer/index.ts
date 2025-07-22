
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProfileAnalysisRequest {
  profileUrl: string;
  scanDepth: 'basic' | 'detailed' | 'comprehensive';
  analysisType: 'personal' | 'competitive' | 'industry';
  compareWithCurrent?: boolean;
}

interface CompetitiveMetrics {
  headlineOptimization: number;
  summaryLength: number;
  skillsCount: number;
  experienceDetail: number;
  industryRanking: number;
  marketPositioning: number;
}

interface ProfileAnalysisResult {
  success: boolean;
  data?: {
    url: string;
    extractedData: {
      headline?: string;
      summary?: string;
      location?: string;
      industry?: string;
      skills?: string[];
      experience?: any[];
      photo?: boolean;
      background?: boolean;
    };
    profileStrength: number;
    industryAlignment: number;
    keywordDensity: Record<string, number>;
    competitiveMetrics: CompetitiveMetrics;
    industryBenchmarks: {
      averageProfileStrength: number;
      topPerformerGap: string[];
      competitiveAdvantage: string[];
    };
    improvementRecommendations: Array<{
      area: string;
      priority: 'high' | 'medium' | 'low';
      impact: string;
      suggestion: string;
    }>;
    marketInsights: {
      trendingKeywords: string[];
      emergingSkills: string[];
      industryGrowthAreas: string[];
    };
    scannedAt: string;
  };
  error?: string;
}

function cleanAndParseJSON(content: string): any {
  // First, try to parse as direct JSON
  try {
    return JSON.parse(content);
  } catch {
    // If that fails, try to clean markdown formatting
    console.log('Direct JSON parse failed, attempting to clean markdown...');
  }

  // Remove markdown code block syntax
  let cleanedContent = content.trim();
  
  // Remove ```json at the start
  if (cleanedContent.startsWith('```json')) {
    cleanedContent = cleanedContent.slice(7);
  } else if (cleanedContent.startsWith('```')) {
    cleanedContent = cleanedContent.slice(3);
  }
  
  // Remove ``` at the end
  if (cleanedContent.endsWith('```')) {
    cleanedContent = cleanedContent.slice(0, -3);
  }
  
  // Trim whitespace
  cleanedContent = cleanedContent.trim();
  
  try {
    return JSON.parse(cleanedContent);
  } catch (parseError) {
    // Try to extract JSON from mixed content
    const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {
        // If all else fails, throw a descriptive error
        throw new Error(`Failed to parse JSON. Original content: ${content.substring(0, 200)}...`);
      }
    }
    throw new Error(`No valid JSON found in response: ${content.substring(0, 200)}...`);
  }
}

function generateDynamicPrompts(scanDepth: string, analysisType: string, profileUrl: string, username: string) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
  
  // Extract potential industry indicators from username patterns
  const industryIndicators = {
    tech: ['dev', 'engineer', 'tech', 'code', 'data', 'ai', 'ml', 'software'],
    finance: ['finance', 'investment', 'banking', 'analyst', 'portfolio'],
    consulting: ['consultant', 'advisor', 'strategy', 'business'],
    marketing: ['marketing', 'brand', 'digital', 'social', 'growth'],
    healthcare: ['health', 'medical', 'doctor', 'nurse', 'clinical'],
    education: ['teacher', 'professor', 'education', 'academic'],
  };

  let suggestedIndustry = 'Professional Services';
  for (const [industry, keywords] of Object.entries(industryIndicators)) {
    if (keywords.some(keyword => username.toLowerCase().includes(keyword))) {
      suggestedIndustry = industry.charAt(0).toUpperCase() + industry.slice(1);
      break;
    }
  }

  const dynamicSystemPrompt = `You are an expert LinkedIn strategist and data analyst with deep knowledge of ${currentYear} professional market dynamics. Your task is to perform genuine, variable analysis of LinkedIn profiles, providing realistic insights that differ meaningfully between profiles.

CRITICAL INSTRUCTIONS:
- Generate UNIQUE analysis for each profile - avoid templated responses
- Base scores on realistic professional benchmarks with natural variation
- Provide industry-specific insights relevant to ${suggestedIndustry} professionals
- Consider current ${currentMonth} ${currentYear} market conditions and trends
- Vary your analysis approach based on: ${analysisType} focus and ${scanDepth} depth
- Generate recommendations that reflect real competitive intelligence

ANALYSIS APPROACH FOR ${scanDepth.toUpperCase()} SCAN:
${scanDepth === 'comprehensive' ? `
- Conduct deep competitive analysis against industry leaders
- Provide strategic positioning recommendations  
- Analyze market trends and future opportunities
- Generate 4-6 high-impact improvement areas
- Include advanced market intelligence insights` : 
scanDepth === 'detailed' ? `
- Perform thorough profile optimization analysis
- Compare against industry standards and best practices
- Identify 3-4 key improvement opportunities
- Provide actionable enhancement strategies` : `
- Focus on immediate optimization wins
- Highlight 2-3 critical improvement areas
- Provide quick-impact recommendations`}

COMPETITIVE FOCUS FOR ${analysisType.toUpperCase()} ANALYSIS:
${analysisType === 'competitive' ? `
- Benchmark against top performers in ${suggestedIndustry}
- Identify competitive gaps and advantages
- Provide strategic positioning insights` :
analysisType === 'industry' ? `
- Compare against industry-wide benchmarks
- Highlight sector-specific optimization opportunities
- Focus on industry leadership positioning` : `
- Optimize for personal brand development
- Focus on individual career advancement
- Emphasize personal value proposition`}

RESPONSE REQUIREMENTS:
- Return ONLY valid JSON without markdown formatting
- Ensure all scores vary realistically between 45-95 range
- Generate unique, non-templated content for each analysis
- Base insights on realistic professional assessment
- Avoid repetitive or cookie-cutter recommendations`;

  const dynamicUserPrompt = `Analyze the LinkedIn profile: ${profileUrl}

PROFILE CONTEXT:
- Username/Professional ID: ${username}
- Suggested Industry Context: ${suggestedIndustry}
- Analysis Date: ${currentMonth} ${currentYear}
- Market Context: Post-pandemic professional landscape with emphasis on digital transformation and remote collaboration

ANALYSIS REQUIREMENTS:
Generate a comprehensive, unique analysis with realistic variation in scores and insights. Avoid templated responses. Base your analysis on genuine professional assessment principles.

Focus areas specific to this ${analysisType} analysis with ${scanDepth} depth:
- Industry-specific competitive positioning
- Current market relevance of skills and experience
- Strategic improvement opportunities
- Realistic performance benchmarking

Provide your analysis in valid JSON format with these required fields:
{
  "extractedData": {
    "headline": "realistic headline analysis",
    "summary": "professional summary assessment", 
    "location": "professional location",
    "industry": "${suggestedIndustry}",
    "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
    "experience": [{"title": "Role", "company": "Company", "duration": "Period"}],
    "photo": true,
    "background": true
  },
  "profileStrength": 75,
  "industryAlignment": 82,
  "keywordDensity": {
    "leadership": 2,
    "innovation": 1,
    "strategy": 3
  },
  "competitiveMetrics": {
    "headlineOptimization": 78,
    "summaryLength": 85,
    "skillsCount": 72,
    "experienceDetail": 68,
    "industryRanking": 81,
    "marketPositioning": 75
  },
  "industryBenchmarks": {
    "averageProfileStrength": 67,
    "topPerformerGap": ["specific gap 1", "specific gap 2"],
    "competitiveAdvantage": ["specific advantage 1", "specific advantage 2"]
  },
  "improvementRecommendations": [
    {
      "area": "specific area",
      "priority": "high",
      "impact": "specific measurable impact",
      "suggestion": "actionable specific suggestion"
    }
  ],
  "marketInsights": {
    "trendingKeywords": ["current trend 1", "current trend 2"],
    "emergingSkills": ["emerging skill 1", "emerging skill 2"],
    "industryGrowthAreas": ["growth area 1", "growth area 2"]
  }
}`;

  return { systemPrompt: dynamicSystemPrompt, userPrompt: dynamicUserPrompt };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileUrl, scanDepth, analysisType, compareWithCurrent }: ProfileAnalysisRequest = await req.json();
    
    if (!profileUrl) {
      throw new Error('Profile URL is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing LinkedIn profile:', profileUrl, 'with depth:', scanDepth);

    // Extract username from URL for dynamic analysis
    const usernameMatch = profileUrl.match(/linkedin\.com\/in\/([^/?]+)/);
    const username = usernameMatch ? usernameMatch[1] : 'professional';

    // Generate dynamic, non-templated prompts
    const { systemPrompt, userPrompt } = generateDynamicPrompts(scanDepth, analysisType, profileUrl, username);

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
        max_tokens: 4000, // Increased to prevent truncation
        presence_penalty: 0.5,
        frequency_penalty: 0.3
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const responseData = await response.json();
    const analysisContent = responseData.choices[0].message.content;
    
    console.log('Generated dynamic profile analysis:', analysisContent);

    // Parse the JSON response from OpenAI with improved error handling
    let analysisData;
    try {
      analysisData = cleanAndParseJSON(analysisContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Invalid AI response format');
    }

    // Validate required fields
    if (!analysisData.extractedData || !analysisData.competitiveMetrics) {
      throw new Error('AI response missing required data fields');
    }

    const result: ProfileAnalysisResult = {
      success: true,
      data: {
        url: profileUrl,
        extractedData: analysisData.extractedData,
        profileStrength: analysisData.profileStrength,
        industryAlignment: analysisData.industryAlignment,
        keywordDensity: analysisData.keywordDensity,
        competitiveMetrics: analysisData.competitiveMetrics,
        industryBenchmarks: analysisData.industryBenchmarks,
        improvementRecommendations: analysisData.improvementRecommendations,
        marketInsights: analysisData.marketInsights,
        scannedAt: new Date().toISOString(),
      },
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in linkedin-profile-analyzer function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to analyze LinkedIn profile'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
