
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIEnhancementRequest {
  originalContent: string;
  missingKeywords: string[];
  targetIndustry: string;
  targetRole?: string;
  isHtmlContent: boolean;
  atsScore?: number;
  weakAreas?: string[];
}

interface AIEnhancementResult {
  enhancedContent: string;
  enhancementLog: string[];
  changesApplied: Array<{
    section: string;
    original: string;
    improved: string;
    reasoning: string;
    category: string;
  }>;
  atsImprovements: {
    keywordsAdded: string[];
    metricsAdded: number;
    actionVerbsImproved: number;
    professionalLanguageEnhanced: number;
  };
  estimatedATSScoreImprovement: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      originalContent, 
      missingKeywords, 
      targetIndustry, 
      targetRole,
      isHtmlContent,
      atsScore,
      weakAreas
    }: AIEnhancementRequest = await req.json();

    console.log('AI CV Enhancement request:', {
      contentLength: originalContent.length,
      missingKeywords: missingKeywords.length,
      targetIndustry,
      targetRole,
      isHtmlContent,
      atsScore
    });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create comprehensive enhancement prompt
    const enhancementPrompt = `
You are an expert ATS-optimized resume writer and career coach. Enhance this CV content to improve ATS compatibility and professional impact.

**TARGET PROFILE:**
- Industry: ${targetIndustry}
- Role: ${targetRole || 'Not specified'}
- Current ATS Score: ${atsScore || 'Unknown'}/100
- Weak Areas: ${weakAreas?.join(', ') || 'Not specified'}

**MISSING ATS KEYWORDS TO INTEGRATE:**
${missingKeywords.length > 0 ? missingKeywords.join(', ') : 'None specified'}

**ORIGINAL CV CONTENT:**
${originalContent}

**ENHANCEMENT REQUIREMENTS:**

1. **ATS Keyword Integration**: Naturally integrate missing keywords into relevant sections
2. **Action Verb Enhancement**: Replace weak verbs with powerful, industry-specific alternatives
3. **Quantification**: Add metrics and numbers where achievements lack them
4. **Professional Language**: Elevate language to executive/professional level
5. **Achievement Focus**: Transform responsibilities into achievements
6. **Industry Alignment**: Use terminology specific to ${targetIndustry}

**CRITICAL RULES:**
- Preserve ALL original formatting, structure, and HTML tags if present
- Make realistic, believable enhancements (don't fabricate specific metrics)
- Focus on language improvement, not content invention
- Maintain the original person's voice and experiences
- Keep all dates, names, and factual information unchanged
- Only enhance content that can be reasonably improved

**RESPONSE FORMAT:**
Return a JSON object with:
{
  "enhancedContent": "full enhanced CV content with original formatting preserved",
  "changesApplied": [
    {
      "section": "Experience/Skills/Summary etc",
      "original": "exact original text",
      "improved": "exact improved text", 
      "reasoning": "why this change improves ATS score",
      "category": "keyword-integration/action-verbs/quantification/professional-language"
    }
  ],
  "atsImprovements": {
    "keywordsAdded": ["list of keywords integrated"],
    "metricsAdded": 3,
    "actionVerbsImproved": 5,
    "professionalLanguageEnhanced": 8
  },
  "estimatedATSScoreImprovement": 15
}

Focus on realistic, professional enhancements that will genuinely improve ATS performance.
`;

    // Call OpenAI API
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
            content: 'You are an expert ATS resume optimizer. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: enhancementPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices[0].message.content;

    console.log('AI response length:', aiContent.length);

    // Parse AI response
    let enhancementResult: AIEnhancementResult;
    try {
      const parsed = JSON.parse(aiContent);
      enhancementResult = {
        enhancedContent: parsed.enhancedContent,
        enhancementLog: [
          `Applied ${parsed.changesApplied.length} AI-powered enhancements`,
          `Integrated ${parsed.atsImprovements.keywordsAdded.length} missing keywords`,
          `Enhanced ${parsed.atsImprovements.actionVerbsImproved} action verbs`,
          `Added ${parsed.atsImprovements.metricsAdded} quantifiable metrics`,
          `Improved ${parsed.atsImprovements.professionalLanguageEnhanced} professional language elements`,
          `Estimated ATS score improvement: +${parsed.estimatedATSScoreImprovement} points`
        ],
        changesApplied: parsed.changesApplied,
        atsImprovements: parsed.atsImprovements,
        estimatedATSScoreImprovement: parsed.estimatedATSScoreImprovement
      };
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback to basic enhancement if AI parsing fails
      enhancementResult = {
        enhancedContent: originalContent,
        enhancementLog: ['AI enhancement failed, using basic optimization'],
        changesApplied: [],
        atsImprovements: {
          keywordsAdded: [],
          metricsAdded: 0,
          actionVerbsImproved: 0,
          professionalLanguageEnhanced: 0
        },
        estimatedATSScoreImprovement: 0
      };
    }

    console.log('Enhancement completed:', {
      changesApplied: enhancementResult.changesApplied.length,
      estimatedImprovement: enhancementResult.estimatedATSScoreImprovement
    });

    return new Response(JSON.stringify(enhancementResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI CV enhancement:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to enhance CV',
      enhancedContent: '',
      enhancementLog: ['Enhancement failed due to technical error'],
      changesApplied: [],
      atsImprovements: {
        keywordsAdded: [],
        metricsAdded: 0,
        actionVerbsImproved: 0,
        professionalLanguageEnhanced: 0
      },
      estimatedATSScoreImprovement: 0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
