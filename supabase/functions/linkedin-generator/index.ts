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
        systemPrompt = `You are a LinkedIn content strategist who creates viral, engaging content. Generate a comprehensive content strategy with 8-10 strategic post ideas that:
- Are highly relevant to current industry trends (${new Date().getFullYear()})
- Encourage maximum engagement (likes, comments, shares, saves)
- Mix content types: insights, tips, stories, questions, industry analysis, personal experiences
- Are authentic and establish thought leadership
- Include trending hashtags and optimal posting strategies
- Target the user's specific audience and industry
- Leverage psychological triggers for viral potential
- Align with LinkedIn's algorithm preferences
- Include practical engagement strategies
- Consider current market conditions and remote work trends

Also provide:
- A 4-week content calendar with optimal timing
- Content strategy recommendations
- Best posting times for their industry
- Content mix recommendations
- Trending topics to leverage

Return a JSON object with "ideas", "calendar", and "strategy" fields. Each idea should have: "title", "content", "contentType", "hashtags", "engagementStrategy", "difficulty", "engagement", and "type".`;
        
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
        maxTokens = 2000;
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

      case 'keyword-trends':
        systemPrompt = `You are a LinkedIn SEO expert who tracks keyword trends and optimization strategies. Provide current keyword analysis including:
- Top-performing keywords in the user's industry for ${new Date().getFullYear()}
- Long-tail keyword opportunities for better ranking
- Competitor keyword analysis and gaps
- Search volume and difficulty assessment
- Seasonal trends and timing recommendations
- ATS optimization keywords for better recruiter discovery
- Personal branding keyword strategy

Analyze current job postings, successful profiles, and search trends.

Return a JSON object with "primaryKeywords", "longTailKeywords", "trendingTerms", "seasonalKeywords", and "optimizationStrategy".`;
        
        userPrompt = `Analyze keywords for: ${JSON.stringify(data)}.
        Industry: ${data.industry || 'business'}
        Target role: ${data.targetRole || 'professional'}
        Current skills: ${data.skills?.join(', ') || 'various skills'}
        Geographic focus: ${data.location || 'global'}`;
        maxTokens = 1000;
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
        const parsedContent = JSON.parse(generatedContent);
        return new Response(JSON.stringify({ content: parsedContent }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        // Fallback: return as text if JSON parsing fails
        return new Response(JSON.stringify({ content: generatedContent }), {
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
