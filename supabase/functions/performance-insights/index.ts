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
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Fetch user's job applications
    const { data: applications, error: appsError } = await supabaseClient
      .from('job_applications')
      .select('*')
      .eq('user_id', userId)

    if (appsError) {
      throw appsError
    }

    // Fetch performance metrics
    const { data: metrics, error: metricsError } = await supabaseClient
      .from('performance_metrics')
      .select('*')
      .eq('user_id', userId)
      .eq('metric_period', 'all_time')
      .single()

    if (metricsError && metricsError.code !== 'PGRST116') {
      throw metricsError
    }

    // Prepare data for AI analysis
    const analysisData = {
      totalApplications: applications?.length || 0,
      applications: applications || [],
      metrics: metrics || {},
      recentApplications: applications?.slice(0, 10) || [],
    }

    // Generate AI insights using OpenAI
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const prompt = `
    Analyze the following job application performance data and provide actionable insights:

    Performance Summary:
    - Total Applications: ${analysisData.totalApplications}
    - Response Rate: ${metrics?.response_rate || 0}%
    - Interview Rate: ${metrics?.interview_rate || 0}%
    - Offer Rate: ${metrics?.offer_rate || 0}%
    - Average ATS Score: ${metrics?.avg_ats_score || 0}

    Recent Applications: ${JSON.stringify(analysisData.recentApplications)}

    Please provide:
    1. What's Working Well (3-4 points)
    2. Areas for Improvement (3-4 points)
    3. Specific Recommendations (3-4 actionable items)

    Format the response as JSON with the following structure:
    {
      "working_well": ["point1", "point2", ...],
      "improvements": ["point1", "point2", ...],
      "recommendations": ["point1", "point2", ...]
    }

    Keep insights concise, actionable, and data-driven. Focus on patterns in the data.
    `

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
            content: 'You are a career advisor expert who analyzes job application performance data to provide actionable insights for job seekers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!openAIResponse.ok) {
      throw new Error('Failed to generate AI insights')
    }

    const openAIData = await openAIResponse.json()
    let insights

    try {
      insights = JSON.parse(openAIData.choices[0].message.content)
    } catch (e) {
      // Fallback if JSON parsing fails
      insights = {
        working_well: ['High application volume shows commitment', 'Consistent application tracking'],
        improvements: ['Focus on quality over quantity', 'Improve ATS optimization'],
        recommendations: ['Target companies with better cultural fit', 'Update resume format for better ATS scores']
      }
    }

    return new Response(
      JSON.stringify({
        insights,
        data: analysisData,
        success: true
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error generating performance insights:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate insights',
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})