import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { versions } = await req.json()

    if (!versions || !Array.isArray(versions)) {
      throw new Error('Invalid input: versions array is required')
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Prepare version data for analysis
    const versionSummary = versions.map(version => ({
      id: version.id,
      title: version.title,
      version_number: version.version_number,
      template_id: version.template_id,
      created_at: version.created_at,
      metrics: version.metrics || {},
      description: version.description
    }))

    const prompt = `
    As an expert career advisor and resume optimization specialist, analyze the following resume versions and their performance metrics to provide actionable insights.

    Resume Versions Data:
    ${JSON.stringify(versionSummary, null, 2)}

    Please provide a comprehensive analysis including:

    1. **Performance Analysis**: Compare the success rates, response rates, and ATS scores across versions
    2. **Strengths & Weaknesses**: Identify what's working well and areas for improvement for each version
    3. **Strategic Recommendations**: Provide specific, actionable advice for optimizing each version
    4. **Usage Guidance**: Suggest which versions to use for different types of job applications
    5. **Future Optimization**: Recommend next steps for creating even more effective versions

    Return your analysis as a JSON object with this structure:
    {
      "insights": [
        {
          "id": "version_id",
          "analysis": "Detailed performance analysis for this version",
          "recommendations": ["Specific actionable recommendation 1", "Specific actionable recommendation 2"],
          "strengths": ["Key strength 1", "Key strength 2"],
          "improvements": ["Area for improvement 1", "Area for improvement 2"],
          "industry_performance": {
            "technology": 85,
            "finance": 72,
            "healthcare": 90
          }
        }
      ],
      "overall_strategy": "High-level strategic guidance for the user's resume portfolio",
      "next_steps": ["Next step 1", "Next step 2"]
    }

    Focus on practical, data-driven insights that will help the user make informed decisions about their resume strategy.
    `

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career advisor and resume optimization specialist. Provide detailed, actionable insights based on resume performance data.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No content received from OpenAI')
    }

    // Parse the JSON response from OpenAI
    let analysisResult
    try {
      analysisResult = JSON.parse(content)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', content)
      // Fallback: create a structured response
      analysisResult = {
        insights: versions.map(version => ({
          id: version.id,
          analysis: "Analysis generation failed. Please try again.",
          recommendations: ["Unable to generate recommendations at this time"],
          strengths: ["Data analysis pending"],
          improvements: ["Retry analysis for detailed insights"],
          industry_performance: {}
        })),
        overall_strategy: "Please regenerate insights for detailed analysis.",
        next_steps: ["Retry insight generation"]
      }
    }

    return new Response(
      JSON.stringify(analysisResult),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in version-insights function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        insights: [],
        overall_strategy: "Analysis unavailable due to technical error.",
        next_steps: ["Please try again later"]
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Return 200 to avoid breaking the UI
      },
    )
  }
})