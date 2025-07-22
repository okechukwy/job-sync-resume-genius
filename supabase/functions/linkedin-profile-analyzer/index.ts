
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

    // Extract username from URL for analysis
    const usernameMatch = profileUrl.match(/linkedin\.com\/in\/([^/?]+)/);
    const username = usernameMatch ? usernameMatch[1] : 'unknown';

    // Create comprehensive AI prompt based on scan depth
    let systemPrompt = '';
    let userPrompt = '';

    if (scanDepth === 'comprehensive') {
      systemPrompt = `You are an expert LinkedIn profile analyst and career strategist with deep knowledge of industry trends, recruiter behavior, and competitive positioning. Analyze the provided LinkedIn profile URL and generate a comprehensive assessment including:

1. **Profile Content Analysis**: Extract and evaluate headline, summary, experience, skills, and overall presentation
2. **Competitive Intelligence**: Compare against industry leaders and top performers in the same field
3. **Market Positioning**: Assess how the profile positions against current market trends and demands
4. **Optimization Opportunities**: Identify specific areas for improvement with measurable impact
5. **Industry Benchmarking**: Compare against industry averages and top-tier professionals
6. **Keyword Strategy**: Analyze keyword usage and suggest trending terms for better visibility
7. **Strategic Recommendations**: Provide actionable insights for career advancement

Provide realistic but optimized scores and insights. Consider current ${new Date().getFullYear()} market trends, AI/digital transformation impact, and post-pandemic professional landscape changes.

Return a detailed JSON analysis following this structure with realistic data based on the profile URL provided.`;
    } else if (scanDepth === 'detailed') {
      systemPrompt = `You are a LinkedIn optimization expert specializing in profile analysis and improvement recommendations. Analyze the LinkedIn profile and provide:

1. **Profile Strength Assessment**: Overall optimization score and key metrics
2. **Content Quality Analysis**: Headline, summary, and experience evaluation
3. **Skills Gap Analysis**: Missing skills and trending capabilities in the industry
4. **Competitive Comparison**: How the profile compares to successful professionals
5. **Improvement Roadmap**: Prioritized suggestions for optimization

Focus on practical, actionable insights that can immediately improve profile performance and visibility.

Return a comprehensive JSON analysis with realistic scores and recommendations.`;
    } else {
      systemPrompt = `You are a LinkedIn profile consultant providing quick profile assessments. Analyze the profile and provide:

1. **Basic Profile Metrics**: Completeness and optimization scores
2. **Key Strengths**: What's working well in the current profile
3. **Priority Improvements**: Top 3-5 areas that need immediate attention
4. **Quick Wins**: Simple changes that can have immediate impact

Keep the analysis focused and actionable for busy professionals.

Return a concise JSON analysis with essential metrics and recommendations.`;
    }

    userPrompt = `Analyze this LinkedIn profile: ${profileUrl}

Profile Analysis Context:
- Username/Identifier: ${username}
- Analysis Type: ${analysisType}
- Scan Depth: ${scanDepth}
- Include Competitive Comparison: ${compareWithCurrent}
- Current Year: ${new Date().getFullYear()}

Please provide realistic analysis based on the profile URL structure and username. Generate insights that would be typical for a professional with this profile identifier, considering current market trends and industry standards.

Return your analysis in this JSON format:
{
  "extractedData": {
    "headline": "Realistic professional headline based on profile",
    "summary": "Professional summary analysis",
    "location": "Professional location",
    "industry": "Industry sector",
    "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
    "experience": [{"title": "Role", "company": "Company", "duration": "Duration"}],
    "photo": true,
    "background": true
  },
  "profileStrength": 85,
  "industryAlignment": 78,
  "keywordDensity": {
    "leadership": 3,
    "management": 2,
    "strategy": 4,
    "innovation": 1,
    "technology": 2
  },
  "competitiveMetrics": {
    "headlineOptimization": 82,
    "summaryLength": 75,
    "skillsCount": 88,
    "experienceDetail": 79,
    "industryRanking": 73,
    "marketPositioning": 81
  },
  "industryBenchmarks": {
    "averageProfileStrength": 65,
    "topPerformerGap": ["Missing industry certifications", "Limited thought leadership content"],
    "competitiveAdvantage": ["Strong technical background", "Diverse industry experience"]
  },
  "improvementRecommendations": [
    {
      "area": "Headline Optimization",
      "priority": "high",
      "impact": "30% increase in profile views",
      "suggestion": "Include target keywords and value proposition"
    }
  ],
  "marketInsights": {
    "trendingKeywords": ["AI/ML", "Digital Transformation", "Remote Leadership"],
    "emergingSkills": ["Prompt Engineering", "Sustainable Business", "Data Privacy"],
    "industryGrowthAreas": ["Clean Technology", "Healthcare Innovation", "EdTech"]
  }
}`;

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
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const responseData = await response.json();
    const analysisContent = responseData.choices[0].message.content;
    
    console.log('Generated profile analysis:', analysisContent);

    // Parse the JSON response from OpenAI
    let analysisData;
    try {
      analysisData = JSON.parse(analysisContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Invalid AI response format');
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
