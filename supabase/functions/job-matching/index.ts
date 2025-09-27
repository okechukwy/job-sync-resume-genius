
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { jobDescription, resumeContent } = await req.json();

    if (!jobDescription || !resumeContent) {
      throw new Error('Job description and resume content are required');
    }

    console.log('Starting job matching analysis...');

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
            content: `You are an expert career counselor and resume analyst. Analyze the provided resume and job description to provide comprehensive, personalized career guidance. 

Your analysis should be thorough and specific to the individual's actual background, skills, and experience. Avoid generic advice.

Return your analysis as a JSON object with this exact structure:
{
  "overallScore": number (0-100),
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "skillsGap": [{"skill": string, "importance": "High"|"Medium"|"Low", "hasSkill": boolean}],
  "enhancedAnalysis": {
    "overallScore": number,
    "categoryScores": {
      "technical": number,
      "soft": number,
      "tools": number,
      "methodologies": number,
      "domain": number
    },
    "contextualInsights": {
      "industryFit": number,
      "roleLevelMatch": number,
      "experienceAlignment": number,
      "cultureMatch": number
    },
    "competitivePosition": {
      "strengthsVsMarket": string[],
      "gapsVsMarket": string[],
      "uniqueDifferentiators": string[]
    }
  },
  "personalizedInsights": {
    "resumeProfile": {
      "totalYearsExperience": number,
      "experienceLevel": "entry"|"junior"|"mid"|"senior"|"executive",
      "skills": [{"skill": string, "proficiencyLevel": string, "yearsOfExperience": number}],
      "industryExperience": string[],
      "managementExperience": boolean,
      "quantifiableResults": string[],
      "careerProgression": "strong_progression"|"steady"|"lateral"
    },
    "learningPaths": [{
      "skill": string,
      "currentLevel": string,
      "targetLevel": string,
      "estimatedTimeWeeks": number,
      "priorityScore": number,
      "learningSteps": [{"title": string, "resources": [{"name": string}]}],
      "costEstimate": {
        "totalCostRange": {"min": number, "max": number},
        "free": string[]
      }
    }],
    "marketIntelligence": {
      "averageSalary": {"min": number, "median": number, "max": number},
      "demandLevel": "very-high"|"high"|"medium"|"low",
      "competitionLevel": "low"|"medium"|"high"|"very-high",
      "emergingTrends": string[],
      "decliningSkills": string[]
    },
    "competitivePosition": {
      "marketPosition": "top-quartile"|"above-average"|"average"|"below-average"|"bottom-quartile",
      "recommendedStrategy": {
        "primaryFocus": string,
        "salaryNegotiation": {
          "negotiationPosition": "strong"|"moderate"|"weak",
          "expectedRange": {"min": number, "max": number},
          "keyLeveragePoints": string[],
          "improvementActions": string[]
        }
      }
    },
    "contextualRecommendations": [{
      "category": "immediate"|"short-term"|"long-term",
      "priority": "critical"|"high"|"medium"|"low",
      "action": string,
      "rationale": string,
      "timeframe": string,
      "resources": string[]
    }]
  },
  "recommendations": string[],
  "proTips": string[],
  "analysisConfidence": "high"|"medium"|"low",
  "analysisWarnings": string[]
}

Provide specific, actionable insights based on the actual content provided. Return ONLY the JSON object, no additional text or formatting.`
          },
          {
            role: 'user',
            content: `Please analyze this resume against the job description and provide personalized career guidance.

JOB DESCRIPTION:
${jobDescription}

RESUME CONTENT:
${resumeContent}

Analyze the specific skills, experience, and background mentioned in the resume. Compare them directly to the job requirements. Provide personalized learning paths based on the candidate's current skill level and experience. Calculate realistic salary expectations based on their actual experience level and location indicators. Identify their unique competitive advantages based on their specific background combination.`
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    console.log('Raw OpenAI response:', analysisText);

    // Strip markdown formatting if present
    const cleanedText = analysisText.replace(/```json\n?|\n?```/g, '').trim();
    
    console.log('Cleaned text for parsing:', cleanedText);

    // Parse the JSON response from OpenAI
    let analysisResult;
    try {
      analysisResult = JSON.parse(cleanedText);
      console.log('Successfully parsed analysis result');
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response was:', analysisText);
      console.error('Cleaned text was:', cleanedText);
      throw new Error('Failed to parse AI analysis response');
    }

    // Ensure we have the required structure and add defaults if missing
    const result = {
      matchScore: analysisResult.overallScore || 0,
      matchedKeywords: analysisResult.matchedKeywords || [],
      missingKeywords: analysisResult.missingKeywords || [],
      skillsGap: analysisResult.skillsGap || [],
      recommendations: analysisResult.recommendations || [],
      proTips: analysisResult.proTips || [],
      enhancedAnalysis: analysisResult.enhancedAnalysis || null,
      personalizedInsights: analysisResult.personalizedInsights || null,
      analysisConfidence: analysisResult.analysisConfidence || 'medium',
      analysisWarnings: analysisResult.analysisWarnings || []
    };

    // Add processing metadata (using object spread to avoid type error)
    const finalResult = {
      ...result,
      processingResult: {
        content: resumeContent,
        confidence: 'high',
        extractedWords: resumeContent.trim().split(/\s+/).length,
        warnings: [],
        processingMethod: 'AI Analysis via OpenAI'
      }
    };

    console.log('Analysis completed successfully');

    return new Response(JSON.stringify(finalResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in job-matching function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
