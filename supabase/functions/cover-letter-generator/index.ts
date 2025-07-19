
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CoverLetterRequest {
  fullName: string;
  jobTitle: string;
  companyName: string;
  hiringManager?: string;
  jobDescription: string;
  tone: string;
  keyPoints?: string;
  userBackground?: string;
}

serve(async (req) => {
  console.log('Cover letter generation request received');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const {
      fullName,
      jobTitle,
      companyName,
      hiringManager,
      jobDescription,
      tone,
      keyPoints,
      userBackground
    }: CoverLetterRequest = await req.json();

    console.log('Processing cover letter for:', { jobTitle, companyName, tone });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create comprehensive AI prompt
    const systemPrompt = `You are an expert career coach and professional writer specializing in creating compelling cover letters. Your task is to write a personalized, professional cover letter that:

1. Analyzes the job description to understand key requirements and company culture
2. Matches the candidate's background to specific job needs
3. Uses industry-appropriate language and terminology
4. Adapts the writing style based on the specified tone
5. Creates a cohesive narrative that shows value proposition

Writing Guidelines:
- Keep it concise but impactful (3-4 paragraphs)
- Use specific examples and achievements when possible
- Show enthusiasm appropriate to the tone
- Include relevant keywords from the job description
- Maintain professional formatting
- End with a strong call to action

Tone Styles:
- Professional: Formal, respectful, emphasis on qualifications
- Enthusiastic: Energetic, passionate, shows excitement
- Confident: Assertive, highlights achievements, direct
- Creative: Innovative language, unique approach, storytelling
- Formal: Traditional, conservative, very respectful

Return only the cover letter text without any additional formatting or explanations.`;

    const userPrompt = `Create a cover letter with these details:

Candidate Name: ${fullName}
Position: ${jobTitle}
Company: ${companyName}
${hiringManager ? `Hiring Manager: ${hiringManager}` : ''}
Tone: ${tone}

Job Description:
${jobDescription}

${keyPoints ? `Key Points to Highlight:
${keyPoints}` : ''}

${userBackground ? `Additional Background:
${userBackground}` : ''}

Please write a compelling cover letter that matches this person's profile to the job requirements while maintaining the ${tone} tone throughout.`;

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
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedLetter = data.choices[0].message.content;

    console.log('Cover letter generated successfully');

    return new Response(JSON.stringify({ 
      coverLetter: generatedLetter,
      success: true 
    }), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('Error in cover-letter-generator function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  }
});
