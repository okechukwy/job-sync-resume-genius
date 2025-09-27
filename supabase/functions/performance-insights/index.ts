
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()

    if (!userId) {
      console.error('Missing userId in request')
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Starting AI insights generation for user: ${userId}`)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Fetch user's job applications with more detailed data
    const { data: applications, error: appsError } = await supabaseClient
      .from('job_applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (appsError) {
      console.error('Error fetching applications:', appsError)
      throw appsError
    }

    console.log(`Found ${applications?.length || 0} applications for analysis`)

    // Fetch performance metrics
    const { data: metrics, error: metricsError } = await supabaseClient
      .from('performance_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('metric_period', 'all_time')
      .single()

    if (metricsError && metricsError.code !== 'PGRST116') {
      console.error('Error fetching metrics:', metricsError)
      throw metricsError
    }

    // Enhanced data preparation for AI analysis
    const recentApplications = applications?.slice(0, 15) || []
    const statusBreakdown = applications?.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    }, {} as Record<string, number>) || {}

    const companyTypes = applications?.map(app => app.company_name).slice(0, 10) || []
    const positionTypes = applications?.map(app => app.position_title).slice(0, 10) || []
    const avgAtsScore = applications?.reduce((sum, app) => sum + (app.ats_score || 0), 0) / (applications?.length || 1) || 0

    const analysisData = {
      totalApplications: applications?.length || 0,
      statusBreakdown,
      metrics: metrics || {},
      recentApplications,
      companyTypes,
      positionTypes,
      avgAtsScore: Math.round(avgAtsScore),
      responseRate: metrics?.response_rate || 0,
      interviewRate: metrics?.interview_rate || 0,
      offerRate: metrics?.offer_rate || 0,
    }

    console.log('Analysis data prepared:', {
      totalApplications: analysisData.totalApplications,
      statusCount: Object.keys(statusBreakdown).length,
      avgAtsScore: analysisData.avgAtsScore,
      responseRate: analysisData.responseRate
    })

    // Generate AI insights using OpenAI
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured')
      throw new Error('OpenAI API key not configured')
    }

    const prompt = `
    As a career advisor expert, analyze this job application performance data and provide specific, actionable insights.

    USER PERFORMANCE DATA:
    - Total Applications: ${analysisData.totalApplications}
    - Response Rate: ${analysisData.responseRate}%
    - Interview Rate: ${analysisData.interviewRate}%
    - Offer Rate: ${analysisData.offerRate}%
    - Average ATS Score: ${analysisData.avgAtsScore}
    - Status Breakdown: ${JSON.stringify(statusBreakdown)}
    
    RECENT ACTIVITY:
    ${recentApplications.map(app => `- ${app.company_name} (${app.position_title}) - Status: ${app.status}, ATS: ${app.ats_score || 'N/A'}`).join('\n')}

    ANALYSIS REQUIREMENTS:
    1. Provide 3-4 specific things that are working well based on the actual data
    2. Identify 3-4 concrete areas for improvement with specific reasoning
    3. Give 3-4 actionable recommendations with clear next steps

    Focus on:
    - ATS optimization if scores are low (below 75)
    - Application targeting if response rates are low (below 10%)
    - Interview preparation if interview conversion is low
    - Industry-specific advice based on position types
    - Timing and frequency recommendations

    Return ONLY valid JSON in this exact format:
    {
      "working_well": ["specific observation with data", "another strength", "third strength"],
      "improvements": ["specific area with reason", "another improvement area", "third area"],
      "recommendations": ["actionable step with timeline", "specific recommendation", "third recommendation"]
    }
    `

    console.log('Sending request to OpenAI API...')

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are a career advisor expert who analyzes job application performance data to provide actionable insights for job seekers. Always return valid JSON responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    })

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text()
      console.error('OpenAI API error:', openAIResponse.status, errorText)
      throw new Error(`OpenAI API error: ${openAIResponse.status}`)
    }

    const openAIData = await openAIResponse.json()
    console.log('OpenAI response received, parsing insights...')

    let insights
    const rawContent = openAIData.choices[0].message.content

    try {
      // Try to parse JSON directly
      insights = JSON.parse(rawContent)
      console.log('Successfully parsed AI insights')
    } catch (parseError) {
      console.error('JSON parsing failed, attempting to extract JSON:', parseError)
      console.log('Raw AI response:', rawContent)
      
      // Try to extract JSON from markdown or other formatting
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          insights = JSON.parse(jsonMatch[0])
          console.log('Successfully extracted JSON from formatted response')
        } catch (extractError) {
          console.error('Failed to extract JSON:', extractError)
          throw new Error('Failed to parse AI response as JSON')
        }
      } else {
        console.error('No JSON pattern found in response')
        throw new Error('AI response does not contain valid JSON')
      }
    }

    // Validate insights structure
    if (!insights.working_well || !insights.improvements || !insights.recommendations) {
      console.error('Invalid insights structure:', insights)
      throw new Error('AI response missing required fields')
    }

    console.log('AI insights generated successfully:', {
      workingWellCount: insights.working_well.length,
      improvementsCount: insights.improvements.length,
      recommendationsCount: insights.recommendations.length
    })

    return new Response(
      JSON.stringify({
        insights,
        data: analysisData,
        success: true,
        generated_at: new Date().toISOString(),
        source: 'ai_generated'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error generating performance insights:', error)
    
    // Enhanced fallback based on user data if available
    const fallbackInsights = {
      working_well: [
        'Maintaining consistent application tracking and documentation',
        'Actively pursuing opportunities in your target field',
        'Using systematic approach to job search process'
      ],
      improvements: [
        'Consider optimizing resume for better ATS compatibility',
        'Focus on quality applications over quantity for better response rates',
        'Enhance LinkedIn profile optimization for increased visibility'
      ],
      recommendations: [
        'Analyze and improve ATS scores for better initial screening success',
        'Target companies with higher response rates in your industry',
        'Schedule regular follow-ups with recruiters and hiring managers'
      ]
    }

    return new Response(
      JSON.stringify({ 
        insights: fallbackInsights,
        error: (error instanceof Error ? error.message : 'Unknown error occurred') || 'Failed to generate insights',
        success: false,
        generated_at: new Date().toISOString(),
        source: 'fallback_generated'
      }),
      {
        status: 200, // Return 200 so frontend can handle fallback gracefully
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
