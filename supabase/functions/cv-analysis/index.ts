
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced data validation and correction function
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
  
  // Ensure improvements array exists and has minimum count
  if (!Array.isArray(analysis.improvements)) {
    analysis.improvements = [];
  }
  
  // Enhanced validation: Ensure we have comprehensive improvements
  const minimumImprovements = 15;
  if (analysis.improvements.length < minimumImprovements) {
    console.warn(`Insufficient improvements: ${analysis.improvements.length}, expected minimum ${minimumImprovements}`);
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
            content: `You are an expert resume analyst and career coach specializing in ${industry}. You must provide comprehensive, detailed analysis with a MINIMUM of 15-20 improvement suggestions across all resume sections.

CRITICAL REQUIREMENTS:
1. MINIMUM 15-20 improvement suggestions (target 18-25 for comprehensive analysis)
2. Each suggestion must be specific, actionable, and include detailed reasoning
3. Cover ALL major improvement categories systematically:
   - Quantification improvements (3-5 suggestions minimum)
   - Keyword optimization (3-4 suggestions minimum)
   - Action verb enhancement (2-3 suggestions minimum)
   - Achievement focus (3-4 suggestions minimum)
   - Industry alignment (2-3 suggestions minimum)
   - Formatting/structure (2-3 suggestions minimum)

4. Analyze EVERY section present in the resume:
   - Contact/Header optimization
   - Professional Summary enhancement
   - Experience section improvements (2-3 per job listed)
   - Skills section optimization
   - Education section improvements
   - Additional sections (certifications, projects, etc.)

5. Provide specific examples for each improvement
6. Ensure foundKeywords and missingKeywords arrays contain actual keyword strings
7. All scores must be between 0-100
8. Status values must be: "excellent", "good", "fair", or "needs_work"

SYSTEMATIC ANALYSIS APPROACH:
- Analyze each resume section independently
- Identify specific improvement opportunities in each section
- Look for quantification opportunities in ALL experience bullets
- Check keyword density and industry-specific terminology
- Evaluate action verb strength and variety
- Assess achievement vs. responsibility focus
- Review formatting consistency and ATS compatibility

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
    "foundKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "missingKeywords": ["missing1", "missing2", "missing3", "missing4", "missing5"],
    "suggestions": ["suggestion1", "suggestion2", "suggestion3", "suggestion4", "suggestion5"]
  },
  "improvements": [
    {
      "priority": "high|medium|low",
      "issue": "specific issue description",
      "suggestion": "detailed, actionable improvement advice with specific examples"
    }
  ]
}

MANDATORY: Your improvements array MUST contain at least 15 items. Analyze thoroughly to find comprehensive optimization opportunities across all sections and categories.`
          },
          {
            role: 'user',
            content: `Please provide comprehensive analysis of this resume for the ${industry} industry. ENSURE you provide at least 15-20 specific, actionable improvement suggestions covering all sections and optimization categories:\n\n${resumeText}`
          }
        ],
        temperature: 0.3,
        max_tokens: 8000, // Increased from 2000 to 8000 for comprehensive responses
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log('Raw OpenAI response length:', analysisText.length);

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

    // Check if we have enough improvements - if not, trigger fallback enhancement
    if (analysis.improvements.length < 15) {
      console.warn(`Insufficient improvements (${analysis.improvements.length}), enhancing analysis...`);
      
      // Add comprehensive fallback improvements based on common optimization areas
      const fallbackImprovements = [
        {
          priority: "high",
          issue: "Quantify achievements in experience section",
          suggestion: "Add specific numbers, percentages, or metrics to demonstrate impact. For example, instead of 'managed team' write 'managed team of 8 people, increasing productivity by 25%'"
        },
        {
          priority: "high",
          issue: "Strengthen action verbs throughout resume",
          suggestion: "Replace weak verbs like 'responsible for' with strong action verbs like 'spearheaded', 'optimized', 'implemented', or 'delivered'"
        },
        {
          priority: "medium",
          issue: "Enhance keyword optimization for ATS",
          suggestion: "Incorporate more industry-specific keywords and technical terms that appear in job descriptions for your target role"
        },
        {
          priority: "medium",
          issue: "Focus on achievements rather than responsibilities",
          suggestion: "Rewrite bullet points to emphasize accomplishments and results rather than daily tasks. Use the CAR method (Challenge, Action, Result)"
        },
        {
          priority: "medium",
          issue: "Optimize professional summary",
          suggestion: "Create a compelling 3-4 line summary that highlights your key value proposition, years of experience, and core competencies"
        },
        {
          priority: "low",
          issue: "Improve formatting consistency",
          suggestion: "Ensure consistent formatting for dates, bullet points, font sizes, and spacing throughout the document"
        }
      ];
      
      // Add fallback improvements until we reach minimum
      const neededImprovements = 15 - analysis.improvements.length;
      analysis.improvements = [...analysis.improvements, ...fallbackImprovements.slice(0, neededImprovements)];
    }

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

    console.log('Successfully analyzed CV with enhanced data:', {
      overallScore: analysis.overallScore,
      atsScore: analysis.atsScore,
      foundKeywords: analysis.keywords.foundKeywords.length,
      missingKeywords: analysis.keywords.missingKeywords.length,
      improvementsCount: analysis.improvements.length,
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
