
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

// Enhanced JSON parsing function with better error handling
const parseAIResponse = (responseText: string): any => {
  console.log('Parsing AI response, length:', responseText.length);
  console.log('Response preview:', responseText.substring(0, 500) + '...');
  
  // Step 1: Try direct JSON parsing
  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.log('Direct JSON parsing failed:', error.message);
  }
  
  // Step 2: Clean up common JSON issues
  let cleanedText = responseText;
  
  // Remove markdown code blocks
  cleanedText = cleanedText.replace(/```json\s*\n?/g, '').replace(/\n?\s*```/g, '');
  
  // Remove any trailing commas before closing braces/brackets
  cleanedText = cleanedText.replace(/,(\s*[}\]])/g, '$1');
  
  // Fix escaped quotes in strings
  cleanedText = cleanedText.replace(/\\"/g, '"');
  
  // Fix control characters in strings
  cleanedText = cleanedText.replace(/[\x00-\x1f\x7f-\x9f]/g, '');
  
  // Try parsing cleaned text
  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.log('Cleaned JSON parsing failed:', error.message);
  }
  
  // Step 3: Extract JSON from mixed content
  const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.log('Extracted JSON parsing failed:', error.message);
    }
  }
  
  // Step 4: Try to reconstruct basic structure
  console.log('All JSON parsing attempts failed, creating fallback structure');
  return {
    enhancedContent: responseText,
    changesApplied: [],
    atsImprovements: {
      keywordsAdded: [],
      metricsAdded: 0,
      actionVerbsImproved: 0,
      professionalLanguageEnhanced: 0
    },
    estimatedATSScoreImprovement: 0
  };
};

// Enhanced basic optimization as fallback
const createBasicOptimization = (
  originalContent: string,
  missingKeywords: string[],
  targetIndustry: string
): AIEnhancementResult => {
  console.log('Creating basic optimization fallback');
  
  const changes = [];
  let enhancedContent = originalContent;
  
  // Basic keyword integration
  if (missingKeywords.length > 0) {
    const keywordToAdd = missingKeywords[0];
    if (!enhancedContent.toLowerCase().includes(keywordToAdd.toLowerCase())) {
      enhancedContent = enhancedContent.replace(
        /\b(experience|skills|responsibilities)\b/gi,
        `$1 with ${keywordToAdd}`
      );
      changes.push({
        section: 'Content Enhancement',
        original: 'experience',
        improved: `experience with ${keywordToAdd}`,
        reasoning: 'Added missing industry keyword for better ATS compatibility',
        category: 'keyword-integration'
      });
    }
  }
  
  // Basic action verb improvements
  const actionVerbReplacements = {
    'worked on': 'managed',
    'helped with': 'facilitated',
    'was responsible for': 'directed',
    'did': 'executed'
  };
  
  Object.entries(actionVerbReplacements).forEach(([old, replacement]) => {
    if (enhancedContent.toLowerCase().includes(old)) {
      enhancedContent = enhancedContent.replace(new RegExp(old, 'gi'), replacement);
      changes.push({
        section: 'Content Enhancement',
        original: old,
        improved: replacement,
        reasoning: 'Enhanced action verb for better professional impact',
        category: 'action-verbs'
      });
    }
  });
  
  return {
    enhancedContent,
    enhancementLog: [
      `Applied ${changes.length} basic optimizations`,
      'Enhanced professional language and action verbs',
      'Integrated available keywords where appropriate',
      'Note: Using basic optimization due to AI processing limitations'
    ],
    changesApplied: changes,
    atsImprovements: {
      keywordsAdded: missingKeywords.slice(0, 1),
      metricsAdded: 0,
      actionVerbsImproved: changes.filter(c => c.category === 'action-verbs').length,
      professionalLanguageEnhanced: changes.length
    },
    estimatedATSScoreImprovement: Math.min(changes.length * 3, 12)
  };
};

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

    console.log('AI CV Enhancement request received:', {
      contentLength: originalContent.length,
      missingKeywords: missingKeywords.length,
      targetIndustry,
      targetRole,
      isHtmlContent,
      atsScore
    });

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      const fallback = createBasicOptimization(originalContent, missingKeywords, targetIndustry);
      return new Response(JSON.stringify(fallback), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Enhanced AI prompt with better JSON structure guidance
    const enhancementPrompt = `
You are an expert ATS resume optimizer. You must respond with ONLY valid JSON, no markdown formatting.

ANALYSIS TARGET:
- Industry: ${targetIndustry}
- Role: ${targetRole || 'Not specified'}
- Current ATS Score: ${atsScore || 'Unknown'}/100
- Missing Keywords: ${missingKeywords.join(', ')}

ORIGINAL CONTENT:
${originalContent.substring(0, 3000)}${originalContent.length > 3000 ? '...' : ''}

TASK: Enhance the content for ATS compatibility while preserving all original formatting.

RESPONSE FORMAT (JSON only, no markdown):
{
  "enhancedContent": "enhanced version with original formatting preserved",
  "changesApplied": [
    {
      "section": "section name",
      "original": "original text",
      "improved": "improved text",
      "reasoning": "explanation",
      "category": "keyword-integration|action-verbs|quantification|professional-language"
    }
  ],
  "atsImprovements": {
    "keywordsAdded": ["keyword1", "keyword2"],
    "metricsAdded": 0,
    "actionVerbsImproved": 2,
    "professionalLanguageEnhanced": 3
  },
  "estimatedATSScoreImprovement": 15
}

RULES:
- Make realistic improvements only
- Preserve ALL original formatting
- Keep all dates and factual information unchanged
- Focus on professional language enhancement
- Naturally integrate missing keywords
- Replace weak action verbs with strong ones
`;

    console.log('Calling OpenAI API...');
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
            content: 'You are an expert ATS resume optimizer. Always respond with valid JSON only, no markdown formatting.'
          },
          {
            role: 'user',
            content: enhancementPrompt
          }
        ],
        temperature: 0.2,
        max_tokens: 3000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices[0].message.content;

    console.log('AI response received, attempting to parse...');

    // Use enhanced JSON parsing
    let enhancementResult: AIEnhancementResult;
    try {
      const parsed = parseAIResponse(aiContent);
      
      // Validate and structure the response
      enhancementResult = {
        enhancedContent: parsed.enhancedContent || originalContent,
        enhancementLog: [
          `Applied ${parsed.changesApplied?.length || 0} AI-powered enhancements`,
          `Integrated ${parsed.atsImprovements?.keywordsAdded?.length || 0} missing keywords`,
          `Enhanced ${parsed.atsImprovements?.actionVerbsImproved || 0} action verbs`,
          `Added ${parsed.atsImprovements?.metricsAdded || 0} quantifiable metrics`,
          `Improved ${parsed.atsImprovements?.professionalLanguageEnhanced || 0} professional language elements`,
          `Estimated ATS score improvement: +${parsed.estimatedATSScoreImprovement || 0} points`
        ],
        changesApplied: parsed.changesApplied || [],
        atsImprovements: {
          keywordsAdded: parsed.atsImprovements?.keywordsAdded || [],
          metricsAdded: parsed.atsImprovements?.metricsAdded || 0,
          actionVerbsImproved: parsed.atsImprovements?.actionVerbsImproved || 0,
          professionalLanguageEnhanced: parsed.atsImprovements?.professionalLanguageEnhanced || 0
        },
        estimatedATSScoreImprovement: parsed.estimatedATSScoreImprovement || 0
      };
      
      console.log('AI enhancement successful:', {
        changesApplied: enhancementResult.changesApplied.length,
        estimatedImprovement: enhancementResult.estimatedATSScoreImprovement
      });
      
    } catch (parseError) {
      console.error('AI response parsing failed completely:', parseError);
      enhancementResult = createBasicOptimization(originalContent, missingKeywords, targetIndustry);
    }

    return new Response(JSON.stringify(enhancementResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI CV enhancement:', error);
    
    // Fallback to basic optimization on any error
    try {
      const { originalContent, missingKeywords, targetIndustry } = await req.json();
      const fallback = createBasicOptimization(originalContent, missingKeywords || [], targetIndustry || 'Business');
      
      return new Response(JSON.stringify(fallback), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      
      return new Response(JSON.stringify({ 
        error: 'Enhancement service temporarily unavailable',
        enhancedContent: '',
        enhancementLog: ['Enhancement failed - please try again later'],
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
  }
});
