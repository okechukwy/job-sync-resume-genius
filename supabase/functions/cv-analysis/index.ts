
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Data validation and correction function
const validateAndCorrectAnalysisData = (analysis: any) => {
  console.log('Validating and correcting analysis data...');
  
  // Ensure keywords have proper arrays and correct counts
  if (analysis.keywords) {
    if (!Array.isArray(analysis.keywords.foundKeywords)) {
      analysis.keywords.foundKeywords = [];
    }
    if (!Array.isArray(analysis.keywords.missingKeywords)) {
      analysis.keywords.missingKeywords = [];
    }
    if (!Array.isArray(analysis.keywords.suggestions)) {
      analysis.keywords.suggestions = [];
    }
    
    // Correct the counts to match actual array lengths
    analysis.keywords.found = analysis.keywords.foundKeywords.length;
    analysis.keywords.missing = analysis.keywords.missingKeywords.length;
    
    console.log('Corrected keyword counts:', {
      found: analysis.keywords.found,
      missing: analysis.keywords.missing,
      foundKeywords: analysis.keywords.foundKeywords.length,
      missingKeywords: analysis.keywords.missingKeywords.length
    });
  }
  
  // Validate section scores are within 0-100 range
  if (analysis.sections) {
    Object.keys(analysis.sections).forEach(section => {
      const sectionData = analysis.sections[section];
      if (sectionData.score < 0 || sectionData.score > 100) {
        console.warn(`Invalid score for section ${section}: ${sectionData.score}, clamping to 0-100`);
        sectionData.score = Math.max(0, Math.min(100, sectionData.score));
      }
    });
  }
  
  // Validate overall and ATS scores
  if (analysis.overallScore < 0 || analysis.overallScore > 100) {
    console.warn(`Invalid overall score: ${analysis.overallScore}, clamping to 0-100`);
    analysis.overallScore = Math.max(0, Math.min(100, analysis.overallScore));
  }
  
  if (analysis.atsScore < 0 || analysis.atsScore > 100) {
    console.warn(`Invalid ATS score: ${analysis.atsScore}, clamping to 0-100`);
    analysis.atsScore = Math.max(0, Math.min(100, analysis.atsScore));
  }
  
  // Ensure improvements array exists
  if (!Array.isArray(analysis.improvements)) {
    analysis.improvements = [];
  }
  
  return analysis;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, industry = 'Business' } = await req.json();
    
    if (!resumeText) {
      throw new Error('Resume text is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Analyzing CV for industry:', industry);

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
            content: `You are a professional resume analyst and career coach specializing in ${industry}. Analyze the provided resume and return a detailed JSON analysis.

CRITICAL INSTRUCTIONS:
1. Ensure foundKeywords and missingKeywords arrays contain actual keyword strings
2. The "found" and "missing" counts will be auto-calculated from array lengths
3. Provide specific, actionable keywords and suggestions
4. All scores must be between 0-100
5. Status values must be: "excellent", "good", "fair", or "needs_work"

Return ONLY valid JSON with this exact structure:

{
  "overallScore": number (0-100),
  "atsScore": number (0-100),
  "industry": "${industry}",
  "targetRole": "detected or suggested role based on resume content",
  "sections": {
    "contact": {"score": number, "status": "excellent|good|fair|needs_work"},
    "summary": {"score": number, "status": "excellent|good|fair|needs_work"},
    "experience": {"score": number, "status": "excellent|good|fair|needs_work"},
    "education": {"score": number, "status": "excellent|good|fair|needs_work"},
    "skills": {"score": number, "status": "excellent|good|fair|needs_work"},
    "formatting": {"score": number, "status": "excellent|good|fair|needs_work"}
  },
  "keywords": {
    "foundKeywords": ["keyword1", "keyword2", "keyword3"],
    "missingKeywords": ["missing1", "missing2", "missing3"],
    "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
  },
  "improvements": [
    {
      "priority": "high|medium|low",
      "issue": "brief description",
      "suggestion": "specific actionable advice"
    }
  ]
}

Focus on ${industry}-specific requirements and provide realistic, actionable recommendations.`
          },
          {
            role: 'user',
            content: `Please analyze this resume for the ${industry} industry:\n\n${resumeText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log('Raw OpenAI response:', analysisText);

    // Parse the JSON response with improved error handling
    let analysis;
    try {
      // Remove any markdown formatting if present
      const jsonText = analysisText.replace(/```json\n?|\n?```/g, '').trim();
      analysis = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', analysisText);
      
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          analysis = JSON.parse(jsonMatch[0]);
        } catch (secondParseError) {
          console.error('Second parse attempt failed:', secondParseError);
          throw new Error('Failed to parse AI analysis response');
        }
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    }

    // Validate and correct the analysis data
    analysis = validateAndCorrectAnalysisData(analysis);

    // Final validation check
    if (!analysis.overallScore || !analysis.sections || !analysis.keywords || !analysis.improvements) {
      console.error('Invalid analysis structure after correction:', analysis);
      throw new Error('Invalid analysis structure from AI');
    }

    // Ensure industry and targetRole are set
    if (!analysis.industry) {
      analysis.industry = industry;
    }
    if (!analysis.targetRole) {
      analysis.targetRole = `${industry} Professional`;
    }

    console.log('Successfully analyzed CV with corrected data:', {
      overallScore: analysis.overallScore,
      atsScore: analysis.atsScore,
      foundKeywords: analysis.keywords.foundKeywords.length,
      missingKeywords: analysis.keywords.missingKeywords.length,
      foundCount: analysis.keywords.found,
      missingCount: analysis.keywords.missing
    });

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in cv-analysis function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to analyze CV. Please try again.'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
